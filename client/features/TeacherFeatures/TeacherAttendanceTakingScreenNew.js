import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
import moment from "moment";
import TeacherAttendanceFilterScreen from "./TeacherAttendenceFilterScreenNew";
const TeacherAttendanceTakingScreen = ({
  students,
  filteredStudents,
  applyFilter,
}) => {
  const [attendanceStatus, setAttendanceStatus] = React.useState({});
  const [allStudentsSelected, setAllStudentsSelected] = React.useState(false);

  const handleAttendanceChange = (rollNumber, status) => {
    setAttendanceStatus({ ...attendanceStatus, [rollNumber]: status });
  };

  const submitAttendance = () => {
    // Check if all students are selected
    if (Object.keys(attendanceStatus).length !== students.length) {
      Alert.alert("Please select all students.");
      return;
    }

    const attendanceData = Object.keys(attendanceStatus).map((key) => {
      const student = students.find(
        (student) => student.rollNumber === parseInt(key)
      );
      return {
        rollNumber: student.rollNumber,
        studentName: student.studentName,
        subjectName: student.subjectName,
        semester: student.semester,
        status: attendanceStatus[key],
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
    });

    console.log("Submitted Attendance: ", attendanceData);

    // Reset attendance status
    setAttendanceStatus({});

    // Show success message
    Alert.alert("Success", "Attendance submitted successfully.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="camera" size={24} color="black" />
        <Text style={styles.headerText}>
          Face Recognition Attendance Tracking
        </Text>
      </View>
      {applyFilter && <applyFilter applyFilter={applyFilter} />}

      {filteredStudents.length > 0 && (
        <View>
          {filteredStudents.map((student) => (
            <View key={student.rollNumber} style={styles.card}>
              <Text>{`Student Name: ${student.studentName}`}</Text>
              <Text>{`Department: ${student.departmentName}`}</Text>
              <Text>{`Subject: ${student.subjectName}`}</Text>
              <Text>{`Roll Number: ${student.rollNumber}`}</Text>
              <View style={styles.radioButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    attendanceStatus[student.rollNumber] === "absent"
                      ? [styles.radioButtonActive, styles.absentButton]
                      : styles.radioButtonInactive,
                  ]}
                  onPress={() =>
                    handleAttendanceChange(student.rollNumber, "absent")
                  }
                >
                  <Text
                    style={[
                      styles.radioButtonText,
                      attendanceStatus[student.rollNumber] === "absent" &&
                        styles.radioButtonTextActive,
                    ]}
                  >
                    Absent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    attendanceStatus[student.rollNumber] === "present"
                      ? [styles.radioButtonActive, styles.presentButton]
                      : styles.radioButtonInactive,
                  ]}
                  onPress={() =>
                    handleAttendanceChange(student.rollNumber, "present")
                  }
                >
                  <Text
                    style={[
                      styles.radioButtonText,
                      attendanceStatus[student.rollNumber] === "present" &&
                        styles.radioButtonTextActive,
                    ]}
                  >
                    Present
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitAttendance}
          >
            <Text style={styles.submitButtonText}>Submit Attendance</Text>
          </TouchableOpacity>
        </View>
      )}
      {filteredStudents.length === 0 && (
        <Text style={styles.noStudentsText}>No students available</Text>
      )}
    </ScrollView>
  );
};

export default TeacherAttendanceTakingScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    marginLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 8,
    width: "48%",
    alignItems: "center",
  },
  radioButtonActive: {
    backgroundColor: "#007bff",
  },
  radioButtonInactive: {
    backgroundColor: "#fff",
  },
  radioButtonText: {
    fontSize: 16,
    color: "#000",
  },
  radioButtonTextActive: {
    color: "#fff",
  },
  absentButton: {
    borderColor: "#dc3545",
  },
  presentButton: {
    borderColor: "#28a745",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  noStudentsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo
// import TeacherAttendanceFilterScreen from "./TeacherAttendenceFilterScreen";
// import moment from "moment";

// const TeacherAttendanceTakingScreen = ({
//   students,
//   filteredStudents,
//   onSubmitAttendance,
// }) => {
//   const [attendanceStatus, setAttendanceStatus] = React.useState({});
//   const [allStudentsSelected, setAllStudentsSelected] = React.useState(false);

//   const handleAttendanceChange = (rollNumber, status) => {
//     setAttendanceStatus({ ...attendanceStatus, [rollNumber]: status });
//   };

//   const submitAttendance = () => {
//     // Check if all students are selected
//     if (Object.keys(attendanceStatus).length !== students.length) {
//       Alert.alert("Please select all students.");
//       return;
//     }

//     const attendanceData = Object.keys(attendanceStatus).map((key) => {
//       const student = students.find(
//         (student) => student.rollNumber === parseInt(key)
//       );
//       return {
//         rollNumber: student.rollNumber,
//         studentName: student.studentName,
//         subjectName: student.subjectName,
//         semester: student.semester,
//         status: attendanceStatus[key],
//         date: moment().format("YYYY-MM-DD HH:mm:ss"),
//       };
//     });

//     console.log("Submitted Attendance: ", attendanceData);

//     // Reset attendance status
//     setAttendanceStatus({});

//     // Show success message
//     Alert.alert("Success", "Attendance submitted successfully.");
//   };

//   const applyFilter = (selectedFilter) => {
//     // Filter the students based on the selected filter
//     const filteredStudents = students.filter((student) => {
//       if (
//         !selectedFilter.semester &&
//         !selectedFilter.department &&
//         !selectedFilter.subject &&
//         !selectedFilter.studentName
//       ) {
//         return true;
//       }
//       if (
//         selectedFilter.semester &&
//         student.semester !== selectedFilter.semester
//       ) {
//         return false;
//       }
//       if (
//         selectedFilter.department &&
//         student.departmentName !== selectedFilter.department
//       ) {
//         return false;
//       }
//       if (
//         selectedFilter.subject &&
//         student.subjectName !== selectedFilter.subject
//       ) {
//         return false;
//       }
//       if (
//         selectedFilter.studentName &&
//         student.studentName !== selectedFilter.studentName
//       ) {
//         return false;
//       }
//       return true;
//     });

//     return filteredStudents;
//   };

//   // const filteredStudents = applyFilter({});

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Ionicons name="camera" size={24} color="black" />
//         <Text style={styles.headerText}>
//           Face Recognition Attendance Tracking
//         </Text>
//       </View>
//       <TeacherAttendanceFilterScreen onFilter={applyFilter} />
//       {filteredStudents.length > 0 && (
//         <View>
//           {filteredStudents.map((student) => (
//             <View key={student.rollNumber} style={styles.card}>
//               <Text>{`Student Name: ${student.studentName}`}</Text>
//               <Text>{`Department: ${student.departmentName}`}</Text>
//               <Text>{`Subject: ${student.subjectName}`}</Text>
//               <Text>{`Roll Number: ${student.rollNumber}`}</Text>
//               <View style={styles.radioButtonContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.radioButton,
//                     attendanceStatus[student.rollNumber] === "absent"
//                       ? [styles.radioButtonActive, styles.absentButton]
//                       : styles.radioButtonInactive,
//                   ]}
//                   onPress={() =>
//                     handleAttendanceChange(student.rollNumber, "absent")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.radioButtonText,
//                       attendanceStatus[student.rollNumber] === "absent" &&
//                         styles.radioButtonTextActive,
//                     ]}
//                   >
//                     Absent
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.radioButton,
//                     attendanceStatus[student.rollNumber] === "present"
//                       ? [styles.radioButtonActive, styles.presentButton]
//                       : styles.radioButtonInactive,
//                   ]}
//                   onPress={() =>
//                     handleAttendanceChange(student.rollNumber, "present")
//                   }
//                 >
//                   <Text
//                     style={[
//                       styles.radioButtonText,
//                       attendanceStatus[student.rollNumber] === "present" &&
//                         styles.radioButtonTextActive,
//                     ]}
//                   >
//                     Present
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//           <TouchableOpacity
//             style={styles.submitButton}
//             onPress={submitAttendance}
//           >
//             <Text style={styles.submitButtonText}>Submit Attendance</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       {filteredStudents.length === 0 && (
//         <Text style={styles.noStudentsText}>No students available</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingVertical: 20,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     marginLeft: 10,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   radioButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   radioButton: {
//     borderWidth: 1,
//     padding: 5,
//     borderRadius: 5,
//     alignItems: "center",
//     flex: 1,
//   },
//   radioButtonInactive: {
//     borderColor: "#000",
//   },
//   radioButtonActive: {
//     backgroundColor: "#000",
//   },
//   radioButtonText: {
//     color: "#000",
//   },
//   radioButtonTextActive: {
//     color: "#fff",
//   },
//   absentButton: {
//     backgroundColor: "red",
//   },
//   presentButton: {
//     backgroundColor: "green",
//   },
//   submitButton: {
//     backgroundColor: "#000",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: "#fff",
//   },
//   noStudentsText: {
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default TeacherAttendanceTakingScreen;
