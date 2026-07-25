import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReveal } from '@/lib/anim';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  // Clip-path reveal preserves gradient spans inside the title JSX
  const titleRef = useReveal<HTMLDivElement>({
    y: 40,
    opacity: 0,
    duration: 1,
    start: 'top 85%',
  });
  const descRef = useReveal<HTMLParagraphElement>({
    y: 24,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    start: 'top 85%',
  });

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-primary/80">
          <span className="h-px w-8 bg-gradient-to-r from-brand-primary to-brand-secondary" />
          {eyebrow}
        </span>
      )}
      <div
        ref={titleRef}
        className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </div>
      {description && (
        <p ref={descRef} className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
