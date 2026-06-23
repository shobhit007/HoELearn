import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseItem {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
}

export interface CourseState {
  courses: CourseItem[];
  loading: boolean;
}

const initialState: CourseState = {
  courses: [],
  loading: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseItem[]>) => {
      state.courses = action.payload;
      state.loading = false;
    },
    setCourseLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCourses, setCourseLoading } = courseSlice.actions;
export default courseSlice.reducer;
