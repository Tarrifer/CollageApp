import React from "react";
import { View, Text, StyleSheet } from "react-native";
import calendarData from "../../database/calendar.json";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const EventTimetableScreen = ({ dayIndex }) => {
  const day = daysOfWeek[dayIndex];
  const today = new Date().toLocaleString();

  const events = calendarData[day] || [];

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>Today's date & time: {today}</Text>
      </View>
      <View style={styles.eventsContainer}>
        {events.length > 0 ? (
          events.map((event, index) => (
            <View key={index} style={styles.eventContainer}>
              <Text style={styles.eventName}>{event.eventName}</Text>
              <View style={styles.separator} />
              <Text>Date: {event.date}</Text>
              <Text>Time: {event.time}</Text>
              <Text>Description: {event.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEvent}>No event today</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  dateTimeContainer: {
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventsContainer: {
    flex: 1,
  },
  eventContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noEvent: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default EventTimetableScreen;

// import React from "react";
// import { View, Text } from "react-native";
// import calendarData from "../../database/calendar.json";

// const daysOfWeek = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// const EventTimetableScreen = ({ dayIndex }) => {
//   const day = daysOfWeek[dayIndex];

//   return (
//     <View>
//       <Text>{day}</Text>
//       {calendarData[day].map((event, index) => (
//         <View key={index}>
//           <Text>{event.eventName}</Text>
//           <Text>Date: {event.date}</Text>
//           <Text>Description: {event.description}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default EventTimetableScreen;
