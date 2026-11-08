import { useEffect, useState } from 'react';
import { useRoute } from './lib/router';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import FeaturedReel from './components/FeaturedReel';
import Services from './components/Services';
import LocalGrowth from './components/LocalGrowth';
import Projects from './components/Projects';
import About from './components/About';
import Tools from './components/Tools';
import Philosophy from './components/Philosophy';
import Cipher from './components/Cipher';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ProjectDetail from './components/ProjectDetail';

function shouldSkipLoader() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem('zentra:visited') === '1';
  } catch {
    return false;
  }
}

function markVisited() {
  try {
    sessionStorage.setItem('zentra:visited', '1');
  } catch {
    /* storage can be blocked in private modes — the loader still works */
  }
}

export default function App() {
  const [skipLoader] = useState(shouldSkipLoader);
  const [phase, setPhase] = useState(skipLoader ? 'ready' : 'loading');
  const [gone, setGone] = useState(skipLoader);
  const route = useRoute();
  const isProject = route.name === 'project';

  useEffect(() => {
    if (skipLoader) {
      document.documentElement.classList.add('is-ready');
      markVisited();
      return undefined;
    }
    const t1 = setTimeout(() => {
      setPhase('ready');
      document.documentElement.classList.add('is-ready');
    }, 1350);
    const t2 = setTimeout(() => {
      setGone(true);
      markVisited();
    }, 2450);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [skipLoader]);

  /* Returning from a project page to an in-page anchor (#portfolio, #contact …). */
  useEffect(() => {
    if (route.name !== 'home' || !route.anchor) return undefined;
    const el = document.getElementById(route.anchor);
    if (!el) return undefined;
    const t = setTimeout(() => el.scrollIntoView({ behavior: 'auto', block: 'start' }), 80);
    return () => clearTimeout(t);
  }, [route.name, route.anchor, route.slug]);

  return (
    <>
      {!gone && <Loader leaving={phase === 'ready'} />}
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main
        id="main"
        className="page"
        key={isProject ? `project-${route.slug}` : 'home'}
      >
        {isProject ? (
          <ProjectDetail slug={route.slug} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <FeaturedReel />
            <Services />
            <LocalGrowth />
            <Projects />
            <About />
            <Tools />
            <Philosophy />
            <Cipher />
            <Process />
            <Pricing />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  );
}
