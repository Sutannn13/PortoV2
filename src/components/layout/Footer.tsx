import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import type { SocialLink } from '@/types';

interface FooterProps {
    socials: SocialLink[];
    name: string;
}

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> =
{
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    mail: Mail,
};

const Footer: React.FC<FooterProps> = ({ socials, name }) => {
    const year = new Date().getFullYear();

    return (
        <footer
            id="footer"
            className="relative z-10 border-t border-border py-12"
        >
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6">
                {/* Social Links */}
                <div className="flex items-center gap-4">
                    {socials.map((social) => {
                        const Icon = iconMap[social.icon];
                        return (
                            <a
                                key={social.id}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                            >
                                {Icon && (
                                    <Icon
                                        size={18}
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    />
                                )}
                            </a>
                        );
                    })}
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
