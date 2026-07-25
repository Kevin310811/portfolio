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
  const [activeIndex, setActiveIndex] = useState(0);
  const isFirstRender = useRef(true);

  // ScrollTrigger setup — one per panel, fires onEnter and onEnterBack
  // so reverse scroll stays perfectly symmetric with forward scroll.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      setActiveIndex(projects.length - 1);
      return;
    }

    const ctx = gsap.context(() => {
      const panels = section.querySelectorAll('[data-project-panel]');
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // GSAP-driven crossfade — ensures the browser preview and the panel
  // content transition in perfect sync, unlike mismatched CSS durations.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;

    const previews = sectionRef.current?.querySelectorAll('[data-preview]');
    if (!previews) return;

    previews.forEach((preview, i) => {
      gsap.killTweensOf(preview);
      gsap.to(preview, {
        opacity: i === activeIndex ? 1 : 0,
        duration: 0.6,
        ease: EASE.out,
      });
    });
  }, [activeIndex]);

  const active = projects[activeIndex];

  return (
    <div ref={sectionRef} className="mt-16">
      {/* Two-column layout on desktop: browser pinned left, panels scroll right.
          Stacks naturally on mobile — no overlap at any breakpoint. */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left column — sticky browser preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mx-auto max-w-[560px]">
            {/* Crossfade stack — all previews layered, opacity driven by GSAP */}
            <div className="relative">
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  data-preview
                  className={cn(
                    i === activeIndex ? 'relative' : 'pointer-events-none absolute inset-0'
                  )}
                  style={{ opacity: i === activeIndex ? 1 : 0 }}
                >
                  <ProjectBrowser url={project.url} accent={project.accent}>
                    <ProjectPreview project={project} />
                  </ProjectBrowser>
                </div>
              ))}
            </div>

            {/* Ambient glow behind the browser */}
            <div
              className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-primary/15 to-brand-secondary/15 blur-3xl transition-opacity duration-[600ms]"
              style={{ opacity: active.accent === 'primary' ? 0.7 : 0.5 }}
            />
          </div>
        </div>

        {/* Right column — scrolling detail panels.
            Each one updates the sticky preview as it enters the viewport center. */}
        <div className="flex flex-col gap-[60vh] lg:gap-[80vh]">
          {projects.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} active={i === activeIndex} />
          ))}
        </div>
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
      className="flex min-h-[70vh] items-center justify-center lg:min-h-[80vh]"
    >
      <div
        className={cn(
          'max-w-md rounded-2xl p-8 transition-all duration-[600ms] ease-out',
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
