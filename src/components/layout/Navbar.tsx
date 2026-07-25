import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { lenisScrollTo } from '@/lib/useLenis';
import { gsap, ScrollTrigger, prefersReducedMotion, EASE } from '@/lib/gsap';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('top');

  // Track scroll position for the navbar's solid state.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track the active section via ScrollTrigger for the nav indicator.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const triggers: ScrollTrigger[] = [];
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) setActive(link.href);
        },
      });
      triggers.push(st);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            'flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500',
            scrolled ? 'glass-strong shadow-glass-lg' : 'border border-transparent bg-transparent'
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              lenisScrollTo('#top');
            }}
            className="flex items-center gap-2 text-sm font-bold tracking-tight text-white"
            aria-label="Aria Voss — home"
            data-cursor="hover"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-ink-950">
              A
            </span>
            <span className="hidden sm:inline">Aria Voss</span>
          </a>

          <ul className="relative hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    lenisScrollTo(link.href);
                  }}
                  className={cn(
                    'group relative rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    active === link.href ? 'text-white' : 'text-slate-300 hover:text-white'
                  )}
                  data-cursor="hover"
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300',
                      active === link.href ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                lenisScrollTo('#contact');
              }}
              className="rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-2 text-sm font-medium text-ink-950 transition-transform duration-300 hover:-translate-y-0.5"
              data-cursor="hover"
            >
              Let's talk
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-ink-950/80 backdrop-blur-2xl transition-all duration-500 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              lenisScrollTo(link.href);
            }}
            className="px-6 py-3 text-2xl font-medium text-slate-200 transition-colors hover:text-white"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            lenisScrollTo('#contact');
          }}
          className="mt-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-8 py-3 text-base font-medium text-ink-950"
        >
          Let's talk
        </a>
      </div>
    </>
  );
}

// Keep EASE import referenced for future nav micro-interactions.
void EASE;
void gsap;
