import CourseCard from "@/components/courses/course-card";
import CoursesErrorState from "@/components/courses/courses-error-state";
import SearchBar from "@/components/courses/search-bar";
import { ThemedText } from "@/components/themed-text";
import ErrorBanner from "@/components/ui/error-banner";
import { useCourses } from "@/hooks/useCourses";
import { CourseItem } from "@/store/slices/my-courses";
import {
  LegendList,
  type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    courses,
    initialLoading,
    refreshing,
    retrying,
    error,
    refresh,
    retry,
  } = useCourses();

  const isSearching = searchQuery.trim().length > 0;

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query),
    );
  }, [courses, searchQuery]);

  const onhandlePress = useCallback((id: string) => {
    router.navigate({
      pathname: "/course/[id]",
      params: { id },
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<CourseItem>) => (
      <CourseCard course={item} handlePress={onhandlePress} />
    ),
    [onhandlePress],
  );

  const keyExtractor = useCallback((item: CourseItem) => item.id, []);

  const ListEmptyComponent = useCallback(() => {
    if (initialLoading) return null;

    return (
      <View className="items-center px-8 py-16">
        <ThemedText type="smallBold" style={{ textAlign: "center" }}>
          {isSearching ? "No matching courses" : "No courses available"}
        </ThemedText>
        <ThemedText
          type="small"
          style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
        >
          {isSearching
            ? "Try a different search term."
            : "Pull down to refresh the list."}
        </ThemedText>
      </View>
    );
  }, [initialLoading, isSearching]);

  const ListHeaderComponent = useCallback(() => {
    return (
      <View>
        {error && courses.length > 0 ? (
          <View className="mb-4 px-4">
            <ErrorBanner message={error} />
          </View>
        ) : null}
        <View className="mb-2 px-4 pt-1">
          <ThemedText
            type="subtitle"
            style={{ fontSize: 26, lineHeight: 34, marginTop: 4 }}
          >
            Explore courses
          </ThemedText>
        </View>
      </View>
    );
  }, [courses.length, error, filteredCourses.length, isSearching]);

  if (initialLoading) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background">
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#208AEF" />
          <ThemedText type="small" style={{ color: "#64748B", marginTop: 12 }}>
            Loading courses...
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (error && courses.length === 0) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background">
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <CoursesErrorState message={error} onRetry={retry} loading={retrying} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <LegendList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={320}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 32,
          flexGrow: filteredCourses.length === 0 ? 1 : undefined,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#208AEF"
            colors={["#208AEF"]}
          />
        }
        recycleItems={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
