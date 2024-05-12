import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const SearchStudentAttendance = ({ onSearch }) => {
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleSearch = () => {
    // Perform search based on the input values
    onSearch({ semester, department, subject, studentName });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Semester"
        value={semester}
        onChangeText={setSemester}
      />
      <TextInput
        style={styles.input}
        placeholder="Department Name"
        value={department}
        onChangeText={setDepartment}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject Name"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchStudentAttendance;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
