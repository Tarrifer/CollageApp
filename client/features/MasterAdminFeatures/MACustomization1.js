import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const MACustomization = ({ onCollageNameChange }) => {
  const [collageName, setCollageName] = useState();
  const [image, setImage] = useState();

  const [showERP, setShowERP] = useState(false);
  const [showOnlineLibrary, setShowOnlineLibrary] = useState(false);
  const [showHomeImage, setShowHomeImage] = useState(false);
  const [showHomeImageText, setShowHomeImageText] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  const handleCollageNameChange = (text) => {
    setCollageName(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TextInput
        style={styles.input}
        placeholder="Enter Collage Name"
        value={collageName}
        onChangeText={handleCollageNameChange}
      />
      <TouchableOpacity style={styles.button}>
        {/* <TouchableOpacity style={styles.button}> */}
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      {/* Add Toggle for Show ERP Card */}
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Show ERP Card</Text>
        <Switch value={showERP} onValueChange={(value) => setShowERP(value)} />
      </View>

      {/* Add Toggle for Show Online Library Card */}
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Show Online Library</Text>
        <Switch
          value={showOnlineLibrary}
          onValueChange={(value) => setShowOnlineLibrary(value)}
        />
      </View>

      {/* Add Toggle for Show Home Image */}
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Show Home Image</Text>
        <Switch
          value={showHomeImage}
          onValueChange={(value) => setShowHomeImage(value)}
        />
      </View>

      {/* Add Toggle for Show Home Image Text */}
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Show Home Image Text</Text>
        <Switch
          value={showHomeImageText}
          onValueChange={(value) => setShowHomeImageText(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#96DED1",
  },
  text: {
    fontWeight: "900",
    fontSize: 20,
    color: "#008080",
  },
  input: {
    margin: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
  },
  button: {
    backgroundColor: "#007FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
});
export default MACustomization;
