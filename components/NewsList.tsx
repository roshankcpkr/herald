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
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  loadThreshold?: number;
}

export default function NewsList({
  articles,
  loading,
  refreshing,
  onRefresh,
  onLoadMore,
  hasMore,
  loadThreshold = 3,
}: NewsListProps) {
  const renderItem = ({ item }: { item: Article }) => <NewsCard {...item} />;

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (!viewableItems.length) return;

      const lastVisibleIndex =
        viewableItems[viewableItems.length - 1].index ?? -1;
      if (lastVisibleIndex === -1) return;

      if (lastVisibleIndex >= articles.length - loadThreshold) {
        onLoadMore();
      }
    },
    [articles.length, loadThreshold, onLoadMore]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  };

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={
        loading && !refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : null
      }
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={Dimensions.get("window").height - 150}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={handleViewableItemsChanged}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    padding: 20,
    alignItems: "center",
  },
});
