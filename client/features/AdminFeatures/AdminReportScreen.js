import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Camera from "expo-camera";
import { ScrollView } from "react-native-gesture-handler";

const AdminReportScreen = () => {
  const [reportType, setReportType] = useState("");
  const [senderType, setSenderType] = useState("");
  const [description, setDescription] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [images, setImages] = useState([]);
  const reportTypes = [
    "Report General",
    "Report Collage",
    "Report Dept.",
    "Report Subject",
    "Report Student",
    "Report Teacher",
    "Report TimeTable",
    "Report Attendance",
    "Report Calendar",
    "Report Technical",
    "Report Non-Technical",
  ];

  const senderTypes = ["Student", "Teacher", "Master Admin"];
  const requestCameraRollPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync(); //or use requestBackgroundPermissionsAsyn()
    if (status !== "granted")
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
  };

  const pickImage = async () => {
    requestCameraRollPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, ...result.assets]);
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitReport = () => {
    if (!reportType || !senderType || !description) {
      setShowErrorAlert(true);
      return;
    }

    // Logic to save report in the database and send it to the respective recipient
    const reportData = {
      reportType,
      senderType,
      description,
      images,
      submissionDate: new Date().toLocaleString(), // Adding real-time date and time
    };

    setShowSuccessAlert(true);

    // Reset inputs
    setReportType("");
    setSenderType("");
    setDescription("");
    setImages([]);
    // For now, logging the report data in console
    console.log(JSON.stringify(reportData));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Student Report</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Report Type:</Text>
          <Picker
            selectedValue={reportType}
            style={[styles.dropdown, styles.pickerBackground]}
            onValueChange={(itemValue, itemIndex) => setReportType(itemValue)}
          >
            <Picker.Item label="Select Report Type" value="" />
            {reportTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Sender Type:</Text>
          <Picker
            selectedValue={senderType}
            style={[styles.dropdown, styles.pickerBackground]}
            onValueChange={(itemValue, itemIndex) => setSenderType(itemValue)}
          >
            <Picker.Item label="Select Sender Type" value="" />
            {senderTypes.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            multiline
            numberOfLines={4}
            placeholder="Enter report description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <Text style={styles.label}>Images:</Text>
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.image} />
              <Button title="Remove" onPress={() => removeImage(index)} />
            </View>
          ))}
        </View>

        <Button title="Pick Images" onPress={pickImage} />
        <View style={{ marginTop: 10 }} />

        <Button title="Submit" onPress={submitReport} />

        {/* Error Alert */}
        <Modal visible={showErrorAlert} animationType="fade" transparent>
          <View style={styles.alertContainer}>
            <View style={styles.alert}>
              <Text style={styles.alertText}>
                Please fill all inputs and choose from the lists.
              </Text>
              <Button title="OK" onPress={() => setShowErrorAlert(false)} />
            </View>
          </View>
        </Modal>

        {/* Success Alert */}
        <Modal visible={showSuccessAlert} animationType="fade" transparent>
          <View style={styles.alertContainer}>
            <View style={[styles.alert, styles.successAlert]}>
              <Text style={styles.alertText}>The report has been sent.</Text>
              <Button title="OK" onPress={() => setShowSuccessAlert(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#87CEEB",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    backgroundColor: "#fff",
  },
  pickerBackground: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  alertContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alert: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  successAlert: {
    backgroundColor: "#4CAF50",
  },
  alertText: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  imageWrapper: {
    marginRight: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default AdminReportScreen;
