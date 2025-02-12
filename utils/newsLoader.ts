import AsyncStorage from "@react-native-async-storage/async-storage";
import { rssFeeds } from "../constants/rssFeeds";
import { fetchRawRssFeed, parseRssFeed } from "./fetchRawRssFeed";
import { getCategories } from "./storage";

export async function loadRandomNews(page = 1) {
  try {
    // Get saved categories
    const savedCategories = await getCategories();

    if (categories.length === 0) return [];

    // Get RSS feeds for selected categories
    const availableFeeds = categories.flatMap(
      (category: string) => rssFeeds[category] || []
    );

    // Shuffle feeds
    const shuffledFeeds = availableFeeds.sort(() => Math.random() - 0.5);

    // Take 5 random feeds
    const selectedFeeds = shuffledFeeds.slice(0, 5);

    // Fetch and parse news from selected feeds
    const newsPromises = selectedFeeds.map(async (feedUrl) => {
      const rawFeed = await fetchRawRssFeed(feedUrl);
      const parsedFeed = await parseRssFeed(rawFeed);
      if (parsedFeed) {
        return {
          ...parsedFeed,
          id: Math.random().toString(36).substr(2, 9),
        };
      }
      return null;
    });

    const news = await Promise.all(newsPromises);
    return news.filter((item) => item !== null);
  } catch (error) {
    console.error("Error loading random news:", error);
    return [];
  }
}
