import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE, STAGGER } from '@/lib/gsap';

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
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll('[data-heading-item]'), { opacity: 1, y: 0, clipPath: 'none' });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE.out },
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          once: true,
        },
      });

      // Eyebrow slides in first
      tl.from('[data-heading-eyebrow]', { x: -20, opacity: 0, duration: 0.6 })
        // Title words reveal with a mask wipe
        .from(
          '[data-heading-word]',
          { yPercent: 100, opacity: 0, duration: 0.8, stagger: STAGGER.fast, ease: EASE.outQuart },
          '-=0.3'
        )
        // Description fades up last
        .from('[data-heading-desc]', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');
    }, root);

    return () => ctx.revert();
  }, []);

  // Split title into words for staggered reveal — preserves gradient spans
  const titleWords = splitTitle(title);

  return (
    <div
      ref={rootRef}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          data-heading-eyebrow
          data-heading-item
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-primary/80"
        >
          <span className="h-px w-8 bg-gradient-to-r from-brand-primary to-brand-secondary" />
          {eyebrow}
        </span>
      )}
      <div
        data-heading-item
        className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl"
      >
        {titleWords.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-heading-word data-heading-item className="inline-block">{word}</span>
          </span>
        ))}
      </div>
      {description && (
        <p
          data-heading-desc
          data-heading-item
          className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
        >
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Split a title (string or ReactNode with gradient spans) into word spans.
 * For plain strings, each word becomes its own span. For JSX, we wrap the
 * whole thing in a single masked span to preserve nested elements.
 */
function splitTitle(title: ReactNode): ReactNode[] {
  if (typeof title === 'string') {
    return title.split(' ').map((word, i, arr) => (
      <span key={i}>
        {word}
        {i < arr.length - 1 ? '\u00A0' : ''}
      </span>
    ));
  }
  // For JSX titles, wrap in a single masked unit
  return [title];
}
