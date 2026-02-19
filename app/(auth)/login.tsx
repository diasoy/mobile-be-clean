import { GlassBackground, GlassCard } from "@/components/ui/glass";
import { useToast } from "@/components/ui/toast";
import { glassTheme } from "@/constants/glass-theme";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { login } = useAuth();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  const onSubmit = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password) {
      toast.show("Email/Username dan password wajib diisi.", {
        variant: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ username: trimmedUsername, password });
    } catch (err) {
      setPassword("");
      toast.show(err instanceof Error ? err.message : "Login gagal.", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <GlassBackground className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            className="flex-1"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingVertical: 30,
            }}
          >
            <View className="w-full max-w-md self-center">
              <GlassCard className="px-6 py-7" radius={30}>
                <LinearGradient
                  colors={["rgba(47,128,255,0.18)", "rgba(120,194,255,0.1)", "rgba(255,255,255,0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />

                <View style={styles.logoWrap} className="h-14 w-14 items-center justify-center rounded-2xl">
                  <Image
                    source={require("../../assets/images/icon.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                </View>

                <Text className="mt-4 font-sans text-3xl" style={{ color: glassTheme.text }}>
                  CleanApp Laundry
                </Text>
                <Text className="mt-2 font-sans text-sm leading-5" style={{ color: glassTheme.muted }}>
                  Login untuk mengelola order, layanan, dan rekap outlet dari satu dashboard.
                </Text>
              </GlassCard>

              <GlassCard className="mt-5 px-5 py-6" radius={28}>
                <Text className="font-sans text-[11px] uppercase tracking-[2px]" style={{ color: glassTheme.muted }}>
                  Username atau Email
                </Text>

                <View className="mt-2 flex-row items-center rounded-2xl px-4 py-3" style={styles.inputWrap}>
                  <Ionicons name="person-outline" size={18} color={glassTheme.muted} />
                  <TextInput
                    className="ml-3 flex-1 font-sans text-[14px]"
                    style={{ color: glassTheme.text, fontFamily: "Manrope_500Medium" }}
                    placeholder="staff@laundry.com"
                    placeholderTextColor={glassTheme.muted}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    value={username}
                    onChangeText={setUsername}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                </View>

                <Text className="mt-5 font-sans text-[11px] uppercase tracking-[2px]" style={{ color: glassTheme.muted }}>
                  Password
                </Text>

                <View className="mt-2 flex-row items-center rounded-2xl px-4 py-3" style={styles.inputWrap}>
                  <Ionicons name="lock-closed-outline" size={18} color={glassTheme.muted} />
                  <TextInput
                    ref={passwordRef}
                    className="ml-3 flex-1 font-sans text-[14px]"
                    style={{ color: glassTheme.text, fontFamily: "Manrope_500Medium" }}
                    placeholder="Masukkan password"
                    placeholderTextColor={glassTheme.muted}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={!isPasswordVisible}
                    returnKeyType="done"
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={onSubmit}
                  />
                  <Pressable onPress={() => setIsPasswordVisible((prev) => !prev)} hitSlop={10}>
                    <Ionicons
                      name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color={glassTheme.muted}
                    />
                  </Pressable>
                </View>

                <TouchableOpacity
                  className="self-end mt-4"
                  onPress={() =>
                    toast.show("Silakan hubungi admin untuk reset password.", {
                      variant: "info",
                    })
                  }
                >
                  <Text className="font-sans text-sm" style={{ color: glassTheme.primary }}>
                    Lupa Password?
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="mt-6 w-full rounded-2xl py-4 active:opacity-90 disabled:opacity-60"
                  style={styles.loginButton}
                  onPress={onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <View className="flex-row items-center justify-center">
                      <Text className="font-sans text-base text-white">Masuk ke Dashboard</Text>
                      <Ionicons
                        name="arrow-forward"
                        size={18}
                        color="#FFFFFF"
                        style={{ marginLeft: 8 }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </GlassCard>

              <View className="items-center mt-8">
                <Text className="font-sans text-xs" style={{ color: glassTheme.muted }}>
                  Powered by CleanTech v2.4
                </Text>
                <Text className="mt-1 font-sans text-xs" style={{ color: glassTheme.muted }}>
                  (c) {new Date().getFullYear()} Laundry POS Systems
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </GlassBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoWrap: {
    backgroundColor: "rgba(255,255,255,0.48)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.78)",
  },
  inputWrap: {
    backgroundColor: "rgba(255,255,255,0.38)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
  },
  loginButton: {
    backgroundColor: glassTheme.primary,
  },
});

export default LoginScreen;
