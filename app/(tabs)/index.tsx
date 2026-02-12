import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-slate-100"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header Section */}
          <View className="mb-6">
            <Text className="text-4xl font-bold text-white mb-2">
              NativeWind Test
            </Text>
            <Text className="text-lg text-gray-600">
              Testing TailwindCSS styling
            </Text>
          </View>

          {/* Color Boxes */}
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Color Test
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <View className="w-24 h-24 bg-red-500 rounded-xl items-center justify-center">
                <Text className="text-white font-bold">Red</Text>
              </View>
              <View className="w-24 h-24 bg-blue-500 rounded-xl items-center justify-center">
                <Text className="text-white font-bold">Blue</Text>
              </View>
              <View className="w-24 h-24 bg-green-500 rounded-xl items-center justify-center">
                <Text className="text-white font-bold">Green</Text>
              </View>
              <View className="w-24 h-24 bg-purple-500 rounded-xl items-center justify-center">
                <Text className="text-white font-bold">Purple</Text>
              </View>
            </View>
          </View>

          {/* Card Example */}
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Card Example
            </Text>
            <View className="bg-white rounded-2xl p-6 shadow-lg">
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                Welcome! 👋
              </Text>
              <Text className="text-base text-gray-600 mb-4">
                If you see colors and rounded corners, NativeWind is working!
              </Text>
              <View className="bg-blue-500 py-3 px-6 rounded-lg">
                <Text className="text-white text-center font-semibold">
                  Button Example
                </Text>
              </View>
            </View>
          </View>

          {/* Spacing Test */}
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Spacing & Layout Test
            </Text>
            <View className="bg-white rounded-xl p-4">
              <View className="mb-2 p-2 bg-orange-100 rounded">
                <Text className="text-orange-800">Padding & Margin</Text>
              </View>
              <View className="mb-2 p-2 bg-teal-100 rounded">
                <Text className="text-teal-800">working correctly</Text>
              </View>
              <View className="p-2 bg-pink-100 rounded">
                <Text className="text-pink-800">with TailwindCSS! ✨</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
