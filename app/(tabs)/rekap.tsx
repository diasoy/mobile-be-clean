import { GlassBackground, GlassCard } from "@/components/ui/glass";
import { glassTheme } from "@/constants/glass-theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const weeklyRevenue = [
  { day: "Sen", value: 62 },
  { day: "Sel", value: 48 },
  { day: "Rab", value: 75 },
  { day: "Kam", value: 58 },
  { day: "Jum", value: 82 },
  { day: "Sab", value: 69 },
  { day: "Min", value: 41 },
];

export default function RekapScreen() {
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
              colors={["rgba(47,128,255,0.16)", "rgba(102,192,255,0.08)", "rgba(255,255,255,0)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <Text className="font-sans text-sm" style={{ color: glassTheme.muted }}>
              Laporan bulan ini
            </Text>
            <Text className="mt-1 font-sans text-[31px] leading-9" style={{ color: glassTheme.text }}>
              Rp 18.420.000
            </Text>

            <View className="mt-5 flex-row gap-3">
              <View style={styles.metricGlass} className="flex-1 rounded-2xl px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                  Order
                </Text>
                <Text className="mt-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                  381
                </Text>
              </View>
              <View style={styles.metricGlass} className="flex-1 rounded-2xl px-4 py-3">
                <Text className="font-sans text-xs uppercase tracking-wide" style={{ color: glassTheme.muted }}>
                  Growth
                </Text>
                <View className="mt-1 flex-row items-center">
                  <Ionicons name="trending-up" size={16} color={glassTheme.success} />
                  <Text className="ml-1 font-sans text-2xl" style={{ color: glassTheme.text }}>
                    12%
                  </Text>
                </View>
              </View>
            </View>
          </GlassCard>

          <GlassCard className="mt-6 p-5" radius={26}>
            <Text className="font-sans text-lg" style={{ color: glassTheme.text }}>
              Tren Pendapatan Mingguan
            </Text>
            <View className="mt-5 flex-row items-end justify-between">
              {weeklyRevenue.map((item) => (
                <View key={item.day} className="items-center">
                  <View style={styles.barTrack} className="h-40 w-7 justify-end rounded-full p-[3px]">
                    <LinearGradient
                      colors={["#5CC9FF", "#2F80FF"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={[styles.barFill, { height: `${item.value}%` }]}
                    />
                  </View>
                  <Text className="mt-2 font-sans text-xs" style={{ color: glassTheme.muted }}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </GlassCard>

          <View className="mt-6 gap-3">
            <GlassCard className="px-4 py-4" radius={22}>
              <View className="flex-row items-center justify-between">
                <Text className="font-sans text-sm" style={{ color: glassTheme.muted }}>
                  AOV (Average Order Value)
                </Text>
                <Ionicons name="stats-chart-outline" size={18} color={glassTheme.muted} />
              </View>
              <Text className="mt-2 font-sans text-2xl" style={{ color: glassTheme.text }}>
                Rp 48.300
              </Text>
            </GlassCard>

            <GlassCard className="px-4 py-4" radius={22}>
              <View className="flex-row items-center justify-between">
                <Text className="font-sans text-sm" style={{ color: glassTheme.muted }}>
                  Order selesai tepat waktu
                </Text>
                <Ionicons name="checkmark-done-outline" size={18} color={glassTheme.success} />
              </View>
              <Text className="mt-2 font-sans text-2xl" style={{ color: glassTheme.text }}>
                94%
              </Text>
            </GlassCard>
          </View>
        </ScrollView>
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
  barTrack: {
    backgroundColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.76)",
  },
  barFill: {
    width: "100%",
    borderRadius: 999,
  },
});
