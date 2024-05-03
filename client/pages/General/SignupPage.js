import React, { useState } from "react";
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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { ImagePicker } from "expo-image-picker";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added state for confirm password
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
  const [userImage, setUserImage] = useState(null); // Added state for user image
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Check if permission to access the camera roll is granted
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
      return;
    }

    try {
      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Set the user image state with the selected image
        setUserImage(result.uri);
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }

    // Rest of your registration logic...
  };

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUserImage(result.uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
      // Handle the error here, such as displaying an error message to the user
    }
  };
  //   const handleRegister = () => {
  //     const user = {
  //       name: name,
  //       email: email,
  //       password: password,
  //     };

  //     //   send a POST  request to the backend API to register the user
  //     axios
  //       .post("http://localhost:8000/register", user)
  //       .then((response) => {
  //         console.log(response);
  //         Alert.alert(
  //           "Registration successful",
  //           "You have been registered Successfully"
  //         );
  //         setName("");
  //         setEmail("");
  //         setPassword("");
  //       })
  //       .catch((error) => {
  //         Alert.alert(
  //           "Registration Error",
  //           "An error occurred while registering"
  //         );
  //         console.log("registration failed", error);
  //       });
  //   };

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

        <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
          <View style={styles.inputContainer}>
            <Text style={styles.label}>User Type:</Text>
            <Picker
              selectedValue={userType}
              onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
              style={styles.input}
            >
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

          {/* <View style={styles.inputContainer}>
            <Pressable
              onPress={handleImageUpload}
              style={{
                backgroundColor: "#FEBE10",
                borderRadius: 6,
                padding: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Upload Image
              </Text>
            </Pressable>
          </View> */}
          {userType !== "Master Admin" && (
            <View style={styles.inputContainer}>
              <Pressable
                onPress={handleImageUpload}
                style={{
                  backgroundColor: "#FEBE10",
                  borderRadius: 6,
                  padding: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                >
                  Upload Image
                </Text>
              </Pressable>
            </View>
          )}

          {userImage && (
            <Image
              source={{ uri: userImage }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}
          {userImage && (
            <Image
              source={{ uri: userImage }}
              style={{ width: 200, height: 200, marginTop: 10 }}
            />
          )}

          {/* Additional fields for Master Admin */}
          {userType === "Master Admin" && (
            <KeyboardAvoidingView behavior="padding">
              <>
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

          <View
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
          </View>

          <View style={{ marginTop: 20 }} />

          <Pressable
            onPress={() =>
              navigation.navigate("OTPVerification", { userType: userType })
            }
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 15 }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              Already have an account? Sign In
            </Text>
          </Pressable>
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
  scrollContainer: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: "center",
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
});
