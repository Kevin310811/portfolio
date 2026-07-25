import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectBrowser } from '@/components/ui/ProjectBrowser';
import { projects, type Project } from '@/lib/data';
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

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      {/* Browser preview */}
      <div className={cn('lg:col-span-7', flipped && 'lg:order-2 lg:col-start-6')}>
        <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
          <ProjectBrowser url={project.url} accent={project.accent}>
            <ProjectPreview project={project} />
          </ProjectBrowser>
          <div className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>

      {/* Details */}
      <div className={cn('flex flex-col gap-5 lg:col-span-5', flipped && 'lg:order-1 lg:col-start-1')}>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
          <span className="text-brand-primary">0{index + 1}</span>
          <span className="h-px w-8 bg-white/15" />
          <span>{project.category}</span>
          <span className="text-slate-600">·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {project.title}
        </h3>

        <p className="text-base leading-relaxed text-slate-400">{project.description}</p>

        <ul className="flex flex-wrap gap-2">
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
          className="group/link mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white"
        >
          View case study
          <ArrowUpRight
            size={16}
            className="text-brand-primary transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
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
