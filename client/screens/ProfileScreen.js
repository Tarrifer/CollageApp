import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { updateUserProfilePic } from "../context/actions/authActions";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    profilePic: userProfile.profilePic || "https://via.placeholder.com/150",
    userName: "John Doe",
    universityName: "Sample University",
    enrolledYear: "2020",
    currentState: "Studying",
    subjects: [
      { name: "Mathematics", code: "MATH101" },
      { name: "Physics", code: "PHY101" },
    ],
    additionalDetails: {
      courseType: "UG", // or "PG"
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City",
      registrationNumber: "12345",
      rollNumber: "67890",
      departmentName: "Physics Department",
      schoolName: "Sample School",
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setModalVisible(true); // Show modal for confirmation
  };

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      additionalDetails: {
        ...prevData.additionalDetails,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant permission to access photos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        dispatch(updateUserProfilePic(selectedImage.uri));
        setUserData((prevData) => ({
          ...prevData,
          profilePic: selectedImage.uri,
        }));
      }
    } catch (error) {
      console.log("Error selecting image:", error);
      Alert.alert("Error", "An error occurred while selecting image");
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            onPress={isEditing ? handleImageUpload : null}
            disabled={!isEditing}
          >
            <Image
              source={{ uri: userData.profilePic }}
              style={styles.profilePic}
            />
            {isEditing && (
              <AntDesign
                name="edit"
                size={24}
                color="black"
                style={styles.editIcon}
                onPress={handleImageUpload}
              />
            )}
            {isEditing ? (
              <TouchableOpacity onPress={handleSave}>
                <AntDesign
                  name="save"
                  size={24}
                  color="blue"
                  style={styles.saveIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleEdit}>
                <AntDesign
                  name="edit"
                  size={24}
                  color="blue"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.universityName}>Sample University</Text>
          <Text style={styles.email}>john@example.com</Text>
          <Text style={styles.enrolledYear}>Enrolled: 2020</Text>
          <Text style={styles.currentState}>Current State: Studying</Text>
        </View>
        <View style={styles.subjectsContainer}>
          <Text style={styles.subjectsTitle}>Subjects</Text>
          <Text style={styles.semester}>Semester 6th</Text>
          <View style={styles.subjectRow}>
            <View style={styles.subjectColumn}>
              {userData.subjects.map((subject, index) => (
                <Text key={index} style={styles.subject}>
                  {subject.name} - {subject.code}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.additionalDetailsContainer}>
          <Text style={styles.additionalDetailsTitle}>Additional Details</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Course Type</Text>
            <TextInput
              style={styles.input}
              value={userData.additionalDetails.courseType}
              onChangeText={(text) => handleInputChange("courseType", text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={userData.additionalDetails.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={userData.additionalDetails.address}
              onChangeText={(text) => handleInputChange("address", text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Roll Number</Text>
            <TextInput
              style={styles.input}
              value={userData.additionalDetails.rollNumber}
              onChangeText={(text) => handleInputChange("rollNumber", text)}
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Registration Number</Text>
            <TextInput
              style={styles.input}
              value={userData.additionalDetails.registrationNumber}
              onChangeText={(text) =>
                handleInputChange("registrationNumber", text)
              }
              editable={isEditing}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>School Name</Text>
            <TextInput
              style={styles.input}
              value={userData.additionalDetails.schoolName}
              onChangeText={(text) => handleInputChange("schoolName", text)}
              editable={isEditing}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Profile Updated Successfully!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
  },
  saveIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  universityName: {
    fontSize: 18,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  enrolledYear: {
    fontSize: 16,
    marginBottom: 5,
  },
  currentState: {
    fontSize: 16,
    marginBottom: 5,
  },
  subjectsContainer: {
    marginBottom: 20,
  },
  subjectsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subjectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subjectColumn: {
    flex: 1,
    alignItems: "flex-start",
  },
  subject: {
    fontSize: 16,
    marginBottom: 5,
  },
  semester: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  additionalDetailsContainer: {
    marginTop: 20,
  },
  additionalDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FEBE10",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;

// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
// } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { useSelector, useDispatch } from "react-redux";
// import { AntDesign } from "@expo/vector-icons";
// import { updateUserProfilePic } from "../context/actions/authActions";
// import * as ImagePicker from "expo-image-picker";

// const ProfileScreen = () => {
//   const dispatch = useDispatch();
//   const userProfile = useSelector((state) => state.auth.userProfile);
//   const [isEditing, setIsEditing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [userData, setUserData] = useState({
//     profilePic: userProfile.profilePic || "https://via.placeholder.com/150",
//     userName: "John Doe",
//     universityName: "Sample University",
//     enrolledYear: "2020",
//     currentState: "Studying",
//     subjects: [
//       { name: "Mathematics", code: "MATH101" },
//       { name: "Physics", code: "PHY101" },
//     ],
//     additionalDetails: {
//       courseType: "UG", // or "PG"
//       email: "john@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St, City",
//       registrationNumber: "12345",
//       rollNumber: "67890",
//       departmentName: "Physics Department",
//       schoolName: "Sample School",
//     },
//   });

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     setModalVisible(true); // Show modal for confirmation
//   };

//   const handleInputChange = (field, value) => {
//     setUserData((prevData) => ({
//       ...prevData,
//       additionalDetails: {
//         ...prevData.additionalDetails,
//         [field]: value,
//       },
//     }));
//   };

//   const handleImageUpload = async () => {
//     try {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please grant permission to access photos"
//         );
//         return;
//       }

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         dispatch(updateUserProfilePic(result.uri));
//         setUserData((prevData) => ({
//           ...prevData,
//           profilePic: result.uri,
//         }));
//       }
//     } catch (error) {
//       console.log("Error selecting image:", error);
//       Alert.alert("Error", "An error occurred while selecting image");
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.profileContainer}>
//           <TouchableOpacity onPress={[handleEdit]} disabled={!isEditing}>
//             <Image
//               source={{ uri: userData.profilePic }}
//               style={styles.profilePic}
//               // onPress={handleImageUpload}
//             />
//             {isEditing ? (
//               <AntDesign
//                 name="save"
//                 size={24}
//                 color="black"
//                 style={styles.editIcon}
//                 onPress={handleSave}
//               />
//             ) : (
//               <AntDesign
//                 name="edit"
//                 size={24}
//                 color="black"
//                 style={styles.editIcon}
//                 onPress={handleEdit}
//               />
//             )}
//           </TouchableOpacity>
//           <Text style={styles.userName}>John Doe</Text>
//           <Text style={styles.universityName}>Sample University</Text>
//           <Text style={styles.email}>john@example.com</Text>
//           <Text style={styles.enrolledYear}>Enrolled: 2020</Text>
//           <Text style={styles.currentState}>Current State: Studying</Text>
//         </View>
//         <View style={styles.subjectsContainer}>
//           <Text style={styles.subjectsTitle}>Subjects</Text>
//           <View style={styles.subjectRow}>
//             {userData.subjects.map((subject, index) => (
//               <View key={index} style={styles.subjectContainer}>
//                 <Text style={styles.subject}>
//                   {subject.name} - {subject.code}
//                 </Text>
//               </View>
//             ))}
//             <Text style={styles.semester}>Semester 6th</Text>
//           </View>
//         </View>
//         <View style={styles.additionalDetailsContainer}>
//           <Text style={styles.additionalDetailsTitle}>Course Type: UG</Text>
//           <Text style={styles.additionalDetailsTitle}>Additional Details</Text>
//           {Object.entries(userData.additionalDetails).map(([field, value]) => (
//             <View key={field} style={styles.inputContainer}>
//               <Text style={styles.label}>{field}</Text>
//               <TextInput
//                 style={styles.input}
//                 editable={isEditing}
//                 value={value}
//                 onChangeText={(text) => handleInputChange(field, text)}
//               />
//             </View>
//           ))}
//         </View>
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(false);
//           }}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalText}>Changes saved successfully!</Text>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profilePic: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//   },
//   editIcon: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 5,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   universityName: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   enrolledYear: {
//     marginBottom: 5,
//   },
//   currentState: {
//     marginBottom: 20,
//   },
//   subjectsContainer: {
//     marginBottom: 20,
//   },
//   subjectsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subjectRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   subjectContainer: {
//     flex: 1,
//   },
//   subject: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   semester: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   additionalDetailsContainer: {
//     marginTop: 20,
//   },
//   additionalDetailsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   inputContainer: {
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 8,
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#FEBE10",
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default ProfileScreen;
//--------------------------------------------------------
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
// } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { useSelector, useDispatch } from "react-redux";
// import { AntDesign } from "@expo/vector-icons";
// import { updateUserProfilePic } from "../context/actions/authActions";
// import * as ImagePicker from "expo-image-picker";

// const ProfileScreen = () => {
//   const dispatch = useDispatch();
//   const userProfile = useSelector((state) => state.userProfile);
//   const [imageUri, setImageUri] = useState(
//     userProfile ? userProfile.profilePic : "https://via.placeholder.com/150"
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [userData, setUserData] = useState({
//     profilePic: "https://via.placeholder.com/150",
//     userName: "John Doe",
//     universityName: "Sample University",
//     enrolledYear: "2020",
//     currentState: "Studying",
//     subjects: [
//       { name: "Mathematics", code: "MATH101" },
//       { name: "Physics", code: "PHY101" },
//     ],
//     additionalDetails: {
//       courseType: "UG", // or "PG"
//       email: "john@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St, City",
//       registrationNumber: "12345",
//       rollNumber: "67890",
//       departmentName: "Physics Department",
//       schoolName: "Sample School",
//     },
//   });
//   if (!userProfile) {
//     return <Text>Loading...</Text>;
//   }
//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     setModalVisible(true); // Show modal for confirmation
//   };

//   const handleInputChange = (field, value) => {
//     setUserData((prevData) => ({
//       ...prevData,
//       additionalDetails: {
//         ...prevData.additionalDetails,
//         [field]: value,
//       },
//     }));
//   };

//   const handleImageUpload = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Required",
//         "Please grant permission to access photos"
//       );
//       return;
//     }

//     try {
//       dispatch(updateUserProfilePic(imageUri));
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         setUserData((prevData) => ({
//           ...prevData,
//           profilePic: result.uri,
//         }));
//       }
//     } catch (error) {
//       console.log("Error selecting image:", error);
//       Alert.alert("Error", "An error occurred while selecting image");
//     }
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.profileContainer}>
//           <TouchableOpacity onPress={handleEdit} disabled={!isEditing}>
//             <Image
//               source={{ uri: userData.profilePic }}
//               style={styles.profilePic}
//             />
//             {isEditing ? (
//               <AntDesign
//                 name="save"
//                 size={24}
//                 color="black"
//                 style={styles.editIcon}
//                 onPress={handleSave}
//               />
//             ) : (
//               <AntDesign
//                 name="edit"
//                 size={24}
//                 color="black"
//                 style={styles.editIcon}
//                 onPress={handleEdit}
//               />
//             )}
//           </TouchableOpacity>
//           <Text style={styles.userName}>{userProfile.userName}</Text>
//           <Text style={styles.universityName}>
//             {userProfile.universityName}
//           </Text>
//           <Text style={styles.email}>{userProfile.email}</Text>
//           <Text style={styles.enrolledYear}>
//             Enrolled: {userData.enrolledYear}
//           </Text>
//           <Text style={styles.currentState}>
//             Current State: {userData.currentState}
//           </Text>
//         </View>
//         <View style={styles.subjectsContainer}>
//           <Text style={styles.subjectsTitle}>Subjects</Text>
//           <View style={styles.subjectRow}>
//             {userData.subjects.map((subject, index) => (
//               <View key={index} style={styles.subjectContainer}>
//                 <Text style={styles.subject}>
//                   {subject.name} - {subject.code}
//                 </Text>
//               </View>
//             ))}
//             <Text style={styles.semester}>Semester 6th</Text>
//           </View>
//         </View>
//         <View style={styles.additionalDetailsContainer}>
//           <Text style={styles.additionalDetailsTitle}>
//             Course Type: {userData.additionalDetails.courseType}
//           </Text>
//           <Text style={styles.additionalDetailsTitle}>Additional Details</Text>
//           {Object.entries(userData.additionalDetails).map(([field, value]) => (
//             <View key={field} style={styles.inputContainer}>
//               <Text style={styles.label}>{field}</Text>
//               <TextInput
//                 style={styles.input}
//                 editable={isEditing}
//                 value={value}
//                 onChangeText={(text) => handleInputChange(field, text)}
//               />
//             </View>
//           ))}
//         </View>
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => {
//             setModalVisible(false);
//           }}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalText}>Changes saved successfully!</Text>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Text style={styles.closeButtonText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profilePic: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//   },
//   editIcon: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 5,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   universityName: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   enrolledYear: {
//     marginBottom: 5,
//   },
//   currentState: {
//     marginBottom: 20,
//   },
//   subjectsContainer: {
//     marginBottom: 20,
//   },
//   subjectsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subjectRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   subjectContainer: {
//     flex: 1,
//   },
//   subject: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   semester: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   additionalDetailsContainer: {
//     marginTop: 20,
//   },
//   additionalDetailsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   inputContainer: {
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 8,
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#FEBE10",
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default ProfileScreen;
//------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TextInput,
// } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// const ProfileScreen = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [userData, setUserData] = useState({
//     profilePic:
//       "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
//     userName: "John Doe",
//     universityName: "Sample University",
//     enrolledYear: "2020",
//     currentState: "Studying",
//     subjects: [
//       { name: "Mathematics", code: "MATH101" },
//       { name: "Physics", code: "PHY101" },
//     ],
//     additionalDetails: {
//       // Sample additional details
//       email: "john@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St, City",
//     },
//   });

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     setModalVisible(true); // Show modal for confirmation
//   };

//   const handleInputChange = (field, value) => {
//     setUserData((prevData) => ({
//       ...prevData,
//       additionalDetails: {
//         ...prevData.additionalDetails,
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profileContainer}>
//         <TouchableOpacity onPress={handleEdit} disabled={!isEditing}>
//           <Image
//             source={{ uri: userData.profilePic }}
//             style={styles.profilePic}
//           />
//           {isEditing ? (
//             <AntDesign
//               name="save"
//               size={24}
//               color="black"
//               style={styles.editIcon}
//               onPress={handleSave}
//             />
//           ) : (
//             <AntDesign
//               name="edit"
//               size={24}
//               color="black"
//               style={styles.editIcon}
//               onPress={handleEdit}
//             />
//           )}
//         </TouchableOpacity>
//         <Text style={styles.userName}>{userData.userName}</Text>
//         <Text style={styles.universityName}>{userData.universityName}</Text>
//         <Text style={styles.enrolledYear}>
//           Enrolled: {userData.enrolledYear}
//         </Text>
//         <Text style={styles.currentState}>
//           Current State: {userData.currentState}
//         </Text>
//       </View>
//       <View style={styles.subjectsContainer}>
//         <Text style={styles.subjectsTitle}>Subjects</Text>
//         {userData.subjects.map((subject, index) => (
//           <View key={index} style={styles.subjectContainer}>
//             <Text style={styles.subject}>
//               {subject.name} - {subject.code}
//             </Text>
//             <Text style={styles.semester}>Semester 6th</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.additionalDetailsContainer}>
//         <Text style={styles.additionalDetailsTitle}>Additional Details</Text>
//         {Object.entries(userData.additionalDetails).map(([field, value]) => (
//           <View key={field} style={styles.inputContainer}>
//             <Text style={styles.label}>{field}</Text>
//             <TextInput
//               style={styles.input}
//               editable={isEditing}
//               value={value}
//               onChangeText={(text) => handleInputChange(field, text)}
//             />
//           </View>
//         ))}
//       </View>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Changes saved successfully!</Text>
//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={styles.closeButton}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   profileContainer: {
//     alignItems: "center",
//   },
//   profilePic: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     marginBottom: 10,
//   },
//   editIcon: {
//     position: "absolute",
//     top: 120,
//     right: 10,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 4,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   universityName: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   enrolledYear: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   currentState: {
//     fontSize: 14,
//     marginBottom: 20,
//   },
//   subjectsContainer: {
//     marginTop: 20,
//   },
//   subjectsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subjectContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 5,
//   },
//   subject: {
//     fontSize: 16,
//   },
//   semester: {
//     fontSize: 14,
//     color: "gray",
//   },
//   additionalDetailsContainer: {
//     marginTop: 20,
//   },
//   additionalDetailsTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   label: {
//     width: 100,
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   closeButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#FEBE10",
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default ProfileScreen;
