import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = () => {
    Alert.alert("Logout", "Yakin ingin keluar dari aplikasi?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          if (isLoggingOut) return;
          setIsLoggingOut(true);
          await logout();
          toast.show("Berhasil logout.", { variant: "success" });
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-slate-100 dark:bg-gray-900"
      edges={["top", "left", "right"]}
    >
      <View className="p-6">
        <Text className="text-3xl font-bold text-slate-900 dark:text-white">
          Akun
        </Text>
        <Text className="text-sm text-slate-500 dark:text-gray-400 mt-1">
          Kelola profil dan sesi login
        </Text>

        <View className="mt-6 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-gray-700">
          <Text className="text-[11px] font-semibold text-slate-500 dark:text-gray-300 tracking-widest">
            USER
          </Text>
          <Text className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
            {user?.fullName ?? "-"}
          </Text>
          <Text className="mt-1 text-sm text-slate-500 dark:text-gray-400">
            @{user?.username ?? "-"}
          </Text>
        </View>

        <TouchableOpacity
          className="mt-6 w-full bg-red-600 py-4 rounded-2xl active:opacity-90 disabled:opacity-60 flex-row items-center justify-center shadow-lg"
          onPress={onLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold text-base">Logout</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
