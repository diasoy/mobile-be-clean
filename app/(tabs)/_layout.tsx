import { Redirect, Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ActivityIndicator, View } from "react-native";

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerStyle: {
          backgroundColor: "#FFFFFF", 
          elevation: 5, 
          shadowOpacity: 0.1, 
        },
        headerTintColor: "#000000", 
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="homepod.2.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="cart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: "Atur Layanan",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="service.dog.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rekap"
        options={{
          title: "Rekap",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet.rectangle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
