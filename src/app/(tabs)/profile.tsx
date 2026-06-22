import Avatar from "@/components/avatar";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearAuthData } from "@/services/authStorage";
import { logOut } from "@/store/slices/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await clearAuthData();
      dispatch(logOut());
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    Alert.alert("Log Out?", "Are you sure want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("canceled!"),
        style: "cancel",
      },
      {
        text: "Log out",
        onPress: handleLogout,
      },
    ]);
  };

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-8">
        <View className="items-center">
          <Avatar photoUrl={user?.photoUrl ?? null} />

          <ThemedText
            type="subtitle"
            style={{ fontSize: 24, marginTop: 16, textAlign: "center" }}
          >
            {user?.username ?? "Guest"}
          </ThemedText>

          <ThemedText
            type="small"
            style={{ color: "#64748B", marginTop: 4, textAlign: "center" }}
          >
            {user?.email ?? "No email available"}
          </ThemedText>
        </View>

        <View className="mt-10 rounded-2xl border border-border bg-card p-4">
          <ProfileRow label="Username" value={user?.username ?? "—"} />
          <View className="my-3 h-px bg-border" />
          <ProfileRow label="Email" value={user?.email ?? "—"} />
        </View>
      </View>

      <View className="px-6 pb-4">
        <Button loading={loading} variant="danger" onPress={handleConfirm}>
          <ThemedText
            type="smallBold"
            themeColor="secondary"
            style={{ alignSelf: "center" }}
          >
            Log out
          </ThemedText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <ThemedText type="small" style={{ color: "#64748B" }}>
        {label}
      </ThemedText>
      <ThemedText type="smallBold" style={{ flex: 1, textAlign: "right" }}>
        {value}
      </ThemedText>
    </View>
  );
}
