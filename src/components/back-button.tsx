import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface BackButtonProps {
  transparent?: boolean;
  onPress: () => void;
}

const BackButton = ({ transparent = false, onPress }: BackButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`absolute left-4 top-6 z-50 w-16 h-16 items-center justify-center rounded-full ${transparent ? "bg-transparent" : "bg-background/30"}`}
    >
      <Ionicons name="arrow-back" size={28} color={"#0F172A"} />
    </TouchableOpacity>
  );
};

export default BackButton;
