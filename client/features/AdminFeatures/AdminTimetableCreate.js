// AdminTimetableCreate.js
import React, { useState } from "react";
import SpecialSubjectsData from "./SpecialSubjectsData";
import TimetableSlot from "./TimetableSlot";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
  } from "react-native";
const AdminTimetableCreate = () => {
  const [department, setDepartment] = useState("CEN");
  const [semester, setSemester] = useState("Fall");
  const [timetable, setTimetable] = useState([]);

  const handleGenerate = () => {
    // Generate the timetable based on the selected department and semester
    // For example, you can use a library like moment.js to calculate the start and end times
    const startTime = "08:00";
    const endTime = "17:00";
    const daySlots = 9; // 9 slots per day, from 8:00 to 17:00 with 1 hour interval
    const daysInWeek = 5; // 5 weekdays, from Monday to Friday

    const timetable = [];
    for (let day = 0; day < daysInWeek; day++) {
      const dayTimetable = [];
      for (let slot = 0; slot < daySlots; slot++) {
        const start = moment(`${startTime}:00`, "HH:mm:ss");
        const end = moment(`${startTime}:00`, "HH:mm:ss").add(1, "hours");
        dayTimetable.push({
          day: `Day ${day + 1}`,
          slot: `${slot + 1}`,
          start: start.format("HH:mm"),
          end: end.format("HH:mm"),
          subject: null,
        });
        startTime = end.format("HH:mm");
      }
      timetable.push(dayTimetable);
    }
    setTimetable(timetable);
  };

  const handleSave = () => {
    // Check if there are any empty slots or days without subjects
    const hasEmptySlots = timetable.some((day) =>
      day.some((slot) => slot.subject === null || slot.subject === "Lunch Break")
    );
  
    if (hasEmptySlots) {
      // Highlight blank spaces with red color
      const blankSpaces = document.querySelectorAll(".blank-space");
      blankSpaces.forEach((space) => {
        space.style.backgroundColor = "red";
      });
  
      // Prompt the admin to confirm if they want to save the timetable
      const confirmSave = window.confirm(
        "There are empty slots or days without subjects. Are you sure you want to save the timetable?"
      );
  
      if (confirmSave) {
        // Save the timetable with blank subjects for the empty slots or days
        const blankTimetable = timetable.map((day) =>
          day.map((slot) =>
            slot.subject === null || slot.subject === "Lunch Break"
              ? { ...slot, subject: { name: "", code: "", credits: 0, type: "regular" } }
              : slot
          )
        );
  
        // Save the timetable to the database
        // You can use a library like axios to make HTTP requests
        saveTimetableToDatabase(blankTimetable);
      }
    } else {
      // Save the timetable to the database
      // You can use a library like axios to make HTTP requests
      saveTimetableToDatabase(timetable);
    }
  };

  const handleSelectSubject = (day, slot, subject) => {
    // Update the selected subject for the specified day and slot
    const newTimetable = [...timetable];
    newTimetable[day][slot].subject = subject;
    setTimetable(newTimetable);
  };
    return (
      <ScrollView>
        <View style={styles.timetableContainer}>
          <Text style={styles.headerText}>Create Timetable</Text>
          <Text style={styles.departmentText}>
            Department: <Text style={styles.boldText}>{department}</Text>
          </Text>
          <Text style={styles.departmentText}>
            Semester: <Text style={styles.boldText}>{semester}</Text>
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleGenerate}>
            <Text style={styles.buttonText}>Generate Timetable</Text>
          </TouchableOpacity>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Day</Text>
              <Text style={styles.tableHeaderText}>Slot</Text>
              <Text style={styles.tableHeaderText}>Start Time</Text>
              <Text style={styles.tableHeaderText}>End Time</Text>
              <Text style={styles.tableHeaderText}>Subject</Text>
            </View>
            {timetable.map((day, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCellText}>{day[0].day}</Text>
                {day.map((slot, index) => (
                  <View key={index} style={styles.tableCell}>
                    <Text style={styles.tableCellText}>{slot.slot}</Text>
                    {slot.subject === null && (
                      <>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => handleSelectSubject(index, slot.slot - 1, 'Lunch Break')}
                        >
                          <Text style={styles.buttonText}>Lunch Break</Text>
                        </TouchableOpacity>
                        {SpecialSubjectsData.map((subject) => (
                          <TouchableOpacity
                            key={subject.code}
                            style={styles.button}
                            onPress={() => handleSelectSubject(index, slot.slot - 1, subject)}
                          >
                            <Text style={styles.buttonText}>{subject.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </>
                    )}
                    {slot.subject!== null && (
                      <Text style={styles.tableCellText}>{slot.subject.name}</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Timetable</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    timetableContainer: {
      flex: 1,
      padding: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    departmentText: {
      fontSize: 18,
      marginBottom: 10,
    },
    boldText: {
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    tableContainer: {
      flex: 1,
      padding: 10,
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'pace-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 10,
    },
    tableHeaderText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'pace-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    tableCell: {
      flex: 1,
      padding: 10,
    },
    tableCellText: {
      fontSize: 16,
      textAlign: 'center',
    },
  });
  
  export default AdminTimetableCreate;