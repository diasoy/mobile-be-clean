import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Explore
            </Text>
            <Text className="text-base text-gray-600">
              Discover amazing features
            </Text>
          </View>

          {/* Feature Cards */}
          <View className="space-y-4">
            {/* Card 1 */}
            <TouchableOpacity className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-4">
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">🚀</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-white">
                    Fast Performance
                  </Text>
                  <Text className="text-white/80 text-sm">
                    Lightning quick responses
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity className="bg-blue-500 rounded-2xl p-6 mb-4">
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">🎨</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-white">
                    Beautiful Design
                  </Text>
                  <Text className="text-white/80 text-sm">
                    Crafted with care
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 3 */}
            <TouchableOpacity className="bg-green-500 rounded-2xl p-6 mb-4">
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">🔒</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-white">Secure</Text>
                  <Text className="text-white/80 text-sm">
                    Your data is safe
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 4 */}
            <TouchableOpacity className="bg-orange-500 rounded-2xl p-6 mb-4">
              <View className="flex-row items-center mb-3">
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl">⚡</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-white">
                    Real-time Updates
                  </Text>
                  <Text className="text-white/80 text-sm">Always in sync</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* CTA Button */}
          <View className="mt-8">
            <TouchableOpacity
              className="bg-gray-900 py-4 px-6 rounded-xl"
              onPress={() => router.push("/(auth)/login")}
            >
              <Text className="text-white text-center font-bold text-lg">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
