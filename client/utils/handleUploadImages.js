import { useState } from "react";
import { Button, Image, ScrollView, View, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase";

const handleUploadImages = async (userType, setImages, images) => {
  try {
    const granted = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Error",
        "Media library permission is required to upload images"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      allowsMultiple: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }

    const selectedImages = pickerResult.selected || [];

    if (selectedImages.length + images.length > 100) {
      Alert.alert("Error", "Cannot upload more than 100 images");
      return;
    }

    const updatedImages = [...images, ...selectedImages];

    const promises = selectedImages.map(async (image, index) => {
      const { uri } = image;
      const storageRef = storage.ref(`images/${userType}/${index}.jpg`);
      const response = await fetch(uri);
      const blob = await response.blob();

      return storageRef.put(blob);
    });

    await Promise.all(promises);

    setImages(updatedImages);
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export default handleUploadImages;
