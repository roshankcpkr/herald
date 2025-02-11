import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { getRSSFeeds, saveRSSFeed, deleteRSSFeed } from "@/utils/storage";
import RssFeedItem from "@/components/settings/RssFeedItem";
import AddRssModal from "@/components/settings/AddRssModal";
import EmptyState from "@/components/settings/EmptyState";
import { Colors } from "@/constants/Colors";

export type RssFeed = {
  id: string;
  url: string;
  name: string;
  category: string;
};

export default function RssManagerScreen() {
  const [feeds, setFeeds] = useState<RssFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFeed, setEditingFeed] = useState<RssFeed | null>(null);

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = async () => {
    try {
      const savedFeeds = await getRSSFeeds();
      setFeeds(savedFeeds || []);
    } catch (error) {
      console.error("Error loading RSS feeds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeed = async (feed: RssFeed) => {
    try {
      await saveRSSFeed(feed);
      setFeeds((prev) => [...prev, feed]);
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving RSS feed:", error);
    }
  };

  const handleEditFeed = async (feed: RssFeed) => {
    try {
      const updatedFeeds = feeds.map((f) => (f.id === feed.id ? feed : f));
      await saveRSSFeed(feed);
      setFeeds(updatedFeeds);
      setModalVisible(false);
      setEditingFeed(null);
    } catch (error) {
      console.error("Error updating RSS feed:", error);
    }
  };

  const handleDeleteFeed = async (id: string) => {
    try {
      await deleteRSSFeed(id);
      setFeeds((prev) => prev.filter((feed) => feed.id !== id));
    } catch (error) {
      console.error("Error deleting RSS feed:", error);
    }
  };

  const renderItem = ({ item, index }: { item: RssFeed; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100)}>
      <RssFeedItem
        feed={item}
        onEdit={() => {
          setEditingFeed(item);
          setModalVisible(true);
        }}
        onDelete={() => handleDeleteFeed(item.id)}
      />
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {feeds.length === 0 ? (
        <EmptyState
          icon="rss"
          title="No RSS Feeds"
          description="Add your custom RSS links to get personalized news"
          buttonText="Add RSS Feed"
          onPress={() => setModalVisible(true)}
        />
      ) : (
        <FlatList
          data={feeds}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>Your RSS Feeds</Text>
              <Pressable
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome name="plus" size={20} color="#fff" />
              </Pressable>
            </View>
          }
        />
      )}
      <AddRssModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingFeed(null);
        }}
        onSubmit={editingFeed ? handleEditFeed : handleAddFeed}
        editingFeed={editingFeed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    color: "#000",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
