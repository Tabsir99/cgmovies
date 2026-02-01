"use client";
import { useUIStore } from "@/store/uiStore";
import { useEffect } from "react";

export function MobileListener() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      useUIStore.setState({ isMobile: e.matches });
    };

    useUIStore.setState({ isMobile: mediaQuery.matches });

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
