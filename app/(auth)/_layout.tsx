import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { GlassBackground } from "@/components/ui/glass";
import { glassTheme } from "@/constants/glass-theme";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <GlassBackground className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={glassTheme.primary} />
      </GlassBackground>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
