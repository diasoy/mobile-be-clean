import { GlassBackground, GlassCard } from "@/components/ui/glass";
import { glassTheme } from "@/constants/glass-theme";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrder";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function toPriceNumber(rawValue: string): number {
  const normalized = rawValue.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
}

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data, isLoading, isError } = useOrders();

  const services = data?.data ?? [];
  const activeServiceCount = services.filter((service) => service.isActive).length;
  const averageServicePrice =
    services.length > 0
      ? services.reduce((sum, service) => sum + toPriceNumber(service.pricePerUnit), 0) /
        services.length
      : 0;
  const topService = services.reduce<(typeof services)[number] | null>(
    (highest, current) => {
      if (!highest) return current;
      return toPriceNumber(current.pricePerUnit) > toPriceNumber(highest.pricePerUnit)
        ? current
        : highest;
    },
    null,
  );

  const todayLabel = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <GlassBackground className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 122 }}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard className="px-6 py-6">
            <LinearGradient
              colors={["rgba(73,150,255,0.2)", "rgba(99,210,255,0.08)", "rgba(255,255,255,0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />

            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-4">
                <Text className="font-sans text-sm" style={{ color: glassTheme.muted }}>
                  {todayLabel}
                </Text>
                <Text
                  className="mt-1 font-sans text-[31px] leading-9"
                  style={{ color: glassTheme.text }}
                >
                  {getGreeting()}, {user?.fullName ?? "Tim Laundry"}
                </Text>
                <Text
                  className="mt-3 font-sans text-sm leading-5"
                  style={{ color: glassTheme.muted }}
                >
                  Pantau performa outlet dan lanjutkan pekerjaan harian langsung dari dashboard.
                </Text>
              </View>

              <Pressable
                onPress={logout}
                style={styles.iconBubble}
                android_ripple={{ color: "rgba(255,255,255,0.35)" }}
              >
                <Ionicons name="log-out-outline" size={18} color={glassTheme.text} />
              </Pressable>
            </View>

            <View className="mt-7 flex-row gap-3">
              <View style={styles.metricGlass} className="flex-1 px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-[1px]" style={styles.metricLabel}>
                  Layanan Aktif
                </Text>
                <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                  {activeServiceCount}
                </Text>
              </View>

              <View style={styles.metricGlass} className="flex-1 px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-[1px]" style={styles.metricLabel}>
                  Harga Rata-Rata
                </Text>
                <Text className="mt-1 font-sans text-lg" style={{ color: glassTheme.text }}>
                  {currencyFormatter.format(averageServicePrice || 0)}
                </Text>
              </View>
            </View>
          </GlassCard>

          <View className="mt-6">
            <Text className="font-sans text-lg" style={{ color: glassTheme.text }}>
              Aksi Cepat
            </Text>
            <View className="mt-3 gap-3">
              <GlassCard className="px-4 py-4" radius={22}>
                <Pressable onPress={() => router.push("/(tabs)/order")}>
                  <View className="flex-row items-center">
                    <View style={styles.actionIconSky} className="h-10 w-10 items-center justify-center rounded-xl">
                      <Ionicons name="receipt-outline" size={20} color={glassTheme.primary} />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="font-sans text-base" style={{ color: glassTheme.text }}>
                        Buat Order Baru
                      </Text>
                      <Text className="mt-0.5 font-sans text-sm" style={{ color: glassTheme.muted }}>
                        Tambahkan transaksi masuk dengan cepat.
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={glassTheme.muted} />
                  </View>
                </Pressable>
              </GlassCard>

              <GlassCard className="px-4 py-4" radius={22}>
                <Pressable onPress={() => router.push("/(tabs)/service")}>
                  <View className="flex-row items-center">
                    <View
                      style={styles.actionIconPurple}
                      className="h-10 w-10 items-center justify-center rounded-xl"
                    >
                      <Ionicons name="sparkles-outline" size={20} color="#5B56E8" />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="font-sans text-base" style={{ color: glassTheme.text }}>
                        Kelola Layanan
                      </Text>
                      <Text className="mt-0.5 font-sans text-sm" style={{ color: glassTheme.muted }}>
                        Perbarui harga, satuan, dan status layanan.
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={glassTheme.muted} />
                  </View>
                </Pressable>
              </GlassCard>
            </View>
          </View>

          <GlassCard className="mt-6 p-5" radius={26}>
            <View className="flex-row items-center justify-between">
              <Text className="font-sans text-lg" style={{ color: glassTheme.text }}>
                Ringkasan Layanan
              </Text>
              {isLoading && <ActivityIndicator size="small" color={glassTheme.primary} />}
            </View>

            {isError ? (
              <View style={styles.errorBox} className="mt-4 rounded-2xl px-4 py-3">
                <Text className="font-sans text-sm leading-5" style={{ color: "#B24058" }}>
                  Data layanan belum bisa dimuat. Coba cek koneksi server Anda.
                </Text>
              </View>
            ) : (
              <View className="mt-4 gap-3">
                <View style={styles.softTile} className="rounded-2xl px-4 py-3">
                  <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                    Total layanan terdaftar
                  </Text>
                  <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                    {services.length}
                  </Text>
                </View>

                <View style={styles.softTile} className="rounded-2xl px-4 py-3">
                  <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                    Layanan termahal
                  </Text>
                  <Text className="mt-1 font-sans text-base" style={{ color: glassTheme.text }}>
                    {topService ? topService.name : "Belum ada data"}
                  </Text>
                  {topService ? (
                    <Text className="mt-1 font-sans text-sm" style={{ color: glassTheme.muted }}>
                      {currencyFormatter.format(toPriceNumber(topService.pricePerUnit))} per{" "}
                      {topService.unitType}
                    </Text>
                  ) : null}
                </View>
              </View>
            )}
          </GlassCard>
        </ScrollView>
      </GlassBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.82)",
  },
  metricGlass: {
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.66)",
  },
  metricLabel: {
    color: "#4B6485",
  },
  actionIconSky: {
    backgroundColor: "rgba(47,128,255,0.17)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  actionIconPurple: {
    backgroundColor: "rgba(132,126,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  softTile: {
    backgroundColor: "rgba(255,255,255,0.44)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.74)",
  },
  errorBox: {
    backgroundColor: "rgba(247,184,198,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
  },
});
