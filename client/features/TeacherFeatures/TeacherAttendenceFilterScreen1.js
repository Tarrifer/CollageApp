// TeacherAttendenceFilterScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import StudentAttendanceData from "../../database/StudentAttendance.json";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

const TeacherAttendenceFilterScreen = ({ onFetchStudents }) => {
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    // Fetch initial data for picker from StudentAttendanceData.json
    const uniqueSemesters = [
      ...new Set(StudentAttendanceData.map((student) => student.semester)),
    ];
    const uniqueDepartments = [
      ...new Set(
        StudentAttendanceData.map((student) => student.departmentName)
      ),
    ];
    const uniqueSubjects = [
      ...new Set(StudentAttendanceData.map((student) => student.subjectName)),
    ];

    // Set initial values for the Picker based on the unique values in the data
    if (uniqueSemesters.length === 1) {
      setSemester(uniqueSemesters[0]);
    }
    if (uniqueDepartments.length === 1) {
      setDepartment(uniqueDepartments[0]);
    }
    if (uniqueSubjects.length === 1) {
      setSubject(uniqueSubjects[0]);
    }
  }, []);

  const handleFetchStudents = () => {
    // Pass selected filter options to parent component for fetching students
    onFetchStudents({ semester, department, subject });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cameraButton}>
          <FontAwesome name="camera" size={24} color="black" />
          <Text style={styles.cameraButtonText}>
            Click for taking face recognition attendance
          </Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={semester}
        onValueChange={(itemValue) => setSemester(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose Semester" value="" />
        {/* Check if StudentAttendanceData is defined before mapping */}
        {StudentAttendanceData &&
          StudentAttendanceData.map((student) => (
            <Picker.Item
              key={student.semester}
              label={student.semester}
              value={student.semester}
            />
          ))}
      </Picker>
      <Picker
        selectedValue={department}
        onValueChange={(itemValue) => setDepartment(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose Department" value="" />
        {/* Check if StudentAttendanceData is defined before mapping */}
        {StudentAttendanceData &&
          StudentAttendanceData.map((student) => (
            <Picker.Item
              key={student.departmentName}
              label={student.departmentName}
              value={student.departmentName}
            />
          ))}
      </Picker>
      <Picker
        selectedValue={subject}
        onValueChange={(itemValue) => setSubject(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Choose Subject" value="" />
        {/* Check if StudentAttendanceData is defined before mapping */}
        {StudentAttendanceData &&
          StudentAttendanceData.map((student) => (
            <Picker.Item
              key={student.subjectName}
              label={student.subjectName}
              value={student.subjectName}
            />
          ))}
      </Picker>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleFetchStudents}
      >
        <Text style={styles.submitButtonText}>Fetch Students</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeacherAttendenceFilterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraButtonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  picker: {
    marginBottom: 20,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "green",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

//----------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import StudentAttendanceData from "../../database/StudentAttendance.json"; // Import sample data
// import { Picker } from "@react-native-picker/picker";
// import { FontAwesome } from "@expo/vector-icons";
// const TeacherAttendenceFilterScreen = ({ onFetchStudents }) => {
//   const [semester, setSemester] = useState("");
//   const [department, setDepartment] = useState("");
//   const [subject, setSubject] = useState("");

//   useEffect(() => {
//     // Fetch initial data for picker from StudentAttendanceData.json
//     const uniqueSemesters = [
//       ...new Set(StudentAttendanceData.map((student) => student.semester)),
//     ];
//     const uniqueDepartments = [
//       ...new Set(
//         StudentAttendanceData.map((student) => student.departmentName)
//       ),
//     ];
//     const uniqueSubjects = [
//       ...new Set(StudentAttendanceData.map((student) => student.subjectName)),
//     ];

//     // Set initial values for the Picker based on the unique values in the data
//     if (uniqueSemesters.length === 1) {
//       setSemester(uniqueSemesters[0]);
//     }
//     if (uniqueDepartments.length === 1) {
//       setDepartment(uniqueDepartments[0]);
//     }
//     if (uniqueSubjects.length === 1) {
//       setSubject(uniqueSubjects[0]);
//     }
//   }, []);

//   const handleFetchStudents = () => {
//     // Pass selected filter options to parent component for fetching students
//     onFetchStudents({ semester, department, subject });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.cameraButton}>
//           <FontAwesome name="camera" size={24} color="black" />
//           <Text style={styles.cameraButtonText}>
//             Click for taking face recognition attendance
//           </Text>
//         </TouchableOpacity>
//       </View>
//       <Picker
//         selectedValue={semester}
//         onValueChange={(itemValue) => setSemester(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Choose Semester" value="" />
//         {/* Check if StudentAttendanceData is defined before mapping */}
//         {StudentAttendanceData &&
//           StudentAttendanceData.map((student) => (
//             <Picker.Item
//               key={student.semester}
//               label={student.semester}
//               value={student.semester}
//             />
//           ))}
//       </Picker>
//       <Picker
//         selectedValue={department}
//         onValueChange={(itemValue) => setDepartment(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Choose Department" value="" />
//         {/* Check if StudentAttendanceData is defined before mapping */}
//         {StudentAttendanceData &&
//           StudentAttendanceData.map((student) => (
//             <Picker.Item
//               key={student.departmentName}
//               label={student.departmentName}
//               value={student.departmentName}
//             />
//           ))}
//       </Picker>
//       <Picker
//         selectedValue={subject}
//         onValueChange={(itemValue) => setSubject(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Choose Subject" value="" />
//         {/* Check if StudentAttendanceData is defined before mapping */}
//         {StudentAttendanceData &&
//           StudentAttendanceData.map((student) => (
//             <Picker.Item
//               key={student.subjectName}
//               label={student.subjectName}
//               value={student.subjectName}
//             />
//           ))}
//       </Picker>
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleFetchStudents}
//       >
//         <Text style={styles.submitButtonText}>Fetch Students</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TeacherAttendenceFilterScreen;

// // Styles for both components
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   cameraButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   cameraButtonText: {
//     marginLeft: 5,
//     fontSize: 16,
//   },
//   picker: {
//     marginBottom: 20,
//     width: "100%",
//   },
//   submitButton: {
//     backgroundColor: "green",
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
