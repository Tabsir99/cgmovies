import { Metadata } from "next";
import { Sparkles, Hammer, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anime - CGMovies",
  description: "Anime section coming soon to CGMovies",
};

export default function AnimePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium">
            <Hammer className="w-3.5 h-3.5" />
            Under Construction
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Anime
            </span>{" "}
            <span className="text-foreground">Coming Soon</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            We're crafting an amazing anime experience for you. Stay tuned for
            your favorite series, movies, and exclusive content.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              Explore Movies & TV
            </Link>
          </Button>

          <Button variant="outline" size="lg" className="gap-2" disabled>
            <Bell className="w-4 h-4" />
            Notify Me
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">What to expect</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Vast Library", desc: "Thousands of anime titles" },
              { title: "HD Quality", desc: "Crystal clear streaming" },
              { title: "Subtitles", desc: "Multiple language support" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-xl bg-card/50 border border-border/50"
              >
                <h3 className="font-medium text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
