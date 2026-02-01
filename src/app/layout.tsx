import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlayerModal } from "@/components/VideoPlayer/PlayerModal";
import "./globals.css";
import { MobileListener } from "@/components/ui/MobileListener";
import SearchModal from "@/components/SearchModal";
import { clientEnv } from "@/config/env.client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_APP_URL),
  title: {
    default: "CGMovies - Stream Movies, TV Shows & Anime Free",
    template: "%s | CGMovies",
  },
  description:
    "Watch unlimited movies, TV shows, and anime for free. Stream the latest releases and classic favorites in HD quality. No subscription required.",
  keywords: [
    "movies",
    "tv shows",
    "anime",
    "streaming",
    "watch free",
    "HD movies",
    "online streaming",
  ],
  authors: [{ name: "CGMovies" }],
  creator: "CGMovies",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CGMovies",
    title: "CGMovies - Stream Movies, TV Shows & Anime Free",
    description:
      "Watch unlimited movies, TV shows, and anime for free. Stream the latest releases and classic favorites in HD quality.",
    images: { url: "/hero.jpg" },
  },
  twitter: {
    card: "summary_large_image",
    title: "CGMovies - Stream Movies, TV Shows & Anime Free",
    description:
      "Watch unlimited movies, TV shows, and anime for free. Stream the latest releases and classic favorites in HD quality.",
    images: { url: "/hero.jpg" },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <PlayerModal />
        <MobileListener />
        <SearchModal />
      </body>
    </html>
  );
}
