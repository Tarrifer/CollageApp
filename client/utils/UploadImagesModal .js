import React, { useState } from "react";
import { Button, Image, ScrollView, View, Text, Alert } from "react-native";
import { handleUploadImages } from "../utils/imageUpload";

const UploadImagesModal = ({
  userType,
  setImages,
  images,
  visible,
  onRequestClose,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleRemoveImage = async () => {
    if (selectedImageIndex === null) {
      return;
    }

    const storageRef = storage.ref(
      `images/${userType}/${selectedImageIndex}.jpg`
    );

    try {
      await storageRef.delete();

      const updatedImages = images.filter(
        (_, index) => index !== selectedImageIndex
      );

      setImages(updatedImages);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleUploadImage = async () => {
    if (selectedImageIndex === null) {
      return;
    }

    const updatedImages = images.filter(
      (_, index) => index !== selectedImageIndex
    );

    handleUploadImages(userType, setImages, updatedImages);
  };

  const renderImage = (image, index) => (
    <View key={index}>
      <Image
        source={{ uri: image.uri }}
        style={{ width: 100, height: 100 }}
        onPress={() => setSelectedImageIndex(index)}
      />
      <View style={{ flexDirection: "row" }}>
        <Button title="Upload" onPress={handleUploadImage} />
        <Button title="Remove" onPress={handleRemoveImage} />
      </View>
    </View>
  );

  return (
    <View>
      <ScrollView>
        {images.map((image, index) => renderImage(image, index))}
      </ScrollView>
      <Button
        title="Upload Images"
        onPress={() => handleUploadImages(userType, setImages, images)}
      />
    </View>
  );
};

export default UploadImagesModal;
