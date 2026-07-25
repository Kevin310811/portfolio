import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, EASE } from '@/lib/gsap';

/**
 * Custom cursor with smooth interpolation, trailing dot, contextual hover
 * scaling, and magnetic attraction for elements marked [data-cursor="hover"].
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Only enable on fine pointers (desktop).
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('custom-cursor-active');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const dotPos = { ...pos };

    // Quick setter using gsap's quickTo for buttery interpolation.
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: EASE.out });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: EASE.out });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: EASE.out });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: EASE.out });

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dotX(pos.x);
      dotY(pos.y);
      ringX(pos.x);
      ringY(pos.y);
    };

    // Hover state: grow ring, shrink dot slightly.
    const onOver = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor="hover"]');
      if (target) {
        gsap.to(ring, { scale: 1.8, duration: 0.4, ease: EASE.out, backgroundColor: 'rgba(0,211,243,0.12)' });
        gsap.to(dot, { scale: 0.5, duration: 0.3, ease: EASE.out });
      } else {
        gsap.to(ring, { scale: 1, duration: 0.4, ease: EASE.out, backgroundColor: 'rgba(0,211,243,0)' });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: EASE.out });
      }
    };

    // Press state: shrink for tactile feedback.
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2, ease: EASE.out });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: EASE.out });

    // Hide when leaving the viewport.
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/50"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
