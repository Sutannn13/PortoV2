import React from 'react';

interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
}

export default function GradientText({
    children,
    className = '',
    colors = ['#ffaa40', '#9c40ff', '#ffaa40'],
    animationSpeed = 8,
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
        animationDuration: `${animationSpeed}s`,
        backgroundSize: '300% 100%',
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
    };

    return (
        <div
            className={className}
            style={gradientStyle}
        >
            {children}
        </div>
    );
}
