import Link from "next/link";

// Static page — no fetch, no dynamic APIs. Pre-rendered at build time.
export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 border-b border-foreground/20 pb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          mvx<span className="text-muted-foreground">/movies</span>
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
          A minimal Next.js 16 application. Every route demonstrates a different
          rendering strategy: static, SSR, ISR, client-side, server actions, and
          API routes.
        </p>
        <div className="flex gap-4 pt-2">
          <Link
            href="/movies"
            className="text-xs uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            browse →
          </Link>
          <Link
            href="/about"
            className="text-xs uppercase tracking-widest px-4 py-2 hover:underline underline-offset-4"
          >
            how it works
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
          Route Map
        </h2>
        <div className="border border-foreground/20">
          <RouteRow path="/" tags={["Static"]} />
          <RouteRow path="/movies" tags={["SSR"]} />
          <RouteRow path="/movies/[slug]" tags={["Dynamic", "ISR"]} />
          <RouteRow path="/movies/[slug]/cast" tags={["Nested dynamic", "SSR"]} />
          <RouteRow path="/genre/[genre]" tags={["SSG", "generateStaticParams"]} />
          <RouteRow path="/search" tags={["CSR", "Server Action"]} />
          <RouteRow path="/watchlist" tags={["Server Action", "CRUD"]} />
          <RouteRow path="/about" tags={["Static"]} />
          <RouteRow path="/api/movies" tags={["API Route", "GET", "POST"]} />
          <RouteRow path="/api/movies/[id]" tags={["API Route", "GET", "PUT", "DELETE"]} />
        </div>
      </section>
    </div>
  );
}

function RouteRow({ path, tags }: { path: string; tags: string[] }) {
  return (
    <div className="flex items-center justify-between border-b border-foreground/20 last:border-b-0 px-4 py-3">
      <code className="text-sm">{path}</code>
      <div className="flex flex-wrap gap-2 justify-end">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[10px] uppercase tracking-wider border border-foreground/40 px-2 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
