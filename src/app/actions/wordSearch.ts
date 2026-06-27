'use server';

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { getRedis } from "@/lib/redis";
import { getIp } from "@/lib/request";
import { getServerSession } from "next-auth/next";
import { rateLimit } from "@/lib/rateLimit";
import { authOptions } from "@/lib/authOptions";

const token = process.env.NEXT_GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "meta/Llama-4-Scout-17B-16E-Instruct";

export const audioBackup = async (word: string) => {

  try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) return "";

    const data = await response.json();
    return data[0]?.phonetics?.[0]?.audio || "";
  }catch(err){
    console.error('Error fetching audio from backup API:', err);
    return '';
  }

};

const main = async ({word}: {word: string}) => {

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(token || ''),
  );

  const prompt = `Input a word, and I will provide a comprehensive JavaScript object with the following properties: word (the corrected word if misspelled in english), definition (a precise and concise definition in english), synonyms (4+ suitable synonyms if possible in english), antonyms (4+ suitable antonyms if possible in english), exampleSentences (3+ simple example sentences using the word in context if possible in english), and audio (a working link directly playable in the browser for pronunciation). The input word is: ${word}. I expect to return a single JavaScript object with the above properties, without any additional text or explanations.`;

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role:"system", content: "" },
        { role:"user", content: `{${prompt}}` }
      ],
      temperature: 0.8,
      top_p: 0.1,
      max_tokens: 2048,
      model: model
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }
  const responseSe = response.body.choices[0].message.content;
  if(responseSe){
    const clean = responseSe.slice(13, responseSe.length - 3 );
    console.log(clean);
    const wordData = JSON.parse(clean);
    return wordData;
  }else console.log("ERROR");
}

export async function wordSearch(word: string) {

  const ip = await getIp();
  const session = await getServerSession(authOptions);

  const dayLimits = {
    key: session?.user?.id ? `rate:word-search:day:${session.user.id}` : `rate:word-search:day:${ip}`,
    limit: 100,
    windowSeconds: 60 * 60 * 24
  }

  const minLimits = {
    key: `rate:word-search:minute:${ip}`,
    limit: 20,
    windowSeconds: 60
  }

  const minLimit = await rateLimit(minLimits);
  const dayLimit = await rateLimit(dayLimits);

  if(!minLimit.success) {
    return {
      error: "Too many searches. Please wait a minute"
    };
  }

  if(!dayLimit.success){
    return {
      error: "Daily search limit reached. Please try again tomorrow"
    };
  }

  const key = word.toLowerCase();

  try {
    // 1. Check Cache First
    const redis = await getRedis();
    const cachedData = await redis.hGetAll(key);
    if (Object.keys(cachedData).length > 0) {
      return {
        word: key,
        definition: cachedData.definition,
        antonyms: JSON.parse(cachedData.antonyms),
        synonyms: JSON.parse(cachedData.synonyms),
        exampleSentences: JSON.parse(cachedData.exampleSentences),
        audio: cachedData.audio || ''
      };
    }
  } catch (err) {
    console.error("Error reading from Redis:", err);
  }

  // 2. Fetch from AI
  const data = await main({word}).catch((err) => {
    console.error("The sample encountered an error:", err);
    return null;
  });

  if (data) {
    // 3. Store in Cache
    try {
      const redis = await getRedis();
      await redis.hSet(key, {
          definition: data.definition || "",
          antonyms: JSON.stringify(data.antonyms || []),
          synonyms: JSON.stringify(data.synonyms || []),
          exampleSentences: JSON.stringify(data.exampleSentences || []),
          audio: data.audio || ""
      });
      await redis.expire(key, 60 * 60 * 24); // expire after 24h
    } catch (err) {
      console.error("Error writing to Redis:", err);
    }
  }

  return data;
}
