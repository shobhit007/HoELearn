export const NOTIFICATION_CHANNELS = {
  DEFAULT: "default",
} as const;

export const NOTIFICATION_IDENTIFIERS = {
  INACTIVITY_24H: "inactivity-24h-reminder",
} as const;

export const NOTIFICATION_STORAGE_KEYS = {
  BOOKMARK_MILESTONE_SENT: "@notifications/bookmark_milestone_sent",
} as const;

export const BOOKMARK_MILESTONE_COUNT = 5;

export const INACTIVITY_SECONDS = 24 * 60 * 60;

export const NOTIFICATION_COPY = {
  bookmarkMilestone: {
    title: "You're building a great library!",
    body: "You've bookmarked 5 or more courses. Jump back in and keep learning.",
  },
  inactivity: {
    title: "We miss you at HoELearn",
    body: "It's been a while. Open the app and continue your learning journey.",
  },
} as const;
