import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProjectBrowserProps {
  url: string;
  accent?: 'primary' | 'secondary';
  children?: ReactNode;
  className?: string;
}

/**
 * Realistic browser-window frame: macOS traffic lights, address bar, content area.
 * Reusable across the projects section and anywhere a "live preview" is needed.
 * The content slot accepts any preview (image, responsive mockup, etc.).
 * data attributes are left on interactive chrome for Phase 2 hover animations.
 */
export function ProjectBrowser({
  url,
  accent = 'primary',
  children,
  className,
}: ProjectBrowserProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-ink-850/80 shadow-glass-lg backdrop-blur-xl',
        className
      )}
      data-project-browser
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>

        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-white/[0.08] bg-ink-950/60 px-4 py-1.5">
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary'
            )}
          />
          <span className="truncate text-xs text-slate-400">{url}</span>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
          <span className="h-3 w-3 rounded-sm border border-white/15" />
          <span className="h-3 w-3 rounded-sm border border-white/15" />
        </div>
      </div>

      {/* Content / preview area */}
      <div className="relative aspect-[16/10] w-full bg-ink-900">{children}</div>
    </div>
  );
}
