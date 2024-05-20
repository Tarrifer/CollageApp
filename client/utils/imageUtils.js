// // utils/imageUtils.js
// import * as ImagePicker from "expo-image-picker";
// import { Alert } from "react-native";

// export const requestCameraPermissions = async () => {
//   const { status } = await ImagePicker.requestCameraPermissionsAsync();
//   if (status !== "granted") {
//     Alert.alert("Permission Required", "Please grant camera access permission");
//     return false;
//   }
//   return true;
// };

// export const launchBurstModeCamera = async () => {
//   const images = [];
//   const permissionGranted = await requestCameraPermissions();
//   if (!permissionGranted) return images;

//   try {
//     for (let i = 0; i < 100; i++) {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsMultipleSelection: false,
//         quality: 1,
//       });

//       if (!result.canceled) {
//         if (result.assets && result.assets.length > 0) {
//           images.push(result.assets[0].uri);
//         }
//       } else {
//         break;
//       }
//     }
//   } catch (error) {
//     console.log("Error taking burst photos:", error);
//     Alert.alert("Error", "An error occurred while taking photos");
//   }

//   return images;
// };

// export const launchImageLibrary = async () => {
//   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (status !== "granted") {
//     Alert.alert(
//       "Permission Required",
//       "Please grant permission to access photos"
//     );
//     return [];
//   }

//   try {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       return result.assets.map((asset) => asset.uri);
//     }
//   } catch (error) {
//     console.log("Error selecting images:", error);
//     Alert.alert("Error", "An error occurred while selecting images");
//   }

//   return [];
// };

// utils/imageUtils.js
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const requestCameraPermissions = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Required", "Please grant camera access permission");
    return false;
  }
  return true;
};

export const launchBurstModeCamera = async () => {
  const images = [];
  const permissionGranted = await requestCameraPermissions();
  if (!permissionGranted) return images;

  try {
    for (let i = 0; i < 100; i++) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (!result.canceled) {
        if (result.assets && result.assets.length > 0) {
          images.push(result.assets[0].uri);
        }
      } else {
        break;
      }
    }
  } catch (error) {
    console.log("Error taking burst photos:", error);
    Alert.alert("Error", "An error occurred while taking photos");
  }

  return images;
};

export const launchImageLibrary = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Please grant permission to access photos"
    );
    return [];
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets.map((asset) => asset.uri);
    }
  } catch (error) {
    console.log("Error selecting images:", error);
    Alert.alert("Error", "An error occurred while selecting images");
  }

  return [];
};
