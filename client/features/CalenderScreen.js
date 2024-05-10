import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CalendarScreen = () => {
  // Sample events data
  const events = [
    {
      name: "Event 1",
      date: "2024-05-15",
      description: "Description of Event 1",
    },
    {
      name: "Event 2",
      date: "2024-05-20",
      description: "Description of Event 2",
    },
    {
      name: "Event 3",
      date: "2024-06-01",
      description: "Description of Event 3",
    },
    // Add default holidays like Bihu
    {
      name: "Bihu",
      date: "2024-04-14",
      description: "Assamese New Year Festival",
    },
    {
      name: "Bihu",
      date: "2024-04-14",
      description: "Assamese New Year Festival",
    },
    {
      name: "Bihu",
      date: "2024-04-14",
      description: "Assamese New Year Festival",
    },
    {
      name: "Bihu",
      date: "2024-04-14",
      description: "Assamese New Year Festival",
    },
    {
      name: "Bihu",
      date: "2024-04-14",
      description: "Assamese New Year Festival",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Calendar</Text>
        {events.map((event, index) => (
          <View key={index}>
            <View style={styles.eventContainer}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
            </View>
            {index !== events.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventContainer: {
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    color: "gray",
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
});

export default CalendarScreen;
