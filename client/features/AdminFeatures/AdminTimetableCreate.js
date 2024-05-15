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
  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const toggleEditMode = (index) => {
    setEditMode(editMode === index ? null : index);
  };

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

  //   const addDepartment = () => {
  //     if (selectedDays.length === 0) {
  //       Alert.alert("Error", "Please select at least one day.");
  //       return;
  //     }

  //     if (department === "" || semester === "" || subject === "" || time === "") {
  //       Alert.alert("Error", "Please select all required fields.");
  //       return;
  //     }

  //     const newDepartment = {
  //       department,
  //       semester,
  //       subject,
  //       time,
  //     };
  //     setSelectedDepartmentName(department);
  //     selectedDays.forEach((day) => {
  //       const dayIndex = assignedSubjects.findIndex((item) => item.day === day);

  //       if (dayIndex !== -1) {
  //         const updatedTimetable = [...assignedSubjects];
  //         updatedTimetable[dayIndex].departments.push(newDepartment);
  //         setAssignedSubjects(updatedTimetable);
  //       } else {
  //         const newTimetable = {
  //           day,
  //           departments: [newDepartment],
  //         };
  //         setAssignedSubjects([...assignedSubjects, newTimetable]);
  //       }
  //     });

  //     setDepartment("");
  //     setSemester("");
  //     setSubject("");
  //     setTime("");

  //     Alert.alert("Department Added", "Department added successfully.");
  //   };
  //------------------------------
  //   const addDepartment = () => {
  //     if (!school || !department || !semester || selectedDays.length === 0) {
  //       Alert.alert("Error", "Please select all required fields.");
  //       return;
  //     }

  //     const newDepartment = {
  //       school,
  //       department,
  //       semester,
  //       days: selectedDays,
  //     };

  //     setAssignedDepartments([...assignedDepartments, newDepartment]);

  //     // Reset the selected department, semester, and time
  //     setDepartment("");
  //     setSemester("");

  //     Alert.alert("Department Added", "Department added successfully.");
  //   };
  const addDepartment = () => {
    if (
      !school ||
      !department ||
      !semester ||
      selectedDays.length === 0 ||
      school === "" ||
      department === "" ||
      semester === ""
    ) {
      Alert.alert("Error", "Please select all required fields.");
      return;
    }

    const newDepartment = {
      school,
      department,
      semester,
      days: selectedDays,
    };

    setAssignedDepartments([...assignedDepartments, newDepartment]);

    // Reset the selected department, semester, and time
    setDepartment("");
    setSemester("");

    Alert.alert("Department Added", "Department added successfully.");
  };

  const addSubject = () => {
    if (school && department && semester && subjectType && time) {
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
                  resetSelectedSubject();
                } else {
                  setSubject(itemValue);
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

        <Text style={styles.teacherText}>Teacher Name</Text>

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

        {/* {selectedDays.length > 0 && (
          <Button
            title="Add Department"
            onPress={addDepartment}
            style={styles.button}
          />
        )} */}
        <Button
          title="Add Department"
          onPress={addDepartment}
          style={styles.button}
        />

        <View style={styles.dayPickerContainer}>
          {/* <ScrollView
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
          </ScrollView> */}
          <ScrollView
            horizontal
            contentContainerStyle={styles.dayPickerContainer}
          >
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
              {/* <View style={[styles.TimeCell, { width: timeCellWidth }]}>
                <Text style={styles.timeheadertext}>Time</Text>
                
              </View> */}
              <Text style={styles.headerText}>Time</Text>
              {assignedDepartments.map((department, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.DataText}>{department.department}</Text>
                  {department.days.map((day) => (
                    <Text key={day} style={styles.DataText}>
                      {day}
                    </Text>
                  ))}
                </View>
              ))}

              {assignedSubjects.map((subject, index) => (
                <View
                  key={index}
                  style={[styles.headerCell, { width: subjectCellWidth }]}
                >
                  <Text style={styles.headerText}>{subject.time}</Text>
                </View>
              ))}
            </View>

            <View style={styles.tableRow}>
              {/* <View
                style={[
                  styles.DeptCell,
                  { width: timeCellWidth },
                  { height: subjectCellHeight },
                ]}
              >
                <Text style={styles.DataText}>{selectedDepartmentName}</Text>
              </View> */}

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
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
