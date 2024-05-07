import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CandidateDetailsViewScreen = ({ route }) => {
  // Destructure route params
  const { status } = route.params;

  // Sample data for testing
  const sampleData = {
    registerNumber: "123456",
    rollNumber: "A123",
    phoneNumber: "1234567890",
    email: "example@example.com",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTitWq1r4a-luuWlmEJxHZZKGdBLDGP1439qQ&s",
  };

  // Use route params if available, otherwise fallback to sample data
  const { name, school, department, year } = route.params || sampleData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{status}</Text>
      </View>
      <TouchableOpacity style={styles.card}>
        <View style={styles.imageContainer}>
          {sampleData.image && (
            <Image source={{ uri: sampleData.image }} style={styles.image} />
          )}
        </View>
        <View style={{ marginVertical: 10 }} />
        <Text style={styles.label}>Name: {name}</Text>
        <Text style={styles.label}>School: {school}</Text>
        <Text style={styles.label}>Department: {department}</Text>
        <Text style={styles.label}>Year: {year}</Text>

        <Text style={styles.label}>
          Register Number: {sampleData.registerNumber}
        </Text>
        <Text style={styles.label}>Roll Number: {sampleData.rollNumber}</Text>
        <Text style={styles.label}>Phone Number: {sampleData.phoneNumber}</Text>
        <Text style={styles.label}>Email: {sampleData.email}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
  },
  header: {
    width: "100%",
    backgroundColor: "#007FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    color: "#333",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 200,
    height: 200,
  },
  // image: {
  //   width: 200,
  //   height: 200,
  //   marginTop: 20,
  //   borderRadius: 10,
  // },
});

export default CandidateDetailsViewScreen;
