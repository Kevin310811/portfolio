import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong';
  hover?: boolean;
  glow?: boolean;
  tilt?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = false, glow = false, tilt = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variant === 'strong' ? 'glass-strong' : 'glass',
          'rounded-2xl',
          hover && 'transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.07]',
          glow && 'shadow-glow',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
