import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import MasterAdminHomePage from "../../pages/MasterAdmin/MasterAdminHomePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BigCardCollage } from "../../features/MasterAdminFeatures/MACustomization";

const BigCardCollage = ({ collageName, image }) => {
  const handleCardPress = () => {
    // Navigate to the MasterAdminHomePage and pass collageName and image as route params
    navigation.navigate("Customization", { collageName, image });
  };
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.bigCard}
        onPress={() => handleCardPress("Customization")}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.bigCardImage} />
        ) : (
          <Image
            source={require("../../image/3033337.png")}
            style={styles.bigCardImage}
          />
        )}
        <Text style={styles.bigCardText}>{collageName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export { BigCardCollage };

// Inside MACustomization component

const MACustomization = () => {
  const navigation = useNavigation();
  //   console.log("Navigation before navigate:", navigation);

  //   navigation.navigate("MasterAdminHomePage", { collageName, image });
  //   console.log("Navigation after navigate:", navigation);
  const [collageName, setCollageName] = useState("");
  const [image, setImage] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    loadCollageData();
  }, []);

  const loadCollageData = async () => {
    try {
      const savedCollageName = await AsyncStorage.getItem("collageName");
      const savedImage = await AsyncStorage.getItem("collageImage");
      if (savedCollageName !== null) {
        setCollageName(savedCollageName);
      }
      if (savedImage !== null) {
        setImage(savedImage);
      }
    } catch (error) {
      console.error("Error loading collage data: ", error);
    }
  };
  const saveCollageData = async () => {
    try {
      if (isDataChanged) {
        await AsyncStorage.setItem("collageName", collageName);
        await AsyncStorage.setItem("collageImage", image || "");
        setIsDataChanged(false);
      }
    } catch (error) {
      console.error("Error saving collage data: ", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      //   saveCollageData(collageName, result.assets[0].uri);
      setIsDataChanged(true);
    }
  };

  const handleCollageNameChange = (text) => {
    setCollageName(text);
    // saveCollageData(text, image);
    setIsDataChanged(true);
  };
  const resetCollageData = async () => {
    try {
      await AsyncStorage.removeItem("collageName");
      await AsyncStorage.removeItem("collageImage");
      setCollageName("Collage Name");
      setImage(null);
      setIsDataChanged(false);
    } catch (error) {
      console.error("Error resetting collage data: ", error);
    }
  };
  const handleSaveChanges = () => {
    navigation.navigate("MasterAdminHome", { collageName, image });
    saveCollageData();
  };
  return (
    <View style={styles.container}>
      <BigCardCollage collageName={collageName} image={image} />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
      <Text style={styles.text}>Enter University Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Collage Name"
        value={collageName}
        onChangeText={handleCollageNameChange}
      />
      <TouchableOpacity
        style={styles.button}
        // onPress={() => saveCollageData(collageName, image)}
        onPress={handleSaveChanges}
      >
        {/* <TouchableOpacity style={styles.button}> */}
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetCollageData}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
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
  bigCard: {
    margin: 20,

    width: "90%",
    aspectRatio: 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bigCardText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    top: 60,
  },
  bigCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
});
export default MACustomization;
