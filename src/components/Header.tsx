"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Film, Tv, Sparkles, Play, Menu, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/constant";
import { useUIStore } from "@/store/uiStore";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: ROUTES.MOVIE, label: "Movies", icon: Film },
  { href: ROUTES.TV, label: "TV Shows", icon: Tv },
  { href: "/anime", label: "Anime", icon: Sparkles },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md bg-background/50 border-border/50 shadow-sm"
          : "bg-linear-to-b from-background/80 to-transparent",
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 transition-all duration-200 group-hover:scale-105 group-hover:shadow-primary/40">
                <Play className="h-4 w-4 text-primary-foreground fill-current" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition-opacity group-hover:opacity-80">
                CGMovies
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className={cn(
                      "font-medium transition-all duration-200 text-base relative min-w-26 py-5",
                      active
                        ? "text-foreground bg-accent/80"
                        : "text-foreground/70 hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Link href={link.href} className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                      {active && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full" />
                      )}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => useUIStore.setState({ isSearchModalOpen: true })}
              className="hidden sm:flex items-center gap-2 text-foreground/70 hover:text-foreground hover:bg-accent font-medium transition-all duration-200"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Search</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted/50 text-muted-foreground px-1.5 font-mono text-[10px] font-medium">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => useUIStore.setState({ isSearchModalOpen: true })}
              className="sm:hidden h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-accent"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 text-foreground/70 hover:text-foreground hover:bg-accent"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Button
                        key={link.href}
                        variant="ghost"
                        asChild
                        className={cn(
                          "justify-start font-medium relative",
                          active
                            ? "text-foreground bg-accent"
                            : "text-foreground/70 hover:text-foreground hover:bg-accent",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center gap-3"
                        >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                          {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                          )}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
