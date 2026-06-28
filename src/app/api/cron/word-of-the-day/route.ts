
import { NextRequest, NextResponse } from "next/server";
import { getOrCreateWordOfTheDay } from "@/lib/wordOfTheDay";

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;

  if (
    !cronSecret ||
    request.headers.get("authorization") !==
    `Bearer ${cronSecret}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const word = await getOrCreateWordOfTheDay();
    return NextResponse.json({ success: true, word });
  } catch (error) {
    console.error("Word-of-the-day cron failed:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
