import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { experience } from '@/lib/data';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from '@/lib/gsap';

export function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-timeline-item]'), { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Scrubbed spine fill — the vertical line draws as you scroll through the timeline.
      gsap.fromTo(
        '[data-timeline-spine]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Each timeline item reveals with perspective + directional slide.
      const items = root.querySelectorAll('[data-timeline-item]');
      items.forEach((item, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        gsap.from(item, {
          x: 60 * side,
          opacity: 0,
          rotateY: 8 * side,
          transformPerspective: 1000,
          duration: 1,
          ease: EASE.outQuart,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
          },
        });
      });

      // Nodes pop in as the spine reaches them
      gsap.from('[data-timeline-node]', {
        scale: 0,
        duration: 0.5,
        stagger: 0.3,
        ease: EASE.out,
        scrollTrigger: {
          trigger: root,
          start: 'top 60%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Career"
          title={
            <>
              A timeline of <span className="text-gradient">milestones</span>.
            </>
          }
          description="Roles where I sharpened the craft and shipped work that mattered."
        />

        <div ref={rootRef} className="relative mt-16 pl-8 md:pl-0">
          {/* Vertical spine — scrubbed fill */}
          <div
            data-timeline-spine
            aria-hidden
            className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-primary/60 via-brand-secondary/40 to-transparent md:left-1/2"
          />

          <div className="flex flex-col gap-12">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} side={i % 2 === 0 ? 'left' : 'right'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  side,
}: {
  item: (typeof experience)[number];
  side: 'left' | 'right';
}) {
  return (
    <div data-timeline-item className="relative md:grid md:grid-cols-2 md:gap-12">
      {/* Node */}
      <span
        data-timeline-node
        aria-hidden
        className="absolute -left-[1.4rem] top-2 h-3 w-3 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary ring-4 ring-ink-900 md:left-1/2 md:-translate-x-1/2"
      />

      <div
        className={
          side === 'left'
            ? 'md:pr-12 md:text-right'
            : 'md:col-start-2 md:pl-12'
        }
      >
        <GlassCard hover tilt className="p-6">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-bold text-white">{item.role}</h3>
            <span className="text-xs uppercase tracking-wider text-brand-primary/80">
              {item.period}
            </span>
          </div>
          <div className="mt-1 text-sm text-slate-400">
            {item.company} · {item.location}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.description}</p>
          <ul className="mt-4 space-y-2">
            {item.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-sm text-slate-300 md:flex-row-reverse md:text-right"
                style={side === 'left' ? undefined : { flexDirection: 'row' }}
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
