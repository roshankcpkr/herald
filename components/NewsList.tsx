import React, { useCallback, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  RefreshControl,
  Dimensions,
  ViewToken,
} from "react-native";
import NewsCard from "@/components/NewsCard";
import { Article } from "@/utils/storage";

interface NewsListProps {
  articles: Article[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
  onArticleInView: (index: number) => void;
  hasMore: boolean;
  articlesLoading: { [key: string]: boolean };
}

export default function NewsList({
  articles,
  loading,
  refreshing,
  onRefresh,
  onLoadMore,
  hasMore,
  articlesLoading,
}: NewsListProps) {
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    await onLoadMore();
    setLoadingMore(false);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  if (loading && articles.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <NewsCard {...item} />}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
});
