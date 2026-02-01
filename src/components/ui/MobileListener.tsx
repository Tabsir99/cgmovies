"use client";
import { useUIStore } from "@/store/uiStore";
import { useEffect } from "react";

export function MobileListener() {
  useEffect(() => {
    const updateMobileState = () => {
      const narrowViewport = window.matchMedia("(max-width: 768px)").matches;
      const touchDevice = window.matchMedia("(pointer: coarse)").matches;
      const isMobile = narrowViewport || touchDevice;
      useUIStore.setState({ isMobile });
    };

    updateMobileState();

    const mediaQuery = window.matchMedia(
      "(max-width: 768px), (pointer: coarse)",
    );
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  return null;
}
