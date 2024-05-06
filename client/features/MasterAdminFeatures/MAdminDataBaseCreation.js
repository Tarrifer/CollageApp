import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MAdminCreationScreen from "./MAdminCreationScreen";
import MAdminViewScreen from "./MAdminViewScreen";
import { StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

const MAdminDataBaseCreation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: {
          backgroundColor: "blue",
        },
      }}
    >
      <Tab.Screen name="CreationScreen" component={MAdminCreationScreen} />
      <Tab.Screen name="ViewScreen" component={MAdminViewScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#f0f0f0",
  },
});

export default MAdminDataBaseCreation;
