import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

const MAdminCreationScreen = () => {
  const [courseType, setCourseType] = useState("");
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [semesterCount, setSemesterCount] = useState("");
  const [semesters, setSemesters] = useState([]);

  const handleAddSemester = () => {
    const newSemester = {
      semesterNumber: semesters.length + 1,
      subjects: [{ name: "", code: "", credits: "", type: "" }],
    };
    setSemesters([...semesters, newSemester]);
  };

  const handleAddSubject = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].subjects.push({
      name: "",
      code: "",
      credits: "",
      type: "",
    });
    setSemesters(updatedSemesters);
  };

  const handleDeleteSubject = (semesterIndex, subjectIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].subjects.splice(subjectIndex, 1);
    setSemesters(updatedSemesters);
  };

  const handleDeleteSemester = (semesterIndex) => {
    const updatedSemesters = [...semesters];
    updatedSemesters.splice(semesterIndex, 1);
    setSemesters(updatedSemesters);
  };

  // const handleCreate = () => {
  //   // Validate all fields are filled
  //   if (
  //     !courseType ||
  //     !school ||
  //     !department ||
  //     !semesterCount ||
  //     semesters.some((semester) =>
  //       semester.subjects.some(
  //         (subject) =>
  //           !subject.name || !subject.code || !subject.credits || !subject.type
  //       )
  //     )
  //   ) {
  //     alert("Please fill in all details");
  //     return;
  //   }

  //   console.log("Creating Database Entries...");
  //   console.log("Course Type:", courseType);
  //   console.log("School:", school);
  //   console.log("Department:", department);
  //   console.log("Semester Count:", semesterCount);
  //   console.log("Semesters:", semesters);

  //   // Logic to add database entries
  // };
  const handleCreate = () => {
    // Validate all fields are filled
    if (
      !courseType ||
      !school ||
      !department ||
      !semesterCount ||
      semesters.some((semester) =>
        semester.subjects.some(
          (subject) =>
            !subject.name || !subject.code || !subject.credits || !subject.type
        )
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
    console.log("Semesters:", semesters);
    // Show alert when entries are created
    Alert.alert("Entries Created!", "Entries have been successfully created.", [
      { text: "OK", onPress: () => handleReset() }, // Add a callback to reset the inputs and semesters
    ]);
  };

  const handleReset = () => {
    // Reset all inputs and semesters to empty values
    setCourseType("");
    setSchool("");
    setDepartment("");
    setSemesterCount("");
    setSemesters([]);
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

      {semesters.map((semester, semesterIndex) => (
        <View key={`semester-${semesterIndex}`}>
          <Text style={styles.semesterHeading}>
            Semester {semester.semesterNumber}
          </Text>
          {semester.subjects.map((subject, subjectIndex) => (
            <View key={`subject-${semesterIndex}-${subjectIndex}`}>
              <Text style={styles.sectionHeading}>
                Subject {subjectIndex + 1}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Subject Name"
                onChangeText={(text) => {
                  const updatedSemesters = [...semesters];
                  updatedSemesters[semesterIndex].subjects[subjectIndex].name =
                    text;
                  setSemesters(updatedSemesters);
                }}
                value={subject.name}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Subject Code"
                onChangeText={(text) => {
                  const updatedSemesters = [...semesters];
                  updatedSemesters[semesterIndex].subjects[subjectIndex].code =
                    text;
                  setSemesters(updatedSemesters);
                }}
                value={subject.code}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Subject Credits"
                onChangeText={(text) => {
                  const updatedSemesters = [...semesters];
                  updatedSemesters[semesterIndex].subjects[
                    subjectIndex
                  ].credits = text;
                  setSemesters(updatedSemesters);
                }}
                value={subject.credits}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Subject Type"
                onChangeText={(text) => {
                  const updatedSemesters = [...semesters];
                  updatedSemesters[semesterIndex].subjects[subjectIndex].type =
                    text;
                  setSemesters(updatedSemesters);
                }}
                value={subject.type}
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteSubject(semesterIndex, subjectIndex)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddSubject(semesterIndex)}
          >
            <Text>Add Subject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteSemesterButton}
            onPress={() => handleDeleteSemester(semesterIndex)}
          >
            <Text>Delete Semester</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddSemester}>
        <Text>Add Semester</Text>
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
  semesterHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
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
  deleteSemesterButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default MAdminCreationScreen;
