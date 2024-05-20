import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import studentData from "../../database/Students.json";
import attendanceData from "../../database/Attendance.json";
import { Picker } from "@react-native-picker/picker";
const TeacherAttendanceViewScreen = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectDetails, setSubjectDetails] = useState({});
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedSubject) {
      const subject = attendanceData.selectedSubject[selectedSubject];
      setSubjectDetails(subject[0]);
      filterStudents(subject[0].additionalFields);
    }
  }, [selectedSubject]);

  const filterStudents = (additionalFields) => {
    const filtered = studentData
      .filter((student) => {
        return (
          student.departmentName === additionalFields.selectedDepartment &&
          student.semester === additionalFields.selectedSemester
        );
      })
      .map((student) => ({ ...student, status: null })); // Initialize status as null
    setFilteredStudents(filtered);
  };

  const handlePresentAbsentChange = (rollNumber, status) => {
    setFilteredStudents(
      filteredStudents.map((student) =>
        student.rollNumber === rollNumber ? { ...student, status } : student
      )
    );
  };

  const handleSubmit = () => {
    const unmarkedStudents = filteredStudents.some(
      (student) => student.status === null
    );
    if (unmarkedStudents) {
      Alert.alert(
        "Incomplete Attendance",
        "Please mark attendance for all students."
      );
    } else {
      // Submit the attendance
      console.log(filteredStudents);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Teacher Attendance View</Text>
      <Picker
        selectedValue={selectedSubject}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
      >
        <Picker.Item label="Select a subject" value="" />
        {Object.keys(attendanceData.selectedSubject).map((key) => (
          <Picker.Item
            key={key}
            label={attendanceData.selectedSubject[key][0].SubjectName}
            value={key}
          />
        ))}
      </Picker>
      {subjectDetails.SubjectName && (
        <View style={styles.subjectDetails}>
          <Text>Subject: {subjectDetails.SubjectName}</Text>
          <Text>Credit: {subjectDetails.SubjectCredit}</Text>
          <Text>Type: {subjectDetails.SubjectType}</Text>
          <Text>Code: {subjectDetails.SubjectCode}</Text>
        </View>
      )}
      <Button title="Filter Students" onPress={() => setModalVisible(true)} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredStudents.map((student, index) => (
              <View key={index} style={styles.studentCard}>
                <Text>Name: {student.studentName}</Text>
                <Text>Roll Number: {student.rollNumber}</Text>
                <Text>Department: {student.departmentName}</Text>
                <Text>Semester: {student.semester}</Text>
                <View style={styles.radioButtonContainer}>
                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() =>
                      handlePresentAbsentChange(student.rollNumber, "Present")
                    }
                  >
                    <Text>Present</Text>
                    {student.status === "Present" && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() =>
                      handlePresentAbsentChange(student.rollNumber, "Absent")
                    }
                  >
                    <Text>Absent</Text>
                    {student.status === "Absent" && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <Button title="Submit Attendance" onPress={handleSubmit} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  subjectDetails: {
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  studentCard: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
    marginLeft: 5,
  },
});

export default TeacherAttendanceViewScreen;
