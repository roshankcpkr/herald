import * as rssParser from "react-native-rss-parser";
import { llamaUtils } from "./aimodel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ProcessedFeed = {
  title: string;
  description: string;
  summary: string;
  link: string;
  publishedAt: string;
  imageUrl: string | null;
};

async function fetchRssFeed(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return null;
  }
}

export const processRssFeed = async (
  url: string
): Promise<ProcessedFeed | null> => {
  try {
    const text = await fetchRssFeed(url);
    if (!text) return null;

    const feed = await rssParser.parse(text);
    if (!feed.items?.[0]) return null;

    const item = feed.items[0];
    const description = item.description || item.content;

    // Get AI summary
    const summary = await getSummary(description);

    return {
      title: item.title || "",
      description: description || "",
      summary: summary || "",
      link: item.links?.[0]?.url || "",
      publishedAt: item.published || new Date().toISOString(),
      imageUrl: extractImage(item),
    };
  } catch (error) {
    console.error("Error processing RSS feed:", error);
    return null;
  }
};

async function getSummary(text: string): Promise<string> {
  try {
    const modelDownloaded = await AsyncStorage.getItem("modelDownloaded");
    if (!modelDownloaded) {
      throw new Error("Model not downloaded");
    }

    if (!llamaUtils.isModelInitialized()) {
      await llamaUtils.initialize();
    }

    const prompt = `
      Summarize this news article in exactly 40 words or less. Provide the overall summary of the article in 40 words or less. Don't cross the 40 words limit. Summarize the article in a way that is easy to understand and engaging. Don't add any other text or comments. Just the summary:
      ${text}
    `;

    const summary = await llamaUtils.generateResponse(prompt);
    return summary || "";
  } catch (error) {
    console.error("Error getting summary:", error);
    return "";
  }
}

function extractImage(item: any): string | null {
  return (
    item.enclosures?.[0]?.url ||
    item.mediaContent?.[0]?.url ||
    item.itunes?.image ||
    null
  );
}
