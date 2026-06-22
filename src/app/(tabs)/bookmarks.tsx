import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function BookmarksScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <ThemedText type="subtitle" style={{ fontSize: 24 }}>
        Bookmarks
      </ThemedText>
      <ThemedText
        type="small"
        style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
      >
        Saved lessons and articles will show up here.
      </ThemedText>
    </View>
  );
}
