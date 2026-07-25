import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE, STAGGER } from '@/lib/gsap';

type ElementTarget = HTMLElement | null;

/**
 * Reveal an element on scroll into view.
 * StrictMode-safe: uses gsap.context scoped to the element, reverted on cleanup.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: opts.y ?? 30,
        x: opts.x ?? 0,
        opacity: opts.opacity ?? 0,
        duration: opts.duration ?? 0.9,
        delay: opts.delay ?? 0,
        ease: EASE.out,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          once: opts.once ?? true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Reveal a container's children with stagger on scroll.
 * Pass a child selector via `selector`.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(opts: {
  selector?: string;
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const selector = opts.selector ?? '> *';

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll(selector), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll(selector), {
        y: opts.y ?? 24,
        opacity: opts.opacity ?? 0,
        duration: opts.duration ?? 0.8,
        stagger: opts.stagger ?? STAGGER.default,
        delay: opts.delay ?? 0,
        ease: EASE.out,
        scrollTrigger: {
          trigger: root,
          start: opts.start ?? 'top 80%',
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Clip-path mask reveal — wipes the element into view on scroll.
 * direction: 'left' | 'up' | 'right' | 'down'
 */
export function useClipReveal<T extends HTMLElement = HTMLDivElement>(opts: {
  direction?: 'left' | 'up' | 'right' | 'down';
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
      return;
    }

    const dir = opts.direction ?? 'left';
    const from: Record<string, string> = {
      left: 'inset(0% 100% 0% 0%)',
      right: 'inset(0% 0% 0% 100%)',
      up: 'inset(100% 0% 0% 0%)',
      down: 'inset(0% 0% 100% 0%)',
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: from[dir] },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: opts.duration ?? 1.1,
          delay: opts.delay ?? 0,
          ease: EASE.outQuart,
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top 80%',
            once: opts.once ?? true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Scale reveal — element scales up from a smaller size while fading in.
 * Good for images, cards, and visual focal points.
 */
export function useScaleReveal<T extends HTMLElement = HTMLDivElement>(opts: {
  from?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        scale: opts.from ?? 0.85,
        opacity: 0,
        duration: opts.duration ?? 1.2,
        delay: opts.delay ?? 0,
        ease: EASE.outQuart,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          once: opts.once ?? true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Parallax: translate an element opposite to scroll progress through its parent.
 * `speed` < 1 moves slower than scroll (background feel); > 1 moves faster.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(opts: {
  speed?: number;
  start?: string;
  end?: string;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const speed = opts.speed ?? 0.2;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => (1 - speed) * -120,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top bottom',
          end: opts.end ?? 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Scrubbed parallax — element moves with scroll progress (0→1) across a range.
 * `from` and `to` define the y translation in px.
 */
export function useScrubParallax<T extends HTMLElement = HTMLDivElement>(opts: {
  from?: number;
  to?: number;
  trigger?: string;
  start?: string;
  end?: string;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: opts.from ?? 0 },
        {
          y: opts.to ?? 0,
          ease: 'none',
          scrollTrigger: {
            trigger: opts.trigger ? (el.closest(opts.trigger) ?? el) : el,
            start: opts.start ?? 'top bottom',
            end: opts.end ?? 'bottom top',
            scrub: 1,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Magnetic hover: element drifts toward the cursor while hovered.
 * StrictMode-safe: tweens are killed on cleanup.
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.6,
        ease: EASE.out,
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: EASE.inOut });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return ref;
}

/**
 * 3D tilt on hover with a soft dynamic light overlay. Adds a ::after sheen
 * element automatically and removes it on cleanup.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -2 * max;
      const ry = (px - 0.5) * 2 * max;
      gsap.to(el, {
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 800,
        transformOrigin: 'center',
        duration: 0.4,
        ease: EASE.out,
      });
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
  }, [max]);

  return ref;
}

/**
 * Ambient infinite drift — slow, looping motion for decorative elements.
 */
export function useAmbient<T extends HTMLElement = HTMLDivElement>(opts: {
  y?: number;
  x?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
} = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: opts.y ?? 0,
        x: opts.x ?? 0,
        rotate: opts.rotate ?? 0,
        duration: opts.duration ?? 8,
        delay: opts.delay ?? 0,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Count-up animation for numeric stat displays.
 * Animates from 0 to the target value on scroll.
 */
export function useCountUp<T extends HTMLElement = HTMLDivElement>(opts: {
  end: number;
  suffix?: string;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${opts.end}${opts.suffix ?? ''}`;
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: opts.end,
        duration: opts.duration ?? 1.8,
        ease: EASE.out,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${opts.suffix ?? ''}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export type { ElementTarget };
