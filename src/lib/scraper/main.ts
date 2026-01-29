/**
 * tmovie.tv Scraper - Main Entry Point
 *
 * Run with: npm run scrape
 */

import {
  allServers,
  serverDisplayNames,
  serverHasAds,
  serverHas4K,
  getMovieEmbedUrl,
  getTVEmbedUrl,
  getAnimeEmbedUrl,
  fetchMovieDetails,
  fetchTVDetails,
  getMovieDetailUrl,
  getTVDetailUrl,
} from "./streaming";

async function main() {
  console.log("=".repeat(70));
  console.log("tmovie.tv Streaming API - Complete Server Reference");
  console.log("=".repeat(70));

  // Example: The Matrix (TMDB ID: 603)
  const matrixId = 603;

  console.log("\n[1] ALL 23 STREAMING SERVERS");
  console.log("-".repeat(70));
  console.log(
    "Server".padEnd(15) +
      "Display Name".padEnd(15) +
      "Ads".padEnd(8) +
      "4K".padEnd(5) +
      "Movie URL (Matrix)"
  );
  console.log("-".repeat(70));

  for (const server of allServers) {
    const displayName = serverDisplayNames[server];
    const hasAds = serverHasAds[server] ? "Yes" : "No";
    const has4K = serverHas4K[server] ? "Yes" : "-";
    const url = getMovieEmbedUrl(matrixId, server);

    console.log(
      `${server.padEnd(15)}${displayName.padEnd(15)}${hasAds.padEnd(8)}${has4K.padEnd(5)}${url}`
    );
  }

  // Summary
  console.log("\n[2] SUMMARY");
  console.log("-".repeat(70));
  console.log(`Total servers: ${allServers.length}`);
  console.log(`No-ads servers: ${allServers.filter((s) => !serverHasAds[s]).length}`);
  console.log(`4K capable: ${allServers.filter((s) => serverHas4K[s]).length}`);

  // No-ads servers list
  console.log("\nNo-ads servers:");
  allServers
    .filter((s) => !serverHasAds[s])
    .forEach((s) => console.log(`  - ${s} (${serverDisplayNames[s]})`));

  // 4K servers list
  console.log("\n4K capable servers:");
  allServers
    .filter((s) => serverHas4K[s])
    .forEach((s) => console.log(`  - ${s} (${serverDisplayNames[s]})`));

  // Example TV show
  const falloutId = 106379;
  console.log("\n[3] TV SHOW EXAMPLE (Fallout S01E01)");
  console.log("-".repeat(70));
  console.log("Top 5 servers:");
  for (const server of allServers.slice(0, 5)) {
    console.log(`  ${server}: ${getTVEmbedUrl(falloutId, 1, 1, server)}`);
  }

  // Anime example
  console.log("\n[4] ANIME EXAMPLE (One Punch Man EP1)");
  console.log("-".repeat(70));
  console.log(`  Sub: ${getAnimeEmbedUrl(21, 1, false, "VidsrcCC")}`);
  console.log(`  Dub: ${getAnimeEmbedUrl(21, 1, true, "VidsrcCC")}`);

  // Detail page URLs
  console.log("\n[5] TMOVIE.TV DETAIL PAGE URLs");
  console.log("-".repeat(70));
  console.log(`  Movie: ${getMovieDetailUrl("The Matrix", matrixId)}`);
  console.log(`  TV:    ${getTVDetailUrl("Fallout", falloutId)}`);

  // API test
  console.log("\n[6] API TEST");
  console.log("-".repeat(70));
  try {
    const movie = await fetchMovieDetails(matrixId);
    console.log(`  Movie: ${movie.title} (${movie.release_date?.slice(0, 4)})`);
    console.log(`  Rating: ${movie.vote_average}/10 | Runtime: ${movie.runtime} min`);
    console.log(`  Genres: ${movie.genres.map((g) => g.name).join(", ")}`);
  } catch (e) {
    console.log(`  Error: ${(e as Error).message}`);
  }

  try {
    const tv = await fetchTVDetails(falloutId);
    console.log(`  TV: ${tv.name} (${tv.first_air_date?.slice(0, 4)})`);
    console.log(`  Rating: ${tv.vote_average}/10 | Seasons: ${tv.number_of_seasons}`);
  } catch (e) {
    console.log(`  Error: ${(e as Error).message}`);
  }

  console.log("\n" + "=".repeat(70));
  console.log("See TMOVIE_STRUCTURE.md and EMBED_PROVIDERS.md for full documentation.");
  console.log("=".repeat(70));
}

main().catch(console.error);
