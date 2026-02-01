"use client";

import { useRef, useState, useCallback, memo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import MediaCard, { MediaCardSkeleton } from "./MediaCard";
import { BaseMediaItem } from "@/types/media";

const MAX_ITEMS = 10;

interface ContentRowProps {
  title: string;
  items: BaseMediaItem[];
  href?: string;
}

const ContentRow = memo(function ContentRow({
  title,
  items,
  href,
}: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Limit items for performance
  const displayItems = items.slice(0, MAX_ITEMS);

  const updateArrows = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="py-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
          {title}
        </h2>
        {href && (
          <Link
            href={href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            View All
          </Link>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-background/90 border border-border flex items-center justify-center transition-opacity hover:bg-secondary",
            showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-3 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-12 scroll-smooth"
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="w-[150px] sm:w-[170px] lg:w-[185px] shrink-0"
            >
              <MediaCard item={item} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-background/90 border border-border flex items-center justify-center transition-opacity hover:bg-secondary",
            showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
});

export default ContentRow;

// Skeleton for loading
export function ContentRowSkeleton({ title }: { title: string }) {
  return (
    <section className="py-4">
      <div className="px-4 sm:px-6 lg:px-12 mb-3">
        <Skeleton className="h-6 w-40" />
      </div>
      <div className="flex gap-3 overflow-hidden px-4 sm:px-6 lg:px-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-[150px] sm:w-[170px] lg:w-[185px] shrink-0">
            <MediaCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
