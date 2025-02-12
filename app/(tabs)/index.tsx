import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { getCategories } from "@/utils/storage";
import NewsList from "@/components/NewsList";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import { rssFeeds } from "@/constants/rssFeeds";
import { Article } from "@/utils/storage";
import { getCategoryNameById } from "@/constants/Categories";

const ITEMS_PER_PAGE = 10;

export default function TabOneScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

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

        const categoryNames = selectedCategories
          .map((id) => getCategoryNameById(id))
          .filter(Boolean) as string[];

        console.log("Mapped category names:", categoryNames);

        if (categoryNames.length === 0) {
          console.log("No category names mapped");
          return { articles: [], hasMore: false };
        }

        const categoryFeeds = rssFeeds.filter((feed) => {
          const matches = categoryNames.includes(feed.category.toLowerCase());
          console.log(`Feed ${feed.name}: ${matches ? "matches" : "no match"}`);
          return matches;
        });

        console.log("Found feeds:", categoryFeeds.length);

        if (categoryFeeds.length === 0) {
          setArticles([]);
          setHasMore(false);
          return { articles: [], hasMore: false };
        }
        const shuffledFeeds = categoryFeeds.sort(() => 0.5 - Math.random());

        const startIdx = (pageNum * ITEMS_PER_PAGE) % shuffledFeeds.length;
        const feedsForPage = shuffledFeeds.slice(
          startIdx,
          Math.min(startIdx + ITEMS_PER_PAGE, shuffledFeeds.length)
        );

        console.log(
          "Fetching feeds:",
          feedsForPage.map((f) => f.name)
        );

        const response = await fetchAndParseFeeds(
          feedsForPage.map((feed) => feed.url)
        );

        console.log("Fetched articles:", response.articles.length);

        if (!response.articles || response.articles.length === 0) {
          console.log("No articles returned");
          return { articles: [], hasMore: false };
        }

        const sortedArticles = response.articles.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );

        if (pageNum === 0) {
          setArticles(sortedArticles);
        } else {
          setArticles((prev) => [...prev, ...sortedArticles]);
        }

        const hasMoreItems =
          response.hasMore && pageNum * ITEMS_PER_PAGE < categoryFeeds.length;
        setHasMore(hasMoreItems);
        setPage(pageNum);

        return {
          articles: sortedArticles,
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
        onLoadMore={async () => {
          await loadArticles(page + 1);
        }}
        hasMore={hasMore}
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
});
