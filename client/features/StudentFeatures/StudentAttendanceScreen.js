import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StudentAttendanceScreen = () => {
  // Sample data for subjects attendance
  const subjectsAttendance = [
    { subject: "Math", absent: 2, present: 18 },
    { subject: "Science", absent: 3, present: 17 },
    // Add more subjects as needed
  ];

  // Function to calculate attendance percentage
  const calculateAttendancePercentage = (absent, present) => {
    const total = absent + present;
    return ((present / total) * 100).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Subject Attendance</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>
      {subjectsAttendance.map((subject, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.subjectName}>{subject.subject}</Text>
          <View style={styles.attendanceRow}>
            <View style={[styles.attendanceItem, styles.absent]}>
              <Text style={styles.attendanceText}>
                Absent: {subject.absent}
              </Text>
            </View>
            <View style={[styles.attendanceItem, styles.present]}>
              <Text style={styles.attendanceText}>
                Present: {subject.present}
              </Text>
            </View>
          </View>
          <View style={styles.attendanceContainer}>
            <Text style={styles.attendanceLabel}>Subject Attendance</Text>
            <Text style={styles.percentage}>
              {calculateAttendancePercentage(subject.absent, subject.present)}%
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${calculateAttendancePercentage(
                    subject.absent,
                    subject.present
                  )}%`,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default StudentAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  attendanceRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  attendanceItem: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  absent: {
    backgroundColor: "red",
  },
  present: {
    backgroundColor: "green",
  },
  attendanceText: {
    color: "#fff",
  },
  attendanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  attendanceLabel: {
    color: "#000",
    fontWeight: "bold",
  },
  progressContainer: {
    height: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  percentage: {
    textAlign: "center",
  },
});
