import * as rssParser from "react-native-rss-parser";
import { llamaUtils } from "./aimodel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchRawRssFeed = async (url: string) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error fetching RSS feed", error);
    return null;
  }
};

export const parseRssFeed = async (text: string | null) => {
  try {
    if (!text) return null;

    // Parse RSS feed
    const feed = await rssParser.parse(text);
    const item = feed.items[1];
    if (!item) return null;

    // Get the best available image
    const imageUrl = extractImage(item);
    const content = item.description || "";

    // Prepare data for AI summarization
    const modelDownloaded = await AsyncStorage.getItem("modelDownloaded");
    if (!modelDownloaded) {
      throw new Error(
        "Model not downloaded. Please complete onboarding first."
      );
    }

    if (!llamaUtils.isModelInitialized()) {
      await llamaUtils.initialize();
    }
    console.log("this is the content", content);
    const prompt = `
      Summarize this news article in exactly 40 words or less. Provide the overall summary of the article in 40 words or less. Don't cross the 40 words limit. Summarize the article in a way that is easy to understand and engaging. Don't add any other text or comments. Just the summary:
      ${content}
    `;

    const summary = await llamaUtils.generateResponse(prompt);
    console.log("this is the summary", summary);
    return {
      title: item.title || "",
      imageUrl: imageUrl,
      datePublished: item.published || new Date().toISOString(),
      source: feed.description || "Unknown Source",
      sourceURL: item.link || "",
      newsData: summary || content,
    };
  } catch (error) {
    console.error("Error parsing RSS feed", error);
    return null;
  }
};

function extractImage(item: any): string | null {
  return (
    item.enclosures?.[0]?.url ||
    item.mediaContent?.[0]?.url ||
    item.itunes?.image ||
    null
  );
}

export const processRssFeed = async (url: string) => {
  try {
    const text = await fetchRawRssFeed(url);
    const parsedData = await parseRssFeed(text);
    return parsedData;
  } catch (error) {
    console.error("Error processing RSS feed", error);
    return null;
  }
};
