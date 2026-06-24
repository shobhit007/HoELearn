import { getCourses } from "@/api/course";
import { CourseItem } from "@/store/slices/my-courses";
import { getApiErrorMessage } from "@/utils/errors";
import { useCallback, useEffect, useState } from "react";

type FetchMode = "initial" | "refresh" | "retry";

export function useCourses() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async (mode: FetchMode = "initial") => {
    if (mode === "refresh") {
      setRefreshing(true);
    } else if (mode === "retry") {
      setRetrying(true);
    } else {
      setInitialLoading(true);
    }

    setError(null);

    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Unable to load courses. Please try again."),
      );
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
      setRetrying(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses("initial");
  }, [fetchCourses]);

  return {
    courses,
    initialLoading,
    refreshing,
    retrying,
    error,
    refresh: () => fetchCourses("refresh"),
    retry: () => fetchCourses("retry"),
  };
}
