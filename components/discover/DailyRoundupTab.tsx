import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { getCategories, Article } from "@/utils/storage";
import { fetchAndParseFeeds } from "@/utils/feedParser";
import { categories, getCategoryNameById } from "@/constants/Categories";
import { rssFeeds } from "@/constants/rssFeeds";
import NewsCard from "@/components/NewsCard";
import ConfettiCannon from "react-native-confetti-cannon";

const MAX_ARTICLES = 10;

interface CategoryProgress {
  name: string;
  read: number;
  total: number;
  completed: boolean;
  articles: Article[];
}

const ProgressBar = ({
  progress,
  color,
  width,
}: {
  progress: number;
  color: string;
  width: number;
}) => (
  <View
    style={{ width, height: 4, backgroundColor: "#f0f0f0", borderRadius: 2 }}
  >
    <View
      style={{
        width: `${progress * 100}%`,
        height: "100%",
        backgroundColor: color,
        borderRadius: 2,
      }}
    />
  </View>
);

export default function DailyRoundupTab() {
  const [progress, setProgress] = useState<CategoryProgress[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFloatingIcon, setShowFloatingIcon] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const savedCategories = await getCategories();
      const categoryNames = savedCategories
        .map(getCategoryNameById)
        .filter((name): name is string => name !== undefined);

      const progressPromises = categoryNames.map(async (name) => {
        const categoryFeeds = rssFeeds.filter(
          (feed) => feed.category.toLowerCase() === name.toLowerCase()
        );
        const { articles } = await fetchAndParseFeeds(
          categoryFeeds.map((feed) => feed.url)
        );

        return {
          name,
          read: 0,
          total: MAX_ARTICLES,
          completed: false,
          articles: articles.slice(0, MAX_ARTICLES),
        };
      });

      const initialProgress = await Promise.all(progressPromises);
      setProgress(initialProgress);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleArticleRead = () => {
    if (!selectedCategory) return;

    setShowFloatingIcon(true);
    setTimeout(() => setShowFloatingIcon(false), 1500);

    setProgress((prev) =>
      prev.map((cat) => {
        if (cat.name === selectedCategory) {
          const newRead = cat.read + 1;
          const completed = newRead >= cat.total;
          if (completed && !cat.completed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
          return { ...cat, read: newRead, completed };
        }
        return cat;
      })
    );

    const category = progress.find((cat) => cat.name === selectedCategory);
    if (category && currentArticleIndex < category.articles.length - 1) {
      setCurrentArticleIndex((prev) => prev + 1);
    }
  };

  if (selectedCategory) {
    const category = progress.find((cat) => cat.name === selectedCategory);
    if (!category) return null;

    return (
      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            setSelectedCategory(null);
            setCurrentArticleIndex(0);
          }}
        >
          <FontAwesome name="arrow-left" size={24} color="#007AFF" />
        </Pressable>

        <NewsCard
          {...category.articles[currentArticleIndex]}
          onFinish={handleArticleRead}
        />

        {showFloatingIcon && (
          <Animated.View entering={FadeIn} style={styles.floatingIcon}>
            <FontAwesome name="check-circle" size={40} color="#32C759" />
          </Animated.View>
        )}

        {showConfetti && (
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            autoStart={true}
            fadeOut={true}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Roundup</Text>
      <ScrollView style={styles.categoriesList}>
        {progress.map((category, index) => (
          <Animated.View
            key={category.name}
            entering={FadeInDown.delay(index * 100)}
          >
            <Pressable
              style={[
                styles.categoryCard,
                category.completed && styles.completedCard,
              ]}
              onPress={() => {
                setSelectedCategory(category.name);
                setCurrentArticleIndex(0);
              }}
            >
              <View style={styles.categoryIcon}>
                <FontAwesome
                  name="newspaper-o"
                  size={24}
                  color={category.completed ? "#32C759" : "#007AFF"}
                />
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <ProgressBar
                  progress={category.read / category.total}
                  width={200}
                  color={category.completed ? "#32C759" : "#007AFF"}
                />
                <Text style={styles.progressText}>
                  {category.read}/{category.total} articles read
                </Text>
              </View>
              {category.completed && (
                <FontAwesome name="check-circle" size={24} color="#32C759" />
              )}
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 34,
    fontFamily: "Rubik-Bold",
    padding: 16,
  },
  progressBar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoriesList: {
    padding: 16,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedCard: {
    borderColor: "#32C759",
    backgroundColor: "#32C75910",
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#007AFF20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
    gap: 8,
  },
  categoryName: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  progressText: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#666",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});
