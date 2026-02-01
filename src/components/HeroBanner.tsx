"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function HeroBannerSkeleton() {
  return (
    <section className="relative h-[60vh] min-h-[400px] sm:h-[70vh] lg:h-[75vh] w-full overflow-hidden bg-muted">
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32">
          <div className="max-w-2xl space-y-4">
            <Skeleton className="h-16 sm:h-20 w-3/4" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-16 sm:pb-20">
          <div className="flex gap-3">
            <Skeleton className="h-11 w-36 rounded-lg" />
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-11 w-11 rounded-full" />
          </div>
        </div>
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
    <section className="relative h-[75vh] min-h-[500px] sm:h-[80vh] lg:h-[95vh] w-full overflow-hidden">
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
