import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GeneralNotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>General Notifications</Text>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Notification 1</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Notification 2</Text>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Notification 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notification: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  notificationText: {
    fontSize: 16,
  },
});

export default GeneralNotificationScreen;
