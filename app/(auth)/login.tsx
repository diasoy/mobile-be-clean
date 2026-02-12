import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { login } = useAuth();
  const toast = useToast();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#CBD5E1" : "#64748B";
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
    <SafeAreaView
      className="flex-1 bg-slate-100 dark:bg-gray-900"
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
        >
          <View className="w-full max-w-md self-center">
            {/* Header */}
            <View className="items-center mb-10">
              <View className="w-20 h-20 bg-white/80 dark:bg-gray-800 rounded-3xl items-center justify-center shadow-sm mb-4">
                <Image
                  source={require("../../assets/images/icon.png")}
                  style={{ width: 44, height: 44 }}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-3xl font-bold text-slate-900 dark:text-white">
                Laundry POS
              </Text>
              <Text className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                Sign in to manage your orders
              </Text>
            </View>

            {/* Card */}
            <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-700">
              <Text className="text-[11px] font-semibold text-slate-500 dark:text-gray-300 tracking-widest">
                EMAIL OR USERNAME
              </Text>
              <View className="mt-2 flex-row items-center bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-2xl px-4 py-3">
                <Ionicons name="person-outline" size={18} color={iconColor} />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 dark:text-white text-[14px]"
                  placeholder="staff@laundry.com"
                  placeholderTextColor={isDark ? "#94A3B8" : "#94A3B8"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  value={username}
                  onChangeText={setUsername}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />
              </View>

              <Text className="text-[11px] font-semibold text-slate-500 dark:text-gray-300 tracking-widest mt-5">
                PASSWORD
              </Text>
              <View className="mt-2 flex-row items-center bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-2xl px-4 py-3">
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={iconColor}
                />
                <TextInput
                  ref={passwordRef}
                  className="flex-1 ml-3 text-slate-900 dark:text-white text-[14px]"
                  placeholder="********"
                  placeholderTextColor={isDark ? "#94A3B8" : "#94A3B8"}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!isPasswordVisible}
                  returnKeyType="done"
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={onSubmit}
                />
                <Pressable
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                  hitSlop={12}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={iconColor}
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
                <Text className="text-sm font-semibold text-blue-600">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="mt-6 w-full bg-blue-600 py-4 rounded-2xl active:opacity-90 disabled:opacity-60 flex-row items-center justify-center shadow-lg"
                onPress={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <View className="flex-row items-center">
                    <Text className="text-white font-semibold text-base">
                      Login
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color="#FFFFFF"
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="items-center mt-10">
              <Text className="text-xs text-slate-400 dark:text-gray-500">
                Powered by CleanTech v2.4
              </Text>
              <Text className="text-xs text-slate-400 dark:text-gray-500 mt-1">
                (c) {new Date().getFullYear()} Laundry POS Systems
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
