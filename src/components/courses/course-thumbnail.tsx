import { getCourseImageUrl, resolveNativeImageUri } from "@/utils/courseImage";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type CourseThumbnailProps = {
  thumbnail?: string;
  images?: string[];
  recyclingKey: string;
};

export default function CourseThumbnail({
  thumbnail,
  images,
  recyclingKey,
}: CourseThumbnailProps) {
  const [resolvedUri, setResolvedUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const sourceUri = getCourseImageUrl({ thumbnail, images });

  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      if (!sourceUri) {
        setResolvedUri(null);
        setFailed(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setFailed(false);

      try {
        const uri = await resolveNativeImageUri(sourceUri);

        if (cancelled) return;

        if (!uri) {
          setResolvedUri(null);
          setFailed(true);
        } else {
          setResolvedUri(uri);
        }
      } catch {
        if (!cancelled) {
          setResolvedUri(null);
          setFailed(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [sourceUri]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#208AEF" />
      </View>
    );
  }

  if (failed || !resolvedUri) {
    return (
      <View style={styles.container}>
        <Ionicons name="book-outline" size={44} color="#208AEF" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: resolvedUri }}
      style={styles.image}
      contentFit="cover"
      transition={200}
      cachePolicy="memory-disk"
      recyclingKey={recyclingKey}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBEAFE",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
