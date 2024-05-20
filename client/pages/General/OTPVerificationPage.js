import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Image,
  Modal,
  Animated,
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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to hold OTP digits
  const refs = useRef([...Array(6)].map(() => React.createRef())); // Array of refs for 6 TextInput components
  const [resendOTP, setResendOTP] = useState(false); // Flag to show/hide resend OTP button
  const [timer, setTimer] = useState(120); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null); // Timer interval
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      // Focus the next input box if a digit is entered and it's not the last box
      refs.current[index + 1].current.focus();
    }
  };

  const handleVerifyOTP = () => {
    const correctOTP = "123456"; // Correct OTP

    if (otp.join("") === correctOTP) {
      // Joining OTP digits as a single string for comparison
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

  const handleResendOTP = () => {
    setResendOTP(true);
    setModalVisible(true);
    setTimer(120);
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  React.useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [modalVisible]);

  React.useEffect(() => {
    if (timer === 0) {
      clearInterval(timerInterval);
      setResendOTP(false);
    }
  }, [timer]);

  return (
    <View style={styles.container}>
      <View style={styles.gifContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              value={digit}
              onChangeText={(value) => handleOtpChange(index, value)}
              keyboardType="numeric"
              maxLength={1}
              ref={refs.current[index]} // Assigning ref dynamically
            />
          ))}
        </View>
        <Pressable onPress={handleVerifyOTP} style={styles.button}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </Pressable>
        <Pressable
          onPress={handleResendOTP}
          style={[
            styles.resentbutton,
            // { backgroundColor: resendOTP ? "#ccc" : "#007FFF" },
          ]}
          disabled={resendOTP}
        >
          <Text style={styles.resendtext}>
            {resendOTP
              ? `Didn't receive OTP? Re-send again in ${Math.floor(
                  timer / 60
                )}:${String(timer % 60).padStart(2, "0")}`
              : "Resend OTP"}
          </Text>
        </Pressable>
      </View>
      <Image source={require("../../svg/otp.gif")} style={styles.gif} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>OTP sent successfully!</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gifContainer: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#007FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resentbutton: {
    // backgroundColor: "#007FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    position: "absolute",
    top: 60,
    right: 20,
    fontSize: 16,
    color: "#007FFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  resendtext: {
    color: "blue",
    fontSize: 16,
    fontWeight: "normal",
  },
});

export default OTPVerificationPage;
// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   Alert,
//   Image,
//   Modal,
//   Animated,
// } from "react-native";
// import { CommonActions } from "@react-navigation/native";

// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import { setIsLoggedIn } from "../../context/actions/authActions";
// import { login } from "../../context/actions/authActions";

// const OTPVerificationPage = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const { localUserType, college, email, password } = route.params;
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to hold OTP digits
//   const refs = useRef([...Array(6)].map(() => React.createRef())); // Array of refs for 6 TextInput components
//   const [resendOTP, setResendOTP] = useState(false); // Flag to show/hide resend OTP button
//   const [timer, setTimer] = useState(120); // Timer in seconds
//   const [timerInterval, setTimerInterval] = useState(null); // Timer interval
//   const [modalVisible, setModalVisible] = useState(false); // Modal visibility

//   const handleOtpChange = (index, value) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       // Focus the next input box if a digit is entered and it's not the last box
//       refs.current[index + 1].current.focus();
//     }
//   };

//   const handleVerifyOTP = () => {
//     const correctOTP = "123456"; // Correct OTP

//     if (otp.join("") === correctOTP) {
//       // Joining OTP digits as a single string for comparison
//       dispatch(login(email, password));
//       dispatch(setIsLoggedIn(true));
//       navigation.dispatch(
//         CommonActions.navigate({
//           name: "MainDrawer",
//           params: {
//             screen: "StudentHome",
//             screen: "TeacherHome",
//             screen: "AdminHome",
//             screen: "MasterAdminHome",
//           },
//         })
//       );
//     } else {
//       Alert.alert("Invalid OTP", "Please enter the correct OTP.", [
//         { text: "OK" },
//       ]);
//     }
//   };
//   const handleResendOTP = () => {
//     setResendOTP(true);
//     setModalVisible(true);
//     setTimer(120);
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);
//     setTimerInterval(interval);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.gifContainer}>
//         <Text style={styles.title}>Enter OTP</Text>
//         <View style={styles.otpContainer}>
//           {otp.map((digit, index) => (
//             <TextInput
//               key={index}
//               style={styles.input}
//               value={digit}
//               onChangeText={(value) => handleOtpChange(index, value)}
//               keyboardType="numeric"
//               maxLength={1}
//               ref={refs.current[index]} // Assigning ref dynamically
//             />
//           ))}
//         </View>
//         <Pressable onPress={handleVerifyOTP} style={styles.button}>
//           <Text style={styles.buttonText}>Verify OTP</Text>
//         </Pressable>
//         <Pressable
//           onPress={handleResendOTP}
//           style={[{ marginVertical: 5 }]}
//           disabled={resendOTP}
//         >
//           <Text style={styles.resendtext}>Resend OTP</Text>
//         </Pressable>
//         {resendOTP && (
//           <Text style={styles.timerText}>
//             {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
//           </Text>
//         )}
//       </View>
//       <Image source={require("../../svg/otp.gif")} style={styles.gif} />
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>OTP sent successfully!</Text>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   gifContainer: {
//     position: "absolute",
//     zIndex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   gif: {
//     position: "absolute",
//     top: 0,
//     width: "100%",
//     height: "100%",
//     zIndex: 0,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   otpContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   input: {
//     width: 40,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   button: {
//     backgroundColor: "#007FFF",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   resendtext: {
//     color: "blue",
//     fontSize: 16,
//     fontWeight: "normal",
//   },
//   timerText: {
//     position: "absolute",
//     top: 60,
//     right: 20,
//     fontSize: 16,
//     color: "#007FFF",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalText: {
//     fontSize: 18,
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default OTPVerificationPage;
//---------------------------------------------------------------
// // OTPVerificationPage.js

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
//   Alert,
// } from "react-native";
// import { CommonActions } from "@react-navigation/native";

// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import { setIsLoggedIn } from "../../context/actions/authActions";
// import { login } from "../../context/actions/authActions";
// const OTPVerificationPage = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const { localUserType, college, email, password } = route.params;
//   const [otp, setOtp] = useState("");

//   const handleVerifyOTP = () => {
//     const correctOTP = "123456";

//     if (otp === correctOTP) {
//       dispatch(login(email, password));
//       dispatch(setIsLoggedIn(true));
//       navigation.dispatch(
//         CommonActions.navigate({
//           name: "MainDrawer",
//           params: {
//             screen: "StudentHome",
//             screen: "TeacherHome",
//             screen: "AdminHome",
//             screen: "MasterAdminHome",
//           },
//         })
//       );
//     } else {
//       Alert.alert("Invalid OTP", "Please enter the correct OTP.", [
//         { text: "OK" },
//       ]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP</Text>
//       <TextInput
//         style={styles.input}
//         value={otp}
//         onChangeText={(text) => setOtp(text)}
//         placeholder="Enter OTP"
//         keyboardType="numeric"
//       />
//       <Pressable onPress={handleVerifyOTP} style={styles.button}>
//         <Text style={styles.buttonText}>Verify OTP</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: 200,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#007FFF",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default OTPVerificationPage;
