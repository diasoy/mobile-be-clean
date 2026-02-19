import { GlassBackground } from "@/components/ui/glass";
import { glassTheme } from "@/constants/glass-theme";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function TabGlassLayer({ withBottomBorder = false }: { withBottomBorder?: boolean }) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView intensity={46} tint="light" style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={["rgba(255,255,255,0.84)", "rgba(255,255,255,0.54)", "rgba(255,255,255,0.38)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.92)", "rgba(255,255,255,0)"]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 0.68 }}
        style={styles.glossTop}
      />
      <View
        style={[
          styles.stroke,
          withBottomBorder && {
            borderBottomWidth: 1,
            borderBottomColor: glassTheme.divider,
          },
        ]}
      />
    </View>
  );
}

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <GlassBackground className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={glassTheme.primary} />
        <Text
          className="mt-3 font-sans"
          style={{ color: glassTheme.muted, fontFamily: "Manrope_600SemiBold" }}
        >
          Menyiapkan aplikasi...
        </Text>
      </GlassBackground>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={({ route }) => {
        const iconMap: Record<
          string,
          { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
        > = {
          index: { active: "home", inactive: "home-outline" },
          order: { active: "receipt", inactive: "receipt-outline" },
          service: { active: "sparkles", inactive: "sparkles-outline" },
          rekap: { active: "bar-chart", inactive: "bar-chart-outline" },
        };

        const icon = iconMap[route.name] ?? {
          active: "ellipse",
          inactive: "ellipse-outline",
        };

        return {
          sceneStyle: {
            backgroundColor: "transparent",
          },
          tabBarStyle: {
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 18,
            height: 74,
            borderTopWidth: 0,
            borderRadius: 26,
            backgroundColor: "transparent",
            paddingTop: 9,
            paddingBottom: 9,
            overflow: "hidden",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarBackground: () => <TabGlassLayer />,
          tabBarActiveTintColor: glassTheme.primary,
          tabBarInactiveTintColor: "#6F86A4",
          tabBarLabelStyle: {
            fontFamily: "Manrope_600SemiBold",
            fontSize: 11,
            marginTop: 2,
          },
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerBackground: () => <TabGlassLayer withBottomBorder />,
          headerTitleStyle: {
            color: glassTheme.text,
            fontFamily: "Manrope_700Bold",
            fontSize: 22,
          },
          headerTintColor: glassTheme.text,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? icon.active : icon.inactive}
              size={size + 1}
              color={color}
            />
          ),
        };
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: "Layanan",
        }}
      />
      <Tabs.Screen
        name="rekap"
        options={{
          title: "Rekap",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glossTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "48%",
  },
  stroke: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: glassTheme.border,
  },
});
