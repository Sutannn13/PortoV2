import React from 'react';
import ProfileCard from '@/components/reactbits/ProfileCard';
import ScrollVelocity from '@/components/reactbits/ScrollVelocity';
import type { PersonalInfo } from '@/types';
import aboutMeImg from '@sosial/sutan_transparan.png';

interface ProfileCardSectionProps {
    personal: PersonalInfo;
}

const ProfileCardSection: React.FC<ProfileCardSectionProps> = ({ personal }) => {
    return (
        <section id="profile" className="relative z-10 w-full min-h-[80vh] flex justify-center items-center px-4 sm:px-6 py-12 sm:py-20 overflow-hidden">
            {/* Animated Background Text */}
            <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.07] z-0">
                <ScrollVelocity
                    texts={[personal.name, 'Software Engineer', 'Back-End Engineer']}
                    velocity={60}
                    className="text-white"
                />
            </div>

            <div className="w-[85%] max-w-[240px] sm:max-w-[320px] md:max-w-sm relative z-10 flex justify-center mx-auto">
                <ProfileCard
                    name={personal.name}
                    title={personal.title}
                    handle="sutanarlie"
                    status="Available"
                    contactText="Contact Me"
                    avatarUrl={aboutMeImg}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={true}
                    onContactClick={() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    behindGlowColor="hsla(237, 100%, 70%, 0.6)"
                    iconUrl="/assets/demo/iconpattern.png"
                    behindGlowEnabled={true}
                    innerGradient="linear-gradient(145deg,hsla(237, 40%, 45%, 0.55) 0%,hsla(219, 60%, 70%, 0.27) 100%)"
                />
            </div>
        </section>
    );
};

export default ProfileCardSection;
