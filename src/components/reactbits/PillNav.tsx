import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// ─────────────────────────────────────────────
// PillNav — Adapted from React Bits
// Uses anchor tags with smooth scroll (no react-router)
// ─────────────────────────────────────────────

export type PillNavItem = {
    label: string;
    href: string;
};

export interface PillNavProps {
    items: PillNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    pillColor?: string;
    hoveredPillTextColor?: string;
    hoveredPillBgColor?: string;
    pillTextColor?: string;
    onNavigate?: (href: string) => void;
}

const PillNav: React.FC<PillNavProps> = ({
    items,
    className = '',
    ease = 'power3.easeOut',
    baseColor = '#16161e',
    pillColor = '#060010',
    hoveredPillTextColor = '#060010',
    hoveredPillBgColor = '#f0f0f5',
    pillTextColor,
    onNavigate,
}) => {
    const resolvedPillTextColor = pillTextColor ?? '#f0f0f5';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const isMobileMenuOpenRef = useRef(isMobileMenuOpen);

    useEffect(() => {
        isMobileMenuOpenRef.current = isMobileMenuOpen;
    }, [isMobileMenuOpen]);

    const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
    const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const navItemsRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLAnchorElement | null>(null);
    const navbarWrapperRef = useRef<HTMLDivElement | null>(null);

    const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
    const idleTimeout = useRef<number | null>(null);
    const isVisibleRef = useRef(true);

    const showNav = useCallback(() => {
        if (!navbarWrapperRef.current) return;
        if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            gsap.to(navbarWrapperRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
        }
    }, []);

    const hideNav = useCallback(() => {
        if (!navbarWrapperRef.current) return;
        if (isMobileMenuOpenRef.current) return;
        if (isVisibleRef.current) {
            isVisibleRef.current = false;
            gsap.to(navbarWrapperRef.current, { y: -100, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
        }
    }, []);

    const resetIdleTimeout = useCallback(() => {
        if (idleTimeout.current !== null) window.clearTimeout(idleTimeout.current);
        idleTimeout.current = window.setTimeout(() => {
            if (window.scrollY > 50) {
                hideNav();
            }
        }, 2500); // 2.5 seconds idle
    }, [hideNav]);

    // Detect active section on scroll and handle auto-hide logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);

            // 1. Detect active section
            const sections = items.map((item) => item.href.replace('#', ''));
            for (const sectionId of [...sections].reverse()) {
                const el = document.getElementById(sectionId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }

            // 2. Hide/Show logic
            if (currentScrollY > 50) {
                if (currentScrollY > lastScrollY.current + 10) {
                    // Scrolling down
                    hideNav();
                } else if (currentScrollY < lastScrollY.current - 10) {
                    // Scrolling up
                    showNav();
                    resetIdleTimeout();
                }
            } else {
                showNav();
                if (idleTimeout.current !== null) window.clearTimeout(idleTimeout.current);
            }

            lastScrollY.current = currentScrollY;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (window.scrollY > 50) {
                // Show if mouse moves to very top of viewport
                if (e.clientY < 80) showNav();
                resetIdleTimeout();
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        if (window.scrollY > 50) {
            resetIdleTimeout();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            if (idleTimeout.current !== null) window.clearTimeout(idleTimeout.current);
        };
    }, [items, hideNav, showNav, resetIdleTimeout]);

    const handleNavClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false);
        if (onNavigate) {
            onNavigate(href);
            return;
        }
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }, [onNavigate]);

    useEffect(() => {
        const layout = () => {
            circleRefs.current.forEach((circle, index) => {
                if (!circle?.parentElement) return;
                const pill = circle.parentElement as HTMLElement;
                const rect = pill.getBoundingClientRect();
                const { width: w, height: h } = rect;
                const R = ((w * w) / 4 + h * h) / (2 * h);
                const D = Math.ceil(2 * R) + 2;
                const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
                const originY = D - delta;

                circle.style.width = `${D}px`;
                circle.style.height = `${D}px`;
                circle.style.bottom = `-${delta}px`;

                gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

                const label = pill.querySelector<HTMLElement>('.pill-label');
                const white = pill.querySelector<HTMLElement>('.pill-label-hover');

                if (label) gsap.set(label, { y: 0 });
                if (white) gsap.set(white, { y: h + 12, opacity: 0 });

                tlRefs.current[index]?.kill();
                const tl = gsap.timeline({ paused: true });
                tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
                if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
                if (white) {
                    gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
                    tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
                }
                tlRefs.current[index] = tl;
            });
        };

        layout();
        window.addEventListener('resize', layout);
        if (document.fonts) document.fonts.ready.then(layout).catch(() => { });

        const menu = mobileMenuRef.current;
        if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0 });

        // Initial load animation
        const logo = logoRef.current;
        const navItems = navItemsRef.current;
        if (logo) {
            gsap.set(logo, { scale: 0 });
            gsap.to(logo, { scale: 1, duration: 0.6, ease });
        }
        if (navItems) {
            gsap.set(navItems, { width: 0, overflow: 'hidden' });
            gsap.to(navItems, { width: 'auto', duration: 0.6, ease });
        }

        return () => window.removeEventListener('resize', layout);
    }, [items, ease]);

    const handleEnter = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
    };

    const handleLeave = (i: number) => {
        const tl = tlRefs.current[i];
        if (!tl) return;
        activeTweenRefs.current[i]?.kill();
        activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newState);
        const hamburger = hamburgerRef.current;
        const menu = mobileMenuRef.current;

        if (hamburger) {
            const lines = hamburger.querySelectorAll('.hamburger-line');
            if (newState) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
            } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
            }
        }

        if (menu) {
            if (newState) {
                gsap.set(menu, { visibility: 'visible' });
                gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease, transformOrigin: 'top center' });
            } else {
                gsap.to(menu, {
                    opacity: 0, y: 10, duration: 0.2, ease, transformOrigin: 'top center',
                    onComplete: () => { gsap.set(menu, { visibility: 'hidden' }); },
                });
            }
        }
    };

    const cssVars = {
        ['--base']: baseColor,
        ['--pill-bg']: pillColor,
        ['--hover-bg']: hoveredPillBgColor,
        ['--hover-text']: hoveredPillTextColor,
        ['--pill-text']: resolvedPillTextColor,
        ['--nav-h']: '42px',
        ['--pill-pad-x']: '18px',
        ['--pill-gap']: '3px',
    } as React.CSSProperties;

    return (
        <div ref={navbarWrapperRef} className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-0" id="navbar">
            <nav
                className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
                aria-label="Primary"
                style={cssVars}
            >
                {/* Logo */}
                <a
                    href="#home"
                    ref={logoRef}
                    onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
                    className="rounded-full inline-flex items-center justify-center overflow-hidden font-display font-bold text-text-primary no-underline"
                    style={{
                        width: 'var(--nav-h)',
                        height: 'var(--nav-h)',
                        background: 'var(--base)',
                        fontSize: '16px',
                    }}
                >
                    SA<span style={{ color: '#8b5cf6' }}>.</span>
                </a>

                {/* Desktop Pills */}
                <div
                    ref={navItemsRef}
                    className="relative items-center rounded-full hidden md:flex ml-2"
                    style={{ height: 'var(--nav-h)', background: 'var(--base)' }}
                >
                    <ul
                        role="menubar"
                        className="list-none flex items-stretch m-0 p-[3px] h-full"
                        style={{ gap: 'var(--pill-gap)' }}
                    >
                        {items.map((item, i) => {
                            const sectionId = item.href.replace('#', '');
                            const isActive = activeSection === sectionId;
                            return (
                                <li key={item.href} role="none" className="flex h-full">
                                    <a
                                        role="menuitem"
                                        href={item.href}
                                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                                        className="relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[13px] leading-[0] tracking-[0.3px] whitespace-nowrap cursor-pointer"
                                        style={{
                                            background: 'transparent',
                                            color: 'var(--pill-text)',
                                            paddingLeft: 'var(--pill-pad-x)',
                                            paddingRight: 'var(--pill-pad-x)',
                                        }}
                                        onMouseEnter={() => handleEnter(i)}
                                        onMouseLeave={() => handleLeave(i)}
                                    >
                                        <span
                                            className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                                            style={{ background: 'var(--hover-bg)', willChange: 'transform' }}
                                            aria-hidden="true"
                                            ref={el => { circleRefs.current[i] = el; }}
                                        />
                                        <span className="label-stack relative inline-block leading-[1] z-[2]">
                                            <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: 'transform' }}>
                                                {item.label}
                                            </span>
                                            <span
                                                className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                                                style={{ color: 'var(--hover-text)', willChange: 'transform, opacity' }}
                                                aria-hidden="true"
                                            >
                                                {item.label}
                                            </span>
                                        </span>
                                        {isActive && (
                                            <span
                                                className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                                                style={{ background: '#ffffff' }}
                                                aria-hidden="true"
                                            />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Mobile Hamburger */}
                <button
                    ref={hamburgerRef}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
                    style={{ width: 'var(--nav-h)', height: 'var(--nav-h)', background: 'var(--base)' }}
                >
                    <span className="hamburger-line w-4 h-0.5 rounded origin-center" style={{ background: 'var(--pill-text)' }} />
                    <span className="hamburger-line w-4 h-0.5 rounded origin-center" style={{ background: 'var(--pill-text)' }} />
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                ref={mobileMenuRef}
                className="md:hidden absolute top-[3.5em] left-4 right-4 rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-[998] origin-top"
                style={{ ...cssVars, background: 'var(--base)' }}
            >
                <ul className="list-none m-0 p-[3px] flex flex-col gap-[3px]">
                    {items.map(item => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className="block py-3 px-4 text-[14px] font-medium rounded-[50px] transition-all duration-200 no-underline"
                                style={{ background: 'var(--pill-bg)', color: 'var(--pill-text)' }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.color = '#000000';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--pill-bg)';
                                    e.currentTarget.style.color = 'var(--pill-text)';
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.href);
                                }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PillNav;
