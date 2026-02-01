import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getTitle,
  getReleaseYear,
  getMediaType,
  getGenreNames,
  getCertification,
  getRuntime,
  getBackdropUrl,
  getLogoUrl,
  createSlug,
} from "@/lib/tmdb";
import { getMediaDetailRoute } from "@/lib/constant";
import { MediaItem, TVDetails } from "@/types/media";
import { PlayButton } from "@/components/PlayButton";

interface HeroCardProps {
  item: MediaItem;
  isActive: boolean;
  className?: string;
  mediaType?: "movie" | "tv";
  showInfoButton?: boolean;
}

export function HeroCard({
  item,
  isActive,
  className,
  mediaType: mediaTypeProp,
  showInfoButton = true
}: HeroCardProps) {
  const title = getTitle(item);
  const year = getReleaseYear(item);
  const mediaType = mediaTypeProp || getMediaType(item);
  const genres = getGenreNames(item.genre_ids?.slice(0, 3) || [], mediaType);
  const rating = item.vote_average?.toFixed(1);
  const runtime = getRuntime(item);
  const certification = getCertification(item);

  // TV show specific data
  const totalSeasons = mediaType === "tv" ? (item as TVDetails).number_of_seasons || 1 : 1;
  const totalEpisodes = mediaType === "tv" ? (item as TVDetails).number_of_episodes || 1 : 1;

  // For info button navigation
  const slug = createSlug(title, item.id);
  const detailUrl = getMediaDetailRoute(mediaType, slug);

  // Get logo image URL
  const logoUrl = getLogoUrl(item);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        isActive ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {/* Background Image */}
      <Image
        src={getBackdropUrl(item.backdrop_path, "original")}
        alt={title}
        fill
        priority={isActive}
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradients */}
      <div className="hero-gradient absolute inset-0" />
      <div className="hero-gradient-left absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end lg:pb-16">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 pb-16 sm:pb-20">
          <div className="max-w-2xl">
            {/* Title - Logo or Text */}
            {logoUrl ? (
              <div className="mb-3 relative w-full max-w-md h-24 sm:h-28 md:h-32 lg:h-36">
                <Image
                  src={logoUrl}
                  alt={title}
                  fill
                  priority={isActive}
                  className="object-contain object-left drop-shadow-2xl"
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                />
              </div>
            ) : (
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl">
                {title}
              </h1>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm sm:text-base">
              {/* Rating */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500 text-black font-bold rounded">
                <span className="text-xs">TMDB</span>
                <span>{rating}</span>
              </div>

              {/* Certification */}
              {certification && (
                <span className="px-2 py-0.5 border border-white/60 text-white font-medium rounded text-xs">
                  {certification}
                </span>
              )}

              {/* Year */}
              <span className="text-white font-semibold">{year}</span>

              {/* Runtime */}
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

              {/* Seasons for TV */}
              {item.media_type === "tv" && "number_of_seasons" in item && (
                <>
                  <span className="text-white/80">•</span>
                  <span className="text-white/80">
                    {(item as TVDetails).number_of_seasons}{" "}
                    {(item as TVDetails).number_of_seasons === 1
                      ? "Season"
                      : "Seasons"}
                  </span>
                </>
              )}
            </div>

            {/* Overview */}
            <p className="text-base sm:text-lg text-white/90 line-clamp-3 mb-6 max-w-2xl leading-relaxed">
              {item.overview || "No description available."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <PlayButton
                mediaType={mediaType}
                tmdbId={item.id}
                title={title}
                totalSeasons={totalSeasons}
                totalEpisodes={totalEpisodes}
              />

              {showInfoButton && (
                <Link
                  href={detailUrl}
                  aria-label="More info"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
                >
                  <Info className="h-5 w-5" />
                </Link>
              )}

              <button
                aria-label="Add to favorites"
                className="inline-flex items-center justify-center h-10 w-10 rounded-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
              >
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
              </button>
            </div>

            {/* Genres */}
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
    </div>
  );
}
