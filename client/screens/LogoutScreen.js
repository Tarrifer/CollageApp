import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../context/actions/authActions"; // Import your logout action

const LogoutScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the logout action when the component mounts
    dispatch(logout());
  }, [dispatch]);

  // Return null to prevent rendering any UI
  return null;
};

export default LogoutScreen;

// import React from "react";
// import { Text, View, Button } from "react-native";
// import { useDispatch } from "react-redux";
// import { logout } from "../context/actions/authActions";

// const LogoutScreen = ({ navigation }) => {
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     // Dispatch logout action to clear user session
//     dispatch(logout());
//     // Navigate back to login page
//     navigation.navigate("Login");
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Are you sure you want to logout?</Text>
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// };

// export default LogoutScreen;
