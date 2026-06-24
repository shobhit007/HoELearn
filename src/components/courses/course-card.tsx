import { ThemedText } from "@/components/themed-text";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { CourseItem, toggleBookmarkedCourse } from "@/store/slices/my-courses";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, View } from "react-native";
import CourseThumbnail from "./course-thumbnail";

type CourseCardProps = {
  course: CourseItem;
  handlePress: (id: string) => void;
};

function CourseCard({ course, handlePress }: CourseCardProps) {
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector((state) =>
    state.myCourses.bookmarked.some(
      (bookmarked) => bookmarked.id === course.id,
    ),
  );
  const hasThumbnail = Boolean(course.thumbnail);

  const handleBookmarkPress = () => {
    dispatch(toggleBookmarkedCourse(course));
  };

  return (
    <Pressable
      className="mx-4 mb-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm active:opacity-95 relative"
      style={{
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
      onPress={() => handlePress(course.id)}
    >
      <View
        className="relative w-full bg-primaryLight"
        style={{ aspectRatio: 16 / 9 }}
      >
        {hasThumbnail ? (
          <CourseThumbnail
            thumbnail={course.thumbnail}
            recyclingKey={course.id}
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="book-outline" size={44} color="#208AEF" />
          </View>
        )}

        <Pressable
          className="absolute right-3 top-3 items-center justify-center rounded-full bg-white/95"
          style={{
            width: 36,
            height: 36,
            zIndex: 10,
            shadowColor: "#0F172A",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
          }}
          hitSlop={8}
          onPress={handleBookmarkPress}
        >
          <Ionicons
            name={isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color="#208AEF"
          />
        </Pressable>
      </View>

      <View className="gap-2 p-4">
        <ThemedText type="smallBold" numberOfLines={2} style={{ fontSize: 16 }}>
          {course.title}
        </ThemedText>

        {course.description ? (
          <ThemedText
            type="small"
            numberOfLines={2}
            style={{ color: "#64748B", lineHeight: 20 }}
          >
            {course.description}
          </ThemedText>
        ) : null}
      </View>
    </Pressable>
  );
}

export default memo(CourseCard);
