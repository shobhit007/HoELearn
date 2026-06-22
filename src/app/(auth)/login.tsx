import AuthScreenLayout from "@/components/auth/auth-screen-layout";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import ErrorBanner from "@/components/ui/error-banner";
import Input from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/redux";
import { authService } from "@/services/auth.service";
import { saveAuthData, getAuthData } from "@/services/authStorage";
import { setUser } from "@/store/slices/auth";
import { getApiErrorMessage } from "@/utils/errors";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const validate = () => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    setError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const userData = await authService.loginWithEmailAndPassword({
        username: username.trim(),
        password,
      });

      const existingAuth = await getAuthData();
      const photoUrl =
        existingAuth?.user.username === userData.username
          ? (existingAuth.user.photoUrl ?? null)
          : null;

      await saveAuthData({
        user: {
          username: userData.username,
          email: userData.email,
          photoUrl,
        },
        refreshToken: userData.refreshToken,
        token: userData.accessToken,
      });

      dispatch(
        setUser({
          user: {
            username: userData.username,
            email: userData.email,
            photoUrl,
          },
          token: userData.accessToken,
        }),
      );

      router.replace("/(tabs)/home");
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to sign in. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreenLayout
      title="Welcome back"
      subtitle="Sign in to continue learning"
      footer={
        <View className="flex-row items-center gap-1">
          <ThemedText type="small" style={{ color: "#64748B" }}>
            Don&apos;t have an account?
          </ThemedText>
          <Link href="/register">
            <ThemedText type="linkPrimary">Create one</ThemedText>
          </Link>
        </View>
      }
    >
      {error ? <ErrorBanner message={error} /> : null}

      <Input
        label="Username"
        placeholder="Enter your username"
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
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          if (fieldErrors.password) {
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }
        }}
        error={fieldErrors.password}
        autoComplete="password"
        editable={!loading}
      />

      <Button loading={loading} onPress={handleLogin} className="mt-2">
        <ThemedText
          type="smallBold"
          themeColor="secondary"
          style={{ alignSelf: "center" }}
        >
          Sign in
        </ThemedText>
      </Button>
    </AuthScreenLayout>
  );
}
