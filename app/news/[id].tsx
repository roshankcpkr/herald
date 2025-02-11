import React, { useState, useEffect } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { getSavedArticles, Article } from "@/utils/storage";
import NewsCard from "@/components/NewsCard";
import Animated, { FadeIn } from "react-native-reanimated";

export default function NewsDetail() {
  const { id } = useLocalSearchParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function loadArticle() {
      const articles = await getSavedArticles();
      const found = articles.find((a) => a.id === id);
      if (found) setArticle(found);
    }
    loadArticle();
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          title: article?.source || "News",
          animation: "slide_from_right",
        }}
      />
      <Animated.ScrollView style={styles.container} entering={FadeIn}>
        {article && <NewsCard {...article} />}
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
