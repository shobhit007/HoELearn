import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAuthData } from "@/services/authStorage";
import { hydrateAuth, setInitialized } from "@/store/slices/auth";
import { Redirect } from "expo-router";
import { useEffect } from "react";

const index = () => {
  const { isInitialized, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const authData = await getAuthData();
      if (authData) {
        dispatch(hydrateAuth({ user: authData.user, token: authData.token }));
      }

      dispatch(setInitialized(true));
    } catch {
      dispatch(setInitialized(true));
    }
  };

  if (!isInitialized) {
    return null;
  }

  return user ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />;
};

export default index;
