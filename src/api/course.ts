import axiosInstance from "@/config/axios";
import { CourseItem } from "@/store/slices/course";

type RawCourse = {
  id: number | string;
  title?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  category?: string;
  rating?: number;
  brand?: string;
};

function mapCourse(raw: RawCourse): CourseItem {
  return {
    id: String(raw.id),
    title: raw.title?.trim() ?? "Untitled course",
    description: raw.description?.trim() ?? "",
    thumbnail: raw.thumbnail ?? raw.images?.[0] ?? "",
  };
}

export const getCourses = async (): Promise<CourseItem[]> => {
  const response = await axiosInstance.get("/public/randomproducts");
  const courses: RawCourse[] = response.data?.data?.data ?? [];
  return courses.map(mapCourse);
};
