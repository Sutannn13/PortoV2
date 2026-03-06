import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Shuffle from '@/components/reactbits/Shuffle';
import Beams from '@/components/reactbits/Beams';
import PillNav from '@/components/reactbits/PillNav';
import { ExpandableCard } from '@/components/ui/expandable-card';
import CountUp from '@/components/reactbits/CountUp';
import GradientText from '@/components/reactbits/GradientText';
import type { Certificate } from '@/types';

interface CertificatesPageProps {
    certificates: Certificate[];
    onClose: () => void;
}

const pillNavItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

const CertificatesPage: React.FC<CertificatesPageProps> = ({ certificates, onClose }) => {
    const [showIntro, setShowIntro] = useState(true);
    const [introFading, setIntroFading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [openCardId, setOpenCardId] = useState<string | null>(null);

    const certContent: Record<string, React.ReactNode> = {
        c1: (
            <>
                <p>The <strong className="text-white/90">MikroTik Certified Network Associate (MTCNA)</strong> is an internationally recognized certification validating core proficiency in RouterOS configuration and MikroTik networking products.</p>
                <h4>Topics Covered</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>RouterOS installation, licensing &amp; basic setup</li>
                    <li>DHCP, DNS, and IP address management</li>
                    <li>Static &amp; dynamic routing fundamentals</li>
                    <li>Wireless networking configuration and security (WPA2/WPA3)</li>
                    <li>Firewall rules, NAT, and packet filtering</li>
                    <li>Tunneling protocols: PPP, PPPoE, PPTP, L2TP</li>
                    <li>Bandwidth management &amp; traffic shaping (Queues)</li>
                    <li>Network monitoring, logging, and troubleshooting</li>
                </ul>
            </>
        ),
        c2: (
            <>
                <p>Issued by <strong className="text-white/90">Cisco Networking Academy</strong>, this certificate validates completion of the <em>Introduction to Cybersecurity</em> course — foundational knowledge for understanding cyber threats, attacks, and defense strategies.</p>
                <h4>Topics Covered</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Common cybersecurity threats, attacks &amp; vulnerabilities</li>
                    <li>Types of malware, phishing &amp; social engineering</li>
                    <li>Network security fundamentals and best practices</li>
                    <li>Protecting personal and organizational data</li>
                    <li>Introduction to cryptography and data integrity</li>
                    <li>Career pathways in cybersecurity</li>
                </ul>
            </>
        ),
        c3: (
            <>
                <p>Issued by <strong className="text-white/90">Universitas Bina Sarana Informatika (UBSI)</strong> upon completion of an intensive Fullstack Web Development Bootcamp, recognized for outstanding team performance and innovation.</p>
                <h4>Achievements</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Completed intensive training in modern fullstack web development frameworks</li>
                    <li>Served as <strong className="text-white/90">Project Manager</strong> leading a 9-person development team</li>
                    <li>Built <em>Trash Point</em> — a web-based waste management &amp; education application</li>
                    <li>Achieved <strong className="text-white/90">2nd Place</strong> at the UBSI Jawa Barat IT Bootcamp competition</li>
                </ul>
                <h4>Tech Stack Used</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Laravel, PHP, MySQL</li>
                    <li>Tailwind CSS, JavaScript</li>
                    <li>RESTful API design &amp; MVC architecture</li>
                </ul>
            </>
        ),
        c4: (
            <>
                <p>Official <strong className="text-white/90">Intellectual Property Right (HKI)</strong> certificate issued by the Direktorat Jenderal Kekayaan Intelektual, Kementerian Hukum Republik Indonesia — recognizing the originality and innovation of the registered digital work.</p>
                <h4>Registered Work</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Title: <em>Aplikasi Edukasi Dan Pengelolaan Sampah Berbasis Web (Trash Point)</em></li>
                    <li>Registration No: <strong className="text-white/90">000946578</strong></li>
                    <li>Issued: 25 Juni 2025, Jakarta Pusat</li>
                    <li>Protection Period: 50 years from date of first publication</li>
                    <li>Granted under Pasal 72 Undang-Undang No. 28 Tahun 2014 tentang Hak Cipta</li>
                </ul>
            </>
        ),
    };

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleNavClick = (href: string) => {
        onClose();
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return createPortal(
        <>
            {/* ── Intro Loading Screen ── */}
            {showIntro && (
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050010] transition-all duration-1000 ease-in-out ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    <div className="flex items-end space-x-1">
                        <GradientText
                            colors={['#8b5cf6', '#B19EEF', '#5227FF', '#8b5cf6']}
                            className="text-6xl md:text-8xl font-display font-bold leading-none inline-block pb-2"
                            animationSpeed={3}
                        >
                            <CountUp
                                from={0}
                                to={100}
                                duration={5}
                                onEnd={() => {
                                    setIntroFading(true);
                                    setTimeout(() => setShowIntro(false), 1000);
                                }}
                            />
                        </GradientText>
                        <span className="text-[#B19EEF] text-2xl md:text-4xl font-display font-bold mb-3 md:mb-5">%</span>
                    </div>
                </div>
            )}

            <div className={`fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-[#050010] transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
                {/* ── Beams Background ── */}
                <div className="fixed inset-0 z-0">
                    <Beams
                        beamWidth={3}
                        beamHeight={30}
                        beamNumber={20}
                        lightColor="#decaca"
                        speed={5.1}
                        noiseIntensity={1.75}
                        scale={0.2}
                        rotation={30}
                    />
                </div>

                {/* ── PillNav Header ── */}
                <PillNav
                    items={pillNavItems}
                    baseColor="transparent"
                    pillColor="rgba(6, 0, 16, 0.6)"
                    hoveredPillTextColor="#060010"
                    pillTextColor="#f0f0f5"
                    onNavigate={handleNavClick}
                />

                {/* Content Container */}
                <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:py-20 lg:py-24">
                    <div className="mb-12 text-center sm:mb-16 md:mb-20">
                        <span className="mb-4 mx-auto inline-block text-[#B19EEF] font-mono text-xs uppercase tracking-[0.25em]">
                            My Certificates
                        </span>
                        <Shuffle
                            text="Certificates & Awards"
                            className="font-display text-3xl font-bold text-white sm:text-5xl md:text-6xl break-words"
                            tag="h1"
                            shuffleDirection="right"
                            duration={0.35}
                            animationMode="evenodd"
                            shuffleTimes={2}
                            ease="power3.out"
                            stagger={0.03}
                            threshold={0.1}
                            triggerOnce={true}
                            triggerOnHover
                            respectReducedMotion={true}
                        />
                    </div>

                    {/* Grid for ExpandableCards */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 place-items-stretch">
                        {certificates.map((cert) => (
                            <ExpandableCard
                                key={cert.id}
                                title={cert.title}
                                src={cert.imageUrl || ''}
                                description={cert.issuer + ' · ' + cert.date}
                                classNameExpanded="dark:[&_h4]:text-white [&_h4]:font-semibold [&_h4]:text-xl [&_h4]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1"
                                isBlurred={
                                    openCardId === null &&
                                    hoveredCard !== null &&
                                    hoveredCard !== cert.id
                                }
                                onOpenChange={(open) => {
                                    setOpenCardId(open ? cert.id : null);
                                    setHoveredCard(null);
                                }}
                                onMouseEnter={() => { if (!openCardId) setHoveredCard(cert.id); }}
                                onMouseLeave={() => { if (!openCardId) setHoveredCard(null); }}
                            >
                                {certContent[cert.id] ?? (
                                    <>
                                        <p>{cert.title}</p>
                                        <p>{cert.issuer} — {cert.date}</p>
                                    </>
                                )}
                            </ExpandableCard>
                        ))}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default CertificatesPage;
