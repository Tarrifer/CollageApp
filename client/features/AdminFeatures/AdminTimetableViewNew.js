import React, { useState } from "react";
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
  const subjectNames = [
    "Choose subject name",
    "Subject Name 1",
    "Subject Name 2",
    "Subject Name 3",
    "Subject Name 4",
  ];

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

  const addDepartment = () => {
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
        teacherName: "Teacher Name", // Replace with actual teacher name
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
                subjectNames.map((name, index) => (
                  <RNPicker.Item key={index} label={name} value={name} />
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
              {day} Entries ({departments.filter((d) => d.day === day).length})
            </Text>
          </TouchableOpacity>

          {dayEntriesVisibility[day] &&
            departments
              .filter((dept) => dept.day === day)
              .map((dept, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.cardText}>Time: {dept.time}</Text>
                  <Text style={styles.cardText}>
                    Subject Type: {dept.subjectType}
                  </Text>
                  <Text style={styles.cardText}>
                    Subject Name: {dept.subjectName}
                  </Text>
                  <Text style={styles.cardText}>
                    Teacher Name: {dept.teacherName}
                  </Text>

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
});

export default AdminTimetableView;
