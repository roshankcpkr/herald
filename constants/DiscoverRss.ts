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

export const localRssFeeds: COUNTRY_RSS[] = [
  {
    url: "https://www.smh.com.au/rss/feed.xml",
    name: "Sydney Morning Herald - Latest News",
    country: "Australia",
  },
  {
    url: "https://feeds.bbci.co.uk/news/world/asia/india/rss.xml",
    name: "BBC World News - India",
    country: "India",
  },
  {
    url: "https://www.theguardian.com/world/india/rss",
    name: "India - The Guardian",
    country: "India",
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    name: "Times of India",
    country: "India",
  },
  {
    url: "https://www.onlinekhabar.com/feed",
    name: "Online Khabar",
    country: "Nepal",
  },
  {
    url: "https://nagariknews.nagariknetwork.com/feed",
    name: "Nagrik news",
    country: "Nepal",
  },
  {
    url: "https://rajdhanidaily.com/feed/",
    name: "Rajdhani Daily",
    country: "Nepal",
  },
  {
    url: "https://newsofnepal.com/feed/",
    name: "Newsofnepal",
    country: "Nepal",
  },
  {
    url: "https://nepalipost.com/beta/feed",
    name: "Nepali Post",
    country: "Nepal",
  },
  {
    url: "https://english.ratopati.com/rss/",
    name: "Ratopati",
    country: "Nepal",
  },
  {
    url: "https://en.setopati.com/feed",
    name: "Setopati",
    country: "Nepal",
  },
];

export const trendingRssFeeds: DISCOVER_RSS[] = [
  {
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    name: "BBC world news",
    category: "News",
  },
  {
    url: "https://www1.cbn.com/rss-cbn-articles-cbnnews.xml",
    name: "CBN News",
    category: "News",
  },
  {
    url: "https://www.theguardian.com/world/rss",
    name: "The Guardian",
    category: "News",
  },
  {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    name: "New York Times",
    category: "News",
  },
  {
    url: "https://www.wired.com/feed",
    name: "Wired",
    category: "Technology",
  },
];

export const interestingRssFeeds: DISCOVER_RSS[] = [
  {
    url: "https://blog.pragmaticengineer.com/rss/",
    name: "The Pragmatic Engineer",
    category: "Engineering",
  },
  {
    url: "http://www.quantamagazine.org/feed/",
    name: "Quanta Magazine",
    category: "Science",
  },
  {
    url: "http://feeds.feedburner.com/seomoz",
    name: "Moz",
    category: "Marketing",
  },
  {
    url: "http://feeds.harvardbusiness.org/harvardbusiness/",
    name: "Harvard Business Review",
    category: "Business",
  },
];
