import { View, Text, StyleSheet, Dimensions } from "react-native";

type SlideProps = {
  title: string;
  description: string;
};

export default function OnboardingSlide({ title, description }: SlideProps) {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get("window").width,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Rubik-SemiBold",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    letterSpacing: 0.5,
    fontFamily: "Rubik-Regular",
  },
});
