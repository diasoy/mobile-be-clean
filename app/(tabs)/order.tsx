import { GlassBackground, GlassCard } from "@/components/ui/glass";
import { glassTheme } from "@/constants/glass-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queuePreview = [
  {
    id: "ORD-1028",
    customer: "Rina Amelia",
    status: "Proses Cuci",
    eta: "14:30",
    amount: 72000,
  },
  {
    id: "ORD-1029",
    customer: "Andi Saputra",
    status: "Siap Setrika",
    eta: "16:00",
    amount: 54000,
  },
  {
    id: "ORD-1030",
    customer: "Toko Maju",
    status: "Menunggu Pickup",
    eta: "18:00",
    amount: 130000,
  },
];

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export default function OrderScreen() {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <GlassBackground className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 122 }}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard className="px-5 py-5">
            <LinearGradient
              colors={["rgba(47,128,255,0.16)", "rgba(110,188,255,0.08)", "rgba(255,255,255,0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text className="font-sans text-sm" style={{ color: glassTheme.muted }}>
              Ringkasan hari ini
            </Text>
            <Text className="mt-1 font-sans text-3xl" style={{ color: glassTheme.text }}>
              24 Order Masuk
            </Text>

            <View className="mt-5 flex-row gap-3">
              <View style={styles.metricGlass} className="flex-1 rounded-2xl px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                  Antrian
                </Text>
                <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                  7
                </Text>
              </View>
              <View style={styles.metricGlass} className="flex-1 rounded-2xl px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                  Selesai
                </Text>
                <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                  17
                </Text>
              </View>
            </View>
          </GlassCard>

          <View className="mt-6">
            <Text className="font-sans text-lg" style={{ color: glassTheme.text }}>
              Antrian Aktif
            </Text>
            <View className="mt-3 gap-3">
              {queuePreview.map((order) => (
                <GlassCard key={order.id} className="px-4 py-4" radius={22}>
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-4">
                      <Text className="font-sans text-base" style={{ color: glassTheme.text }}>
                        {order.customer}
                      </Text>
                      <Text className="mt-0.5 font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                        {order.id}
                      </Text>
                    </View>
                    <View style={styles.statusPill} className="rounded-full px-3 py-1">
                      <Text className="font-sans text-xs" style={{ color: glassTheme.primary }}>
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-4 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={16} color={glassTheme.muted} />
                      <Text className="ml-1.5 font-sans text-sm" style={{ color: glassTheme.muted }}>
                        Est. {order.eta}
                      </Text>
                    </View>
                    <Text className="font-sans text-sm" style={{ color: glassTheme.text }}>
                      {currencyFormatter.format(order.amount)}
                    </Text>
                  </View>
                </GlassCard>
              ))}
            </View>
          </View>
        </ScrollView>

        <GlassCard
          radius={20}
          className="absolute bottom-9 right-6 px-4 py-3"
          style={styles.fabContainer}
        >
          <Pressable onPress={() => {}}>
            <View className="flex-row items-center">
              <Ionicons name="add-circle-outline" size={20} color={glassTheme.primary} />
              <Text className="ml-2 font-sans text-sm" style={{ color: glassTheme.text }}>
                Order Baru
              </Text>
            </View>
          </Pressable>
        </GlassCard>
      </GlassBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  metricGlass: {
    backgroundColor: "rgba(255,255,255,0.42)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
  },
  statusPill: {
    backgroundColor: glassTheme.primarySoft,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.74)",
  },
  fabContainer: {
    shadowColor: glassTheme.shadow,
    shadowOpacity: 0.26,
  },
});
