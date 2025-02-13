import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
  Button,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { getRSSFeeds } from "@/utils/storage";
import { fetchAndParseFeeds } from "@/utils/rssParser";
import NewsList from "@/components/NewsList";
import EmptyState from "@/components/settings/EmptyState";
import { Article } from "@/utils/storage";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { customRssFeeds } from "@/constants/DiscoverRss";
import { router, useFocusEffect } from "expo-router";
import { RssFeed } from "@/app/settings/rss-manager";

export default function CustomRSSTab() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [feeds, setFeeds] = useState<RssFeed[]>([]);
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    loadFeeds();
  }, []);

  useEffect(() => {
    if (selectedFeeds.length > 0) {
      loadArticles(feeds);
    }
  }, [selectedFeeds, feeds]);

  // Refresh when tab is focused
  useFocusEffect(
    useCallback(() => {
      console.log("📱 Tab focused, refreshing feeds...");
      loadFeeds();
    }, [])
  );

  const loadFeeds = async () => {
    try {
      setLoading(true);
      const savedFeeds = await getRSSFeeds();
      console.log("📱 Loaded RSS feeds:", savedFeeds);
      setFeeds(savedFeeds);
      setSelectedFeeds(savedFeeds.map((feed) => feed.id));

      if (savedFeeds.length > 0) {
        await loadArticles(savedFeeds);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error loading feeds:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadArticles = async (currentFeeds: RssFeed[]) => {
    try {
      const feedUrls = currentFeeds.map((feed) => feed.url);
      console.log("🔄 Fetching articles from URLs:", feedUrls);

      const response = await fetchAndParseFeeds(feedUrls);
      console.log("📚 Fetched articles count:", response.articles);

      // Sort articles by date
      const sortedArticles = response.articles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setArticles(sortedArticles);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error("Error loading articles:", error);
    }
  };

  const handleRefresh = useCallback(async () => {
    console.log("🔄 Manual refresh triggered");
    setRefreshing(true);
    await loadFeeds();
  }, []);

  const handleLoadMore = async () => {
    // Implement pagination if needed
    console.log("Loading more articles...");
  };

  const toggleFeedSelection = (feedId: string) => {
    setSelectedFeeds((prev) => {
      if (prev.includes(feedId)) {
        return prev.filter((id) => id !== feedId);
      }
      return [...prev, feedId];
    });
  };

  const handleGoToSettings = () => {
    router.push("/settings/rss-manager");
  };

  const renderFilterModal = () => (
    <Modal
      visible={showFilterModal}
      animationType="slide"
      transparent
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalContainer}>
        <Animated.View entering={FadeIn} style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter RSS Feeds</Text>
            <Pressable onPress={() => setShowFilterModal(false)}>
              <FontAwesome name="times" size={24} color="#666" />
            </Pressable>
          </View>
          <ScrollView style={styles.feedsList}>
            {feeds.map((feed) => (
              <Pressable
                key={feed.id}
                style={styles.feedItem}
                onPress={() => toggleFeedSelection(feed.id)}
              >
                <View style={styles.feedInfo}>
                  <Text style={styles.feedName}>{feed.name}</Text>
                  <Text style={styles.feedCategory}>{feed.category}</Text>
                </View>
                <FontAwesome
                  name={
                    selectedFeeds.includes(feed.id)
                      ? "check-square-o"
                      : "square-o"
                  }
                  size={24}
                  color="#007AFF"
                />
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (feeds.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No RSS feeds added yet</Text>
        <Button
          title="Go to RSS Manager to add feeds"
          onPress={handleGoToSettings}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RSS Feeds</Text>
        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <FontAwesome name="filter" size={20} color="#007AFF" />
          <Text style={styles.filterText}>
            {selectedFeeds.length}/{feeds.length}
          </Text>
        </Pressable>
      </View>
      <NewsList
        articles={articles}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        onArticleInView={() => {}}
        articlesLoading={{}}
      />
      {renderFilterModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#007AFF20",
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Rubik-Medium",
    color: "#007AFF",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
  },
  feedsList: {
    padding: 16,
  },
  feedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  feedInfo: {
    flex: 1,
    marginRight: 16,
  },
  feedName: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 4,
  },
  feedCategory: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
