import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "CGMovies - Stream Movies, TV Shows & Anime Free",
    description:
      "Watch unlimited movies, TV shows, and anime for free. Stream the latest releases and classic favorites in HD quality.",
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
        {children}
      </body>
    </html>
  );
}
