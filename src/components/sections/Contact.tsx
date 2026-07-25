import { useState, FormEvent } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — invitation */}
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Let's build something <span className="text-gradient">memorable</span>.
                </>
              }
              description="Have a project in mind? Tell me about it and I'll get back within two business days."
            />

            <div className="mt-10 space-y-5">
              <a
                href="mailto:hello@ariavoss.dev"
                className="group flex items-center gap-4 text-slate-300 transition-colors hover:text-white"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl glass transition-transform duration-300 group-hover:scale-110">
                  <Mail size={18} className="text-brand-primary" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Email</div>
                  <div className="text-sm">hello@ariavoss.dev</div>
                </div>
              </a>

              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl glass">
                  <MapPin size={18} className="text-brand-secondary" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500">Location</div>
                  <div className="text-sm">Berlin · Working worldwide</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <GlassCard variant="strong" className="p-8 md:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <CheckCircle2 size={48} className="text-brand-primary" />
                  <h3 className="text-2xl font-bold text-white">Message received</h3>
                  <p className="max-w-sm text-sm text-slate-400">
                    Thanks for reaching out. I'll get back to you within two business days.
                  </p>
                  <Button variant="ghost" onClick={() => setSent(false)}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/40"
                      />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/40"
                      />
                    </Field>
                  </div>

                  <Field label="Project type" htmlFor="type">
                    <select
                      id="type"
                      name="type"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition-colors focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/40"
                    >
                      <option className="bg-ink-850">Marketing site</option>
                      <option className="bg-ink-850">Product UI</option>
                      <option className="bg-ink-850">Design system</option>
                      <option className="bg-ink-850">Creative direction</option>
                      <option className="bg-ink-850">Other</option>
                    </select>
                  </Field>

                  <Field label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell me about your project, timeline, and goals…"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-brand-primary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary/40"
                    />
                  </Field>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Your details stay private. No spam, ever.
                    </p>
                    <Button type="submit" size="lg">
                      Send message
                      <Send size={16} />
                    </Button>
                  </div>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
