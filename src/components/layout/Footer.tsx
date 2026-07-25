import { Github, Linkedin, Twitter, Dribbble, ArrowUpRight } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useReveal } from '@/lib/anim';

const socials = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Dribbble', href: 'https://dribbble.com', icon: Dribbble },
];

export function Footer() {
  const mainRef = useReveal<HTMLDivElement>({ y: 40, opacity: 0, duration: 0.8, stagger: 0.08, start: 'top 90%' });
  const bottomRef = useReveal<HTMLDivElement>({ y: 20, opacity: 0, duration: 0.6, delay: 0.2, start: 'top 95%' });

  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div ref={mainRef} className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2 text-lg font-bold text-white" data-cursor="hover">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-ink-950">
                A
              </span>
              Aria Voss
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Creative developer & designer crafting cinematic digital experiences for ambitious
              brands. Currently available for select projects.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group relative text-sm text-slate-400 transition-colors hover:text-white"
                      data-cursor="hover"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Social
              </h3>
              <ul className="mt-4 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                      data-cursor="hover"
                    >
                      {s.label}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      />
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Contact
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="mailto:hello@ariavoss.dev"
                    className="group relative text-sm text-slate-400 transition-colors hover:text-white"
                    data-cursor="hover"
                  >
                    hello@ariavoss.dev
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
                <li className="text-sm text-slate-400">Remote · Worldwide</li>
              </ul>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Aria Voss. Crafted with precision.
          </p>
          <p className="text-xs text-slate-500">
            Built with React, Tailwind & a love for detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
