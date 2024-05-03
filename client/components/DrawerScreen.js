import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const DrawerScreen = ({ userType }) => {
  const navigation = useNavigation();

  const handleNavigateToScreen = (screenName) => {
    navigation.navigate(screenName);
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
          label="Home"
          onPress={() => handleNavigateToScreen(`${userType}Home`)}
        />
        <DrawerItem
          label="Profile"
          onPress={() => handleNavigateToScreen("Profile")}
        />
        <DrawerItem
          label="Settings"
          onPress={() => handleNavigateToScreen("Settings")}
        />
        <DrawerItem
          label="Feedback"
          onPress={() => handleNavigateToScreen("Feedback")}
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

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { DrawerActions } from "@react-navigation/native";

// const DrawerScreen = ({ navigation }) => {
//   const openDrawer = () => {
//     navigation.dispatch(DrawerActions.openDrawer());
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={openDrawer}>
//         <Text>Open Drawer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default DrawerScreen;
