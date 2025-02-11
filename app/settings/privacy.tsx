import React from "react";
import { ScrollView, StyleSheet, Text, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { PRIVACY_POLICY_URL, openURL } from "@/utils/linkHelper";

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInDown}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.section}>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </Text>
        <Pressable onPress={() => openURL(PRIVACY_POLICY_URL)}>
          <Text style={styles.link}>View full Privacy Policy</Text>
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
  section: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    lineHeight: 24,
    color: "#333",
    marginBottom: 15,
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
    marginTop: 10,
  },
});
