import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectBrowser } from '@/components/ui/ProjectBrowser';
import { projects, type Project } from '@/lib/data';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export function Projects() {
  return (
    <section id="work" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected Work"
          title={
            <>
              Projects that earned <span className="text-gradient">attention</span>.
            </>
          }
          description="A curated set of products and experiences — each one a collaboration between design intent and engineering precision."
        />

        <Showcase />
      </div>
    </section>
  );
}

function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      setActiveIndex(projects.length - 1);
      return;
    }

    const ctx = gsap.context(() => {
      // One ScrollTrigger per project — fires when its panel enters the sticky zone.
      const panels = section.querySelectorAll('[data-project-panel]');
      const triggers: ScrollTrigger[] = [];

      panels.forEach((panel, i) => {
        const st = ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
        triggers.push(st);
      });

      // Subtle perspective tilt on the sticky browser as you scroll.
      const sticky = stickyRef.current;
      if (sticky) {
        gsap.to(sticky, {
          rotateX: 4,
          rotateY: -2,
          transformPerspective: 1200,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const active = projects[activeIndex];

  return (
    <div ref={sectionRef} className="mt-16 perspective-1000">
      {/* Sticky browser preview — stays pinned while panels scroll past */}
      <div
        ref={stickyRef}
        className="sticky top-24 z-10 mb-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative">
          {/* Crossfade stack — all previews layered, opacity driven by activeIndex */}
          <div className="relative">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={cn(
                  'transition-opacity duration-700 ease-out',
                  i === activeIndex ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                )}
              >
                <ProjectBrowser url={project.url} accent={project.accent}>
                  <ProjectPreview project={project} />
                </ProjectBrowser>
              </div>
            ))}
          </div>

          {/* Ambient glow behind the browser */}
          <div
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 blur-3xl transition-opacity duration-700"
            style={{ opacity: active.accent === 'primary' ? 0.7 : 0.5 }}
          />
        </div>
      </div>

      {/* Scrolling detail panels — each one updates the sticky preview */}
      <div className="flex flex-col gap-[60vh]">
        {projects.map((project, i) => (
          <ProjectPanel key={project.id} project={project} index={i} active={i === activeIndex} />
        ))}
      </div>
    </div>
  );
}

function ProjectPanel({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  return (
    <div
      data-project-panel
      className="flex min-h-screen items-center justify-center"
    >
      <div
        className={cn(
          'max-w-md rounded-2xl p-8 transition-all duration-500',
          active ? 'glass-strong opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
        )}
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span className="text-brand-primary">0{index + 1}</span>
          <span className="h-px w-8 bg-white/15" />
          <span>{project.category}</span>
          <span className="text-slate-600">·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
          {project.title}
        </h3>

        <p className="mt-4 text-base leading-relaxed text-slate-400">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white"
          data-cursor="hover"
        >
          View case study
          <ArrowUpRight
            size={16}
            className="text-brand-primary transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className={cn(
          'absolute inset-0',
          project.accent === 'primary'
            ? 'bg-[radial-gradient(40rem_30rem_at_30%_30%,rgba(0,211,243,0.18),transparent_60%),radial-gradient(30rem_24rem_at_70%_70%,rgba(194,122,255,0.14),transparent_60%)]'
            : 'bg-[radial-gradient(40rem_30rem_at_70%_30%,rgba(194,122,255,0.18),transparent_60%),radial-gradient(30rem_24rem_at_30%_70%,rgba(0,211,243,0.14),transparent_60%)]'
        )}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass-strong text-xl font-bold text-white">
          {project.title.charAt(0)}
        </div>
        <div className="text-2xl font-bold tracking-tight text-white">{project.title}</div>
        <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
          {project.category}
        </div>
        <div className="mt-4 flex w-full max-w-xs flex-col gap-2">
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-4/5 rounded-full bg-white/[0.07]" />
          <div className="h-2 w-3/5 rounded-full bg-white/[0.05]" />
        </div>
        <div className="mt-6 flex gap-3">
          <div className="h-16 w-24 rounded-lg glass" />
          <div className="h-16 w-24 rounded-lg glass" />
          <div className="h-16 w-24 rounded-lg glass" />
        </div>
      </div>
    </div>
  );
}
