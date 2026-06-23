import { CourseItem } from "@/store/slices/course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyCoursesState {
  enrolled: CourseItem[];
  bookmarked: CourseItem[];
}

const initialState: MyCoursesState = {
  enrolled: [],
  bookmarked: [],
};

const myCoursesSlice = createSlice({
  name: "my-courses",
  initialState,
  reducers: {
    addNewEnrolledCourse: (state, action: PayloadAction<CourseItem>) => {
      if (state.enrolled.some((course) => course.id === action.payload.id)) {
        return;
      }
      state.enrolled.push(action.payload);
    },
    removeBookmarkedCourse: (state, action: PayloadAction<{ id: string }>) => {
      state.bookmarked = state.bookmarked.filter(
        (course) => course.id !== action.payload.id,
      );
    },
    toggleBookmarkedCourse: (state, action: PayloadAction<CourseItem>) => {
      const index = state.bookmarked.findIndex(
        (course) => course.id === action.payload.id,
      );

      if (index >= 0) {
        state.bookmarked.splice(index, 1);
      } else {
        state.bookmarked.push(action.payload);
      }
    },
  },
});

export const {
  addNewEnrolledCourse,
  removeBookmarkedCourse,
  toggleBookmarkedCourse,
} = myCoursesSlice.actions;

export default myCoursesSlice.reducer;
