import { useAppDispatch } from "@/hooks/redux";
import { updateUserPhotoUrl } from "@/services/authStorage";
import { setPhotoUrl } from "@/store/slices/auth";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Alert, Pressable } from "react-native";

const Avatar = ({ photoUrl }: { photoUrl: string | null }) => {
  const dispatch = useAppDispatch();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      try {
        dispatch(setPhotoUrl(uri));
        await updateUserPhotoUrl(uri);
      } catch {
        dispatch(setPhotoUrl(photoUrl));
        Alert.alert(
          "Unable to save photo",
          "Your avatar could not be saved. Please try again.",
        );
      }
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      className="h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-primaryLight"
    >
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      ) : (
        <Ionicons name="person" size={48} color="#208AEF" />
      )}
    </Pressable>
  );
};

export default Avatar;
