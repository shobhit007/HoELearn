import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="bg-background px-4 pb-3 pt-2">
      <View
        className="flex-row items-center rounded-2xl border border-border bg-card px-4"
        style={{
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Ionicons name="search" size={20} color="#64748B" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search by title, topic, or instructor..."
          placeholderTextColor="#94A3B8"
          selectionColor="#208AEF"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          className="flex-1 py-3.5 pl-3 text-base text-text"
        />
      </View>
    </View>
  );
}
