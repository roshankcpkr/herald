import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}

export default function SettingsMenuItem({
  icon,
  title,
  subtitle,
  onPress,
}: SettingsMenuItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#999" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: "#666",
    marginTop: 2,
  },
});
