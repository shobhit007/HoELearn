import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string | null;
  email: string | null;
  photoUrl?: string | null;
}

export interface AuthState {
  user: User | null;
  isInitialized: boolean;
  isLoading: boolean;
  authError: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
  isLoading: false,
  authError: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>,
    ) => {
      const incomingUser = action.payload.user;

      state.user = {
        ...incomingUser,
        photoUrl:
          incomingUser.photoUrl ?? state.user?.photoUrl ?? null,
      };
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.authError = null;
      state.token = action.payload.token;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.authError = action.payload;
      state.isLoading = false;
    },
    setPhotoUrl: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.photoUrl = action.payload;
      }
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.authError = null;
    },
  },
});

export const {
  setUser,
  setAuthError,
  setAuthLoading,
  logOut,
  setPhotoUrl,
  hydrateAuth,
  setInitialized,
} = authSlice.actions;

export default authSlice.reducer;
