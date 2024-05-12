import React, { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  SundayScreen,
  MondayScreen,
  TuesdayScreen,
  WednesdayScreen,
  ThursdayScreen,
  FridayScreen,
  SaturdayScreen,
} from "./TeacherDayTimetableScreen";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
//{ navigation }
function TeacherTimetableScreen() {
  const navigation = useNavigation();

  const [tabIndex, setTabIndex] = useState(0); // State variable to track the current tab index

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (tabIndex > 0 && tabIndex < 7) {
          // If on one of the tab screens (Monday to Saturday), navigate back as if the back button was pressed twice
          navigation.dispatch(CommonActions.goBack());
          return true; // Prevent default back action
        } else {
          // Allow default back action
          return false;
        }
      }
    );

    return () => backHandler.remove();
  }, [navigation, tabIndex]);

  useEffect(() => {
    const dayIndex = new Date().getDay();
    setTabIndex(dayIndex);
    switch (dayIndex) {
      case 0:
        navigation.navigate("Sun");
        break;
      case 1:
        navigation.navigate("Mon");
        break;
      case 2:
        navigation.navigate("Tue");
        break;
      case 3:
        navigation.navigate("Wed");
        break;
      case 4:
        navigation.navigate("Thu");
        break;
      case 5:
        navigation.navigate("Fri");
        break;
      case 6:
        navigation.navigate("Sat");
        break;
      default:
        navigation.navigate("Sun");
        break;
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarStyle: { backgroundColor: "powderblue" },
        }}
      >
        <Tab.Screen name="Sun" component={SundayScreen} />
        <Tab.Screen name="Mon" component={MondayScreen} />
        <Tab.Screen name="Tue" component={TuesdayScreen} />
        <Tab.Screen name="Wed" component={WednesdayScreen} />
        <Tab.Screen name="Thu" component={ThursdayScreen} />
        <Tab.Screen name="Fri" component={FridayScreen} />
        <Tab.Screen name="Sat" component={SaturdayScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  tabBar: {
    backgroundColor: "#007bff",
  },
});

export default TeacherTimetableScreen;
