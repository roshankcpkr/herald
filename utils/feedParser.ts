import * as rssParser from "react-native-rss-parser";
import { rssFeeds } from "@/constants/rssFeeds";
import { Article } from "@/utils/storage";

let cachedArticles: Article[] = [];
let isLoading = false;

export const fetchAndParseFeeds = async (urls: string[]) => {
  try {
    console.log("Fetching URLs:", urls);

    const responses = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await fetch(url);
          const text = await response.text();
          const feed = await rssParser.parse(text);
          // Add feed URL to track source
          return { feed, sourceUrl: url };
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
          return null;
        }
      })
    );

    const validResponses = responses.filter(Boolean);

    const articles = validResponses.flatMap((response) => {
      const feed = response?.feed;
      const sourceUrl = response?.sourceUrl;
      const feedSource =
        rssFeeds.find((f) => f.url === sourceUrl)?.name || "Unknown source";

      return (
        feed?.items?.map((item) => ({
          id: item.id || item.guid || item.link || Math.random().toString(),
          title: item.title?.trim() || "No title",
          description: formatDescription(item.description),
          imageUrl: extractImageUrl(item),
          sourceUrl: item.link?.trim() || sourceUrl || "#",
          source: feedSource,
          publishedAt: formatDate(item.published),
          category: "news",
        })) || []
      );
    });

    // Remove duplicates and invalid articles
    const uniqueArticles = articles.filter(
      (article, index, self) =>
        article.title &&
        article.description &&
        index === self.findIndex((a) => a.title === article.title)
    );

    return {
      articles: uniqueArticles,
      hasMore: uniqueArticles.length > 0,
    };
  } catch (error) {
    console.error("Error in fetchAndParseFeeds:", error);
    return { articles: [], hasMore: false };
  }
};

function formatDescription(desc: string | undefined): string {
  if (!desc) return "No description available";

  // Remove HTML tags and normalize spaces
  const text = desc
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Split into words and limit to 40 words
  const words = text.split(" ");
  if (words.length > 40) {
    return words.slice(0, 40).join(" ") + "...";
  }

  return text;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString();

  try {
    const date = new Date(dateStr);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function extractImageUrl(item: any): string {
  // Try different possible image locations
  const mediaContent = item.mediaContent?.[0]?.url;
  const enclosure = item.enclosures?.[0]?.url;
  const imgMatch = item.description?.match(/<img[^>]+src="([^">]+)"/);
  const thumbnail = item.itunes?.image;
  const defaultImage = "https://placehold.co/600x400?text=No+Image";

  // Validate URL
  const url =
    mediaContent ||
    enclosure ||
    (imgMatch && imgMatch[1]) ||
    thumbnail ||
    defaultImage;

  try {
    new URL(url); // Check if valid URL
    return url;
  } catch {
    return defaultImage;
  }
}

function extractDomain(url?: string): string {
  if (!url) return "";
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}
