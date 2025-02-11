import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Country } from "@/constants/CountryList";
import { Colors } from "@/constants/Colors";

interface CountryItemProps {
  country: Country;
  selected: boolean;
  onSelect: () => void;
}

export default function CountryItem({
  country,
  selected,
  onSelect,
}: CountryItemProps) {
  return (
    <Pressable
      style={[styles.container, selected && styles.selected]}
      onPress={onSelect}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {country.name}
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
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 8,
  },
  selected: {
    backgroundColor: Colors.tabIconSelected,
  },
  text: {
    flex: 1,
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
