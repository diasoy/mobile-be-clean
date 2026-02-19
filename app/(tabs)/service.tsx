import { useOrders } from "@/hooks/useOrder";
import { Service } from "@/types/order";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ServiceScreen() {
  const { data, isLoading, isError, error, refetch } = useOrders();

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1 py-4">
        {/* Loading State */}
        {isLoading && (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#0284c7" />
            <Text className="mt-4 text-gray-600">Loading services...</Text>
          </View>
        )}

        {/* Error State */}
        {isError && (
          <View className="flex-1 justify-center items-center py-20 px-4">
            <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
            <Text className="mt-4 text-red-600 font-semibold text-center">
              {error instanceof Error
                ? error.message
                : "Failed to load services"}
            </Text>
            <TouchableOpacity
              onPress={() => refetch()}
              className="mt-4 bg-sky-600 px-6 py-3 rounded-lg"
            >
              <Text className="text-white font-semibold">Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Services List */}
        {!isLoading && !isError && (
          <View className="px-4">
            {data?.data.length === 0 ? (
              <View className="py-20 items-center">
                <Ionicons name="search-outline" size={64} color="#94a3b8" />
                <Text className="mt-4 text-gray-500 text-center">
                  No services available
                </Text>
              </View>
            ) : (
              data?.data.map((service: Service) => (
                <View
                  key={service.id}
                  className="bg-white rounded-xl p-4 mb-3 border border-gray-200 shadow-sm"
                >
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-slate-800">
                        {service.name}
                      </Text>
                      <Text className="text-xs">per {service.unitType}</Text>
                    </View>
                    <View className="flex flex-row items-center justify-center gap-2">
                      <Text className="font-semibold">
                        Rp{" "}
                        {parseInt(service.pricePerUnit).toLocaleString("id-ID")}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-8 right-6 bg-sky-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{ elevation: 5 }}
        onPress={() => {
          console.log("Tombol Add Ditekan");
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
