import AsyncStorage from "@react-native-async-storage/async-storage";
import { Country } from "@/constants/CountryList";

export interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl: string;
  source: string;
  publishedAt: string;
  category: string;
}

export interface RSSFeed {
  id: string;
  name: string;
  url: string;
  category: string;
}

const BOOKMARKS_KEY = "@herald_bookmarks";
const CATEGORIES_KEY = "@herald_categories";
const RSS_FEEDS_KEY = "@herald_rss_feeds";
const COUNTRY_KEY = "@herald_country";

export const saveArticle = async (article: Article) => {
  try {
    const savedArticles = await getSavedArticles();
    const updatedArticles = [...savedArticles, article];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedArticles));
  } catch (error) {
    console.error("Error saving article:", error);
  }
};

export const getSavedArticles = async (): Promise<Article[]> => {
  try {
    const articles = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return articles ? JSON.parse(articles) : [];
  } catch (error) {
    console.error("Error getting saved articles:", error);
    return [];
  }
};

export const saveCategories = async (categories: string[]) => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error("Error saving categories:", error);
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const categories = await AsyncStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
};

export const removeArticle = async (id: string) => {
  try {
    const savedArticles = await getSavedArticles();
    const updatedArticles = savedArticles.filter(
      (article) => article.id !== id
    );
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedArticles));
  } catch (error) {
    console.error("Error removing article:", error);
  }
};

export const removeMultipleArticles = async (ids: string[]) => {
  try {
    const savedArticles = await getSavedArticles();
    const updatedArticles = savedArticles.filter(
      (article) => !ids.includes(article.id)
    );
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedArticles));
  } catch (error) {
    console.error("Error removing articles:", error);
  }
};

export const isArticleSaved = async (id: string): Promise<boolean> => {
  try {
    const savedArticles = await getSavedArticles();
    return savedArticles.some((article) => article.id === id);
  } catch (error) {
    console.error("Error checking saved status:", error);
    return false;
  }
};

export const getRSSFeeds = async (): Promise<RSSFeed[]> => {
  try {
    const feeds = await AsyncStorage.getItem(RSS_FEEDS_KEY);
    return feeds ? JSON.parse(feeds) : [];
  } catch (error) {
    console.error("Error getting RSS feeds:", error);
    return [];
  }
};

export const saveRSSFeed = async (feed: RSSFeed) => {
  try {
    const feeds = await getRSSFeeds();
    const index = feeds.findIndex((f) => f.id === feed.id);

    if (index !== -1) {
      feeds[index] = feed;
    } else {
      feeds.push(feed);
    }

    await AsyncStorage.setItem(RSS_FEEDS_KEY, JSON.stringify(feeds));
  } catch (error) {
    console.error("Error saving RSS feed:", error);
  }
};

export const deleteRSSFeed = async (id: string) => {
  try {
    const feeds = await getRSSFeeds();
    const updatedFeeds = feeds.filter((feed) => feed.id !== id);
    await AsyncStorage.setItem(RSS_FEEDS_KEY, JSON.stringify(updatedFeeds));
  } catch (error) {
    console.error("Error deleting RSS feed:", error);
  }
};

export const saveCountry = async (country: Country) => {
  try {
    await AsyncStorage.setItem(COUNTRY_KEY, JSON.stringify(country));
  } catch (error) {
    console.error("Error saving country:", error);
  }
};

export const getCountry = async (): Promise<Country | null> => {
  try {
    const country = await AsyncStorage.getItem(COUNTRY_KEY);
    return country ? JSON.parse(country) : null;
  } catch (error) {
    console.error("Error getting country:", error);
    return null;
  }
};

export interface DailyProgress {
  [categoryId: string]: {
    read: number;
    completed: boolean;
    lastUpdated: string;
  };
}

export const getDailyProgress = async (): Promise<DailyProgress | null> => {
  try {
    const progress = await AsyncStorage.getItem("dailyProgress");
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error("Error getting daily progress:", error);
    return null;
  }
};

export const saveDailyProgress = async (
  progress: DailyProgress
): Promise<void> => {
  try {
    await AsyncStorage.setItem("dailyProgress", JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving daily progress:", error);
  }
};
