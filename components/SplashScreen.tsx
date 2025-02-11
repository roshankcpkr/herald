import { View, Image, StyleSheet, Animated, Text } from "react-native";
import { useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
        />
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
          Herald{" "}
          <Text
            style={{
              color: "#007AFF",
            }}
          >
            AI
          </Text>
        </Animated.Text>
        <Animated.Text style={[styles.subtext, { opacity: fadeAnim }]}>
          Powered by Bingo Labs
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "semibold",
    fontFamily: "Rubik-SemiBold",
    marginLeft: 20,
    color: Colors.tabIconSelected,
  },
  subtext: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "normal",
    marginLeft: 20,
    color: "#888",
  },
});
