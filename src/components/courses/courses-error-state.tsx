import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

type CoursesErrorStateProps = {
  message: string;
  onRetry: () => void;
  loading?: boolean;
  title?: string;
};

export default function CoursesErrorState({
  message,
  onRetry,
  loading = false,
  title = "Couldn't load courses",
}: CoursesErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-error/10">
        <Ionicons name="cloud-offline-outline" size={32} color="#EF4444" />
      </View>
      <ThemedText type="smallBold" style={{ textAlign: "center" }}>
        {title}
      </ThemedText>
      <ThemedText
        type="small"
        style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
      >
        {message}
      </ThemedText>
      <Button loading={loading} onPress={onRetry} className="mt-6 w-full max-w-xs">
        <ThemedText
          type="smallBold"
          themeColor="secondary"
          style={{ alignSelf: "center" }}
        >
          Try again
        </ThemedText>
      </Button>
    </View>
  );
}
