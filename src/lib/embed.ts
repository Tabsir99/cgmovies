/**
 * Embed URL utilities for streaming providers
 *
 * This module provides utilities for generating embed URLs
 * for all 23 streaming providers.
 */

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
  VidsrcCC: "Vanilla",
  VidUp: "Lora",
  NHDAPI: "Mend",
  TurboVid: "Felix",
  Videasy: "Vars",
  VidPlus: "Swift",
  RiveStream: "Quazar",
  AutoEmbed: "Starlight",
  "111Movies": "Gaze",
  Vidify: "Florence",
  VidAPI: "Deez",
  "2Embed": "Titan",
  Vidrock: "Zix",
  VidFast: "Delta",
  VidsrcXYZ: "Bravo",
  VidLink: "Myth",
  VidsrcSU: "Asuka",
  EmbedSU: "Susanoo",
  Resident: "Glose",
  Vidzee: "Bob Johns",
  Bludclart: "Rox",
  Main: "Icey",
  tmovie: "Boxed",
};

/**
 * Server properties - whether server has ads
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

/**
 * Server properties - whether server has 4K support
 */
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

type EmbedTemplate = {
  movie: (id: number) => string;
  tv: (id: number, s: number, e: number) => string;
};

const BASE_URL = "https://tmovie.tv";

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
 * Get server info for display
 */
export function getServerInfo(server: ServerName) {
  return {
    name: serverDisplayNames[server],
    hasAds: serverHasAds[server],
    has4K: serverHas4K[server],
  };
}
