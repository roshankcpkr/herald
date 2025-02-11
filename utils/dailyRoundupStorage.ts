import AsyncStorage from "@react-native-async-storage/async-storage";
import { Article } from "./storage";

interface DailyProgress {
  date: string;
  categories: {
    [categoryId: string]: {
      articles: Article[];
      readArticles: string[];
      lastUpdated: string;
      totalRead: number; // Track total articles read
      currentIndex: number;
    };
  };
}

const STORAGE_KEY = "daily_roundup_progress";
const MAX_ARTICLES = 10;

export const getDailyProgress = async (): Promise<DailyProgress> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return createNewDailyProgress();

    const progress: DailyProgress = JSON.parse(stored);
    if (shouldReset(progress)) {
      return createNewDailyProgress();
    }

    return progress;
  } catch (error) {
    console.error("Error getting daily progress:", error);
    return createNewDailyProgress();
  }
};

export const saveDailyProgress = async (progress: DailyProgress) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error saving daily progress:", error);
  }
};

export const markArticleAsRead = async (
  categoryId: string,
  articleId: string
): Promise<{ success: boolean; totalRead: number }> => {
  try {
    const progress = await getDailyProgress();
    const category = progress.categories[categoryId];

    if (!category || category.totalRead >= MAX_ARTICLES) {
      return { success: false, totalRead: category?.totalRead || 0 };
    }

    if (!category.readArticles.includes(articleId)) {
      category.readArticles.push(articleId);
      category.totalRead = (category.totalRead || 0) + 1;
      await saveDailyProgress(progress);
    }

    return {
      success: true,
      totalRead: category.totalRead,
    };
  } catch (error) {
    console.error("Error marking article as read:", error);
    return { success: false, totalRead: 0 };
  }
};

export const getCategoryProgress = async (
  categoryId: string
): Promise<{
  readCount: number;
  isLimitReached: boolean;
}> => {
  try {
    const progress = await getDailyProgress();
    const category = progress.categories[categoryId];
    return {
      readCount: category?.totalRead || 0,
      isLimitReached: (category?.totalRead || 0) >= MAX_ARTICLES,
    };
  } catch (error) {
    console.error("Error getting category progress:", error);
    return { readCount: 0, isLimitReached: false };
  }
};

const shouldReset = (progress: DailyProgress): boolean => {
  const lastUpdate = new Date(
    Object.values(progress.categories)[0]?.lastUpdated || 0
  );
  const now = new Date();
  const hoursSinceUpdate =
    (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
  return hoursSinceUpdate >= 12 || progress.date !== getTodayDate();
};

const createNewDailyProgress = (): DailyProgress => ({
  date: getTodayDate(),
  categories: {},
});

const getTodayDate = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

export const getCategoryState = async (categoryId: string) => {
  try {
    const progress = await getDailyProgress();
    const category = progress.categories[categoryId];
    return {
      readArticles: category?.readArticles || [],
      currentIndex: category?.currentIndex || 0,
      totalRead: category?.totalRead || 0,
    };
  } catch (error) {
    console.error("Error getting category state:", error);
    return { readArticles: [], currentIndex: 0, totalRead: 0 };
  }
};

export { MAX_ARTICLES };
