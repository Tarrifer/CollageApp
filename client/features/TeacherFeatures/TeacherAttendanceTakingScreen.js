import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TeacherAttendanceFilterScreen from "./TeacherAttendenceFilterScreen";

const TeacherAttendanceTakingScreen = ({ students }) => {
  const [attendanceStatus, setAttendanceStatus] = useState({});

  const handleAttendanceChange = (rollNumber, status) => {
    setAttendanceStatus({ ...attendanceStatus, [rollNumber]: status });
  };
  const applyFilter = (selectedFilter) => {
    console.log("Selected Filter:", selectedFilter);

    if (!students || students.length === 0) {
      console.error("No student data available");
      return [];
    }

    // If no filter is selected, return all students
    if (
      !selectedFilter.semester &&
      !selectedFilter.department &&
      !selectedFilter.subject &&
      !selectedFilter.studentName
    ) {
      return students;
    }

    // Apply filters one by one
    let filteredStudents = students;

    // Filter by semester
    if (selectedFilter.semester) {
      filteredStudents = filteredStudents.filter(
        (student) => student.semester === selectedFilter.semester
      );
    }

    // Filter by department
    if (selectedFilter.department) {
      filteredStudents = filteredStudents.filter(
        (student) => student.department === selectedFilter.department
      );
    }

    // Filter by subject
    if (selectedFilter.subject) {
      filteredStudents = filteredStudents.filter(
        (student) => student.subject === selectedFilter.subject
      );
    }

    // Filter by student name
    if (selectedFilter.studentName) {
      filteredStudents = filteredStudents.filter(
        (student) => student.studentName === selectedFilter.studentName
      );
    }

    console.log("Filtered Students:", filteredStudents);

    return filteredStudents;
  };

  // const applyFilter = (selectedFilter) => {
  //   console.log("Selected Filter:", selectedFilter);

  //   if (!students || students.length === 0) {
  //     console.error("No student data available");
  //     return [];
  //   }

  //   // Apply filters one by one
  //   let filteredStudents = students;

  //   // Filter by semester
  //   if (selectedFilter.semester) {
  //     filteredStudents = filteredStudents.filter(
  //       (student) => student.semester === selectedFilter.semester
  //     );
  //   }

  //   // Filter by department
  //   if (selectedFilter.department) {
  //     filteredStudents = filteredStudents.filter(
  //       (student) => student.department === selectedFilter.department
  //     );
  //   }

  //   // Filter by subject
  //   if (selectedFilter.subject) {
  //     filteredStudents = filteredStudents.filter(
  //       (student) => student.subject === selectedFilter.subject
  //     );
  //   }

  //   // Filter by student name
  //   if (selectedFilter.studentName) {
  //     filteredStudents = filteredStudents.filter(
  //       (student) => student.studentName === selectedFilter.studentName
  //     );
  //   }

  //   console.log("Filtered Students:", filteredStudents);

  //   return filteredStudents;
  // };

  console.log("Students:", students);

  return (
    <View>
      <TeacherAttendanceFilterScreen onFilter={applyFilter} />
      {students && students.length > 0 ? (
        students.map((student, index) => (
          <View key={index} style={styles.card}>
            <Text>{`Student Name: ${student.studentName}`}</Text>
            <Text>{`Department: ${student.departmentName}`}</Text>
            <Text>{`Subject: ${student.subjectName}`}</Text>
            <Text>{`Roll Number: ${student.rollNumber}`}</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  attendanceStatus[student.rollNumber] === "absent" &&
                    styles.radioButtonActive,
                ]}
                onPress={() =>
                  handleAttendanceChange(student.rollNumber, "absent")
                }
              >
                <Text>Absent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  attendanceStatus[student.rollNumber] === "present" &&
                    styles.radioButtonActive,
                ]}
                onPress={() =>
                  handleAttendanceChange(student.rollNumber, "present")
                }
              >
                <Text>Present</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>No students available</Text>
      )}
    </View>
  );
};

export default TeacherAttendanceTakingScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    borderRadius: 5,
  },
  radioButtonActive: {
    backgroundColor: "#000",
  },
});

//---------------------------------------------------------------
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import TeacherAttendanceFilterScreen from "./TeacherAttendenceFilterScreen";

// const TeacherAttendanceTakingScreen = ({ students }) => {
//   const [attendanceStatus, setAttendanceStatus] = useState({});

//   const handleAttendanceChange = (rollNumber, status) => {
//     setAttendanceStatus({ ...attendanceStatus, [rollNumber]: status });
//   };

//   const applyFilter = (selectedFilter) => {
//     if (!students || students.length === 0) {
//       console.error("No student data available");
//       return [];
//     }

//     const { semester, department, subject, studentName } = selectedFilter;

//     // Apply filters one by one
//     let filteredStudents = students;

//     // Filter by semester
//     if (semester) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.semester === semester
//       );
//     }

//     // Filter by department
//     if (department) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.department === department
//       );
//     }

//     // Filter by subject
//     if (subject) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.subject === subject
//       );
//     }

//     // Filter by student name
//     if (studentName) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.studentName === studentName
//       );
//     }

//     return filteredStudents;
//   };

//   return (
//     <View>
//       <TeacherAttendanceFilterScreen onFilter={applyFilter} />
//       {students && students.length > 0 ? (
//         students.map((student, index) => (
//           <View key={index} style={styles.card}>
//             <Text>{`Student Name: ${student.studentName}`}</Text>
//             <Text>{`Department: ${student.departmentName}`}</Text>
//             <Text>{`Subject: ${student.subjectName}`}</Text>
//             <Text>{`Roll Number: ${student.rollNumber}`}</Text>
//             <View style={styles.radioButtonContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.radioButton,
//                   attendanceStatus[student.rollNumber] === "absent" &&
//                     styles.radioButtonActive,
//                 ]}
//                 onPress={() =>
//                   handleAttendanceChange(student.rollNumber, "absent")
//                 }
//               >
//                 <Text>Absent</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.radioButton,
//                   attendanceStatus[student.rollNumber] === "present" &&
//                     styles.radioButtonActive,
//                 ]}
//                 onPress={() =>
//                   handleAttendanceChange(student.rollNumber, "present")
//                 }
//               >
//                 <Text>Present</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))
//       ) : (
//         <Text>No students available</Text>
//       )}
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;

// const styles = StyleSheet.create({
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
//     borderColor: "#000",
//     padding: 5,
//     borderRadius: 5,
//   },
//   radioButtonActive: {
//     backgroundColor: "#000",
//   },
// });
//----------------------------------------------------
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import TeacherAttendanceFilterScreen from "./TeacherAttendenceFilterScreen";

// const TeacherAttendanceTakingScreen = ({ students }) => {
//   const [attendanceStatus, setAttendanceStatus] = useState({});

//   const handleAttendanceChange = (rollNumber, status) => {
//     setAttendanceStatus({ ...attendanceStatus, [rollNumber]: status });
//   };
//   const applyFilter = (selectedFilter) => {
//     if (!students || students.length === 0) {
//       console.error("No student data available");
//       return [];
//     }

//     const { semester, department, subject, studentName } = selectedFilter;

//     // Apply filters one by one
//     let filteredStudents = students;

//     // Filter by semester
//     if (semester) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.semester === semester
//       );
//     }

//     // Filter by department
//     if (department) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.department === department
//       );
//     }

//     // Filter by subject
//     if (subject) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.subject === subject
//       );
//     }

//     // Filter by student name
//     if (studentName) {
//       filteredStudents = filteredStudents.filter(
//         (student) => student.studentName === studentName
//       );
//     }

//     return filteredStudents;
//   };

//   return (
//     <View>
//       <TeacherAttendanceFilterScreen onFilter={applyFilter} />
//       {students && students.length > 0 ? (
//         students.map((student, index) => (
//           <View key={index} style={styles.card}>
//             <Text>{`Student Name: ${student.studentName}`}</Text>
//             <Text>{`Department: ${student.departmentName}`}</Text>
//             <Text>{`Subject: ${student.subjectName}`}</Text>
//             <Text>{`Roll Number: ${student.rollNumber}`}</Text>
//             <View style={styles.radioButtonContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.radioButton,
//                   attendanceStatus[student.rollNumber] === "absent" &&
//                     styles.radioButtonActive,
//                 ]}
//                 onPress={() =>
//                   handleAttendanceChange(student.rollNumber, "absent")
//                 }
//               >
//                 <Text>Absent</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.radioButton,
//                   attendanceStatus[student.rollNumber] === "present" &&
//                     styles.radioButtonActive,
//                 ]}
//                 onPress={() =>
//                   handleAttendanceChange(student.rollNumber, "present")
//                 }
//               >
//                 <Text>Present</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))
//       ) : (
//         <Text>No students available</Text>
//       )}
//     </View>
//   );
// };

// export default TeacherAttendanceTakingScreen;

// const styles = StyleSheet.create({
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
//     borderColor: "#000",
//     padding: 5,
//     borderRadius: 5,
//   },
//   radioButtonActive: {
//     backgroundColor: "#000",
//   },
// });
