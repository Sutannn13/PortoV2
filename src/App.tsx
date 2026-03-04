import Silk from '@/components/reactbits/Silk';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LanyardSection from '@/components/sections/LanyardSection';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';

// ─────────────────────────────────────────────
// Data import from the isolated `sosial` folder
// ─────────────────────────────────────────────
import portfolioData from '../sosial/data';

function App() {
  const { personal, socials, skills, projects, certificates, navigation } =
    portfolioData;

  return (
    <>
      {/* ── Silk Background (fixed, full-screen, behind everything) ── */}
      <div className="silk-bg" aria-hidden="true">
        <Silk
          speed={6.6}
          scale={0.9}
          color="#8e6cac"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* ── Gradient overlay to softly blend the Silk into the page ── */}
      <div className="gradient-overlay" aria-hidden="true" />

      {/* ── Navigation ── */}
      <Navbar items={navigation} />

      {/* ── Main Content ── */}
      <main className="relative z-10">
        <Hero personal={personal} socials={socials} />
        <LanyardSection />
        <About personal={personal} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Certificates certificates={certificates} />
        <Contact personal={personal} />
      </main>

      {/* ── Footer ── */}
      <Footer socials={socials} name={personal.name} />
    </>
  );
}

export default App;
