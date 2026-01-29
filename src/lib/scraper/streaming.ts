/**
 * tmovie.tv Streaming API Client
 *
 * This module provides utilities for:
 * - Fetching movie/TV metadata via TMDB proxy API
 * - Generating embed URLs for all 23 streaming providers
 * - Getting streaming sources from internal HLS API
 *
 * See TMOVIE_STRUCTURE.md for full documentation
 */

const BASE_URL = "https://tmovie.tv";

// ============================================
// Types
// ============================================

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  imdb_id: string;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
}

export interface StreamResponse {
  success: boolean;
  streams?: { url: string }[];
}

/**
 * All 23 server names in order as defined in tmovie.tv
 */
export type ServerName =
  | "VidsrcCC"
  | "VidUp"
  | "NHDAPI"
  | "TurboVid"
  | "Videasy"
  | "VidPlus"
  | "RiveStream"
  | "AutoEmbed"
  | "111Movies"
  | "Vidify"
  | "VidAPI"
  | "2Embed"
  | "Vidrock"
  | "VidFast"
  | "VidsrcXYZ"
  | "VidLink"
  | "VidsrcSU"
  | "EmbedSU"
  | "Resident"
  | "Vidzee"
  | "Bludclart"
  | "Main"
  | "tmovie";

/**
 * Server display names (shown in UI)
 */
export const serverDisplayNames: Record<ServerName, string> = {
  VidsrcCC: "1 Vanilla",
  VidUp: "2 Lora",
  NHDAPI: "3 Mend",
  TurboVid: "4 Felix",
  Videasy: "5 Vars",
  VidPlus: "6 Swift",
  RiveStream: "7 Quazar",
  AutoEmbed: "8 Starlight",
  "111Movies": "9 Gaze",
  Vidify: "10 Florence",
  VidAPI: "11 Deez",
  "2Embed": "12 Titan",
  Vidrock: "13 Zix",
  VidFast: "14 Delta",
  VidsrcXYZ: "15 Bravo",
  VidLink: "16 Myth",
  VidsrcSU: "17 Asuka",
  EmbedSU: "18 Susanoo",
  Resident: "19 Glose",
  Vidzee: "20 Bob Johns",
  Bludclart: "21 Rox",
  Main: "22 Icey",
  tmovie: "23 Boxed",
};

/**
 * Server properties
 */
export const serverHasAds: Record<ServerName, boolean> = {
  VidsrcCC: false,
  VidUp: true,
  NHDAPI: false,
  TurboVid: false,
  Videasy: false,
  VidPlus: true,
  RiveStream: false,
  AutoEmbed: true,
  "111Movies": true,
  Vidify: true,
  VidAPI: true,
  "2Embed": true,
  Vidrock: true,
  VidFast: true,
  VidsrcXYZ: true,
  VidLink: true,
  VidsrcSU: true,
  EmbedSU: true,
  Resident: false,
  Vidzee: false,
  Bludclart: false,
  Main: false,
  tmovie: false,
};

export const serverHas4K: Record<ServerName, boolean> = {
  VidsrcCC: false,
  VidUp: false,
  NHDAPI: false,
  TurboVid: false,
  Videasy: true,
  VidPlus: false,
  RiveStream: false,
  AutoEmbed: false,
  "111Movies": false,
  Vidify: false,
  VidAPI: false,
  "2Embed": false,
  Vidrock: false,
  VidFast: true,
  VidsrcXYZ: false,
  VidLink: false,
  VidsrcSU: false,
  EmbedSU: false,
  Resident: false,
  Vidzee: false,
  Bludclart: false,
  Main: false,
  tmovie: false,
};

/**
 * Ordered list of all servers
 */
export const allServers: ServerName[] = [
  "VidsrcCC",
  "VidUp",
  "NHDAPI",
  "TurboVid",
  "Videasy",
  "VidPlus",
  "RiveStream",
  "AutoEmbed",
  "111Movies",
  "Vidify",
  "VidAPI",
  "2Embed",
  "Vidrock",
  "VidFast",
  "VidsrcXYZ",
  "VidLink",
  "VidsrcSU",
  "EmbedSU",
  "Resident",
  "Vidzee",
  "Bludclart",
  "Main",
  "tmovie",
];

// ============================================
// Embed URL Generators
// ============================================

type EmbedTemplate = {
  movie: (id: number) => string;
  tv: (id: number, s: number, e: number) => string;
};

const embedTemplates: Record<ServerName, EmbedTemplate> = {
  VidsrcCC: {
    movie: (id) => `https://vidsrc.cc/v2/embed/movie/${id}`,
    tv: (id, s, e) => `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}`,
  },
  VidUp: {
    movie: (id) => `https://vidup.to/movie/${id}?autoPlay=true&theme=000000`,
    tv: (id, s, e) => `https://vidup.to/tv/${id}/${s}/${e}?autoPlay=true&theme=000000`,
  },
  NHDAPI: {
    movie: (id) => `https://nhdapi.xyz/movie/${id}`,
    tv: (id, s, e) => `https://nhdapi.xyz/tv/${id}/${s}/${e}`,
  },
  TurboVid: {
    movie: (id) => `https://uembed.xyz/?id=${id}&autoplay=true`,
    tv: (id, s, e) => `https://uembed.xyz/?id=${id}&season=${s}&episode=${e}&autoplay=true`,
  },
  Videasy: {
    movie: (id) =>
      `https://player.videasy.net/movie/${id}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6`,
    tv: (id, s, e) =>
      `https://player.videasy.net/tv/${id}/${s}/${e}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6`,
  },
  VidPlus: {
    movie: (id) => `https://player.vidplus.to/embed/movie/${id}?autoplay=true`,
    tv: (id, s, e) => `https://player.vidplus.to/embed/tv/${id}/${s}/${e}?autoplay=true`,
  },
  RiveStream: {
    movie: (id) => `https://rivestream.net/embed?type=movie&id=${id}`,
    tv: (id, s, e) => `https://rivestream.net/embed?type=tv&id=${id}&season=${s}&episode=${e}`,
  },
  AutoEmbed: {
    movie: (id) => `https://player.autoembed.cc/embed/movie/${id}`,
    tv: (id, s, e) => `https://player.autoembed.cc/embed/tv/${id}/${s}/${e}`,
  },
  "111Movies": {
    movie: (id) => `https://111movies.com/movie/${id}`,
    tv: (id, s, e) => `https://111movies.com/tv/${id}/${s}/${e}`,
  },
  Vidify: {
    movie: (id) => `https://player.vidify.top/embed/movie/${id}?server=meta`,
    tv: (id, s, e) => `https://player.vidify.top/embed/tv/${id}/${s}/${e}?server=meta`,
  },
  VidAPI: {
    movie: (id) => `https://vidapi.xyz/embed/movie/${id}`,
    tv: (id, s, e) => `https://vidapi.xyz/embed/tv/${id}&s=${s}&e=${e}`,
  },
  "2Embed": {
    movie: (id) => `https://www.2embed.cc/embed/${id}`,
    tv: (id, s, e) => `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`,
  },
  Vidrock: {
    movie: (id) => `https://vidrock.net/movie/${id}`,
    tv: (id, s, e) => `https://vidrock.net/tv/${id}/${s}/${e}`,
  },
  VidFast: {
    movie: (id) => `https://vidfast.pro/movie/${id}?autoPlay=true&theme=2392EE&poster=false`,
    tv: (id, s, e) => `https://vidfast.pro/tv/${id}/${s}/${e}?autoPlay=true&theme=2392EE&poster=false`,
  },
  VidsrcXYZ: {
    movie: (id) => `https://vidsrc.xyz/embed/movie?tmdb=${id}`,
    tv: (id, s, e) => `https://vidsrc.xyz/embed/tv/${id}/${s}-${e}`,
  },
  VidLink: {
    movie: (id) =>
      `https://vidlink.pro/movie/${id}?primaryColor=FFFFFF&secondaryColor=2392EE&title=true&poster=false&autoplay=false`,
    tv: (id, s, e) =>
      `https://vidlink.pro/tv/${id}/${s}/${e}?primaryColor=2392EE&secondaryColor=FFFFFF&title=true&poster=false&autoplay=false&nextbutton=true`,
  },
  VidsrcSU: {
    movie: (id) => `https://vidsrc.su/movie/${id}?autoplay=true`,
    tv: (id, s, e) => `https://vidsrc.su/tv/${id}/${s}/${e}?autoplay=true`,
  },
  EmbedSU: {
    movie: (id) => `https://embed.su/embed/movie/${id}`,
    tv: (id, s, e) => `https://embed.su/embed/tv/${id}/${s}/${e}`,
  },
  Resident: {
    movie: (id) => `/e/fox/${id}`,
    tv: (id, s, e) => `/e/fox/${id}/${s}/${e}`,
  },
  Vidzee: {
    movie: (id) => `https://player.vidzee.wtf/embed/movie/${id}`,
    tv: (id, s, e) => `https://player.vidzee.wtf/embed/tv/${id}/${s}/${e}`,
  },
  Bludclart: {
    movie: (id) => `https://watch.bludclart.com/movie/${id}/watch`,
    tv: (id, s, e) => `https://watch.bludclart.com/tv/${id}/watch?season=${s}&episode=${e}`,
  },
  Main: {
    // Main uses internal HLS API
    movie: (id) => `${BASE_URL}/api/streams/movie/${id}`,
    tv: (id, s, e) => `${BASE_URL}/api/streams/series/${id}?season=${s}&episode=${e}`,
  },
  tmovie: {
    movie: (id) => `https://hls.tanime.tv/api/movie/${id}`,
    tv: (id, s, e) => `https://hls.tanime.tv/api/tv/${id}/${s}/${e}`,
  },
};

/**
 * Get embed URL for a movie
 */
export function getMovieEmbedUrl(tmdbId: number, server: ServerName = "VidsrcCC"): string {
  return embedTemplates[server].movie(tmdbId);
}

/**
 * Get embed URL for a TV episode
 */
export function getTVEmbedUrl(
  tmdbId: number,
  season: number,
  episode: number,
  server: ServerName = "VidsrcCC"
): string {
  return embedTemplates[server].tv(tmdbId, season, episode);
}

/**
 * Get all available embed URLs for a movie
 */
export function getAllMovieEmbedUrls(tmdbId: number): Record<ServerName, string> {
  const urls: Partial<Record<ServerName, string>> = {};
  for (const server of allServers) {
    urls[server] = embedTemplates[server].movie(tmdbId);
  }
  return urls as Record<ServerName, string>;
}

/**
 * Get all available embed URLs for a TV episode
 */
export function getAllTVEmbedUrls(
  tmdbId: number,
  season: number,
  episode: number
): Record<ServerName, string> {
  const urls: Partial<Record<ServerName, string>> = {};
  for (const server of allServers) {
    urls[server] = embedTemplates[server].tv(tmdbId, season, episode);
  }
  return urls as Record<ServerName, string>;
}

/**
 * Get anime embed URL (uses Anilist ID)
 */
export function getAnimeEmbedUrl(
  anilistId: number,
  episode: number,
  isDub: boolean = false,
  server: "VidsrcCC" | "VidPlus" = "VidsrcCC"
): string {
  if (server === "VidsrcCC") {
    const type = isDub ? "dub" : "sub";
    return `https://vidsrc.cc/v2/embed/anime/${anilistId}/${episode}/${type}?autoPlay=true&autoSkipIntro=true`;
  }
  return `https://player.vidplus.to/embed/anime/${anilistId}/${episode}?dub=${isDub}`;
}

// ============================================
// API Client
// ============================================

/**
 * Fetch movie details from tmovie.tv TMDB proxy
 */
export async function fetchMovieDetails(tmdbId: number): Promise<Movie> {
  const url = `${BASE_URL}/api/tmdb/movie/${tmdbId}?language=en-US&append_to_response=images,content_ratings,release_dates,videos,credits&include_image_language=en`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie ${tmdbId}: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch TV show details from tmovie.tv TMDB proxy
 */
export async function fetchTVDetails(tmdbId: number): Promise<TVShow> {
  const url = `${BASE_URL}/api/tmdb/tv/${tmdbId}?language=en-US&append_to_response=images,content_ratings,release_dates,videos,credits&include_image_language=en`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch TV show ${tmdbId}: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch HLS movie streams (used by "Main" server)
 * Note: This endpoint may require authentication or specific headers
 */
export async function fetchMovieStreams(tmdbId: number): Promise<StreamResponse> {
  const url = `${BASE_URL}/api/streams/movie/${tmdbId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch streams for movie ${tmdbId}: ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch HLS TV episode streams (used by "Main" server)
 * Note: This endpoint may require authentication or specific headers
 */
export async function fetchTVStreams(
  tmdbId: number,
  season: number,
  episode: number
): Promise<StreamResponse> {
  const url = `${BASE_URL}/api/streams/series/${tmdbId}?season=${season}&episode=${episode}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch streams for TV ${tmdbId} S${season}E${episode}: ${response.status}`);
  }
  return response.json();
}

// ============================================
// URL Utilities
// ============================================

/**
 * Generate slug from title and TMDB ID
 */
export function generateSlug(title: string, tmdbId: number): string {
  const slugifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${slugifiedTitle}-${tmdbId}`;
}

/**
 * Get tmovie.tv movie detail page URL
 * Note: This is where the modal player opens from
 */
export function getMovieDetailUrl(title: string, tmdbId: number): string {
  return `${BASE_URL}/movie/${generateSlug(title, tmdbId)}`;
}

/**
 * Get tmovie.tv TV show detail page URL
 * Note: This is where the modal player opens from
 */
export function getTVDetailUrl(title: string, tmdbId: number): string {
  return `${BASE_URL}/tv/${generateSlug(title, tmdbId)}`;
}

// ============================================
// Demo / Test
// ============================================

async function demo() {
  console.log("tmovie.tv Streaming API Demo\n");
  console.log("=".repeat(60));

  // Example: The Matrix (TMDB ID: 603)
  const matrixId = 603;

  console.log("\n1. Movie Embed URLs for The Matrix (all 23 servers):");
  console.log("-".repeat(60));
  for (const server of allServers) {
    const url = getMovieEmbedUrl(matrixId, server);
    const displayName = serverDisplayNames[server];
    const ads = serverHasAds[server] ? "ADS" : "NO ADS";
    const quality = serverHas4K[server] ? "4K" : "";
    console.log(`${displayName.padEnd(15)} [${ads}${quality ? " " + quality : ""}]: ${url}`);
  }

  // Example: Fallout S01E01 (TMDB ID: 106379)
  const falloutId = 106379;

  console.log("\n2. TV Embed URLs for Fallout S01E01 (top 5 servers):");
  console.log("-".repeat(60));
  for (const server of allServers.slice(0, 5)) {
    console.log(`${server}: ${getTVEmbedUrl(falloutId, 1, 1, server)}`);
  }

  console.log("\n3. tmovie.tv Detail Page URLs:");
  console.log("-".repeat(60));
  console.log(`Movie Detail: ${getMovieDetailUrl("The Matrix", matrixId)}`);
  console.log(`TV Detail:    ${getTVDetailUrl("Fallout", falloutId)}`);

  console.log("\n4. Anime Embed URLs (Anilist ID: 21 - One Punch Man):");
  console.log("-".repeat(60));
  console.log(`Sub: ${getAnimeEmbedUrl(21, 1, false, "VidsrcCC")}`);
  console.log(`Dub: ${getAnimeEmbedUrl(21, 1, true, "VidsrcCC")}`);

  // Fetch actual API data
  console.log("\n5. API Data (fetching...):");
  console.log("-".repeat(60));

  try {
    const movieData = await fetchMovieDetails(matrixId);
    console.log(`Movie: ${movieData.title} (${movieData.release_date?.slice(0, 4)})`);
    console.log(`Rating: ${movieData.vote_average}/10`);
    console.log(`Runtime: ${movieData.runtime} min`);
  } catch (e) {
    console.log(`Could not fetch movie data: ${(e as Error).message}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("Demo complete! See TMOVIE_STRUCTURE.md for full documentation.");
  console.log(`Total servers: ${allServers.length}`);
  console.log(`No-ads servers: ${allServers.filter((s) => !serverHasAds[s]).length}`);
  console.log(`4K servers: ${allServers.filter((s) => serverHas4K[s]).length}`);
}

// Run demo if executed directly
demo();
