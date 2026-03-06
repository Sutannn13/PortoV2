import { useRef, useEffect, useState } from 'react';
import Lanyard from '@/components/reactbits/Lanyard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LanyardSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top center',
                once: true,
                onEnter: () => setIsVisible(true)
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="lanyard" ref={sectionRef} className="relative z-10 w-full h-[600px] md:h-screen flex justify-center items-center">
            {isVisible && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />}
        </section>
    );
};

export default LanyardSection;
