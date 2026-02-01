"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, Star, Film, Tv, Loader2, X, TrendingUp } from "lucide-react";
import ResponsiveDialog from "@/components/ui/ResponsiveDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  searchMulti,
  getImageUrl,
  getTitle,
  getReleaseYear,
  getMediaType,
  createSlug,
} from "@/lib/tmdb";
import { getMediaDetailRoute } from "@/lib/constant";
import { BaseMediaItem } from "@/types/media";
import { cn, debounce } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";

import useSWR from "swr";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchModalOpen = useUIStore((state) => state.isSearchModalOpen);

  const { data: results = [], isLoading } = useSWR(
    query ? ["search", query] : null,
    ([_, q]) => searchMulti(q).then((data) => data.results.slice(0, 10)),
    {
      revalidateOnFocus: false,
      dedupingInterval: 500,
    },
  );

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
      }, 500),
    [],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    debouncedSetQuery.cancel();
    inputRef.current?.focus();
  }, []);

  const hasSearched = query && results !== undefined;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useUIStore.setState({ isSearchModalOpen: true });
        clearSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearSearch();
    };
  }, [clearSearch]);

  return (
    <ResponsiveDialog
      open={isSearchModalOpen}
      onOpenChange={() => useUIStore.setState({ isSearchModalOpen: false })}
      title="Search"
      contentProps={{
        showCloseButton: false,
        className: "md:max-w-3xl h-[600px]",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="shrink-0 border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />

            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for movies or TV shows..."
              onChange={(e) => debouncedSetQuery(e.target.value.trim())}
            />

            <div className="flex items-center gap-2 shrink-0">
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}

              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-6 py-6">
              {!query && (
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-5">
                    <TrendingUp className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-medium mb-1.5">
                    Search our collection
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Discover thousands of movies and TV shows
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">
                    Searching...
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <SearchResultSkeleton key={i} />
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-sm font-semibold">Results</h3>
                    <span className="text-xs text-muted-foreground">
                      {results.length}{" "}
                      {results.length === 1 ? "result" : "results"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {results.map((item) => (
                      <SearchResultItem
                        key={`${item.media_type}-${item.id}`}
                        item={item}
                        onClick={() =>
                          useUIStore.setState({ isSearchModalOpen: false })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && hasSearched && results.length === 0 && (
                <div className="py-16 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-5">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-medium mb-1.5">
                    No results for "{query}"
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </ResponsiveDialog>
  );
}

interface SearchResultItemProps {
  item: BaseMediaItem;
  onClick: () => void;
}

function SearchResultItem({ item, onClick }: SearchResultItemProps) {
  const [imageError, setImageError] = useState(false);

  const title = getTitle(item);
  const year = getReleaseYear(item);
  const mediaType = getMediaType(item);
  const posterUrl = getImageUrl(item.poster_path, "w185");
  const slug = createSlug(title, item.id);
  const href = getMediaDetailRoute(mediaType, slug);
  const rating = item.vote_average?.toFixed(1);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex gap-4 p-3 rounded-xl hover:bg-primary/10 transition-all duration-200 border border-transparent hover:border-border"
    >
      {/* Poster */}
      <div className="relative w-16 h-24 shrink-0 rounded-lg overflow-hidden bg-muted shadow-sm">
        {!imageError && item.poster_path ? (
          <img
            src={posterUrl}
            alt={title}
            className="object-cover w-full h-full"
            sizes="64px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {mediaType === "tv" ? (
              <Tv className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Film className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
        {/* Title */}
        <h4 className="font-semibold text-[15px] leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h4>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm">
          {/* Type Badge */}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium",
              mediaType === "tv"
                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "bg-purple-500/10 text-purple-600 dark:text-purple-400",
            )}
          >
            {mediaType === "tv" ? (
              <Tv className="h-3 w-3" />
            ) : (
              <Film className="h-3 w-3" />
            )}
            {mediaType === "tv" ? "TV Show" : "Movie"}
          </span>

          {/* Year */}
          {year && <span className="text-muted-foreground">{year}</span>}

          {/* Rating */}
          {rating && parseFloat(rating) > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function SearchResultSkeleton() {
  return (
    <div className="flex gap-4 p-3 rounded-xl">
      <Skeleton className="w-16 h-24 shrink-0 rounded-lg" />
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </div>
  );
}
