import * as rssParser from "react-native-rss-parser";

interface ParsedArticle {
  id: string;
  title: string;
  description: string;
  sourceUrl: string;
  publishedAt: string;
  imageUrl: string | null;
  source: string;
  category: string;
}

export const parseRssFeed = async (
  url: string,
  feedSource: string
): Promise<ParsedArticle[]> => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const feed = await rssParser.parse(text);

    return feed.items.map((item) => {
      // Generate unique ID
      const id = `${
        item.id || item.guid || item.link || Date.now()
      }-${Math.random().toString(36).substr(2, 9)}`;

      // Extract title from various possible locations
      const title =
        (item as any).title ||
        (item as any)["dc:title"] ||
        (item as any)["media:title"] ||
        (item as any)["itunes:title"] ||
        (item as any).headline ||
        (item as any).name;
      ("");

      // Extract description from various possible locations
      const description = cleanText(
        item.description ||
          (item as any).content ||
          (item as any).contentSnippet ||
          (item as any)["content:encoded"] ||
          (item as any)["dc:description"] ||
          (item as any).summary ||
          (item as any)["media:description"] ||
          ""
      );

      // Extract link/URL from various possible locations
      const sourceUrl =
        item.links?.[0]?.url || item.link || item.url || item.guid || "";

      // Extract publish date from various possible locations
      const publishedAt = parseDate(
        item.published ||
          item.pubDate ||
          item.date ||
          item["dc:date"] ||
          item.updated ||
          item.created ||
          new Date().toISOString()
      );

      // Extract image from various possible locations
      const imageUrl = extractImage(item);

      return {
        id,
        title,
        description,
        sourceUrl,
        publishedAt,
        imageUrl,
        source: feedSource,
        category: extractCategory(item, feedSource),
      };
    });
  } catch (error) {
    console.error(`Error parsing RSS feed from ${url}:`, error);
    return [];
  }
};

const cleanText = (text: string): string => {
  return text
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
};

const parseDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
};

const extractImage = (item: any): string | null => {
  // Try all possible image locations
  const possibleImages = [
    item.enclosures?.[0]?.url,
    item.mediaContent?.[0]?.url,
    item["media:content"]?.[0]?.url,
    item["media:thumbnail"]?.[0]?.url,
    item.image?.url,
    item.image,
    item.thumbnail,
    item["itunes:image"]?.href,
    item.imageUrl,
    // Extract from content if contains img tag
    (item.content || item.description || "").match(
      /<img[^>]+src="([^">]+)"/
    )?.[1],
  ];

  // Return first valid image URL
  return possibleImages.find((url) => url && isValidUrl(url)) || null;
};

const extractCategory = (item: any, defaultCategory: string): string => {
  // Try all possible category locations
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
): Promise<{ articles: ParsedArticle[]; hasMore: boolean }> => {
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
      .filter(
        (article) => article.title && article.description && article.sourceUrl
      );

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
