import * as rssParser from "react-native-rss-parser";
import { Article } from "@/utils/storage";
import { rssFeeds } from "@/constants/rssFeeds";
import { cleanHtmlContent } from "./cleanContent";

export const fetchAndParseFeeds = async (urls: string[]) => {
  try {
    console.log("🔄 Fetching URLs:", urls);

    const responses = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await fetch(url);
          const text = await response.text();
          const feed = await rssParser.parse(text);
          return { feed, sourceUrl: url };
        } catch (error) {
          console.error(`❌ Error fetching ${url}:`, error);
          return null;
        }
      })
    );

    const validResponses = responses.filter(Boolean);

    const articles: Article[] = validResponses.flatMap((response) => {
      const feed = response?.feed;
      const sourceUrl = response?.sourceUrl;
      const feedSource =
        rssFeeds.find((f) => f.url === sourceUrl)?.name || "Unknown";

      return (
        feed?.items?.map((item: any) => {
          const rawContent =
            (item as any)["content:encoded"] ||
            (item as any).content ||
            (item as any).description ||
            "";

          const cleanedContent = cleanHtmlContent(rawContent);
          const cleanedDescription = cleanHtmlContent(item.description || "");

          return {
            id: item.id || item.guid || item.link || Date.now().toString(),
            title: item.title?.trim() || "No title",
            description: cleanedDescription,
            fullContent: cleanedContent,
            imageUrl: extractImageUrl(item),
            sourceUrl: item.link?.trim() || sourceUrl || "#",
            source: feedSource,
            publishedAt: formatDate(item.published || item.pubDate),
            category: feedSource,
          };
        }) || []
      );
    });

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
    console.error("❌ Error in fetchAndParseFeeds:", error);
    return { articles: [], hasMore: false };
  }
};

function extractImageUrl(item: any): string {
  const possibleImages = [
    item.description
      ?.match(/<img[^>]+src="([^">]+)"/)?.[1]
      ?.replace(/&amp;/g, "&"),
    (item as any)["media:content"]?.[0]?.url,
    (item as any)["media:thumbnail"]?.[0]?.url,
    item.enclosures?.[0]?.url,
    item.image?.url,
    (item as any)["itunes:image"]?.href,
    "https://placehold.co/600x400?text=No+Image",
  ];

  const imageUrl = possibleImages.find((url) => url && isValidUrl(url));

  if (imageUrl?.includes("fbcdn.net") || imageUrl?.includes("facebook.com")) {
    return cleanFacebookUrl(imageUrl);
  }

  return imageUrl || possibleImages[possibleImages.length - 1];
}

function cleanFacebookUrl(url: string): string {
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
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString();
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
