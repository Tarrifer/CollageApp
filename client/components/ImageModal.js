import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ImageModal = ({ visible, images, onClose, onRemove, onReupload }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={styles.imageCountText}>
              Images uploaded: {images.length}
            </Text>
            {images.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <Pressable
                  onPress={() => onRemove(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onReupload}
              style={[
                styles.uploadButton,
                images.length >= 100 && styles.disabledButton,
              ]}
              disabled={images.length >= 100}
            >
              <Text style={styles.buttonText}>Upload Images</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    height: 600,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  imageCount: {
    fontSize: 18,
    marginVertical: 10,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#FEBE10",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#d3d3d3",
  },
  imageCountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ImageModal;

// // components/ImageModal.js
// import React from "react";
// import {
//   Modal,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Pressable,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const ImageModal = ({ visible, images, onClose, onRemove, onReupload }) => {
//   return (
//     <Modal visible={visible} transparent={true} animationType="slide">
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Pressable onPress={onClose} style={styles.closeButton}>
//             <Ionicons name="close" size={24} color="black" />
//           </Pressable>
//           <ScrollView contentContainerStyle={styles.scrollView}>
//             <View style={styles.imageGrid}>
//               {images.map((image, index) => (
//                 <View key={index} style={styles.imageContainer}>
//                   <Image source={{ uri: image }} style={styles.image} />
//                   <Pressable
//                     onPress={() => onRemove(index)}
//                     style={styles.removeButton}
//                   >
//                     <Text style={styles.buttonText}>Remove</Text>
//                   </Pressable>
//                 </View>
//               ))}
//             </View>
//           </ScrollView>
//           <View style={styles.buttonContainer}>
//             <Pressable onPress={onReupload} style={styles.uploadButton}>
//               <Text style={styles.buttonText}>Upload Images</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   closeButton: {
//     alignSelf: "flex-end",
//   },
//   scrollView: {
//     flexGrow: 1,
//     alignItems: "center",
//   },
//   imageGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   imageContainer: {
//     width: "48%",
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: 150,
//   },
//   removeButton: {
//     backgroundColor: "red",
//     borderRadius: 5,
//     padding: 5,
//     marginTop: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 12,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#FEBE10",
//     borderRadius: 5,
//     padding: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default ImageModal;

// components/ImageModal.js

//------------------------------------------------------------------------------------------------------------------------
// import React from "react";
// import {
//   Modal,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Pressable,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const ImageModal = ({ visible, images, onClose, onRemove, onReupload }) => {
//   return (
//     <Modal visible={visible} transparent={true} animationType="slide">
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Pressable onPress={onClose} style={styles.closeButton}>
//             <Ionicons name="close" size={24} color="black" />
//           </Pressable>
//           <ScrollView contentContainerStyle={styles.scrollView}>
//             {images.map((image, index) => (
//               <View key={index} style={styles.imageContainer}>
//                 <Image source={{ uri: image }} style={styles.image} />
//                 <Pressable
//                   onPress={() => onRemove(index)}
//                   style={styles.removeButton}
//                 >
//                   <Text style={styles.buttonText}>Remove</Text>
//                 </Pressable>
//               </View>
//             ))}
//           </ScrollView>
//           <View style={styles.buttonContainer}>
//             <Pressable onPress={onReupload} style={styles.uploadButton}>
//               <Text style={styles.buttonText}>Upload Images</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   closeButton: {
//     alignSelf: "flex-end",
//   },
//   scrollView: {
//     flexGrow: 1,
//     alignItems: "center",
//   },
//   imageContainer: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
//   removeButton: {
//     backgroundColor: "red",
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   uploadButton: {
//     backgroundColor: "#FEBE10",
//     borderRadius: 5,
//     padding: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default ImageModal;
