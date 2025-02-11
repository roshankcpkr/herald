import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function index() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkOnboarding() {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );
      if (hasCompletedOnboarding) {
        setIsOnboarding(false);
      }
      setIsLoading(false);
    }
    checkOnboarding();
  }, []);

  if (isLoading) return null;

  return <Redirect href={isOnboarding ? "/onboarding" : "/(tabs)"} />;
}
