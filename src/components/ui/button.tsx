import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  loading?: boolean;
  variant?: "primary" | "danger";
};

const Button = ({
  loading = false,
  variant = "primary",
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const variantClass =
    variant === "danger" ? "bg-error" : "bg-primary";

  return (
    <TouchableOpacity
      {...props}
      disabled={isDisabled}
      className={`p-4 rounded-lg ${variantClass} ${isDisabled ? "opacity-60" : ""} ${className ?? ""}`}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
