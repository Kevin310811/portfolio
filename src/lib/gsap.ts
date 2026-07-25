import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins ONCE at module load — before any React effects run.
// This avoids the StrictMode race where child effects run before the
// parent's useEffect that previously called registerGsap().
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** True when the user prefers reduced motion — skip non-essential animation. */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/** Easing constants shared across the motion system for consistency. */
export const EASE = {
  out: 'power3.out',
  outQuart: 'power4.out',
  inOut: 'power3.inOut',
  expo: 'expo.out',
  smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

/** Standard stagger values. */
export const STAGGER = {
  fast: 0.06,
  default: 0.1,
  slow: 0.15,
} as const;

/**
 * Safely kill any GSAP state on a target before applying new tweens.
 * Prevents leftover inline styles from a prior render cycle (StrictMode).
 */
export function clearGsapState(targets: gsap.TweenTarget): void {
  gsap.killTweensOf(targets);
  gsap.set(targets, { clearProps: 'all' });
}
