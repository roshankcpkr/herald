import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { getRSSFeeds, RSSFeed } from "@/utils/storage";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import NewsList from "@/components/NewsList";
import EmptyState from "@/components/settings/EmptyState";
import { Article } from "@/utils/storage";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { customRssFeeds } from "@/constants/DiscoverRss";

export default function CustomRSSTab() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [feeds, setFeeds] = useState<RSSFeed[]>([]);
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    loadFeeds();
  }, []);

  useEffect(() => {
    if (selectedFeeds.length > 0) {
      loadArticles(false);
    }
  }, [selectedFeeds]);

  const loadFeeds = async () => {
    const savedFeeds = await getRSSFeeds();
    setFeeds(savedFeeds);
    setSelectedFeeds(savedFeeds.map((feed) => feed.id));
    await loadArticles(false);
  };

  const loadArticles = async (refresh = false) => {
    try {
      const { articles: newArticles, hasMore: more } = await fetchAndParseFeeds(
        customRssFeeds.map((feed) => feed.url)
      );

      const processedArticles = newArticles.map((article) => ({
        ...article,
        description: article.description,
      }));

      setArticles(processedArticles);
      setHasMore(more);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadArticles(true);
  };

  const handleLoadMore = async () => {
    if (!hasMore || loading) return;
    await loadArticles();
  };

  const toggleFeedSelection = (feedId: string) => {
    setSelectedFeeds((prev) => {
      if (prev.includes(feedId)) {
        return prev.filter((id) => id !== feedId);
      }
      return [...prev, feedId];
    });
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

  if (loading && articles.length === 0) {
    return null;
  }

  if (feeds.length === 0) {
    return (
      <EmptyState
        icon="rss"
        title="No RSS Feeds"
        description="Add custom RSS feeds in settings to see news here"
        buttonText="Go to Settings"
        onPress={() => {}}
      />
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
});
