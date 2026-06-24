import AsyncStorage from "@react-native-async-storage/async-storage";

import { NOTIFICATION_STORAGE_KEYS } from "@/constants/notifications";

export async function bookmarkNotificationSent(): Promise<boolean> {
  const value = await AsyncStorage.getItem(
    NOTIFICATION_STORAGE_KEYS.BOOKMARK_MILESTONE_SENT,
  );
  return value === "true";
}

export async function markBookmarkSent(): Promise<void> {
  await AsyncStorage.setItem(
    NOTIFICATION_STORAGE_KEYS.BOOKMARK_MILESTONE_SENT,
    "true",
  );
}
