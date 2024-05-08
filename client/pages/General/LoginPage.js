import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../context/actions/authActions";
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
import { Picker } from "@react-native-picker/picker";
// import { getUserType, setUserType } from "../../components/userType";
const LoginPage = () => {
  // const userType = getUserType();
  // const setUserType = setUserType();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [college, setCollege] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Validate input fields
    if (!email || !password || !userType || !college) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Validate email format (can be enhanced further with regex)
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Handle login logic (to be implemented with backend)
    // For now, navigate to OTP verification with user type
    // setUserType(college);
    dispatch(loginSuccess(userType));
    navigation.navigate("OTPVerification", { userType });
  };

  const isValidEmail = (email) => {
    // Basic email validation (can be enhanced further with regex)
    return /\S+@\S+\.\S+/.test(email);
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
        {/* User Type Selection */}
        <View style={styles.header}>
          <Text style={styles.title}>Login In to your Account</Text>
        </View>
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

        {/* College Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>College:</Text>
          <Picker
            selectedValue={college}
            onValueChange={(itemValue, itemIndex) => setCollege(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Choose College" value="" />
            <Picker.Item
              label="Royal Global University"
              value="Royal Global University"
            />
            <Picker.Item label="Amita University" value="Amita University" />
          </Picker>
        </View>
        <KeyboardAvoidingView>
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

          <View style={styles.footer}>
            <Text style={styles.footerText}>Keep me logged in</Text>

            <Text
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.forgotPassword}
            >
              Forgot Password
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable onPress={handleLogin} style={styles.button}>
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
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  logoContainer: {
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
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
  footer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    marginLeft: 10,
  },
  forgotPassword: {
    color: "#007FFF",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 15,
  },
  signupButtonText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Image,
//   KeyboardAvoidingView,
//   TextInput,
//   Pressable,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Picker } from "@react-native-picker/picker";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userType, setUserType] = useState(""); // Added state for user type
//   const [college, setCollege] = useState(""); // Added state for college
//   const navigation = useNavigation();

//   //   const handleLogin = () => {
//   //     // Handle login logic here
//   //     // You can use email, password, userType, and college states
//   //   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Image
//           style={styles.logo}
//           source={{
//             uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNK57Oj5ro7C-aFzfBHXuesubrY8lbH4Bxew&s.png",
//           }}
//         />
//       </View>
//       {/* User Type Selection */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Login In to your Account</Text>
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>User Type:</Text>
//         <Picker
//           selectedValue={userType}
//           onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item label="Student" value="Student" />
//           <Picker.Item label="Teacher" value="Teacher" />
//           <Picker.Item label="Admin" value="Admin" />
//           <Picker.Item label="Master Admin" value="Master Admin" />
//         </Picker>
//       </View>

//       {/* College Selection */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>College:</Text>
//         <Picker
//           selectedValue={college}
//           onValueChange={(itemValue, itemIndex) => setCollege(itemValue)}
//           style={styles.input}
//         >
//           <Picker.Item
//             label="Royal Global University"
//             value="Royal Global University"
//           />
//           <Picker.Item label="Amita University" value="Amita University" />
//         </Picker>
//       </View>
//       <KeyboardAvoidingView>
//         <View style={styles.inputContainer}>
//           <View style={styles.inputWrapper}>
//             <MaterialIcons
//               style={styles.inputIcon}
//               name="email"
//               size={24}
//               color="gray"
//             />
//             <TextInput
//               value={email}
//               onChangeText={(text) => setEmail(text)}
//               style={styles.input}
//               placeholder="Enter your Email"
//             />
//           </View>
//         </View>

//         <View style={styles.inputContainer}>
//           <View style={styles.inputWrapper}>
//             <AntDesign
//               name="lock1"
//               size={24}
//               color="gray"
//               style={styles.inputIcon}
//             />
//             <TextInput
//               value={password}
//               onChangeText={(text) => setPassword(text)}
//               secureTextEntry={true}
//               style={styles.input}
//               placeholder="Enter your Password"
//             />
//           </View>
//         </View>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Keep me logged in</Text>

//           <Text style={styles.forgotPassword}>Forgot Password</Text>
//         </View>

//         <View style={styles.buttonContainer}>
//           <Pressable
//             //   onPress={handleLogin}
//             onPress={() =>
//               navigation.navigate("OTPVerification", { userType: userType })
//             }
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>Login</Text>
//           </Pressable>

//           <Pressable
//             onPress={() => navigation.navigate("Register")}
//             style={styles.signupButton}
//           >
//             <Text style={styles.signupButtonText}>
//               Don't have an account? Sign Up
//             </Text>
//           </Pressable>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     alignItems: "center",
//     marginTop: 50,
//   },
//   logo: {
//     width: 150,
//     height: 150,
//   },
//   header: {
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 17,
//     fontWeight: "bold",
//     marginTop: 12,
//     color: "#041E42",
//   },
//   inputContainer: {
//     marginTop: 20,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     backgroundColor: "#D0D0D0",
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   inputIcon: {
//     marginLeft: 8,
//   },
//   input: {
//     color: "gray",
//     marginVertical: 10,
//     width: 300,
//     fontSize: 16,
//   },
//   label: {
//     marginBottom: 5,
//   },
//   footer: {
//     marginTop: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   footerText: {
//     marginLeft: 10,
//   },
//   forgotPassword: {
//     color: "#007FFF",
//     fontWeight: "500",
//   },
//   buttonContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   button: {
//     width: 200,
//     backgroundColor: "#FEBE10",
//     borderRadius: 6,
//     padding: 15,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   signupButton: {
//     marginTop: 15,
//   },
//   signupButtonText: {
//     textAlign: "center",
//     color: "gray",
//     fontSize: 16,
//   },
// });
