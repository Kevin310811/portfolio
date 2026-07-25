export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-ink-900" />

      {/* Mesh gradient layer */}
      <div className="absolute inset-0 bg-[radial-gradient(60rem_60rem_at_12%_-10%,rgba(0,211,243,0.14),transparent_60%),radial-gradient(50rem_50rem_at_88%_8%,rgba(194,122,255,0.14),transparent_60%),radial-gradient(70rem_70rem_at_50%_110%,rgba(0,211,243,0.08),transparent_60%)]" />

      {/* Floating blurred light blobs */}
      <div
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-primary/20 blur-[120px]"
      />
      <div
        className="absolute right-[-10%] top-1/2 h-[28rem] w-[28rem] rounded-full bg-brand-secondary/20 blur-[140px]"
      />
      <div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-brand-primary/10 blur-[100px]"
      />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_40%,rgba(5,14,28,0.6)_100%)]" />
    </div>
  );
}
