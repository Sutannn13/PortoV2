import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
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
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 85%',
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
            className="group relative overflow-hidden rounded-2xl border border-border bg-bg-card opacity-0 transition-all duration-500 hover:border-border-hover hover:bg-bg-card-hover hover-lift"
        >
            {/* Featured Badge */}
            {project.featured && (
                <div className="absolute right-4 top-4 z-10 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-wider text-accent">
                    FEATURED
                </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">
                {/* Category */}
                <span className="mb-3 block font-mono text-xs tracking-wide text-text-muted">
                    {project.category}
                </span>

                {/* Title */}
                <h3 className="mb-3 font-display text-xl font-bold text-text-primary transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-md bg-bg-primary px-2.5 py-1 font-mono text-[11px] text-text-muted"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
                        >
                            <ExternalLink size={14} />
                            Live Demo
                        </a>
                    )}
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent"
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
    return (
        <section id="projects" className="relative z-10 py-section px-6">
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

                {/* Projects Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
