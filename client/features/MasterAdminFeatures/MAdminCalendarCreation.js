import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { Calendar } from "react-native-calendars";

const MAdminCalendarCreation = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleAddEvent = () => {
    if (!eventName || !eventDate) {
      alert("Please fill in the event name and select a date");
      return;
    }

    const newEvent = {
      name: eventName,
      date: eventDate,
      description: eventDescription,
    };

    setEvents([...events, newEvent]);
    setEventName("");
    setEventDescription("");
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const handleDatePress = (date) => {
    setSelectedDate(date.dateString);
    setEventDate(date.dateString);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>University Calendar Creation</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Event Name"
          onChangeText={(text) => setEventName(text)}
          value={eventName}
        />
      </View>

      <Calendar
        current={new Date()}
        onDayPress={handleDatePress}
        markedDates={{ [selectedDate]: { selected: true, marked: true } }}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Description:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter Event Description"
          multiline={true}
          onChangeText={(text) => setEventDescription(text)}
          value={eventDescription}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
        <Text>Add Event</Text>
      </TouchableOpacity>

      <View style={styles.eventsContainer}>
        <Text style={styles.eventsHeading}>Events</Text>
        {events.map((event, index) => (
          <View key={index} style={styles.eventCard}>
            <View style={styles.eventInfo}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
              {event.description && (
                <Text style={styles.eventDescription}>{event.description}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => handleDeleteEvent(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  eventsContainer: {
    marginTop: 20,
  },
  eventsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    color: "gray",
  },
  eventDescription: {
    marginTop: 5,
  },
  deleteButton: {
    color: "red",
    marginLeft: 10,
  },
});

export default MAdminCalendarCreation;
