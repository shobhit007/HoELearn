import axiosInstance from "@/config/axios";
import { User } from "@/store/slices/auth";

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  loginWithEmailAndPassword: async (formData: {
    username: string;
    password: string;
  }): Promise<AuthResponse> => {
    const { username, password } = formData;
    const response = await axiosInstance.post("/users/login", {
      username,
      password,
    });

    const data = response.data.data;

    return {
      email: data.user.email,
      username: data.user.username,
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
    };
  },
  registerWithEmailAndPassword: async (formData: {
    username: string;
    email: string;
    password: string;
  }): Promise<void> => {
    await axiosInstance.post("/users/register", {
      email: formData.email,
      password: formData.password,
      username: formData.username,
    });
  },
};
