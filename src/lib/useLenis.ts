import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis smooth scrolling and sync it with GSAP's ScrollTrigger.
 * Idempotent — safe under StrictMode double-invoke (cleans up on unmount).
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisInstance = lenis;

    // Drive Lenis from GSAP's ticker so both stay in lock-step.
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Programmatic smooth scroll to a selector, used by nav links. */
export function lenisScrollTo(target: string): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0, duration: 1.2 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
}
