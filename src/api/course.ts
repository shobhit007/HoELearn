import axiosInstance from "@/config/axios";
import { CourseItem } from "@/store/slices/my-courses";

export type RawCourse = {
  id: number | string;
  title?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  category?: string;
  rating?: number;
  brand?: string;
};

export function toCourseItem(raw: RawCourse): CourseItem {
  return {
    id: String(raw.id),
    title: raw.title?.trim() ?? "Untitled course",
    description: raw.description?.trim() ?? "",
    thumbnail: raw.thumbnail ?? raw.images?.[0] ?? "",
  };
}

function mapCourse(raw: RawCourse): CourseItem {
  return toCourseItem(raw);
}

export const getCourses = async (): Promise<CourseItem[]> => {
  const response = await axiosInstance.get("/public/randomproducts");
  const courses: RawCourse[] = response.data?.data?.data ?? [];
  return courses.map(mapCourse);
};

export const getCourseById = async (id: string): Promise<RawCourse | null> => {
  const response = await axiosInstance.get(`/public/randomproducts/${id}`);
  const course: RawCourse = response.data?.data ?? null;
  return course;
};
