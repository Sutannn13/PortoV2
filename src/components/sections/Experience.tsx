import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import type { Experience as ExperienceType } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
    experiences: ExperienceType[];
}

const TimelineItem: React.FC<{ exp: ExperienceType; index: number; isLast: boolean }> = ({
    exp,
    index,
    isLast,
}) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                itemRef.current,
                { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: itemRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    return (
        <div ref={itemRef} className="relative flex gap-3 sm:gap-4 md:gap-6 opacity-0">
            {/* Timeline Vertical Line & Dot (Black & White Theme) */}
            <div className="relative flex flex-col items-center min-w-[16px] sm:min-w-[20px]">
                {/* Glowing dot */}
                <div className="relative z-10 mt-1.5 sm:mt-2">
                    <div className="absolute inset-0 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-white/30 animate-ping" />
                    <div className="relative h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-white bg-black shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                </div>
                {/* Connector line */}
                {!isLast && (
                    <div className="w-[1px] sm:w-[2px] flex-1 bg-gradient-to-b from-white/60 via-white/10 to-transparent my-1 sm:my-2" />
                )}
            </div>

            {/* Content Card */}
            <div className={`group flex-1 pb-8 sm:pb-12 ${isLast ? 'pb-0' : ''}`}>
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-md p-4 sm:p-5 md:p-6 transition-all duration-500 hover:border-white/30 hover:bg-white/5 md:hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]">
                    
                    {/* Subtle animated background gradient on hover */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2">
                        {/* Date badge */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 transition-colors duration-300 group-hover:border-white/40 group-hover:bg-white/10 w-fit mb-1 sm:mb-2">
                            <Calendar size={12} className="text-white/70" />
                            <span className="font-mono text-[10px] sm:text-[11px] tracking-wide text-white/90">
                                {exp.startDate} — {exp.endDate}
                            </span>
                        </div>

                        {/* Role */}
                        <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white transition-colors duration-300">
                            {exp.role}
                        </h3>

                        {/* Company & Location */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-neutral-400 mb-2 sm:mb-3">
                            <span className="flex items-center gap-1">
                                <Briefcase size={12} className="text-neutral-500" />
                                {exp.company}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin size={12} className="text-neutral-500" />
                                {exp.location}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm leading-relaxed text-neutral-300 mb-2 sm:mb-3">
                            {exp.description}
                        </p>

                        {/* Highlights */}
                        {exp.highlights.length > 0 && (
                            <ul className="space-y-1.5 sm:space-y-2">
                                {exp.highlights.map((h, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300"
                                    >
                                        <ChevronRight
                                            size={14}
                                            className="mt-0.5 shrink-0 text-white/50 group-hover:text-white transition-colors duration-300"
                                        />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
    return (
        <section
            id="experience"
            className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
        >
            <div className="mx-auto max-w-3xl">
                {/* Section Header */}
                <div className="mb-10 sm:mb-16 text-center">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-3 sm:mb-4 block">Journey</span>
                    <SplitText
                        text="Experience"
                        className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl"
                        tag="h2"
                        delay={30}
                        duration={0.8}
                        splitType="words"
                        from={{ opacity: 0, y: 30 }}
                        to={{ opacity: 1, y: 0 }}
                    />
                    <p className="mt-4 text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
                        My professional and organizational journey so far
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {experiences.map((exp, i) => (
                        <TimelineItem
                            key={exp.id}
                            exp={exp}
                            index={i}
                            isLast={i === experiences.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
