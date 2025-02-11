import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import NewsCard from "@/components/NewsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeIn } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import { Article } from "@/utils/storage";

export default function RoundupDetail() {
  const { id, name } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<Article[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadNews();
    checkCompletion();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      // Map category IDs to actual categories
      const categoryMap: Record<string, string> = {
        "1": "technology",
        "2": "startup",
        "3": "business",
      };

      const category = categoryMap[id as string] || "technology";
      const { articles } = await fetchAndParseFeeds([category], 0, 10); // Get top 10 articles
      setNews(articles);
    } catch (error) {
      console.error("Error loading roundup news:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkCompletion = async () => {
    const date = new Date().toDateString();
    const status = await AsyncStorage.getItem(`@roundup_${date}`);
    if (status) {
      const completedCategories = JSON.parse(status);
      setCompleted(completedCategories.includes(id));
    }
  };

  const markAsComplete = async () => {
    try {
      const date = new Date().toDateString();
      const status = await AsyncStorage.getItem(`@roundup_${date}`);
      let completedCategories = status ? JSON.parse(status) : [];

      if (!completedCategories.includes(id)) {
        completedCategories.push(id);
        await AsyncStorage.setItem(
          `@roundup_${date}`,
          JSON.stringify(completedCategories)
        );
      }

      setCompleted(true);
    } catch (error) {
      console.error("Error marking roundup as complete:", error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: name as string,
          headerRight: () =>
            completed ? (
              <FontAwesome name="check-circle" size={24} color="#32C759" />
            ) : null,
        }}
      />

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color="#007AFF"
            size="large"
          />
        ) : (
          <FlatList
            data={news}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeIn.delay(index * 100)}>
                <NewsCard {...item} />
              </Animated.View>
            )}
            keyExtractor={(item) => item.id}
            onEndReached={markAsComplete}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    alignSelf: "center",
  },
  list: {
    padding: 15,
  },
});
