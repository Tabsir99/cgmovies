import { Suspense } from "react";
import { Metadata } from "next";
import HeroBanner, { HeroBannerSkeleton } from "@/components/HeroBanner";
import ContentRow, { ContentRowSkeleton } from "@/components/ContentRow";
import {
  getPopularTV,
  getTopRatedTV,
  getOnTheAirTV,
  getAiringTodayTV,
  getTVDetails,
} from "@/lib/tmdb";
import { BaseMediaItem } from "@/types/media";

export const metadata: Metadata = {
  title: "TV Shows - CGMovies",
  description: "Browse popular, top rated, on the air, and airing today TV shows",
};

// Async components for each section
async function HeroSection() {
  const popular = await getPopularTV();
  const heroItems = popular.results.slice(0, 5);

  // Fetch detailed info for each hero item
  const detailedItems = await Promise.all(
    heroItems.map(async (item: BaseMediaItem) => ({
      ...(await getTVDetails(item.id)),
      media_type: "tv" as const,
    }))
  );

  return <HeroBanner items={detailedItems} />;
}

async function PopularTVSection() {
  const tvShows = await getPopularTV();
  return <ContentRow title="Popular TV Shows" items={tvShows.results} />;
}

async function TopRatedTVSection() {
  const tvShows = await getTopRatedTV();
  return <ContentRow title="Top Rated TV Shows" items={tvShows.results} />;
}

async function OnTheAirSection() {
  const tvShows = await getOnTheAirTV();
  return <ContentRow title="On The Air" items={tvShows.results} />;
}

async function AiringTodaySection() {
  const tvShows = await getAiringTodayTV();
  return <ContentRow title="Airing Today" items={tvShows.results} />;
}

export default function TVPage() {
  return (
    <>
      {/* Hero Banner */}
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroSection />
      </Suspense>

      {/* Content Sections */}
      <div className="space-y-2 py-8">
        <Suspense fallback={<ContentRowSkeleton title="Popular TV Shows" />}>
          <PopularTVSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Airing Today" />}>
          <AiringTodaySection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="On The Air" />}>
          <OnTheAirSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Top Rated TV Shows" />}>
          <TopRatedTVSection />
        </Suspense>
      </div>
    </>
  );
}
