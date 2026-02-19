import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Text, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync().catch(() => {});

let hasConfiguredDefaultTypography = false;

function configureDefaultTypography() {
  if (hasConfiguredDefaultTypography) return;

  const textWithDefaults = Text as typeof Text & {
    defaultProps?: {
      style?: unknown;
    };
  };
  textWithDefaults.defaultProps = textWithDefaults.defaultProps || {};
  textWithDefaults.defaultProps.style = [
    { fontFamily: "Manrope_500Medium" },
    textWithDefaults.defaultProps.style,
  ];

  const textInputWithDefaults = TextInput as typeof TextInput & {
    defaultProps?: {
      style?: unknown;
    };
  };
  textInputWithDefaults.defaultProps = textInputWithDefaults.defaultProps || {};
  textInputWithDefaults.defaultProps.style = [
    { fontFamily: "Manrope_500Medium" },
    textInputWithDefaults.defaultProps.style,
  ];

  hasConfiguredDefaultTypography = true;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular: Manrope_400Regular,
    Manrope_500Medium: Manrope_500Medium,
    Manrope_600SemiBold: Manrope_600SemiBold,
    Manrope_700Bold: Manrope_700Bold,
    Manrope_800ExtraBold: Manrope_800ExtraBold,
    Manrope: Manrope_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontError, fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      configureDefaultTypography();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(auth)" />
              </Stack>
              <StatusBar style="dark" />
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </ToastProvider>
    </SafeAreaProvider>
  );
}
