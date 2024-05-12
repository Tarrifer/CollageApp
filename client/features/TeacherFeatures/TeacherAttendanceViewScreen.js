import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchStudentAttendance from "./SearchStudentAttendance"; // Assuming SearchStudentAttendance.js is in the same directory

// Sample student attendance data
import StudentAttendanceData from "../../database/StudentAttendance.json";

const TeacherAttendanceViewScreen = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchStudents = (searchParams) => {
    // Perform search filtering based on search parameters
    const results = StudentAttendanceData.filter((student) => {
      return (
        (searchParams.semester === "" ||
          student.semester === searchParams.semester) &&
        (searchParams.department === "" ||
          student.departmentName === searchParams.department) &&
        (searchParams.subject === "" ||
          student.subjectName === searchParams.subject) &&
        (searchParams.studentName === "" ||
          student.studentName === searchParams.studentName)
      );
    });
    setSearchResults(results);
  };

  // Function to calculate attendance percentage
  const calculateAttendancePercentage = (absent, present) => {
    const total = absent + present;
    if (total === 0) return 0;
    return ((present / total) * 100).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <SearchStudentAttendance onSearch={searchStudents} />
      <Text style={styles.headerText}>Search Results:</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subjectName}>{item.subjectName}</Text>
            <Text>{`Student Name: ${item.studentName}`}</Text>
            <Text>{`Department: ${item.departmentName}`}</Text>
            <Text>{`Semester: ${item.semester}`}</Text>
            <View style={styles.attendanceRow}>
              <View style={[styles.attendanceItem, styles.absent]}>
                <Text
                  style={styles.attendanceText}
                >{`Absent: ${item.absent}`}</Text>
              </View>
              <View style={[styles.attendanceItem, styles.present]}>
                <Text
                  style={styles.attendanceText}
                >{`Present: ${item.present}`}</Text>
              </View>
            </View>
            <View style={styles.attendanceContainer}>
              <Text style={styles.attendanceLabel}>Subject Attendance</Text>
              <Text style={styles.percentage}>
                {calculateAttendancePercentage(item.absent, item.present)}%
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${calculateAttendancePercentage(
                      item.absent,
                      item.present
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TeacherAttendanceViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  attendanceRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  attendanceItem: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  absent: {
    backgroundColor: "red",
  },
  present: {
    backgroundColor: "green",
  },
  attendanceText: {
    color: "#fff",
  },
  attendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  attendanceLabel: {
    color: "#000",
    fontWeight: "bold",
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  percentage: {
    textAlign: "center",
  },
});

// import React, { useState } from "react";
// import { View, Text, FlatList } from "react-native";
// import SearchStudentAttendance from "./SearchStudentAttendance"; // Assuming SearchStudentAttendance.js is in the same directory

// // Sample student attendance data
// import StudentAttendanceData from "../../database/StudentAttendance.json";

// const TeacherAttendanceViewScreen = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   const searchStudents = (searchParams) => {
//     // Perform search filtering based on search parameters
//     const results = StudentAttendanceData.filter((student) => {
//       return (
//         (searchParams.semester === "" ||
//           student.semester === searchParams.semester) &&
//         (searchParams.department === "" ||
//           student.departmentName === searchParams.department) &&
//         (searchParams.subject === "" ||
//           student.subjectName === searchParams.subject) &&
//         (searchParams.studentName === "" ||
//           student.studentName === searchParams.studentName)
//       );
//     });
//     setSearchResults(results);
//   };

//   return (
//     <View>
//       <SearchStudentAttendance onSearch={searchStudents} />
//       <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
//         Search Results:
//       </Text>
//       <FlatList
//         data={searchResults}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={{ marginVertical: 5 }}>
//             <Text>
//               <Text style={{ fontWeight: "bold" }}>Student Name:</Text>{" "}
//               {item.studentName}
//             </Text>
//             <Text>
//               <Text style={{ fontWeight: "bold" }}>Department:</Text>{" "}
//               {item.departmentName}
//             </Text>
//             <Text>
//               <Text style={{ fontWeight: "bold" }}>Subject:</Text>{" "}
//               {item.subjectName}
//             </Text>
//             <Text>
//               <Text style={{ fontWeight: "bold" }}>Semester:</Text>{" "}
//               {item.semester}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default TeacherAttendanceViewScreen;
