import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/reactbits/SplitText';
import type { Skill, SkillCategory } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
    skills: Skill[];
}

const categoryLabels: Record<SkillCategory, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    networking: 'Networking',
    database: 'Database',
    tools: 'Tools & DevOps',
    other: 'Other',
};

const categoryColors: Record<SkillCategory, string> = {
    frontend: 'from-violet-500/20 to-blue-500/20',
    backend: 'from-emerald-500/20 to-teal-500/20',
    networking: 'from-amber-500/20 to-orange-500/20',
    database: 'from-rose-500/20 to-pink-500/20',
    tools: 'from-cyan-500/20 to-sky-500/20',
    other: 'from-gray-500/20 to-slate-500/20',
};

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({
    skill,
    index,
}) => {
    const barRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                barRef.current,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: barRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                fillRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1,
                    delay: index * 0.05 + 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: barRef.current,
                        start: 'top 90%',
                        once: true,
                    },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <div ref={barRef} className="opacity-0">
            <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-text-primary">
                    {skill.name}
                </span>
                <span className="font-mono text-xs text-text-muted">
                    {skill.proficiency}%
                </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-bg-card">
                <div
                    ref={fillRef}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-light"
                    style={{ width: `${skill.proficiency}%` }}
                />
            </div>
        </div>
    );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    // Group skills by category
    const grouped = skills.reduce(
        (acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        },
        {} as Record<SkillCategory, Skill[]>
    );

    return (
        <section id="skills" className="relative z-10 py-section px-6">
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <span className="section-label mb-4 block">Expertise</span>
                    <SplitText
                        text="Skills & Technologies"
                        className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                </div>

                {/* Skills Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {(Object.keys(grouped) as SkillCategory[]).map((category) => (
                        <div
                            key={category}
                            className="group rounded-2xl border border-border bg-bg-card p-6 transition-all duration-500 hover:border-border-hover"
                        >
                            {/* Category Header */}
                            <div className="mb-5 flex items-center gap-3">
                                <div
                                    className={`h-8 w-8 rounded-lg bg-gradient-to-br ${categoryColors[category]}`}
                                />
                                <h3 className="font-display text-base font-semibold text-text-primary">
                                    {categoryLabels[category]}
                                </h3>
                            </div>

                            {/* Skill Bars */}
                            <div className="flex flex-col gap-4">
                                {grouped[category].map((skill, i) => (
                                    <SkillBar key={skill.id} skill={skill} index={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
