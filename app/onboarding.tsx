import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import OnboardingSlide from "../components/OnboardingSlide";
import CategorySelection from "../components/CategorySelection";
import { saveCategories } from "@/utils/storage";
import { openURL, PRIVACY_POLICY_URL, TERMS_URL } from "@/utils/linkHelper";
import CountrySelection from "@/components/CountrySelection";
import { saveCountry } from "@/utils/storage";
import { Country } from "@/constants/CountryList";
import * as FileSystem from "expo-file-system";

const slides = [
  {
    title: "News in 40 words",
    description:
      "Read news of your choice in 40 words! Rapid news consumer experience powered by AI technology. Saves your time and energy.",
  },
  {
    title: "Personalized Feed",
    description:
      "Get content tailored to your interests. Add your own RSS links to get custom experience. Only read what you want.",
  },
  {
    title: "Save for Later",
    description:
      "Bookmark your favorite content, read it later. Read the saved news offline when and wherever you want.",
  },
];

export default function Onboarding() {
  const [currentPhase, setCurrentPhase] = useState<
    "slides" | "categories" | "country"
  >("slides");
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [isDownloadingModel, setIsDownloadingModel] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [modelDownloaded, setModelDownloaded] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );
      if (hasCompletedOnboarding) {
        router.replace("/(tabs)");
      }
    }
    checkOnboarding();
  }, []);

  const handleComplete = async (selectedCategories: string[]) => {
    try {
      await saveCategories(selectedCategories);
      setCurrentPhase("country");
    } catch (error) {}
  };

  const handleCountrySelect = async (country: Country) => {
    try {
      await saveCountry(country);
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      router.replace("/(tabs)");
    } catch (error) {}
  };

  const downloadModel = async () => {
    try {
      setIsDownloadingModel(true);
      const modelName = "model.gguf";
      const modelPath = `${FileSystem.documentDirectory}${modelName}`;

      const modelExists = await FileSystem.getInfoAsync(modelPath);
      if (modelExists.exists) {
        setModelDownloaded(true);
        setIsDownloadingModel(false);
        return;
      }

      const downloadResumable = FileSystem.createDownloadResumable(
        "https://huggingface.co/QuantFactory/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/Qwen2.5-1.5B-Instruct.Q4_K_M.gguf?download=true",
        modelPath,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
        }
      );

      const result = await downloadResumable.downloadAsync();
      if (result?.uri) {
        setModelDownloaded(true);
        await AsyncStorage.setItem("modelDownloaded", "true");
      }
    } catch (error) {
    } finally {
      setIsDownloadingModel(false);
    }
  };

  const handleGetStarted = async () => {
    if (!modelDownloaded) {
      await downloadModel();
    }
    if (modelDownloaded) {
      setCurrentPhase("categories");
    }
  };

  if (currentPhase === "categories") {
    return <CategorySelection onComplete={handleComplete} />;
  }

  if (currentPhase === "country") {
    return <CountrySelection onComplete={handleCountrySelect} />;
  }

  if (isDownloadingModel) {
    return (
      <View style={styles.container}>
        <Text style={styles.downloadText}>Downloading AI Model...</Text>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.progressText}>
          {Math.round(downloadProgress * 100)}%
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.appName}>
        Herald{" "}
        <Text
          style={{
            color: "#007AFF",
          }}
        >
          AI
        </Text>
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const offset = e.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(offset / Dimensions.get("window").width));
        }}
        style={{ marginTop: 60 }}
      >
        {slides.map((slide, index) => (
          <OnboardingSlide
            key={index}
            title={slide.title}
            description={slide.description}
          />
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <Pressable
        style={styles.getStartedButton}
        onPress={handleGetStarted}
        className="hover:cursor-pointer"
      >
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{" "}
          <Text style={styles.link} onPress={() => openURL(TERMS_URL)}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={() => openURL(PRIVACY_POLICY_URL)}>
            Privacy Policy
          </Text>
        </Text>
      </View>
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 120,
    marginRight: 40,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#FF4C4C",
  },
  pagination: {
    flexDirection: "row",
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#007AFF",
  },
  getStartedButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  getStartedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 10,
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 80,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  downloadText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
  },
  progressText: {
    fontSize: 16,
    marginTop: 10,
    color: "#007AFF",
  },
});
