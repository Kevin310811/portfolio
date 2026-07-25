import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { skillGroups } from '@/lib/data';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE, STAGGER } from '@/lib/gsap';

/**
 * Skills — floating technology capsules with staggered reveal and gentle float.
 * The reveal animates opacity only; the float handles y. This separation
 * prevents the two tweens from fighting over the same property.
 */
export function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-skill]'), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Staggered opacity reveal — y is NOT animated here to avoid conflict
      // with the continuous float animation below.
      gsap.fromTo(
        '[data-skill]',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          stagger: { each: 0.04, from: 'random' },
          ease: EASE.out,
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Gentle continuous floating motion — each pill bobs at its own phase.
      // Only animates y, never opacity, so the two never collide.
      const pills = root.querySelectorAll('[data-skill]');
      pills.forEach((pill, i) => {
        gsap.to(pill, {
          y: '+=6',
          duration: 2.5 + (i % 3) * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: (i % 5) * 0.15,
        });
      });

      // Card containers reveal with scale
      gsap.from('[data-skill-card]', {
        scale: 0.92,
        opacity: 0,
        duration: 0.9,
        stagger: STAGGER.default,
        ease: EASE.outQuart,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

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

        <div ref={rootRef} className="mt-16 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} data-skill-card>
              <GlassCard tilt className="p-8">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
