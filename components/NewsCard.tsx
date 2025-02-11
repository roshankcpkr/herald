import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
  Linking,
  Share,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  Article,
  saveArticle,
  removeArticle,
  isArticleSaved,
} from "@/utils/storage";
import Animated, { FadeInDown } from "react-native-reanimated";
import { formatDistanceToNow } from "date-fns";
import TextToSpeech from "./news/TextToSpeech";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = Platform.OS === "ios" ? 90 : 70;
const SCREEN_HEIGHT = height - TAB_BAR_HEIGHT;
const SCREEN_WIDTH = width;
interface NewsCardProps extends Article {
  onFinish?: () => void;
  fetchNews?: (
    page: number
  ) => Promise<{ articles: Article[]; hasMore: boolean }>;
  animated?: boolean;
  isRead?: boolean;
}

export default function NewsCard({
  onFinish,
  fetchNews,
  animated,
  ...props
}: NewsCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    checkSavedStatus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 30000); // Mark as read after 30 seconds

    return () => clearTimeout(timer);
  }, [props.id]);

  const checkSavedStatus = async () => {
    const saved = await isArticleSaved(props.id);
    setIsSaved(saved);
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await removeArticle(props.id);
      } else {
        await saveArticle({
          id: props.id,
          title: props.title,
          description: props.description,
          imageUrl: props.imageUrl,
          sourceUrl: props.sourceUrl,
          source: props.source,
          publishedAt: props.publishedAt,
          category: props.category,
        });
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error handling save:", error);
    }
  };

  const handleOpenLink = () => {
    Linking.openURL(props.sourceUrl);
  };

  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <Image
        source={
          props.imageUrl
            ? { uri: props.imageUrl }
            : require("@/assets/images/white-gradient.png")
        }
        style={styles.image}
      />
      <View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text
              style={styles.description}
              numberOfLines={expanded ? undefined : 3}
            >
              {props.description}
            </Text>
            <View style={styles.textToSpeechContainer}>
              <TextToSpeech text={props.description} />
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.sourceInfo}>
              <Text style={styles.source}>{props.source}</Text>
              <Text style={styles.date}>
                {formatDistanceToNow(new Date(props.publishedAt), {
                  addSuffix: true,
                })}
              </Text>
            </View>
            <View style={styles.actions}>
              <Pressable
                onPress={handleSave}
                style={styles.actionButton}
                hitSlop={15}
              >
                <FontAwesome
                  name={isSaved ? "bookmark" : "bookmark-o"}
                  size={18}
                  color={Colors.tabIconSelected}
                />
              </Pressable>
              <Pressable
                onPress={handleOpenLink}
                style={styles.actionButton}
                hitSlop={15}
              >
                <FontAwesome name="external-link" size={18} color="#666" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: SCREEN_HEIGHT,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingVertical: 20,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 200,
    overflow: "hidden",
    borderColor: "#000",
    resizeMode: "cover",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    color: Colors.darkGrey,
    marginBottom: 12,
  },
  descriptionContainer: {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.darkGrey,
    fontFamily: "Rubik-Regular",
    marginBottom: 20,
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
  },
  sourceInfo: {
    flex: 1,
  },
  source: {
    fontSize: 14,
    color: Colors.darkGrey,
    fontFamily: "Rubik-Medium",
    opacity: 0.9,
  },
  date: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Rubik-Regular",
    opacity: 0.8,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    padding: 8,
  },
  textToSpeechContainer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
