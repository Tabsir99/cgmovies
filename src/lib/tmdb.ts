import {
  BaseMediaItem,
  MediaItem,
  MovieDetails,
  SeasonDetails,
  TMDBResponse,
  TVDetails,
} from "@/types/media";
import {
  MOVIE_GENRES,
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE,
  TV_GENRES,
} from "./constant";
import { api } from "./api";
import { AxiosError } from "axios";

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new Error(
      "TMDB API key is not configured. Please set NEXT_PUBLIC_TMDB_API_KEY in your .env file.",
    );
  }

  try {
    const { data } = await api.get(`${TMDB_BASE_URL}${endpoint}`, {
      params: { api_key: TMDB_API_KEY, language: "en-US", ...params },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`TMDB ${endpoint} failed:`, {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        url: error.config?.url,
      });
    } else {
      console.error(`TMDB ${endpoint} failed:`, error);
    }
    throw error;
  }
}

// Trending
export async function getTrending(
  mediaType: "movie" | "tv" | "all" = "all",
  timeWindow: "day" | "week" = "week",
): Promise<TMDBResponse<BaseMediaItem>> {
  return await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    `/trending/${mediaType}/${timeWindow}`,
  );
}

// Movies
export async function getPopularMovies(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/movie/popular",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie" as const,
    })),
  };
}

export async function getTopRatedMovies(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/movie/top_rated",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie" as const,
    })),
  };
}

export async function getUpcomingMovies(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/movie/upcoming",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie" as const,
    })),
  };
}

export async function getNowPlayingMovies(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/movie/now_playing",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie" as const,
    })),
  };
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchTMDB(`/movie/${id}`, {
    append_to_response: "credits,videos,recommendations,release_dates,images",
  });
}

// TV Shows
export async function getPopularTV(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>("/tv/popular", {
    page: page.toString(),
  });
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv" as const,
    })),
  };
}

export async function getTopRatedTV(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/tv/top_rated",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv" as const,
    })),
  };
}

export async function getOnTheAirTV(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/tv/on_the_air",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv" as const,
    })),
  };
}

export async function getAiringTodayTV(
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/tv/airing_today",
    {
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv" as const,
    })),
  };
}

export async function getTVDetails(id: number): Promise<TVDetails> {
  return fetchTMDB(`/tv/${id}`, {
    append_to_response: "credits,videos,recommendations,content_ratings,images",
  });
}

export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number,
): Promise<SeasonDetails> {
  return fetchTMDB(`/tv/${tvId}/season/${seasonNumber}`);
}

// Search
export async function searchMulti(
  query: string,
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  return fetchTMDB("/search/multi", { query, page: page.toString() });
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/search/movie",
    {
      query,
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie" as const,
    })),
  };
}

export async function searchTV(
  query: string,
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>("/search/tv", {
    query,
    page: page.toString(),
  });
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv" as const,
    })),
  };
}

// Discover
export async function discoverMovies(
  params: Record<string, string> = {},
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/discover/movie",
    {
      ...params,
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "movie" as const,
    })),
  };
}

export async function discoverTV(
  params: Record<string, string> = {},
  page = 1,
): Promise<TMDBResponse<BaseMediaItem>> {
  const response = await fetchTMDB<TMDBResponse<BaseMediaItem>>(
    "/discover/tv",
    {
      ...params,
      page: page.toString(),
    },
  );
  return {
    ...response,
    results: response.results.map((item) => ({
      ...item,
      media_type: "tv" as const,
    })),
  };
}

// Utility functions
export function getImageUrl(
  path: string | null,
  size:
    | "w92"
    | "w154"
    | "w185"
    | "w342"
    | "w500"
    | "w780"
    | "original" = "w500",
): string {
  if (!path) return "/placeholder-poster.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: "w300" | "w780" | "w1280" | "original" = "w1280",
): string {
  if (!path) return "/placeholder-backdrop.svg";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getLogoUrl(
  item: MediaItem,
  size: "w92" | "w154" | "w185" | "w300" | "w500" | "original" = "w500",
): string | null {
  if (!item.images?.logos || item.images.logos.length === 0) return null;

  // Find English logo first, otherwise use the first available
  const englishLogo = item.images.logos.find((logo) => logo.iso_639_1 === "en");
  const logo = englishLogo || item.images.logos[0];

  return `${TMDB_IMAGE_BASE}/${size}${logo.file_path}`;
}

export function getTitle(item: BaseMediaItem | MediaItem): string {
  return (
    item.title ||
    item.name ||
    item.original_title ||
    item.original_name ||
    "Unknown"
  );
}

export function getReleaseYear(item: BaseMediaItem | MediaItem): string {
  const date = item.release_date || item.first_air_date;
  if (!date) return "";
  return new Date(date).getFullYear().toString();
}

export function getMediaType(item: BaseMediaItem | MediaItem): "movie" | "tv" {
  if (item.media_type) return item.media_type;
  return "movie";
}

export function createSlug(title: string, id: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${slug}-${id}`;
}

export function getGenreNames(
  genreIds: number[],
  mediaType: "movie" | "tv",
): string[] {
  const genres = mediaType === "movie" ? MOVIE_GENRES : TV_GENRES;
  return genreIds.map((id) => genres[id]).filter(Boolean);
}

export function getMovieCertification(item: MovieDetails): string | null {
  const usRelease = item.release_dates?.results?.find(
    (r) => r.iso_3166_1 === "US",
  );
  if (usRelease) {
    const certification = usRelease.release_dates.find(
      (rd) => rd.certification,
    )?.certification;
    if (certification) return certification;
  }
  return null;
}

export function getTVCertification(item: TVDetails): string | null {
  const usRating = item.content_ratings?.results?.find(
    (r) => r.iso_3166_1 === "US",
  );
  if (usRating?.rating) return usRating.rating;
  return null;
}

export function getCertification(item: MediaItem): string | null {
  if (item.media_type === "movie") {
    return getMovieCertification(item as MovieDetails);
  }
  return getTVCertification(item as TVDetails);
}

export function getRuntime(item: MediaItem): number | null {
  if (item.media_type === "movie") {
    return (item as MovieDetails).runtime || null;
  }
  const tvItem = item as TVDetails;
  return tvItem.episode_run_time?.[0] || null;
}
