import { useEffect, useRef } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE, STAGGER } from '@/lib/gsap';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-hero-item]'), { opacity: 1, y: 0, x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Entrance timeline — one cohesive sequence, overlapping naturally.
      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        delay: 0.15,
      });

      tl.from('[data-hero="pill"]', { y: 20, opacity: 0, duration: 0.7 })
        .from(
          '[data-hero-line] > span',
          { yPercent: 110, opacity: 0, duration: 1, stagger: STAGGER.slow, ease: EASE.outQuart },
          '-=0.35'
        )
        .from('[data-hero="lead"]', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero="cta"]', { y: 18, opacity: 0, duration: 0.7 }, '-=0.5')
        .from('[data-hero="meta"]', { y: 14, opacity: 0, duration: 0.6 }, '-=0.45')
        .from(
          '[data-hero-deco]',
          { scale: 0.6, opacity: 0, duration: 1, stagger: 0.12, ease: EASE.outQuart },
          '-=0.9'
        );

      // Layered parallax — each layer moves at a different rate on scroll.
      const parallax = (selector: string, speed: number) => {
        gsap.to(selector, {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      };

      parallax('[data-hero-layer="bg"]', 30);
      parallax('[data-hero-layer="deco"]', 18);
      parallax('[data-hero-layer="glass"]', -12);
      parallax('[data-hero-layer="heading"]', 8);
      parallax('[data-hero-layer="lead"]', 12);

      // Ambient drift on decorative shapes — slow, looping, elegant.
      gsap.to('[data-hero-deco="1"]', { y: -14, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.to('[data-hero-deco="2"]', { y: 18, x: -8, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5 });
      gsap.to('[data-hero-deco="3"]', { y: -10, x: 6, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20"
    >
      {/* Parallax background layer */}
      <div data-hero-layer="bg" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-primary/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/2 h-[28rem] w-[28rem] rounded-full bg-brand-secondary/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start gap-8">
          {/* Availability pill */}
          <div
            data-hero="pill"
            data-hero-item
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
            </span>
            Available for new projects — 2025
          </div>

          {/* Headline — each line wrapped for staggered mask reveal */}
          <h1
            data-hero-layer="heading"
            className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span data-hero-line className="block overflow-hidden">
              <span className="block">
                Crafting <span className="text-gradient">cinematic</span>
              </span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="block">digital experiences</span>
            </span>
            <span data-hero-line className="block overflow-hidden">
              <span className="block">
                that <span className="text-gradient-soft italic">feel alive</span>.
              </span>
            </span>
          </h1>

          {/* Supporting paragraph */}
          <p
            data-hero="lead"
            data-hero-layer="lead"
            data-hero-item
            className="max-w-xl text-lg leading-relaxed text-slate-400"
          >
            I'm Aria Voss — a creative developer and designer blending motion, code, and editorial
            taste to build interfaces for the world's most ambitious brands.
          </p>

          {/* CTAs */}
          <div data-hero="cta" data-hero-item className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button as="a" href="#work" size="lg" data-cursor="hover">
              View selected work
              <ArrowUpRight size={18} />
            </Button>
            <Button as="a" href="#contact" variant="secondary" size="lg" data-cursor="hover">
              <Sparkles size={18} />
              Start a project
            </Button>
          </div>

          {/* Meta row */}
          <div
            data-hero="meta"
            data-hero-item
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500"
          >
            <span>Based in Berlin · Working worldwide</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>8+ years of design engineering</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>14× design award recipient</span>
          </div>
        </div>

        {/* Decorative floating elements — parallax + ambient drift */}
        <div data-hero-layer="deco" aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            data-hero-deco="1"
            data-hero-item
            className="absolute right-[6%] top-[18%] hidden h-24 w-24 rounded-2xl glass-strong lg:block"
          />
          <div
            data-hero-deco="2"
            data-hero-item
            className="absolute right-[20%] top-[55%] hidden h-16 w-16 rounded-full bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 blur-sm lg:block"
          />
          <div
            data-hero-deco="3"
            data-hero-item
            className="absolute right-[14%] bottom-[12%] hidden h-10 w-10 rounded-full border border-brand-primary/40 lg:block"
          />
        </div>

        {/* Glass layer (slowest) */}
        <div data-hero-layer="glass" aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      </div>
    </section>
  );
}
