"use client";

import { create } from "zustand";
import { ServerName } from "@/lib/embed";

export type MediaType = "movie" | "tv";

export interface PlayerState {
  // Modal state
  isOpen: boolean;

  // Media info
  mediaType: MediaType | null;
  tmdbId: number | null;
  title: string;

  // TV show specific
  season: number;
  episode: number;
  totalEpisodes: number;
  totalSeasons: number;

  // Player settings
  selectedServer: ServerName;

  // Actions
  openMovie: (tmdbId: number, title: string) => void;
  openTVShow: (
    tmdbId: number,
    title: string,
    season: number,
    episode: number,
    totalEpisodes?: number,
    totalSeasons?: number,
  ) => void;
  close: () => void;
  setServer: (server: ServerName) => void;
  setSeason: (season: number) => void;
  setEpisode: (season: number, episode: number) => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  // Initial state
  isOpen: false,
  mediaType: null,
  tmdbId: null,
  title: "",
  season: 1,
  episode: 1,
  totalEpisodes: 1,
  totalSeasons: 1,
  selectedServer: "VidsrcCC",

  // Actions
  openMovie: (tmdbId, title) => {
    set({
      isOpen: true,
      mediaType: "movie",
      tmdbId,
      title,
      season: 1,
      episode: 1,
      totalEpisodes: 1,
      totalSeasons: 1,
    });
  },

  openTVShow: (
    tmdbId,
    title,
    season,
    episode,
    totalEpisodes = 1,
    totalSeasons = 1,
  ) => {
    set({
      isOpen: true,
      mediaType: "tv",
      tmdbId,
      title,
      season,
      episode,
      totalEpisodes,
      totalSeasons,
    });
  },

  close: () => {
    set({
      isOpen: false,
      mediaType: null,
      tmdbId: null,
      title: "",
    });
  },

  setServer: (server) => {
    set({ selectedServer: server });
  },

  setSeason: (season) => {
    set({ season, episode: 1 });
  },

  setEpisode: (season, episode) => {
    set({ season, episode });
  },

  nextEpisode: () => {
    const { episode, totalEpisodes, season, totalSeasons } = get();
    if (episode < totalEpisodes) {
      set({ episode: episode + 1 });
    } else if (season < totalSeasons) {
      // Go to next season, episode 1
      set({ season: season + 1, episode: 1 });
    }
  },

  previousEpisode: () => {
    const { episode, season } = get();
    if (episode > 1) {
      set({ episode: episode - 1 });
    } else if (season > 1) {
      // Go to previous season, episode 1
      set({ season: season - 1, episode: 1 });
    }
  },
}));
