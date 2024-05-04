import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const MAdminDataBaseCreation = () => {
  const [courseType, setCourseType] = useState("");
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [semesterCount, setSemesterCount] = useState("");
  const [subjects, setSubjects] = useState([
    { name: "", code: "", credits: "", type: "" },
  ]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", code: "", credits: "", type: "" }]);
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleCreate = () => {
    // Validate all fields are filled
    if (
      !courseType ||
      !school ||
      !department ||
      !semesterCount ||
      subjects.some(
        (subject) =>
          !subject.name || !subject.code || !subject.credits || !subject.type
      )
    ) {
      alert("Please fill in all details");
      return;
    }

    console.log("Creating Database Entries...");
    console.log("Course Type:", courseType);
    console.log("School:", school);
    console.log("Department:", department);
    console.log("Semester Count:", semesterCount);
    console.log("Subjects:", subjects);

    // Logic to add database entries
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        University Management Database Creation
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Course Type (UG/PG)"
        onChangeText={(text) => setCourseType(text)}
        value={courseType}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter School Name"
        onChangeText={(text) => setSchool(text)}
        value={school}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Department Name"
        onChangeText={(text) => setDepartment(text)}
        value={department}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Number of Semesters (1-5)"
        keyboardType="numeric"
        onChangeText={(text) => setSemesterCount(text)}
        value={semesterCount}
      />

      {subjects.map((subject, index) => (
        <View key={index}>
          <Text style={styles.sectionHeading}>Subject {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Subject Name"
            onChangeText={(text) => {
              const updatedSubjects = [...subjects];
              updatedSubjects[index].name = text;
              setSubjects(updatedSubjects);
            }}
            value={subject.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Subject Code"
            onChangeText={(text) => {
              const updatedSubjects = [...subjects];
              updatedSubjects[index].code = text;
              setSubjects(updatedSubjects);
            }}
            value={subject.code}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Subject Credits"
            onChangeText={(text) => {
              const updatedSubjects = [...subjects];
              updatedSubjects[index].credits = text;
              setSubjects(updatedSubjects);
            }}
            value={subject.credits}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Subject Type"
            onChangeText={(text) => {
              const updatedSubjects = [...subjects];
              updatedSubjects[index].type = text;
              setSubjects(updatedSubjects);
            }}
            value={subject.type}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteSubject(index)}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
        <Text>Add Subject</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text>Create Entries</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "lightgray",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});

export default MAdminDataBaseCreation;
