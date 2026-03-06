import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import Dock from '@/components/reactbits/Dock';

interface FooterProps {
    name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
    const year = new Date().getFullYear();

    const dockItems = [
        {
            icon: <Github size={18} />,
            label: 'GitHub',
            onClick: () => window.open('https://github.com/Sutannn13', '_blank')
        },
        {
            icon: <Instagram size={18} />,
            label: 'Instagram',
            onClick: () => window.open('https://www.instagram.com/arlie.sutan', '_blank')
        },
        {
            icon: <Linkedin size={18} />,
            label: 'LinkedIn',
            onClick: () => window.open('https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEBZ2wYPsRluQAAAZy7MwkQqLxSwDFvwrg-5s7Rg1w3BpR5eCenFcj_2kOO93gH5ioL4ewe3TgmAVICmPOz6dHSV_OAB-jw-ptrhTlZoiSj-9GFO549K0mJONNOCfBD5JR0WPk=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsutan-arlie-38877635b', '_blank')
        },
        {
            icon: <Mail size={18} />,
            label: 'Email',
            onClick: () => (window.location.href = 'mailto:sutanarliejohan@gmail.com')
        },
    ];

    return (
        <footer
            id="footer"
            className="relative z-10 border-t border-border py-12"
        >
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6">
                {/* Social Links Dock */}
                <div className="flex h-[80px] w-full items-center justify-center relative">
                    <Dock
                        items={dockItems}
                        panelHeight={60}
                        baseItemSize={44}
                        magnification={70}
                    />
                </div>

                {/* Copyright */}
                <p className="flex items-center gap-1.5 text-xs text-text-muted">
                    © {year} {name}. Built with{' '}
                    <Heart size={12} className="text-accent" fill="currentColor" />
                </p>
            </div>
        </footer>
    );
};

export default Footer;
