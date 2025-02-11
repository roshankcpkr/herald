import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

interface EmptyStateProps {
  icon: keyof typeof FontAwesome.glyphMap;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onPress,
}: EmptyStateProps) {
  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={icon} size={40} color="#007AFF" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.tabIconSelected,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
});
