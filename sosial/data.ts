import type { PortfolioData } from '../src/types';

// ─────────────────────────────────────────────
// All personal data is isolated here.
// Edit this file to update your portfolio content.
// ─────────────────────────────────────────────

import profileImage from './porto profil.jpeg';

const portfolioData: PortfolioData = {
    personal: {
        name: 'Sutan Arlie Johan',
        firstName: 'Sutan Arlie',
        lastName: 'Johan',
        title: 'Full-Stack Developer & Network Engineer',
        tagline: 'Crafting elegant digital experiences with precision and purpose.',
        bio: `I'm a passionate developer and network engineer who bridges the gap between robust infrastructure and beautiful user interfaces. With expertise spanning from low-level networking (MikroTik, Cisco) to modern web frameworks (React, Laravel), I deliver end-to-end solutions that are both technically sound and visually refined.`,
        shortBio: 'Developer. Engineer. Creator.',
        email: 'sutanarlie@example.com',
        location: 'Indonesia',
        availableForWork: true,
        profileImage,
    },

    socials: [
        {
            id: 'github',
            label: 'GitHub',
            url: 'https://github.com/sutanarlie',
            icon: 'github',
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            url: 'https://linkedin.com/in/sutanarlie',
            icon: 'linkedin',
        },
        {
            id: 'instagram',
            label: 'Instagram',
            url: 'https://instagram.com/sutanarlie',
            icon: 'instagram',
        },
        {
            id: 'email',
            label: 'Email',
            url: 'mailto:sutanarlie@example.com',
            icon: 'mail',
        },
    ],

    skills: [
        { id: 's1', name: 'React', category: 'frontend', proficiency: 85 },
        { id: 's2', name: 'TypeScript', category: 'frontend', proficiency: 80 },
        { id: 's3', name: 'Tailwind CSS', category: 'frontend', proficiency: 90 },
        { id: 's4', name: 'HTML/CSS', category: 'frontend', proficiency: 95 },
        { id: 's5', name: 'JavaScript', category: 'frontend', proficiency: 88 },
        { id: 's6', name: 'Laravel', category: 'backend', proficiency: 82 },
        { id: 's7', name: 'PHP', category: 'backend', proficiency: 80 },
        { id: 's8', name: 'Node.js', category: 'backend', proficiency: 70 },
        { id: 's9', name: 'MySQL', category: 'database', proficiency: 78 },
        { id: 's10', name: 'MikroTik', category: 'networking', proficiency: 85 },
        { id: 's11', name: 'Cisco', category: 'networking', proficiency: 75 },
        { id: 's12', name: 'Git', category: 'tools', proficiency: 85 },
        { id: 's13', name: 'Figma', category: 'tools', proficiency: 70 },
        { id: 's14', name: 'Linux', category: 'tools', proficiency: 75 },
    ],

    projects: [
        {
            id: 'p1',
            title: 'Fish Market Management',
            description:
                'A comprehensive web application for managing fish market operations, featuring inventory tracking, sales analytics, and an admin dashboard.',
            techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
            featured: true,
            category: 'Web App',
        },
        {
            id: 'p2',
            title: 'Portfolio V1',
            description:
                'My first personal portfolio website, showcasing projects and skills with a clean, responsive design.',
            techStack: ['HTML', 'CSS', 'JavaScript'],
            featured: true,
            category: 'Website',
        },
        {
            id: 'p3',
            title: 'Network Infrastructure',
            description:
                'Enterprise-grade network infrastructure design and implementation using MikroTik and Cisco technologies.',
            techStack: ['MikroTik', 'Cisco', 'VLAN', 'Firewall'],
            featured: false,
            category: 'Networking',
        },
    ],

    experiences: [
        {
            id: 'e1',
            role: 'Bootcamp Participant',
            company: 'Fullstack Web Development Bootcamp',
            location: 'Indonesia',
            startDate: '2024',
            endDate: '2025',
            description:
                'Intensive fullstack web development bootcamp covering modern frameworks and best practices.',
            highlights: [
                'Built full-stack applications with Laravel & React',
                'Learned modern DevOps practices',
                'Collaborated on team projects',
            ],
        },
    ],

    certificates: [
        {
            id: 'c1',
            title: 'MTCNA — MikroTik Certified Network Associate',
            issuer: 'MikroTik',
            date: '2024',
            imageUrl: '/sosial/Sutan-Arlie-MTCNA_page-0001.jpg',
        },
        {
            id: 'c2',
            title: 'Cisco Networking Certificate',
            issuer: 'Cisco',
            date: '2024',
            imageUrl: '/sosial/Sertifikat-Cisco_page-0001.jpg',
        },
        {
            id: 'c3',
            title: 'Bootcamp Fullstack Web Development',
            issuer: 'Bootcamp Provider',
            date: '2025',
            imageUrl: '/sosial/Sertifikat-Bootcamp-Sutan-Arlie_page-0001.jpg',
        },
        {
            id: 'c4',
            title: 'HKI — Intellectual Property Certificate',
            issuer: 'HKI Indonesia',
            date: '2025',
            imageUrl: '/sosial/HKI.jpeg',
        },
    ],

    navigation: [
        { id: 'nav-home', label: 'Home', href: '#home' },
        { id: 'nav-about', label: 'About', href: '#about' },
        { id: 'nav-projects', label: 'Projects', href: '#projects' },
        { id: 'nav-skills', label: 'Skills', href: '#skills' },
        { id: 'nav-certificates', label: 'Certificates', href: '#certificates' },
        { id: 'nav-contact', label: 'Contact', href: '#contact' },
    ],
};

export default portfolioData;
