import Avatar from "@/components/avatar";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearAuthData } from "@/services/authStorage";
import { logOut } from "@/store/slices/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user } = useAppSelector((state) => state.auth);
  const { enrolled, bookmarked } = useAppSelector((state) => state.myCourses);
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

        <View className="mt-4 rounded-2xl border border-border bg-card p-4">
          <ProfileStatRow
            label="Enrolled courses"
            count={enrolled.length}
            onPress={() => router.push("/mycourses")}
          />
          <View className="my-3 h-px bg-border" />
          <ProfileStatRow
            label="Bookmarked courses"
            count={bookmarked.length}
            onPress={() => router.navigate("/(tabs)/bookmarks")}
          />
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

function ProfileStatRow({
  label,
  count,
  onPress,
}: {
  label: string;
  count: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      className="flex-row items-center justify-between gap-4 active:opacity-70"
      onPress={onPress}
    >
      <ThemedText type="small" style={{ color: "#64748B" }}>
        {label}
      </ThemedText>
      <View className="flex-row items-center gap-2">
        <ThemedText type="smallBold">{count}</ThemedText>
        <Ionicons name="chevron-forward" size={16} color="#64748B" />
      </View>
    </Pressable>
  );
}
