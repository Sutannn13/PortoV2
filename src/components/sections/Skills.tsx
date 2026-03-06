import SplitText from '@/components/reactbits/SplitText';
import CircularGallery from '@/components/reactbits/CircularGallery';

// ─────────────────────────────────────────────
// Skills Section — Combined CircularGallery & Cards
// Tech stack items with devicon logos 
// rendered as a 1 row interactive tech bar
// ─────────────────────────────────────────────

const techItems = [
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', text: 'React' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', text: 'TypeScript' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', text: 'Tailwind CSS' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', text: 'HTML / CSS' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', text: 'JavaScript' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', text: 'Laravel' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', text: 'PHP' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', text: 'Node.js' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', text: 'MySQL' },
    { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', text: 'Git' },
];

const Skills: React.FC = () => {
    return (
        <section id="skills" className="relative z-10 py-section px-6">
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="mb-2 text-center">
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
                    <p className="mt-4 text-text-secondary text-sm max-w-md mx-auto">
                        Drag or scroll the tech bar to explore my stack
                    </p>
                </div>
            </div>

            {/* CircularGallery as a 1 row tech bar */}
            <div className="mx-auto mt-4" style={{ height: '350px', position: 'relative', maxWidth: '1200px' }}>
                <CircularGallery
                    items={techItems}
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.06}
                    scrollSpeed={2}
                    scrollEase={0.05}
                />
            </div>
        </section>
    );
};

export default Skills;
