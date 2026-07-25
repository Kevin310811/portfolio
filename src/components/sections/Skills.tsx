import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { skillGroups } from '@/lib/data';
import { useReveal } from '@/lib/anim';

/**
 * Skills — floating technology capsules with staggered reveal.
 */
export function Skills() {
  const cardsRef = useReveal<HTMLDivElement>({ y: 60, opacity: 0, duration: 0.8, stagger: 0.15, start: 'top 80%' });

  return (
    <section id="skills" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              A versatile <span className="text-gradient">craft toolkit</span>.
            </>
          }
          description="Technologies I reach for to turn concepts into polished, performant products."
        />

        <div ref={cardsRef} className="mt-16 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <GlassCard key={group.label} tilt className="p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary/80">
                {group.label}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    data-skill
                    data-cursor="hover"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition-all duration-300 hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-white hover:-translate-y-0.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
