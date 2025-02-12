import { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";
import { getCategories } from "@/utils/storage";
import NewsList from "@/components/NewsList";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import { rssFeeds } from "@/constants/rssFeeds";
import { Article } from "@/utils/storage";
import { getCategoryNameById } from "@/constants/Categories";
import { getSummary } from "@/utils/summary";

const ITEMS_PER_PAGE = 10;
const INITIAL_LOAD = 5;
const PRELOAD_THRESHOLD = 3;
const NEXT_BATCH_SIZE = 5;

export default function TabOneScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadedArticles, setPreloadedArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    loadSelectedCategories();
  }, []);

  const loadSelectedCategories = async () => {
    try {
      const categories = await getCategories();
      if (categories && categories.length > 0) {
        console.log("Loaded categories:", categories);
        setSelectedCategories(categories);
      } else {
        console.log("No categories found");
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadArticles = useCallback(
    async (pageNum: number, isRefreshing = false) => {
      try {
        if (!isRefreshing) {
          setLoading(true);
        }

        console.log(`📚 Loading articles batch: ${pageNum}`);

        const categoryNames = selectedCategories
          .map((id) => getCategoryNameById(id))
          .filter(Boolean) as string[];

        if (categoryNames.length === 0) {
          return { articles: [], hasMore: false };
        }

        const categoryFeeds = rssFeeds.filter((feed) =>
          categoryNames.includes(feed.category.toLowerCase())
        );

        const batchSize = pageNum === 0 ? INITIAL_LOAD : 1; // Load 5 initially, then 1 by 1
        const startIdx = pageNum === 0 ? 0 : INITIAL_LOAD + (pageNum - 1);
        const feedsForPage = categoryFeeds.slice(
          startIdx,
          startIdx + batchSize
        );

        const response = await fetchAndParseFeeds(
          feedsForPage.map((feed) => feed.url)
        );

        if (!response.articles || response.articles.length === 0) {
          return { articles: [], hasMore: false };
        }

        // Create a Map to track unique articles by URL
        const uniqueArticles = new Map();

        for (const article of response.articles) {
          // Skip if we already have this article (checking by URL)
          if (uniqueArticles.has(article.sourceUrl)) continue;

          try {
            setArticlesLoading((prev) => ({ ...prev, [article.id]: true }));
            const summary = await getSummary(article.description);

            const processedArticle = {
              ...article,
              summary,
              id: `${article.id}-${Date.now()}`,
            };

            // Store in Map to prevent duplicates
            uniqueArticles.set(article.sourceUrl, processedArticle);

            setArticlesLoading((prev) => ({ ...prev, [article.id]: false }));

            // Update articles state with unique articles only
            setArticles((prev) => {
              // Check if article already exists in current state
              const exists = prev.some(
                (a) => a.sourceUrl === article.sourceUrl
              );
              if (exists) return prev;
              return [...prev, processedArticle];
            });
          } catch (error) {
            console.error("Error processing article:", error);
            continue;
          }
        }

        console.log(`✅ Completed loading batch: ${pageNum}`);

        const hasMoreItems = startIdx + batchSize < categoryFeeds.length;
        setHasMore(hasMoreItems);
        setPage(pageNum);

        return {
          articles: Array.from(uniqueArticles.values()),
          hasMore: hasMoreItems,
        };
      } catch (error) {
        console.error("Error loading articles:", error);
        return { articles: [], hasMore: false };
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [selectedCategories]
  );

  useEffect(() => {
    if (selectedCategories.length > 0) {
      loadArticles(0);
    }
  }, [selectedCategories, loadArticles]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0);
    try {
      setArticles([]);
      await loadArticles(0, true);
      console.log("Articles:", articles);
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  }, [loadArticles]);

  // Add preloading logic
  const preloadNextBatch = useCallback(async () => {
    if (isPreloading || !hasMore) return;

    setIsPreloading(true);
    try {
      const result = await loadArticles(page + 1);
      if (result?.articles) {
        setPreloadedArticles(result.articles);
      }
    } catch (error) {
      console.error("Error preloading articles:", error);
    } finally {
      setIsPreloading(false);
    }
  }, [isPreloading, hasMore, page, loadArticles]);

  // Monitor current article index for preloading
  const handleArticleInView = useCallback(
    (index: number) => {
      if (index >= articles.length - PRELOAD_THRESHOLD) {
        preloadNextBatch();
      }
    },
    [articles.length, preloadNextBatch]
  );

  if (loading && articles.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NewsList
        articles={articles}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onArticleInView={handleArticleInView}
        onLoadMore={async () => {
          if (preloadedArticles.length > 0) {
            setArticles((prev) => [...prev, ...preloadedArticles]);
            setPreloadedArticles([]);
            setPage((prev) => prev + 1);
          } else {
            await loadArticles(page + 1);
          }
        }}
        hasMore={hasMore}
        articlesLoading={articlesLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  footerText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
});
