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
        bio: `I am a proactive and highly adaptable Information Technology student at Universitas Bina Sarana Informatika, Depok. With hands-on experience in logistics (Lazada Indonesia) and customer service, I bring a blend of real-world work ethic and technical depth. As Project Manager of a 9-person team in the UBSI IT Bootcamp, I led the development of "Trash Point" — a web-based waste management app — earning 2nd place and securing an official HKI Intellectual Property Certificate. I bridge the gap between technical infrastructure and user-centric solutions, with expertise spanning networking (MikroTik MTCNA, Cisco) and modern web frameworks (React, Laravel, TypeScript).`,
        shortBio: 'Developer. Engineer. Creator.',
        email: 'sutanarliejohan@gmail.com',
        location: 'Depok, Jawa Barat, Indonesia',
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
            title: 'Trash Point',
            description:
                'Inovasi sistem pengelolaan sampah cerdas yang dikembangkan pada bootcamp. Meraih Juara 2 se-UBSI Jawa Barat, dengan fitur pelacakan lokasi titik sampah, dashboard analitik, dan sistem reward berbasis poin.',
            techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
            imageUrl: '/sosial/HKI.jpeg',
            featured: true,
            category: 'Web App',
            award: '🏆 Juara 2 — UBSI Jawa Barat',
        },
        {
            id: 'p2',
            title: 'E-Commerce Platform for Fresh Fish Transactions',
            description:
                'Platform e-commerce khusus transaksi ikan segar, lengkap dengan manajemen produk, sistem keranjang belanja, payment gateway, dan dashboard admin untuk memantau penjualan secara real-time.',
            techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
            imageUrl: '/sosial/fish market.png',
            repoUrl: 'https://github.com/Sutannn13/E-commerce-platform-for-fresh-fish-transactions.git',
            featured: true,
            category: 'Web App',
        },
    ],

    experiences: [
        {
            id: 'e1',
            role: 'Project Manager & Lead Developer',
            company: 'IT Bootcamp — Universitas Bina Sarana Informatika',
            location: 'Depok, Indonesia',
            startDate: '2024',
            endDate: '2025',
            description:
                'Led a 9-person team in a fullstack web development bootcamp, building "Trash Point" — a web-based education and waste management app.',
            highlights: [
                'Coordinated full project lifecycle: ideation, design, task delegation, and final jury presentation',
                'Achieved 2nd place out of dozens of competing teams at UBSI Jawa Barat',
                'Project registered and awarded HKI Intellectual Property Certificate',
                'Built with Laravel, MySQL, Tailwind CSS, and JavaScript',
            ],
        },
        {
            id: 'e2',
            role: 'Warehouse Sorter — Daily Worker',
            company: 'Lazada Indonesia',
            location: 'Depok, Jawa Barat',
            startDate: 'Jan 2024',
            endDate: 'Apr 2025',
            description:
                'Responsible for sorting and scanning thousands of packages daily to ensure accurate delivery to the next distribution hub.',
            highlights: [
                'Consistently met individual and team daily throughput targets',
                'Operated efficiently in a high-speed, fast-paced warehouse environment',
            ],
        },
        {
            id: 'e3',
            role: 'Waiter — Part-time',
            company: 'Rumah Makan Pondok Bambu',
            location: 'Depok, Jawa Barat',
            startDate: 'Apr 2023',
            endDate: 'Aug 2023',
            description:
                'Delivered friendly and responsive customer service, managing multiple table orders simultaneously from order-taking to serving.',
            highlights: [
                'Collaborated effectively with kitchen and cashier teams during peak hours',
                'Improved overall guest experience through attentive service',
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
            issuer: 'UBSI — Bina Sarana Informatika',
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
