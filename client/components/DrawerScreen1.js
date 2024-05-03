import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const DrawerScreen = ({ userType }) => {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    switch (userType) {
      case "Student":
        navigation.navigate("StudentHome");
        break;
      case "Teacher":
        navigation.navigate("TeacherHome");
        break;
      case "Admin":
        navigation.navigate("AdminHome");
        break;
      case "Master Admin":
        navigation.navigate("MasterAdminHome");
        break;
      default:
        console.log("Invalid user type");
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For now, let's just navigate to the Login page
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <DrawerItem
          label="Profile"
          onPress={() => {
            // Navigate to Profile screen
          }}
        />
        <DrawerItem
          label="Settings"
          onPress={() => {
            // Navigate to Settings screen
          }}
        />
        <DrawerItem label="Home" onPress={handleNavigateToHome} />
        <DrawerItem
          label="Feedback"
          onPress={() => {
            // Navigate to Feedback screen
          }}
        />
        <DrawerItem label="Logout" onPress={handleLogout} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerScreen;
