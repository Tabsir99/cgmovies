/**
 * Embed URL utilities for streaming providers
 */

export type ServerName =
  | "VidsrcCC"
  | "VidUp"
  | "Videasy"
  | "VidPlus"
  | "111Movies"
  | "Vidify"
  | "Vidrock"
  | "VidFast"
  | "VidsrcRu"
  | "VidLink"
  | "VidsrcSU"
  | "Vidzee";

type ServerConfig = {
  display: string;
  hasAds: boolean;
  has4K: boolean;
  movie: string;
  tv: string;
};

export const servers: Record<ServerName, ServerConfig> = {
  VidsrcCC: {
    display: "Vanilla",
    hasAds: false,
    has4K: false,
    movie: "https://vidsrc.cc/v3/embed/movie/{id}",
    tv: "https://vidsrc.cc/v3/embed/tv/{id}/{s}/{e}",
  },
  VidUp: {
    display: "Lora",
    hasAds: true,
    has4K: false,
    movie: "https://vidup.to/movie/{id}",
    tv: "https://vidup.to/tv/{id}/{s}/{e}",
  },

  Videasy: {
    display: "Vars",
    hasAds: false,
    has4K: true,
    movie: "https://player.videasy.net/movie/{id}",
    tv: "https://player.videasy.net/tv/{id}/{s}/{e}",
  },
  VidPlus: {
    display: "Swift",
    hasAds: true,
    has4K: false,
    movie: "https://player.vidplus.to/embed/movie/{id}",
    tv: "https://player.vidplus.to/embed/tv/{id}/{s}/{e}",
  },

  "111Movies": {
    display: "Gaze",
    hasAds: true,
    has4K: false,
    movie: "https://111movies.com/movie/{id}",
    tv: "https://111movies.com/tv/{id}/{s}/{e}",
  },
  Vidify: {
    display: "Florence",
    hasAds: true,
    has4K: false,
    movie: "https://player.vidify.top/embed/movie/{id}",
    tv: "https://player.vidify.top/embed/tv/{id}/{s}/{e}",
  },
  Vidrock: {
    display: "Zix",
    hasAds: true,
    has4K: false,
    movie: "https://vidrock.net/movie/{id}",
    tv: "https://vidrock.net/tv/{id}/{s}/{e}",
  },
  VidFast: {
    display: "Delta",
    hasAds: true,
    has4K: true,
    movie: "https://vidfast.pro/movie/{id}",
    tv: "https://vidfast.pro/tv/{id}/{s}/{e}",
  },
  VidsrcRu: {
    display: "Bravo",
    hasAds: true,
    has4K: false,
    movie: "https://vidsrc-embed.ru/embed/movie?tmdb={id}",
    tv: "https://vidsrc-embed.ru/embed/tv/{id}/{s}-{e}",
  },
  VidLink: {
    display: "Myth",
    hasAds: true,
    has4K: false,
    movie: "https://vidlink.pro/movie/{id}",
    tv: "https://vidlink.pro/tv/{id}/{s}/{e}",
  },
  VidsrcSU: {
    display: "Asuka",
    hasAds: true,
    has4K: false,
    movie: "https://vidsrc.su/movie/{id}",
    tv: "https://vidsrc.su/tv/{id}/{s}/{e}",
  },

  Vidzee: {
    display: "Bob Johns",
    hasAds: false,
    has4K: false,
    movie: "https://player.vidzee.wtf/embed/movie/{id}",
    tv: "https://player.vidzee.wtf/embed/tv/{id}/{s}/{e}",
  },
};

// URL builder
function buildUrl(
  template: string,
  id: number,
  s?: number,
  e?: number,
): string {
  return template
    .replace("{id}", String(id))
    .replace("{s}", String(s ?? ""))
    .replace("{e}", String(e ?? ""));
}

export function getMovieEmbedUrl(
  tmdbId: number,
  server: ServerName = "VidsrcCC",
): string {
  return buildUrl(servers[server].movie, tmdbId);
}

export function getTVEmbedUrl(
  tmdbId: number,
  season: number,
  episode: number,
  server: ServerName = "VidsrcCC",
): string {
  return buildUrl(servers[server].tv, tmdbId, season, episode);
}

// Bonus: direct access to config if needed
export function getServerConfig(server: ServerName): ServerConfig {
  return servers[server];
}
