import AuthScreenLayout from "@/components/auth/auth-screen-layout";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import ErrorBanner from "@/components/ui/error-banner";
import Input from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { getApiErrorMessage } from "@/utils/errors";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const errors: {
      email?: string;
      username?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address";
    }

    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await authService.registerWithEmailAndPassword({
        email: email.trim(),
        password,
        username: username.trim(),
      });

      setSuccess("Account created successfully. You can now sign in.");
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to create account. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenLayout
      title="Create account"
      subtitle="Join HoE Learn and start your journey"
      footer={
        <View className="flex-row items-center gap-1">
          <ThemedText type="small" style={{ color: "#64748B" }}>
            Already have an account?
          </ThemedText>
          <Link href="/login">
            <ThemedText type="linkPrimary">Sign in</ThemedText>
          </Link>
        </View>
      }
    >
      {error ? <ErrorBanner message={error} /> : null}
      {success ? (
        <View className="rounded-lg border border-success/30 bg-success/10 px-4 py-3">
          <ThemedText type="small" style={{ color: "#15803D" }}>
            {success}
          </ThemedText>
        </View>
      ) : null}

      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        keyboardType="email-address"
        onChangeText={(value) => {
          setEmail(value);
          if (fieldErrors.email) {
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }
        }}
        error={fieldErrors.email}
        autoComplete="email"
        editable={!loading}
      />

      <Input
        label="Username"
        placeholder="Choose a username"
        value={username}
        onChangeText={(value) => {
          setUsername(value);
          if (fieldErrors.username) {
            setFieldErrors((prev) => ({ ...prev, username: undefined }));
          }
        }}
        error={fieldErrors.username}
        autoComplete="username"
        editable={!loading}
      />

      <Input
        label="Password"
        placeholder="Create a password"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          if (fieldErrors.password) {
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }
        }}
        error={fieldErrors.password}
        autoComplete="new-password"
        editable={!loading}
      />

      <Button loading={loading} onPress={handleRegister} className="mt-2">
        <ThemedText
          type="smallBold"
          themeColor="secondary"
          style={{ alignSelf: "center" }}
        >
          Create account
        </ThemedText>
      </Button>
    </AuthScreenLayout>
  );
}
