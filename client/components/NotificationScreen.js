// NotificationScreen.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import GeneralNotificationScreen from "./GeneralNotificationScreen";
import TechnicalNotificationScreen from "./TechnicalNotificationScreen";
import NonTechnicalNotificationScreen from "./NonTechnicalNotificationScreen";

const Tab = createMaterialTopTabNavigator();

function NotificationScreen({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tab,
      }}
    >
      <Tab.Screen
        name="GeneralNotification"
        component={GeneralNotificationScreen}
        options={{
          tabBarLabel: "General",
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => navigation.navigate("GeneralNotification")}
            >
              <Text style={styles.tabText}>General</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="TechnicalNotification"
        component={TechnicalNotificationScreen}
        options={{
          tabBarLabel: "Technical",
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => navigation.navigate("TechnicalNotification")}
            >
              <Text style={styles.tabText}>Technical</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="NonTechnicalNotification"
        component={NonTechnicalNotificationScreen}
        options={{
          tabBarLabel: "Non-Technical",
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => navigation.navigate("NonTechnicalNotification")}
            >
              <Text style={styles.tabText}>Non-Technical</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "red",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default NotificationScreen;
