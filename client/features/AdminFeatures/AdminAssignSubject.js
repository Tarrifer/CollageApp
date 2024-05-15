import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import teacherData from "../../database/Batch.json";
import subjectData from "../../database/Departments.json";

const AdminAssignSubject = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [teachersForSelectedSchool, setTeachersForSelectedSchool] = useState(
    []
  );
  const [isTeacherPickerEnabled, setIsTeacherPickerEnabled] = useState(false);

  const assignSubject = () => {
    if (
      !selectedTeacher ||
      !selectedSchool ||
      !selectedSemester ||
      !selectedDepartment ||
      !selectedSubject
    ) {
      Alert.alert("Please select all details.");
      return;
    }
    const subjectCredit = selectedSubject.SubjectCredit || 0;
    const creditStatus = selectedTeacherCreditStatus() || 0;
    const totalCredit = subjectCredit + creditStatus;

    if (totalCredit > 12) {
      Alert.alert(
        "Subject cannot be assigned.",
        "The teacher's credit threshold has been reached."
      );
      return;
    }
    const selectedData = {
      selectedTeacher,
      selectedSchool,
      selectedSemester,
      selectedDepartment,
      selectedSubject,
      dateTime: new Date().toISOString(),
    };
    console.log(JSON.stringify(selectedData));
    // Code to assign subject goes here (to be implemented)

    // Show alert saying subject is assigned
    Alert.alert(`Subject ${selectedSubject.SubjectName} is assigned.`);

    // Reset dropdowns
    resetSelections();
  };

  const resetSelections = () => {
    setSelectedTeacher(null);
    setSelectedSchool(null);
    setSelectedSemester(null);
    setSelectedDepartment(null);
    setSelectedSubject(null);
    setTeachersForSelectedSchool([]);
    setIsTeacherPickerEnabled(false);
  };

  const handleSchoolChange = (schoolName) => {
    setSelectedSchool(schoolName);
    const selectedSchoolTeachers =
      teacherData.find((school) => school.SchoolName === schoolName)
        ?.Teachers || [];
    setTeachersForSelectedSchool(selectedSchoolTeachers);
    setSelectedTeacher(null);
    setIsTeacherPickerEnabled(true);
  };

  const handleTeacherChange = (teacherValue) => {
    if (!selectedSchool) {
      Alert.alert("Please select School first.");
      return;
    }
    setSelectedTeacher(teacherValue);
  };

  const handleDepartmentChange = (departmentValue) => {
    if (!selectedSchool) {
      Alert.alert("Please select School first.");
      return;
    }
    setSelectedDepartment(departmentValue);
  };

  const handleSemesterChange = (semesterValue) => {
    if (!selectedDepartment) {
      Alert.alert("Please select Department first.");
      return;
    }
    setSelectedSemester(semesterValue);
  };

  const handleSubjectChange = (subjectValue) => {
    if (!selectedSemester) {
      Alert.alert("Please select Semester first.");
      return;
    }
    setSelectedSubject(subjectValue);
  };

  const filterSubjectsByDepartment = () => {
    if (!selectedDepartment) return [];
    const department = subjectData.find(
      (dept) => dept.DepartmentName === selectedDepartment
    );
    const semesterSubjects =
      department && department.Semesters[selectedSemester];
    return semesterSubjects || [];
  };

  const selectedTeacherCreditStatus = () => {
    if (selectedTeacher) {
      const teacher = teachersForSelectedSchool.find(
        (t) => t.RegistrationNumber === selectedTeacher
      );
      return teacher ? teacher.CreditStatus : null;
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headertext}>
        Please select according to number order
      </Text>
      <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>1. Select School:</Text>
          <ScrollView style={styles.scrollContainer}>
            <Picker
              selectedValue={selectedSchool}
              onValueChange={handleSchoolChange}
            >
              <Picker.Item label="Select School" value={null} />
              {teacherData.map((school, index) => (
                <Picker.Item
                  key={index}
                  label={school.SchoolName}
                  value={school.SchoolName}
                />
              ))}
            </Picker>
          </ScrollView>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsTeacherPickerEnabled(false)}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>2. Select Teacher:</Text>
          <ScrollView style={styles.scrollContainer}>
            <Picker
              selectedValue={selectedTeacher}
              enabled={isTeacherPickerEnabled}
              onValueChange={handleTeacherChange}
            >
              <Picker.Item label="Select Teacher" value={null} />
              {teachersForSelectedSchool.map((teacher, index) => (
                <Picker.Item
                  key={index}
                  label={teacher.TeacherName}
                  value={teacher.RegistrationNumber}
                />
              ))}
            </Picker>
          </ScrollView>
        </View>
      </TouchableOpacity>

      <Text style={styles.creditStatus}>
        Credit Status: {selectedTeacherCreditStatus() || ""}
      </Text>

      <View style={styles.hrLine} />

      <TouchableOpacity onPress={() => setSelectedDepartment(null)}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>1. Select Department:</Text>
          <ScrollView style={styles.scrollContainer}>
            <Picker
              selectedValue={selectedDepartment}
              onValueChange={handleDepartmentChange}
            >
              <Picker.Item label="Select Department" value={null} />
              {subjectData.map((subject, index) => (
                <Picker.Item
                  key={index}
                  label={subject.DepartmentName}
                  value={subject.DepartmentName}
                />
              ))}
            </Picker>
          </ScrollView>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedSemester(null)}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>2. Select Semester:</Text>
          <ScrollView style={styles.scrollContainer}>
            <Picker
              enabled={!!selectedDepartment}
              selectedValue={selectedSemester}
              onValueChange={handleSemesterChange}
            >
              <Picker.Item label="Select Semester" value={null} />
              {selectedDepartment &&
                subjectData.find(
                  (dept) => dept.DepartmentName === selectedDepartment
                )?.Semesters &&
                Object.keys(
                  subjectData.find(
                    (dept) => dept.DepartmentName === selectedDepartment
                  ).Semesters
                ).map((semester, index) => (
                  <Picker.Item key={index} label={semester} value={semester} />
                ))}
            </Picker>
          </ScrollView>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelectedSubject(null)}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>3. Select Subject:</Text>
          <ScrollView style={styles.scrollContainer}>
            <Picker
              enabled={!!selectedSemester}
              selectedValue={selectedSubject}
              onValueChange={handleSubjectChange}
            >
              <Picker.Item label="Select Subject (Subject code)" value={null} />
              {filterSubjectsByDepartment().map((subject, index) => (
                <Picker.Item
                  key={index}
                  label={`${subject.SubjectName} (${subject.SubjectCode})`}
                  value={subject}
                />
              ))}
            </Picker>
          </ScrollView>
        </View>
      </TouchableOpacity>
      <Text style={styles.subjectCredit}>
        Subject Credit: {selectedSubject ? selectedSubject.SubjectCredit : null}
      </Text>

      <Button title="Assign" onPress={assignSubject} />
    </ScrollView>
  );
};

export default AdminAssignSubject;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  headertext: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  scrollContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  hrLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  creditStatus: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subjectCredit: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
//-------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import teacherData from "../../database/Batch.json";
// import subjectData from "../../database/Departments.json";

// const AdminAssignSubject = ({ route }) => {
//   const { assignment, teachers, departments, semesters, subjects } =
//     route.params || {};

//   const [selectedTeacher, setSelectedTeacher] = useState(
//     assignment ? assignment.selectedTeacher : null
//   );
//   const [selectedSchool, setSelectedSchool] = useState(
//     assignment ? assignment.selectedSchool : null
//   );
//   const [selectedSemester, setSelectedSemester] = useState(
//     assignment ? assignment.selectedSemester : null
//   );
//   const [selectedDepartment, setSelectedDepartment] = useState(
//     assignment ? assignment.selectedDepartment : null
//   );
//   const [selectedSubject, setSelectedSubject] = useState(
//     assignment ? assignment.selectedSubject : null
//   );

//   const [isTeacherPickerEnabled, setIsTeacherPickerEnabled] = useState(true);

//   const teachersForSelectedSchool = teachers
//     ? teachers.filter((teacher) => teacher.SchoolName === selectedSchool)
//     : [];

//   useEffect(() => {
//     setIsTeacherPickerEnabled(true);
//   }, []);

//   const assignSubject = () => {
//     if (
//       !selectedTeacher ||
//       !selectedSchool ||
//       !selectedSemester ||
//       !selectedDepartment ||
//       !selectedSubject
//     ) {
//       Alert.alert("Please select all details.");
//       return;
//     }
//     const subjectCredit = selectedSubject.SubjectCredit || 0;
//     const creditStatus = selectedTeacherCreditStatus() || 0;
//     const totalCredit = subjectCredit + creditStatus;

//     if (totalCredit > 12) {
//       Alert.alert(
//         "Subject cannot be assigned.",
//         "The teacher's credit threshold has been reached."
//       );
//       return;
//     }
//     const selectedData = {
//       selectedTeacher,
//       selectedSchool,
//       selectedSemester,
//       selectedDepartment,
//       selectedSubject,
//       dateTime: new Date().toISOString(),
//     };
//     console.log(JSON.stringify(selectedData));
//     // Code to assign subject goes here (to be implemented)

//     // Show alert saying subject is assigned
//     Alert.alert(`Subject ${selectedSubject.SubjectName} is assigned.`);

//     // Reset dropdowns
//     resetSelections();
//   };

//   const resetSelections = () => {
//     setSelectedTeacher(null);
//     setSelectedSchool(null);
//     setSelectedSemester(null);
//     setSelectedDepartment(null);
//     setSelectedSubject(null);
//     setIsTeacherPickerEnabled(false);
//   };

//   const handleSchoolChange = (schoolName) => {
//     setSelectedSchool(schoolName);
//     const selectedSchoolTeachers =
//       teacherData.find((school) => school.SchoolName === schoolName)
//         ?.Teachers || [];
//     setTeachersForSelectedSchool(selectedSchoolTeachers);
//     setSelectedTeacher(null);
//     setIsTeacherPickerEnabled(true);
//   };

//   const handleTeacherChange = (teacherValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedTeacher(teacherValue);
//   };

//   const handleDepartmentChange = (departmentValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedDepartment(departmentValue);
//   };

//   const handleSemesterChange = (semesterValue) => {
//     if (!selectedDepartment) {
//       Alert.alert("Please select Department first.");
//       return;
//     }
//     setSelectedSemester(semesterValue);
//   };

//   const handleSubjectChange = (subjectValue) => {
//     if (!selectedSemester) {
//       Alert.alert("Please select Semester first.");
//       return;
//     }
//     setSelectedSubject(subjectValue);
//   };

//   const filterSubjectsByDepartment = () => {
//     if (!selectedDepartment) return [];
//     const department = subjectData.find(
//       (dept) => dept.DepartmentName === selectedDepartment
//     );
//     const semesterSubjects =
//       department && department.Semesters[selectedSemester];
//     return semesterSubjects || [];
//   };

//   const selectedTeacherCreditStatus = () => {
//     if (selectedTeacher) {
//       const teacher = teachersForSelectedSchool.find(
//         (t) => t.RegistrationNumber === selectedTeacher
//       );
//       return teacher ? teacher.CreditStatus : null;
//     }
//     return null;
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.headertext}>
//         Please select according to number order
//       </Text>
//       <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select School:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSchool}
//               onValueChange={handleSchoolChange}
//             >
//               <Picker.Item label="Select School" value={null} />
//               {teacherData.map((school, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={school.SchoolName}
//                   value={school.SchoolName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setIsTeacherPickerEnabled(false)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Teacher:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedTeacher}
//               enabled={isTeacherPickerEnabled}
//               onValueChange={handleTeacherChange}
//             >
//               <Picker.Item label="Select Teacher" value={null} />
//               {teachersForSelectedSchool.map((teacher, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={teacher.TeacherName}
//                   value={teacher.RegistrationNumber}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <Text style={styles.creditStatus}>
//         Credit Status: {selectedTeacherCreditStatus() || ""}
//       </Text>

//       <View style={styles.hrLine} />

//       <TouchableOpacity onPress={() => setSelectedDepartment(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select Department:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedDepartment}
//               onValueChange={handleDepartmentChange}
//             >
//               <Picker.Item label="Select Department" value={null} />
//               {subjectData.map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={subject.DepartmentName}
//                   value={subject.DepartmentName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setSelectedSemester(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Semester:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedDepartment}
//               selectedValue={selectedSemester}
//               onValueChange={handleSemesterChange}
//             >
//               <Picker.Item label="Select Semester" value={null} />
//               {selectedDepartment &&
//                 subjectData.find(
//                   (dept) => dept.DepartmentName === selectedDepartment
//                 )?.Semesters &&
//                 Object.keys(
//                   subjectData.find(
//                     (dept) => dept.DepartmentName === selectedDepartment
//                   ).Semesters
//                 ).map((semester, index) => (
//                   <Picker.Item key={index} label={semester} value={semester} />
//                 ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedSubject(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>3. Select Subject:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedSemester}
//               selectedValue={selectedSubject}
//               onValueChange={handleSubjectChange}
//             >
//               <Picker.Item label="Select Subject (Subject code)" value={null} />
//               {filterSubjectsByDepartment().map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={`${subject.SubjectName} (${subject.SubjectCode})`}
//                   value={subject}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.subjectCredit}>
//         Subject Credit: {selectedSubject ? selectedSubject.SubjectCredit : null}
//       </Text>

//       <Button title="Assign" onPress={assignSubject} />
//     </ScrollView>
//   );
// };

// export default AdminAssignSubject;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   headertext: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   scrollContainer: {
//     maxHeight: 200,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   hrLine: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginBottom: 20,
//   },
//   creditStatus: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   subjectCredit: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
// });

//------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import teacherData from "../../database/Batch.json";
// import subjectData from "../../database/Departments.json";

// const AdminAssignSubject = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedSemester, setSelectedSemester] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [teachersForSelectedSchool, setTeachersForSelectedSchool] = useState(
//     []
//   );
//   const [isTeacherPickerEnabled, setIsTeacherPickerEnabled] = useState(false);

//   useEffect(() => {
//     if (route.params?.assignment) {
//       const {
//         selectedTeacher,
//         selectedSchool,
//         selectedSemester,
//         selectedDepartment,
//         selectedSubject,
//       } = route.params.assignment;
//       setSelectedTeacher(selectedTeacher);
//       setSelectedSchool(selectedSchool);
//       setSelectedSemester(selectedSemester);
//       setSelectedDepartment(selectedDepartment);
//       setSelectedSubject(selectedSubject);
//       // } else {
//       //   // Handle the case when assignment data is not passed
//       //   // For example, you may want to initialize the state with default values
//       //   resetSelections();
//     }
//   }, [route.params?.assignment]);

//   const assignSubject = () => {
//     if (
//       !selectedTeacher ||
//       !selectedSchool ||
//       !selectedSemester ||
//       !selectedDepartment ||
//       !selectedSubject
//     ) {
//       Alert.alert("Please select all details.");
//       return;
//     }
//     const subjectCredit = selectedSubject.SubjectCredit || 0;
//     const creditStatus = selectedTeacherCreditStatus() || 0;
//     const totalCredit = subjectCredit + creditStatus;

//     if (totalCredit > 12) {
//       Alert.alert(
//         "Subject cannot be assigned.",
//         "The teacher's credit threshold has been reached."
//       );
//       return;
//     }
//     const selectedData = {
//       selectedTeacher,
//       selectedSchool,
//       selectedSemester,
//       selectedDepartment,
//       selectedSubject,
//       dateTime: new Date().toISOString(),
//     };
//     console.log(JSON.stringify(selectedData));
//     // Code to assign subject goes here (to be implemented)

//     // Show alert saying subject is assigned
//     Alert.alert(`Subject ${selectedSubject.SubjectName} is assigned.`);

//     // Reset dropdowns
//     resetSelections();
//   };

//   const resetSelections = () => {
//     setSelectedTeacher(null);
//     setSelectedSchool(null);
//     setSelectedSemester(null);
//     setSelectedDepartment(null);
//     setSelectedSubject(null);
//     setTeachersForSelectedSchool([]);
//     setIsTeacherPickerEnabled(false);
//   };

//   const handleSchoolChange = (schoolName) => {
//     setSelectedSchool(schoolName);
//     const selectedSchoolTeachers =
//       teacherData.find((school) => school.SchoolName === schoolName)
//         ?.Teachers || [];
//     setTeachersForSelectedSchool(selectedSchoolTeachers);
//     setSelectedTeacher(null);
//     setIsTeacherPickerEnabled(true);
//   };

//   const handleTeacherChange = (teacherValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedTeacher(teacherValue);
//   };

//   const handleDepartmentChange = (departmentValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedDepartment(departmentValue);
//   };

//   const handleSemesterChange = (semesterValue) => {
//     if (!selectedDepartment) {
//       Alert.alert("Please select Department first.");
//       return;
//     }
//     setSelectedSemester(semesterValue);
//   };

//   const handleSubjectChange = (subjectValue) => {
//     if (!selectedSemester) {
//       Alert.alert("Please select Semester first.");
//       return;
//     }
//     setSelectedSubject(subjectValue);
//   };

//   const filterSubjectsByDepartment = () => {
//     if (!selectedDepartment) return [];
//     const department = subjectData.find(
//       (dept) => dept.DepartmentName === selectedDepartment
//     );
//     const semesterSubjects =
//       department && department.Semesters[selectedSemester];
//     return semesterSubjects || [];
//   };

//   const selectedTeacherCreditStatus = () => {
//     if (selectedTeacher) {
//       const teacher = teachersForSelectedSchool.find(
//         (t) => t.RegistrationNumber === selectedTeacher
//       );
//       return teacher ? teacher.CreditStatus : null;
//     }
//     return null;
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.headertext}>
//         Please select according to number order
//       </Text>
//       <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select School:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSchool}
//               onValueChange={handleSchoolChange}
//             >
//               <Picker.Item label="Select School" value={null} />
//               {teacherData.map((school, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={school.SchoolName}
//                   value={school.SchoolName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setIsTeacherPickerEnabled(false)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Teacher:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedTeacher}
//               enabled={isTeacherPickerEnabled}
//               onValueChange={handleTeacherChange}
//             >
//               <Picker.Item label="Select Teacher" value={null} />
//               {teachersForSelectedSchool.map((teacher, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={teacher.TeacherName}
//                   value={teacher.RegistrationNumber}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <Text style={styles.creditStatus}>
//         Credit Status: {selectedTeacherCreditStatus() || ""}
//       </Text>

//       <View style={styles.hrLine} />

//       <TouchableOpacity onPress={() => setSelectedDepartment(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select Department:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedDepartment}
//               onValueChange={handleDepartmentChange}
//             >
//               <Picker.Item label="Select Department" value={null} />
//               {subjectData.map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={subject.DepartmentName}
//                   value={subject.DepartmentName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setSelectedSemester(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Semester:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedDepartment}
//               selectedValue={selectedSemester}
//               onValueChange={handleSemesterChange}
//             >
//               <Picker.Item label="Select Semester" value={null} />
//               {selectedDepartment &&
//                 subjectData.find(
//                   (dept) => dept.DepartmentName === selectedDepartment
//                 )?.Semesters &&
//                 Object.keys(
//                   subjectData.find(
//                     (dept) => dept.DepartmentName === selectedDepartment
//                   ).Semesters
//                 ).map((semester, index) => (
//                   <Picker.Item key={index} label={semester} value={semester} />
//                 ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedSubject(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>3. Select Subject:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedSemester}
//               selectedValue={selectedSubject}
//               onValueChange={handleSubjectChange}
//             >
//               <Picker.Item label="Select Subject (Subject code)" value={null} />
//               {filterSubjectsByDepartment().map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={`${subject.SubjectName} (${subject.SubjectCode})`}
//                   value={subject}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.subjectCredit}>
//         Subject Credit: {selectedSubject ? selectedSubject.SubjectCredit : null}
//       </Text>

//       <Button title="Assign" onPress={assignSubject} />
//     </ScrollView>
//   );
// };

// export default AdminAssignSubject;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   headertext: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   scrollContainer: {
//     maxHeight: 200,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   hrLine: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginBottom: 20,
//   },
//   creditStatus: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   subjectCredit: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
// });
//---------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import teacherData from "../../database/Batch.json";
// import subjectData from "../../database/Departments.json";

// const AdminAssignSubject = () => {
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedSemester, setSelectedSemester] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [teachersForSelectedSchool, setTeachersForSelectedSchool] = useState(
//     []
//   );
//   const [isTeacherPickerEnabled, setIsTeacherPickerEnabled] = useState(false);

//   const assignSubject = () => {
//     if (
//       !selectedTeacher ||
//       !selectedSchool ||
//       !selectedSemester ||
//       !selectedDepartment ||
//       !selectedSubject
//     ) {
//       Alert.alert("Please select all details.");
//       return;
//     }
//     const subjectCredit = selectedSubject.SubjectCredit || 0;
//     const creditStatus = selectedTeacherCreditStatus() || 0;
//     const totalCredit = subjectCredit + creditStatus;

//     if (totalCredit > 12) {
//       Alert.alert(
//         "Subject cannot be assigned.",
//         "The teacher's credit threshold has been reached."
//       );
//       return;
//     }
//     const selectedData = {
//       selectedTeacher,
//       selectedSchool,
//       selectedSemester,
//       selectedDepartment,
//       selectedSubject,
//       dateTime: new Date().toISOString(),
//     };
//     console.log(JSON.stringify(selectedData));
//     // Code to assign subject goes here (to be implemented)

//     // Show alert saying subject is assigned
//     Alert.alert(`Subject ${selectedSubject.SubjectName} is assigned.`);

//     // Reset dropdowns
//     resetSelections();
//   };

//   const resetSelections = () => {
//     setSelectedTeacher(null);
//     setSelectedSchool(null);
//     setSelectedSemester(null);
//     setSelectedDepartment(null);
//     setSelectedSubject(null);
//     setTeachersForSelectedSchool([]);
//     setIsTeacherPickerEnabled(false);
//   };

//   const handleSchoolChange = (schoolName) => {
//     setSelectedSchool(schoolName);
//     const selectedSchoolTeachers =
//       teacherData.find((school) => school.SchoolName === schoolName)
//         ?.Teachers || [];
//     setTeachersForSelectedSchool(selectedSchoolTeachers);
//     setSelectedTeacher(null);
//     setIsTeacherPickerEnabled(true);
//   };

//   const handleTeacherChange = (teacherValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedTeacher(teacherValue);
//   };

//   const handleDepartmentChange = (departmentValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedDepartment(departmentValue);
//   };

//   const handleSemesterChange = (semesterValue) => {
//     if (!selectedDepartment) {
//       Alert.alert("Please select Department first.");
//       return;
//     }
//     setSelectedSemester(semesterValue);
//   };

//   const handleSubjectChange = (subjectValue) => {
//     if (!selectedSemester) {
//       Alert.alert("Please select Semester first.");
//       return;
//     }
//     setSelectedSubject(subjectValue);
//   };

//   const filterSubjectsByDepartment = () => {
//     if (!selectedDepartment) return [];
//     const department = subjectData.find(
//       (dept) => dept.DepartmentName === selectedDepartment
//     );
//     const semesterSubjects =
//       department && department.Semesters[selectedSemester];
//     return semesterSubjects || [];
//   };

//   const selectedTeacherCreditStatus = () => {
//     if (selectedTeacher) {
//       const teacher = teachersForSelectedSchool.find(
//         (t) => t.RegistrationNumber === selectedTeacher
//       );
//       return teacher ? teacher.CreditStatus : null;
//     }
//     return null;
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.headertext}>
//         Please select according to number order
//       </Text>
//       <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select School:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSchool}
//               onValueChange={handleSchoolChange}
//             >
//               <Picker.Item label="Select School" value={null} />
//               {teacherData.map((school, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={school.SchoolName}
//                   value={school.SchoolName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setIsTeacherPickerEnabled(false)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Teacher:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedTeacher}
//               enabled={isTeacherPickerEnabled}
//               onValueChange={handleTeacherChange}
//             >
//               <Picker.Item label="Select Teacher" value={null} />
//               {teachersForSelectedSchool.map((teacher, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={teacher.TeacherName}
//                   value={teacher.RegistrationNumber}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <Text style={styles.creditStatus}>
//         Credit Status: {selectedTeacherCreditStatus() || ""}
//       </Text>

//       <View style={styles.hrLine} />

//       <TouchableOpacity onPress={() => setSelectedDepartment(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select Department:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedDepartment}
//               onValueChange={handleDepartmentChange}
//             >
//               <Picker.Item label="Select Department" value={null} />
//               {subjectData.map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={subject.DepartmentName}
//                   value={subject.DepartmentName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setSelectedSemester(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Semester:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedDepartment}
//               selectedValue={selectedSemester}
//               onValueChange={handleSemesterChange}
//             >
//               <Picker.Item label="Select Semester" value={null} />
//               {selectedDepartment &&
//                 subjectData.find(
//                   (dept) => dept.DepartmentName === selectedDepartment
//                 )?.Semesters &&
//                 Object.keys(
//                   subjectData.find(
//                     (dept) => dept.DepartmentName === selectedDepartment
//                   ).Semesters
//                 ).map((semester, index) => (
//                   <Picker.Item key={index} label={semester} value={semester} />
//                 ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedSubject(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>3. Select Subject:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedSemester}
//               selectedValue={selectedSubject}
//               onValueChange={handleSubjectChange}
//             >
//               <Picker.Item label="Select Subject (Subject code)" value={null} />
//               {filterSubjectsByDepartment().map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={`${subject.SubjectName} (${subject.SubjectCode})`}
//                   value={subject}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.subjectCredit}>
//         Subject Credit: {selectedSubject ? selectedSubject.SubjectCredit : null}
//       </Text>

//       <Button title="Assign" onPress={assignSubject} />
//     </ScrollView>
//   );
// };

// export default AdminAssignSubject;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   headertext: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   scrollContainer: {
//     maxHeight: 200,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   hrLine: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginBottom: 20,
//   },
//   creditStatus: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   subjectCredit: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
// });

//-----------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import teacherData from "../../database/Batch.json";
// import subjectData from "../../database/Departments.json";

// const AdminAssignSubject = () => {
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedSemester, setSelectedSemester] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [teachersForSelectedSchool, setTeachersForSelectedSchool] = useState(
//     []
//   );
//   const [isTeacherPickerEnabled, setIsTeacherPickerEnabled] = useState(false);

//   const assignSubject = () => {
//     if (
//       !selectedTeacher ||
//       !selectedSchool ||
//       !selectedSemester ||
//       !selectedDepartment ||
//       !selectedSubject
//     ) {
//       Alert.alert("Please select all details.");
//       return;
//     }

//     // Code to assign subject goes here (to be implemented)

//     // Show alert saying subject is assigned
//     Alert.alert(`Subject ${selectedSubject.SubjectName} is assigned.`);

//     // Reset dropdowns
//     resetSelections();
//   };

//   const resetSelections = () => {
//     setSelectedTeacher(null);
//     setSelectedSchool(null);
//     setSelectedSemester(null);
//     setSelectedDepartment(null);
//     setSelectedSubject(null);
//     setTeachersForSelectedSchool([]);
//     setIsTeacherPickerEnabled(false);
//   };

//   const handleSchoolChange = (schoolName) => {
//     setSelectedSchool(schoolName);
//     const selectedSchoolTeachers =
//       teacherData.find((school) => school.SchoolName === schoolName)
//         ?.Teachers || [];
//     setTeachersForSelectedSchool(selectedSchoolTeachers);
//     setSelectedTeacher(null);
//     setIsTeacherPickerEnabled(true);
//   };

//   const handleTeacherChange = (teacherValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedTeacher(teacherValue);
//   };

//   const handleDepartmentChange = (departmentValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedDepartment(departmentValue);
//   };

//   const handleSemesterChange = (semesterValue) => {
//     if (!selectedDepartment) {
//       Alert.alert("Please select Department first.");
//       return;
//     }
//     setSelectedSemester(semesterValue);
//   };

//   const handleSubjectChange = (subjectValue) => {
//     if (!selectedSemester) {
//       Alert.alert("Please select Semester first.");
//       return;
//     }
//     setSelectedSubject(subjectValue);
//   };

//   const filterSubjectsByDepartment = () => {
//     if (!selectedDepartment) return [];
//     const department = subjectData.find(
//       (dept) => dept.DepartmentName === selectedDepartment
//     );
//     const semesterSubjects =
//       department && department.Semesters[selectedSemester];
//     return semesterSubjects || [];
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headertext}>
//         Please select according to number order
//       </Text>
//       <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select School:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSchool}
//               onValueChange={handleSchoolChange}
//             >
//               <Picker.Item label="Select School" value={null} />
//               {teacherData.map((school, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={school.SchoolName}
//                   value={school.SchoolName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setIsTeacherPickerEnabled(false)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Teacher:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedTeacher}
//               enabled={isTeacherPickerEnabled}
//               onValueChange={handleTeacherChange}
//             >
//               <Picker.Item label="Select Teacher" value={null} />
//               {teachersForSelectedSchool.map((teacher, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={teacher.TeacherName}
//                   value={teacher.RegistrationNumber}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <View style={styles.hrLine} />

//       <TouchableOpacity onPress={() => setSelectedDepartment(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select Department:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedDepartment}
//               onValueChange={handleDepartmentChange}
//             >
//               <Picker.Item label="Select Department" value={null} />
//               {subjectData.map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={subject.DepartmentName}
//                   value={subject.DepartmentName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedSemester(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Semester:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedDepartment}
//               selectedValue={selectedSemester}
//               onValueChange={handleSemesterChange}
//             >
//               <Picker.Item label="Select Semester" value={null} />
//               {selectedDepartment &&
//                 subjectData.find(
//                   (dept) => dept.DepartmentName === selectedDepartment
//                 )?.Semesters &&
//                 Object.keys(
//                   subjectData.find(
//                     (dept) => dept.DepartmentName === selectedDepartment
//                   ).Semesters
//                 ).map((semester, index) => (
//                   <Picker.Item key={index} label={semester} value={semester} />
//                 ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedSubject(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>3. Select Subject:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               enabled={!!selectedSemester}
//               selectedValue={selectedSubject}
//               onValueChange={handleSubjectChange}
//             >
//               <Picker.Item label="Select Subject" value={null} />
//               {filterSubjectsByDepartment().map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={subject.SubjectName}
//                   value={subject}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <Button title="Assign" onPress={assignSubject} />
//     </View>
//   );
// };

// export default AdminAssignSubject;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   headertext: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   scrollContainer: {
//     maxHeight: 200,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   hrLine: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginBottom: 20,
//   },
// });
//-------------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import teacherData from "../../database/Batch.json";
// import subjectData from "../../database/Departments.json";

// const AdminAssignSubject = () => {
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedSemester, setSelectedSemester] = useState(null);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [teachersForSelectedSchool, setTeachersForSelectedSchool] = useState(
//     []
//   );

//   const assignSubject = () => {
//     if (
//       !selectedTeacher ||
//       !selectedSchool ||
//       !selectedSemester ||
//       !selectedDepartment ||
//       !selectedSubject
//     ) {
//       Alert.alert("Please select all details.");
//       return;
//     }
//     const subjectCredit = selectedSubject.SubjectCredit || 0;
//     const creditStatus = selectedTeacherCreditStatus() || 0;
//     const totalCredit = subjectCredit + creditStatus;

//     if (totalCredit > 12) {
//       Alert.alert(
//         "Subject cannot be assigned.",
//         "The teacher's credit threshold has been reached."
//       );
//       return;
//     }

//     // Code to assign subject goes here (to be implemented)

//     // Show alert saying subject is assigned
//     Alert.alert(`Subject ${selectedSubject.SubjectName} is assigned.`);

//     // Reset dropdowns
//     resetSelections();
//   };

//   const resetSelections = () => {
//     setSelectedTeacher(null);
//     setSelectedSchool(null);
//     setSelectedSemester(null);
//     setSelectedDepartment(null);
//     setSelectedSubject(null);
//     setTeachersForSelectedSchool([]);
//   };

//   const handleSchoolChange = (schoolName) => {
//     setSelectedSchool(schoolName);
//     const selectedSchoolTeachers =
//       teacherData.find((school) => school.SchoolName === schoolName)
//         ?.Teachers || [];
//     setTeachersForSelectedSchool(selectedSchoolTeachers);
//     setSelectedTeacher(null);
//   };

//   const handleTeacherChange = (teacherValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedTeacher(teacherValue);
//   };

//   const handleDepartmentChange = (departmentValue) => {
//     if (!selectedSchool) {
//       Alert.alert("Please select School first.");
//       return;
//     }
//     setSelectedDepartment(departmentValue);
//   };

//   const handleSemesterChange = (semesterValue) => {
//     if (!selectedDepartment) {
//       Alert.alert("Please select Department first.");
//       return;
//     }
//     setSelectedSemester(semesterValue);
//   };

//   const handleSubjectChange = (subjectValue) => {
//     if (!selectedSemester) {
//       Alert.alert("Please select Semester first.");
//       return;
//     }
//     setSelectedSubject(subjectValue);
//   };

//   const filterSubjectsByDepartment = () => {
//     if (!selectedDepartment) return [];
//     const department = subjectData.find(
//       (dept) => dept.DepartmentName === selectedDepartment
//     );
//     const semesterSubjects =
//       department && department.Semesters[selectedSemester];
//     return semesterSubjects || [];
//   };

//   const selectedTeacherCreditStatus = () => {
//     if (selectedTeacher) {
//       const teacher = teachersForSelectedSchool.find(
//         (t) => t.RegistrationNumber === selectedTeacher
//       );
//       return teacher ? teacher.CreditStatus : null;
//     }
//     return null;
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.headertext}>
//         Please select according to number order
//       </Text>
//       <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select School:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSchool}
//               onValueChange={handleSchoolChange}
//             >
//               <Picker.Item label="Select School" value={null} />
//               {teacherData.map((school, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={school.SchoolName}
//                   value={school.SchoolName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Teacher:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedTeacher}
//               onValueChange={handleTeacherChange}
//             >
//               <Picker.Item label="Select Teacher" value={null} />
//               {teachersForSelectedSchool.map((teacher, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={teacher.TeacherName}
//                   value={teacher.RegistrationNumber}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <Text style={styles.creditStatus}>
//         Credit Status: {selectedTeacherCreditStatus() || ""}
//       </Text>

//       <View style={styles.hrLine} />

//       <TouchableOpacity onPress={() => setSelectedDepartment(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>1. Select Department:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedDepartment}
//               onValueChange={handleDepartmentChange}
//             >
//               <Picker.Item label="Select Department" value={null} />
//               {subjectData.map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={subject.DepartmentName}
//                   value={subject.DepartmentName}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setSelectedSemester(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>2. Select Semester:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSemester}
//               onValueChange={handleSemesterChange}
//             >
//               <Picker.Item label="Select Semester" value={null} />
//               {selectedDepartment &&
//                 subjectData.find(
//                   (dept) => dept.DepartmentName === selectedDepartment
//                 )?.Semesters &&
//                 Object.keys(
//                   subjectData.find(
//                     (dept) => dept.DepartmentName === selectedDepartment
//                   ).Semesters
//                 ).map((semester, index) => (
//                   <Picker.Item key={index} label={semester} value={semester} />
//                 ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => setSelectedSubject(null)}>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>3. Select Subject:</Text>
//           <ScrollView style={styles.scrollContainer}>
//             <Picker
//               selectedValue={selectedSubject}
//               onValueChange={handleSubjectChange}
//             >
//               <Picker.Item label="Select Subject (Subject code)" value={null} />
//               {filterSubjectsByDepartment().map((subject, index) => (
//                 <Picker.Item
//                   key={index}
//                   label={`${subject.SubjectName} (${subject.SubjectCode})`}
//                   value={subject}
//                 />
//               ))}
//             </Picker>
//           </ScrollView>
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.subjectCredit}>
//         Subject Credit: {selectedSubject ? selectedSubject.SubjectCredit : null}
//       </Text>

//       <Button title="Assign" onPress={assignSubject} />
//     </ScrollView>
//   );
// };

// export default AdminAssignSubject;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     justifyContent: "center",
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   headertext: {
//     fontSize: 20,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   scrollContainer: {
//     maxHeight: 200,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   hrLine: {
//     borderBottomColor: "black",
//     borderBottomWidth: 1,
//     marginBottom: 20,
//   },
//   creditStatus: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
//   subjectCredit: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: "bold",
//   },
// });
