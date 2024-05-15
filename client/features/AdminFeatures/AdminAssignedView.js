import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import assignedSubjectData from "../../database/AssignedSubject.json";
const AdminAssignedView = () => {
  const navigation = useNavigation();
  const [assignments, setAssignments] = useState(assignedSubjectData);
  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this assignment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Filter out the assignment with the given id
            const updatedAssignments = assignments.filter(
              (assignment) => assignment.id !== id
            );
            // Update the state with the filtered assignments
            setAssignments(updatedAssignments);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleChange = (assignment) => {
    // Navigate to AdminAssignSubject screen with assignment data as props
    navigation.navigate("AdminAssignSubject", { assignment });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {assignments.map((assignment) => (
        <View key={assignment.id} style={styles.card}>
          <Text style={styles.cardTitle}>Assigned Subject {assignment.id}</Text>
          <Text style={styles.cardText}>
            Teacher: {assignment.selectedTeacher}
          </Text>
          <Text style={styles.cardText}>
            School: {assignment.selectedSchool}
          </Text>
          <Text style={styles.cardText}>
            Semester: {assignment.selectedSemester}
          </Text>
          <Text style={styles.cardText}>
            Department: {assignment.selectedDepartment}
          </Text>
          <Text style={styles.cardText}>
            Subject: {assignment.selectedSubject.SubjectName}
          </Text>
          <Text style={styles.cardText}>
            Subject Credit: {assignment.selectedSubject.SubjectCredit}
          </Text>
          <Text style={styles.cardText}>
            Date & Time: {assignment.dateTime}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDelete(assignment.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleChange(assignment)}
            >
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default AdminAssignedView;
//--------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import assignedSubjectData from "../../database/AssignedSubject.json";
// import teacherData from "../../database/Batch.json"; // Assuming you have teacher data
// import subjectData from "../../database/Departments.json"; // Assuming you have subject data

// const AdminAssignedView = () => {
//   const navigation = useNavigation();
//   const [assignments, setAssignments] = useState(assignedSubjectData);

//   const handleDelete = (id) => {
//     Alert.alert(
//       "Confirm Deletion",
//       "Are you sure you want to delete this assignment?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           onPress: () => {
//             const updatedAssignments = assignments.filter(
//               (assignment) => assignment.id !== id
//             );
//             setAssignments(updatedAssignments);
//           },
//           style: "destructive",
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleChange = (assignment) => {
//     navigation.navigate("AdminAssignSubject", {
//       assignment: assignment, // Ensure assignment is passed as a prop
//       schools: teacherData.map((school) => school.SchoolName),
//       teachers: teacherData.reduce(
//         (acc, curr) => acc.concat(curr.Teachers),
//         []
//       ),
//       departments: subjectData.map((dept) => dept.DepartmentName),
//       semesters: Object.keys(
//         subjectData.find(
//           (dept) => dept.DepartmentName === assignment.selectedDepartment
//         ).Semesters
//       ),
//       subjects:
//         subjectData.find(
//           (dept) => dept.DepartmentName === assignment.selectedDepartment
//         )?.Semesters[assignment.selectedSemester] || [],
//     });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {assignments.map((assignment) => (
//         <View key={assignment.id} style={styles.card}>
//           <Text style={styles.cardTitle}>Assignment {assignment.id}</Text>
//           <Text style={styles.cardText}>
//             Teacher: {assignment.selectedTeacher}
//           </Text>
//           <Text style={styles.cardText}>
//             School: {assignment.selectedSchool}
//           </Text>
//           <Text style={styles.cardText}>
//             Semester: {assignment.selectedSemester}
//           </Text>
//           <Text style={styles.cardText}>
//             Department: {assignment.selectedDepartment}
//           </Text>
//           <Text style={styles.cardText}>
//             Subject: {assignment.selectedSubject.SubjectName}
//           </Text>
//           <Text style={styles.cardText}>
//             Subject Credit: {assignment.selectedSubject.SubjectCredit}
//           </Text>
//           <Text style={styles.cardText}>
//             Date & Time: {assignment.dateTime}
//           </Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleDelete(assignment.id)}
//             >
//               <Text style={styles.buttonText}>Delete</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleChange(assignment)}
//             >
//               <Text style={styles.buttonText}>Change</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#dddddd",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: "#3498db",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontWeight: "bold",
//   },
// });

// export default AdminAssignedView;

//------------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import assignedSubjectData from "../../database/AssignedSubject.json";
// const AdminAssignedView = () => {
//   const navigation = useNavigation();
//   const [assignments, setAssignments] = useState(assignedSubjectData);
//   const handleDelete = (id) => {
//     Alert.alert(
//       "Confirm Deletion",
//       "Are you sure you want to delete this assignment?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           onPress: () => {
//             // Filter out the assignment with the given id
//             const updatedAssignments = assignments.filter(
//               (assignment) => assignment.id !== id
//             );
//             // Update the state with the filtered assignments
//             setAssignments(updatedAssignments);
//           },
//           style: "destructive",
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const handleChange = (assignment) => {
//     // Navigate to AdminAssignSubject screen with assignment data as props
//     navigation.navigate("AdminAssignSubject", { assignment });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {assignments.map((assignment) => (
//         <View key={assignment.id} style={styles.card}>
//           <Text style={styles.cardTitle}>Assignment {assignment.id}</Text>
//           <Text style={styles.cardText}>
//             Teacher: {assignment.selectedTeacher}
//           </Text>
//           <Text style={styles.cardText}>
//             School: {assignment.selectedSchool}
//           </Text>
//           <Text style={styles.cardText}>
//             Semester: {assignment.selectedSemester}
//           </Text>
//           <Text style={styles.cardText}>
//             Department: {assignment.selectedDepartment}
//           </Text>
//           <Text style={styles.cardText}>
//             Subject: {assignment.selectedSubject.SubjectName}
//           </Text>
//           <Text style={styles.cardText}>
//             Subject Credit: {assignment.selectedSubject.SubjectCredit}
//           </Text>
//           <Text style={styles.cardText}>
//             Date & Time: {assignment.dateTime}
//           </Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleDelete(assignment.id)}
//             >
//               <Text style={styles.buttonText}>Delete</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => handleChange(assignment)}
//             >
//               <Text style={styles.buttonText}>Change</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#dddddd",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: "#3498db",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#ffffff",
//     fontWeight: "bold",
//   },
// });

// export default AdminAssignedView;
//------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";

// const AdminAssignedView = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [assignments, setAssignments] = useState([]);
//   const [filteredAssignments, setFilteredAssignments] = useState([]);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get("https://your-api-url/assignments");
//         setAssignments(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAssignments();
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filteredAssignments = assignments.filter((assignment) => {
//       const teacherName = assignment.teacher.name.toLowerCase();
//       const department = assignment.teacher.departmentName.toLowerCase();
//       const semester = assignment.semester.toLowerCase();
//       const queryLowercase = query.toLowerCase();
//       return (
//         teacherName.includes(queryLowercase) ||
//         department.includes(queryLowercase) ||
//         semester.includes(queryLowercase)
//       );
//     });
//     setFilteredAssignments(filteredAssignments);
//   };

//   const renderAssignment = ({ item }) => {
//     const { teacher, semester, subject } = item;
//     return (
//       <View style={styles.assignmentCard}>
//         <View style={styles.cardContainer}>
//           <Text style={styles.cardTitle}>{teacher.name}</Text>
//           <View style={styles.cardSubjects}>
//             <Text style={styles.cardSubjectText}>
//               {subject.name} ({subject.credits} credits)
//             </Text>
//           </View>
//           <Text style={styles.cardSemester}>{semester}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by teacher name, department, or semester"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />
//       <FlatList
//         data={filteredAssignments.length > 0 ? filteredAssignments : assignments}
//         renderItem={renderAssignment}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 8,
//     marginBottom: 16,
//   },
//   assignmentCard: {
//     marginBottom: 16,
//   },
//   cardContainer: {
//     backgroundColor: "#f5f5f5",
//     padding: 16,
//     borderRadius: 4,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   cardSubjects: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   cardSubject: {
//     backgroundColor: "#ddd",
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 4,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   cardSubjectText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   cardSemester: {
//     fontSize: 14,
//     color: "#333",
//     marginTop: 8,
//   },
// });

// export default AdminAssignedView;
