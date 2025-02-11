import React from "react";
import { ScrollView, StyleSheet, Text, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { TERMS_URL, openURL } from "@/utils/linkHelper";

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInDown}>
        <Text style={styles.title}>Terms of Service</Text>
        <Pressable onPress={() => openURL(TERMS_URL)}>
          <Text style={styles.description}>
            By using Herald AI, you agree to the following terms and conditions.
            Please read the following terms and conditions carefully.
          </Text>
          <Text style={styles.link}>View full Terms of Service</Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    marginBottom: 20,
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    marginBottom: 20,
  },
});
