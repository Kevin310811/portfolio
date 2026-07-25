import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react';
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
    const classes = cn(base, variants[variant], sizes[size], className);

    const content = (
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    );

    if (isAnchor(props)) {
      const { as: _as, ...rest } = props;
      void _as;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
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
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
