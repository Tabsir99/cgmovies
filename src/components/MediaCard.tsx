"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getTitle,
  getReleaseYear,
  getMediaType,
  getImageUrl,
  createSlug,
  getGenreNames,
} from "@/lib/tmdb";
import { MediaItem } from "@/types/media";

interface MediaCardProps {
  item: MediaItem;
  priority?: boolean;
}

const MediaCard = memo(function MediaCard({
  item,
  priority = false,
}: MediaCardProps) {
  const [imageError, setImageError] = useState(false);

  const title = getTitle(item);
  const year = getReleaseYear(item);
  const mediaType = getMediaType(item);
  const posterUrl = getImageUrl(item.poster_path, "w342");
  const slug = createSlug(title, item.id);
  const href = `/${mediaType}/${slug}`;
  const rating = item.vote_average?.toFixed(1);
  const genres = getGenreNames(item.genre_ids?.slice(0, 2) || [], mediaType);

  return (
    <Link href={href} className="group block">
      <div className="media-card relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
        {/* Poster Image */}
        {!imageError ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 170px, 185px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
            No Image
          </div>
        )}

        {/* Rating - top right */}
        {rating && parseFloat(rating) > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-white">{rating}</span>
          </div>
        )}

        {/* Hover Overlay with Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute inset-x-0 bottom-0 p-3">
            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white/90"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            {item.overview && (
              <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                {item.overview}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Title & Meta - below card */}
      <div className="mt-2 px-0.5">
        <h3 className="text-sm font-medium text-foreground line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          {year && (
            <span className="text-xs text-muted-foreground">{year}</span>
          )}
          <span className="text-xs text-muted-foreground capitalize">
            {mediaType === "tv" ? "TV" : "Movie"}
          </span>
        </div>
      </div>
    </Link>
  );
});

export default MediaCard;

// Skeleton for loading states
export function MediaCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="mt-2 space-y-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
