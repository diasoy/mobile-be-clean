import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Text, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Manrope: require("../assets/fonts/Manrope.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!fontsLoaded) return;

    const TextAny = Text as unknown as {
      defaultProps?: { style?: unknown };
    };
    const TextInputAny = TextInput as unknown as {
      defaultProps?: { style?: unknown };
    };

    const textDefaultProps = TextAny.defaultProps ?? {};
    TextAny.defaultProps = {
      ...textDefaultProps,
      style: textDefaultProps.style
        ? [{ fontFamily: "Manrope" }, textDefaultProps.style]
        : [{ fontFamily: "Manrope" }],
    };

    const textInputDefaultProps = TextInputAny.defaultProps ?? {};
    TextInputAny.defaultProps = {
      ...textInputDefaultProps,
      style: textInputDefaultProps.style
        ? [{ fontFamily: "Manrope" }, textInputDefaultProps.style]
        : [{ fontFamily: "Manrope" }],
    };
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(auth)" />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
