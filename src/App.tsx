import { AmbientBackground } from '@/components/background/AmbientBackground';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Statement } from '@/components/sections/Statement';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { WhyMe } from '@/components/sections/WhyMe';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border focus:border-hairline-strong focus:bg-elevated focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <AmbientBackground />
      <Navbar />

      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Work />
        <WhyMe />
        <Process />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
