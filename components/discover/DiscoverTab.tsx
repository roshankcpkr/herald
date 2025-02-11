import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

type IconName = keyof typeof FontAwesome.glyphMap;

const menuItems = [
  {
    id: "categories",
    title: "Categories",
    description: "Browse news by your interests",
    icon: "th-large" as IconName,
    color: "#FF9500",
    route: "(discover)/categories",
  },
  {
    id: "local",
    title: "Local News",
    description: "Stay updated with your area",
    icon: "map-marker" as IconName,
    color: "#007AFF",
    route: "(discover)/local",
  },
  {
    id: "trending",
    title: "Trending",
    description: "Most popular stories now",
    icon: "line-chart" as IconName,
    color: "#32C759",
    route: "(discover)/trending",
  },
  {
    id: "interesting",
    title: "Interesting",
    description: "Curated content for you",
    icon: "lightbulb-o" as IconName,
    color: "#5856D6",
    route: "(discover)/interesting",
  },
];

export default function DiscoverTab() {
  const router = useRouter();

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <View style={styles.grid}>
        {menuItems.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 100)}
            style={styles.cardWrapper}
          >
            <Pressable
              style={[styles.card, { borderColor: item.color + "20" }]}
              onPress={() => handlePress(item.route)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <FontAwesome name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 34,
    fontFamily: "Rubik-Bold",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#666",
    lineHeight: 20,
  },
});
