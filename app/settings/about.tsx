import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInDown}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Herald <Text style={{ color: Colors.primary }}>AI</Text>
        </Text>
        <Text style={styles.description}>
          Herald AI is your personalized news companion, bringing you curated
          news from trusted sources in a concise format. Powered by advanced AI
          technology, we help you stay informed without information overload.
        </Text>
        <Text style={styles.description}>
          With Herald AI, you can get the latest news from your favorite sources
          in a concise format. You can also customize your news feed to your
          liking. You can add custom sources to your feed.
        </Text>
        <Text style={styles.description}>
          Herald AI is a product of Bingo Labs.
        </Text>
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginVertical: 10,
    marginRight: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    textAlign: "center",
    marginBottom: 20,
    color: Colors.tabIconSelected,
  },
  description: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    lineHeight: 24,
    color: "#333",
    marginBottom: 20,
  },
});
