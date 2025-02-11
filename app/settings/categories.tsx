import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Alert,
} from "react-native";
import { categories } from "@/constants/Categories";
import CategoryItem from "@/components/settings/CategoryItem";
import { getCategories, saveCategories } from "@/utils/storage";

export default function CategoriesScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const saved = await getCategories();
      // If no categories are saved or empty array, set default category
      if (!saved || saved.length === 0) {
        const defaultCategory = categories[0].id;
        setSelectedCategories([defaultCategory]);
        await saveCategories([defaultCategory]);
      } else {
        setSelectedCategories(saved);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      // Set default category in case of error
      const defaultCategory = categories[0].id;
      setSelectedCategories([defaultCategory]);
      await saveCategories([defaultCategory]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = async (id: string) => {
    try {
      // If trying to deselect the last category, show alert and prevent
      if (selectedCategories.length === 1 && selectedCategories.includes(id)) {
        Alert.alert(
          "Cannot Remove",
          "At least one category must be selected.",
          [{ text: "OK" }]
        );
        return;
      }

      const newSelected = selectedCategories.includes(id)
        ? selectedCategories.filter((c) => c !== id)
        : [...selectedCategories, id];

      setSelectedCategories(newSelected);
      await saveCategories(newSelected);
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News Categories</Text>
      <Text style={styles.subtitle}>
        Select at least one category to personalize your news feed
      </Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            selected={selectedCategories.includes(item.id)}
            onToggle={() => toggleCategory(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginTop: 20,
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: "#666",
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  list: {
    padding: 16,
  },
});
