import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  Article,
  getSavedArticles,
  removeMultipleArticles,
} from "@/utils/storage";
import SavedNewsModal from "@/components/SavedNewsModal";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
} from "react-native-reanimated";

export default function FavoritesScreen() {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [modalArticle, setModalArticle] = useState<Article | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSavedArticles();
  }, []);

  const loadSavedArticles = async () => {
    try {
      const articles = await getSavedArticles();
      setSavedArticles(articles);
    } catch (error) {
      console.error("Error loading saved articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSelected = async () => {
    await removeMultipleArticles(selectedArticles);
    setSelectedArticles([]);
    setIsSelectionMode(false);
    loadSavedArticles();
  };

  const toggleArticleSelection = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles((prev) =>
        prev.filter((articleId) => articleId !== id)
      );
    } else {
      setSelectedArticles((prev) => [...prev, id]);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSavedArticles();
    setRefreshing(false);
  }, []);

  const selectAll = () => {
    setSelectedArticles(savedArticles.map((article) => article.id));
    setIsSelectionMode(true);
  };

  const deselectAll = () => {
    setSelectedArticles([]);
  };

  const renderItem = ({ item }: { item: Article }) => (
    <Pressable
      style={[
        styles.articleItem,
        selectedArticles.includes(item.id) && styles.selectedItem,
      ]}
      onLongPress={() => {
        setIsSelectionMode(true);
        toggleArticleSelection(item.id);
      }}
      onPress={() => {
        if (isSelectionMode) {
          toggleArticleSelection(item.id);
        } else {
          setModalArticle(item);
        }
      }}
    >
      <Text style={styles.articleTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.articleSource}>{item.source}</Text>
    </Pressable>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {isSelectionMode && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutUp}
          style={styles.toolbar}
        >
          <Pressable
            style={styles.toolbarButton}
            onPress={
              selectedArticles.length === savedArticles.length
                ? deselectAll
                : selectAll
            }
          >
            <Text style={styles.toolbarText}>
              {selectedArticles.length === savedArticles.length
                ? "Deselect All"
                : "Select All"}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.toolbarButton, styles.deleteButton]}
            onPress={handleRemoveSelected}
          >
            <Text style={styles.toolbarText}>
              Remove ({selectedArticles.length})
            </Text>
          </Pressable>
        </Animated.View>
      )}

      <FlatList
        data={savedArticles}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 100)}
            layout={Layout.springify()}
          >
            {renderItem({ item })}
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <SavedNewsModal
        article={modalArticle}
        visible={!!modalArticle}
        onClose={() => setModalArticle(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
  },
  list: {
    padding: 15,
  },
  articleItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedItem: {
    backgroundColor: "#e3f2fd",
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 5,
  },
  articleSource: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
  toolbar: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  toolbarButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  toolbarText: {
    color: "#fff",
    fontFamily: "Rubik-Medium",
  },
});
