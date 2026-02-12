import { Ionicons } from "@expo/vector-icons";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastVariant = "success" | "error" | "info";
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type ToastOptions = {
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastApi = {
  show: (message: string, options?: ToastOptions) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

function getToastStyle(
  variant: ToastVariant,
): { icon: IoniconName; accent: string } {
  switch (variant) {
    case "success":
      return { icon: "checkmark-circle", accent: "#16A34A" };
    case "error":
      return { icon: "alert-circle", accent: "#DC2626" };
    case "info":
    default:
      return { icon: "information-circle", accent: "#2563EB" };
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<{
    message: string;
    variant: ToastVariant;
  } | null>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = null;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -12,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setToast(null);
    });
  }, [opacity, translateY]);

  const show = useCallback(
    (message: string, options?: ToastOptions) => {
      const variant = options?.variant ?? "info";
      const durationMs = options?.durationMs ?? 2600;

      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = null;

      setToast({ message, variant });
      opacity.setValue(0);
      translateY.setValue(-12);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();

      hideTimeout.current = setTimeout(hide, durationMs);
    },
    [hide, opacity, translateY],
  );

  const value = useMemo<ToastApi>(() => ({ show }), [show]);
  const style = toast ? getToastStyle(toast.variant) : null;

  return (
    <ToastContext.Provider value={value}>
      {children}

      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        {toast && style && (
          <Pressable
            onPress={hide}
            style={{
              marginTop: insets.top + 12,
              paddingHorizontal: 16,
            }}
          >
            <Animated.View
              style={{
                opacity,
                transform: [{ translateY }],
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderLeftWidth: 4,
                borderLeftColor: style.accent,
                shadowColor: "#000",
                shadowOpacity: 0.12,
                shadowRadius: 18,
                shadowOffset: { width: 0, height: 10 },
                elevation: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name={style.icon}
                  size={20}
                  color={style.accent}
                />
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    color: "#0F172A",
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                  numberOfLines={3}
                >
                  {toast.message}
                </Text>
              </View>
            </Animated.View>
          </Pressable>
        )}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return toast;
}
