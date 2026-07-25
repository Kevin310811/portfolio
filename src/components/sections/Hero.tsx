import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start gap-8">
          {/* Availability pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
            </span>
            Available for new projects — 2025
          </div>

          {/* Headline */}
          <h1
            className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="block overflow-hidden">
              <span className="block">
                Crafting <span className="text-gradient">cinematic</span>
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block">digital experiences</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block">
                that <span className="text-gradient-soft italic">feel alive</span>.
              </span>
            </span>
          </h1>

          {/* Supporting paragraph */}
          <p
            className="max-w-xl text-lg leading-relaxed text-slate-400"
          >
            I'm Aria Voss — a creative developer and designer blending motion, code, and editorial
            taste to build interfaces for the world's most ambitious brands.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button as="a" href="#work" size="lg">
              View selected work
              <ArrowUpRight size={18} />
            </Button>
            <Button as="a" href="#contact" variant="secondary" size="lg">
              <Sparkles size={18} />
              Start a project
            </Button>
          </div>

          {/* Meta row */}
          <div
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500"
          >
            <span>Based in Berlin · Working worldwide</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>8+ years of design engineering</span>
            <span className="hidden h-4 w-px bg-white/10 sm:block" />
            <span>14× design award recipient</span>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[18%] hidden h-24 w-24 rounded-2xl glass-strong lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[20%] top-[55%] hidden h-16 w-16 rounded-full bg-gradient-to-br from-brand-primary/40 to-brand-secondary/40 blur-sm lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[14%] bottom-[12%] hidden h-10 w-10 rounded-full border border-brand-primary/40 lg:block"
        />
      </div>
    </section>
  );
}
