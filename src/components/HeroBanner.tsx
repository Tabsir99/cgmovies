"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, Info, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  getTitle,
  getReleaseYear,
  getBackdropUrl,
  getMediaType,
  createSlug,
  getGenreNames,
  getCertification,
  getRuntime,
} from "@/lib/tmdb";
import { MediaItem } from "@/types/media";

/* =========================
   Constants / Config
========================= */

const HERO_ITEM_LIMIT = 5;
const AUTO_ADVANCE_MS = 8000;

const DOT_ACTIVE_WIDTH = "w-8";
const DOT_INACTIVE_WIDTH = "w-1";

const ACTION_BUTTONS = [
  {
    key: "info",
    icon: Info,
    ariaLabel: "More info",
  },
  {
    key: "bookmark",
    customIcon: true,
    ariaLabel: "Bookmark",
  },
  {
    key: "add",
    icon: Plus,
    ariaLabel: "Add to list",
  },
];

/* =========================
   Component
========================= */

interface HeroBannerProps {
  items: MediaItem[];
}

export default function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

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

  const currentItem = heroItems[currentIndex];
  if (!currentItem) return null;

  const title = getTitle(currentItem);
  const year = getReleaseYear(currentItem);
  const mediaType = getMediaType(currentItem);
  const slug = createSlug(title, currentItem.id);
  const href = `/${mediaType}/${slug}`;
  const genres = getGenreNames(
    currentItem.genre_ids?.slice(0, 3) || [],
    mediaType,
  );
  const rating = currentItem.vote_average?.toFixed(1);
  const runtime = getRuntime(currentItem);
  const certification = getCertification(currentItem);

  return (
    <section className="relative h-[75vh] min-h-[500px] sm:h-[80vh] lg:h-[95vh] w-full overflow-hidden">
      {/* Background Images */}
      {heroItems.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          {!imageError[item.id] ? (
            <Image
              src={getBackdropUrl(item.backdrop_path, "original")}
              alt={getTitle(item)}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
              onError={() =>
                setImageError((prev) => ({ ...prev, [item.id]: true }))
              }
            />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
        </div>
      ))}

      {/* Gradients */}
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end lg:pb-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm sm:text-base">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500 text-black font-bold rounded">
                <span className="text-xs">TMDB</span>
                <span>{rating}</span>
              </div>

              {certification && (
                <span className="px-2 py-0.5 border border-white/60 text-white font-medium rounded text-xs">
                  {certification}
                </span>
              )}
              <span className="text-white font-semibold">{year}</span>
              {runtime && (
                <>
                  <span className="text-white/80">•</span>
                  <span className="text-white/80">
                    {runtime >= 60
                      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
                      : `${runtime}m`}
                  </span>
                </>
              )}
            </div>

            <p className="text-base sm:text-lg text-white/90 line-clamp-3 mb-6 max-w-2xl leading-relaxed">
              {currentItem.overview || "No description available."}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-6 py-2 sm:py-3 max-sm:px-4 max-sm:text-sm rounded-lg bg-white text-black font-bold hover:bg-white/90 transition-colors text-base"
              >
                <Play className="h-5 w-5 fill-current" />
                Watch now
              </Link>

              {ACTION_BUTTONS.map(
                ({ key, icon: Icon, customIcon, ariaLabel }) => (
                  <button
                    key={key}
                    aria-label={ariaLabel}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
                  >
                    {customIcon ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    ) : (
                      Icon && <Icon className="h-5 w-5" />
                    )}
                  </button>
                ),
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              {genres.map((genre, index) => (
                <span key={genre}>
                  {genre}
                  {index < genres.length - 1 && " •"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 bottom-0 z-20 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 bottom-0 z-20 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
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

/* =========================
   Skeleton (UNCHANGED)
========================= */

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
