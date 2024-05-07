import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const MAdminRegistrationApproval = ({ navigation }) => {
  const navigateToStudentApproval = () => {
    navigation.navigate("StudentApproval");
  };

  const navigateToTeacherApproval = () => {
    navigation.navigate("TeacherApproval");
  };

  const navigateToAdminApproval = () => {
    navigation.navigate("AdminApproval");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "skyblue" }]}
        onPress={navigateToStudentApproval}
      >
        <Text style={styles.cardText}>Student Approval</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "lightgreen" }]}
        onPress={navigateToTeacherApproval}
      >
        <Text style={styles.cardText}>Teacher Approval</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "orange" }]}
        onPress={navigateToAdminApproval}
      >
        <Text style={styles.cardText}>Admin Approval</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: 300,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MAdminRegistrationApproval;
