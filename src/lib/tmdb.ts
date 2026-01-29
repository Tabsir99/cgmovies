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

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY || "");
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

// Trending
export async function getTrending(
  mediaType: "movie" | "tv" | "all" = "all",
  timeWindow: "day" | "week" = "week",
): Promise<TMDBResponse<MediaItem>> {
  return await fetchTMDB<TMDBResponse<MediaItem>>(
    `/trending/${mediaType}/${timeWindow}`,
  );
}

// Movies
export async function getPopularMovies(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/movie/popular", { page: page.toString() });
}

export async function getTopRatedMovies(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/movie/top_rated", { page: page.toString() });
}

export async function getUpcomingMovies(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/movie/upcoming", { page: page.toString() });
}

export async function getNowPlayingMovies(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/movie/now_playing", { page: page.toString() });
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchTMDB(`/movie/${id}`, {
    append_to_response: "credits,videos,recommendations,release_dates",
  });
}

// TV Shows
export async function getPopularTV(page = 1): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/tv/popular", { page: page.toString() });
}

export async function getTopRatedTV(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/tv/top_rated", { page: page.toString() });
}

export async function getOnTheAirTV(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/tv/on_the_air", { page: page.toString() });
}

export async function getAiringTodayTV(
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/tv/airing_today", { page: page.toString() });
}

export async function getTVDetails(id: number): Promise<TVDetails> {
  return fetchTMDB(`/tv/${id}`, {
    append_to_response: "credits,videos,recommendations,content_ratings",
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
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/search/multi", { query, page: page.toString() });
}

export async function searchMovies(
  query: string,
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/search/movie", { query, page: page.toString() });
}

export async function searchTV(
  query: string,
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/search/tv", { query, page: page.toString() });
}

// Discover
export async function discoverMovies(
  params: Record<string, string> = {},
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/discover/movie", { ...params, page: page.toString() });
}

export async function discoverTV(
  params: Record<string, string> = {},
  page = 1,
): Promise<TMDBResponse<MediaItem>> {
  return fetchTMDB("/discover/tv", { ...params, page: page.toString() });
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
