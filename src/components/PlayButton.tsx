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
          className,
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
          className,
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
        "group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        "bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100",
        "text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70",
        "before:absolute before:inset-0 before:bg-linear-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        className,
      )}
      style={{
        backgroundSize: "200% 100%",
      }}
    >
      <Play className="h-5 w-5 fill-current relative z-10 transition-transform group-hover:scale-110" />
      <span className="relative z-10">Watch now</span>
    </button>
  );
}
