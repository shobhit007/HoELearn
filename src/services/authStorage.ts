import { User } from "@/store/slices/auth";
import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "auth_state";

interface AUTH_DATA {
  user: User;
  token: string;
  refreshToken: string;
}

export const saveAuthData = async (data: AUTH_DATA): Promise<void> => {
  await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(data));
};

export const updateUserPhotoUrl = async (
  photoUrl: string | null,
): Promise<void> => {
  const authData = await getAuthData();
  if (!authData) return;

  await saveAuthData({
    ...authData,
    user: {
      ...authData.user,
      photoUrl,
    },
  });
};

export const getAuthData = async (): Promise<AUTH_DATA | null> => {
  const data = await SecureStore.getItemAsync(AUTH_KEY);

  if (!data) return null;

  return JSON.parse(data);
};

export const clearAuthData = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(AUTH_KEY);
};
