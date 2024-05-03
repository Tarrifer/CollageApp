import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const StudentHomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My College App</Text>
      </View>
      <TouchableOpacity style={styles.bigCard}>
        <Text style={styles.bigCardText}>Big Card</Text>
      </TouchableOpacity>
      <View style={styles.cards}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>ERP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Timetable</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  bigCard: {
    margin: 20,

    width: "90%",
    aspectRatio: 2, // Maintain aspect ratio
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bigCardText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  header: {
    padding: 20,
    backgroundColor: "#007FFF",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    width: "40%",
    aspectRatio: 1, // Maintain aspect ratio
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StudentHomePage;
