'use server';

import { prisma } from "@/lib/prisma";

export async function getPopularSearches() {
  try {
    // Fetch the 4 most frequently saved words. 
    // If the database doesn't have enough data, we will provide a fallback.
    const popularWords = await prisma.savedWord.groupBy({
      by: ['word'],
      _count: {
        word: true,
      },
      orderBy: {
        _count: {
          word: 'desc',
        },
      },
      take: 4,
    });

    const words = popularWords.map(pw => pw.word);
    
    // Fallback if not enough data
    const fallbacks = ["Serendipity", "Ordeal", "Intriguing", "Semblance"];
    
    while(words.length < 4) {
      const fb = fallbacks.shift();
      if(fb && !words.includes(fb.toLowerCase())) {
        words.push(fb);
      }
    }

    return words;
  } catch (error) {
    console.error("Failed to fetch popular searches:", error);
    return ["Serendipity", "Ordeal", "Intriguing", "Semblance"];
  }
}
