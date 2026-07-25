import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { stats } from '@/lib/data';
import { useClipReveal, useScrubParallax, useCountUp } from '@/lib/anim';

export function About() {
  const portraitRef = useClipReveal<HTMLDivElement>({ direction: 'up', duration: 1.4, start: 'top 75%' });
  const bioRef = useScrubParallax<HTMLDivElement>({ from: 60, to: -60, start: 'top bottom', end: 'bottom top' });
  const ringRef = useScrubParallax<HTMLDivElement>({ from: 20, to: -20, start: 'top bottom', end: 'bottom top' });

  return (
    <section id="about" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Design engineer with a <span className="text-gradient">director's eye</span> for
              detail.
            </>
          }
          description="I live in the space between design and engineering — translating editorial taste and cinematic intent into fast, accessible, production-ready interfaces."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Portrait placeholder — clip-path mask reveal */}
          <div ref={portraitRef} className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl glass-strong">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-primary/10 via-ink-800 to-brand-secondary/10">
                  <div className="flex flex-col items-center gap-3 text-slate-500">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full glass text-2xl font-bold text-white">
                      AV
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em]">Portrait</span>
                  </div>
                </div>
              </div>
              {/* Accent ring with scrub parallax */}
              <div
                ref={ringRef}
                className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-md"
              />
            </div>
          </div>

          {/* Bio + stats — scrub parallax for depth */}
          <div ref={bioRef} className="flex flex-col justify-between gap-8 lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-slate-300">
              <p>
                For the last eight years I've helped studios and startups ship work that earns
                attention — from award-winning marketing sites to complex product surfaces. My
                practice blends motion design, design systems, and performance engineering.
              </p>
              <p className="text-slate-400">
                I believe great interfaces are felt before they're understood. Every transition,
                easing curve, and pixel of whitespace is a chance to guide emotion. That belief
                shapes everything I build.
              </p>
            </div>

            {/* Stats grid with count-up animation */}
            <StatsGrid />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const valueRef = useCountUp<HTMLSpanElement>({
    end: parseInt(stat.value, 10) || 0,
    suffix: stat.value.replace(/[0-9]/g, ''),
    duration: 2,
  });

  return (
    <GlassCard tilt className="p-5">
      <div className="text-3xl font-bold tracking-tighter text-gradient">
        <span ref={valueRef}>{stat.value}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
        {stat.label}
      </div>
    </GlassCard>
  );
}
