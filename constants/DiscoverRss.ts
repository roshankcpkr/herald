import { RSSFeed } from "@/utils/storage";

export type DISCOVER_RSS = {
  url: string;
  name: string;
  category: string;
};

export type COUNTRY_RSS = {
  url: string;
  name: string;
  country: string;
};

export const categoriesRssFeeds: DISCOVER_RSS[] = [
  {
    url: "https://feeds.twit.tv/aaa.xml",
    name: "All About Android (Audio)",
    category: "Android",
  },
];

export const localRssFeeds: COUNTRY_RSS[] = [
  {
    url: "https://feeds.twit.tv/aaa.xml",
    name: "All About Android (Audio)",
    country: "Nepal",
  },
  {
    url: "https://feeds.twit.tv/aaa.xml",
    name: "All About Android (Audio)",
    country: "United States",
  },
];

export const trendingRssFeeds: DISCOVER_RSS[] = [
  {
    url: "https://feeds.twit.tv/aaa.xml",
    name: "All About Android (Audio)",
    category: "Android",
  },
];

export const interestingRssFeeds: DISCOVER_RSS[] = [
  {
    url: "https://feeds.twit.tv/aaa.xml",
    name: "All About Android (Audio)",
    category: "Android",
  },
];

export const customRssFeeds: RSSFeed[] = [
  {
    id: "android-blog",
    url: "https://blog.google/products/android/rss",
    name: "Android Blog",
    category: "Technology",
  },
  // Add more feeds as needed
];
