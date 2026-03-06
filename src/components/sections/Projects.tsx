import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowUpRight, Trophy } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import TargetCursor from '@/components/reactbits/TargetCursor';
import type { Project } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
    projects: Project[];
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({
    project,
    index,
}) => {
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
        <div
            ref={cardRef}
            className="cursor-target group relative overflow-hidden rounded-2xl border border-border bg-bg-card opacity-0 transition-all duration-500 hover:border-accent/30 hover:bg-bg-card-hover flex flex-col"
            style={{ cursor: 'none' }}
        >
            {/* Project Image */}
            {project.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />

                    {/* Award badge on image */}
                    {project.award && (
                        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/40 backdrop-blur-sm px-3 py-1">
                            <Trophy size={11} className="text-yellow-400" />
                            <span className="font-mono text-[10px] font-semibold tracking-wide text-yellow-300">
                                {project.award}
                            </span>
                        </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute right-3 top-3 z-10 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
                            FEATURED
                        </div>
                    )}
                </div>
            )}

            {/* If no image, show featured badge in corner */}
            {!project.imageUrl && project.featured && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
                    FEATURED
                </div>
            )}

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
                {/* Category */}
                <span className="mb-2 block font-mono text-xs tracking-wide text-text-muted">
                    {project.category}
                </span>

                {/* Title */}
                <h3 className="mb-3 font-display text-lg font-bold leading-snug text-text-primary transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md bg-bg-primary px-2.5 py-1 font-mono text-[11px] text-text-muted border border-border/50"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
                            style={{ cursor: 'none' }}
                        >
                            <Github size={14} />
                            Source
                        </a>
                    )}
                    <ArrowUpRight
                        size={18}
                        className="ml-auto text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const [cursorVisible, setCursorVisible] = useState(false);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-10 py-section px-6"
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
        >
            {/* TargetCursor — hanya tampil saat mouse di dalam section Projects */}
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

            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="section-label mb-4 block">Portfolio</span>
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

                {/* Projects Grid — 2 cards centered */}
                <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
