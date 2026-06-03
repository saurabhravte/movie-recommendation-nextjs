import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-12">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-sm text-muted-foreground">This route does not exist.</p>
      <Link
        href="/"
        className="inline-block text-xs uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
      >
        ← home
      </Link>
    </div>
  );
}
