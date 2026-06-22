import { ThemedText } from "@/components/themed-text";
import { TextInput, View, type TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <View className="gap-1.5">
      {label ? (
        <ThemedText type="smallBold" style={{ color: "#334155" }}>
          {label}
        </ThemedText>
      ) : null}
      <TextInput
        {...props}
        placeholderTextColor="#64748B"
        selectionColor="#208AEF"
        autoCapitalize="none"
        className={`border rounded-lg p-4 text-gray-700 bg-white border-gray-300 ${className ?? ""}`}
      />
      {error ? (
        <ThemedText type="small" style={{ color: "#EF4444" }}>
          {error}
        </ThemedText>
      ) : null}
    </View>
  );
};

export default Input;
