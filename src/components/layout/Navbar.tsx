import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '@/types';

interface NavbarProps {
    items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
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
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);

    const handleNavClick = useCallback(
        (href: string) => {
            setIsOpen(false);
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        },
        []
    );

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'glass py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
                {/* Logo */}
                <a
                    href="#home"
                    className="font-display text-lg font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#home');
                    }}
                >
                    SA<span className="text-accent">.</span>
                </a>

                {/* Desktop Nav */}
                <ul className="hidden items-center gap-1 md:flex">
                    {items.map((item) => {
                        const sectionId = item.href.replace('#', '');
                        const isActive = activeSection === sectionId;
                        return (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive
                                            ? 'text-accent'
                                            : 'text-text-secondary hover:text-text-primary'
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-accent" />
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Toggle */}
                <button
                    id="mobile-menu-toggle"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-text-secondary transition-colors hover:text-text-primary md:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-smooth md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <ul className="glass-subtle mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-4">
                    {items.map((item) => {
                        const sectionId = item.href.replace('#', '');
                        const isActive = activeSection === sectionId;
                        return (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-accent-subtle text-accent'
                                            : 'text-text-secondary hover:bg-accent-subtle hover:text-text-primary'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
