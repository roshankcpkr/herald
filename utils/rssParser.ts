import * as rssParser from "react-native-rss-parser";
import { getSummary } from "./summary";
import { Article } from "@/utils/storage";

interface ParsedArticle {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  imageUrl: string | null;
  sourceUrl: string;
  source: string;
  publishedAt: string;
  category: string;
}

interface ProcessedFeed {
  title: string;
  description: string;
  fullContent: string;
  summary: string;
  link: string;
  publishedAt: string;
  imageUrl: string | null;
  source: string;
}

interface RSSItem {
  id?: string;
  guid?: string;
  title?: string;
  link?: string;
  description?: string;
  content?: string;
  "content:encoded"?: string;
  pubDate?: string;
  published?: string;
  date?: string;
  "dc:date"?: string;
  updated?: string;
  created?: string;
  "media:content"?: { url: string }[];
  "media:thumbnail"?: { url: string }[];
  enclosures?: { url: string }[];
  image?: { url: string };
  "itunes:image"?: { href: string };
}

const extractContent = (item: RSSItem): string => {
  const possibleContent = [
    item["content:encoded"],
    item.content,
    item.description,
    "",
  ];
  return possibleContent.find((content) => !!content) || "";
};

const extractDate = (item: RSSItem): string => {
  const possibleDates = [
    item.published,
    item.pubDate,
    item.date,
    item["dc:date"],
    item.updated,
    item.created,
  ];

  try {
    const date = possibleDates.find((date) => !!date);
    return date ? new Date(date).toISOString() : new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
};

const extractImage = (item: RSSItem): string | null => {
  const descriptionImage = item.description
    ?.match(/<img[^>]+src="([^">]+)"/)?.[1]
    ?.replace(/&amp;/g, "&");

  const possibleImages = [
    descriptionImage,
    item["media:content"]?.[0]?.url,
    item["media:thumbnail"]?.[0]?.url,
    item.enclosures?.[0]?.url,
    item.image?.url,
    item["itunes:image"]?.href,
  ];

  const imageUrl = possibleImages.find((url) => url && isValidUrl(url));

  if (imageUrl?.includes("fbcdn.net") || imageUrl?.includes("facebook.com")) {
    return cleanFacebookUrl(imageUrl);
  }

  return imageUrl || null;
};

const cleanFacebookUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const essentialParams = [
      "stp",
      "_nc_cat",
      "ccb",
      "_nc_sid",
      "_nc_ohc",
      "_nc_ht",
      "oh",
      "oe",
    ];

    const params = essentialParams
      .map((param) => `${param}=${parsedUrl.searchParams.get(param)}`)
      .filter((param) => !param.endsWith("null"))
      .join("&");

    return `${parsedUrl.origin}${parsedUrl.pathname}?${params}`;
  } catch {
    return url;
  }
};

const cleanText = (text: string): string => {
  return text
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

export const parseRssFeed = async (
  url: string,
  feedSource: string
): Promise<ParsedArticle[]> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const feed = await rssParser.parse(text);

    return feed.items.map((item: RSSItem) => ({
      id: `${item.id || item.guid || item.link || Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      title: cleanText(item.title || ""),
      description: cleanText(extractContent(item)),
      fullContent: extractContent(item),
      sourceUrl: item.link || "",
      publishedAt: extractDate(item),
      imageUrl: extractImage(item),
      source: feedSource,
      category: feedSource,
    }));
  } catch (error) {
    console.error(`Error parsing RSS feed from ${url}:`, error);
    return [];
  }
};

const extractCategory = (item: any, defaultCategory: string): string => {
  const categories = [
    item.categories?.[0],
    item.category,
    item["dc:subject"],
    item.tags?.[0],
    defaultCategory,
  ];

  return categories.find((cat) => cat) || defaultCategory;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const fetchAndParseFeeds = async (
  urls: string[],
  batchSize: number = 5
): Promise<{ articles: Article[]; hasMore: boolean }> => {
  try {
    const feedPromises = urls.slice(0, batchSize).map((url) => {
      const source = extractSourceFromUrl(url);
      return parseRssFeed(url, source);
    });

    const results = await Promise.allSettled(feedPromises);
    const articles = results
      .filter(
        (result): result is PromiseFulfilledResult<ParsedArticle[]> =>
          result.status === "fulfilled"
      )
      .flatMap((result) => result.value)
      .map((article) => ({
        ...article,
        source: extractSourceFromUrl(article.sourceUrl),
        imageUrl: extractImage(article),
        fullContent:
          (article as any)["content:encoded"] ||
          (article as any).content ||
          article.description ||
          "",
      }));

    return {
      articles,
      hasMore: urls.length > batchSize,
    };
  } catch (error) {
    console.error("Error fetching and parsing feeds:", error);
    return { articles: [], hasMore: false };
  }
};

const extractSourceFromUrl = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    return hostname
      .replace(/^www\./i, "")
      .split(".")
      .slice(0, -1)
      .join(".")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch {
    return url;
  }
};

const fetchRssFeed = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return null;
  }
};

export const processRssFeed = async (
  url: string
): Promise<ProcessedFeed | null> => {
  try {
    const text = await fetchRssFeed(url);
    if (!text) return null;

    const feed = await rssParser.parse(text);
    if (!feed.items?.[0]) return null;

    const item = feed.items[0];

    const fullContent =
      (item as any)["content:encoded"] ||
      (item as any).content ||
      (item as any).description ||
      "";

    const summary = await getSummary(fullContent);

    return {
      title: item.title || "",
      description: item.description || "",
      fullContent:
        (item as any)["content:encoded"] ||
        (item as any).content ||
        (item as any).description ||
        "",
      summary: summary || "",
      link: (item as any).link || "",
      publishedAt: item.published || new Date().toISOString(),
      imageUrl: extractImage(item),
      source: extractSourceFromUrl(url) || "",
    };
  } catch (error) {
    console.error("Error processing RSS feed:", error);
    return null;
  }
};
