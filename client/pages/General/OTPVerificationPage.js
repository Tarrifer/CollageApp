// OTPVerificationPage.js

import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

const OTPVerificationPage = ({ navigation, route }) => {
  const { userType } = route.params; // Get the user type from the route params
  const [otp, setOtp] = useState(""); // Uncommented state for OTP
  const handleVerifyOTP = () => {
    // Implement OTP verification logic here
    // Navigate to the respective home page based on the user type
    switch (userType) {
      case "Student":
        navigation.replace("StudentHome");
        break;
      case "Teacher":
        navigation.replace("TeacherHome");
        break;
      case "Admin":
        navigation.replace("AdminHome");
        break;
      case "Master Admin":
        navigation.replace("MasterAdminHome");
        break;
      default:
        console.log("Invalid user type");
    }
  };
  //   const [otp, setOtp] = useState("");

  //   const handleVerifyOTP = () => {
  //     // Implement OTP verification logic here
  //     // For now, let's just navigate to the Home page
  //     navigation.replace("Home");
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={(text) => setOtp(text)}
        placeholder="Enter OTP"
        keyboardType="numeric"
      />
      <Pressable onPress={handleVerifyOTP} style={styles.button}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OTPVerificationPage;
