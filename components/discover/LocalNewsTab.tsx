import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import NewsList from "@/components/NewsList";
import { fetchAndParseFeeds } from "@/utils/rssParser";
import { localRssFeeds } from "@/constants/DiscoverRss";
import { Article, getCountry } from "@/utils/storage";
import { Country } from "@/constants/CountryList";

export default function LocalNewsTab() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userCountry, setUserCountry] = useState<Country | null>(null);

  const loadArticles = async (refresh = false) => {
    try {
      // Get user's country from storage
      const country = await getCountry();
      setUserCountry(country);

      if (!country) {
        setArticles([]);
        return;
      }

      // Filter RSS feeds for user's country
      const countryFeeds = localRssFeeds.filter(
        (feed) => feed.country === country.name
      );

      if (countryFeeds.length === 0) {
        setArticles([]);
        return;
      }

      const { articles: newArticles, hasMore: more } = await fetchAndParseFeeds(
        countryFeeds.map((feed) => feed.url)
      );

      // Sort articles by date
      const sortedArticles = newArticles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setArticles(sortedArticles);
      setHasMore(more);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  if (!userCountry) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Please select your country in settings
        </Text>
      </View>
    );
  }

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
        onArticleInView={() => {}}
        articlesLoading={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
});
