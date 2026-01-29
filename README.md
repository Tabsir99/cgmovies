# CGMovies - Modern Streaming Website

A modern, cinematic streaming website built with Next.js 16, featuring movies, TV shows, and anime. Features a playful yet sophisticated design with smooth animations and delightful interactions.

## Features

- **Hero Banner Carousel** - Auto-rotating featured content with smooth transitions
- **Content Rows** - Horizontally scrollable media cards with hover effects
- **Responsive Design** - Mobile-first, works on all screen sizes
- **Cinematic Dark Theme** - Premium visual design with gradient accents
- **Loading Skeletons** - Smooth shimmer animations during data fetching
- **TMDB Integration** - Real-time movie and TV data from The Movie Database

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **API**: TMDB (The Movie Database)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### TMDB API Key Setup

1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Go to Settings > API and request an API key
3. Copy your API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cgmovies
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & theme
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Homepage
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── HeroBanner.tsx   # Hero carousel
│   ├── ContentRow.tsx   # Horizontal scroll row
│   └── MediaCard.tsx    # Individual media card
└── lib/
    └── tmdb.ts          # TMDB API utilities & types
```

## Design System

### Colors
- **Background**: `#0a0a0f` (Deep dark)
- **Card**: `#141419` (Elevated surface)
- **Accent**: `#6366f1` (Indigo)
- **Gradient**: Indigo to Purple

### Animations
- Card lift on hover with glow effect
- Shimmer loading skeletons
- Fade-in and slide-up entrance animations
- Smooth carousel transitions

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Coming Soon

- Movie/TV detail pages with modal player
- Search functionality
- Genre filtering
- 23 streaming embed providers
- Watchlist (localStorage)

## Credits

- Data provided by [TMDB](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)

## License

MIT
