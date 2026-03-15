import type { PortfolioData } from '../src/types';

// ─────────────────────────────────────────────
// All personal data is isolated here.
// Edit this file to update your portfolio content.
// ─────────────────────────────────────────────

import profileImage from './porto profil.jpeg';
import hmtiImage from './hmti.png';

const portfolioData: PortfolioData = {
    personal: {
        name: 'Sutan Arlie Johan',
        firstName: 'Sutan Arlie',
        lastName: 'Johan',
        title: 'Software & Back-End Engineer',
        tagline: 'Crafting elegant digital experiences with precision and purpose.',
        bio: `I am a proactive Information Technology student and researcher at Universitas Bina Sarana Informatika (UBSI), Depok. My work spans software engineering, academic research, and community empowerment. As a researcher and app developer, I co-developed SALI (Sadar dan Lindungi) — a gamified mobile application designed to educate and prevent child sexual abuse (CSA) for early childhood. I am a published academic contributor, with work featured in Jurnal Ilmu Pengetahuan dan Teknologi Komputer (JITK) on user experience evaluation of educational applications. I actively engage in community service, including facilitating community-based Digital Marketing training to help individuals create compelling visual content. I am also a registered inventor and copyright holder under Indonesia's Directorate General of Intellectual Property (HKI) for technological innovations — including co-leading "Trash Point," a smart waste management app that earned 2nd place at the UBSI Jawa Barat IT Bootcamp. I bridge technical engineering with real-world impact, with expertise in modern web frameworks (React, Laravel, TypeScript) and networking (MikroTik MTCNA, Cisco).`,
        shortBio: 'Developer. Engineer. Creator.',
        email: 'sutanarliejohan@gmail.com',
        location: 'Bogor, Indonesia',
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
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Latar Belakang</h4>
                    <p>Pengelolaan sampah seringkali menjadi masalah krusial di lingkungan urban. Kurangnya fasilitas yang terhubung dan kesadaran masyarakat menyebabkan banyak wilayah yang membuang sampah sembarangan. <strong>Trash Point</strong> diinisiasi sebagai solusi digital yang proaktif, menghubungkan masyarakat dengan manajemen sampah secara real-time.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Solusi & Fitur Utama</h4>
                    <p>Aplikasi web ini menghadirkan sistem pelacakan titik sampah terdekat dengan peta interaktif. Kami menerapkan model insentif berbasis poin di mana setiap pelaporan atau pembuangan sampah pada tempatnya dapat dikonversi menjadi hadiah.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Dashboard Analitik:</strong> Memudahkan admin untuk memantau tren penumpukan sampah di berbagai distrik.</li>
                        <li><strong>Reward System:</strong> Menggunakan struktur poin agar masyarakat memiliki motivasi lebih tinggi dalam menjaga kebersihan lingkungan.</li>
                        <li><strong>Pelaporan Real-time:</strong> Pelaporan cepat lokasi yang darurat membutuhkan penanganan kebersihan.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Dampak & Prestasi</h4>
                    <p>Proyek ini tidak hanya sekadar prototipe fungsional; dengan koordinasi tim yang solid, dedikasi, serta validasi kelayakan bisnis, proyek <strong>Trash Point</strong> sukses menempati posisi <strong>Juara 2 dalam ajang IT Bootcamp se-Universitas Bina Sarana Informatika Jawa Barat</strong>. Lebih lanjut, karya inovatif ini telah resmi menerima <strong>Sertifikat Hak Kekayaan Intelektual (HKI)</strong>.</p>
                </div>
            `,
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
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Tinjauan Proyek</h4>
                    <p>Pasar perikanan lokal kerap kali menghadapi kendala distribusi yang memakan waktu sehingga kesegaran hasil tangkapan menurun saat mencapai konsumen akhir. E-Commerce Platform khusus transaksi ikan segar ini dirancang dari nol bekerja sama dengan dosen universitas untuk memotong perantara (middle-men), memberdayakan nelayan lokal, dan menghadirkan ikan kualitas premium langsung ke tangan pelanggan secara efisien.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Arsitektur & Pengembangan</h4>
                    <p>Secara teknis, platform ini dibangun menggunakan <strong>Laravel & PHP</strong> sebagai fondasi *backend* yang melayani manajemen pengelolaan produk, stok inventaris, serta autentikasi berbasis *role* (pengguna vs admin). UI/UX di sisi publik dan area dashboard diformulasikan dengan <strong>Tailwind CSS</strong> agar sepenuhnya responsif pada segala ukuran perangkat seluler dan desktop.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Modul Manajemen Inventaris:</strong> Monitoring level stok Ikan Nila & Ikan Mas Premium secara akurat.</li>
                        <li><strong>Gateway Pembayaran:</strong> Integrasi API transaksi digital guna memberikan kemudahan belanja dan tingkat keamanan yang sesuai standar industri.</li>
                        <li><strong>Admin Dashboard:</strong> Visualisasi grafik data untuk analitik pesanan dan pantauan pendapatan secara real-time.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Hasil Akhir</h4>
                    <p>Aplikasi ini sukses mendemonstrasikan sistem tata kelola bisnis berbasis *Full-Stack* yang solid dengan arsitektur database relasional (MySQL) dengan pengelolaan *state* keranjang belanja yang persisten dan alur *checkout* transaksi yang ramah pengguna.</p>
                </div>
            `,
            techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript'],
            imageUrl: '/sosial/fish market.png',
            repoUrl: 'https://github.com/Sutannn13/E-commerce-platform-for-fresh-fish-transactions.git',
            featured: true,
            category: 'Web App',
        },
        {
            id: 'p3',
            title: 'Website HMTI BSI Margonda',
            description:
                'Website resmi Himpunan Mahasiswa Teknologi Informasi (HMTI) Universitas Bina Sarana Informatika kampus Margonda — platform digital organisasi untuk informasi kegiatan, pengumuman, dan profil kepengurusan.',
            longDescription: `
                <div class="space-y-4">
                    <h4 class="text-xl font-semibold text-white">Tentang Proyek</h4>
                    <p><strong>HMTI BSI Margonda</strong> adalah organisasi kemahasiswaan di bawah Program Studi Teknologi Informasi, Universitas Bina Sarana Informatika. Website ini dikembangkan sebagai platform digital resmi HMTI untuk menampilkan informasi organisasi, agenda kegiatan, pengumuman, dan galeri dokumentasi kemahasiswaan.</p>
                    <h4 class="text-xl font-semibold text-white mt-6">Fitur & Arsitektur</h4>
                    <p>Dibangun menggunakan <strong>Laravel</strong> dengan arsitektur MVC yang terstruktur rapi. Blade templating digunakan di sisi frontend untuk rendering tampilan yang dinamis dan responsif di berbagai perangkat.</p>
                    <ul class="list-disc pl-5 space-y-2 mt-2">
                        <li><strong>Halaman Profil Organisasi:</strong> Menampilkan visi-misi, struktur kepengurusan, dan identitas HMTI secara profesional.</li>
                        <li><strong>Manajemen Konten Dinamis:</strong> Sistem backend untuk mengelola berita, agenda kegiatan, dan pengumuman secara real-time.</li>
                        <li><strong>Desain Responsif:</strong> Tampilan optimal di semua ukuran layar menggunakan Tailwind CSS dan Vite sebagai build tool modern.</li>
                    </ul>
                    <h4 class="text-xl font-semibold text-white mt-6">Konteks Pengembangan</h4>
                    <p>Proyek ini merupakan kontribusi nyata dalam ekosistem kampus UBSI, mendukung digitalisasi kegiatan kemahasiswaan dan memperkuat identitas digital HMTI di tingkat universitas.</p>
                </div>
            `,
            techStack: ['Laravel', 'PHP', 'Blade', 'MySQL', 'Tailwind CSS', 'Vite'],
            imageUrl: hmtiImage,
            repoUrl: 'https://github.com/Sutannn13/HMTI-Margonda.git',
            featured: true,
            category: 'Organization Website',
        },
    ],

    experiences: [
        {
            id: 'e1',
            role: 'Peneliti & Pengembang Aplikasi',
            company: 'Universitas Bina Sarana Informatika, Project Base',
            location: 'Depok, Indonesia',
            startDate: 'Sept 2025',
            endDate: 'Jan 2026',
            description:
                'Co-developed SALI (Sadar dan Lindungi), a gamified mobile application for educating early childhood about preventing child sexual abuse (CSA). Contributed to academic publication on UX evaluation and facilitated community-based Digital Marketing training.',
            highlights: [
                'Co-developed SALI — a gamified mobile education app for child sexual abuse (CSA) prevention targeting early childhood users.',
                'Conducted User Acceptance Testing (UAT) by collecting qualitative feedback from teachers and parents for application feasibility analysis.',
                'Co-authored a research paper published in Jurnal Ilmu Pengetahuan dan Teknologi Komputer (JITK) on user experience evaluation of educational applications.',
                'Facilitated community-based Digital Marketing training to help participants develop visual content creation skills.',
                'Registered as inventor/copyright holder under Direktorat Jenderal Kekayaan Intelektual (HKI Indonesia) for the SALI application.',
            ],
        },
        {
            id: 'e2',
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
            id: 'e3',
            role: 'Full-Stack Developer',
            company: 'Universitas Bina Sarana Informatika (University Project)',
            location: 'Depok, Indonesia',
            startDate: '2023',
            endDate: '2024',
            description:
                'Collaborated with a university lecturer to build an E-Commerce Platform for Fresh Fish Transactions from the ground up.',
            highlights: [
                'Developed a specialized e-commerce system including product management, shopping cart, and checkout flow',
                'Integrated a payment gateway and implemented an admin dashboard for real-time sales monitoring',
                'Utilized Laravel, PHP, MySQL, and Tailwind CSS to ensure a robust and responsive user experience',
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
        { id: 'nav-experience', label: 'Experience', href: '#experience' },
        { id: 'nav-projects', label: 'Projects', href: '#projects' },
        { id: 'nav-skills', label: 'Skills', href: '#skills' },
        { id: 'nav-certificates', label: 'Certificates', href: '#certificates' },
        { id: 'nav-github', label: 'GitHub', href: '#github' },
        { id: 'nav-contact', label: 'Contact', href: '#contact' },
    ],
};

export default portfolioData;
