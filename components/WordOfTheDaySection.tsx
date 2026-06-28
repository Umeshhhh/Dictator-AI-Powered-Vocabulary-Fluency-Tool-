import { getOrCreateWordOfTheDay } from "@/lib/wordOfTheDay";
import WordOfTheDay from "./WordOfTheDay";

export default async function WordOfTheDaySection() {
  try {
    const dailyWord = await getOrCreateWordOfTheDay();
    return <WordOfTheDay dailyWord={dailyWord} />;
  } catch (error) {
    console.error("Unable to load the word of the day:", error);
    return <WordOfTheDay dailyWord={null} />;
  }
}
