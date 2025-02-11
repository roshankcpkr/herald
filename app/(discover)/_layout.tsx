import { Stack } from "expo-router";

export default function DiscoverLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
          headerShown: true,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="local"
        options={{
          title: "Local News",
          headerShown: true,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="trending"
        options={{
          title: "Trending",
          headerShown: true,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="interesting"
        options={{
          title: "Interesting",
          headerShown: true,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
