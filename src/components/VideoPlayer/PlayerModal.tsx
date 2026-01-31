"use client";

import { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import ServerSelector from "./ServerSelector";
import { Button } from "@/components/ui/button";
import { getMovieEmbedUrl, getTVEmbedUrl } from "@/lib/embed";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import ResponsiveDialog from "../ui/ResponsiveDialog";

export function PlayerModal() {
  const [
    isOpen,
    mediaType,
    tmdbId,
    title,
    season,
    episode,
    totalEpisodes,
    totalSeasons,
    selectedServer,
  ] = usePlayerStore(
    useShallow((state) => [
      state.isOpen,
      state.mediaType,
      state.tmdbId,
      state.title,
      state.season,
      state.episode,
      state.totalEpisodes,
      state.totalSeasons,
      state.selectedServer,
    ]),
  );

  const { close, nextEpisode, previousEpisode } = usePlayerStore.getState();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const embedUrl =
    tmdbId && mediaType
      ? mediaType === "movie"
        ? getMovieEmbedUrl(tmdbId, selectedServer)
        : getTVEmbedUrl(tmdbId, season, episode, selectedServer)
      : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowRight" && mediaType === "tv") {
        nextEpisode();
      } else if (e.key === "ArrowLeft" && mediaType === "tv") {
        previousEpisode();
      }
    },
    [isOpen, mediaType, nextEpisode, previousEpisode],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (embedUrl) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [embedUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };


  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={close}
      contentProps={{
        className: cn(
          "flex flex-col p-0 gap-0 border-white/10 bg-zinc-950",
          "w-full h-full max-w-full",
          "sm:w-[90vw] sm:max-h-[95dvh] sm:max-w-full",
        ),
      }}
    >
      <div className="flex items-center justify-between py-3 px-4 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-white truncate">
            {title}
          </h2>
          {mediaType === "tv" && (
            <span className="text-sm text-white/60 shrink-0">
              S{season} E{episode}
            </span>
          )}
        </div>
        <ServerSelector className="shrink-0 mr-8" />
      </div>

      <div className="relative flex-1 bg-black min-h-0">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black z-10">
            <Loader2 className="h-10 w-10 text-white/60 animate-spin" />
            <span className="text-white/60 text-sm">Loading player...</span>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4 bg-black z-10">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <span className="text-white/80 text-sm">
              Failed to load player. Try a different server.
            </span>
          </div>
        )}

        {embedUrl && (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            referrerPolicy="origin"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        )}
      </div>

      {mediaType === "tv" && (
        <div className="px-3 py-3 sm:px-4 bg-zinc-900/80 border-t border-white/10 backdrop-blur-sm shrink-0">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousEpisode}
              disabled={season === 1 && episode === 1}
              className="h-9 w-9 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <span className="text-sm text-white/70 min-w-[80px] text-center">
              S{season} E{episode}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextEpisode}
              disabled={season === totalSeasons && episode === totalEpisodes}
              className="h-9 w-9 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </ResponsiveDialog>
  );
}
