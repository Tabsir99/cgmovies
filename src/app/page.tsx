import { Suspense } from "react";
import HeroBanner, { HeroBannerSkeleton } from "@/components/HeroBanner";
import ContentRow, { ContentRowSkeleton } from "@/components/ContentRow";
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getPopularTV,
  getTopRatedTV,
  getMovieDetails,
  getTVDetails,
} from "@/lib/tmdb";
import { getMediaListRoute, ROUTES } from "@/lib/constant";
import { BaseMediaItem } from "@/types/media";

async function HeroSection() {
  const trending = await getTrending("all", "week");
  const heroItems = trending.results.slice(0, 5);

  const detailedItems = await Promise.all(
    heroItems.map(async (item: BaseMediaItem) => {
      const mediaType = item.media_type || "movie";
      if (mediaType === "movie") {
        return {
          ...(await getMovieDetails(item.id)),
          media_type: "movie" as const,
        };
      }
      return { ...(await getTVDetails(item.id)), media_type: "tv" as const };
    }),
  );

  return (
    <div className="sticky top-0 left-0">
      <HeroBanner items={detailedItems} />
    </div>
  );
}

async function TrendingSection() {
  const trending = await getTrending("all", "day");
  return (
    <ContentRow
      title="Trending Now"
      items={trending.results}
      href={ROUTES.TRENDING}
    />
  );
}

async function PopularMoviesSection() {
  const movies = await getPopularMovies();
  return (
    <ContentRow
      title="Popular Movies"
      items={movies.results}
      href={getMediaListRoute("movie")}
    />
  );
}

async function TopRatedMoviesSection() {
  const movies = await getTopRatedMovies();
  return (
    <ContentRow
      title="Top Rated Movies"
      items={movies.results}
      href={getMediaListRoute("movie", "top_rated")}
    />
  );
}

async function NowPlayingSection() {
  const movies = await getNowPlayingMovies();
  return (
    <ContentRow
      title="In Theaters"
      items={movies.results}
      href={getMediaListRoute("movie", "now_playing")}
    />
  );
}

async function PopularTVSection() {
  const tvShows = await getPopularTV();
  return (
    <ContentRow
      title="Popular TV Shows"
      items={tvShows.results}
      href={getMediaListRoute("tv")}
    />
  );
}

async function TopRatedTVSection() {
  const tvShows = await getTopRatedTV();
  return (
    <ContentRow
      title="Top Rated TV Shows"
      items={tvShows.results}
      href={getMediaListRoute("tv", "top_rated")}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="relative z-10 space-y-2 py-8 bg-background/60 backdrop-blur-sm">
        <Suspense fallback={<ContentRowSkeleton title="Trending Now" />}>
          <TrendingSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Popular Movies" />}>
          <PopularMoviesSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="In Theaters" />}>
          <NowPlayingSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Popular TV Shows" />}>
          <PopularTVSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Top Rated Movies" />}>
          <TopRatedMoviesSection />
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton title="Top Rated TV Shows" />}>
          <TopRatedTVSection />
        </Suspense>
      </div>
    </>
  );
}
