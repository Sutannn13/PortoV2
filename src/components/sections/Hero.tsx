import { useRef, useEffect, useState } from 'react';
import { ArrowDown, Download, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
// removed unused SplitText import
import TextPressure from '@/components/reactbits/TextPressure';
import DecryptedText from '@/components/reactbits/DecryptedText';
import Shuffle from '@/components/reactbits/Shuffle';
import type { PersonalInfo } from '@/types';

interface HeroProps {
    personal: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ personal }) => {
    const heroRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [headlineReady, setHeadlineReady] = useState(false);

    useEffect(() => {
        // Start supporting animations immediately since TextPressure is continuous
        const timer = setTimeout(() => setHeadlineReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Entrance animations for supporting elements
    useEffect(() => {
        if (!headlineReady) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            taglineRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.1
        )
            .fromTo(
                badgeRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6 },
                0.3
            )
            .fromTo(
                metaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                0.5
            )
            .fromTo(
                ctaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8 },
                0.7
            )
            .fromTo(
                scrollRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                1.0
            );
    }, [headlineReady]);

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6"
        >
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
                {/* Status Badge */}
                <div ref={badgeRef} className="mb-6 sm:mb-8 opacity-0 mt-16 sm:mt-0">
                    {personal.availableForWork && (
                        <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-subtle px-3 sm:px-4 py-1.5 maxWidthBadge">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                            </span>
                            <Shuffle
                                text="Available for intern"
                                tag="span"
                                className="font-mono text-[10px] sm:text-xs tracking-wide text-accent-light"
                                shuffleDirection="right"
                                duration={0.35}
                                animationMode="evenodd"
                                shuffleTimes={1}
                            />
                        </div>
                    )}
                </div>

                {/* Headline with TextPressure */}
                <div className="relative mb-4 w-full min-h-[60px] h-[80px] sm:h-[130px] md:h-[180px] lg:h-[220px] flex items-center justify-center">
                    <TextPressure
                        text="SUTAN A.J."
                        flex
                        alpha={false}
                        stroke={false}
                        width
                        weight
                        italic
                        textColor="#f3f1f1"
                        strokeColor="#8b5cf6"
                        minFontSize={24}
                    />
                </div>

                {/* Tagline */}
                <div ref={taglineRef} className="mb-6 w-full text-lg text-text-secondary sm:text-xl md:text-2xl opacity-0">
                    <DecryptedText
                        text={personal.tagline}
                        speed={100}
                        maxIterations={15}
                        animateOn="view"
                        revealDirection="center"
                        sequential={false}
                    />
                </div>

                {/* Meta Info (Title + Location) */}
                <div
                    ref={metaRef}
                    className="mb-10 flex flex-wrap items-center justify-center gap-4 opacity-0"
                >
                    <span className="rounded-full border border-border bg-bg-card px-4 py-1.5 font-mono text-xs text-text-secondary cursor-default">
                        <DecryptedText
                            text={personal.title}
                            speed={90}
                            maxIterations={12}
                            animateOn="hover"
                            revealDirection="start"
                            sequential={true}
                        />
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-text-muted">
                        <MapPin size={14} />
                        {personal.location}
                    </span>
                </div>

                {/* CTA Buttons */}
                <div
                    ref={ctaRef}
                    className="flex flex-wrap items-center justify-center gap-4 opacity-0"
                >
                    <a
                        href="#projects"
                        id="cta-view-work"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById('projects')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30"
                    >
                        View My Work
                        <ArrowDown
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                    </a>
                    <a
                        href="/sosial/CV SUTAN ARLIE.pdf"
                        id="cta-download-cv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text-primary"
                    >
                        <Download
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                        Download CV
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                ref={scrollRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-text-muted">
                        SCROLL
                    </span>
                    <div className="h-10 w-[1px] bg-gradient-to-b from-text-muted/50 to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
