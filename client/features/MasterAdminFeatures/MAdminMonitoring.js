// MAdminMonitoring.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MAdminMonitoring = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Timetable</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registered</Text>
        <View style={styles.cards}>
          <TouchableOpacity style={styles.subCard}>
            <Text style={styles.subCardText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subCard}>
            <Text style={styles.subCardText}>Teacher</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subCard}>
            <Text style={styles.subCardText}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    aspectRatio: 2, // Maintain aspect ratio
    backgroundColor: "#6490E8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subCard: {
    width: "30%",
    aspectRatio: 1, // Maintain aspect ratio
    backgroundColor: "#007FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subCardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MAdminMonitoring;

//-----------------------------------------------------------------------------------------------
// MAdminMonitoring.js
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// const MAdminMonitoring = ({ navigation }) => {
//   const handleCardPress = (screenName) => {
//     navigation.navigate(screenName);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <TouchableOpacity style={styles.card} onPress={() => handleCardPress("TimetablePage")}>
//         <Text style={styles.cardText}>Timetable</Text>
//       </TouchableOpacity>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Registered</Text>
//         <View style={styles.cards}>
//           <TouchableOpacity style={styles.subCard} onPress={() => handleCardPress("StudentRegistration")}>
//             <Text style={styles.subCardText}>Student</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.subCard} onPress={() => handleCardPress("TeacherRegistration")}>
//             <Text style={styles.subCardText}>Teacher</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.subCard} onPress={() => handleCardPress("AdminRegistration")}>
//             <Text style={styles.subCardText}>Admin</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.card} onPress={() => handleCardPress("CalendarPage")}>
//         <Text style={styles.cardText}>Calendar</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     width: "80%",
//     aspectRatio: 2, // Maintain aspect ratio
//     backgroundColor: "#6490E8",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   section: {
//     marginVertical: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   cards: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   subCard: {
//     width: "30%",
//     aspectRatio: 1, // Maintain aspect ratio
//     backgroundColor: "#007FFF",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   subCardText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });

// export default MAdminMonitoring;
