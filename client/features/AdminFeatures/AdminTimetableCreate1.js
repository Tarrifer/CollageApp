import React, { useState, useRef } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import TimetableSlot from "./TimetableSlot";

const AdminTimetableCreate = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  // const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [time, setTime] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjectType, setSubjectType] = useState("");
  const timeOptions = require("../../database/Time.json");
  const timetableData = require("../../database/Timetable.json");
  const [editMode, setEditMode] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const toggleEditMode = (index) => {
    setEditMode(editMode === index ? null : index);
  };
  // const editSubject = (index, newSubjectName, newTime) => {
  //   const updatedSubjects = [...assignedSubjects];
  //   if (updatedSubjects[index]) {
  //     updatedSubjects[index].subjectName = newSubjectName;
  //     updatedSubjects[index].time = newTime;
  //     setAssignedSubjects(updatedSubjects);
  //     setEditMode(null); // Exit edit mode after editing
  //   }
  // };
  // const subjectData = [
  //   { subject: "BDA ", time: " 9:00 AM - 10:00 AM" },
  //   { subject: "SAD ", time: "10:00 AM - 11:00 AM" },
  //   { subject: "MC ", time: "11:00 AM - 12:00 PM" },
  //   { subject: "CEN ", time: "12:55 PM -  1:50 PM" },
  //   { subject: "Lunch ", time: " 1:50 PM -  2:45 PM" },
  //   { subject: "Mini Project", time: " 2:45 PM -  3:40 PM" },
  //   { subject: "SAD Lab ", time: " 3:40 PM -  4:35 PM" },
  //   { subject: "SAD Lab", time: " 4:35 PM -  5:10 PM" },
  // ];
  const DayButton = ({ day, selected, onPress }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: selected ? "blue" : "grey",
          padding: 10,
          margin: 5,
          borderRadius: 5,
        }}
        onPress={onPress}
      >
        <Text style={{ color: "white" }}>{day}</Text>
      </TouchableOpacity>
    );
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const createTimetable = () => {
    console.log("Creating timetable...");
  };

  // const addDepartment = () => {
  //   console.log("Adding a department...");
  // };
  const addDepartment = () => {
    if (selectedDays.length === 0) {
      Alert.alert("Error", "Please select at least one day.");
      return;
    }

    if (department === "" || semester === "" || subject === "" || time === "") {
      Alert.alert("Error", "Please select all required fields.");
      return;
    }

    const newDepartment = {
      department,
      semester,
      subject,
      time,
    };

    // Add the new department to each selected day's timetable
    selectedDays.forEach((day) => {
      // Find the index of the timetable for the selected day
      const dayIndex = assignedSubjects.findIndex((item) => item.day === day);

      // If the timetable for the selected day exists, add the department
      if (dayIndex !== -1) {
        const updatedTimetable = [...assignedSubjects];
        updatedTimetable[dayIndex].departments.push(newDepartment);
        setAssignedSubjects(updatedTimetable);
      } else {
        // If the timetable for the selected day does not exist, create a new one
        const newTimetable = {
          day,
          departments: [newDepartment],
        };
        setAssignedSubjects([...assignedSubjects, newTimetable]);
      }
    });

    // Reset the selected department, semester, subject, and time
    setDepartment("");
    setSemester("");
    setSubject("");
    setTime("");

    Alert.alert("Department Added", "Department added successfully.");
  };

  // const addSubject = () => {
  //   if (school && department && semester && subjectType && time) {
  //     // Check if the selected time is already assigned for the same subject
  //     const isTimeAlreadyAssigned = assignedSubjects.some(
  //       (item) =>
  //         item.department === department &&
  //         item.semester === semester &&
  //         item.subject === subject &&
  //         item.time === time
  //     );

  //     if (!isTimeAlreadyAssigned) {
  //       const subjectName = `${school} - ${department} - ${subjectType}`;
  //       const newSubject = { department, semester, subject, time, subjectName };
  //       setAssignedSubjects([...assignedSubjects, newSubject]);
  //       Alert.alert("Subject Assigned", `${subjectName} - ${time}`);
  //       setSubjectType("");
  //       setTime("");
  //     } else {
  //       Alert.alert(
  //         "Error",
  //         "This time slot is already assigned for the selected subject."
  //       );
  //     }
  //   } else {
  //     Alert.alert("Error", "Please select all required fields.");
  //   }
  // };
  const addSubject = () => {
    if (school && department && semester && subjectType && time) {
      // Check if the selected time is already assigned for the same subject
      const isTimeAlreadyAssigned = assignedSubjects.some(
        (item) =>
          item.department === department &&
          item.semester === semester &&
          item.subject === subject &&
          item.time === time
      );

      if (!isTimeAlreadyAssigned) {
        // const subjectName = `${department} - ${semester} - ${subject}`;
        // const newSubject = { department, semester, subject, time, subjectName };
        const subjectName = `${subject}`;
        const newSubject = { department, semester, subject, time, subjectName };
        setAssignedSubjects([...assignedSubjects, newSubject]);
        Alert.alert("Subject Assigned", `${subjectName} - ${time}`);
        setSubjectType("");
        setTime("");
      } else {
        Alert.alert(
          "Error",
          "This time slot is already assigned for the selected subject."
        );
      }
    } else {
      Alert.alert("Error", "Please select all required fields.");
    }
  };

  // const addSubject = () => {
  //   if (school && department && semester && subjectType && time) {
  //     const subjectName = `${school} - ${department} - ${subjectType}`;
  //     const newSubject = { subjectName, time }; // Create a new object for the subject
  //     setAssignedSubjects([...assignedSubjects, newSubject]); // Update assignedSubjects array
  //     Alert.alert("Subject Assigned", `${subjectName} - ${time}`);
  //     setSubjectType("");
  //     setTime("");
  //   } else {
  //     Alert.alert("Error", "Please select all required fields.");
  //   }
  // };
  const resetSelectedSubject = () => {
    setSubject("");
  };

  return (
    <ScrollView style={{ backgroundColor: "#FFF5EE" }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          Please select school first
        </Text>
      </View>
      <View style={styles.container}>
        {/* <Picker
          selectedValue={school}
          onValueChange={(itemValue) => setSchool(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select School" value="" />
          {timetableData.map((item) => (
            <Picker.Item
              key={item.SchoolName}
              label={item.SchoolName}
              value={item.SchoolName}
            />
          ))}
        </Picker> */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Selected School: {school}</Text>
          <Picker
            selectedValue={school}
            onValueChange={(itemValue) => setSchool(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select School" value="" />
            {timetableData.map((item) => (
              <Picker.Item
                key={item.SchoolName}
                label={item.SchoolName}
                value={item.SchoolName}
              />
            ))}
          </Picker>
        </View>

        {/* {school && (
          <Picker
            selectedValue={department}
            onValueChange={(itemValue) => setDepartment(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
               
            <Picker.Item label="Select Department" value="" />
            {timetableData.find((item) => item.SchoolName === school)
              ?.Departments &&
              Object.keys(
                timetableData.find((item) => item.SchoolName === school)
                  .Departments
              ).map((dept) => (
                <Picker.Item key={dept} label={dept} value={dept} />
              ))}
          </Picker>
        )}

        {department && (
          <Picker
            selectedValue={semester}
            onValueChange={(itemValue) => setSemester(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Semester" value="" />
            {timetableData.find((item) => item.SchoolName === school)
              ?.Departments[department] &&
              Object.keys(
                timetableData.find((item) => item.SchoolName === school)
                  .Departments[department]
              ).map((sem) => <Picker.Item key={sem} label={sem} value={sem} />)}
          </Picker>
        )}
      
        {semester && (
          <Picker
            selectedValue={subject}
            onValueChange={(itemValue) => {
              if (subjectType === "Null") {
                resetSelectedSubject(); // Reset the selected subject if Subject Type is "Null"
              } else {
                setSubject(itemValue); // Set the selected subject
              }
            }}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Subject" value="" />
            {timetableData.find((item) => item.SchoolName === school)
              ?.Departments[department][semester] &&
              timetableData
                .find((item) => item.SchoolName === school)
                .Departments[department][semester].map((sub) => (
                  <Picker.Item
                    key={sub.SubjectCode}
                    label={sub.SubjectName}
                    value={sub.SubjectName}
                  />
                ))}
          </Picker>
        )} */}

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Department:</Text>
          <Picker
            selectedValue={department}
            onValueChange={(itemValue) => setDepartment(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Department" value="" />
            {timetableData.find((item) => item.SchoolName === school)
              ?.Departments &&
              Object.keys(
                timetableData.find((item) => item.SchoolName === school)
                  .Departments
              ).map((dept) => (
                <Picker.Item key={dept} label={dept} value={dept} />
              ))}
          </Picker>
        </View>

        {department && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Semester:</Text>
            <Picker
              selectedValue={semester}
              onValueChange={(itemValue) => setSemester(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Semester" value="" />
              {timetableData.find((item) => item.SchoolName === school)
                ?.Departments[department] &&
                Object.keys(
                  timetableData.find((item) => item.SchoolName === school)
                    .Departments[department]
                ).map((sem) => (
                  <Picker.Item key={sem} label={sem} value={sem} />
                ))}
            </Picker>
          </View>
        )}

        {semester && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Subject:</Text>
            <Picker
              selectedValue={subject}
              onValueChange={(itemValue) => {
                if (subjectType === "Null") {
                  resetSelectedSubject(); // Reset the selected subject if Subject Type is "Null"
                } else {
                  setSubject(itemValue); // Set the selected subject
                }
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select Subject" value="" />
              {timetableData.find((item) => item.SchoolName === school)
                ?.Departments[department][semester] &&
                timetableData
                  .find((item) => item.SchoolName === school)
                  .Departments[department][semester].map((sub) => (
                    <Picker.Item
                      key={sub.SubjectCode}
                      label={sub.SubjectName}
                      value={sub.SubjectName}
                    />
                  ))}
            </Picker>
          </View>
        )}

        {/* 
        {semester && (
          <Picker
            selectedValue={subject}
            onValueChange={(itemValue) => setSubject(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Subject" value="" />
            {timetableData.find((item) => item.SchoolName === school)
              ?.Departments[department][semester] &&
              timetableData
                .find((item) => item.SchoolName === school)
                .Departments[department][semester].map((sub) => (
                  <Picker.Item
                    key={sub.SubjectCode}
                    label={sub.SubjectName}
                    value={sub.SubjectName}
                  />
                ))}
          </Picker>
        )} */}

        <Text style={styles.teacherText}>Teacher Name</Text>
        {/* <View style={{ marginTop: 20 }}>
          <Picker
            selectedValue={subjectType}
            onValueChange={(itemValue) => setSubjectType(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Subject Type" value="" />
            <Picker.Item label="Changeable" value="Changeable" />
            <Picker.Item label="Unchangeable" value="Unchangeable" />
            <Picker.Item label="Null" value="Null" />
          </Picker>
        </View> */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Subject Type:</Text>
          <Picker
            selectedValue={subjectType}
            onValueChange={(itemValue) => {
              setSubjectType(itemValue);
              if (itemValue === "Null") {
                resetSelectedSubject();
              }
            }}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Subject Type" value="" />
            <Picker.Item label="Changeable" value="Changeable" />
            <Picker.Item label="Unchangeable" value="Unchangeable" />
            <Picker.Item label="Null" value="Null" />
          </Picker>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Select Time Duration:</Text>
          <Picker
            selectedValue={time}
            onValueChange={(itemValue) => setTime(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Select Time" value="" />
            {timeOptions.map((timeOption, index) => (
              <Picker.Item key={index} label={timeOption} value={timeOption} />
            ))}
          </Picker>
        </View>

        <Button title="Add Subject" onPress={addSubject} />

        <View style={{ marginVertical: 5 }} />
        <Button
          title="Edit Subject"
          // onPress={editSubject}
        />

        <View style={{ marginVertical: 5 }} />

        {selectedDays.length > 0 && (
          <Button
            title="Add Department"
            onPress={addDepartment}
            style={styles.button}
          />
        )}

        <View style={styles.dayPickerContainer}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.dayPickerContainer}
          >
            <DayButton
              day="Monday"
              selected={selectedDays.includes("Monday")}
              onPress={() => toggleDay("Monday")}
            />
            <DayButton
              day="Tuesday"
              selected={selectedDays.includes("Tuesday")}
              onPress={() => toggleDay("Tuesday")}
            />
            <DayButton
              day="Wednesday"
              selected={selectedDays.includes("Wednesday")}
              onPress={() => toggleDay("Wednesday")}
            />
            <DayButton
              day="Thursday"
              selected={selectedDays.includes("Thursday")}
              onPress={() => toggleDay("Thursday")}
            />
            <DayButton
              day="Friday"
              selected={selectedDays.includes("Friday")}
              onPress={() => toggleDay("Friday")}
            />
            <DayButton
              day="Saturday"
              selected={selectedDays.includes("Saturday")}
              onPress={() => toggleDay("Saturday")}
            />
            <DayButton
              day="Sunday"
              selected={selectedDays.includes("Sunday")}
              onPress={() => toggleDay("Sunday")}
            />
          </ScrollView>
        </View>

        <Button title="Create Timetable" onPress={createTimetable} />
        <ScrollView horizontal>
          <View style={styles.tableContainer}>
            <Text
              style={{
                textAlign: "auto",

                padding: 10,
                backgroundColor: "lightblue",
                fontWeight: "bold",
                fontSize: 25,
                paddingLeft: 10,
              }}
            >
              Monday
            </Text>
            <View style={styles.tableRow}>
              <View style={[styles.TimeCell, { width: timeCellWidth }]}>
                <Text style={styles.timeheadertext}>Time</Text>
              </View>
              {/* {subjectData.map((subject, index) => (
                <View
                  key={index}
                  style={[styles.headerCell, { width: subjectCellWidth }]}
                >
                  <Text style={styles.headerText}>{subject.time}</Text>
                </View>
              ))} */}
              {assignedSubjects.map((subject, index) => (
                <View
                  key={index}
                  style={[styles.headerCell, { width: subjectCellWidth }]}
                >
                  <Text style={styles.headerText}>{subject.time}</Text>
                </View>
              ))}
              {/* {assignedSubjects.map((subject, index) => (
                <View key={index} style={[styles.tableRow]}>
                  <View style={[styles.headerCell, { width: timeCellWidth }]}>
                    <Text style={styles.headerText}>{subject.time}</Text>
                  </View>
                  <View style={[styles.DataCell, { width: subjectCellWidth }]}>
                    {editMode === index ? (
                      <View>
                        <TextInput
                          placeholder="Enter new subject name"
                          value={subject.subjectName}
                          onChangeText={(text) => {
                            const updatedSubjects = [...assignedSubjects];
                            updatedSubjects[index].subjectName = text;
                            setAssignedSubjects(updatedSubjects);
                          }}
                          style={{ marginBottom: 5 }}
                        />
                        <Picker
                          selectedValue={subject.time}
                          onValueChange={(itemValue) => {
                            const updatedSubjects = [...assignedSubjects];
                            updatedSubjects[index].time = itemValue;
                            setAssignedSubjects(updatedSubjects);
                          }}
                          style={[styles.picker, { marginBottom: 5 }]}
                          itemStyle={styles.pickerItem}
                        >
                          <Picker.Item label="Select Time" value="" />
                          {timeOptions.map((timeOption, index) => (
                            <Picker.Item
                              key={index}
                              label={timeOption}
                              value={timeOption}
                            />
                          ))}
                        </Picker>
                        <Button
                          title="Save"
                          onPress={() =>
                            editSubject(
                              index,
                              subject.subjectName,
                              subject.time
                            )
                          }
                        />
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => toggleEditMode(index)}
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.DataText}>
                          {subject.subjectName}
                        </Text>
                        <Text style={{ color: "blue", marginLeft: 5 }}>
                          Edit
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))} */}
            </View>

            <View style={styles.tableRow}>
              <View
                style={[
                  styles.DeptCell,
                  { width: timeCellWidth },
                  { height: subjectCellHeight },
                ]}
              >
                <Text style={styles.DataText}>Dept</Text>
              </View>
              {/* {subjectData.map((subject, index) => (
                <View
                  key={index}
                  style={[
                    styles.DataCell,
                    { width: subjectCellWidth },
                    { height: subjectCellHeight },
                  ]}
                >
                  <Text style={styles.DataText}>{subject.subject}</Text>
                </View>
              ))} */}
              {assignedSubjects.map((subject, index) => (
                <View
                  key={index}
                  style={[
                    styles.DataCell,
                    { width: subjectCellWidth },
                    { height: subjectCellHeight },
                  ]}
                >
                  <Text style={styles.DataText}>{subject.subjectName}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
const timeCellWidth = 100;
const subjectCellWidth = 100;
const subjectCellHeight = 50;

const DayButton = ({ day, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: selected ? "blue" : "grey",
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white" }}>{day}</Text>
    </TouchableOpacity>
  );
};

export default AdminTimetableCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dayPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#0096FF",
  },
  TimeCell: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#6495ED",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 11,
  },
  timeheadertext: {
    fontWeight: "bold",
    fontSize: 21,
  },
  DeptCell: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 9,
    backgroundColor: "#40E0D0",
  },
  DataCell: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 28,
    backgroundColor: "#00FFFF",
  },
  DataText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  button: {
    marginTop: 10,
  },
  teacherText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#F0FFFF",
    marginBottom: 10,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

// import React, { useState } from "react";
// import {
//   View,
//   Button,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   ScrollView,
// } from "react-native"; // Assuming you're using React Native
// import { Picker } from "@react-native-picker/picker";

// const AdminTimetableCreate = () => {
//   const [school, setSchool] = useState("");
//   const [department, setDepartment] = useState("");
//   const [semester, setSemester] = useState("");
//   const [subject, setSubject] = useState("");
//   // const [oddEven, setOddEven] = useState("");
//   const [selectedDays, setSelectedDays] = useState([]);
//   const [showAddDepartment, setShowAddDepartment] = useState(false);
//   // Parse Timetable.json data
//   const timetableData = require("../../database/Timetable.json");
//   const timeOptions = require("../../database/Time.json");

//   const toggleDay = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter((item) => item !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//     setShowAddDepartment(selectedDays.length > 0);
//   };
//   // Function to handle timetable creation
//   const createTimetable = () => {
//     // Implement logic to create timetable using selected data
//     console.log("Creating timetable...");
//   };
//   const addDepartment = () => {
//     // Implement logic to add a department
//     console.log("Adding a department...");
//   };
//   return (
//      <View style={styles.container}>
//       {/* School Picker */}
//       <Picker
//         selectedValue={school}
//         onValueChange={(itemValue) => setSchool(itemValue)}
//       >
//         <Picker.Item label="Select School" value="" />
//         {timetableData.map((item) => (
//           <Picker.Item
//             key={item.SchoolName}
//             label={item.SchoolName}
//             value={item.SchoolName}
//           />
//         ))}
//       </Picker>

//       {/* Department Picker */}
//       {school && (
//         <Picker
//           selectedValue={department}
//           onValueChange={(itemValue) => setDepartment(itemValue)}
//         >
//           <Picker.Item label="Select Department" value="" />
//           {timetableData.find((item) => item.SchoolName === school)
//             ?.Departments &&
//             Object.keys(
//               timetableData.find((item) => item.SchoolName === school)
//                 .Departments
//             ).map((dept) => (
//               <Picker.Item key={dept} label={dept} value={dept} />
//             ))}
//         </Picker>
//       )}

//       {/* Semester Picker */}
//       {department && (
//         <Picker
//           selectedValue={semester}
//           onValueChange={(itemValue) => setSemester(itemValue)}
//         >
//           <Picker.Item label="Select Semester" value="" />
//           {timetableData.find((item) => item.SchoolName === school)
//             ?.Departments[department] &&
//             Object.keys(
//               timetableData.find((item) => item.SchoolName === school)
//                 .Departments[department]
//             ).map((sem) => <Picker.Item key={sem} label={sem} value={sem} />)}
//         </Picker>
//       )}

//       {/* Subject Picker */}
//       {semester && (
//         <Picker
//           selectedValue={subject}
//           onValueChange={(itemValue) => setSubject(itemValue)}
//         >
//           <Picker.Item label="Select Subject" value="" />
//           {timetableData.find((item) => item.SchoolName === school)
//             ?.Departments[department][semester] &&
//             timetableData
//               .find((item) => item.SchoolName === school)
//               .Departments[department][semester].map((sub) => (
//                 <Picker.Item
//                   key={sub.SubjectCode}
//                   label={sub.SubjectName}
//                   value={sub.SubjectName}
//                 />
//               ))}
//         </Picker>
//       )}

//       {/* Odd/Even Picker */}
//       {/* <Picker
//         selectedValue={oddEven}
//         onValueChange={(itemValue) => setOddEven(itemValue)}
//       >
//         <Picker.Item label="Select Odd/Even" value="" />
//         <Picker.Item label="Odd" value="Odd" />
//         <Picker.Item label="Even" value="Even" />
//       </Picker> */}

//       {/* Day Picker */}
//       {/* Assuming multi-select for days */}
//       {/* <Picker
//         selectedValue={selectedDays}
//         onValueChange={(itemValue) => setSelectedDays(itemValue)}
//         mode="multiple"
//       >
//         <Picker.Item label="Select Days" value="" />
//         <Picker.Item label="Monday" value="Monday" />
//         <Picker.Item label="Tuesday" value="Tuesday" />
//         <Picker.Item label="Wednesday" value="Wednesday" />
//         <Picker.Item label="Thursday" value="Thursday" />
//         <Picker.Item label="Friday" value="Friday" />
//         <Picker.Item label="Saturday" value="Saturday" />
//         <Picker.Item label="Sunday" value="Sunday" />
//       </Picker> */}
//       <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
//         <DayButton
//           day="Monday"
//           selected={selectedDays.includes("Monday")}
//           onPress={() => toggleDay("Monday")}
//         />
//         <DayButton
//           day="Tuesday"
//           selected={selectedDays.includes("Tuesday")}
//           onPress={() => toggleDay("Tuesday")}
//         />
//         <DayButton
//           day="Wednesday"
//           selected={selectedDays.includes("Wednesday")}
//           onPress={() => toggleDay("Wednesday")}
//         />
//         <DayButton
//           day="Thursday"
//           selected={selectedDays.includes("Thursday")}
//           onPress={() => toggleDay("Thursday")}
//         />
//         <DayButton
//           day="Friday"
//           selected={selectedDays.includes("Friday")}
//           onPress={() => toggleDay("Friday")}
//         />
//         <DayButton
//           day="Saturday"
//           selected={selectedDays.includes("Saturday")}
//           onPress={() => toggleDay("Saturday")}
//         />
//         <DayButton
//           day="Sunday"
//           selected={selectedDays.includes("Sunday")}
//           onPress={() => toggleDay("Sunday")}
//         />
//       </View>
//       {/* Add/Edit Icon */}
//       {/* Placeholder for add/edit icon */}

//       <Button title="Create Timetable" onPress={createTimetable} />
//       {showAddDepartment && (
//         <Button
//           title="Add Department"
//           onPress={addDepartment}
//           style={styles.button}
//         />
//       )}
//       <View style={styles.tableContainer}>
//         {/* Table Header */}
//         {/* <Text>
//           <TimetableSlot />
//         </Text> */}
//         <View style={styles.tableRow}>
//           <View style={styles.DaysCell}>
//             <Text style={styles.headerText}>Monday</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>9:00 AM - 10:00 AM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>10:00 AM - 11:00 AM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>11:00 AM - 12:00 PM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>12:55 PM - 1:50 PM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>1:50 PM - 2:45 PM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>2:45 PM - 3:40 PM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>3:40 PM - 4:35 PM</Text>
//           </View>
//           <View style={styles.headerCell}>
//             <Text style={styles.headerText}>4:35 PM - 5:10 PM</Text>
//           </View>
//         </View>
//         <View style={styles.tableRow}>
//           <View style={styles.DeptCell}>
//             <Text style={styles.DataText}>Department Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//           <View style={styles.DataCell}>
//             <Text style={styles.DataText}>Subject Name</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };
// const DayButton = ({ day, selected, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={{
//         backgroundColor: selected ? "blue" : "grey",
//         padding: 10,
//         margin: 5,
//         borderRadius: 5,
//       }}
//       onPress={onPress}
//     >
//       <Text style={{ color: "white" }}>{day}</Text>
//     </TouchableOpacity>
//   );
// };

// export default AdminTimetableCreate;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   dayPickerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   tableContainer: {
//     marginTop: 20,
//   },
//   tableRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerCell: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000",
//     paddingVertical: 10,
//     backgroundColor: "#0096FF",
//   },
//   DaysCell: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000",
//     paddingVertical: 30,
//     // backgroundColor: "#CCCCFF",
//     backgroundColor: "#6495ED",
//   },
//   headerText: {
//     fontWeight: "bold",
//     fontSize: 11,
//   },
//   DeptCell: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000",
//     paddingVertical: 4,
//     backgroundColor: "#40E0D0",
//   },
//   DataCell: {
//     flex: 1,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#000",
//     paddingVertical: 10,
//     backgroundColor: "#00FFFF",
//   },
//   DataText: {
//     fontWeight: "bold",
//     fontSize: 11,
//   },
// });
//--------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import {
//   Text,
//   View,
//   Button,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import timetableData from "../../database/Timetable.json";

// const AdminTimetableCreate = () => {
//   // State variables to store selected options
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedSemesterType, setSelectedSemesterType] = useState("");
//   const [selectedConstSubject, setSelectedConstSubject] = useState("");
//   const [selectedDays, setSelectedDays] = useState([]);

//   // State variable to store timetable data
//   const [timetable, setTimetable] = useState([]);

//   // Fetch data from JSON file
//   useEffect(() => {
//     // Fetch data from JSON file based on selected options
//     // You can implement this logic based on your specific requirements
//     // For simplicity, I'm just setting a sample timetable here
//     setTimetable([
//       {
//         day: "Monday",
//         timeSlots: ["Subject A", "Subject B", "", "", "", "", "", ""],
//       },
//       {
//         day: "Tuesday",
//         timeSlots: ["", "", "Subject C", "Subject D", "", "", "", ""],
//       },
//       // Add more days as needed
//     ]);
//   }, [
//     selectedSchool,
//     selectedDepartment,
//     selectedSemester,
//     selectedSubject,
//     selectedSemesterType,
//     selectedConstSubject,
//     selectedDays,
//   ]);

//   // Function to handle timetable editing
//   const handleEditTimetable = () => {
//     // Implement edit functionality here
//   };

//   return (
//     <ScrollView>
//       {/* Search options */}
//       <View style={styles.container}>
//         {/* Picker for selecting SchoolName */}
//         <Picker
//           selectedValue={selectedSchool}
//           onValueChange={(itemValue) => setSelectedSchool(itemValue)}
//         >
//           <Picker.Item label="Select SchoolName" value="" />
//           {timetableData.map((school) => (
//             <Picker.Item
//               key={school.SchoolShortName}
//               label={school.SchoolName}
//               value={school.SchoolShortName}
//             />
//           ))}
//         </Picker>

//         {/* Picker for selecting DepartmentName */}
//         <Picker
//           selectedValue={selectedDepartment}
//           onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
//         >
//           <Picker.Item label="Select DepartmentName" value="" />
//           {/* Populate options based on selected school */}
//           {selectedSchool &&
//             timetableData.find(
//               (school) => school.SchoolShortName === selectedSchool
//             )?.Departments &&
//             Object.keys(
//               timetableData.find(
//                 (school) => school.SchoolShortName === selectedSchool
//               ).Departments
//             ).map((department) => (
//               <Picker.Item
//                 key={department}
//                 label={department}
//                 value={department}
//               />
//             ))}
//         </Picker>

//         {/* Picker for selecting SemesterNumber */}
//         <Picker
//           selectedValue={selectedSemester}
//           onValueChange={(itemValue) => setSelectedSemester(itemValue)}
//         >
//           <Picker.Item label="Select SemesterNumber" value="" />
//           {/* Populate options based on selected department */}
//           {selectedDepartment &&
//             timetableData.find(
//               (school) => school.SchoolShortName === selectedSchool
//             )?.Departments[selectedDepartment] &&
//             Object.keys(
//               timetableData.find(
//                 (school) => school.SchoolShortName === selectedSchool
//               ).Departments[selectedDepartment]
//             ).map((semester) => (
//               <Picker.Item key={semester} label={semester} value={semester} />
//             ))}
//         </Picker>

//         {/* Picker for selecting SubjectName */}
//         <Picker
//           selectedValue={selectedSubject}
//           onValueChange={(itemValue) => setSelectedSubject(itemValue)}
//         >
//           <Picker.Item label="Select SubjectName" value="" />
//           {/* Populate options based on selected semester */}
//           {selectedSemester &&
//             timetableData
//               .find((school) => school.SchoolShortName === selectedSchool)
//               ?.Departments[selectedDepartment][selectedSemester].map(
//                 (subject) => (
//                   <Picker.Item
//                     key={subject.SubjectCode}
//                     label={subject.SubjectName}
//                     value={subject.SubjectCode}
//                   />
//                 )
//               )}
//         </Picker>

//         {/* Picker for selecting Odd or Even Semester */}
//         <Picker
//           selectedValue={selectedSemesterType}
//           onValueChange={(itemValue) => setSelectedSemesterType(itemValue)}
//         >
//           <Picker.Item label="Select Odd or Even Semester" value="" />
//           <Picker.Item label="Odd" value="Odd" />
//           <Picker.Item label="Even" value="Even" />
//         </Picker>

//         {/* Picker for selecting Constant Subject */}
//         <Picker
//           selectedValue={selectedConstSubject}
//           onValueChange={(itemValue) => setSelectedConstSubject(itemValue)}
//         >
//           <Picker.Item label="Select Constant Subject" value="" />
//           {/* Populate options based on selected semester */}
//           {selectedSemester &&
//             timetableData
//               .find((school) => school.SchoolShortName === selectedSchool)
//               ?.Departments[selectedDepartment][selectedSemester].map(
//                 (subject) => (
//                   <Picker.Item
//                     key={subject.SubjectCode}
//                     label={subject.SubjectName}
//                     value={subject.SubjectCode}
//                   />
//                 )
//               )}
//         </Picker>

//         {/* Multi-selection for selecting days */}
//         <Picker
//           selectedValue={selectedDays}
//           onValueChange={(itemValue) => setSelectedDays(itemValue)}
//           mode="multiple"
//         >
//           <Picker.Item label="Select Days" value={[]} />
//           <Picker.Item label="Monday" value="Monday" />
//           <Picker.Item label="Tuesday" value="Tuesday" />
//           <Picker.Item label="Wednesday" value="Wednesday" />
//           <Picker.Item label="Thursday" value="Thursday" />
//           <Picker.Item label="Friday" value="Friday" />
//           <Picker.Item label="Saturday" value="Saturday" />
//           <Picker.Item label="Sunday" value="Sunday" />
//         </Picker>

//         {/* Edit icon */}
//         <TouchableOpacity onPress={handleEditTimetable}>
//           <Text>Edit</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Tabular UI for displaying timetable */}
//       <View style={styles.timetableContainer}>
//         <ScrollView horizontal>
//           <View>
//             {/* Render timetable data */}
//             {timetable.map((item) => (
//               <View key={item.day} style={styles.row}>
//                 <Text>{item.day}</Text>
//                 {item.timeSlots.map((slot, index) => (
//                   <Text key={index}>{slot}</Text>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 10,
//   },
//   timetableContainer: {
//     flex: 1,
//     marginVertical: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
// });

// export default AdminTimetableCreate;
//-------------------------------------------
// // AdminTimetableCreate.js
// import React, { useState } from "react";
// import SpecialSubjectsData from "./SpecialSubjectsData";
// import TimetableSlot from "./TimetableSlot";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     Alert,
//   } from "react-native";
// const AdminTimetableCreate = () => {
//   const [department, setDepartment] = useState("CEN");
//   const [semester, setSemester] = useState("Fall");
//   const [timetable, setTimetable] = useState([]);

//   const handleGenerate = () => {
//     // Generate the timetable based on the selected department and semester
//     // For example, you can use a library like moment.js to calculate the start and end times
//     const startTime = "08:00";
//     const endTime = "17:00";
//     const daySlots = 9; // 9 slots per day, from 8:00 to 17:00 with 1 hour interval
//     const daysInWeek = 5; // 5 weekdays, from Monday to Friday

//     const timetable = [];
//     for (let day = 0; day < daysInWeek; day++) {
//       const dayTimetable = [];
//       for (let slot = 0; slot < daySlots; slot++) {
//         const start = moment(`${startTime}:00`, "HH:mm:ss");
//         const end = moment(`${startTime}:00`, "HH:mm:ss").add(1, "hours");
//         dayTimetable.push({
//           day: `Day ${day + 1}`,
//           slot: `${slot + 1}`,
//           start: start.format("HH:mm"),
//           end: end.format("HH:mm"),
//           subject: null,
//         });
//         startTime = end.format("HH:mm");
//       }
//       timetable.push(dayTimetable);
//     }
//     setTimetable(timetable);
//   };

//   const handleSave = () => {
//     // Check if there are any empty slots or days without subjects
//     const hasEmptySlots = timetable.some((day) =>
//       day.some((slot) => slot.subject === null || slot.subject === "Lunch Break")
//     );

//     if (hasEmptySlots) {
//       // Highlight blank spaces with red color
//       const blankSpaces = document.querySelectorAll(".blank-space");
//       blankSpaces.forEach((space) => {
//         space.style.backgroundColor = "red";
//       });

//       // Prompt the admin to confirm if they want to save the timetable
//       const confirmSave = window.confirm(
//         "There are empty slots or days without subjects. Are you sure you want to save the timetable?"
//       );

//       if (confirmSave) {
//         // Save the timetable with blank subjects for the empty slots or days
//         const blankTimetable = timetable.map((day) =>
//           day.map((slot) =>
//             slot.subject === null || slot.subject === "Lunch Break"
//               ? { ...slot, subject: { name: "", code: "", credits: 0, type: "regular" } }
//               : slot
//           )
//         );

//         // Save the timetable to the database
//         // You can use a library like axios to make HTTP requests
//         saveTimetableToDatabase(blankTimetable);
//       }
//     } else {
//       // Save the timetable to the database
//       // You can use a library like axios to make HTTP requests
//       saveTimetableToDatabase(timetable);
//     }
//   };

//   const handleSelectSubject = (day, slot, subject) => {
//     // Update the selected subject for the specified day and slot
//     const newTimetable = [...timetable];
//     newTimetable[day][slot].subject = subject;
//     setTimetable(newTimetable);
//   };
//     return (
//       <ScrollView>
//         <View style={styles.timetableContainer}>
//           <Text style={styles.headerText}>Create Timetable</Text>
//           <Text style={styles.departmentText}>
//             Department: <Text style={styles.boldText}>{department}</Text>
//           </Text>
//           <Text style={styles.departmentText}>
//             Semester: <Text style={styles.boldText}>{semester}</Text>
//           </Text>
//           <TouchableOpacity style={styles.button} onPress={handleGenerate}>
//             <Text style={styles.buttonText}>Generate Timetable</Text>
//           </TouchableOpacity>
//           <View style={styles.tableContainer}>
//             <View style={styles.tableHeader}>
//               <Text style={styles.tableHeaderText}>Day</Text>
//               <Text style={styles.tableHeaderText}>Slot</Text>
//               <Text style={styles.tableHeaderText}>Start Time</Text>
//               <Text style={styles.tableHeaderText}>End Time</Text>
//               <Text style={styles.tableHeaderText}>Subject</Text>
//             </View>
//             {timetable.map((day, index) => (
//               <View key={index} style={styles.tableRow}>
//                 <Text style={styles.tableCellText}>{day[0].day}</Text>
//                 {day.map((slot, index) => (
//                   <View key={index} style={styles.tableCell}>
//                     <Text style={styles.tableCellText}>{slot.slot}</Text>
//                     {slot.subject === null && (
//                       <>
//                         <TouchableOpacity
//                           style={styles.button}
//                           onPress={() => handleSelectSubject(index, slot.slot - 1, 'Lunch Break')}
//                         >
//                           <Text style={styles.buttonText}>Lunch Break</Text>
//                         </TouchableOpacity>
//                         {SpecialSubjectsData.map((subject) => (
//                           <TouchableOpacity
//                             key={subject.code}
//                             style={styles.button}
//                             onPress={() => handleSelectSubject(index, slot.slot - 1, subject)}
//                           >
//                             <Text style={styles.buttonText}>{subject.name}</Text>
//                           </TouchableOpacity>
//                         ))}
//                       </>
//                     )}
//                     {slot.subject!== null && (
//                       <Text style={styles.tableCellText}>{slot.subject.name}</Text>
//                     )}
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//           <TouchableOpacity style={styles.button} onPress={handleSave}>
//             <Text style={styles.buttonText}>Save Timetable</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     );
//   };

//   const styles = StyleSheet.create({
//     timetableContainer: {
//       flex: 1,
//       padding: 20,
//     },
//     headerText: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     departmentText: {
//       fontSize: 18,
//       marginBottom: 10,
//     },
//     boldText: {
//       fontWeight: 'bold',
//     },
//     button: {
//       backgroundColor: '#007bff',
//       padding: 10,
//       borderRadius: 5,
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 18,
//     },
//     tableContainer: {
//       flex: 1,
//       padding: 10,
//     },
//     tableHeader: {
//       flexDirection: 'row',
//       justifyContent: 'pace-between',
//       alignItems: 'center',
//       backgroundColor: '#f8f9fa',
//       padding: 10,
//     },
//     tableHeaderText: {
//       fontSize: 18,
//       fontWeight: 'bold',
//     },
//     tableRow: {
//       flexDirection: 'row',
//       justifyContent: 'pace-between',
//       alignItems: 'center',
//       padding: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ddd',
//     },
//     tableCell: {
//       flex: 1,
//       padding: 10,
//     },
//     tableCellText: {
//       fontSize: 16,
//       textAlign: 'center',
//     },
//   });

//   export default AdminTimetableCreate;
