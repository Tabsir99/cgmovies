"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Calendar, Clock } from "lucide-react";
import { Episode, Season } from "@/types/media";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBackdropUrl } from "@/lib/tmdb";
import { usePlayerStore } from "@/store/playerStore";

interface EpisodesSectionProps {
  seasons: Season[];
  tvId: number;
  tvTitle: string;
  initialSeasonNumber?: number;
}

export function EpisodesSection({
  seasons,
  tvId,
  tvTitle,
  initialSeasonNumber = 1,
}: EpisodesSectionProps) {
  const [selectedSeason, setSelectedSeason] = useState(
    initialSeasonNumber.toString()
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter out season 0 (specials) from the dropdown, but keep in data
  const selectableSeasons = seasons.filter((s) => s.season_number > 0);
  const totalSeasons = selectableSeasons.length;

  // Load episodes when season changes
  const handleSeasonChange = async (seasonNumber: string) => {
    setSelectedSeason(seasonNumber);
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/seasons?tvId=${tvId}&seasonNumber=${seasonNumber}`
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

  // Load episodes on mount
  useEffect(() => {
    handleSeasonChange(selectedSeason);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (selectableSeasons.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Episodes</h2>

        {/* Season Selector */}
        <Select value={selectedSeason} onValueChange={handleSeasonChange}>
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-white/10">
            {selectableSeasons.map((season) => (
              <SelectItem
                key={season.id}
                value={season.season_number.toString()}
                className="text-white focus:bg-white/10 focus:text-white"
              >
                {season.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Episodes Grid */}
      {isLoading ? (
        <div className="text-white/60 text-center py-12">Loading episodes...</div>
      ) : episodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              tvId={tvId}
              tvTitle={tvTitle}
              seasonNumber={parseInt(selectedSeason)}
              totalEpisodes={episodes.length}
              totalSeasons={totalSeasons}
            />
          ))}
        </div>
      ) : (
        <div className="text-white/60 text-center py-12">
          Select a season to view episodes
        </div>
      )}
    </section>
  );
}

interface EpisodeCardProps {
  episode: Episode;
  tvId: number;
  tvTitle: string;
  seasonNumber: number;
  totalEpisodes: number;
  totalSeasons: number;
}

function EpisodeCard({
  episode,
  tvId,
  tvTitle,
  seasonNumber,
  totalEpisodes,
  totalSeasons,
}: EpisodeCardProps) {
  const { openTVShow } = usePlayerStore();

  const stillUrl = episode.still_path
    ? getBackdropUrl(episode.still_path, "w780")
    : "/placeholder-backdrop.svg";

  const handlePlay = () => {
    openTVShow(tvId, tvTitle, seasonNumber, episode.episode_number, totalEpisodes, totalSeasons);
  };

  return (
    <div
      onClick={handlePlay}
      className="group bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all cursor-pointer"
    >
      {/* Episode Still */}
      <div className="relative aspect-video">
        <Image src={stillUrl} alt={episode.name} fill className="object-cover" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="h-5 w-5 text-black ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Episode Number Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded">
          Episode {episode.episode_number}
        </div>
      </div>

      {/* Episode Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-base mb-2 line-clamp-1">
          {episode.name}
        </h3>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs text-white/60 mb-3">
          {episode.air_date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(episode.air_date).toLocaleDateString()}</span>
            </div>
          )}
          {episode.runtime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{episode.runtime} min</span>
            </div>
          )}
        </div>

        {/* Overview */}
        <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">
          {episode.overview || "No description available."}
        </p>

        {/* Rating */}
        {episode.vote_average > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
              <span>★</span>
              <span>{episode.vote_average.toFixed(1)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
