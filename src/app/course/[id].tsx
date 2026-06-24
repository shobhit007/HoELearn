import { getCourseById, RawCourse, toCourseItem } from "@/api/course";
import BackButton from "@/components/back-button";
import CoursesErrorState from "@/components/courses/courses-error-state";
import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useHTML from "@/hooks/useHTML";
import {
  addNewEnrolledCourse,
  toggleBookmarkedCourse,
} from "@/store/slices/my-courses";
import { getApiErrorMessage } from "@/utils/errors";
import { buildCourseActionStateScript } from "@/utils/webViewCourseState";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from "react-native-webview";

type WebViewMessageActions = "ENROLL_EVENT" | "BOOKMARK_EVENT";

const CourseDetails = () => {
  const { id: courseId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const [courseData, setCourseData] = useState<RawCourse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { generateHTML } = useHTML();
  const webViewRef = useRef<WebView | null>(null);
  const isWebViewReadyRef = useRef(false);

  const dispatch = useAppDispatch();
  const { bookmarked, enrolled } = useAppSelector((state) => state.myCourses);

  const isEnrolled = useMemo(() => {
    if (!courseData) return false;
    return enrolled.some((course) => course.id === String(courseData.id));
  }, [courseData, enrolled]);

  const isBookmarked = useMemo(() => {
    if (!courseData) return false;
    return bookmarked.some((course) => course.id === String(courseData.id));
  }, [bookmarked, courseData]);

  const htmlContent = useMemo(
    () => generateHTML(courseData),
    [courseData, generateHTML],
  );

  const applyWebViewCourseState = useCallback(() => {
    if (!isWebViewReadyRef.current || !webViewRef.current) {
      return;
    }

    webViewRef.current.injectJavaScript(
      buildCourseActionStateScript(isEnrolled, isBookmarked),
    );
  }, [isBookmarked, isEnrolled]);

  const fetchCourseById = useCallback(
    async (isRetry = false) => {
      if (!courseId) {
        setError("Course ID is missing.");
        setNotFound(false);
        setCourseData(null);
        setLoading(false);
        setRetrying(false);
        return;
      }

      if (isRetry) {
        setRetrying(true);
      } else {
        setLoading(true);
      }

      setError(null);
      setNotFound(false);

      try {
        const course = await getCourseById(courseId);

        if (!course) {
          setCourseData(null);
          setNotFound(true);
          return;
        }

        setCourseData(course);
      } catch (err) {
        setCourseData(null);
        setError(
          getApiErrorMessage(err, "Unable to load course. Please try again."),
        );
      } finally {
        setLoading(false);
        setRetrying(false);
      }
    },
    [courseId],
  );

  useEffect(() => {
    fetchCourseById();
  }, [fetchCourseById]);

  useEffect(() => {
    applyWebViewCourseState();
  }, [applyWebViewCourseState]);

  const handleRetry = () => {
    fetchCourseById(true);
  };

  const handleWebViewLoadEnd = () => {
    isWebViewReadyRef.current = true;
    applyWebViewCourseState();
  };

  const handleBackButton = () => router.back();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#208AEF" />
          <ThemedText type="small" style={{ color: "#64748B", marginTop: 12 }}>
            Loading course...
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (!courseId) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-error/10">
            <Ionicons name="alert-circle-outline" size={32} color="#EF4444" />
          </View>
          <ThemedText type="smallBold" style={{ textAlign: "center" }}>
            Invalid course link
          </ThemedText>
          <ThemedText
            type="small"
            style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
          >
            This course could not be opened because the link is invalid.
          </ThemedText>
          <Button
            onPress={() => router.back()}
            className="mt-6 w-full max-w-xs"
          >
            <ThemedText
              type="smallBold"
              themeColor="secondary"
              style={{ alignSelf: "center" }}
            >
              Go back
            </ThemedText>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <CoursesErrorState
          title="Couldn't load course"
          message={error}
          onRetry={handleRetry}
          loading={retrying}
        />
      </SafeAreaView>
    );
  }

  if (notFound || !courseData) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primaryLight">
            <Ionicons name="book-outline" size={32} color="#208AEF" />
          </View>
          <ThemedText type="smallBold" style={{ textAlign: "center" }}>
            Course not found
          </ThemedText>
          <ThemedText
            type="small"
            style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
          >
            The course you are looking for does not exist or may have been
            removed.
          </ThemedText>
          <Button
            onPress={() => router.back()}
            className="mt-6 w-full max-w-xs"
          >
            <ThemedText
              type="smallBold"
              themeColor="secondary"
              style={{ alignSelf: "center" }}
            >
              Go back
            </ThemedText>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (!htmlContent) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-8">
          <ThemedText type="smallBold" style={{ textAlign: "center" }}>
            Unable to display course
          </ThemedText>
          <ThemedText
            type="small"
            style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
          >
            Something went wrong while preparing the course content.
          </ThemedText>
          <Button
            onPress={handleRetry}
            loading={retrying}
            className="mt-6 w-full max-w-xs"
          >
            <ThemedText
              type="smallBold"
              themeColor="secondary"
              style={{ alignSelf: "center" }}
            >
              Try again
            </ThemedText>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const payloadAction = event.nativeEvent.data as WebViewMessageActions;

      if (payloadAction === "ENROLL_EVENT") {
        if (isEnrolled) return;
        dispatch(addNewEnrolledCourse(toCourseItem(courseData)));
      } else if (payloadAction === "BOOKMARK_EVENT") {
        dispatch(toggleBookmarkedCourse(toCourseItem(courseData)));
      }
    } catch {
      Alert.alert("Something went wrong", "Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background relative" edges={["bottom"]}>
      <BackButton onPress={handleBackButton} />
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        style={{ flex: 1, backgroundColor: "#F8FAFC" }}
        originWhitelist={["*"]}
        javaScriptEnabled
        showsVerticalScrollIndicator={false}
        onLoadStart={() => {
          isWebViewReadyRef.current = false;
        }}
        onLoadEnd={handleWebViewLoadEnd}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
};

export default CourseDetails;
