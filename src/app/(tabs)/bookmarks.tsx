import CourseCard from "@/components/courses/course-card";
import { ThemedText } from "@/components/themed-text";
import { useAppSelector } from "@/hooks/redux";
import { CourseItem } from "@/store/slices/course";
import { Ionicons } from "@expo/vector-icons";
import {
  LegendList,
  type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { useCallback } from "react";
import { View } from "react-native";

export default function BookmarksScreen() {
  const { bookmarked } = useAppSelector((state) => state.myCourses);

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<CourseItem>) => (
      <CourseCard course={item} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: CourseItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => (
      <View className="mb-2 px-4 pt-2">
        <ThemedText
          type="subtitle"
          style={{ fontSize: 26, lineHeight: 34, marginTop: 4 }}
        >
          Bookmarked courses
        </ThemedText>
        <ThemedText type="small" style={{ color: "#64748B", marginTop: 6 }}>
          {bookmarked.length === 1
            ? "1 course saved"
            : `${bookmarked.length} courses saved`}
        </ThemedText>
      </View>
    ),
    [bookmarked.length],
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View className="flex-1 items-center px-8 py-20">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primaryLight">
          <Ionicons name="bookmark-outline" size={32} color="#208AEF" />
        </View>
        <ThemedText type="smallBold" style={{ textAlign: "center" }}>
          No bookmarked courses yet
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
        >
          Tap the bookmark icon on any course from Home to save it here.
        </ThemedText>
      </View>
    ),
    [],
  );

  return (
    <View className="flex-1 bg-background">
      <LegendList
        data={bookmarked}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={320}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 32,
          flexGrow: bookmarked.length === 0 ? 1 : undefined,
        }}
        recycleItems={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
