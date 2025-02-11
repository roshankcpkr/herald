import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NewsList from "@/components/NewsList";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import { trendingRssFeeds } from "@/constants/DiscoverRss";
import { Article } from "@/utils/storage";

export default function TrendingTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadArticles = async (refresh = false) => {
    try {
      const { articles: newArticles, hasMore: more } = await fetchAndParseFeeds(
        trendingRssFeeds.map((feed) => feed.url)
      );
      setArticles(newArticles);
      setHasMore(more);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <View style={styles.container}>
      <NewsList
        articles={articles}
        loading={loading}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadArticles(true);
        }}
        onLoadMore={async () => await loadArticles()}
        hasMore={hasMore}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
