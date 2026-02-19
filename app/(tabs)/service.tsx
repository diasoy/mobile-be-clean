import { GlassBackground, GlassCard } from "@/components/ui/glass";
import { glassTheme } from "@/constants/glass-theme";
import { useOrders } from "@/hooks/useOrder";
import { Service } from "@/types/order";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

function ServiceItem({ service }: { service: Service }) {
  return (
    <GlassCard className="px-4 py-4" radius={22}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="font-sans text-lg" style={{ color: glassTheme.text }}>
            {service.name}
          </Text>
          <Text className="mt-0.5 font-sans text-sm" style={{ color: glassTheme.muted }}>
            Satuan: {service.unitType}
          </Text>
        </View>

        <View
          style={[
            styles.statusPill,
            service.isActive ? styles.activePill : styles.inactivePill,
          ]}
          className="rounded-full px-3 py-1"
        >
          <Text
            className="font-sans text-xs"
            style={{ color: service.isActive ? "#0E9F6E" : "#516681" }}
          >
            {service.isActive ? "Aktif" : "Nonaktif"}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={16} color={glassTheme.muted} />
          <Text className="ml-1.5 font-sans text-sm" style={{ color: glassTheme.muted }}>
            Harga per {service.unitType}
          </Text>
        </View>
        <Text className="font-sans text-base" style={{ color: glassTheme.text }}>
          {currencyFormatter.format(toPriceNumber(service.pricePerUnit))}
        </Text>
      </View>
    </GlassCard>
  );
}

export default function ServiceScreen() {
  const { data, isLoading, isError, error, refetch } = useOrders();
  const services = data?.data ?? [];
  const activeServiceCount = services.filter((service) => service.isActive).length;

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <GlassBackground className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 122 }}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard className="px-5 py-6">
            <LinearGradient
              colors={["rgba(47,128,255,0.18)", "rgba(125,205,255,0.1)", "rgba(255,255,255,0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text className="font-sans text-sm" style={{ color: glassTheme.muted }}>
              Pengaturan layanan
            </Text>
            <Text className="mt-1 font-sans text-[28px] leading-8" style={{ color: glassTheme.text }}>
              {activeServiceCount} layanan aktif
            </Text>
            <Text className="mt-3 font-sans text-sm leading-5" style={{ color: glassTheme.muted }}>
              Pastikan setiap layanan memiliki harga terbaru agar transaksi harian tetap akurat.
            </Text>

            <View className="mt-5 flex-row gap-3">
              <View style={styles.metricGlass} className="flex-1 rounded-2xl px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                  Total layanan
                </Text>
                <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                  {services.length}
                </Text>
              </View>
              <View style={styles.metricGlass} className="flex-1 rounded-2xl px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                  Nonaktif
                </Text>
                <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                  {services.length - activeServiceCount}
                </Text>
              </View>
            </View>
          </GlassCard>

          {isLoading && (
            <GlassCard className="mt-6 items-center px-6 py-12" radius={24}>
              <ActivityIndicator size="large" color={glassTheme.primary} />
              <Text className="mt-4 font-sans text-sm" style={{ color: glassTheme.muted }}>
                Memuat daftar layanan...
              </Text>
            </GlassCard>
          )}

          {isError && (
            <GlassCard className="mt-6 items-center px-6 py-8" radius={24}>
              <View style={styles.errorIconWrap} className="h-14 w-14 items-center justify-center rounded-2xl">
                <Ionicons name="alert-circle-outline" size={34} color={glassTheme.danger} />
              </View>
              <Text className="mt-3 text-center font-sans text-base" style={{ color: "#B24058" }}>
                {error instanceof Error ? error.message : "Gagal memuat data layanan."}
              </Text>
              <TouchableOpacity
                onPress={() => refetch()}
                style={styles.retryButton}
                className="mt-5 rounded-xl px-5 py-3"
              >
                <Text className="font-sans text-sm text-white">Coba Lagi</Text>
              </TouchableOpacity>
            </GlassCard>
          )}

          {!isLoading && !isError && (
            <View className="mt-6 gap-3">
              {services.length === 0 ? (
                <GlassCard className="items-center px-6 py-10" radius={24}>
                  <View style={styles.emptyIconWrap} className="h-14 w-14 items-center justify-center rounded-2xl">
                    <Ionicons name="search-outline" size={30} color={glassTheme.muted} />
                  </View>
                  <Text className="mt-3 font-sans text-base" style={{ color: glassTheme.text }}>
                    Belum ada layanan tersedia
                  </Text>
                  <Text className="mt-1 text-center font-sans text-sm" style={{ color: glassTheme.muted }}>
                    Tambahkan layanan pertama agar bisa dipakai untuk transaksi.
                  </Text>
                </GlassCard>
              ) : (
                services.map((service) => <ServiceItem key={service.id} service={service} />)
              )}
            </View>
          )}
        </ScrollView>

        <GlassCard className="absolute bottom-9 right-6" radius={20} style={styles.fabWrap}>
          <TouchableOpacity
            className="h-14 w-14 items-center justify-center rounded-2xl"
            onPress={() => {}}
          >
            <Ionicons name="add" size={28} color={glassTheme.primary} />
          </TouchableOpacity>
        </GlassCard>
      </GlassBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  metricGlass: {
    backgroundColor: "rgba(255,255,255,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  statusPill: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
  },
  activePill: {
    backgroundColor: glassTheme.successSoft,
  },
  inactivePill: {
    backgroundColor: "rgba(170,185,204,0.2)",
  },
  errorIconWrap: {
    backgroundColor: glassTheme.dangerSoft,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
  },
  emptyIconWrap: {
    backgroundColor: "rgba(152,179,212,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
  },
  retryButton: {
    backgroundColor: glassTheme.danger,
  },
  fabWrap: {
    shadowOpacity: 0.28,
  },
});
