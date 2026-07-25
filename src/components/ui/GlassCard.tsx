import { forwardRef, useRef, useEffect, HTMLAttributes, ReactNode } from 'react';
import { gsap, prefersReducedMotion, EASE } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong';
  hover?: boolean;
  glow?: boolean;
  tilt?: boolean;
  children?: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = false, glow = false, tilt = false, children, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    // 3D tilt + dynamic light overlay on hover.
    useEffect(() => {
      const el = innerRef.current;
      if (!el || !tilt || prefersReducedMotion()) return;

      const max = 6;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -2 * max;
        const ry = (px - 0.5) * 2 * max;
        gsap.to(el, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
          transformOrigin: 'center',
          duration: 0.4,
          ease: EASE.out,
        });
        // Dynamic light follows the cursor.
        gsap.to(el, {
          '--tilt-x': `${px * 100}%`,
          '--tilt-y': `${py * 100}%`,
          duration: 0.2,
          ease: 'none',
        } as gsap.TweenVars);
      };
      const onLeave = () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: EASE.inOut });
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        gsap.killTweensOf(el);
      };
    }, [tilt]);

    return (
      <div
        ref={(node) => {
          (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          variant === 'strong' ? 'glass-strong' : 'glass',
          'rounded-2xl transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.07]',
          glow && 'shadow-glow',
          tilt && 'relative will-change-transform',
          className
        )}
        style={
          tilt
            ? {
                background:
                  'radial-gradient(circle at var(--tilt-x, 50%) var(--tilt-y, 50%), rgba(255,255,255,0.06), transparent 60%), var(--glass-bg, rgba(255,255,255,0.04))',
              }
            : undefined
        }
        data-cursor="hover"
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
