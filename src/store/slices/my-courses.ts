import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseItem {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
}

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

export const { addNewEnrolledCourse, toggleBookmarkedCourse } =
  myCoursesSlice.actions;

export default myCoursesSlice.reducer;
