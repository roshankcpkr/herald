import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface CategoryItemProps {
  category: {
    id: string;
    name: string;
  };
  selected: boolean;
  onToggle: () => void;
}

export default function CategoryItem({
  category,
  selected,
  onToggle,
}: CategoryItemProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      onPress={onToggle}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {category.name}
      </Text>
      {selected && (
        <FontAwesome name="check" size={16} color="#fff" style={styles.icon} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.lightGrey,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: Colors.tabIconSelected,
  },
  text: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: "#000",
  },
  selectedText: {
    color: "#fff",
    fontFamily: "Rubik-Medium",
  },
  icon: {
    marginLeft: 8,
  },
});
