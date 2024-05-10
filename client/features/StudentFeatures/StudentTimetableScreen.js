import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StudentTimetableScreen = () => {
  const navigation = useNavigation();

  // Function to navigate to AdminTimetableScreen
  const navigateToAdminTimetable = () => {
    navigation.navigate("TimetableCreation"); // Navigate to AdminTimetableScreen
  };

  return (
    <View>
      <TouchableOpacity onPress={navigateToAdminTimetable} style={styles.card}>
        <Text style={styles.cardText}>View Admin Timetable</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentTimetableScreen;

const styles = StyleSheet.create({});
