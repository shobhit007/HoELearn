import { useAppSelector } from "@/hooks/redux";
import {
  initializeNotifications,
  sendBookmarkeNotification,
} from "@/services/notification.service";
import { useEffect } from "react";

const INITIALIZATION_TIMEOUT = 20 * 1000;

export function useNotifications() {
  const bookmarkCount = useAppSelector(
    (state) => state.myCourses.bookmarked.length,
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    const timeout = setTimeout(() => {
      initializeNotifications().catch(() => undefined);
    }, INITIALIZATION_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [user]);

  useEffect(() => {
    sendBookmarkeNotification(bookmarkCount).catch(() => undefined);
  }, [bookmarkCount]);
}
