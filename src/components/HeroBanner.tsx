"use client";

export function HeroBannerSkeleton() {
  return (
    <section className="relative h-[75dvh] min-h-[500px] sm:h-[80dvh] lg:h-[95dvh] w-full overflow-hidden bg-zinc-900">
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col justify-end lg:pb-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <div className="mb-3 w-full max-w-md h-24 sm:h-28 md:h-32 lg:h-36 bg-white/10 rounded animate-pulse" />

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="h-7 w-16 bg-yellow-500/20 rounded animate-pulse" />
              <div className="h-6 w-10 border border-white/20 rounded animate-pulse" />
              <div className="h-5 w-12 bg-white/10 rounded animate-pulse" />
              <div className="h-5 w-16 bg-white/10 rounded animate-pulse" />
            </div>

            <div className="space-y-2 mb-6 max-w-2xl">
              <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="h-10 w-28 bg-white/20 rounded-sm animate-pulse" />
              <div className="h-10 w-10 bg-white/10 rounded-sm animate-pulse" />
              <div className="h-10 w-10 bg-white/10 rounded-sm animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-14 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-4 sm:left-6 bottom-0 z-20 h-10 w-10 bg-white/5 rounded animate-pulse" />
      <div className="absolute right-4 sm:right-6 bottom-0 z-20 h-10 w-10 bg-white/5 rounded animate-pulse" />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        <div className="h-1 w-8 bg-white/40 rounded-full" />
        <div className="h-1 w-1.5 bg-white/20 rounded-full" />
        <div className="h-1 w-1.5 bg-white/20 rounded-full" />
        <div className="h-1 w-1.5 bg-white/20 rounded-full" />
        <div className="h-1 w-1.5 bg-white/20 rounded-full" />
      </div>
    </section>
  );
}

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HeroCard } from "./HeroCard";
import { MediaItem } from "@/types/media";
import { Button } from "./ui/button";

const HERO_ITEM_LIMIT = 5;
const AUTO_ADVANCE_MS = 5000;
const DOT_ACTIVE_WIDTH = "w-8";
const DOT_INACTIVE_WIDTH = "w-1.5";

interface HeroBannerProps {
  items: MediaItem[];
}

export default function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroItems = items.slice(0, HERO_ITEM_LIMIT);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? heroItems.length - 1 : prev - 1));
  }, [heroItems.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === heroItems.length - 1 ? 0 : prev + 1));
  }, [heroItems.length]);

  /* Auto advance */
  useEffect(() => {
    const timer = setInterval(goToNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goToNext]);

  if (heroItems.length === 0) return null;

  return (
    <section className="relative h-[75dvh] min-h-[500px] sm:h-[80dvh] lg:h-[95dvh] w-full overflow-hidden">
      {/* Hero Cards */}
      {heroItems.map((item, index) => (
        <HeroCard key={item.id} item={item} isActive={index === currentIndex} />
      ))}

      {/* Navigation Buttons */}
      <Button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 bottom-0 z-20"
        variant="ghost"
        size="icon"
      >
        <ChevronLeft className="size-7" />
      </Button>

      <Button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 bottom-0 z-20"
        variant="ghost"
        size="icon"
      >
        <ChevronRight className="size-7" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {heroItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              index === currentIndex
                ? `${DOT_ACTIVE_WIDTH} bg-white`
                : `${DOT_INACTIVE_WIDTH} bg-white/40 hover:bg-white/60`,
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
