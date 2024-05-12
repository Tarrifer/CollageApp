import React from "react";
import { View, Text, StyleSheet } from "react-native";
import subjectData from "../../database/StudentSubject.json";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TeacherSubjectTimetableScreen = ({ dayIndex }) => {
  const day = daysOfWeek[dayIndex];
  const subjects = subjectData[day] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      {subjects.length > 0 ? (
        <View style={styles.subjectsContainer}>
          {subjects.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <Text style={styles.time}>{subject.time}</Text>
              <Text style={styles.subject}>{subject.subject}</Text>
              <Text style={styles.teacher}>{subject.teacher}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>No classes today</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subjectsContainer: {
    flex: 1,
  },
  subjectCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subject: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  teacher: {
    fontSize: 14,
    color: "#666",
  },
});

export default TeacherSubjectTimetableScreen;
