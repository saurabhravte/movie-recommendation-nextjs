# mvx — Next.js 16 movie reference app

A minimal movie recommendation web app that demonstrates every Next.js 16 concept on your project checklist. Black & white, IBM Plex Mono, shadcn components.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Bun** (runtime + package manager)
- **Prisma 6** + **Neon** (Postgres, serverless adapter)
- **Tailwind v4**
- **shadcn/ui** (button, card, input, badge)
- **IBM Plex Mono** via `next/font/google`

## Setup

### 1. Create a Neon database

Go to [console.neon.tech](https://console.neon.tech), create a project, and copy the **pooled** connection string from the dashboard.

### 2. Configure env

```bash
cp .env.example .env
# then paste your Neon connection string into DATABASE_URL
```

### 3. Install & migrate

```bash
bun install
bun run db:push      # creates the tables in Neon
bun run db:seed      # inserts 12 sample movies
```

### 4. Run

```bash
bun run dev
```

Open [localhost:3000](http://localhost:3000).

## What each route demonstrates

| Route | Strategy | Concept |
|---|---|---|
| `/` | Static | No data, pre-rendered at build |
| `/about` | Static | Pure markup |
| `/movies` | SSR | Reads `searchParams` → request-time render |
| `/movies/[slug]` | Dynamic + ISR | `revalidate = 60`, `generateStaticParams` for popular slugs |
| `/movies/[slug]/cast` | Nested dynamic | SSR (`force-dynamic`) |
| `/genre/[genre]` | SSG | All genres pre-built; `dynamicParams = false` |
| `/search` | CSR + Server Action | Client component calls `searchMovies()` server action |
| `/watchlist` | Server-rendered + CRUD | Server actions for add/remove, revalidates on mutation |
| `/api/movies` | API Route | `GET` (list), `POST` (create) |
| `/api/movies/[id]` | API Route | `GET`, `PATCH`, `DELETE` |
| `/api/watchlist` | API Route | `GET`, `POST`, `DELETE` (mirrors server actions for external clients) |

### Special files

- `app/layout.tsx` — root layout, font, navbar, footer
- `app/loading.tsx` — root-level skeleton (Suspense fallback)
- `app/error.tsx` — root error boundary (`'use client'`)
- `app/not-found.tsx` — 404 page
- `app/movies/[slug]/loading.tsx` — nested loading
- `app/movies/[slug]/error.tsx` — nested error boundary

### Folder layout

```
app/         all routes
components/  shared UI + shadcn/ui primitives
lib/         prisma client, session, api-response helpers, cn()
actions/     server actions ('use server')
prisma/      schema + seed script
```

## API Routes vs Server Actions — the deliberate contrast

Both `/api/watchlist` (API route) and `actions/watchlist.ts` (server action) do the same thing on purpose, so you can see the difference:

**Server Action** — called directly from a React component:
```tsx
"use client";
import { addToWatchlist } from "@/actions/watchlist";
<button onClick={() => addToWatchlist(movieId)}>+</button>
```
No URL, no JSON, no fetch. Form-style mutations from inside the app.

**API Route** — called by anyone with HTTP:
```bash
curl -X POST http://localhost:3000/api/watchlist \
  -H "Content-Type: application/json" \
  -d '{"movieId":"..."}'
```
Public endpoint. Use this when something *outside* your Next.js app needs to talk to your data.

## API response shape

Every API route returns a structured envelope:

```ts
// success
{ "data": { ... }, "error": null, "status": "ok" }

// error
{ "data": null, "error": { "message": "...", "code": "..." }, "status": "error" }
```

Try it:
```bash
curl http://localhost:3000/api/movies
curl http://localhost:3000/api/movies?genre=sci-fi
curl http://localhost:3000/api/movies/<id>
```

## Commands

```bash
bun run dev          # next dev with Turbopack
bun run build        # prisma generate + next build
bun run db:push      # push schema to Neon
bun run db:seed      # seed sample data
bun run db:studio    # open Prisma Studio
```
