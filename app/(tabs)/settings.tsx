import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { processRssFeed } from "@/utils/fetchRawRssFeed";

type SettingItem = {
  icon: keyof typeof FontAwesome.glyphMap;
  title: string;
  description: string;
  action: () => void;
  color?: string;
};

export default function SettingsScreen() {
  const router = useRouter();

  const settingItems: SettingItem[] = [
    {
      icon: "globe" as const,
      title: "Country",
      description: "Change your location",
      action: () => router.push("/settings/country"),
      color: "#FF9500",
    },
    {
      icon: "feed" as const,
      title: "RSS Feeds",
      description: "Manage your custom RSS feed sources",
      action: () => router.push("/settings/rss-manager"),
      color: "#007AFF",
    },
    {
      icon: "tag" as const,
      title: "Categories",
      description: "Update your news categories",
      action: () => router.push("/settings/categories"),
      color: "#32C759",
    },
    {
      icon: "info" as const,
      title: "About",
      description: "Learn more about Herald AI",
      action: () => router.push("/settings/about"),
      color: "#5856D6",
    },
    {
      icon: "lock" as const,
      title: "Privacy Policy",
      description: "Read our privacy policy",
      action: () => router.push("/settings/privacy"),
      color: "#FF2D55",
    },
    {
      icon: "file-text" as const,
      title: "Terms of Use",
      description: "View terms and conditions",
      action: () => router.push("/settings/terms"),
      color: "#FF2D55",
    },
  ];

  const renderSettingItem = (item: SettingItem, index: number) => (
    <Animated.View entering={FadeInDown.delay(index * 100)} key={item.title}>
      <Pressable
        style={styles.settingItem}
        onPress={item.action}
        android_ripple={{ color: "#eee" }}
      >
        <View
          style={[styles.iconContainer, { backgroundColor: item.color + "20" }]}
        >
          <FontAwesome name={item.icon} size={20} color={item.color} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#999" />
      </Pressable>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Settings</Text>
      {settingItems.map((item, index) => renderSettingItem(item, index))}
      <Text style={styles.version}>Herald AI - Version 1.0.0</Text>
      <Text style={styles.version}>Powered by Bingo Labs Pvt Ltd</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Rubik-Regular",
  },
  version: {
    textAlign: "center",
    color: "#999",
    marginTop: 10,
    fontFamily: "Rubik-Regular",
  },
});
