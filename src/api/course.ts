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

export type CourseInstructor = {
  name: string;
  avatarUrl: string;
};

type RawInstructor = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    medium?: string;
    thumbnail?: string;
  };
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

export async function getInstructors(limit = 4): Promise<CourseInstructor[]> {
  const response = await axiosInstance.get(
    `/public/randomusers?page=1&limit=${limit}`,
  );
  const users: RawInstructor[] = response.data?.data?.data ?? [];

  return users.map((user) => ({
    name: `${user.name.first} ${user.name.last}`.trim(),
    avatarUrl: user.picture?.medium ?? user.picture?.thumbnail ?? "",
  }));
}
