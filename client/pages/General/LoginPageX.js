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
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setUserType } from "../../components/userType";
import { Picker } from "react-native-web";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [college, setCollege] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Validate input fields
    if (!email || !password || !college) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Handle login logic (to be implemented with backend)
    // For now, navigate to OTP verification with user type
    setUserType(college);
    navigation.navigate("OTPVerification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
              selectedValue={college}
              onValueChange={(itemValue, itemIndex) => setCollege(itemValue)}
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

          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={styles.signupButton}
          >
            <Text style={styles.signupButtonText}>
              Don't have an account?{" "}
              <Text style={{ color: "blue" }}>Sign Up</Text>
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  formContainer: {
    padding: 20,
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  label: {
    marginBottom: 5,
    color: "gray",
  },
  loginButton: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signupButtonText: {
    color: "black",
  },
});
