import { store } from "@/store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("axios request error", error);
    // handle errors
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
