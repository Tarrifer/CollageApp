import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  PanResponder,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const GeneralNotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
    { id: 4, message: "Notification 4" },
  ]);
  const [removedNotification, setRemovedNotification] = useState(null);

  const pan = useRef(new Animated.ValueXY()).current;

  const removeNotification = (id) => {
    const removed = notifications.find(
      (notification) => notification.id === id
    );
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    setRemovedNotification(removed);
  };

  const undoRemoval = () => {
    if (removedNotification) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        removedNotification,
      ]);
      setRemovedNotification(null);
    }
  };

  const clearNotification = (id) => {
    removeNotification(id);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 150 || gestureState.dx < -150) {
          Animated.timing(pan, {
            toValue: { x: gestureState.dx > 0 ? 300 : -300, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            removeNotification(
              gestureState.dx > 0 ? gestureState.id : gestureState.id
            );
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            speed: 20,
            bounciness: 10,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((notification) => (
          <Animated.View
            key={notification.id}
            style={[styles.card, { transform: [{ translateX: pan.x }] }]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => {}}
              onLongPress={() =>
                panResponder.onStartShouldSetPanResponder({
                  id: notification.id,
                })
              }
            >
              <Text>{notification.message}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => clearNotification(notification.id)}
            >
              <Text style={styles.clearText}>{` | Clear`}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
      {removedNotification && (
        <TouchableOpacity style={styles.undoButton} onPress={undoRemoval}>
          <FontAwesome name="undo" size={24} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.clearAllButton}
        onPress={clearAllNotifications}
      >
        <Text style={styles.clearAllText}>Clear All</Text>
      </TouchableOpacity>
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
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  card: {
    width: 300,
    height: 100,
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  clearText: {
    color: "gray",
    fontSize: 20,
  },
  clearAllText: {
    color: "black",
    fontSize: 15,
    marginBottom: 10,
  },
  undoButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  clearAllButton: {
    position: "absolute",
    top: 20,
    right: 20,
    marginBottom: 20,
  },
});

export default GeneralNotificationScreen;

// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Animated,
//   PanResponder,
// } from "react-native";
// import { AntDesign } from "@expo/vector-icons";

// const GeneralNotificationScreen = () => {
//   const [notifications, setNotifications] = React.useState(
//     [...Array(20)].map((_, index) => `Notification ${index + 1}`)
//   );

//   const pan = React.useRef(new Animated.Value(0)).current;

//   const panResponder = React.useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         if (gestureState.dx > 0) {
//           pan.setValue(gestureState.dx);
//         }
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         if (gestureState.dx > 120) {
//           removeNotification(gestureState._value);
//         } else {
//           Animated.spring(pan, {
//             toValue: 0,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   const removeNotification = (dx) => {
//     const index = Math.floor(dx / 120); // Calculate the index based on the swipe distance
//     const updatedNotifications = [...notifications];
//     updatedNotifications.splice(index, 1);
//     setNotifications(updatedNotifications);
//     Animated.spring(pan, {
//       toValue: 0,
//       useNativeDriver: false,
//     }).start();
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//   };

//   const renderNotification = (notification, index) => {
//     return (
//       <View key={index}>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[
//             styles.notification,
//             {
//               transform: [{ translateX: pan }],
//             },
//           ]}
//         >
//           <TouchableOpacity onPress={() => removeNotification(index)}>
//             <Text style={styles.notificationText}>{notification}</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>General Notifications</Text>
//         <TouchableOpacity onPress={clearAllNotifications}>
//           <AntDesign name="close" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <ScrollView contentContainerStyle={styles.notificationContainer}>
//         {notifications.map((notification, index) => (
//           <View key={index} style={styles.notificationWrapper}>
//             {renderNotification(notification, index)}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "lightgreen",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "white",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   notificationContainer: {
//     padding: 20,
//   },
//   notificationWrapper: {
//     marginVertical: 5,
//   },
//   notification: {
//     backgroundColor: "#EAEAEA",
//     padding: 20,
//     borderRadius: 10,
//   },
//   notificationText: {
//     fontSize: 16,
//   },
// });

// export default GeneralNotificationScreen;
//---------------------------------------------------------------------------
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const GeneralNotificationScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>General Notifications</Text>
//       <View style={styles.notification}>
//         <Text style={styles.notificationText}>Notification 1</Text>
//       </View>
//       <View style={styles.notification}>
//         <Text style={styles.notificationText}>Notification 2</Text>
//       </View>
//       <View style={styles.notification}>
//         <Text style={styles.notificationText}>Notification 3</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "lightgreen",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   notification: {
//     backgroundColor: "#EAEAEA",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   notificationText: {
//     fontSize: 16,
//   },
// });

// export default GeneralNotificationScreen;
