import { useState, useEffect } from 'react';
import SplitText from '@/components/reactbits/SplitText';
import Folder from '@/components/reactbits/Folder';
import CertificatesPage from './CertificatesPage';
import type { Certificate } from '@/types';

interface CertificatesProps {
    certificates: Certificate[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
    const [isPageOpen, setIsPageOpen] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(
        () => typeof window !== 'undefined' && window.innerWidth < 768
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prepare blurred preview items for the folder
    const folderItems = certificates.slice(0, 3).map((cert) => (
        <div
            key={cert.id}
            className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-[8px]"
            onClick={(e) => {
                e.stopPropagation();
                setIsPageOpen(true);
            }}
            title="Click to view all certificates"
        >
            <img
                src={cert.imageUrl}
                alt={cert.title}
                className="h-full w-full object-cover blur-sm opacity-80"
                loading="lazy"
            />
            {/* Overlay hint */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 font-display text-sm font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View All
            </div>
        </div>
    ));

    return (
        <>
            <section
                id="certificates"
                className="relative z-10 py-12 sm:py-section px-4 sm:px-6"
            >
                <div className="mx-auto max-w-6xl">
                    {/* Section Header */}
                    <div className="mb-10 sm:mb-16 text-center">
                        <span className="section-label mb-3 sm:mb-4 block">
                            Achievements
                        </span>
                        <SplitText
                            text="Certificates & Awards"
                            className="font-display text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl"
                            tag="h2"
                            delay={30}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 30 }}
                            to={{ opacity: 1, y: 0 }}
                        />
                        <p className="mt-8 mx-auto max-w-md text-text-muted">
                            Click the folder below to explore my credentials and awards in more detail.
                        </p>
                    </div>

                    {/* Interactive Folder Animation */}
                    <div className="relative mt-8 mx-auto flex h-[250px] sm:h-[350px] w-full max-w-sm items-center justify-center md:h-[450px]">
                        <Folder
                            size={isMobile ? 1.0 : 2.5}
                            color="#5227FF"
                            className="custom-folder"
                            items={folderItems}
                        />
                    </div>
                </div>
            </section>

            {/* Separate full-screen Certificates Page */}
            {isPageOpen && (
                <CertificatesPage
                    certificates={certificates}
                    onClose={() => setIsPageOpen(false)}
                />
            )}
        </>
    );
};

export default Certificates;
