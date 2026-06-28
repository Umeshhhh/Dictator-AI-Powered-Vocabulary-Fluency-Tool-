import "server-only";

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { randomUUID } from "node:crypto";
import { getRedis } from "./redis";
import { wordOfTheDayPrompt } from "@/prompts/wordOfTheDayPrompt";

export type DailyWord = {
  word: string;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
};

const endpoint = "https://models.github.ai/inference";
const model = "meta/Llama-4-Scout-17B-16E-Instruct";
const TIME_ZONE = "Asia/Kolkata";
const LOCK_SECONDS = 90;
const WAIT_INTERVAL_MS = 500;
const MAX_WAIT_ATTEMPTS = 60;
const HISTORY_LIMIT = 365;

function getTodayInIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getSecondsUntilNextIndianMidnight(): number {
  const [year, month, day] = getTodayInIndia().split("-").map(Number);
  const nextMidnightUtc =
    Date.UTC(year, month - 1, day + 1) - 5.5 * 60 * 60 * 1000;

  return Math.max(60, Math.ceil((nextMidnightUtc - Date.now()) / 1000));
}

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function waitForGeneratedWord(wordKey: string): Promise<DailyWord | null> {
  const redis = await getRedis();

  for (let attempt = 0; attempt < MAX_WAIT_ATTEMPTS; attempt++) {
    await sleep(WAIT_INTERVAL_MS);
    const cachedWord = await redis.get(wordKey);

    if (cachedWord) return parseDailyWord(cachedWord);
  }

  return null;
}

export async function getOrCreateWordOfTheDay(): Promise<DailyWord> {
  const redis = await getRedis();
  const date = getTodayInIndia();
  const wordKey = `word-of-the-day:${date}`;
  const lockKey = `word-of-the-day:lock:${date}`;
  const historyKey = "store:everyday-daily-words";

  const cachedWord = await redis.get(wordKey);
  if (cachedWord) return parseDailyWord(cachedWord);

  const lockToken = randomUUID();
  const acquired = await redis.set(lockKey, lockToken, {
    NX: true,
    EX: LOCK_SECONDS,
  });

  if (!acquired) {
    const generatedWord = await waitForGeneratedWord(wordKey);
    if (generatedWord) return generatedWord;
    throw new Error("Timed out waiting for today's word");
  }

  try {
    const existingWord = await redis.get(wordKey);
    if (existingWord) return parseDailyWord(existingWord);

    const previousWords = parseWordHistory(await redis.get(historyKey));
    const prompt = wordOfTheDayPrompt(JSON.stringify(previousWords));
    const word = await generateWordWithAI({ prompt });

    await redis.set(wordKey, JSON.stringify(word), {
      EX: getSecondsUntilNextIndianMidnight(),
    });

    const updatedHistory = [...previousWords, word.word].slice(-HISTORY_LIMIT);
    await redis.set(historyKey, JSON.stringify(updatedHistory));

    return word;
  } finally {
    await releaseLock(lockKey, lockToken);
  }
}

async function releaseLock(lockKey: string, lockToken: string): Promise<void> {
  const redis = await getRedis();

  await redis.eval(
    `
      if redis.call("GET", KEYS[1]) == ARGV[1] then
        return redis.call("DEL", KEYS[1])
      end
      return 0
    `,
    { keys: [lockKey], arguments: [lockToken] },
  );
}

async function generateWordWithAI({ prompt }: { prompt: string }): Promise<DailyWord> {
  const token = process.env.NEXT_GITHUB_TOKEN;
  if (!token) throw new Error("NEXT_GITHUB_TOKEN is not configured");

  const client = ModelClient(endpoint, new AzureKeyCredential(token));
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      top_p: 0.1,
      max_tokens: 2048,
      model,
    },
  });

  if (isUnexpected(response)) throw response.body.error;

  const generated = response.body.choices[0]?.message.content;
  if (!generated) throw new Error("The AI returned an empty response");

  return parseDailyWord(generated);
}

function parseWordHistory(value: string | null): string[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((word): word is string => typeof word === "string")
      : [];
  } catch {
    return [];
  }
}

function parseDailyWord(value: string): DailyWord {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw new Error("The daily-word data was not valid JSON");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("The generated daily word is not an object");
  }

  const candidate = parsed as Record<string, unknown>;
  const isStringArray = (items: unknown): items is string[] =>
    Array.isArray(items) && items.every(item => typeof item === "string");

  if (
    typeof candidate.word !== "string" ||
    !/^[a-z]+(?:-[a-z]+)?$/.test(candidate.word) ||
    typeof candidate.definition !== "string" ||
    typeof candidate.example !== "string" ||
    !isStringArray(candidate.synonyms) ||
    !isStringArray(candidate.antonyms) ||
    candidate.synonyms.length < 2 ||
    candidate.synonyms.length > 5 ||
    candidate.antonyms.length < 1 ||
    candidate.antonyms.length > 5
  ) {
    throw new Error("The AI response did not match the daily-word schema");
  }

  return {
    word: candidate.word,
    definition: candidate.definition,
    synonyms: candidate.synonyms,
    antonyms: candidate.antonyms,
    example: candidate.example,
  };
}
