import { Suspense } from "react";
import { Metadata } from "next";
import HeroBanner, { HeroBannerSkeleton } from "@/components/HeroBanner";
import ContentRow, { ContentRowSkeleton } from "@/components/ContentRow";
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getMovieDetails,
} from "@/lib/tmdb";
import { BaseMediaItem } from "@/types/media";

export const metadata: Metadata = {
  title: "Movies - CGMovies",
  description: "Browse popular, top rated, now playing, and upcoming movies",
};

async function HeroSection() {
  const movies = await getTopRatedMovies();
  const heroItems = movies.results.slice(0, 5);

  const detailedItems = await Promise.all(
    heroItems.map(async (item: BaseMediaItem) => ({
      ...(await getMovieDetails(item.id)),
      media_type: "movie" as const,
    }))
  );

  return <HeroBanner items={detailedItems} />;
}

async function PopularMoviesSection() {
  const movies = await getPopularMovies();
  return <ContentRow title="Popular Movies" items={movies.results} />;
}

async function TopRatedMoviesSection() {
  const movies = await getTopRatedMovies();
  return <ContentRow title="Top Rated Movies" items={movies.results} />;
}

async function NowPlayingSection() {
  const movies = await getNowPlayingMovies();
  return <ContentRow title="In Theaters" items={movies.results} />;
}

async function UpcomingSection() {
  const movies = await getUpcomingMovies();
  return <ContentRow title="Upcoming Movies" items={movies.results} />;
}

export default function MoviePage() {
  return (
    <>
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="space-y-2 py-8">
        <Suspense fallback={<ContentRowSkeleton title="Popular Movies" />}>
          <PopularMoviesSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="In Theaters" />}>
          <NowPlayingSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Top Rated Movies" />}>
          <TopRatedMoviesSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Upcoming Movies" />}>
          <UpcomingSection />
        </Suspense>
      </div>
    </>
  );
}
