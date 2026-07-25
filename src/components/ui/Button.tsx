import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, useRef, useEffect } from 'react';
import { gsap, prefersReducedMotion, EASE } from '@/lib/gsap';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:opacity-50 disabled:pointer-events-none overflow-hidden';

const variants: Record<Variant, string> = {
  primary:
    'text-ink-950 bg-gradient-to-r from-brand-primary to-brand-secondary shadow-glow',
  secondary:
    'text-white glass hover:border-white/20',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };
type ButtonProps = ButtonAsButton | ButtonAsAnchor;

function isAnchor(props: ButtonProps): props is ButtonAsAnchor {
  return (props as ButtonAsAnchor).as === 'a';
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    // Magnetic hover + soft press — GPU-only transforms.
    useEffect(() => {
      const el = innerRef.current;
      if (!el || prefersReducedMotion()) return;

      const strength = 0.3;
      const onMove = (e: Event) => {
        const me = e as MouseEvent;
        const rect = el.getBoundingClientRect();
        const relX = me.clientX - (rect.left + rect.width / 2);
        const relY = me.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.5, ease: EASE.out });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: EASE.inOut });
      };
      const onDown = () => gsap.to(el, { scale: 0.96, duration: 0.18, ease: EASE.out });
      const onUp = () => gsap.to(el, { scale: 1, duration: 0.3, ease: EASE.out });

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      el.addEventListener('mousedown', onDown);
      el.addEventListener('mouseup', onUp);

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('mousedown', onDown);
        el.removeEventListener('mouseup', onUp);
        gsap.killTweensOf(el);
      };
    }, []);

    const classes = cn(base, variants[variant], sizes[size], className);
    const content = <span className="relative z-10 flex items-center gap-2">{children}</span>;

    if (isAnchor(props)) {
      const { as: _as, ...rest } = props;
      void _as;
      return (
        <a
          ref={(node) => {
            (innerRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
          }}
          className={classes}
          data-cursor="hover"
          {...rest}
        >
          {content}
        </a>
      );
    }

    const { as: _as, ...rest } = props as ButtonAsButton;
    void _as;
    return (
      <button
        ref={(node) => {
          (innerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={classes}
        data-cursor="hover"
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
