import Image from "next/image";
import { Download, Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getBackdropUrl,
  getTitle,
  getReleaseYear,
  getCertification,
  getRuntime,
} from "@/lib/tmdb";
import { MediaItem, MovieDetails, TVDetails } from "@/types/media";

interface MediaHeroProps {
  item: MediaItem;
}

export function MediaHero({ item }: MediaHeroProps) {
  const title = getTitle(item);
  const year = getReleaseYear(item);
  const certification = getCertification(item);
  const runtime = getRuntime(item);
  const rating = item.vote_average?.toFixed(1);
  const backdropUrl = getBackdropUrl(item.backdrop_path, "original");

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] flex items-end">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <Image
          src={backdropUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Rating */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500 text-black font-bold rounded-md">
            <span className="text-xs">TMDB</span>
            <span className="text-sm">{rating}</span>
          </div>

          {/* Certification */}
          {certification && (
            <Badge variant="outline" className="border-white/60 text-white font-medium text-xs">
              {certification}
            </Badge>
          )}

          {/* Year */}
          <span className="text-white font-semibold">{year}</span>

          {/* Runtime */}
          {runtime && (
            <>
              <span className="text-white/60">•</span>
              <span className="text-white/80">{runtime} min</span>
            </>
          )}

          {/* Seasons for TV */}
          {item.media_type === "tv" && (
            <>
              <span className="text-white/60">•</span>
              <span className="text-white/80">
                {(item as TVDetails).number_of_seasons}{" "}
                {(item as TVDetails).number_of_seasons === 1 ? "Season" : "Seasons"}
              </span>
            </>
          )}
        </div>

        {/* Overview */}
        <p className="text-white/90 text-base sm:text-lg max-w-3xl mb-8 line-clamp-3 leading-relaxed">
          {item.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold">
            <Download className="mr-2 h-5 w-5" />
            Download
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
