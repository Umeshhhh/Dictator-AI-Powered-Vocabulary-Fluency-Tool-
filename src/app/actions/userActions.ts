'use server';

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

export async function saveWord(word: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return { error: "You must be logged in to save words." };
    }

    const userId = session.user.id as string;

    const existingWord = await prisma.savedWord.findUnique({
      where: {
        userId_word: {
          userId,
          word: word.toLowerCase()
        }
      }
    });

    if (existingWord) {
      return { message: "Word is already saved!" };
    }

    await prisma.savedWord.create({
      data: {
        userId,
        word: word.toLowerCase()
      }
    });

    revalidatePath('/dashboard');
    return { success: true, message: "Word saved successfully!" };
  } catch (error) {
    console.error("Error saving word:", error);
    return { error: "Failed to save the word." };
  }
}

export async function getSavedWords() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return [];
    }

    const savedWords = await prisma.savedWord.findMany({
      where: { userId: session.user.id as string },
      orderBy: { createdAt: 'desc' }
    });

    return savedWords;
  } catch (error) {
    console.error("Error fetching saved words:", error);
    return [];
  }
}

// Basic SRS Implementation: Fetch words least successfully practiced or least recently practiced
export async function getSRSWords() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) return [];

    const userId = session.user.id as string;
    
    // Get all saved words
    const savedWords = await prisma.savedWord.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            practiceHist: {
              orderBy: { attemptedAt: 'desc' }
            }
          }
        }
      }
    });

    // Sort words based on SRS logic (simplistic: least practiced or highest failure rate)
    // For now, we'll just return a few random or most recent words to practice
    return savedWords.slice(0, 5);
  } catch (error) {
    console.error("Error fetching SRS words:", error);
    return [];
  }
}

export async function getUserStats() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) return null;

    const userId = session.user.id as string;

    const totalSaved = await prisma.savedWord.count({ where: { userId } });
    const totalPracticed = await prisma.practiceHistory.count({ where: { userId } });
    const successfulPractices = await prisma.practiceHistory.count({ 
      where: { userId, success: true } 
    });

    const accuracy = totalPracticed > 0 ? Math.round((successfulPractices / totalPracticed) * 100) : 0;

    return {
      wordsSaved: totalSaved,
      exercisesCompleted: totalPracticed,
      accuracyRate: accuracy
    };
  } catch(err) {
    console.error("Error fetching user stats:", err);
    return null;
  }
}
