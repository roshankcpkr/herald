import React, { useState, useEffect, useCallback } from "react";
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
  Modal,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
const SUMMARY_MAX_LINES = 3;

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);

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
    Linking.openURL(props.sourceUrl).catch((err) =>
      console.error("Error opening link:", err)
    );
  };

  const onTextLayout = useCallback(
    (e: { nativeEvent: { lines: any[] } }) => {
      if (!isExpanded) {
        setTextHeight(
          e.nativeEvent.lines
            .slice(0, SUMMARY_MAX_LINES)
            .reduce((total, line) => total + line.height, 0)
        );
        setMaxHeight(
          e.nativeEvent.lines.reduce((total, line) => total + line.height, 0)
        );
      }
    },
    [isExpanded]
  );

  const shouldShowReadMore = maxHeight > textHeight;

  console.log("🎯 Rendering article:", {
    id: props.id,
    hasTitle: !!props.title,
    hasDescription: !!props.description,
    hasSummary: !!(
      props.description?.includes("Summary") || props.description?.length < 100
    ),
    descriptionLength: props.description?.length,
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.source}>{props.source}</Text>
          <View style={styles.headerRight}>
            <Text style={styles.category}>{props.category}</Text>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <FontAwesome
                name={isSaved ? "bookmark" : "bookmark-o"}
                size={20}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleOpenLink}>
          <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>

        {props.imageUrl && (
          <>
            <Pressable onPress={() => setImageModalVisible(true)}>
              <Image
                source={{ uri: props.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>

            <Modal
              animationType="fade"
              transparent={true}
              visible={imageModalVisible}
              onRequestClose={() => setImageModalVisible(false)}
            >
              <Pressable
                style={styles.modalView}
                onPress={() => setImageModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setImageModalVisible(false)}
                >
                  <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Image
                  source={{ uri: props.imageUrl }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
              </Pressable>
            </Modal>
          </>
        )}

        <View style={styles.contentContainer}>
          <Text
            style={[styles.summary, !isExpanded && { height: textHeight }]}
            numberOfLines={isExpanded ? undefined : SUMMARY_MAX_LINES}
            onTextLayout={onTextLayout}
          >
            {props.description?.trim() || "No summary available"}
          </Text>

          {maxHeight > textHeight && (
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {isExpanded ? "Show less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.date}>
            {new Date(props.publishedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  source: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  category: {
    fontSize: 12,
    color: "#007AFF",
    backgroundColor: "#E8F2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    padding: 12,
    lineHeight: 24,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 12,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 12,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  saveButton: {
    padding: 8,
  },
});
