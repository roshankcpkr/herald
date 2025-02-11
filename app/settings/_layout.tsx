import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        presentation: "card",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          fontFamily: "Rubik-Medium",
          fontSize: 17,
        },
      }}
    >
      <Stack.Screen name="rss-manager" options={{ title: "RSS Feeds" }} />
      <Stack.Screen name="categories" options={{ title: "Categories" }} />
      <Stack.Screen name="about" options={{ title: "About" }} />
      <Stack.Screen name="privacy" options={{ title: "Privacy Policy" }} />
      <Stack.Screen name="terms" options={{ title: "Terms of Use" }} />
      <Stack.Screen name="country" options={{ title: "Country" }} />
    </Stack>
  );
}
