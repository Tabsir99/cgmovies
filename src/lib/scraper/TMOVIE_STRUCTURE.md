# tmovie.tv Site Structure Documentation

## Base Information

| Property | Value |
|----------|-------|
| Base URL | `https://tmovie.tv` |
| Framework | React (Vite SPA) |
| Metadata Source | TMDB API (proxied) |
| Analytics | Google Analytics (G-743D99YX8D) |
| CDN | Cloudflare |

---

## URL Structure

### Movies

| Type | Pattern | Example |
|------|---------|---------|
| Browse All | `/movie` | `https://tmovie.tv/movie` |
| Detail Page | `/movie/{slug}-{tmdb_id}` | `/movie/the-matrix-603` |
| Genre Discover | `/discover/movie?genre={id}` | `/discover/movie?genre=28` |

### TV Shows

| Type | Pattern | Example |
|------|---------|---------|
| Browse All | `/tv-show` | `https://tmovie.tv/tv-show` |
| Detail Page | `/tv/{slug}-{tmdb_id}` | `/tv/fallout-106379` |
| Season View | `/tv/{slug}-{tmdb_id}/season/{n}` | `/tv/fallout-106379/season/1` |

### Anime

| Type | Pattern | Example |
|------|---------|---------|
| Browse All | `/anime` | `https://tmovie.tv/anime` |
| Detail Page | `/anime/{slug}-{id}` | `/anime/one-punch-man-21` |

### Other Routes

| Type | Pattern |
|------|---------|
| Search | `/search?q={query}` |
| Person | `/person/{tmdb_person_id}` |
| Genre Browse | `/genre/{genre_slug}` |
| Collections | `/list/{collection_id}` |
| Watchlist | `/watchlist` |

---

## Slug Format

| Component | Description |
|-----------|-------------|
| Pattern | `{title-kebab-case}-{tmdb_id}` |
| Title | Lowercased, spaces replaced with hyphens, special chars removed |
| TMDB ID | Appended at end, matches TheMovieDB.org IDs |

### Examples

| Title | TMDB ID | Slug |
|-------|---------|------|
| The Matrix | 603 | `the-matrix-603` |
| Fallout | 106379 | `fallout-106379` |
| Breaking Bad | 1396 | `breaking-bad-1396` |

---

## Video Player

**Important**: tmovie.tv uses a **modal-based player**, NOT separate watch pages.

- There are NO `/watch-movie/` or `/watch-tv/` routes
- Player opens as a modal overlay on the detail page
- User selects a server from dropdown/tabs
- Embed URL is constructed client-side and loaded into iframe

---

## Backend API Structure

### TMDB Proxy API

| Endpoint | Description |
|----------|-------------|
| `/api/tmdb/movie/{tmdb_id}` | Get movie details |
| `/api/tmdb/movie/{tmdb_id}/recommendations` | Get movie recommendations |
| `/api/tmdb/tv/{tmdb_id}` | Get TV show details |
| `/api/tmdb/trending/movie/week` | Trending movies |
| `/api/tmdb/trending/tv/week` | Trending TV shows |
| `/api/tmdb/movie/popular` | Popular movies |
| `/api/tmdb/movie/top_rated` | Top rated movies |
| `/api/tmdb/movie/upcoming` | Upcoming movies |
| `/api/tmdb/movie/now_playing` | Now playing movies |
| `/api/tmdb/tv/popular` | Popular TV shows |
| `/api/tmdb/tv/top_rated` | Top rated TV shows |
| `/api/tmdb/discover/movie` | Discover movies by filters |

**Query Parameters:**
- `language=en-US`
- `append_to_response=images,content_ratings,release_dates,videos,credits`
- `include_image_language=en`
- `page=1` (for paginated endpoints)
- `with_genres={genre_id}` (for discover)

### Streaming API (for "Main" server only)

| Endpoint | Description |
|----------|-------------|
| `/api/streams/movie/{tmdb_id}` | Get HLS movie streams |
| `/api/streams/series/{tmdb_id}?season={n}&episode={e}` | Get HLS TV episode streams |

**Response Format:**
```json
{
  "success": true,
  "streams": [
    { "url": "https://queenselti.me/..." }
  ]
}
```

**Note**: These endpoints are ONLY used by the "Main" server. All other servers construct embed URLs client-side.

### Internal Proxy (for "Resident" server)

| Endpoint | Description |
|----------|-------------|
| `/e/fox/{tmdb_id}` | Movie proxy |
| `/e/fox/{tmdb_id}/{season}/{episode}` | TV episode proxy |

### External APIs Used

| Endpoint | Purpose |
|----------|---------|
| `https://backend.xprime.tv/primenet` | Alternative stream source |
| `https://api.zenime.site/api/stream` | Anime streaming |
| `https://yts.mx/api/v2/movie_details.json` | Torrent info |
| `https://torrentio.strem.fun/...` | Torrent streams |

---

## Streaming Infrastructure

### How Streaming Links Are Provided

1. **User clicks "Play"** on detail page
2. **Modal opens** with video player
3. **Frontend selects default server** ("VidsrcCC")
4. **Embed URL is constructed client-side** using TMDB ID + server template
5. **Embed URL is loaded into iframe**
6. **Each embed provider** handles actual video delivery

### Server Selection

- 23 servers available in dropdown
- Default server: "VidsrcCC"
- Server list defined in JS bundle
- Custom display names: "1 Vanilla", "2 Lora", "3 Mend", etc.

---

## Available Streaming Servers (23 Sources)

| # | Server Name | Display Name | Has Ads | Has 4K |
|---|-------------|--------------|---------|--------|
| 1 | VidsrcCC | Vanilla | No | No |
| 2 | VidUp | Lora | Yes | No |
| 3 | NHDAPI | Mend | No | No |
| 4 | TurboVid | Felix | No | No |
| 5 | Videasy | Vars | No | Yes |
| 6 | VidPlus | Swift | Yes | No |
| 7 | RiveStream | Quazar | No | No |
| 8 | AutoEmbed | Starlight | Yes | No |
| 9 | 111Movies | Gaze | Yes | No |
| 10 | Vidify | Florence | Yes | No |
| 11 | VidAPI | Deez | Yes | No |
| 12 | 2Embed | Titan | Yes | No |
| 13 | Vidrock | Zix | Yes | No |
| 14 | VidFast | Delta | Yes | Yes |
| 15 | VidsrcXYZ | Bravo | Yes | No |
| 16 | VidLink | Myth | Yes | No |
| 17 | VidsrcSU | Asuka | Yes | No |
| 18 | EmbedSU | Susanoo | Yes | No |
| 19 | Resident | Glose | No | No |
| 20 | Vidzee | Bob Johns | No | No |
| 21 | Bludclart | Rox | No | No |
| 22 | Main | Icey | No | No |
| 23 | tmovie | Boxed | No | No |

---

## Server URL Templates

### Movies

| Server | URL Template |
|--------|--------------|
| VidsrcCC | `https://vidsrc.cc/v2/embed/movie/{id}` |
| VidUp | `https://vidup.to/movie/{id}?autoPlay=true&theme=000000` |
| NHDAPI | `https://nhdapi.xyz/movie/{id}` |
| TurboVid | `https://uembed.xyz/?id={id}&autoplay=true` |
| Videasy | `https://player.videasy.net/movie/{id}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6` |
| VidPlus | `https://player.vidplus.to/embed/movie/{id}?autoplay=true` |
| RiveStream | `https://rivestream.net/embed?type=movie&id={id}` |
| AutoEmbed | `https://player.autoembed.cc/embed/movie/{id}` |
| 111Movies | `https://111movies.com/movie/{id}` |
| Vidify | `https://player.vidify.top/embed/movie/{id}?server=meta` |
| VidAPI | `https://vidapi.xyz/embed/movie/{id}` |
| 2Embed | `https://www.2embed.cc/embed/{id}` |
| Vidrock | `https://vidrock.net/movie/{id}` |
| VidFast | `https://vidfast.pro/movie/{id}?autoPlay=true&theme=2392EE&poster=false` |
| VidsrcXYZ | `https://vidsrc.xyz/embed/movie?tmdb={id}` |
| VidLink | `https://vidlink.pro/movie/{id}?primaryColor=FFFFFF&secondaryColor=2392EE&title=true&poster=false&autoplay=false` |
| VidsrcSU | `https://vidsrc.su/movie/{id}?autoplay=true` |
| EmbedSU | `https://embed.su/embed/movie/{id}` |
| Resident | `/e/fox/{id}` (internal proxy) |
| Vidzee | `https://player.vidzee.wtf/embed/movie/{id}` |
| Bludclart | `https://watch.bludclart.com/movie/{id}/watch` |
| Main | Uses `/api/streams/movie/{id}` (HLS native player) |
| tmovie | `https://hls.tanime.tv/api/movie/{id}` |

### TV Shows

| Server | URL Template |
|--------|--------------|
| VidsrcCC | `https://vidsrc.cc/v2/embed/tv/{id}/{season}/{episode}` |
| VidUp | `https://vidup.to/tv/{id}/{season}/{episode}?autoPlay=true&theme=000000` |
| NHDAPI | `https://nhdapi.xyz/tv/{id}/{season}/{episode}` |
| TurboVid | `https://uembed.xyz/?id={id}&season={season}&episode={episode}&autoplay=true` |
| Videasy | `https://player.videasy.net/tv/{id}/{season}/{episode}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6` |
| VidPlus | `https://player.vidplus.to/embed/tv/{id}/{season}/{episode}?autoplay=true` |
| RiveStream | `https://rivestream.net/embed?type=tv&id={id}&season={season}&episode={episode}` |
| AutoEmbed | `https://player.autoembed.cc/embed/tv/{id}/{season}/{episode}` |
| 111Movies | `https://111movies.com/tv/{id}/{season}/{episode}` |
| Vidify | `https://player.vidify.top/embed/tv/{id}/{season}/{episode}?server=meta` |
| VidAPI | `https://vidapi.xyz/embed/tv/{id}&s={season}&e={episode}` |
| 2Embed | `https://www.2embed.cc/embedtv/{id}&s={season}&e={episode}` |
| Vidrock | `https://vidrock.net/tv/{id}/{season}/{episode}` |
| VidFast | `https://vidfast.pro/tv/{id}/{season}/{episode}?autoPlay=true&theme=2392EE&poster=false` |
| VidsrcXYZ | `https://vidsrc.xyz/embed/tv/{id}/{season}-{episode}` |
| VidLink | `https://vidlink.pro/tv/{id}/{season}/{episode}?primaryColor=2392EE&secondaryColor=FFFFFF&title=true&poster=false&autoplay=false&nextbutton=true` |
| VidsrcSU | `https://vidsrc.su/tv/{id}/{season}/{episode}?autoplay=true` |
| EmbedSU | `https://embed.su/embed/tv/{id}/{season}/{episode}` |
| Resident | `/e/fox/{id}/{season}/{episode}` (internal proxy) |
| Vidzee | `https://player.vidzee.wtf/embed/tv/{id}/{season}/{episode}` |
| Bludclart | `https://watch.bludclart.com/tv/{id}/watch?season={season}&episode={episode}` |
| Main | Uses `/api/streams/series/{id}?season={season}&episode={episode}` (HLS native player) |
| tmovie | `https://hls.tanime.tv/api/tv/{id}/{season}/{episode}` |

---

## Anime Servers (using Anilist ID)

| Server | Sub URL | Dub URL |
|--------|---------|---------|
| VidsrcCC | `https://vidsrc.cc/v2/embed/anime/{anilist_id}/{episode}/sub?autoPlay=true&autoSkipIntro=true` | `https://vidsrc.cc/v2/embed/anime/{anilist_id}/{episode}/dub?autoPlay=true&autoSkipIntro=true` |
| VidPlus | `https://player.vidplus.to/embed/anime/{anilist_id}/{episode}?dub=false` | `https://player.vidplus.to/embed/anime/{anilist_id}/{episode}?dub=true` |

---

## Technical Notes

### Scraping Requirements

- Site is a Vite React SPA (NOT Next.js)
- Requires JavaScript rendering (not static HTML)
- Use Playwright/headless browser for scraping
- `domcontentloaded` event + 5-8s delay recommended
- Main JS bundle: `/assets/index-{hash}.js`

### Bot Detection

- Site uses Cloudflare protection
- Add stealth settings to avoid bot detection
- Set `navigator.webdriver = undefined`
- Use realistic user agent strings

### Configuration (from JS bundle)

```javascript
const config = {
  proxy: "/proxy",
  m3u8proxy: "/m3u8proxy",
  tmdbBaseUrl: "/api/tmdb",
  tmdbImageBaseUrl: "https://image.tmdb.org/t/p/",
};
```

---

## Example API Responses

### Movie Details (`/api/tmdb/movie/603`)

```json
{
  "adult": false,
  "backdrop_path": "/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg",
  "id": 603,
  "imdb_id": "tt0133093",
  "original_title": "The Matrix",
  "genres": [
    {"id": 28, "name": "Action"},
    {"id": 878, "name": "Science Fiction"}
  ],
  "runtime": 136,
  "vote_average": 8.2
}
```

---

## Quick Reference

### Get Movie Stream

1. Get TMDB ID for movie (e.g., 603 for The Matrix)
2. Fetch metadata: `GET /api/tmdb/movie/603`
3. Construct embed URL: `https://vidsrc.cc/v2/embed/movie/603`
4. Load in iframe

### Get TV Episode Stream

1. Get TMDB ID for show (e.g., 106379 for Fallout)
2. Fetch metadata: `GET /api/tmdb/tv/106379`
3. Construct embed URL: `https://vidsrc.cc/v2/embed/tv/106379/1/1`
4. Load in iframe
