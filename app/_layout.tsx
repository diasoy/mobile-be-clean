import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/context/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider
              value={colorScheme === "light" ? DarkTheme : DefaultTheme}
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
