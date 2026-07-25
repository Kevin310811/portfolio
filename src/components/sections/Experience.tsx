import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { experience } from '@/lib/data';
import { useReveal } from '@/lib/anim';

export function Experience() {
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

        <div className="relative mt-16 pl-8 md:pl-0">
          {/* Vertical spine */}
          <div
            aria-hidden
            className="absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-brand-primary/60 via-brand-secondary/40 to-transparent md:left-1/2"
          />

          <div className="flex flex-col gap-12">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} side={i % 2 === 0 ? 'left' : 'right'} index={i} />
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
  index,
}: {
  item: (typeof experience)[number];
  side: 'left' | 'right';
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>({
    x: side === 'left' ? -50 : 50,
    opacity: 0,
    duration: 0.9,
    delay: index * 0.05,
    start: 'top 85%',
  });

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-2 md:gap-12">
      {/* Node */}
      <span
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
