import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Linking,
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
import { formatDistanceToNow } from "date-fns";
import TextToSpeech from "./news/TextToSpeech";
import { Colors } from "@/constants/Colors";

const { width, height } = Dimensions.get("window");

interface NewsCardProps extends Article {
  onFinish?: () => void;
  animated?: boolean;
  isRead?: boolean;
}

export default function NewsCard({
  onFinish,
  animated,
  ...props
}: NewsCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    checkSavedStatus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 30000);
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

  const renderContent = () => {
    if (props.summary) {
      return <Text style={styles.summary}>{props.summary}</Text>;
    }
    return <Text style={styles.summary}>{props.description}</Text>;
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{props.source}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.date}>
              {formatDistanceToNow(new Date(props.publishedAt), {
                addSuffix: true,
              })}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.category}>{props.category}</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          {props.imageUrl && (
            <Pressable onPress={() => setImageModalVisible(true)}>
              <Image
                source={{ uri: props.imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>
          )}

          <TouchableOpacity onPress={handleOpenLink}>
            <Text style={styles.title}>{props.title}</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>{renderContent()}</View>
        </View>

        <View style={styles.footer}>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
              <FontAwesome
                name={isSaved ? "bookmark" : "bookmark-o"}
                size={20}
                color="#007AFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleOpenLink}
              style={styles.actionButton}
            >
              <FontAwesome name="external-link" size={20} color="#007AFF" />
            </TouchableOpacity>

            <TextToSpeech text={props.summary || props.description} />
          </View>
        </View>

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
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  source: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Medium",
  },
  dot: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
  mainContent: {
    padding: 12,
  },
  category: {
    fontSize: 12,
    color: "#007AFF",
    backgroundColor: "#E8F2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontFamily: "Rubik-Medium",
  },
  title: {
    fontSize: 18,
    color: "#333",
    marginVertical: 12,
    lineHeight: 24,
    fontFamily: "Rubik-SemiBold",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 12,
  },
  contentContainer: {
    marginTop: 8,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    fontFamily: "Rubik-Regular",
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    padding: 8,
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
});
