// OTPVerificationPage.js

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { CommonActions } from "@react-navigation/native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../context/actions/authActions";
import { login } from "../../context/actions/authActions";
const OTPVerificationPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { localUserType, college, email, password } = route.params;
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = () => {
    const correctOTP = "123456";

    if (otp === correctOTP) {
      dispatch(login(email, password));
      dispatch(setIsLoggedIn(true));
      navigation.dispatch(
        CommonActions.navigate({
          name: "MainDrawer",
          params: {
            screen: "StudentHome",
            screen: "TeacherHome",
            screen: "AdminHome",
            screen: "MasterAdminHome",
          },
        })
      );
    } else {
      Alert.alert("Invalid OTP", "Please enter the correct OTP.", [
        { text: "OK" },
      ]);
    }
  };

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
