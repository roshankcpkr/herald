import React, { useCallback } from "react";
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

const NewsList: React.FC<NewsListProps> = ({
  articles,
  loading,
  refreshing,
  onRefresh,
  onLoadMore,
  onArticleInView,
  hasMore,
  articlesLoading,
}) => {
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const lastViewableIndex = viewableItems[viewableItems.length - 1].index;
        if (
          lastViewableIndex !== null &&
          lastViewableIndex >= articles.length - 2 &&
          hasMore
        ) {
          onLoadMore();
        }
      }
    },
    [articles.length, onLoadMore, hasMore]
  );

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
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={hasMore ? onLoadMore : undefined}
      onEndReachedThreshold={0.5}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
});

export default NewsList;
