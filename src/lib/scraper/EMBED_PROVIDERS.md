# Embed Provider Reference

Complete reference for all 23 streaming embed providers used by tmovie.tv.

## URL Variable Legend

| Variable | Description | Example |
|----------|-------------|---------|
| `{id}` | TMDB Movie/TV ID | `603` (The Matrix) |
| `{season}` | Season number | `1` |
| `{episode}` | Episode number | `1` |
| `{anilist_id}` | Anilist anime ID | `21` (One Punch Man) |

---

## Server List (23 servers in order)

```javascript
const servers = [
  "VidsrcCC",   // 1 Vanilla
  "VidUp",      // 2 Lora
  "NHDAPI",     // 3 Mend
  "TurboVid",   // 4 Felix
  "Videasy",    // 5 Vars
  "VidPlus",    // 6 Swift
  "RiveStream", // 7 Quazar
  "AutoEmbed",  // 8 Starlight
  "111Movies",  // 9 Gaze
  "Vidify",     // 10 Florence
  "VidAPI",     // 11 Deez
  "2Embed",     // 12 Titan
  "Vidrock",    // 13 Zix
  "VidFast",    // 14 Delta
  "VidsrcXYZ",  // 15 Bravo
  "VidLink",    // 16 Myth
  "VidsrcSU",   // 17 Asuka
  "EmbedSU",    // 18 Susanoo
  "Resident",   // 19 Glose
  "Vidzee",     // 20 Bob Johns
  "Bludclart",  // 21 Rox
  "Main",       // 22 Icey
  "tmovie"      // 23 Boxed
];
```

---

## Movie Embed URLs (All 23 Servers)

| # | Server | URL Template |
|---|--------|--------------|
| 1 | VidsrcCC | `https://vidsrc.cc/v2/embed/movie/{id}` |
| 2 | VidUp | `https://vidup.to/movie/{id}?autoPlay=true&theme=000000` |
| 3 | NHDAPI | `https://nhdapi.xyz/movie/{id}` |
| 4 | TurboVid | `https://uembed.xyz/?id={id}&autoplay=true` |
| 5 | Videasy | `https://player.videasy.net/movie/{id}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6` |
| 6 | VidPlus | `https://player.vidplus.to/embed/movie/{id}?autoplay=true` |
| 7 | RiveStream | `https://rivestream.net/embed?type=movie&id={id}` |
| 8 | AutoEmbed | `https://player.autoembed.cc/embed/movie/{id}` |
| 9 | 111Movies | `https://111movies.com/movie/{id}` |
| 10 | Vidify | `https://player.vidify.top/embed/movie/{id}?server=meta` |
| 11 | VidAPI | `https://vidapi.xyz/embed/movie/{id}` |
| 12 | 2Embed | `https://www.2embed.cc/embed/{id}` |
| 13 | Vidrock | `https://vidrock.net/movie/{id}` |
| 14 | VidFast | `https://vidfast.pro/movie/{id}?autoPlay=true&theme=2392EE&poster=false` |
| 15 | VidsrcXYZ | `https://vidsrc.xyz/embed/movie?tmdb={id}` |
| 16 | VidLink | `https://vidlink.pro/movie/{id}?primaryColor=FFFFFF&secondaryColor=2392EE&title=true&poster=false&autoplay=false` |
| 17 | VidsrcSU | `https://vidsrc.su/movie/{id}?autoplay=true` |
| 18 | EmbedSU | `https://embed.su/embed/movie/{id}` |
| 19 | Resident | `/e/fox/{id}` (internal proxy) |
| 20 | Vidzee | `https://player.vidzee.wtf/embed/movie/{id}` |
| 21 | Bludclart | `https://watch.bludclart.com/movie/{id}/watch` |
| 22 | Main | `/api/streams/movie/{id}` (HLS native player) |
| 23 | tmovie | `https://hls.tanime.tv/api/movie/{id}` |

---

## TV Show Embed URLs (All 23 Servers)

| # | Server | URL Template |
|---|--------|--------------|
| 1 | VidsrcCC | `https://vidsrc.cc/v2/embed/tv/{id}/{season}/{episode}` |
| 2 | VidUp | `https://vidup.to/tv/{id}/{season}/{episode}?autoPlay=true&theme=000000` |
| 3 | NHDAPI | `https://nhdapi.xyz/tv/{id}/{season}/{episode}` |
| 4 | TurboVid | `https://uembed.xyz/?id={id}&season={season}&episode={episode}&autoplay=true` |
| 5 | Videasy | `https://player.videasy.net/tv/{id}/{season}/{episode}?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6` |
| 6 | VidPlus | `https://player.vidplus.to/embed/tv/{id}/{season}/{episode}?autoplay=true` |
| 7 | RiveStream | `https://rivestream.net/embed?type=tv&id={id}&season={season}&episode={episode}` |
| 8 | AutoEmbed | `https://player.autoembed.cc/embed/tv/{id}/{season}/{episode}` |
| 9 | 111Movies | `https://111movies.com/tv/{id}/{season}/{episode}` |
| 10 | Vidify | `https://player.vidify.top/embed/tv/{id}/{season}/{episode}?server=meta` |
| 11 | VidAPI | `https://vidapi.xyz/embed/tv/{id}&s={season}&e={episode}` |
| 12 | 2Embed | `https://www.2embed.cc/embedtv/{id}&s={season}&e={episode}` |
| 13 | Vidrock | `https://vidrock.net/tv/{id}/{season}/{episode}` |
| 14 | VidFast | `https://vidfast.pro/tv/{id}/{season}/{episode}?autoPlay=true&theme=2392EE&poster=false` |
| 15 | VidsrcXYZ | `https://vidsrc.xyz/embed/tv/{id}/{season}-{episode}` |
| 16 | VidLink | `https://vidlink.pro/tv/{id}/{season}/{episode}?primaryColor=2392EE&secondaryColor=FFFFFF&title=true&poster=false&autoplay=false&nextbutton=true` |
| 17 | VidsrcSU | `https://vidsrc.su/tv/{id}/{season}/{episode}?autoplay=true` |
| 18 | EmbedSU | `https://embed.su/embed/tv/{id}/{season}/{episode}` |
| 19 | Resident | `/e/fox/{id}/{season}/{episode}` (internal proxy) |
| 20 | Vidzee | `https://player.vidzee.wtf/embed/tv/{id}/{season}/{episode}` |
| 21 | Bludclart | `https://watch.bludclart.com/tv/{id}/watch?season={season}&episode={episode}` |
| 22 | Main | `/api/streams/series/{id}?season={season}&episode={episode}` (HLS native player) |
| 23 | tmovie | `https://hls.tanime.tv/api/tv/{id}/{season}/{episode}` |

---

## Server Properties

| # | Server | Has Ads | Has 4K | Display Name |
|---|--------|---------|--------|--------------|
| 1 | VidsrcCC | No | No | Vanilla |
| 2 | VidUp | Yes | No | Lora |
| 3 | NHDAPI | No | No | Mend |
| 4 | TurboVid | No | No | Felix |
| 5 | Videasy | No | Yes | Vars |
| 6 | VidPlus | Yes | No | Swift |
| 7 | RiveStream | No | No | Quazar |
| 8 | AutoEmbed | Yes | No | Starlight |
| 9 | 111Movies | Yes | No | Gaze |
| 10 | Vidify | Yes | No | Florence |
| 11 | VidAPI | Yes | No | Deez |
| 12 | 2Embed | Yes | No | Titan |
| 13 | Vidrock | Yes | No | Zix |
| 14 | VidFast | Yes | Yes | Delta |
| 15 | VidsrcXYZ | Yes | No | Bravo |
| 16 | VidLink | Yes | No | Myth |
| 17 | VidsrcSU | Yes | No | Asuka |
| 18 | EmbedSU | Yes | No | Susanoo |
| 19 | Resident | No | No | Glose |
| 20 | Vidzee | No | No | Bob Johns |
| 21 | Bludclart | No | No | Rox |
| 22 | Main | No | No | Icey |
| 23 | tmovie | No | No | Boxed |

---

## Anime Embed URLs (using Anilist ID)

| Server | Type | URL Template |
|--------|------|--------------|
| VidsrcCC | Sub | `https://vidsrc.cc/v2/embed/anime/{anilist_id}/{episode}/sub?autoPlay=true&autoSkipIntro=true` |
| VidsrcCC | Dub | `https://vidsrc.cc/v2/embed/anime/{anilist_id}/{episode}/dub?autoPlay=true&autoSkipIntro=true` |
| VidPlus | Sub | `https://player.vidplus.to/embed/anime/{anilist_id}/{episode}?dub=false` |
| VidPlus | Dub | `https://player.vidplus.to/embed/anime/{anilist_id}/{episode}?dub=true` |

---

## Examples

### The Matrix (TMDB ID: 603)

```
VidsrcCC:   https://vidsrc.cc/v2/embed/movie/603
VidUp:      https://vidup.to/movie/603?autoPlay=true&theme=000000
NHDAPI:     https://nhdapi.xyz/movie/603
TurboVid:   https://uembed.xyz/?id=603&autoplay=true
Videasy:    https://player.videasy.net/movie/603?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6
VidPlus:    https://player.vidplus.to/embed/movie/603?autoplay=true
RiveStream: https://rivestream.net/embed?type=movie&id=603
AutoEmbed:  https://player.autoembed.cc/embed/movie/603
111Movies:  https://111movies.com/movie/603
Vidify:     https://player.vidify.top/embed/movie/603?server=meta
VidAPI:     https://vidapi.xyz/embed/movie/603
2Embed:     https://www.2embed.cc/embed/603
Vidrock:    https://vidrock.net/movie/603
VidFast:    https://vidfast.pro/movie/603?autoPlay=true&theme=2392EE&poster=false
VidsrcXYZ:  https://vidsrc.xyz/embed/movie?tmdb=603
VidLink:    https://vidlink.pro/movie/603?primaryColor=FFFFFF&secondaryColor=2392EE&title=true&poster=false&autoplay=false
VidsrcSU:   https://vidsrc.su/movie/603?autoplay=true
EmbedSU:    https://embed.su/embed/movie/603
Vidzee:     https://player.vidzee.wtf/embed/movie/603
Bludclart:  https://watch.bludclart.com/movie/603/watch
tmovie:     https://hls.tanime.tv/api/movie/603
```

### Fallout S01E01 (TMDB ID: 106379)

```
VidsrcCC:   https://vidsrc.cc/v2/embed/tv/106379/1/1
VidUp:      https://vidup.to/tv/106379/1/1?autoPlay=true&theme=000000
NHDAPI:     https://nhdapi.xyz/tv/106379/1/1
TurboVid:   https://uembed.xyz/?id=106379&season=1&episode=1&autoplay=true
Videasy:    https://player.videasy.net/tv/106379/1/1?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true&overlay=true&color=8B5CF6
VidPlus:    https://player.vidplus.to/embed/tv/106379/1/1?autoplay=true
RiveStream: https://rivestream.net/embed?type=tv&id=106379&season=1&episode=1
AutoEmbed:  https://player.autoembed.cc/embed/tv/106379/1/1
111Movies:  https://111movies.com/tv/106379/1/1
Vidify:     https://player.vidify.top/embed/tv/106379/1/1?server=meta
VidAPI:     https://vidapi.xyz/embed/tv/106379&s=1&e=1
2Embed:     https://www.2embed.cc/embedtv/106379&s=1&e=1
Vidrock:    https://vidrock.net/tv/106379/1/1
VidFast:    https://vidfast.pro/tv/106379/1/1?autoPlay=true&theme=2392EE&poster=false
VidsrcXYZ:  https://vidsrc.xyz/embed/tv/106379/1-1
VidLink:    https://vidlink.pro/tv/106379/1/1?primaryColor=2392EE&secondaryColor=FFFFFF&title=true&poster=false&autoplay=false&nextbutton=true
VidsrcSU:   https://vidsrc.su/tv/106379/1/1?autoplay=true
EmbedSU:    https://embed.su/embed/tv/106379/1/1
Vidzee:     https://player.vidzee.wtf/embed/tv/106379/1/1
Bludclart:  https://watch.bludclart.com/tv/106379/watch?season=1&episode=1
tmovie:     https://hls.tanime.tv/api/tv/106379/1/1
```

---

## Notes

- Default server is **VidsrcCC** (first in list, no ads)
- All providers use **TMDB IDs** (not IMDB IDs)
- Anime uses **Anilist IDs** instead of TMDB
- **Videasy** and **VidFast** are the only servers with 4K support
- **Main** and **Resident** servers use internal proxies
- Display names follow pattern: "{number} {name}" (e.g., "1 Vanilla")
- URLs are constructed **client-side** by the frontend JavaScript
