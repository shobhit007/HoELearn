import {
  BOOKMARK_MILESTONE_COUNT,
  INACTIVITY_SECONDS,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_COPY,
  NOTIFICATION_IDENTIFIERS,
} from "@/constants/notifications";
import {
  bookmarkNotificationSent,
  markBookmarkSent,
} from "@/services/notificationStorage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

type AndroidChannelNames = "default";

export const isPermissionGranted = async (): Promise<boolean> => {
  return (await Notifications.getPermissionsAsync()).granted;
};

export async function createAndroidChannel(channel: AndroidChannelNames) {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync(
    NOTIFICATION_CHANNELS.DEFAULT,
    {
      name: channel,
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#208AEF",
    },
  );
}

export async function requestNotificationPermissions(): Promise<void> {
  const response = await Notifications.getPermissionsAsync();

  console.log("notification permission response", response);

  if (!response.granted && response.canAskAgain) {
    await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
  }
}

export async function sendBookmarkeNotification(
  bookmarkCount: number,
): Promise<void> {
  if (bookmarkCount < BOOKMARK_MILESTONE_COUNT) return;

  const alreadySent = await bookmarkNotificationSent();
  if (alreadySent) return;

  const granted = await isPermissionGranted();
  if (!granted) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: NOTIFICATION_COPY.bookmarkMilestone.title,
      body: NOTIFICATION_COPY.bookmarkMilestone.body,
      sound: true,
      ...(Platform.OS === "android"
        ? { channelId: NOTIFICATION_CHANNELS.DEFAULT }
        : {}),
    },
    trigger: null,
  });

  await markBookmarkSent();
}

export async function scheduleInactivityReminder(): Promise<void> {
  const granted = await isPermissionGranted();
  if (!granted) return;

  console.log("scheduling inactivity notification");

  await Notifications.cancelScheduledNotificationAsync(
    NOTIFICATION_IDENTIFIERS.INACTIVITY_24H,
  ).catch(() => undefined);

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_IDENTIFIERS.INACTIVITY_24H,
    content: {
      title: NOTIFICATION_COPY.inactivity.title,
      body: NOTIFICATION_COPY.inactivity.body,
      sound: true,
      ...(Platform.OS === "android"
        ? { channelId: NOTIFICATION_CHANNELS.DEFAULT }
        : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: INACTIVITY_SECONDS,
      channelId:
        Platform.OS === "android" ? NOTIFICATION_CHANNELS.DEFAULT : undefined,
    },
  });
}

export async function initializeNotifications(): Promise<void> {
  // configure notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  await createAndroidChannel("default");
  await requestNotificationPermissions();

  // schedule inactivity reminder
  await scheduleInactivityReminder();
}
