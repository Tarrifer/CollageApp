import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
// import { getUserType, setUserType } from "../../components/userType";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImageModal from "../../components/ImageModal";
import {
  launchBurstModeCamera,
  launchImageLibrary,
} from "../../utils/imageUtils";

const SignupPage = () => {
  // const userType = getUserType();
  // const setUserType = setUserType();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [department, setDepartment] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [universityCode, setUniversityCode] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  // const [userImage, setUserImage] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (userType == "Master Admin") {
      setUserImage(null);
    }
  }, [userType]);

  const handleImageUpload = async () => {
    const images = await launchBurstModeCamera();
    if (images.length > 0) {
      setUserImages(images);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...userImages];
    updatedImages.splice(index, 1);
    setUserImages(updatedImages);
  };

  const handleReuploadImages = async () => {
    const images = await launchImageLibrary();
    if (images.length > 0) {
      setUserImages(images);
    }
  };
  // const handleImageUpload = async () => {
  //   const images = await launchBurstModeCamera();
  //   if (images.length > 0) {
  //     setUserImages(images);
  //   }
  // };

  // const handleSelectImages = async () => {
  //   const images = await launchImageLibrary();
  //   if (images.length > 0) {
  //     setUserImages(images);
  //   }
  // };

  // const handleRemoveImage = (index) => {
  //   const updatedImages = [...userImages];
  //   updatedImages.splice(index, 1);
  //   setUserImages(updatedImages);
  // };

  // const handleReuploadImages = async () => {
  //   const images = await launchImageLibrary();
  //   if (images.length > 0) {
  //     setUserImages(images);
  //   }
  // };

  // const handleImageUpload = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     Alert.alert(
  //       "Permission Required",
  //       "Please grant permission to access photos"
  //     );
  //     return;
  //   }

  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       if (result.assets && result.assets.length > 0) {
  //         setUserImage(result.assets[0].uri);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error selecting image:", error);
  //     Alert.alert("Error", "An error occurred while selecting image");
  //   }
  // };

  // const handleRemoveImage = () => {
  //   setUserImage(null);
  // };

  const handleSignup = () => {
    if (
      !email ||
      !password ||
      !universityName ||
      !confirmPassword ||
      !name ||
      !schoolName ||
      !department ||
      !registerNumber ||
      (userType === "Student" && !rollNumber) ||
      !phoneNumber ||
      (userType === "Master Admin" &&
        (!country ||
          !location ||
          !universityCode ||
          !postcode ||
          !city ||
          !address)) ||
      !userType ||
      // (userType !== "Master Admin" && !userImage)
      (userType !== "Master Admin" && userImages.length === 0)
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // Signup logic
    // ...

    navigation.navigate("OTPVerification", { userType });
    // navigation.navigate("Pending", { userType });
  };
  // const handleSignup = () => {
  //   if (
  //     !email ||
  //     !password ||
  //     !confirmPassword ||
  //     !name ||
  //     !schoolName ||
  //     !department ||
  //     !registerNumber ||
  //     // !rollNumber ||
  //     (userType === "Student" && !rollNumber) ||
  //     !phoneNumber ||
  //     !universityName ||
  //     !userType ||
  //     (userType !== "Master Admin" && !userImage)
  //   ) {
  //     Alert.alert("Error", "Please fill in all fields");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     Alert.alert("Error", "Passwords do not match");
  //     return;
  //   }

  //   // Signup logic
  //   // ...

  //   navigation.navigate("OTPVerification", { userType });
  //   // navigation.navigate("Pending", { userType });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNK57Oj5ro7C-aFzfBHXuesubrY8lbH4Bxew&s.png",
            }}
          />
        </View>

        <KeyboardAvoidingView style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>User Type:</Text>
            <Picker
              selectedValue={userType}
              onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Choose User Type" value="" />
              <Picker.Item label="Student" value="Student" />
              <Picker.Item label="Teacher" value="Teacher" />
              <Picker.Item label="Admin" value="Admin" />
              <Picker.Item label="Master Admin" value="Master Admin" />
            </Picker>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person"
                size={24}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
                placeholder="Enter your name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                style={styles.inputIcon}
                name="school"
                size={24}
                color="gray"
              />
              <TextInput
                value={universityName}
                onChangeText={(text) => setUniversityName(text)}
                style={styles.input}
                placeholder="Enter university name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                style={styles.inputIcon}
                name="school"
                size={24}
                color="gray"
              />
              <TextInput
                value={schoolName}
                onChangeText={(text) => setSchoolName(text)}
                style={styles.input}
                placeholder="Enter your school name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                style={styles.inputIcon}
                name="business"
                size={24}
                color="gray"
              />
              <TextInput
                value={department}
                onChangeText={(text) => setDepartment(text)}
                style={styles.input}
                placeholder="Enter your department name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                style={styles.inputIcon}
                name="fingerprint"
                size={24}
                color="gray"
              />
              <TextInput
                value={registerNumber}
                onChangeText={(text) => setRegisterNumber(text)}
                style={styles.input}
                placeholder="Enter your register number"
              />
            </View>
          </View>
          {/* 
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                style={styles.inputIcon}
                name="rollupjs"
                size={24}
                color="gray"
              />
              <TextInput
                value={rollNumber}
                onChangeText={(text) => setRollNumber(text)}
                style={styles.input}
                placeholder="Enter your roll number"
              />
            </View>
          </View> */}
          {userType === "Student" && (
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  style={styles.inputIcon}
                  name="rollupjs"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={rollNumber}
                  onChangeText={(text) => setRollNumber(text)}
                  style={styles.input}
                  placeholder="Enter your roll number"
                />
              </View>
            </View>
          )}

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                style={styles.inputIcon}
                name="phone"
                size={24}
                color="gray"
              />
              <TextInput
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                style={styles.input}
                placeholder="Enter your phone number"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <MaterialIcons
                style={styles.inputIcon}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholder="Enter your Email"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={styles.input}
                placeholder="Enter your Password"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={styles.inputIcon}
              />
              <TextInput
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={true}
                style={styles.input}
                placeholder="Confirm Password"
              />
            </View>
          </View>

          {/* Image upload */}
          {/* {!userImage && userType !== "Master Admin" && (
            <View style={styles.inputContainer}>
              <Pressable
                onPress={handleImageUpload}
                style={styles.uploadButton}
              >
                <Text style={styles.buttonText}>Upload Image</Text>
              </Pressable>
            </View>
          )} */}
          {userType !== "Master Admin" && (
            <Pressable
              style={styles.uploadButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Upload Images</Text>
            </Pressable>
          )}

          {/* {userImage && (
            <View style={styles.inputContainer}>
              <Pressable
                onPress={handleRemoveImage}
                style={styles.removeButton}
              >
                <Text style={styles.buttonText}>Remove Image</Text>
              </Pressable>
              <Image source={{ uri: userImage }} style={styles.imagePreview} />
            </View>
          )} */}
          <ImageModal
            visible={isModalVisible}
            images={userImages}
            onClose={() => setModalVisible(false)}
            onRemove={handleRemoveImage}
            onReupload={handleImageUpload}
          />
          {/* <View style={styles.inputContainer}>
            <Pressable onPress={handleImageUpload} style={styles.uploadButton}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </Pressable>
            {userImage && (
              <Image
                source={{ uri: userImage.assets[0].uri }}
                style={styles.imagePreview}
              />
            )}
          </View> */}

          {/* Additional fields for Master Admin */}
          {userType === "Master Admin" && (
            <KeyboardAvoidingView>
              <>
                {/* <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="school"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={universityName}
                      onChangeText={(text) => setUniversityName(text)}
                      style={styles.input}
                      placeholder="Enter university name"
                    />
                  </View>
                </View> */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="business"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={country}
                      onChangeText={(text) => setCountry(text)}
                      style={styles.input}
                      placeholder="Enter country"
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="location-city"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={location}
                      onChangeText={(text) => setLocation(text)}
                      style={styles.input}
                      placeholder="Enter location"
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="code"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={universityCode}
                      onChangeText={(text) => setUniversityCode(text)}
                      style={styles.input}
                      placeholder="Enter university code"
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="local-post-office"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={postcode}
                      onChangeText={(text) => setPostcode(text)}
                      style={styles.input}
                      placeholder="Enter postcode"
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="location-city"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={city}
                      onChangeText={(text) => setCity(text)}
                      style={styles.input}
                      placeholder="Enter city"
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      style={styles.inputIcon}
                      name="location-on"
                      size={24}
                      color="gray"
                    />
                    <TextInput
                      value={address}
                      onChangeText={(text) => setAddress(text)}
                      style={styles.input}
                      placeholder="Enter address"
                    />
                  </View>
                </View>
              </>
            </KeyboardAvoidingView>
          )}
          {/* <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password
            </Text>
          </View> */}

          {/* <View style={styles.additionalLinksContainer}>
            <Text style={styles.text}>Keep me logged in</Text>
            <Text style={styles.additionalLinksText}>Forgot Password</Text>
          </View> */}
          <View style={{ marginTop: 10 }} />
          <Pressable onPress={handleSignup} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.goBackButton}
          >
            <Text style={styles.text}>
              Already have an account?{" "}
              <Text style={styles.signIn}>Sign In</Text>
            </Text>
          </Pressable>
          <View style={{ marginBottom: 10 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    color: "gray",
    fontSize: 14,
    paddingEnd: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    borderRadius: 75,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
  },
  inputIcon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  label: {
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  goBackButton: {
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  additionalLinksContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Adjust this value as needed
  },

  additionalLinksText: {
    paddingLeft: 5,
    color: "#007FFF",
    fontWeight: "500",
  },

  buttonContainer: {
    marginTop: 20, // Adjust this value as needed
  },
  signIn: {
    color: "blue",
    fontSize: 14,
    marginBottom: 10,
  },
});
