"use client";

import { Play } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  mediaType: "movie" | "tv";
  tmdbId: number;
  title: string;
  season?: number;
  episode?: number;
  totalEpisodes?: number;
  totalSeasons?: number;
  variant?: "default" | "icon" | "small";
  className?: string;
}

export function PlayButton({
  mediaType,
  tmdbId,
  title,
  season = 1,
  episode = 1,
  totalEpisodes = 1,
  totalSeasons = 1,
  variant = "default",
  className,
}: PlayButtonProps) {
  const { openMovie, openTVShow } = usePlayerStore();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (mediaType === "movie") {
      openMovie(tmdbId, title);
    } else {
      openTVShow(tmdbId, title, season, episode, totalEpisodes, totalSeasons);
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-110",
          className
        )}
        aria-label={`Play ${title}`}
      >
        <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
      </button>
    );
  }

  if (variant === "small") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition-colors text-sm",
          className
        )}
      >
        <Play className="h-4 w-4 fill-current" />
        <span>Play</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-2 sm:py-3 max-sm:px-4 max-sm:text-sm rounded-lg bg-white text-black font-bold hover:bg-white/90 transition-colors text-base",
        className
      )}
    >
      <Play className="h-5 w-5 fill-current" />
      <span>Watch now</span>
    </button>
  );
}
