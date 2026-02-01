# CGMovies

A modern streaming platform built with Next.js 16, featuring movies, TV shows, and anime.

## Features

- **Hero Banner** - Featured content carousel with auto-rotation
- **Browse Pages** - Dedicated pages for Movies, TV Shows, and Anime
- **Detail Pages** - Full media info with cast, trailers, and recommendations
- **Video Player** - Modal player with multiple streaming providers
- **Episode Browser** - Season and episode selection for TV shows
- **Search** - Live search with instant results
- **Responsive** - Works seamlessly on desktop and mobile

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **API**: TMDB

## Getting Started

### Prerequisites

- Node.js 18+
- TMDB API key

### Setup

1. Clone and install:
```bash
git clone <your-repo-url>
cd cgmovies
npm install
```

2. Create `.env.local`:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
```

3. Run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── [type]/[slug]/    # Dynamic detail pages
│   ├── anime/            # Anime section
│   ├── movie/            # Movies browse
│   ├── tv/               # TV shows browse
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # Base UI components
│   ├── VideoPlayer/      # Player modal & controls
│   ├── SearchModal.tsx   # Search interface
│   ├── HeroBanner.tsx    # Hero carousel
│   ├── ContentRow.tsx    # Media row
│   └── MediaCard.tsx     # Media card
├── lib/
│   ├── tmdb.ts           # TMDB API
│   ├── embed.ts          # Streaming providers
│   └── constant.ts       # App constants
├── store/
│   ├── playerStore.ts    # Player state
│   └── uiStore.ts        # UI state
└── types/
    └── media.ts          # Type definitions
```

## Scripts

```bash
npm run dev     # Development
npm run build   # Production build
npm run start   # Production server
npm run lint    # Lint check
```

## Credits

- Data: [TMDB](https://www.themoviedb.org/)
- Icons: [Lucide](https://lucide.dev/)

## License

MIT
