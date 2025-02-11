import React from "react";
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiscoverTab from "@/components/discover/DiscoverTab";
import CustomRSSTab from "@/components/discover/CustomRSSTab";

const Tab = createMaterialTopTabNavigator();

export default function DiscoverScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: "Rubik-Medium",
          fontSize: 14,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#007AFF",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tab.Screen name="Discover" component={DiscoverTab} />
      <Tab.Screen name="RSS Feeds" component={CustomRSSTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
