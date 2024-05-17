import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Alert,
  TextInput,
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
  const [selectedSubjectType, setSelectedSubjectType] = useState("");
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

  //   const getTeacherName = (subjectName) => {
  //     const assignment = assignedSubjects.find(
  //       (subject) =>
  //         subject.selectedSchool === school &&
  //         subject.selectedDepartment === department &&
  //         subject.selectedSemester === semester &&
  //         subject.selectedSubject.SubjectName === subjectName
  //     );
  //     return assignment ? assignment.selectedTeacher : "Null";
  //   };
  const getTeacherName = (subjectName, school, department, semester) => {
    const assignment = assignedSubjects.find(
      (subject) =>
        subject.selectedSubject.SubjectName === subjectName &&
        subject.selectedSchool === school &&
        subject.selectedDepartment === department &&
        subject.selectedSemester === semester
    );
    return assignment ? assignment.selectedTeacher : "Null";
  };

  const createTimetable = () => {
    console.log("Creating timetable...");
  };

  const addDepartment = () => {
    if (!school || !department || !semester || !selectedSubjectType) {
      Alert.alert(
        "Please select School Name, Department Name, Semester Number, and Subject Type to create entries."
      );
      return;
    }

    if (
      (selectedSubjectType === "Changable" ||
        selectedSubjectType === "Unchangable" ||
        selectedSubjectType === "Null") &&
      selectedSubjectName === "Choose SubjectType First"
    ) {
      Alert.alert("Please Choose a subject name");
      return;
    }
    // if (selectedSubjectType === "") {
    //   Alert.alert("Please select a subject type before creating entries.");
    //   return;
    // }

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
        "Please select School Name",
        "Department Name,",
        "Semester Number",
        "and Subject Type to create entries."
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
        teacherName: getTeacherName(
          selectedSubjectName,
          school,
          department,
          semester
        ),
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
  const teacherName = getTeacherName(
    selectedSubjectName,
    school,
    department,
    semester
  );
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
        {schools.length > 0 && (
          <RNPicker
            selectedValue={school}
            onValueChange={(itemValue) => setSchool(itemValue)}
          >
            <RNPicker.Item label="Select School" value="" />
            {schools.map((school, index) => (
              <RNPicker.Item key={index} label={school} value={school} />
            ))}
          </RNPicker>
        )}
      </View>

      {/* Department Picker */}
      <View style={styles.pickerContainer}>
        {school && (
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
        )}
      </View>

      {/* Semester Picker */}
      <View style={styles.pickerContainer}>
        {department && semesters.length > 0 && (
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
        )}
      </View>

      {selectedDays.length > 0 && (
        <View>
          <View style={styles.pickerContainer}>
            {semester && subjectNames.length > 0 && (
              //   <RNPicker
              //     selectedValue={selectedSubjectType}
              //     onValueChange={(itemValue) => {
              //       setSelectedSubjectType(itemValue);
              //       if (itemValue === "Null") {
              //         setSelectedSubjectName("Choose SubjectType First");
              //       } else {
              //         setSelectedSubjectName("Choose subject name");
              //       }
              //     }}
              //     enabled={semester !== ""}
              //   >
              //     <RNPicker.Item label="Select Subject Type" value="" />
              //     {subjectTypes.map((type, index) => (
              //       <RNPicker.Item key={index} label={type} value={type} />
              //     ))}
              //   </RNPicker>

              <RNPicker
                selectedValue={selectedSubjectType}
                // onValueChange={(itemValue) => setSelectedSubjectType(itemValue)}
                onValueChange={(itemValue) => {
                  setSelectedSubjectType(itemValue);
                  if (itemValue === "Null") {
                    setSelectedSubjectName("");
                  }
                }}
              >
                <RNPicker.Item label="Choose Subject Type" value="" />
                {subjectTypes.map((type, index) => (
                  <RNPicker.Item key={index} label={type} value={type} />
                ))}
              </RNPicker>
            )}
          </View>

          <View style={styles.pickerContainer}>
            {selectedSubjectType !== "Null" && subjectNames.length > 0 && (
              <RNPicker
                selectedValue={selectedSubjectName}
                onValueChange={(itemValue) => setSelectedSubjectName(itemValue)}
                enabled={selectedSubjectType !== "Null"}
              >
                <RNPicker.Item label="Choose Subject Name" value="" />
                {selectedSubjectType === "Null" ? (
                  <RNPicker.Item label="SubjectName as Null" value="Null" />
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
            )}
          </View>
          {/* {selectedSubjectType !== "Null" && (
            <View style={styles.pickerContainer}>
              <TextInput
              disable
                style={styles.input}
                placeholder="Teacher Name"
                value={teacherName}
                onChangeText={(text) => setTeacherName(text)}
              />
            </View>
          )} */}
          {/* {selectedSubjectType !== "Null" && (
            <View style={styles.Teachertext}>
              <Text style={{ color: "gray", fontSize: 20, fontWeight: "bold" }}>
                {teacherName}
              </Text>
            </View>
          )} */}
          {departments
            .filter((dept) => dept.day === day)
            .map((dept, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>
                  Teacher Name: {dept.teacherName || "Null"}
                </Text>
              </View>
            ))}

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
  Teachertext: {
    margin: 10,

    padding: 10,
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
