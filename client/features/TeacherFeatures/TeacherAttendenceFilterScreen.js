import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StudentAttendanceData from "../../database/StudentAttendance.json";

const TeacherAttendanceFilterScreen = ({ onFilter }) => {
  const [filterOptions, setFilterOptions] = useState({
    semesters: [],
    departments: [],
    subjects: [],
    studentNames: [],
  });
  const [selectedFilter, setSelectedFilter] = useState({
    semester: "",
    department: "",
    subject: "",
    studentName: "",
  });

  useEffect(() => {
    // Extract unique values from sample data
    const getUniqueValues = (key) => {
      const values = new Set();
      StudentAttendanceData.forEach((student) => {
        values.add(student[key]);
      });
      return Array.from(values);
    };

    // Set filter options
    setFilterOptions({
      semesters: getUniqueValues("semester"),
      departments: getUniqueValues("departmentName"),
      subjects: getUniqueValues("subjectName"),
      studentNames: getUniqueValues("studentName"),
    });
  }, []);

  const handleFilter = () => {
    if (
      onFilter &&
      Object.values(selectedFilter).some((value) => value !== "")
    ) {
      onFilter(selectedFilter);
    } else {
      console.error(
        "Either onFilter function is not defined or no filter is selected"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedFilter.semester}
        onValueChange={(itemValue) =>
          setSelectedFilter({ ...selectedFilter, semester: itemValue })
        }
      >
        <Picker.Item label="Select Semester" value="" />
        {filterOptions.semesters.map((semester, index) => (
          <Picker.Item key={index} label={semester} value={semester} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedFilter.department}
        onValueChange={(itemValue) =>
          setSelectedFilter({ ...selectedFilter, department: itemValue })
        }
      >
        <Picker.Item label="Select Department" value="" />
        {filterOptions.departments.map((department, index) => (
          <Picker.Item key={index} label={department} value={department} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedFilter.subject}
        onValueChange={(itemValue) =>
          setSelectedFilter({ ...selectedFilter, subject: itemValue })
        }
      >
        <Picker.Item label="Select Subject" value="" />
        {filterOptions.subjects.map((subject, index) => (
          <Picker.Item key={index} label={subject} value={subject} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedFilter.studentName}
        onValueChange={(itemValue) =>
          setSelectedFilter({ ...selectedFilter, studentName: itemValue })
        }
      >
        <Picker.Item label="Select Student" value="" />
        {filterOptions.studentNames.map((studentName, index) => (
          <Picker.Item key={index} label={studentName} value={studentName} />
        ))}
      </Picker>
      <Button title="Apply Filter" onPress={handleFilter} />
    </View>
  );
};

export default TeacherAttendanceFilterScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

// import React, { useState, useEffect } from "react";
// import { View, Button, StyleSheet } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import StudentAttendanceData from "../../database/StudentAttendance.json";

// const TeacherAttendanceFilterScreen = ({ onFilter }) => {
//   const [filterOptions, setFilterOptions] = useState({
//     semesters: [],
//     departments: [],
//     subjects: [],
//     studentNames: [],
//   });
//   const [selectedFilter, setSelectedFilter] = useState({
//     semester: "",
//     department: "",
//     subject: "",
//     studentName: "",
//   });

//   useEffect(() => {
//     // Extract unique values from sample data
//     const getUniqueValues = (key) => {
//       const values = new Set();
//       StudentAttendanceData.forEach((student) => {
//         values.add(student[key]);
//       });
//       return Array.from(values);
//     };

//     // Set filter options
//     setFilterOptions({
//       semesters: getUniqueValues("semester"),
//       departments: getUniqueValues("departmentName"),
//       subjects: getUniqueValues("subjectName"),
//       studentNames: getUniqueValues("studentName"),
//     });
//   }, []);

//   const handleFilter = () => {
//     if (
//       onFilter &&
//       Object.values(selectedFilter).some((value) => value !== "")
//     ) {
//       onFilter(selectedFilter);
//     } else {
//       console.error(
//         "Either onFilter function is not defined or no filter is selected"
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={selectedFilter.semester}
//         onValueChange={(itemValue) =>
//           setSelectedFilter({ ...selectedFilter, semester: itemValue })
//         }
//       >
//         <Picker.Item label="Select Semester" value="" />
//         {filterOptions.semesters.map((semester, index) => (
//           <Picker.Item key={index} label={semester} value={semester} />
//         ))}
//       </Picker>
//       <Picker
//         selectedValue={selectedFilter.department}
//         onValueChange={(itemValue) =>
//           setSelectedFilter({ ...selectedFilter, department: itemValue })
//         }
//       >
//         <Picker.Item label="Select Department" value="" />
//         {filterOptions.departments.map((department, index) => (
//           <Picker.Item key={index} label={department} value={department} />
//         ))}
//       </Picker>
//       <Picker
//         selectedValue={selectedFilter.subject}
//         onValueChange={(itemValue) =>
//           setSelectedFilter({ ...selectedFilter, subject: itemValue })
//         }
//       >
//         <Picker.Item label="Select Subject" value="" />
//         {filterOptions.subjects.map((subject, index) => (
//           <Picker.Item key={index} label={subject} value={subject} />
//         ))}
//       </Picker>
//       <Picker
//         selectedValue={selectedFilter.studentName}
//         onValueChange={(itemValue) =>
//           setSelectedFilter({ ...selectedFilter, studentName: itemValue })
//         }
//       >
//         <Picker.Item label="Select Student" value="" />
//         {filterOptions.studentNames.map((studentName, index) => (
//           <Picker.Item key={index} label={studentName} value={studentName} />
//         ))}
//       </Picker>
//       <Button title="Apply Filter" onPress={handleFilter} />
//     </View>
//   );
// };

// export default TeacherAttendanceFilterScreen;

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
// });
