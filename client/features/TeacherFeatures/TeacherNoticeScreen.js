import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Camera from "expo-camera";

const TeacherNoticeScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const requestCameraRollPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); //or use requestBackgroundPermissionsAsyn()
    if (status !== "granted")
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
  };

  const pickImage = async () => {
    requestCameraRollPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, ...result.assets]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert("Please enter both title and description!");
      return;
    }

    console.log({
      title,
      description,
      images,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Images:</Text>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image.uri }} style={styles.image} />
            <Button title="Remove" onPress={() => removeImage(index)} />
          </View>
        ))}
      </View>

      <Button title="Pick Images" onPress={pickImage} />
      <View style={{ marginTop: 10 }} />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginTop: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginTop: 5,
    height: 100,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default TeacherNoticeScreen;
