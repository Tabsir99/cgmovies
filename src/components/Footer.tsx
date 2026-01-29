import Link from "next/link";
import { Play } from "lucide-react";

const links = [
  { href: "/movie", label: "Movies" },
  { href: "/tv-show", label: "TV Shows" },
  { href: "/anime", label: "Anime" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Play className="h-3.5 w-3.5 text-primary-foreground fill-current" />
              </div>
              <span className="gradient-text">CGMovies</span>
            </Link>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* TMDB Attribution */}
        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          Data provided by TMDB. This product is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
}
