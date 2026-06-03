// Static page — no data fetching, pre-rendered at build time.
export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <header className="space-y-2 border-b border-foreground/20 pb-6">
        <h1 className="text-2xl font-bold">About</h1>
        <p className="text-xs text-muted-foreground">Static page · pre-rendered</p>
      </header>

      <section className="space-y-4 text-sm leading-relaxed">
        <p>
          <strong className="text-foreground">mvx</strong> is a reference Next.js 16
          application demonstrating every rendering and data-fetching pattern in the
          App Router. Each route deliberately uses a different technique so you can
          compare them side by side.
        </p>

        <h2 className="text-xs uppercase tracking-widest text-muted-foreground pt-4">
          Rendering strategies
        </h2>
        <ul className="space-y-2 list-none pl-0">
          <li>
            <code className="text-foreground">/</code> ·{" "}
            <code className="text-foreground">/about</code> — Static. No data fetch, no
            dynamic API. Pre-rendered at build.
          </li>
          <li>
            <code className="text-foreground">/movies</code> — SSR. Uses{" "}
            <code>searchParams</code>, rendered fresh on every request.
          </li>
          <li>
            <code className="text-foreground">/movies/[slug]</code> — ISR.
            Statically generated, revalidated every 60s. Popular slugs are pre-built via{" "}
            <code>generateStaticParams</code>.
          </li>
          <li>
            <code className="text-foreground">/movies/[slug]/cast</code> — Nested
            dynamic route, SSR.
          </li>
          <li>
            <code className="text-foreground">/genre/[genre]</code> — Pure SSG. All
            genres pre-rendered at build. Unknown genres 404 instead of rendering.
          </li>
          <li>
            <code className="text-foreground">/search</code> — Static shell with a
            client component (<code>&apos;use client&apos;</code>) calling a server
            action.
          </li>
          <li>
            <code className="text-foreground">/watchlist</code> — Server-rendered with
            full CRUD via server actions.
          </li>
        </ul>

        <h2 className="text-xs uppercase tracking-widest text-muted-foreground pt-4">
          API Routes vs Server Actions
        </h2>
        <p>
          <strong className="text-foreground">API Routes</strong> (
          <code>/api/movies</code>, <code>/api/movies/[id]</code>) expose a public
          REST-style endpoint with structured JSON responses. Use them when
          something <em>outside</em> your app needs to talk to your data: mobile
          clients, webhooks, third parties.
        </p>
        <p>
          <strong className="text-foreground">Server Actions</strong> (
          <code>actions/watchlist.ts</code>, <code>actions/search.ts</code>) run
          server code from a component. They&apos;re internal — there&apos;s no
          public URL, no manual fetch, no JSON parsing. Use them for form
          submissions and mutations triggered by your own UI.
        </p>

        <h2 className="text-xs uppercase tracking-widest text-muted-foreground pt-4">
          Stack
        </h2>
        <ul className="space-y-1">
          <li>· Next.js 16 (App Router)</li>
          <li>· Bun (runtime + package manager)</li>
          <li>· Prisma 6 + Neon (Postgres)</li>
          <li>· Tailwind v4</li>
          <li>· shadcn/ui components</li>
          <li>· IBM Plex Mono</li>
        </ul>
      </section>
    </div>
  );
}
