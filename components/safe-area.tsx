import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaProps {
  children: ReactNode;
  className?: string;
}

export function SafeArea({ children, className = "" }: SafeAreaProps) {
  return (
    <SafeAreaView
      className={`flex-1 ${className}`}
      edges={["top", "left", "right"]}
    >
      {children}
    </SafeAreaView>
  );
}
