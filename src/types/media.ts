export interface Genre {
  id: number;
  name: string;
}

export interface BaseMediaItem {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  popularity: number;
  adult?: boolean;
  media_type?: "movie" | "tv";
}

export interface ReleaseDate {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type: number;
}

export interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ContentRating {
  iso_3166_1: string;
  rating: string;
}

export interface MovieDetails extends BaseMediaItem {
  media_type: "movie";
  runtime: number;
  genres: Genre[];
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  imdb_id: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos?: {
    results: Video[];
  };
  recommendations?: {
    results: BaseMediaItem[];
  };
  release_dates?: {
    results: ReleaseDatesResult[];
  };
}

export interface TVDetails extends BaseMediaItem {
  media_type: "tv";
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  status: string;
  tagline: string;
  episode_run_time: number[];
  created_by: { id: number; name: string }[];
  networks: { id: number; name: string; logo_path: string | null }[];
  seasons: Season[];
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos?: {
    results: Video[];
  };
  recommendations?: {
    results: BaseMediaItem[];
  };
  content_ratings?: {
    results: ContentRating[];
  };
}

export type MediaItem = MovieDetails | TVDetails;

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  air_date: string;
  runtime: number | null;
  vote_average: number;
}

export interface SeasonDetails extends Season {
  episodes: Episode[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
