"use client";

import { useEffect, useCallback, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { usePlayerStore } from "@/store/playerStore";
import ServerSelector from "./ServerSelector";
import { EpisodePanel } from "./EpisodePanel";
import { getMovieEmbedUrl, getTVEmbedUrl } from "@/lib/embed";
import { cn } from "@/lib/utils";
import { useShallow } from "zustand/react/shallow";
import ResponsiveDialog from "../ui/ResponsiveDialog";

export function PlayerModal() {
  const [isOpen, mediaType, tmdbId, title, season, episode, selectedServer] =
    usePlayerStore(
      useShallow((state) => [
        state.isOpen,
        state.mediaType,
        state.tmdbId,
        state.title,
        state.season,
        state.episode,
        state.selectedServer,
      ])
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
    [isOpen, mediaType, nextEpisode, previousEpisode]
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
          "flex flex-col p-0 gap-0 border-white/10 bg-zinc-950 overflow-hidden",
          "w-full h-[85dvh] max-w-full",
          "md:w-[95vw] md:h-[95dvh] md:max-w-[1400px]"
        ),
        showCloseButton: true,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-3 px-4 border-b border-white/10 shrink-0">
        <h2 className="text-base sm:text-lg font-semibold text-white truncate">
          {title}
        </h2>
        <ServerSelector className="shrink-0 mr-8" />
      </div>

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 min-h-0 flex",
          "flex-col",
          "md:flex-row"
        )}
      >
        {/* Video container */}
        <div
          className={cn(
            "relative bg-black",
            "aspect-video w-full shrink-0",
            "md:aspect-auto md:flex-1 md:min-w-0"
          )}
        >
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

        {/* Episode panel - only for TV shows */}
        {mediaType === "tv" && (
          <div
            className={cn(
              "border-white/10 overflow-hidden",
              "flex-1 min-h-0 border-t",
              "md:flex-none md:h-full md:w-[280px] md:border-t-0 md:border-l"
            )}
          >
            <EpisodePanel />
          </div>
        )}
      </div>
    </ResponsiveDialog>
  );
}
