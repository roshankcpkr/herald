import { View, Image, StyleSheet, Animated, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { llamaUtils } from "@/utils/aimodel";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        // Start fade in animation immediately
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();

        // Initialize model
        await llamaUtils.initialize();

        // Only proceed with fade out after model is initialized
        Animated.sequence([
          Animated.delay(1000), // Show splash screen for at least 1 second after model loads
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onComplete();
        });
      } catch (error) {
        setInitError("Failed to initialize AI model");
        console.error("Model initialization failed:", error);
        // Keep splash screen visible for error message
        setTimeout(() => {
          onComplete();
        }, 3000); // Show error for 3 seconds before completing
      }
    }

    initialize();
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

        {initError && (
          <Animated.Text style={[styles.errorText, { opacity: fadeAnim }]}>
            {initError}
          </Animated.Text>
        )}
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
  errorText: {
    marginTop: 20,
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
