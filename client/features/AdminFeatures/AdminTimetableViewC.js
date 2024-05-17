import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import times from "../../database/Time.json";
import { AntDesign } from "@expo/vector-icons";
import timetableData from "../../database/Timetable.json";
import assignedSubjects from "../../database/AssignedSubject.json";

const DayButton = ({ day, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.dayButton,
        { backgroundColor: selected ? "blue" : "grey" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.dayButtonText}>{day}</Text>
    </TouchableOpacity>
  );
};

const AdminTimetableView = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedSubjectType, setSelectedSubjectType] = useState("Null");
  const [selectedSubjectName, setSelectedSubjectName] = useState(
    "Choose SubjectType First"
  );
  const [dayEntriesVisibility, setDayEntriesVisibility] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [editIndex, setEditIndex] = useState(null);

  const subjectTypes = ["Null", "Changable", "Unchangable"];
  const [schools, setSchools] = useState([]);
  const [departmentsData, setDepartmentsData] = useState({});
  const [semesters, setSemesters] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);

  useEffect(() => {
    const schools = timetableData.map((item) => item.SchoolName);
    setSchools(schools);
  }, []);

  useEffect(() => {
    if (school && department) {
      const selectedSchool = timetableData.find(
        (item) => item.SchoolName === school
      );
      if (selectedSchool) {
        setSemesters(Object.keys(selectedSchool.Departments[department]));
      }
    }
  }, [school, department]);

  useEffect(() => {
    if (school) {
      const selectedSchool = timetableData.find(
        (item) => item.SchoolName === school
      );
      if (selectedSchool) {
        setDepartmentsData(selectedSchool.Departments);
      }
    }
  }, [school]);

  useEffect(() => {
    if (school && department && semester) {
      const selectedSchool = timetableData.find(
        (item) => item.SchoolName === school
      );
      if (selectedSchool) {
        const selectedSubjects =
          selectedSchool.Departments[department][semester];
        setSubjectNames(selectedSubjects);
      }
    }
  }, [school, department, semester]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const toggleDayEntriesVisibility = (day) => {
    setDayEntriesVisibility((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const isTimeSlotAvailable = (day, time) => {
    return !departments.some(
      (dept, index) =>
        dept.day === day && dept.time === time && index !== editIndex
    );
  };

  const getTeacherName = (subjectName) => {
    const assignment = assignedSubjects.find(
      (subject) =>
        subject.selectedSchool === school &&
        subject.selectedDepartment === department &&
        subject.selectedSemester === semester &&
        subject.selectedSubject.SubjectName === subjectName
    );
    return assignment ? assignment.selectedTeacher : "Null";
  };

  const createTimetable = () => {
    console.log("Creating timetable...");
  };

  const addDepartment = () => {
    if (!school || !department || !semester || selectedSubjectType === "Null") {
      Alert.alert(
        "Please select School Name, Department Name, Semester Number, and Subject Type to create entries."
      );
      return;
    }

    if (
      (selectedSubjectType === "Changable" ||
        selectedSubjectType === "Unchangable") &&
      selectedSubjectName === "Choose subject name"
    ) {
      Alert.alert("Please Choose a subject name");
      return;
    }

    let allTimeSlotsAvailable = true;

    selectedDays.forEach((day) => {
      if (!isTimeSlotAvailable(day, selectedTime)) {
        Alert.alert(
          `${day} is not vacant at ${selectedTime} to add this subject`
        );
        allTimeSlotsAvailable = false;
      }
    });

    if (allTimeSlotsAvailable) {
      const newEntries = selectedDays.map((day) => ({
        day,
        time: selectedTime,
        subjectType: selectedSubjectType,
        subjectName:
          selectedSubjectType === "Null" ? "Null" : selectedSubjectName,
        teacherName: getTeacherName(selectedSubjectName),
        editMode: false, // Initialize edit mode as false
      }));
      setDepartments([...departments, ...newEntries]);

      // Show success alert
      Alert.alert("Entries have been added");

      // Automatically open day entries
      selectedDays.forEach((day) => {
        setDayEntriesVisibility((prevState) => ({
          ...prevState,
          [day]: true,
        }));
      });

      // Reset state
      setSelectedDays([]);
      setSelectedSubjectType("Null");
      setSelectedSubjectName("Choose SubjectType First");
    }
  };

  const handleEdit = (index) => {
    const dept = departments[index];
    setSelectedDays([dept.day]);
    setSelectedTime(dept.time);
    setSelectedSubjectType(dept.subjectType);
    setSelectedSubjectName(dept.subjectName);
    setEditIndex(index); // Set the edit index to the current card's index
  };

  const handleSave = (index) => {
    if (!school || !department || !semester || selectedSubjectType === "Null") {
      Alert.alert(
        "Please select School Name, Department Name, Semester Number, and Subject Type to create entries."
      );
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert("Please select a day.");
      return;
    }

    if (
      (selectedSubjectType === "Changable" ||
        selectedSubjectType === "Unchangable") &&
      selectedSubjectName === "Choose subject name"
    ) {
      Alert.alert("Please Choose a subject name");
      return;
    }

    let allTimeSlotsAvailable = true;
    selectedDays.forEach((day) => {
      if (!isTimeSlotAvailable(day, selectedTime)) {
        Alert.alert(
          `${day} is not vacant at ${selectedTime} to add this subject`
        );
        allTimeSlotsAvailable = false;
      }
    });

    if (allTimeSlotsAvailable) {
      const updatedDepartments = [...departments];
      updatedDepartments[index] = {
        ...updatedDepartments[index],
        day: selectedDays[0], // Assuming only one day is selected for edit
        time: selectedTime,
        subjectType: selectedSubjectType,
        subjectName: selectedSubjectName,
        teacherName: getTeacherName(selectedSubjectName),
      };
      setDepartments(updatedDepartments);
      Alert.alert("Entry has been updated");

      // Reset state
      setSelectedDays([]);
      setSelectedSubjectType("Null");
      setSelectedSubjectName("Choose SubjectType First");
      setEditIndex(null);
    }
  };

  const handleDelete = (index) => {
    Alert.alert(
      "Are you sure you want to delete?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setDepartments(departments.filter((_, i) => i !== index));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF5EE" }}>
      <TouchableOpacity style={styles.saveTimetable} onPress={createTimetable}>
        <Text style={styles.saveTimetabletext}>Save Timetable</Text>
      </TouchableOpacity>

      <ScrollView horizontal contentContainerStyle={styles.dayPickerContainer}>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <DayButton
            key={day}
            day={day}
            selected={selectedDays.includes(day)}
            onPress={() => toggleDay(day)}
          />
        ))}
      </ScrollView>

      {/* School Picker */}
      <View style={styles.pickerContainer}>
        <RNPicker
          selectedValue={school}
          onValueChange={(itemValue) => setSchool(itemValue)}
        >
          <RNPicker.Item label="Select School" value="" />
          {schools.map((school, index) => (
            <RNPicker.Item key={index} label={school} value={school} />
          ))}
        </RNPicker>
      </View>

      {/* Department Picker */}
      <View style={styles.pickerContainer}>
        <RNPicker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          enabled={school !== ""}
        >
          <RNPicker.Item label="Select Department" value="" />
          {school &&
            Object.keys(departmentsData).map((dept, index) => (
              <RNPicker.Item key={index} label={dept} value={dept} />
            ))}
        </RNPicker>
      </View>

      {/* Semester Picker */}
      <View style={styles.pickerContainer}>
        <RNPicker
          selectedValue={semester}
          onValueChange={(itemValue) => setSemester(itemValue)}
          enabled={department !== ""}
        >
          <RNPicker.Item label="Select Semester" value="" />
          {semesters.map((sem, index) => (
            <RNPicker.Item key={index} label={sem} value={sem} />
          ))}
        </RNPicker>
      </View>

      {selectedDays.length > 0 && (
        <View>
          <View style={styles.pickerContainer}>
            <RNPicker
              selectedValue={selectedSubjectType}
              onValueChange={(itemValue) => {
                setSelectedSubjectType(itemValue);
                if (itemValue === "Null") {
                  setSelectedSubjectName("Choose SubjectType First");
                } else {
                  setSelectedSubjectName("Choose subject name");
                }
              }}
              enabled={semester !== ""}
            >
              {subjectTypes.map((type, index) => (
                <RNPicker.Item key={index} label={type} value={type} />
              ))}
            </RNPicker>
          </View>

          <View style={styles.pickerContainer}>
            <RNPicker
              selectedValue={selectedSubjectName}
              onValueChange={(itemValue) => setSelectedSubjectName(itemValue)}
              enabled={selectedSubjectType !== "Null"}
            >
              {selectedSubjectType === "Null" ? (
                <RNPicker.Item
                  label="Choose SubjectType First"
                  value="Choose SubjectType First"
                  color="gray"
                />
              ) : (
                subjectNames.map((subject, index) => (
                  <RNPicker.Item
                    key={index}
                    label={subject.SubjectName}
                    value={subject.SubjectName}
                  />
                ))
              )}
            </RNPicker>
          </View>

          <View style={styles.pickerContainer}>
            <RNPicker
              selectedValue={selectedTime}
              onValueChange={(itemValue) => setSelectedTime(itemValue)}
            >
              {times.map((time, index) => (
                <RNPicker.Item key={index} label={time} value={time} />
              ))}
            </RNPicker>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={
              editIndex !== null ? () => handleSave(editIndex) : addDepartment
            }
          >
            <Text style={styles.dayButtonText}>
              {editIndex !== null ? "Save Changes" : "Add Entries"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => (
        <View key={day} style={styles.dayEntriesContainer}>
          <TouchableOpacity
            style={[styles.dayButton, { backgroundColor: "purple" }]}
            onPress={() => toggleDayEntriesVisibility(day)}
          >
            <Text style={styles.dayButtonText}>
              {dayEntriesVisibility[day] ? (
                <AntDesign
                  name="caretup"
                  size={20}
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
              ) : (
                <AntDesign
                  name="caretdown"
                  size={20}
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
              )}
            </Text>

            <Text style={styles.dayButtonText}>
              {day} Entries ({departments.filter((d) => d.day === day).length})
            </Text>
          </TouchableOpacity>
          {dayEntriesVisibility[day] &&
            (departments.filter((dept) => dept.day === day).length > 0 ? (
              departments
                .filter((dept) => dept.day === day)
                .map((dept, index) => (
                  <View key={index} style={styles.card}>
                    <Text style={styles.cardText}>Time: {dept.time}</Text>
                    <Text style={styles.cardText}>
                      Subject Name: {dept.subjectName}
                    </Text>
                    <Text style={styles.cardText}>
                      Teacher Name: {dept.teacherName}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          editIndex === index
                            ? handleSave(index)
                            : handleEdit(index)
                        }
                      >
                        <AntDesign
                          name={editIndex === index ? "save" : "edit"}
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleDelete(index)}>
                        <AntDesign name="delete" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
            ) : (
              <Text style={styles.noEntriesText}>No entries</Text>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dayButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  dayPickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  pickerContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveTimetable: {
    backgroundColor: "gold",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveTimetabletext: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textShadowColor: "black",
  },
  dayEntriesContainer: {
    margin: 10,
  },
  card: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 16,
  },
  noEntriesText: {
    fontSize: 16,
    color: "#CD7F32",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default AdminTimetableView;

// import React, { useState } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   View,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { Picker as RNPicker } from "@react-native-picker/picker";
// import times from "../../database/Time.json";
// import { AntDesign } from "@expo/vector-icons";

// const DayButton = ({ day, selected, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.dayButton,
//         { backgroundColor: selected ? "blue" : "grey" },
//       ]}
//       onPress={onPress}
//     >
//       <Text style={styles.dayButtonText}>{day}</Text>
//     </TouchableOpacity>
//   );
// };

// const AdminTimetableView = () => {
//   const [school, setSchool] = useState("");
//   const [department, setDepartment] = useState("");
//   const [semester, setSemester] = useState("");
//   const [subject, setSubject] = useState("");
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(times[0]);
//   const timetableData = require("../../database/Timetable.json");
//   const teachersData = require("../../database/Batch.json");
//   const [selectedSubjectType, setSelectedSubjectType] = useState("Null");
//   const [selectedSubjectName, setSelectedSubjectName] = useState(
//     "Choose SubjectType First"
//   );
//   const [dayEntriesVisibility, setDayEntriesVisibility] = useState({
//     Monday: false,
//     Tuesday: false,
//     Wednesday: false,
//     Thursday: false,
//     Friday: false,
//     Saturday: false,
//     Sunday: false,
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   const subjectTypes = ["Null", "Changable", "Unchangable"];
//   const subjectNames = [
//     "Choose subject name",
//     "Subject Name 1",
//     "Subject Name 2",
//     "Subject Name 3",
//     "Subject Name 4",
//   ];

//   const schools = ["School A", "School B", "School C"];
//   const departmentsData = {
//     "School A": ["Department A1", "Department A2"],
//     "School B": ["Department B1", "Department B2"],
//     "School C": ["Department C1", "Department C2"],
//   };
//   const semesters = ["Semester 1", "Semester 2", "Semester 3"];

//   const toggleDay = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter((item) => item !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   const toggleDayEntriesVisibility = (day) => {
//     setDayEntriesVisibility((prevState) => ({
//       ...prevState,
//       [day]: !prevState[day],
//     }));
//   };

//   const isTimeSlotAvailable = (day, time) => {
//     return !departments.some(
//       (dept, index) =>
//         dept.day === day && dept.time === time && index !== editIndex
//     );
//   };

//   const createTimetable = () => {
//     console.log("Creating timetable...");
//   };

//   const addDepartment = () => {
//     if (
//       (selectedSubjectType === "Changable" ||
//         selectedSubjectType === "Unchangable") &&
//       selectedSubjectName === "Choose subject name"
//     ) {
//       Alert.alert("Please Choose a subject name");
//       return;
//     }

//     let allTimeSlotsAvailable = true;

//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const newEntries = selectedDays.map((day) => ({
//         day,
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName:
//           selectedSubjectType === "Null" ? "Null" : selectedSubjectName,
//         teacherName: "Teacher Name", // Replace with actual teacher name
//         editMode: false, // Initialize edit mode as false
//       }));
//       setDepartments([...departments, ...newEntries]);

//       // Show success alert
//       Alert.alert("Entries have been added");

//       // Automatically open day entries
//       selectedDays.forEach((day) => {
//         setDayEntriesVisibility((prevState) => ({
//           ...prevState,
//           [day]: true,
//         }));
//       });

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//     }
//   };

//   const handleEdit = (index) => {
//     const dept = departments[index];
//     setSelectedDays([dept.day]);
//     setSelectedTime(dept.time);
//     setSelectedSubjectType(dept.subjectType);
//     setSelectedSubjectName(dept.subjectName);
//     setEditIndex(index); // Set the edit index to the current card's index
//   };

//   const handleSave = (index) => {
//     if (selectedDays.length === 0) {
//       Alert.alert("Please select a day.");
//       return;
//     }

//     if (
//       (selectedSubjectType === "Changable" ||
//         selectedSubjectType === "Unchangable") &&
//       selectedSubjectName === "Choose subject name"
//     ) {
//       Alert.alert("Please Choose a subject name");
//       return;
//     }

//     let allTimeSlotsAvailable = true;
//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const updatedDepartments = [...departments];
//       updatedDepartments[index] = {
//         ...updatedDepartments[index],
//         day: selectedDays[0], // Assuming only one day is selected for edit
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName: selectedSubjectName,
//       };
//       setDepartments(updatedDepartments);
//       Alert.alert("Entry has been updated");

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//       setEditIndex(null);
//     }
//   };

//   const handleDelete = (index) => {
//     Alert.alert(
//       "Are you sure you want to delete?",
//       "",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () => {
//             setDepartments(departments.filter((_, i) => i !== index));
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <ScrollView style={{ backgroundColor: "#FFF5EE" }}>
//       <TouchableOpacity style={styles.saveTimetable} onPress={createTimetable}>
//         <Text style={styles.saveTimetabletext}>Save Timetable</Text>
//       </TouchableOpacity>

//       <ScrollView horizontal contentContainerStyle={styles.dayPickerContainer}>
//         {[
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ].map((day) => (
//           <DayButton
//             key={day}
//             day={day}
//             selected={selectedDays.includes(day)}
//             onPress={() => toggleDay(day)}
//           />
//         ))}
//       </ScrollView>

//       {/* SchoolName Picker */}
//       <View style={styles.pickerContainer}>
//         <RNPicker
//           selectedValue={school}
//           onValueChange={(itemValue) => {
//             setSchool(itemValue);
//             setDepartment(""); // Reset department
//             setSemester(""); // Reset semester
//           }}
//         >
//           <RNPicker.Item label="Select School" value="" />
//           {schools &&
//             schools.map((school, index) => (
//               <RNPicker.Item key={index} label={school} value={school} />
//             ))}
//         </RNPicker>
//       </View>

//       {/* DepartmentName Picker */}
//       <View style={styles.pickerContainer}>
//         <RNPicker
//           selectedValue={department}
//           onValueChange={(itemValue) => {
//             setDepartment(itemValue);
//             setSemester(""); // Reset semester
//           }}
//           enabled={school !== ""}
//         >
//           <RNPicker.Item label="Select Department" value="" />
//           {school !== "" &&
//             departmentsData[school] &&
//             departmentsData[school].map((dept, index) => (
//               <RNPicker.Item key={index} label={dept} value={dept} />
//             ))}
//         </RNPicker>
//       </View>

//       {/* Semester Picker */}
//       <View style={styles.pickerContainer}>
//         <RNPicker
//           selectedValue={semester}
//           onValueChange={(itemValue) => setSemester(itemValue)}
//           enabled={department !== ""}
//         >
//           <RNPicker.Item label="Select Semester" value="" />
//           {semesters &&
//             semesters.map((sem, index) => (
//               <RNPicker.Item key={index} label={sem} value={sem} />
//             ))}
//         </RNPicker>
//       </View>

//       {selectedDays.length > 0 && (
//         <View>
//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectType}
//               onValueChange={(itemValue) => {
//                 setSelectedSubjectType(itemValue);
//                 if (itemValue === "Null") {
//                   setSelectedSubjectName("Choose SubjectType First");
//                 } else {
//                   setSelectedSubjectName("Choose subject name");
//                 }
//               }}
//               enabled={semester !== ""}
//             >
//               {subjectTypes.map((type, index) => (
//                 <RNPicker.Item key={index} label={type} value={type} />
//               ))}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectName}
//               onValueChange={(itemValue) => setSelectedSubjectName(itemValue)}
//               enabled={selectedSubjectType !== "Null"}
//             >
//               {selectedSubjectType === "Null" ? (
//                 <RNPicker.Item
//                   label="Choose SubjectType First"
//                   value="Choose SubjectType First"
//                   color="gray"
//                 />
//               ) : (
//                 subjectNames.map((name, index) => (
//                   <RNPicker.Item key={index} label={name} value={name} />
//                 ))
//               )}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedTime}
//               onValueChange={(itemValue) => setSelectedTime(itemValue)}
//             >
//               {times.map((time, index) => (
//                 <RNPicker.Item key={index} label={time} value={time} />
//               ))}
//             </RNPicker>
//           </View>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={
//               editIndex !== null ? () => handleSave(editIndex) : addDepartment
//             }
//           >
//             <Text style={styles.dayButtonText}>
//               {editIndex !== null ? "Save Changes" : "Add Entries"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {[
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ].map((day) => (
//         <View key={day} style={styles.dayEntriesContainer}>
//           <TouchableOpacity
//             style={[styles.dayButton, { backgroundColor: "purple" }]}
//             onPress={() => toggleDayEntriesVisibility(day)}
//           >
//             <Text style={styles.dayButtonText}>
//               {dayEntriesVisibility[day] ? (
//                 <AntDesign
//                   name="caretup"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               ) : (
//                 <AntDesign
//                   name="caretdown"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               )}
//             </Text>

//             <Text style={styles.dayButtonText}>
//               {day} Entries ({departments.filter((d) => d.day === day).length})
//             </Text>
//           </TouchableOpacity>
//           {dayEntriesVisibility[day] &&
//             (departments.filter((dept) => dept.day === day).length > 0 ? (
//               departments
//                 .filter((dept) => dept.day === day)
//                 .map((dept, index) => (
//                   <View key={index} style={styles.card}>
//                     <Text style={styles.cardText}>Time: {dept.time}</Text>

//                     <Text style={styles.cardText}>
//                       Subject Name: {dept.subjectName}
//                     </Text>
//                     <Text style={styles.cardText}>
//                       Teacher Name: {dept.teacherName}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <TouchableOpacity
//                         onPress={() =>
//                           editIndex === index
//                             ? handleSave(index)
//                             : handleEdit(index)
//                         }
//                       >
//                         <AntDesign
//                           name={editIndex === index ? "save" : "edit"}
//                           size={24}
//                           color="black"
//                         />
//                       </TouchableOpacity>

//                       <TouchableOpacity onPress={() => handleDelete(index)}>
//                         <AntDesign name="delete" size={24} color="black" />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))
//             ) : (
//               <Text style={styles.noEntriesText}>No entries</Text>
//             ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   dayButton: {
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dayButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   dayPickerContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 10,
//   },
//   pickerContainer: {
//     margin: 10,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   addButton: {
//     backgroundColor: "green",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveTimetable: {
//     backgroundColor: "gold",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveTimetabletext: {
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "#fff",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     textShadowColor: "black",
//   },
//   dayEntriesContainer: {
//     margin: 10,
//   },
//   card: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 5,
//   },
//   cardText: {
//     fontSize: 16,
//   },
//   noEntriesText: {
//     fontSize: 16,
//     color: "#CD7F32",
//     textAlign: "center",
//     marginVertical: 10,
//   },
// });

// export default AdminTimetableView;

// import React, { useState } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   View,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { Picker as RNPicker } from "@react-native-picker/picker";
// import times from "../../database/Time.json";
// import { AntDesign } from "@expo/vector-icons";

// const DayButton = ({ day, selected, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.dayButton,
//         { backgroundColor: selected ? "blue" : "grey" },
//       ]}
//       onPress={onPress}
//     >
//       <Text style={styles.dayButtonText}>{day}</Text>
//     </TouchableOpacity>
//   );
// };

// const AdminTimetableView = () => {
//   const [school, setSchool] = useState("");
//   const [department, setDepartment] = useState("");
//   const [semester, setSemester] = useState("");
//   const [subject, setSubject] = useState("");
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(times[0]);
//   const timetableData = require("../../database/Timetable.json");
//   const teachersData = require("../../database/Batch.json");
//   const [selectedSubjectType, setSelectedSubjectType] = useState("Null");
//   const [selectedSubjectName, setSelectedSubjectName] = useState(
//     "Choose SubjectType First"
//   );
//   const [dayEntriesVisibility, setDayEntriesVisibility] = useState({
//     Monday: false,
//     Tuesday: false,
//     Wednesday: false,
//     Thursday: false,
//     Friday: false,
//     Saturday: false,
//     Sunday: false,
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   const subjectTypes = ["Null", "Changable", "Unchangable"];
//   const subjectNames = [
//     "Choose subject name",
//     "Subject Name 1",
//     "Subject Name 2",
//     "Subject Name 3",
//     "Subject Name 4",
//   ];

//   const toggleDay = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter((item) => item !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   const toggleDayEntriesVisibility = (day) => {
//     setDayEntriesVisibility((prevState) => ({
//       ...prevState,
//       [day]: !prevState[day],
//     }));
//   };

//   const isTimeSlotAvailable = (day, time) => {
//     return !departments.some(
//       (dept, index) =>
//         dept.day === day && dept.time === time && index !== editIndex
//     );
//   };
//   const createTimetable = () => {
//     console.log("Creating timetable...");
//   };
//   // const findNextAvailableSlot = () => {
//   //   for (let day of [
//   //     "Monday",
//   //     "Tuesday",
//   //     "Wednesday",
//   //     "Thursday",
//   //     "Friday",
//   //     "Saturday",
//   //     "Sunday",
//   //   ]) {
//   //     for (let time of times) {
//   //       if (isTimeSlotAvailable(day, time)) {
//   //         return { day, time };
//   //       }
//   //     }
//   //   }
//   //   return null;
//   // };

//   const addDepartment = () => {
//     if (
//       (selectedSubjectType === "Changable" ||
//         selectedSubjectType === "Unchangable") &&
//       selectedSubjectName === "Choose subject name"
//     ) {
//       Alert.alert("Please Choose a subject name");
//       return;
//     }

//     let allTimeSlotsAvailable = true;

//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const newEntries = selectedDays.map((day) => ({
//         day,
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName:
//           selectedSubjectType === "Null" ? "Null" : selectedSubjectName,
//         teacherName: "Teacher Name", // Replace with actual teacher name
//         editMode: false, // Initialize edit mode as false
//       }));
//       setDepartments([...departments, ...newEntries]);

//       // Show success alert
//       Alert.alert("Entries have been added");

//       // Automatically open day entries
//       selectedDays.forEach((day) => {
//         setDayEntriesVisibility((prevState) => ({
//           ...prevState,
//           [day]: true,
//         }));
//       });

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//     }
//   };

//   const handleEdit = (index) => {
//     const dept = departments[index];
//     setSelectedDays([dept.day]);
//     setSelectedTime(dept.time);
//     setSelectedSubjectType(dept.subjectType);
//     setSelectedSubjectName(dept.subjectName);
//     setEditIndex(index); // Set the edit index to the current card's index
//   };

//   const handleSave = (index) => {
//     if (selectedDays.length === 0) {
//       Alert.alert("Please select a day.");
//       return;
//     }

//     if (
//       (selectedSubjectType === "Changable" ||
//         selectedSubjectType === "Unchangable") &&
//       selectedSubjectName === "Choose subject name"
//     ) {
//       Alert.alert("Please Choose a subject name");
//       return;
//     }

//     let allTimeSlotsAvailable = true;
//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const updatedDepartments = [...departments];
//       updatedDepartments[index] = {
//         ...updatedDepartments[index],
//         day: selectedDays[0], // Assuming only one day is selected for edit
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName: selectedSubjectName,
//       };
//       setDepartments(updatedDepartments);
//       Alert.alert("Entry has been updated");

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//       setEditIndex(null);
//     }
//   };

//   const handleDelete = (index) => {
//     Alert.alert(
//       "Are you sure you want to delete?",
//       "",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () => {
//             setDepartments(departments.filter((_, i) => i !== index));
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <ScrollView style={{ backgroundColor: "#FFF5EE" }}>
//       <TouchableOpacity style={styles.saveTimetable} onPress={createTimetable}>
//         <Text style={styles.saveTimetabletext}>Save Timetable</Text>
//       </TouchableOpacity>

//       <ScrollView horizontal contentContainerStyle={styles.dayPickerContainer}>
//         {[
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ].map((day) => (
//           <DayButton
//             key={day}
//             day={day}
//             selected={selectedDays.includes(day)}
//             onPress={() => toggleDay(day)}
//           />
//         ))}
//       </ScrollView>

//       {selectedDays.length > 0 && (
//         <View>
//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectType}
//               onValueChange={(itemValue) => {
//                 setSelectedSubjectType(itemValue);
//                 if (itemValue === "Null") {
//                   setSelectedSubjectName("Choose SubjectType First");
//                 } else {
//                   setSelectedSubjectName("Choose subject name");
//                 }
//               }}
//             >
//               {subjectTypes.map((type, index) => (
//                 <RNPicker.Item key={index} label={type} value={type} />
//               ))}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectName}
//               onValueChange={(itemValue) => setSelectedSubjectName(itemValue)}
//               enabled={selectedSubjectType !== "Null"}
//             >
//               {selectedSubjectType === "Null" ? (
//                 <RNPicker.Item
//                   label="Choose SubjectType First"
//                   value="Choose SubjectType First"
//                   color="gray"
//                 />
//               ) : (
//                 subjectNames.map((name, index) => (
//                   <RNPicker.Item key={index} label={name} value={name} />
//                 ))
//               )}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedTime}
//               onValueChange={(itemValue) => setSelectedTime(itemValue)}
//             >
//               {times.map((time, index) => (
//                 <RNPicker.Item key={index} label={time} value={time} />
//               ))}
//             </RNPicker>
//           </View>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={
//               editIndex !== null ? () => handleSave(editIndex) : addDepartment
//             }
//           >
//             <Text style={styles.dayButtonText}>
//               {editIndex !== null ? "Save Changes" : "Add Entries"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {[
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ].map((day) => (
//         <View key={day} style={styles.dayEntriesContainer}>
//           <TouchableOpacity
//             style={[styles.dayButton, { backgroundColor: "purple" }]}
//             onPress={() => toggleDayEntriesVisibility(day)}
//           >
//             <Text style={styles.dayButtonText}>
//               {dayEntriesVisibility[day] ? (
//                 <AntDesign
//                   name="caretup"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               ) : (
//                 <AntDesign
//                   name="caretdown"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               )}
//             </Text>

//             <Text style={styles.dayButtonText}>
//               {day} Entries ({departments.filter((d) => d.day === day).length})
//             </Text>
//           </TouchableOpacity>
//           {dayEntriesVisibility[day] &&
//             (departments.filter((dept) => dept.day === day).length > 0 ? (
//               departments
//                 .filter((dept) => dept.day === day)
//                 .map((dept, index) => (
//                   <View key={index} style={styles.card}>
//                     <Text style={styles.cardText}>Time: {dept.time}</Text>

//                     <Text style={styles.cardText}>
//                       Subject Name: {dept.subjectName}
//                     </Text>
//                     <Text style={styles.cardText}>
//                       Teacher Name: {dept.teacherName}
//                     </Text>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <TouchableOpacity
//                         onPress={() =>
//                           editIndex === index
//                             ? handleSave(index)
//                             : handleEdit(index)
//                         }
//                       >
//                         <AntDesign
//                           name={editIndex === index ? "save" : "edit"}
//                           size={24}
//                           color="black"
//                         />
//                       </TouchableOpacity>

//                       <TouchableOpacity onPress={() => handleDelete(index)}>
//                         <AntDesign name="delete" size={24} color="black" />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))
//             ) : (
//               <Text style={styles.noEntriesText}>No entries</Text>
//             ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   dayButton: {
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dayButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   dayPickerContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 10,
//   },
//   pickerContainer: {
//     margin: 10,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//   },
//   addButton: {
//     backgroundColor: "green",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveTimetable: {
//     backgroundColor: "gold",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   saveTimetabletext: {
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "#fff",
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//     textShadowColor: "black",
//   },
//   dayEntriesContainer: {
//     margin: 10,
//   },
//   card: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 5,
//   },
//   cardText: {
//     fontSize: 16,
//   },
//   noEntriesText: {
//     fontSize: 16,
//     color: "#CD7F32",
//     textAlign: "center",
//     marginVertical: 10,
//   },
// });

// export default AdminTimetableView;

{
  /* <Text style={styles.cardText}>
                    Subject Type: {dept.subjectType}
                  </Text> */
}
//-----------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   View,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { Picker as RNPicker } from "@react-native-picker/picker";
// import times from "../../database/Time.json";
// import { AntDesign } from "@expo/vector-icons";

// const DayButton = ({ day, selected, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.dayButton,
//         { backgroundColor: selected ? "blue" : "grey" },
//       ]}
//       onPress={onPress}
//     >
//       <Text style={styles.dayButtonText}>{day}</Text>
//     </TouchableOpacity>
//   );
// };

// const AdminTimetableView = () => {
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(times[0]);
//   const [selectedSubjectType, setSelectedSubjectType] = useState("Null");
//   const [selectedSubjectName, setSelectedSubjectName] = useState(
//     "Choose SubjectType First"
//   );
//   const [dayEntriesVisibility, setDayEntriesVisibility] = useState({
//     Monday: false,
//     Tuesday: false,
//     Wednesday: false,
//     Thursday: false,
//     Friday: false,
//     Saturday: false,
//     Sunday: false,
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   const subjectTypes = ["Null", "Changable", "Unchangable"];
//   const subjectNames = [
//     "Choose subject name",
//     "Subject Name 1",
//     "Subject Name 2",
//     "Subject Name 3",
//     "Subject Name 4",
//   ];

//   const toggleDay = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter((item) => item !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   const toggleDayEntriesVisibility = (day) => {
//     setDayEntriesVisibility((prevState) => ({
//       ...prevState,
//       [day]: !prevState[day],
//     }));
//   };

//   const isTimeSlotAvailable = (day, time) => {
//     return !departments.some(
//       (dept, index) =>
//         dept.day === day && dept.time === time && index !== editIndex
//     );
//   };

//   const addDepartment = () => {
//     if (
//       (selectedSubjectType === "Changable" ||
//         selectedSubjectType === "Unchangable") &&
//       selectedSubjectName === "Choose subject name"
//     ) {
//       Alert.alert("Please Choose a subject name");
//       return;
//     }

//     let allTimeSlotsAvailable = true;

//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const newEntries = selectedDays.map((day) => ({
//         day,
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName:
//           selectedSubjectType === "Null" ? "Null" : selectedSubjectName,
//         teacherName: "Teacher Name", // Replace with actual teacher name
//         editMode: false, // Initialize edit mode as false
//       }));
//       setDepartments([...departments, ...newEntries]);

//       // Show success alert
//       Alert.alert("Entries have been added");

//       // Automatically open day entries
//       selectedDays.forEach((day) => {
//         setDayEntriesVisibility((prevState) => ({
//           ...prevState,
//           [day]: true,
//         }));
//       });

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//     }
//   };

//   const handleEdit = (index) => {
//     const dept = departments[index];
//     setSelectedDays([dept.day]);
//     setSelectedTime(dept.time);
//     setSelectedSubjectType(dept.subjectType);
//     setSelectedSubjectName(dept.subjectName);
//     setEditIndex(index); // Set the edit index to the current card's index
//   };

//   const handleSave = (index) => {
//     if (selectedDays.length === 0) {
//       Alert.alert("Please select a day.");
//       return;
//     }

//     let allTimeSlotsAvailable = true;
//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const updatedDepartments = [...departments];
//       updatedDepartments[index] = {
//         ...updatedDepartments[index],
//         day: selectedDays[0], // Assuming only one day is selected for edit
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName: selectedSubjectName,
//       };
//       setDepartments(updatedDepartments);
//       Alert.alert("Entry has been updated");

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//       setEditIndex(null);
//     }
//   };

//   const handleDelete = (index) => {
//     Alert.alert(
//       "Are you sure you want to delete?",
//       "",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () => {
//             setDepartments(departments.filter((_, i) => i !== index));
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   return (
//     <ScrollView style={{ backgroundColor: "#FFF5EE" }}>
//       <ScrollView horizontal contentContainerStyle={styles.dayPickerContainer}>
//         {[
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ].map((day) => (
//           <DayButton
//             key={day}
//             day={day}
//             selected={selectedDays.includes(day)}
//             onPress={() => toggleDay(day)}
//           />
//         ))}
//       </ScrollView>

//       {selectedDays.length > 0 && (
//         <View>
//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectType}
//               onValueChange={(itemValue) => {
//                 setSelectedSubjectType(itemValue);
//                 if (itemValue === "Null") {
//                   setSelectedSubjectName("Choose SubjectType First");
//                 } else {
//                   setSelectedSubjectName("Choose subject name");
//                 }
//               }}
//             >
//               {subjectTypes.map((type, index) => (
//                 <RNPicker.Item key={index} label={type} value={type} />
//               ))}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectName}
//               onValueChange={(itemValue) => setSelectedSubjectName(itemValue)}
//               enabled={selectedSubjectType !== "Null"}
//             >
//               {selectedSubjectType === "Null" ? (
//                 <RNPicker.Item
//                   label="Choose SubjectType First"
//                   value="Choose SubjectType First"
//                   color="gray"
//                 />
//               ) : (
//                 subjectNames.map((name, index) => (
//                   <RNPicker.Item key={index} label={name} value={name} />
//                 ))
//               )}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedTime}
//               onValueChange={(itemValue) => setSelectedTime(itemValue)}
//             >
//               {times.map((time, index) => (
//                 <RNPicker.Item key={index} label={time} value={time} />
//               ))}
//             </RNPicker>
//           </View>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={
//               editIndex !== null ? () => handleSave(editIndex) : addDepartment
//             }
//           >
//             <Text style={styles.dayButtonText}>
//               {editIndex !== null ? "Save Changes" : "Add Entries"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {[
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ].map((day) => (
//         <View key={day} style={styles.dayEntriesContainer}>
//           <TouchableOpacity
//             style={[styles.dayButton, { backgroundColor: "purple" }]}
//             onPress={() => toggleDayEntriesVisibility(day)}
//           >
//             <Text style={styles.dayButtonText}>
//               {day}
//               {dayEntriesVisibility[day] ? (
//                 <AntDesign
//                   name="caretup"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               ) : (
//                 <AntDesign
//                   name="caretdown"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               )}
//             </Text>
//           </TouchableOpacity>

//           {dayEntriesVisibility[day] &&
//             (departments.filter((dept) => dept.day === day).length > 0 ? (
//               departments
//                 .filter((dept) => dept.day === day)
//                 .map((dept, index) => (
//                   <View key={index} style={styles.card}>
//                     <Text style={styles.cardText}>{dept.time}</Text>
//                     <Text style={styles.cardText}>{dept.subjectName}</Text>
//                     {dept.subjectType !== "Null" && (
//                       <Text style={styles.cardText}>({dept.teacherName})</Text>
//                     )}
//                     <View style={styles.cardActions}>
//                       <TouchableOpacity onPress={() => handleEdit(index)}>
//                         <AntDesign name="edit" size={24} color="black" />
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleDelete(index)}>
//                         <AntDesign name="delete" size={24} color="black" />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))
//             ) : (
//               <Text>No entries</Text>
//             ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default AdminTimetableView;

// const styles = StyleSheet.create({
//   dayPickerContainer: {
//     flexDirection: "row",
//     padding: 10,
//   },
//   dayButton: {
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   dayButtonText: {
//     color: "white",
//   },
//   addButton: {
//     backgroundColor: "green",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   pickerContainer: {
//     margin: 10,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   tableContainer: {
//     marginTop: 20,
//   },
//   card: {
//     backgroundColor: "#EADDCA",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   cardText: {
//     fontSize: 16,
//     color: "#CD7F32",
//   },
//   cardActions: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   dayEntriesContainer: {
//     marginVertical: 10,
//   },
// });

//--------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   View,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import { Picker as RNPicker } from "@react-native-picker/picker";
// import times from "../../database/Time.json";
// import { AntDesign } from "@expo/vector-icons";
// const DayButton = ({ day, selected, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.dayButton,
//         { backgroundColor: selected ? "blue" : "grey" },
//       ]}
//       onPress={onPress}
//     >
//       <Text style={styles.dayButtonText}>{day}</Text>
//     </TouchableOpacity>
//   );
// };

// const AdminTimetableView = () => {
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [selectedTime, setSelectedTime] = useState(times[0]);
//   const [selectedSubjectType, setSelectedSubjectType] = useState("Null");
//   const [selectedSubjectName, setSelectedSubjectName] = useState(
//     "Choose SubjectType First"
//   );
//   const [dayEntriesVisibility, setDayEntriesVisibility] = useState({
//     Monday: false,
//     Tuesday: false,
//     Wednesday: false,
//     Thursday: false,
//     Friday: false,
//     Saturday: false,
//     Sunday: false,
//   });

//   const subjectTypes = ["Null", "Changable", "Unchangable"];
//   const subjectNames = [
//     "Choose subject name",
//     "Subject Name 1",
//     "Subject Name 2",
//     "Subject Name 3",
//     "Subject Name 4",
//   ];

//   const toggleDay = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter((item) => item !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   const toggleDayEntriesVisibility = (day) => {
//     setDayEntriesVisibility((prevState) => ({
//       ...prevState,
//       [day]: !prevState[day],
//     }));
//   };

//   const isTimeSlotAvailable = (day, time) => {
//     return !departments.some((dept) => dept.day === day && dept.time === time);
//   };

//   const addDepartment = () => {
//     if (
//       (selectedSubjectType === "Changable" ||
//         selectedSubjectType === "Unchangable") &&
//       selectedSubjectName === "Choose subject name"
//     ) {
//       Alert.alert("Please Choose a subject name");
//       return;
//     }

//     let allTimeSlotsAvailable = true;

//     selectedDays.forEach((day) => {
//       if (!isTimeSlotAvailable(day, selectedTime)) {
//         Alert.alert(
//           `${day} is not vacant at ${selectedTime} to add this subject`
//         );
//         allTimeSlotsAvailable = false;
//       }
//     });

//     if (allTimeSlotsAvailable) {
//       const newEntries = selectedDays.map((day) => ({
//         day,
//         time: selectedTime,
//         subjectType: selectedSubjectType,
//         subjectName:
//           selectedSubjectType === "Null" ? "Null" : selectedSubjectName,
//         teacherName: "Teacher Name", // Replace with actual teacher name
//       }));
//       setDepartments([...departments, ...newEntries]);

//       // Show success alert
//       Alert.alert("Entries have been added");

//       // Automatically open day entries
//       selectedDays.forEach((day) => {
//         setDayEntriesVisibility((prevState) => ({
//           ...prevState,
//           [day]: true,
//         }));
//       });

//       // Reset state
//       setSelectedDays([]);
//       setSelectedSubjectType("Null");
//       setSelectedSubjectName("Choose SubjectType First");
//     }
//   };

//   const handleEdit = (index) => {
//     // Clone the departments array to avoid mutating the state directly
//     const updatedDepartments = [...departments];
//     // Toggle the edit mode for the corresponding card
//     updatedDepartments[index].editMode = !updatedDepartments[index].editMode;
//     // Update the state with the modified departments array
//     setDepartments(updatedDepartments);
//   };
//   const newEntries = selectedDays.map((day) => ({
//     day,
//     time: selectedTime,
//     subjectType: selectedSubjectType,
//     subjectName: selectedSubjectType === "Null" ? "Null" : selectedSubjectName,
//     teacherName: "Teacher Name", // Replace with actual teacher name
//     editMode: false, // Initialize edit mode as false
//   }));
//   const handleSave = (index) => {
//     const updatedDepartments = [...departments];
//     updatedDepartments[index].editMode = false;
//     setDepartments(updatedDepartments);
//   };

//   const handleDelete = (index) => {
//     Alert.alert(
//       "Delete Entry",
//       "Are you sure you want to delete this entry?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           onPress: () => {
//             const updatedDepartments = [...departments];
//             updatedDepartments.splice(index, 1);
//             setDepartments(updatedDepartments);
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };
//   return (
//     <ScrollView style={{ backgroundColor: "#FFF5EE" }}>
//       <ScrollView horizontal contentContainerStyle={styles.dayPickerContainer}>
//         {[
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ].map((day) => (
//           <DayButton
//             key={day}
//             day={day}
//             selected={selectedDays.includes(day)}
//             onPress={() => toggleDay(day)}
//           />
//         ))}
//       </ScrollView>

//       {selectedDays.length > 0 && (
//         <View>
//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectType}
//               onValueChange={(itemValue) => {
//                 setSelectedSubjectType(itemValue);
//                 if (itemValue === "Null") {
//                   setSelectedSubjectName("Choose SubjectType First");
//                 } else {
//                   setSelectedSubjectName("Choose subject name");
//                 }
//               }}
//             >
//               {subjectTypes.map((type, index) => (
//                 <RNPicker.Item key={index} label={type} value={type} />
//               ))}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedSubjectName}
//               onValueChange={(itemValue) => setSelectedSubjectName(itemValue)}
//               enabled={selectedSubjectType !== "Null"}
//             >
//               {selectedSubjectType === "Null" ? (
//                 <RNPicker.Item
//                   label="Choose SubjectType First"
//                   value="Choose SubjectType First"
//                   color="gray"
//                 />
//               ) : (
//                 subjectNames.map((name, index) => (
//                   <RNPicker.Item key={index} label={name} value={name} />
//                 ))
//               )}
//             </RNPicker>
//           </View>

//           <View style={styles.pickerContainer}>
//             <RNPicker
//               selectedValue={selectedTime}
//               onValueChange={(itemValue) => setSelectedTime(itemValue)}
//             >
//               {times.map((time, index) => (
//                 <RNPicker.Item key={index} label={time} value={time} />
//               ))}
//             </RNPicker>
//           </View>

//           <TouchableOpacity style={styles.addButton} onPress={addDepartment}>
//             <Text style={styles.dayButtonText}>Add Entries</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.addButton}>
//             <Text style={styles.dayButtonText}>Add Subject</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.dayButtonText}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {[
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//         "Sunday",
//       ].map((day) => (
//         <View key={day} style={styles.dayEntriesContainer}>
//           <TouchableOpacity
//             style={[styles.dayButton, { backgroundColor: "purple" }]}
//             onPress={() => toggleDayEntriesVisibility(day)}
//           >
//             <Text style={styles.dayButtonText}>
//               {day}
//               {dayEntriesVisibility[day] ? (
//                 <AntDesign
//                   name="caretup"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               ) : (
//                 <AntDesign
//                   name="caretdown"
//                   size={20}
//                   color="white"
//                   style={{ paddingLeft: 10 }}
//                 />
//               )}
//             </Text>
//           </TouchableOpacity>

//           {dayEntriesVisibility[day] &&
//             (departments.filter((dept) => dept.day === day).length > 0 ? (
//               departments
//                 .filter((dept) => dept.day === day)
//                 .map((dept, index) => (
//                   <View key={index} style={styles.card}>
//                     <Text style={styles.cardText}>{dept.time}</Text>
//                     <Text style={styles.cardText}>{dept.subjectName}</Text>
//                     {dept.subjectType !== "Null" && (
//                       <Text style={styles.cardText}>({dept.teacherName})</Text>
//                     )}
//                     {dept.editMode ? (
//                       <View style={{ flexDirection: "row" }}>
//                         <TouchableOpacity onPress={() => handleSave(index)}>
//                           <AntDesign name="save" size={24} color="black" />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => handleDelete(index)}>
//                           <AntDesign name="delete" size={24} color="black" />
//                         </TouchableOpacity>
//                       </View>
//                     ) : (
//                       <TouchableOpacity onPress={() => handleEdit(index)}>
//                         <AntDesign name="edit" size={24} color="black" />
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 ))
//             ) : (
//               <Text>No entries</Text>
//             ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default AdminTimetableView;

// const styles = StyleSheet.create({
//   dayPickerContainer: {
//     flexDirection: "row",
//     padding: 10,
//   },
//   dayButton: {
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   dayButtonText: {
//     color: "white",
//   },
//   addButton: {
//     backgroundColor: "green",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
//   editButton: {
//     backgroundColor: "orange",
//     padding: 10,
//     margin: 10,
//     borderRadius: 5,
//   },
//   pickerContainer: {
//     margin: 10,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   tableContainer: {
//     marginTop: 20,
//   },
//   card: {
//     // backgroundColor: "#f9f9f9",
//     backgroundColor: "#EADDCA",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   cardText: {
//     fontSize: 16,
//     color: "#CD7F32",
//   },
//   // dayEntriesContainer: {
//   //   marginVertical: 10,
//   // },
// });

//-------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
// } from "react-native";
// import { TabView, TabBar } from "react-native-tab-view";
// import moment from "moment";
// // import axios from "axios";

// // import TimetableCard from "./TimetableCard";

// const AdminTimetableView = () => {
//   const [schoolName, setSchoolName] = useState("");
//   const [departmentName, setDepartmentName] = useState("");
//   const [semester, setSemester] = useState("");
//   const [events, setEvents] = useState([]);
//   const [timetable, setTimetable] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [index, setIndex] = useState(0);

//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://your-api-url/calendar/events"
//   //       );
//   //       setEvents(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   const fetchTimetable = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://your-api-url/timetable"
//   //       );
//   //       setTimetable(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   const fetchTeachers = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         "https://your-api-url/teachers"
//   //       );
//   //       setTeachers(response.data);
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   //   fetchEvents();
//   //   fetchTimetable();
//   //   fetchTeachers();
//   // }, []);

//   const handleFilter = () => {
//     const filteredEvents = events.filter(
//       (event) =>
//         event.title.includes(schoolName) &&
//         event.description.includes(departmentName) &&
//         event.description.includes(semester)
//     );

//     const filteredTimetable = timetable.filter(
//       (timetable) =>
//         timetable.department === departmentName &&
//         timetable.semester === semester
//     );

//     setEvents(filteredEvents);
//     setTimetable(filteredTimetable);
//   };

//   const routes = [
//     { key: "monday", title: "Monday" },
//     { key: "tuesday", title: "Tuesday" },
//     { key: "wednesday", title: "Wednesday" },
//     { key: "thursday", title: "Thursday" },
//     { key: "friday", title: "Friday" },
//   ];

//   const renderTabBar = (props) => (
//     <TabBar
//       {...props}
//       scrollEnabled={false}
//       style={{ backgroundColor: "#fff" }}
//       indicatorStyle={{ backgroundColor: "#007bff" }}
//       tabStyle={{ width: 100 }}
//       labelStyle={{ textAlign: "center" }}
//     />
//   );

//   const renderTabView = ({ navigationState }) => {
//     const dayEvents = events.filter(
//       (event) =>
//         moment(event.startTime).format("dddd") === moment().format("dddd")
//     );

//     const dayTimetable = timetable.filter(
//       (timetable) =>
//         moment(timetable.startTime).format("dddd") === moment().format("dddd")
//     );

//     const dayTeachers = teachers.filter(
//       (teacher) =>
//         moment(teacher.timetable.startTime).format("dddd") ===
//         moment().format("dddd")
//     );

//     return (
//       <View style={styles.container}>
//         <View style={styles.eventNotification}>
//           {dayEvents.length > 0 &&
//             dayEvents.map((event) => (
//               <View key={event.id}>
//                 <Text style={styles.eventName}>{event.title}</Text>
//                 {event.isHoliday ? (
//                   <Text style={styles.eventDescription}>
//                     Institution is closed
//                   </Text>
//                 ) : (
//                   <Text style={styles.eventDescription}>
//                     Regular classes will be held
//                   </Text>
//                 )}
//               </View>
//             ))}
//         </View>
//         <ScrollView style={styles.timetableContainer}>
//           {/* Here, you should map through `dayTimetable` and render `TimetableCard` components */}
//         </ScrollView>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.filterContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="School Name"
//           value={schoolName}
//           onChangeText={setSchoolName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Department Name"
//           value={departmentName}
//           onChangeText={setDepartmentName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Semester"
//           value={semester}
//           onChangeText={setSemester}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleFilter}>
//           <Text style={styles.buttonText}>Filter</Text>
//         </TouchableOpacity>
//       </View>
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderTabView}
//         renderTabBar={renderTabBar}
//         onIndexChange={setIndex}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   input: {
//     width: "30%",
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 8,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   eventNotification: {
//     padding: 16,
//     backgroundColor: "#f5f5f5",
//   },
//   eventName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   eventDescription: {
//     fontSize: 14,
//     color: "#666",
//   },
//   timetableContainer: {
//     flex: 1,
//     padding: 16,
//   },
// });

// export default AdminTimetableView;

// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   StyleSheet,
// //   Alert,
// // } from "react-native";
// // import { TabView, TabBar } from "react-native-tab-view";
// // import { CalendarList, CalendarEvent } from "react-native-calendars";
// // import moment from "moment";
// // // import axios from "axios";

// // // import TimetableCard from "./TimetableCard";

// // const AdminTimetableView = () => {
// //   const [schoolName, setSchoolName] = useState("");
// //   const [departmentName, setDepartmentName] = useState("");
// //   const [semester, setSemester] = useState("");
// //   const [events, setEvents] = useState([]);
// //   const [timetable, setTimetable] = useState([]);
// //   const [teachers, setTeachers] = useState([]);
// //   const [index, setIndex] = useState(0);
// //   //   useEffect(() => {
// //   //     const fetchEvents = async () => {
// //   //       try {
// //   //         const response = await axios.get(
// //   //           "https://your-api-url/calendar/events"
// //   //         );
// //   //         setEvents(response.data);
// //   //       } catch (error) {
// //   //         console.error(error);
// //   //       }
// //   //     };

// //   //     const fetchTimetable = async () => {
// //   //       try {
// //   //         const response = await axios.get(
// //   //           "https://your-api-url/timetable"
// //   //         );
// //   //         setTimetable(response.data);
// //   //       } catch (error) {
// //   //         console.error(error);
// //   //       }
// //   //     };

// //   //     const fetchTeachers = async () => {
// //   //       try {
// //   //         const response = await axios.get(
// //   //           "https://your-api-url/teachers"
// //   //         );
// //   //         setTeachers(response.data);
// //   //       } catch (error) {
// //   //         console.error(error);
// //   //       }

// //   //     fetchEvents();
// //   //     fetchTimetable();
// //   //     fetchTeachers();
// //   //   }, [],);

// //   const handleFilter = () => {
// //     const filteredEvents = events.filter(
// //       (event) =>
// //         event.title.includes(schoolName) &&
// //         event.description.includes(departmentName) &&
// //         event.description.includes(semester)
// //     );

// //     const filteredTimetable = timetable.filter(
// //       (timetable) =>
// //         timetable.department === departmentName &&
// //         timetable.semester === semester
// //     );

// //     setEvents(filteredEvents);
// //     setTimetable(filteredTimetable);
// //   };
// //   const routes = [
// //     { key: "monday", title: "Monday" },
// //     { key: "tuesday", title: "Tuesday" },
// //     { key: "wednesday", title: "Wednesday" },
// //     { key: "thursday", title: "Thursday" },
// //     { key: "friday", title: "Friday" },
// //   ];

// //   // const renderTabBar = ({ scrollX }) => (
// //   //   <TabBar
// //   //     scrollEnabled={false}
// //   //     style={{ backgroundColor: "#fff" }}
// //   //     indicatorStyle={{ backgroundColor: "#007bff" }}
// //   //     tabStyle={{ width: 100 }}
// //   //     labelStyle={{ textAlign: "center" }}
// //   //     scrollX={scrollX}
// //   //   >
// //   //     <TabBar.Tab label="Monday" />
// //   //     <TabBar.Tab label="Tuesday" />
// //   //     <TabBar.Tab label="Wednesday" />
// //   //     <TabBar.Tab label="Thursday" />
// //   //     <TabBar.Tab label="Friday" />
// //   //   </TabBar>
// //   // );
// //   const renderTabBar = ({ navigationState }) => (
// //     <TabBar
// //       scrollEnabled={false}
// //       style={{ backgroundColor: "#fff" }}
// //       indicatorStyle={{ backgroundColor: "#007bff" }}
// //       tabStyle={{ width: 100 }}
// //       labelStyle={{ textAlign: "center" }}
// //       navigationState={navigationState} // Pass navigationState
// //     >
// //       {navigationState.routes.map((route, index) => (
// //         <TabBar.Tab key={index} label={route.title} />
// //       ))}
// //     </TabBar>
// //   );
// //   const renderTabView = ({ navigationState }) => {
// //     const { index } = navigationState;

// //     const dayEvents = events.filter(
// //       (event) =>
// //         moment(event.startTime).format("dddd") === moment().format("dddd")
// //     );

// //     const dayTimetable = timetable.filter(
// //       (timetable) =>
// //         moment(timetable.startTime).format("dddd") === moment().format("dddd")
// //     );

// //     const dayTeachers = teachers.filter(
// //       (teacher) =>
// //         moment(teacher.timetable.startTime).format("dddd") ===
// //         moment().format("dddd")
// //     );

// //     return (
// //       <View style={styles.container}>
// //         <View style={styles.eventNotification}>
// //           {dayEvents.length > 0 &&
// //             dayEvents.map((event) => (
// //               <View key={event.id}>
// //                 <Text style={styles.eventName}>{event.title}</Text>
// //                 {event.isHoliday ? (
// //                   <Text style={styles.eventDescription}>
// //                     Institution is closed
// //                   </Text>
// //                 ) : (
// //                   <Text style={styles.eventDescription}>
// //                     Regular classes will be held
// //                   </Text>
// //                 )}
// //               </View>
// //             ))}
// //         </View>
// //         <ScrollView style={styles.timetableContainer}>
// //           {dayTimetable.map((timetable, index) => (
// //             <TimetableCard
// //               key={timetable.id}
// //               duration={timetable.duration}
// //               subjectName={timetable.subjectName}
// //               teacherName={
// //                 dayTeachers.find(
// //                   (teacher) =>
// //                     teacher.timetable.subjectName === timetable.subjectName &&
// //                     teacher.timetable.startTime === timetable.startTime
// //                 )?.teacherName
// //               }
// //             />
// //           ))}
// //         </ScrollView>
// //       </View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.filterContainer}>
// //         <TextInput
// //           style={styles.input}
// //           placeholder="School Name"
// //           value={schoolName}
// //           onChangeText={setSchoolName}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Department Name"
// //           value={departmentName}
// //           onChangeText={setDepartmentName}
// //         />
// //         <TextInput
// //           style={styles.input}
// //           placeholder="Semester"
// //           value={semester}
// //           onChangeText={setSemester}
// //         />
// //         <TouchableOpacity style={styles.button} onPress={handleFilter}>
// //           <Text style={styles.buttonText}>Filter</Text>
// //         </TouchableOpacity>
// //       </View>
// //       <TabView
// //         navigationState={{ index, routes }}
// //         renderScene={renderTabView}
// //         renderTabBar={renderTabBar}
// //         onIndexChange={setIndex}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //   },
// //   filterContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //   },
// //   input: {
// //     width: "30%",
// //     height: 40,
// //     borderColor: "#ccc",
// //     borderWidth: 1,
// //     borderRadius: 4,
// //     paddingHorizontal: 8,
// //   },
// //   button: {
// //     backgroundColor: "#007bff",
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //     borderRadius: 4,
// //   },
// //   buttonText: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },
// //   eventNotification: {
// //     padding: 16,
// //     backgroundColor: "#f5f5f5",
// //   },
// //   eventName: {
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   eventDescription: {
// //     fontSize: 14,
// //     color: "#666",
// //   },
// //   timetableContainer: {
// //     flex: 1,
// //     padding: 16,
// //   },
// // });

// // export default AdminTimetableView;
