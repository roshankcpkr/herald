import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "1", name: "Android" },
  { id: "2", name: "Android Development" },
  { id: "3", name: "Apple" },
  { id: "4", name: "Architecture" },
  { id: "5", name: "Beauty" },
  { id: "6", name: "Books" },
  { id: "7", name: "Business & Economy" },
  { id: "8", name: "Cars" },
  { id: "9", name: "Interior Design" },
  { id: "10", name: "Fashion" },
  { id: "11", name: "DIY" },
  { id: "12", name: "Football" },
  { id: "13", name: "Funny" },
  { id: "14", name: "Gaming" },
  { id: "15", name: "History" },
  { id: "16", name: "iOS Development" },
  { id: "17", name: "Movies" },
  { id: "18", name: "News" },
  { id: "19", name: "Personal finance" },
  { id: "20", name: "Photography" },
  { id: "21", name: "Startups" },
  { id: "22", name: "Programming" },
  { id: "23", name: "Science" },
  { id: "24", name: "Space" },
  { id: "25", name: "Tech" },
  { id: "26", name: "Television" },
  { id: "27", name: "Tennis" },
  { id: "28", name: "Travel" },
  { id: "29", name: "UI/UX" },
  { id: "30", name: "Web Development" },
];

export default function CategorySelection({
  onComplete,
  showSkip = true,
}: {
  onComplete: (selected: string[]) => void;
  showSkip?: boolean;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your interests</Text>
      <Text style={styles.subtitle}>
        Select at least 3 categories to get started
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.categoriesGrid}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategories.includes(category.id) &&
                styles.selectedCategory,
            ]}
            onPress={() => toggleCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category.id) &&
                  styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        {showSkip && (
          <Pressable
            style={[styles.button, styles.skipButton]}
            onPress={() => onComplete(["1", "2", "3"])}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </Pressable>
        )}
        <Pressable
          style={[
            styles.button,
            styles.continueButton,
            selectedCategories.length < 3 && styles.disabledButton,
          ]}
          disabled={selectedCategories.length < 3}
          onPress={() => onComplete(selectedCategories)}
        >
          <Text style={styles.continueButtonText}>
            Continue ({selectedCategories.length}/3)
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Rubik-SemiBold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingBottom: 20,
  },
  categoryItem: {
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 100,
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor: "#FF4C4C",
    borderColor: "#FF4C4C",
  },
  categoryText: {
    color: "#333",
    fontFamily: "Rubik-Medium",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "#f8f8f8",
  },
  continueButton: {
    backgroundColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
});
