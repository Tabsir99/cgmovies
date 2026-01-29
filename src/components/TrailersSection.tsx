import Image from "next/image";
import { Play } from "lucide-react";
import { Video } from "@/types/media";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TrailersSectionProps {
  videos: Video[];
}

export function TrailersSection({ videos }: TrailersSectionProps) {
  // Filter for trailers and teasers
  const trailers = videos.filter(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  if (trailers.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Trailers & More</h2>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {trailers.map((video) => (
            <TrailerCard key={video.id} video={video} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

function TrailerCard({ video }: { video: Video }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/hqdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.key}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={video.name}
          fill
          className="object-cover"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-black ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Official Badge */}
        {video.official && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
            Official
          </div>
        )}
      </div>

      {/* Title */}
      <div className="p-3">
        <p className="text-white text-sm font-medium line-clamp-2">
          {video.name}
        </p>
      </div>
    </a>
  );
}
