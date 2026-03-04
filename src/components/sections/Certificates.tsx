import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, X } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import type { Certificate } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface CertificatesProps {
    certificates: Certificate[];
}

const CertificateCard: React.FC<{
    cert: Certificate;
    index: number;
    onView: (cert: Certificate) => void;
}> = ({ cert, index, onView }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.12,
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
            onClick={() => onView(cert)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-bg-card opacity-0 transition-all duration-500 hover:border-accent/30 hover:bg-bg-card-hover hover-lift"
        >
            {/* Image Preview */}
            {cert.imageUrl && (
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                </div>
            )}

            {/* Content */}
            <div className="p-5">
                <div className="mb-2 flex items-start gap-3">
                    <Award
                        size={18}
                        className="mt-0.5 shrink-0 text-accent"
                    />
                    <div>
                        <h3 className="text-sm font-semibold leading-snug text-text-primary group-hover:text-accent transition-colors duration-300">
                            {cert.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-text-muted">
                            {cert.issuer} · {cert.date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CertificateModal: React.FC<{
    cert: Certificate | null;
    onClose: () => void;
}> = ({ cert, onClose }) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (cert) {
            document.addEventListener('keydown', handleKey);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [cert, onClose]);

    if (!cert) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] max-w-3xl overflow-auto rounded-2xl border border-border bg-bg-secondary p-2"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-bg-card/80 text-text-muted backdrop-blur-sm transition-colors hover:bg-bg-card hover:text-text-primary"
                    aria-label="Close modal"
                >
                    <X size={16} />
                </button>
                {cert.imageUrl && (
                    <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full rounded-xl"
                    />
                )}
                <div className="p-4">
                    <h3 className="font-display text-lg font-bold text-text-primary">
                        {cert.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-text-muted">
                        {cert.issuer} · {cert.date}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    return (
        <>
            <section id="certificates" className="relative z-10 py-section px-6">
                <div className="mx-auto max-w-6xl">
                    {/* Section Header */}
                    <div className="mb-16 text-center">
                        <span className="section-label mb-4 block">Credentials</span>
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
                    </div>

                    {/* Certificates Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {certificates.map((cert, i) => (
                            <CertificateCard
                                key={cert.id}
                                cert={cert}
                                index={i}
                                onView={setSelectedCert}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <CertificateModal
                cert={selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </>
    );
};

export default Certificates;
