import { useLenis } from '@/lib/useLenis';
import { Background } from '@/components/ui/Background';
import { Grain } from '@/components/ui/Grain';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Cursor } from '@/components/layout/Cursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

function App() {
  useLenis();

  return (
    <>
      <Background />
      <Grain />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
