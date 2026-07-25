import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

export function Grain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Subtle opacity breathing — keeps the surface feeling alive.
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 0.05,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref} aria-hidden className="grain" />;
}
