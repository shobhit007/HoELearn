import BackButton from "@/components/back-button";
import CourseCard from "@/components/courses/course-card";
import { ThemedText } from "@/components/themed-text";
import { useAppSelector } from "@/hooks/redux";
import { CourseItem } from "@/store/slices/my-courses";
import { Ionicons } from "@expo/vector-icons";
import {
  LegendList,
  type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { router } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyCoursesScreen() {
  const { enrolled } = useAppSelector((state) => state.myCourses);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handlePress = useCallback((courseId: string) => {
    router.navigate({
      pathname: "/course/[id]",
      params: { id: courseId },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<CourseItem>) => (
      <CourseCard course={item} handlePress={handlePress} />
    ),
    [handlePress],
  );

  const keyExtractor = useCallback((item: CourseItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => (
      <View className="mb-2 px-4 pt-2">
        <ThemedText
          type="subtitle"
          style={{ fontSize: 26, lineHeight: 34, marginTop: 4 }}
        >
          Enrolled courses
        </ThemedText>
      </View>
    ),
    [],
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View className="flex-1 items-center px-8 py-20">
        <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primaryLight">
          <Ionicons name="school-outline" size={32} color="#208AEF" />
        </View>
        <ThemedText type="smallBold" style={{ textAlign: "center" }}>
          No enrolled courses yet
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
        >
          Open a course and tap Enroll to start learning.
        </ThemedText>
      </View>
    ),
    [],
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="relative">
        <BackButton transparent onPress={handleBack} />
      </View>
      <LegendList
        data={enrolled}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingTop: 56,
          paddingBottom: 32,
          flexGrow: enrolled.length === 0 ? 1 : undefined,
        }}
        recycleItems={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
