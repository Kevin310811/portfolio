// Lenis smooth scrolling temporarily disabled to restore rendering.
// Native browser scrolling is used instead.

export function useLenis() {
  // No-op — Lenis removed for stability.
}

export function lenisScrollTo(target: string) {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}
