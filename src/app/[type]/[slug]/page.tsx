import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMovieDetails, getTVDetails, getTitle } from "@/lib/tmdb";
import { MediaItem, MovieDetails, TVDetails } from "@/types/media";
import { TrailersSection } from "@/components/TrailersSection";
import { CastSection } from "@/components/CastSection";
import { EpisodesSection } from "@/components/EpisodesSection";
import { RecommendationsSection } from "@/components/RecommendationsSection";
import { Separator } from "@/components/ui/separator";
import { HeroCard } from "@/components/HeroCard";

interface PageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

// Extract ID from slug (format: "title-name-123")
function extractIdFromSlug(slug: string): number {
  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  return parseInt(id, 10);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type, slug } = await params;
  const mediaId = extractIdFromSlug(slug);

  try {
    let item: MediaItem;

    if (type === "movie") {
      item = await getMovieDetails(mediaId);
    } else if (type === "tv") {
      item = await getTVDetails(mediaId);
    } else {
      return { title: "Not Found" };
    }

    const title = getTitle(item);

    return {
      title: `${title} - CGMovies`,
      description: item.overview,
    };
  } catch (error) {
    return { title: "Not Found" };
  }
}

export default async function MediaDetailsPage({ params }: PageProps) {
  const { type, slug } = await params;
  const mediaId = extractIdFromSlug(slug);

  // Validate type
  if (type !== "movie" && type !== "tv") {
    notFound();
  }

  // Fetch media details
  let item: MediaItem;

  try {
    if (type === "movie") {
      item = await getMovieDetails(mediaId);
    } else {
      item = await getTVDetails(mediaId);
    }
  } catch (error) {
    console.error("Error fetching media details:", error);
    notFound();
  }

  // Extract data
  const videos = item.videos?.results || [];
  const cast = item.credits?.cast || [];
  const crew = item.credits?.crew || [];
  const recommendations = item.recommendations?.results || [];

  return (
    <>
      {/* Hero Section */}

      <div className="relative h-[75vh] min-h-[500px] sm:h-[80vh] lg:h-[95vh] w-full overflow-hidden">
        <HeroCard item={item} isActive={true} />
      </div>

      {/* Content Sections */}
      <div className="px-6 sm:px-12 lg:px-16">
        {/* Episodes Section (TV Shows Only) */}
        {type === "tv" && (
          <>
            <EpisodesSection
              seasons={(item as TVDetails).seasons}
              tvId={mediaId}
              tvTitle={getTitle(item)}
              initialSeasonNumber={1}
            />
            <Separator className="my-8 bg-white/10" />
          </>
        )}

        {/* Trailers & More */}
        {videos.length > 0 && (
          <>
            <TrailersSection videos={videos} />
            <Separator className="my-8 bg-white/10" />
          </>
        )}

        {/* Cast & Crew */}
        {cast.length > 0 && (
          <>
            <CastSection cast={cast} crew={crew} />
            <Separator className="my-8 bg-white/10" />
          </>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <>
            <RecommendationsSection recommendations={recommendations} />
            <div className="pb-12" />
          </>
        )}
      </div>
    </>
  );
}
