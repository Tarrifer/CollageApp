import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";

const videoSource = require("../../video/pending.mp4");

const PendingPage = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 0) {
          return ".";
        } else if (prevDots.length === 1) {
          return "..";
        } else if (prevDots.length === 2) {
          return "...";
        } else {
          return "";
        }
      });
    }, 1000); // Change the interval here (in milliseconds) to adjust the animation speed
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          source={videoSource}
          style={styles.video}
          resizeMode="cover"
          isLooping={true}
          shouldPlay={true}
          isMuted={true}
        />
      </View>
      <View style={styles.overlay}>
        <Text style={styles.text}>
          waiting for approval, pending
          <Text style={styles.animation}>{dots}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Set white background for the entire screen
    alignItems: "center",
    justifyContent: "center",
  },
  videoContainer: {
    width: Dimensions.get("window").width, // Set width to cover entire screen width
    height: Dimensions.get("window").height / 3, // Set height to cover 1/3 of the screen height
  },
  video: {
    flex: 1, // Take all available space inside the container
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "purple", // Set text color to purple
    fontSize: 21,
    marginBottom: 10,
    fontWeight: "400",
  },
  animation: {
    color: "purple", // Set text color to purple
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PendingPage;

// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import { Video } from "expo-av";

// const videoSource = require("../../video/pending.mp4");

// const PendingPage = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.videoContainer}>
//         <Video
//           source={videoSource}
//           style={styles.video}
//           resizeMode="cover"
//           isLooping={true}
//           shouldPlay={true}
//           isMuted={true}
//         />
//       </View>
//       <View style={styles.overlay}>
//         <Text style={styles.text}>
//           waiting for approval, pending{" "}
//           <Text style={styles.animation}>...</Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white", // Set white background for the entire screen
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   videoContainer: {
//     width: Dimensions.get("window").width, // Set width to cover entire screen width
//     height: Dimensions.get("window").height / 3, // Set height to cover 1/3 of the screen height
//   },
//   video: {
//     flex: 1, // Take all available space inside the container
//   },
//   overlay: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "purple", // Set text color to purple
//     fontSize: 21,
//     marginBottom: 10,
//     fontWeight: "400",
//   },
//   animation: {
//     color: "purple", // Set text color to purple
//     fontSize: 24,
//     fontWeight: "bold",
//   },
// });

// export default PendingPage;
