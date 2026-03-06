import { useState } from 'react';
import Aurora from '@/components/reactbits/Aurora';
import PillNav from '@/components/reactbits/PillNav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ProfileCardSection from '@/components/sections/ProfileCardSection';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import CountUp from '@/components/reactbits/CountUp';
import GradientText from '@/components/reactbits/GradientText';

// ─────────────────────────────────────────────
// Data import from the isolated `sosial` folder
// ─────────────────────────────────────────────
import portfolioData from '../sosial/data';

function App() {
  const { personal, projects, certificates, navigation } = portfolioData;
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);

  // Convert NavItem[] to PillNav format
  const pillNavItems = navigation.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  return (
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
      {/* ── Aurora Background (fixed, full-screen, behind everything) ── */}
      <div className="aurora-bg" aria-hidden="true">
        <Aurora
          colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={1}
        />
      </div>

      {/* ── Navigation (PillNav) ── */}
      <PillNav
        items={pillNavItems}
        baseColor="rgba(22, 22, 30, 0.85)"
        pillColor="#060010"
        hoveredPillTextColor="#060010"
        pillTextColor="#f0f0f5"
      />

      {/* ── Main Content ── */}
      <main className="relative z-10">
        <Hero personal={personal} />
        <ProfileCardSection personal={personal} />
        <About personal={personal} />
        <Projects projects={projects} />
        <Skills />
        <Certificates certificates={certificates} />
        <Contact personal={personal} />
      </main>

      {/* ── Footer ── */}
      <Footer name={personal.name} />
    </>
  );
}

export default App;
