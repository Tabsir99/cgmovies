import Link from "next/link";
import Image from "next/image";
import { BaseMediaItem } from "@/types/media";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  getImageUrl,
  getTitle,
  getReleaseYear,
  getMediaType,
  createSlug,
} from "@/lib/tmdb";

interface RecommendationsSectionProps {
  recommendations: BaseMediaItem[];
}

export function RecommendationsSection({
  recommendations,
}: RecommendationsSectionProps) {
  if (recommendations.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">More Like This</h2>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {recommendations.slice(0, 12).map((item) => (
            <RecommendationCard key={item.id} item={item} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

function RecommendationCard({ item }: { item: BaseMediaItem }) {
  const title = getTitle(item);
  const year = getReleaseYear(item);
  const mediaType = getMediaType(item);
  const posterUrl = getImageUrl(item.poster_path, "w342");
  const slug = createSlug(title, item.id);

  return (
    <Link
      href={`/${mediaType}/${slug}`}
      className="group flex-shrink-0 w-[160px] sm:w-[180px]"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3 bg-white/5">
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

        {/* Rating Badge */}
        {item.vote_average > 0 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded flex items-center gap-1">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-white text-xs font-semibold">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="text-white text-sm font-medium line-clamp-2 leading-tight mb-1 group-hover:text-white/80 transition-colors">
          {title}
        </h3>
        {year && (
          <p className="text-white/60 text-xs">
            {year} • {mediaType === "movie" ? "Movie" : "TV"}
          </p>
        )}
      </div>
    </Link>
  );
}
