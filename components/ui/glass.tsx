import { glassTheme } from "@/constants/glass-theme";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

type GlassBackgroundProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

type GlassCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  radius?: number;
};

export function GlassBackground({
  children,
  style,
  ...props
}: GlassBackgroundProps) {
  return (
    <View {...props} style={[styles.backgroundRoot, style]}>
      <LinearGradient
        colors={[glassTheme.pageStart, glassTheme.pageMiddle, glassTheme.pageEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.92)", "rgba(255,255,255,0.28)", "rgba(255,255,255,0)"]}
        locations={[0, 0.45, 1]}
        start={{ x: 0.18, y: 0 }}
        end={{ x: 0.95, y: 0.88 }}
        style={styles.topGlow}
      />
      <View style={styles.orbOne} />
      <View style={styles.orbTwo} />
      <View style={styles.orbThree} />
      {children}
    </View>
  );
}

export function GlassCard({
  children,
  style,
  intensity = 42,
  radius = 26,
  ...props
}: GlassCardProps) {
  return (
    <View
      {...props}
      style={[
        styles.cardRoot,
        {
          borderRadius: radius,
        },
        style,
      ]}
    >
      <BlurView
        tint="light"
        intensity={intensity}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <LinearGradient
        colors={[glassTheme.glassStrong, "rgba(255,255,255,0.48)", glassTheme.glass]}
        locations={[0, 0.38, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(255,255,255,0.82)", "rgba(255,255,255,0.06)"]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 0.7 }}
        style={[styles.shine, { borderRadius: radius }]}
      />
      <View
        pointerEvents="none"
        style={[styles.stroke, { borderRadius: radius }]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundRoot: {
    flex: 1,
    backgroundColor: glassTheme.pageMiddle,
    overflow: "hidden",
  },
  topGlow: {
    position: "absolute",
    top: -64,
    right: -40,
    width: 360,
    height: 320,
    borderRadius: 200,
  },
  orbOne: {
    position: "absolute",
    top: 84,
    right: -32,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(103,161,255,0.16)",
  },
  orbTwo: {
    position: "absolute",
    top: 280,
    left: -52,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(141,198,255,0.2)",
  },
  orbThree: {
    position: "absolute",
    bottom: -72,
    right: 16,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(167,217,255,0.16)",
  },
  cardRoot: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: glassTheme.border,
    backgroundColor: glassTheme.glass,
    shadowColor: glassTheme.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "54%",
  },
  stroke: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: glassTheme.border,
  },
});
