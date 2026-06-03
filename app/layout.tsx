import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Movie Recommendation",
  description: "A Next.js 16 movie app .",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        <footer className="mx-auto max-w-5xl px-6 py-8 border-t border-foreground/20 mt-20">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Built with Next.js 16 · Prisma · Neon
          </p>
        </footer>
      </body>
    </html>
  );
}
