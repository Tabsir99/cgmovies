"use client";
import { usePlayerStore } from "@/store/playerStore";
import { useEffect } from "react";

export function MobileListener() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      usePlayerStore.setState({ isMobile: e.matches });
    };

    usePlayerStore.setState({ isMobile: mediaQuery.matches });

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
