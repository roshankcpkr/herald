import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RssFeed } from "@/app/settings/rss-manager";

interface RssFeedItemProps {
  feed: RssFeed;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RssFeedItem({
  feed,
  onEdit,
  onDelete,
}: RssFeedItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{feed.name}</Text>
        <Text style={styles.url}>{feed.url}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{feed.category}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onEdit} style={styles.actionButton} hitSlop={10}>
          <FontAwesome name="pencil" size={16} color="#007AFF" />
        </Pressable>
        <Pressable onPress={onDelete} style={styles.actionButton} hitSlop={10}>
          <FontAwesome name="trash" size={16} color="#FF3B30" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 4,
  },
  url: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Regular",
    marginBottom: 8,
  },
  categoryContainer: {
    backgroundColor: "#007AFF20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  category: {
    fontSize: 12,
    color: "#007AFF",
    fontFamily: "Rubik-Medium",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
});
