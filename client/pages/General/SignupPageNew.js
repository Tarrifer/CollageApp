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
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ImageModal from "../../components/ImageModal";
import { launchImageLibrary } from "../../utils/imageUtils";

const SignupPage = () => {
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
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (userType == "Master Admin") {
      setImages(null);
    }
  }, [userType]);

  const handleReupload = async () => {
    const newImages = await launchImageLibrary();
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

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
      (userType !== "Master Admin" && images.length === 0)
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    navigation.navigate("OTPVerification", { userType });
  };

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
          <View style={{ marginTop: 15 }} />

          {userType !== "Master Admin" && (
            <Button
              title="Upload Images"
              onPress={() => setModalVisible(true)}
            />
          )}

          <ImageModal
            visible={modalVisible}
            images={images}
            onClose={() => setModalVisible(false)}
            onRemove={handleRemoveImage}
            onReupload={handleReupload}
          />

          {userType === "Master Admin" && (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                    style={styles.input}
                    placeholder="Country"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    style={styles.input}
                    placeholder="Location"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={universityCode}
                    onChangeText={(text) => setUniversityCode(text)}
                    style={styles.input}
                    placeholder="University Code"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={postcode}
                    onChangeText={(text) => setPostcode(text)}
                    style={styles.input}
                    placeholder="Postcode"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    style={styles.input}
                    placeholder="City"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    style={styles.input}
                    placeholder="Address"
                  />
                </View>
              </View>
            </>
          )}

          <Pressable onPress={handleSignup} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
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
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#888",
    fontSize: 16,
  },
});
