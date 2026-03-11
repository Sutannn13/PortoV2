import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/reactbits/SplitText';
import TargetCursor from '@/components/reactbits/TargetCursor';
import { ProjectExpandableCard } from '@/components/ui/ProjectExpandableCard';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
    projects: Project[];
}

const AnimatedCardWrapper: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: index * 0.18,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 88%',
                        once: true,
                    },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <div ref={cardRef} className="opacity-0 flex flex-col h-full w-full">
            <ProjectExpandableCard project={project} className="flex-1 h-full w-full">
                {/* Expandable Content Body */}
                {project.longDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
                ) : (
                    <p className="text-text-secondary">More details coming soon...</p>
                )}
            </ProjectExpandableCard>
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [cursorVisible, setCursorVisible] = useState(false);

    // Detect if device supports hover (i.e., not a touch-only device)
    const isTouchDevice = useCallback(() => {
        return window.matchMedia('(hover: none)').matches;
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
        >
            {/* TargetCursor — only on non-touch devices */}
            {!isTouchDevice() && (
                <div
                    style={{
                        opacity: cursorVisible ? 1 : 0,
                        pointerEvents: 'none',
                        transition: 'opacity 0.15s ease',
                    }}
                >
                    <TargetCursor
                        spinDuration={2}
                        hideDefaultCursor={false}
                        parallaxOn={true}
                        hoverDuration={0.2}
                    />
                </div>
            )}

            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-12 sm:mb-16 text-center">
                    <span className="section-label mb-3 sm:mb-4 block">Portfolio</span>
                    <SplitText
                        text="Selected Projects"
                        className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                    {projects.map((project, i) => (
                        <AnimatedCardWrapper key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
