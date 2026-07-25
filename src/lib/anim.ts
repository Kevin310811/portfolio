import { useRef } from 'react';
import type { ReactNode } from 'react';

// All animation hooks are temporarily disabled to restore rendering.
// They return plain refs so consuming components work without changes.

export function useReveal<T extends HTMLElement = HTMLDivElement>(_opts: Record<string, unknown> = {}) {
  return useRef<T>(null);
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(_opts: Record<string, unknown> = {}) {
  return useRef<T>(null);
}

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(_strength = 0.35) {
  return useRef<T>(null);
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(_max = 8) {
  return useRef<T>(null);
}

export function useTextSplit(_opts: Record<string, unknown> = {}) {
  return useRef<HTMLDivElement>(null);
}

export function useMouseParallax<T extends HTMLElement = HTMLDivElement>(_opts: Record<string, unknown> = {}) {
  return useRef<T>(null);
}

export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  return { ref: useRef<T>(null), progressRef: useRef(0) };
}

export type { ReactNode };
