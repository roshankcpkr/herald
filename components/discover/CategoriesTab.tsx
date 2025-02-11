import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { getCategories, Article } from "@/utils/storage";
import NewsList from "@/components/NewsList";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { rssFeeds } from "@/constants/rssFeeds";
import {
  categories as categoryList,
  getCategoryNameById,
} from "@/constants/Categories";

const ITEMS_PER_PAGE = 5;

export default function CategoriesTab() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [categoryFeeds, setCategoryFeeds] = useState<typeof rssFeeds>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const savedCategories = await getCategories();
    setCategories(savedCategories);
    setSelectedCategories(savedCategories);

    // Pre-filter feeds based on categories
    const categoryNames = savedCategories
      .map((id) => getCategoryNameById(id))
      .filter(Boolean) as string[];

    const feeds = rssFeeds.filter((feed) =>
      categoryNames.includes(feed.category.toLowerCase())
    );
    setCategoryFeeds(feeds);

    // Load initial articles
    loadArticles(0, false, feeds);
  };

  const toggleCategorySelection = async (categoryId: string) => {
    const newSelected = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelected);

    // Update feeds and reload articles
    const categoryNames = newSelected
      .map((id) => getCategoryNameById(id))
      .filter(Boolean) as string[];

    const feeds = rssFeeds.filter((feed) =>
      categoryNames.includes(feed.category.toLowerCase())
    );
    setCategoryFeeds(feeds);
    setPage(0);
    setArticles([]);
    loadArticles(0, true, feeds);
  };

  const loadArticles = async (
    pageNum: number,
    refresh = false,
    feeds = categoryFeeds
  ) => {
    try {
      setLoading(true);

      // If no categories are selected, clear articles and return
      if (selectedCategories.length === 0) {
        setArticles([]);
        setHasMore(false);
        return;
      }

      const startIdx = pageNum * ITEMS_PER_PAGE;
      const feedsForPage = feeds.slice(startIdx, startIdx + ITEMS_PER_PAGE);

      if (feedsForPage.length === 0) {
        setHasMore(false);
        return;
      }

      const { articles: newArticles } = await fetchAndParseFeeds(
        feedsForPage.map((feed) => feed.url)
      );

      if (pageNum === 0 || refresh) {
        setArticles(newArticles);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }

      setHasMore(startIdx + ITEMS_PER_PAGE < feeds.length);
      setPage(pageNum);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
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
            <Text style={styles.modalTitle}>Filter Categories</Text>
            <Pressable onPress={() => setShowFilterModal(false)}>
              <FontAwesome name="times" size={24} color="#666" />
            </Pressable>
          </View>
          <ScrollView style={styles.categoriesList}>
            {categoryList.map((category) => (
              <Pressable
                key={category.id}
                style={styles.categoryItem}
                onPress={() => toggleCategorySelection(category.id)}
              >
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
                <FontAwesome
                  name={
                    selectedCategories.includes(category.id)
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <FontAwesome name="filter" size={20} color="#007AFF" />
          <Text style={styles.filterText}>
            {selectedCategories.length}/{categories.length}
          </Text>
        </Pressable>
      </View>
      <NewsList
        articles={articles}
        loading={loading}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          setPage(0);
          await loadArticles(0, true);
        }}
        onLoadMore={async () => {
          if (!loading && hasMore) {
            await loadArticles(page + 1);
          }
        }}
        hasMore={hasMore}
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
  categoriesList: {
    padding: 16,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  categoryInfo: {
    flex: 1,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#666",
  },
});
