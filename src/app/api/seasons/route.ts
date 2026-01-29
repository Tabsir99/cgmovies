import { NextRequest } from "next/server";
import { getSeasonDetails } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tvId = searchParams.get("tvId");
  const seasonNumber = searchParams.get("seasonNumber");

  if (!tvId || !seasonNumber) {
    return Response.json(
      { error: "Missing tvId or seasonNumber" },
      { status: 400 }
    );
  }

  try {
    const seasonDetails = await getSeasonDetails(
      parseInt(tvId),
      parseInt(seasonNumber)
    );

    return Response.json(seasonDetails);
  } catch (error) {
    console.error("Error fetching season details:", error);
    return Response.json(
      { error: "Failed to fetch season details" },
      { status: 500 }
    );
  }
}
