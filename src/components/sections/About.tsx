import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/reactbits/SplitText';
import ProfileCard from '@/components/reactbits/ProfileCard';
import aboutMeImg from '@sosial/WhatsApp Image 2025-12-29 at 15.56.16.jpeg';
import type { PersonalInfo } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
    personal: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personal }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: -40, scale: 0.95 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { opacity: 0, x: 40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative z-10 py-section px-6"
        >
            <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
                {/* Profile Image */}
                <div ref={imageRef} className="flex justify-center opacity-0">
                    <div className="w-full max-w-sm">
                        <ProfileCard
                            name={personal.name}
                            title={personal.title}
                            avatarUrl={aboutMeImg}
                            status="Available"
                            showUserInfo={true}
                            contactText="Contact Me"
                            onContactClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div ref={contentRef} className="opacity-0">
                    <span className="section-label mb-4 block">About Me</span>

                    <SplitText
                        text="Bridging Code & Networks"
                        className="font-display mb-6 text-3xl font-bold text-text-primary sm:text-4xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                        textAlign="left"
                    />

                    <p className="mb-6 text-base leading-relaxed text-text-secondary">
                        {personal.bio}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {['React', 'TypeScript', 'Laravel', 'MikroTik', 'Cisco'].map(
                            (tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-border bg-bg-card px-3 py-1 font-mono text-xs text-text-muted transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                                >
                                    {tag}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
