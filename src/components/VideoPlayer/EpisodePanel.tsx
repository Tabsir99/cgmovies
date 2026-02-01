"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Episode } from "@/types/media";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBackdropUrl } from "@/lib/tmdb";
import { usePlayerStore } from "@/store/playerStore";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

export function EpisodePanel() {
  const [tmdbId, season, episode, totalSeasons, totalEpisodes] = usePlayerStore(
    useShallow((state) => [
      state.tmdbId,
      state.season,
      state.episode,
      state.totalSeasons,
      state.totalEpisodes,
    ])
  );

  const { setEpisode, setSeason } = usePlayerStore.getState();

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentEpisodeRef = useRef<HTMLButtonElement>(null);

  // Fetch episodes when season changes
  useEffect(() => {
    if (!tmdbId) return;

    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/seasons?tvId=${tmdbId}&seasonNumber=${season}`
        );
        const data = await response.json();
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Failed to load episodes:", error);
        setEpisodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [tmdbId, season]);

  // Scroll to current episode when episodes load
  useEffect(() => {
    if (currentEpisodeRef.current) {
      currentEpisodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [episodes, episode]);

  const handlePreviousSeason = () => {
    if (season > 1) {
      setSeason(season - 1);
    }
  };

  const handleNextSeason = () => {
    if (season < totalSeasons) {
      setSeason(season + 1);
    }
  };

  const handleEpisodeClick = (episodeNumber: number) => {
    setEpisode(season, episodeNumber);
  };

  return (
    <div className="flex flex-col h-full min-w-72 bg-zinc-900/50">
      {/* Season Selector */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePreviousSeason}
          disabled={season <= 1}
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm font-medium text-white">Season {season}</span>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextSeason}
          disabled={season >= totalSeasons}
          className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Episode List */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 text-white/60 animate-spin" />
            </div>
          ) : episodes.length > 0 ? (
            <div className="p-2 space-y-1">
              {episodes.map((ep) => {
                const isCurrent = ep.episode_number === episode;
                const stillUrl = ep.still_path
                  ? getBackdropUrl(ep.still_path, "w300")
                  : null;

                return (
                  <button
                    key={ep.id}
                    ref={isCurrent ? currentEpisodeRef : null}
                    onClick={() => handleEpisodeClick(ep.episode_number)}
                    className={cn(
                      "w-full flex gap-3 p-2 rounded-lg text-left transition-colors",
                      isCurrent
                        ? "bg-white/15 ring-1 ring-white/30"
                        : "hover:bg-white/10"
                    )}
                  >
                    {/* Thumbnail */}
                    <div className="relative shrink-0 w-24 aspect-video rounded overflow-hidden bg-white/5">
                      {stillUrl ? (
                        <Image
                          src={stillUrl}
                          alt={ep.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs">
                          No image
                        </div>
                      )}
                      {/* Episode number badge */}
                      <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-medium rounded">
                        E{ep.episode_number}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 py-0.5">
                      <p
                        className={cn(
                          "text-sm font-medium line-clamp-1",
                          isCurrent ? "text-white" : "text-white/80"
                        )}
                      >
                        {ep.name}
                      </p>
                      {ep.runtime && (
                        <p className="text-xs text-white/50 mt-0.5">
                          {ep.runtime} min
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-white/50 text-sm">
              No episodes found
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Episode counter */}
      <div className="px-3 py-2 border-t border-white/10 shrink-0">
        <p className="text-xs text-white/50 text-center">
          Episode {episode} of {totalEpisodes}
        </p>
      </div>
    </div>
  );
}
