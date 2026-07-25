import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion, EASE } from '@/lib/gsap';

export function Background() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Slow drifting blobs — ambient depth, never distracting.
      gsap.to('[data-bg-blob="1"]', { x: 40, y: -30, duration: 14, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('[data-bg-blob="2"]', { x: -50, y: 24, duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 });
      gsap.to('[data-bg-blob="3"]', { x: 30, y: 40, duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-ink-900" />

      {/* Mesh gradient layer */}
      <div className="absolute inset-0 bg-[radial-gradient(60rem_60rem_at_12%_-10%,rgba(0,211,243,0.14),transparent_60%),radial-gradient(50rem_50rem_at_88%_8%,rgba(194,122,255,0.14),transparent_60%),radial-gradient(70rem_70rem_at_50%_110%,rgba(0,211,243,0.08),transparent_60%)]" />

      {/* Floating blurred light blobs — ambient drift */}
      <div
        data-bg-blob="1"
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-primary/20 blur-[120px]"
      />
      <div
        data-bg-blob="2"
        className="absolute right-[-10%] top-1/2 h-[28rem] w-[28rem] rounded-full bg-brand-secondary/20 blur-[140px]"
      />
      <div
        data-bg-blob="3"
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-brand-primary/10 blur-[100px]"
      />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_40%,rgba(5,14,28,0.6)_100%)]" />
    </div>
  );
}
