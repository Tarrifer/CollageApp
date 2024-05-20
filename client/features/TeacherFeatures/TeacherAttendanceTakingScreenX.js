import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";

const TeacherAttendanceTakingScreen = ({
  filteredStudents = [],
  onSubmitAttendance,
  filterOptions, // Add filterOptions prop
  onApplyFilter, // Add onApplyFilter prop
}) => {
  const [attendanceData, setAttendanceData] = useState(
    filteredStudents.map((student) => ({
      ...student,
      attendanceStatus: "",
    }))
  );

  const handleRadioButtonChange = (index, status) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index].attendanceStatus = status;
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmitAttendance = () => {
    // Check if any student attendance is missing
    if (attendanceData.some((student) => student.attendanceStatus === "")) {
      alert("Please insert attendance for all students");
      return;
    }

    // Submit attendance
    onSubmitAttendance(attendanceData);

    // Reset attendance data
    setAttendanceData(
      filteredStudents.map((student) => ({
        ...student,
        attendanceStatus: "", // Reset attendance status
      }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Student Attendance</Text>
      {filteredStudents.length === 0 ? (
        <Text>No students found based on selected filters.</Text>
      ) : (
        <>
          {attendanceData.map((student, index) => (
            <View key={index} style={styles.studentCard}>
              <Text>{student.studentName}</Text>
              <Text>{student.semester}</Text>
              <Text>{student.departmentName}</Text>
              <Text>{student.subjectName}</Text>
              <View style={styles.radioButtons}>
                <RadioButton.Group
                  onValueChange={(value) =>
                    handleRadioButtonChange(index, value)
                  }
                  value={attendanceData[index].attendanceStatus}
                >
                  <View style={styles.radioButton}>
                    <Text>Absent</Text>
                    <RadioButton value="absent" />
                  </View>
                  <View style={styles.radioButton}>
                    <Text>Present</Text>
                    <RadioButton value="present" />
                  </View>
                </RadioButton.Group>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitAttendance}
          >
            <Text style={styles.submitButtonText}>Submit Attendance</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default TeacherAttendanceTakingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studentCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  radioButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
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
// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { RadioButton } from "react-native-paper";

// const TeacherAttendanceTakingScreen = ({
//   filteredStudents = [],
//   onSubmitAttendance,
// }) => {
//   const [attendanceData, setAttendanceData] = useState(
//     filteredStudents.map((student) => ({
//       ...student,
//       attendanceStatus: "",
//     }))
//   );

//   const handleRadioButtonChange = (index, status) => {
//     const updatedAttendanceData = [...attendanceData];
//     updatedAttendanceData[index].attendanceStatus = status;
//     setAttendanceData(updatedAttendanceData);
//   };

//   const handleSubmitAttendance = () => {
//     // Check if any student attendance is missing
//     if (attendanceData.some((student) => student.attendanceStatus === "")) {
//       alert("Please insert attendance for all students");
//       return;
//     }

//     // Submit attendance
//     onSubmitAttendance(attendanceData);

//     // Reset attendance data
//     setAttendanceData(
//       filteredStudents.map((student) => ({
//         ...student,
//         attendanceStatus: "", // Reset attendance status
//       }))
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Student Attendance</Text>
//       {filteredStudents.length === 0 ? (
//         <Text>No students found based on selected filters.</Text>
//       ) : (
//         attendanceData.map((student, index) => (
//           <View key={index} style={styles.studentCard}>
//             <Text>{student.studentName}</Text>
//             <Text>{student.semester}</Text>
//             <Text>{student.departmentName}</Text>
//             <Text>{student.subjectName}</Text>
//             <View style={styles.radioButtons}>
//               <RadioButton.Group
//                 onValueChange={(value) => handleRadioButtonChange(index, value)}
//                 value={attendanceData[index].attendanceStatus}
//               >
//                 <View style={styles.radioButton}>
//                   <Text>Absent</Text>
//                   <RadioButton value="absent" />
//                 </View>
//                 <View style={styles.radioButton}>
//                   <Text>Present</Text>
//                   <RadioButton value="present" />
//                 </View>
//               </RadioButton.Group>
//             </View>
//           </View>
//         ))
//       )}
//       {filteredStudents.length > 0 && ( //<==mistake is fixed
//         <TouchableOpacity
//           style={styles.submitButton}
//           onPress={handleSubmitAttendance}
//         >
//           <Text style={styles.submitButtonText}>Submit Attendance</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   studentCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   radioButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   radioButton: {
//     flexDirection: "row",
//     alignItems: "center",
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
//-------------------------------------------------------------
// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { RadioButton } from "react-native-paper";
// const TeacherAttendanceTakingScreen = ({
//   filteredStudents = [],
//   onSubmitAttendance,
// }) => {
//   const [attendanceData, setAttendanceData] = useState(
//     filteredStudents.map((student) => ({
//       ...student,
//       attendanceStatus: "",
//     }))
//   );

//   const handleRadioButtonChange = (index, status) => {
//     const updatedAttendanceData = [...attendanceData];
//     updatedAttendanceData[index].attendanceStatus = status;
//     setAttendanceData(updatedAttendanceData);
//   };

//   const handleSubmitAttendance = () => {
//     // Check if any student attendance is missing
//     if (attendanceData.some((student) => student.attendanceStatus === "")) {
//       alert("Please insert attendance for all students");
//       return;
//     }

//     // Submit attendance
//     onSubmitAttendance(attendanceData);

//     // Reset attendance data
//     setAttendanceData(
//       filteredStudents.map((student) => ({
//         ...student,
//         attendanceStatus: "", // Reset attendance status
//       }))
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Student Attendance</Text>
//       {attendanceData.map((student, index) => (
//         <View key={index} style={styles.studentCard}>
//           <Text>{student.studentName}</Text>
//           <Text>{student.semester}</Text>
//           <Text>{student.departmentName}</Text>
//           <Text>{student.subjectName}</Text>
//           <View style={styles.radioButtons}>
//             <RadioButton.Group
//               onValueChange={(value) => handleRadioButtonChange(index, value)}
//               value={attendanceData[index].attendanceStatus}
//             >
//               <View style={styles.radioButton}>
//                 <Text>Absent</Text>
//                 <RadioButton value="absent" />
//               </View>
//               <View style={styles.radioButton}>
//                 <Text>Present</Text>
//                 <RadioButton value="present" />
//               </View>
//             </RadioButton.Group>
//           </View>
//         </View>
//       ))}
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleSubmitAttendance}
//       >
//         <Text style={styles.submitButtonText}>Submit Attendance</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   studentCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   radioButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   radioButton: {
//     flexDirection: "row",
//     alignItems: "center",
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

// TeacherAttendanceTakingScreen.js
// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { RadioButton } from "react-native-paper";
// import TeacherAttendenceFilterScreen from "./TeacherAttendenceFilterScreen";
// import StudentAttendanceData from "../../database/StudentAttendance.json"; // Import sample data

// const TeacherAttendanceTakingScreen = ({ onSubmitAttendance }) => {
//   const [attendanceData, setAttendanceData] = useState(
//     StudentAttendanceData.map((student) => ({
//       ...student,
//       attendanceStatus: "", // Initially, no attendance status is selected
//     }))
//   );

//   const handleRadioButtonChange = (index, status) => {
//     const updatedAttendanceData = [...attendanceData];
//     updatedAttendanceData[index].attendanceStatus = status;
//     setAttendanceData(updatedAttendanceData);
//   };

//   const handleSubmitAttendance = () => {
//     // Check if any student attendance is missing
//     if (attendanceData.some((student) => student.attendanceStatus === "")) {
//       alert("Please insert attendance for all students");
//       return;
//     }

//     // Submit attendance
//     onSubmitAttendance(attendanceData);

//     // Reset attendance data
//     setAttendanceData(
//       StudentAttendanceData.map((student) => ({
//         ...student,
//         attendanceStatus: "", // Reset attendance status
//       }))
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Student Attendance</Text>
//       {attendanceData.map((student, index) => (
//         <View key={index} style={styles.studentCard}>
//           <Text>{student.studentName}</Text>
//           <Text>{student.semester}</Text>
//           <Text>{student.departmentName}</Text>
//           <Text>{student.subjectName}</Text>
//           <View style={styles.radioButtons}>
//             <RadioButton.Group
//               onValueChange={(value) => handleRadioButtonChange(index, value)}
//               value={attendanceData[index].attendanceStatus}
//             >
//               <View style={styles.radioButton}>
//                 <Text>Absent</Text>
//                 <RadioButton value="absent" />
//               </View>
//               <View style={styles.radioButton}>
//                 <Text>Present</Text>
//                 <RadioButton value="present" />
//               </View>
//             </RadioButton.Group>
//           </View>
//         </View>
//       ))}
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleSubmitAttendance}
//       >
//         <Text style={styles.submitButtonText}>Submit Attendance</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   studentCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   radioButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   radioButton: {
//     flexDirection: "row",
//     alignItems: "center",
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
//-------------------------------------------------------------------------
//
// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { RadioButton } from "react-native-paper";
// import TeacherAttendenceFilterScreen from "./TeacherAttendenceFilterScreen";
// const TeacherAttendanceTakingScreen = ({
//   filteredStudents,
//   onSubmitAttendance,
// }) => {
//   const [attendanceData, setAttendanceData] = useState(
//     filteredStudents.map((student) => ({
//       ...student,
//       attendanceStatus: "", // Initially, no attendance status is selected
//     }))
//   );

//   const handleRadioButtonChange = (index, status) => {
//     const updatedAttendanceData = [...attendanceData];
//     updatedAttendanceData[index].attendanceStatus = status;
//     setAttendanceData(updatedAttendanceData);
//   };

//   const handleSubmitAttendance = () => {
//     // Check if any student attendance is missing
//     if (attendanceData.some((student) => student.attendanceStatus === "")) {
//       alert("Please insert attendance for all students");
//       return;
//     }

//     // Submit attendance
//     onSubmitAttendance(attendanceData);

//     // Reset attendance data
//     setAttendanceData(
//       filteredStudents.map((student) => ({
//         ...student,
//         attendanceStatus: "", // Reset attendance status
//       }))
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Student Attendance</Text>
//       {attendanceData.map((student, index) => (
//         <View key={index} style={styles.studentCard}>
//           <Text>{student.studentName}</Text>
//           <Text>{student.semester}</Text>
//           <Text>{student.departmentName}</Text>
//           <Text>{student.subjectName}</Text>
//           <View style={styles.radioButtons}>
//             <RadioButton.Group
//               onValueChange={(value) => handleRadioButtonChange(index, value)}
//               value={attendanceData[index].attendanceStatus}
//             >
//               <View style={styles.radioButton}>
//                 <Text>Absent</Text>
//                 <RadioButton value="absent" />
//               </View>
//               <View style={styles.radioButton}>
//                 <Text>Present</Text>
//                 <RadioButton value="present" />
//               </View>
//             </RadioButton.Group>
//           </View>
//         </View>
//       ))}
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleSubmitAttendance}
//       >
//         <Text style={styles.submitButtonText}>Submit Attendance</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   studentCard: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   radioButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   radioButton: {
//     flexDirection: "row",
//     alignItems: "center",
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
//------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { updateStudentList } from "../../context/actions/authActions";
// import { useDispatch, useSelector } from "react-redux";
// // import { studentList } from "../../context/actions/authSlice";

// const TeacherAttendanceTakingScreen = () => {
//   const dispatch = useDispatch();
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [attendanceTakenModalVisible, setAttendanceTakenModalVisible] =
//     useState(false);
//   const [missingStudentModalVisible, setMissingStudentModalVisible] =
//     useState(false);
//   useEffect(() => {
//     // Fetch student list from API or other sources
//     const fetchedStudentList = []; // Replace with actual fetch logic
//     dispatch(updateStudentList(fetchedStudentList));
//   }, []);
//   const handleStudentAttendanceChange = (studentName, status) => {
//     const updatedStudents = [...selectedStudents];
//     const index = updatedStudents.findIndex(
//       (student) => student.name === studentName
//     );
//     if (index !== -1) {
//       updatedStudents[index].status = status;
//     } else {
//       updatedStudents.push({ name: studentName, status });
//     }
//     setSelectedStudents(updatedStudents);
//   };

//   const handleAttendanceSubmission = () => {
//     // Check if attendance is taken for all selected students
//     const allStudentsAttended = selectedStudents.length === studentList.length;
//     if (allStudentsAttended) {
//       // Log attendance details and show modal
//       console.log("Attendance Details:", selectedStudents);
//       setAttendanceTakenModalVisible(true);
//     } else {
//       // Show modal for missing student attendance
//       setMissingStudentModalVisible(true);
//     }
//   };

//   // Dummy student list, replace it with actual data fetched from API or Redux store
//   const studentList = useSelector((state) => state.attendance.studentList);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.cameraButton}>
//           <FontAwesome name="camera" size={30} color="black" />
//           <Text style={{ marginLeft: 5 }}>
//             Take Face Recognition Attendance
//           </Text>
//         </TouchableOpacity>
//       </View>
//       {studentList.map((student) => (
//         <View key={student.name} style={styles.studentCard}>
//           <Text style={styles.studentName}>{student.name}</Text>
//           <View style={styles.radioButtons}>
//             <TouchableOpacity
//               style={styles.radioButtonContainer}
//               onPress={() =>
//                 handleStudentAttendanceChange(student.name, "Absent")
//               }
//             >
//               <Text>Absent</Text>
//               <FontAwesome
//                 name={
//                   selectedStudents.find(
//                     (s) => s.name === student.name && s.status === "Absent"
//                   )
//                     ? "dot-circle-o"
//                     : "circle-o"
//                 }
//                 size={24}
//                 color="black"
//                 style={{ marginLeft: 5 }}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.radioButtonContainer}
//               onPress={() =>
//                 handleStudentAttendanceChange(student.name, "Present")
//               }
//             >
//               <Text>Present</Text>
//               <FontAwesome
//                 name={
//                   selectedStudents.find(
//                     (s) => s.name === student.name && s.status === "Present"
//                   )
//                     ? "dot-circle-o"
//                     : "circle-o"
//                 }
//                 size={24}
//                 color="black"
//                 style={{ marginLeft: 5 }}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={handleAttendanceSubmission}
//       >
//         <Text style={styles.submitButtonText}>Submit Attendance</Text>
//       </TouchableOpacity>
//       <Modal
//         visible={missingStudentModalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setMissingStudentModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>
//               Please insert all students' attendance.
//             </Text>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setMissingStudentModalVisible(false)}
//             >
//               <Text style={styles.modalButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         visible={attendanceTakenModalVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setAttendanceTakenModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Attendance taken successfully.</Text>
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setAttendanceTakenModalVisible(false)}
//             >
//               <Text style={styles.modalButtonText}>OK</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   cameraButton: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   studentCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   studentName: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   radioButtons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   radioButtonContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 10,
//   },
//   submitButton: {
//     backgroundColor: "green",
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   submitButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   modalButton: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//   },
//   modalButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });
