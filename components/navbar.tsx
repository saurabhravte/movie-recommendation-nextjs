import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/search", label: "Search" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="border-b border-foreground/20">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-widest uppercase">
          [mvx]
        </Link>
        <ul className="flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-xs uppercase tracking-wider hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
