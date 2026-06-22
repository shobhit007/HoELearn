import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <ThemedText type="subtitle" style={{ fontSize: 24 }}>
        Home
      </ThemedText>
      <ThemedText
        type="small"
        style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
      >
        Your learning feed will appear here.
      </ThemedText>
    </View>
  );
}
