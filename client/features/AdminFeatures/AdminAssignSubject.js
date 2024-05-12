import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
// import axios from "axios";

const AdminAssignSubject = () => {
  const [teacherName, setTeacherName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [remainingCredits, setRemainingCredits] = useState(12);
  const [assignments, setAssignments] = useState([]);
  const [editing, setEditing] = useState(false);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await axios.get(
//           "https://your-api-url/teachers"
//         );
//         setTeachers(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get(
//           "https://your-api-url/subjects"
//         );
//         setSubjects(response.data);
//       } catch (error) {
//         console.error(error);
//       }

//     fetchTeachers();
//     fetchSubjects();
//   }, []);

  useEffect(() => {
    if (selectedTeacher) {
      const teacherAssignments = teachers.find(
        (teacher) => teacher.id === selectedTeacher.id
      ).assignments;

      setAssignments(teacherAssignments);
    }
  }, [selectedTeacher]);

  useEffect(() => {
    const filteredTeachers = teachers.filter(
      (teacher) =>
        teacher.schoolName.includes(schoolName) &&
        teacher.departmentName.includes(departmentName)
    );

    setFilteredTeachers(filteredTeachers);
  }, [schoolName, departmentName]);

  useEffect(() => {
    const filteredSubjects = subjects.filter(
      (subject) =>
        subject.schoolName.includes(schoolName) &&
        subject.departmentName.includes(departmentName) &&
        subject.semester.includes(semester)
    );

    setFilteredSubjects(filteredSubjects);
  }, [schoolName, departmentName, semester]);

  const handleFilterTeachers = () => {
    const filteredTeachers = teachers.filter(
      (teacher) =>
        teacher.schoolName.includes(schoolName) &&
        teacher.departmentName.includes(departmentName)
    );

    setFilteredTeachers(filteredTeachers);
  };

  const handleFilterSubjects = () => {
    const filteredSubjects = subjects.filter(
      (subject) =>
        subject.schoolName.includes(schoolName) &&
        subject.departmentName.includes(departmentName) &&
        subject.semester.includes(semester)
    );

    setFilteredSubjects(filteredSubjects);
  };

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setRemainingCredits(teacher.maxCredits);
    setSelectedSubject(null);
  };

  const handleSelectSubject = (subject) => {
    if (remainingCredits - subject.credits >= 0) {
      setSelectedSubject(subject);
      setRemainingCredits(remainingCredits - subject.credits);
    } else {
      Alert.alert("Error", "Not enough credits remaining.");
    }
  };

 const handleAddSubject = () => {
    if (selectedTeacher && selectedSubject) {
      const newAssignment = {
        teacherId: selectedTeacher.id,
        subjectId: selectedSubject.id,
        semester: semester,
      };

      const updatedAssignments = [...assignments, newAssignment];

      setAssignments(updatedAssignments);

      const updatedTeacher = {
        ...selectedTeacher,
        assignments: updatedAssignments,
      };

      // axios.put(
      //   `https://your-api-url/teachers/${selectedTeacher.id}`,
      //   updatedTeacher
      // );

      setSelectedSubject(null);
      setRemainingCredits(remainingCredits + selectedSubject.credits);
      Alert.alert("Subject assigned successfully");
    } else {
      Alert.alert("Please select a teacher and subject");
    }
  };

  const handleAssign = () => {
    if (selectedTeacher) {
      Alert.alert("Subjects assigned successfully");
    } else {
      Alert.alert("Please select a teacher");
    }
  };

  const handleAssignNew = () => {
    setSelectedTeacher(null);
    setSelectedSubject(null);
    setRemainingCredits(12);
    setAssignments([]);
  };

  const handleSaveChanges = () => {
    if (assignments.length > 0) {
      const updatedTeacher = {
        ...selectedTeacher,
        assignments: assignments,
      };

      // axios.put(
      //   `https://your-api-url/teachers/${selectedTeacher.id}`,
      //   updatedTeacher
      // );

      Alert.alert("Changes saved successfully");
    } else {
      Alert.alert("Please assign at least one subject");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this teacher and their assigned subjects?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedTeachers = teachers.filter(
              (teacher) => teacher.id !== selectedTeacher.id
            );

            setTeachers(updatedTeachers);
            setSelectedTeacher(null);
            setAssignments([]);
            Alert.alert("Teacher and their assigned subjects deleted successfully");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Teacher Name"
          value={teacherName}
          onChangeText={setTeacherName}
        />
        <TouchableOpacity style={styles.button} onPress={handleFilterTeachers}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleFilterSubjects}>
          <Text style={styles.buttonText}>Subject</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.assignmentContainer}>
        <View style={styles.teacherContainer}>
          <Text style={styles.label}>Teacher:</Text>
          <ScrollView>
            {filteredTeachers.map((teacher) => (
              <TouchableOpacity
                key={teacher.id}
                style={styles.teacherButton}
                onPress={() => handleSelectTeacher(teacher)}
              >
                <Text style={styles.teacherText}>{teacher.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.subjectContainer}>
          <Text style={styles.label}>Subject:</Text>
          <ScrollView>
            {filteredSubjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={styles.subjectButton}
                onPress={() => handleSelectSubject(subject)}
              >
                <Text style={styles.subjectText}>
                  {subject.name} ({subject.credits} credits)
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.creditContainer}>
          <Text style={styles.label}>Remaining Credits:</Text>
          <Text style={styles.creditText}>{remainingCredits}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddSubject}>
          <Text style={styles.buttonText}>Add Subject</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.assignmentCard}>
        {selectedTeacher && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{selectedTeacher.name}</Text>
            <View style={styles.cardSubjects}>
              {assignments.map((assignment) => (
                <View key={assignment.subjectId} style={styles.cardSubject}>
                  <Text style={styles.cardSubjectText}>
                    {assignment.subjectId} ({assignment.semester})
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {editing ? (
          <>
            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleAssignNew}>
            <Text style={styles.buttonText}>Assign New</Text>
          </TouchableOpacity>
        )}
        {editing ? (
          <TouchableOpacity style={styles.button} onPress={() => setEditing(false)}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleAssign}>
            <Text style={styles.buttonText}>Assign</Text>
          </TouchableOpacity>
        )}
      </View>
      {editing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setEditing(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {assignments.length > 0 && !editing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
            <Text style={styles.buttonText}>Change</Text>
          </TouchableOpacity>
        </View>
      )}
      {!editing && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  input: {
    width: "40%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  assignmentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  teacherContainer: {
    flex: 1,
    marginRight: 16,
  },
  subjectContainer: {
    flex: 1,
  },
  teacherButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  teacherText: {
    fontSize: 16,
    color: "#333",
  },
  subjectButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  subjectText: {
    fontSize: 16,
    color: "#333",
  },
  creditContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  creditText: {
    fontSize: 16,
    color: "#333",
  },
  assignmentCard: {
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardSubjects: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardSubject: {
    backgroundColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  cardSubjectText: {
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AdminAssignSubject;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import axios from "axios";

// const AdminAssignSubject = () => {
//   const [teacherName, setTeacherName] = useState("");
//   const [schoolName, setSchoolName] = useState("");
//   const [departmentName, setDepartmentName] = useState("");
//   const [semester, setSemester] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [filteredSubjects, setFilteredSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [remainingCredits, setRemainingCredits] = useState(12);

// //   useEffect(() => {
// //     const fetchTeachers = async () => {
// //       try {
// //         const response = await axios.get(
// //           "https://your-api-url/teachers"
// //         );
// //         setTeachers(response.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     const fetchSubjects = async () => {
// //       try {
// //         const response = await axios.get(
// //           "https://your-api-url/subjects"
// //         );
// //         setSubjects(response.data);
// //       } catch (error) {
// //         console.error(error);
// //       }

// //     fetchTeachers();
// //     fetchSubjects();
// //   }, []);

//   const handleFilterTeachers = () => {
//     const filteredTeachers = teachers.filter(
//       (teacher) =>
//         teacher.schoolName.includes(schoolName) &&
//         teacher.departmentName.includes(departmentName)
//     );

//     setFilteredTeachers(filteredTeachers);
//   };

//   const handleFilterSubjects = () => {
//     const filteredSubjects = subjects.filter(
//       (subject) =>
//         subject.schoolName.includes(schoolName) &&
//         subject.departmentName.includes(departmentName) &&
//         subject.semester.includes(semester)
//     );

//     setFilteredSubjects(filteredSubjects);
//   };

//   const handleSelectTeacher = (teacher) => {
//     setSelectedTeacher(teacher);
//     setRemainingCredits(teacher.maxCredits);
//     setSelectedSubject(null);
//   };

//   const handleSelectSubject = (subject) => {
//     setSelectedSubject(subject);
//     setRemainingCredits(remainingCredits - subject.credits);
//   };

//   const handleAddSubject = () => {
//     if (selectedTeacher && selectedSubject) {
//       const newAssignment = {
//         teacherId: selectedTeacher.id,
//         subjectId: selectedSubject.id,
//         semester: semester,
//       };

//       const updatedTeacher = teachers.find(
//         (teacher) => teacher.id === selectedTeacher.id
//       );

//       if (updatedTeacher.assignments) {
//         updatedTeacher.assignments.push(newAssignment);
//       } else {
//         updatedTeacher.assignments = [newAssignment];
//       }

//       axios.put(`https://your-api-url/teachers/${updatedTeacher.id}`, updatedTeacher);

//       setSelectedSubject(null);
//       setRemainingCredits(remainingCredits + selectedSubject.credits);
//       Alert.alert("Subject assigned successfully");
//     } else {
//       Alert.alert("Please select a teacher and subject");
//     }
//   };

//   const handleAssign = () => {
//     if (selectedTeacher) {
//       Alert.alert("Subjects assigned successfully");
//     } else {
//       Alert.alert("Please select a teacher");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Teacher Name"
//           value={teacherName}
//           onChangeText={setTeacherName}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleFilterTeachers}>
//           <Text style={styles.buttonText}>Filter</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={handleFilterSubjects}>
//           <Text style={styles.buttonText}>Subject</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.assignmentContainer}>
//         <View style={styles.teacherContainer}>
//           <Text style={styles.label}>Teacher:</Text>
//           <ScrollView>
//             {filteredTeachers.map((teacher) => (
//               <TouchableOpacity
//                 key={teacher.id}
//                 style={styles.teacherButton}
//                 onPress={() => handleSelectTeacher(teacher)}
//               >
//                 <Text style={styles.teacherText}>{teacher.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//         <View style={styles.subjectContainer}>
//           <Text style={styles.label}>Subject:</Text>
//           <ScrollView>
//             {filteredSubjects.map((subject) => (
//               <TouchableOpacity
//                 key={subject.id}
//                 style={styles.subjectButton}
//                 onPress={() => handleSelectSubject(subject)}
//               >
//                 <Text style={styles.subjectText}>
//                   {subject.name} ({subject.credits} credits)
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//         <View style={styles.creditContainer}>
//           <Text style={styles.label}>Remaining Credits:</Text>
//           <Text style={styles.creditText}>{remainingCredits}</Text>
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleAddSubject}>
//           <Text style={styles.buttonText}>Add Subject</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.assignmentCard}>
//         {selectedTeacher && (
//           <View style={styles.cardContainer}>
//             <Text style={styles.cardTitle}>{selectedTeacher.name}</Text>
//             <View style={styles.cardSubjects}>
//               {selectedTeacher.assignments &&
//                 selectedTeacher.assignments.map((assignment) => (
//                   <View key={assignment.subjectId} style={styles.cardSubject}>
//                     <Text style={styles.cardSubjectText}>
//                       {assignment.subjectId} ({assignment.semester})
//                     </Text>
//                   </View>
//                 ))}
//             </View>
//           </View>
//         )}
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAssign}>
//           <Text style={styles.buttonText}>Assign</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Assign New</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Change</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 16,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   input: {
//     width: "40%",
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
// paddingHorizontal: 8,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     marginLeft: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   assignmentContainer: {
//     flex: 1,
//     marginBottom: 16,
//   },
//   teacherContainer: {
//     flex: 1,
//     marginRight: 16,
//   },
//   subjectContainer: {
//     flex: 1,
//   },
//   teacherButton: {
//     backgroundColor: "#f5f5f5",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   teacherText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   subjectButton: {
//     backgroundColor: "#f5f5f5",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   subjectText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   creditContainer: {
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   creditText: {
//     fontSize: 16,
//     color: "#333",
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
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });

// export default AdminAssignSubject;

