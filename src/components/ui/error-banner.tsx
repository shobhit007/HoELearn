import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

type ErrorBannerProps = {
  message: string;
};

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <View className="rounded-lg border border-error/30 bg-error/10 px-4 py-3">
      <ThemedText type="small" style={{ color: "#B91C1C" }}>
        {message}
      </ThemedText>
    </View>
  );
}
