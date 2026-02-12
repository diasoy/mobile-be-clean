import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Example React Query hook
const useExampleQuery = () => {
  return useQuery({
    queryKey: ["example"],
    queryFn: async () => {
      // Replace with your actual API call
      return { message: "Hello from React Query!" };
    },
  });
};

const LoginScreen = () => {
  const { data, isLoading } = useExampleQuery();

  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-gray-900"
      edges={["top", "left", "right"]}
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-md">
          {/* Header */}
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mb-8">
            Sign in to continue
          </Text>

          {/* React Query Example */}
          {isLoading ? (
            <Text className="text-sm text-gray-500 mb-4">Loading...</Text>
          ) : (
            <Text className="text-sm text-blue-600 mb-4">{data?.message}</Text>
          )}

          {/* Email Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </Text>
            <TextInput
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity className="w-full bg-blue-600 py-3 rounded-lg active:opacity-80">
            <Text className="text-white text-center font-semibold text-base">
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <TouchableOpacity className="mt-4">
            <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
