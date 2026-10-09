export default function PageHero({ eyebrow, title, subtitle, children, compact = false }) {
  return (
    <section
      className={`relative overflow-hidden bg-brand-blue text-white ${compact ? 'py-12 md:py-16' : 'py-16 md:py-24'}`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rotate-12 bg-brand-orange/20 blur-3xl md:h-96 md:w-96"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-brand-blue to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold uppercase leading-tight md:text-5xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg leading-relaxed">{subtitle}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  )
}
