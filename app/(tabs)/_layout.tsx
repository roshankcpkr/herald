import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar";
import { Colors } from "@/constants/Colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          headerTitle: "Herald AI",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "semibold",
            marginLeft: 20,
            fontFamily: "Rubik-SemiBold",
            color: Colors.darkGrey,
          },
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorites",
          headerShown: true,
          headerTitle: "Favorites",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "semibold",
            marginLeft: 20,
            fontFamily: "Rubik-SemiBold",
            color: Colors.darkGrey,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
