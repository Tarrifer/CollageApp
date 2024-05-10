import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const OnlineLibraryScreen = ({ navigation }) => {
  // Sample library data
  const libraryLinks = [
    { name: "Library 1", url: "https://example.com/library1" },
    { name: "Library 2", url: "https://example.com/library2" },
    { name: "Library 3", url: "https://example.com/library3" },
  ];

  // Function to handle redirection to library URL
  const handleRedirect = (url) => {
    console.log("Redirecting to: ", url);
    // Implement navigation logic here
    // For example, open the URL in a web browser
    // You can use Linking API from React Native
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Online Library</Text>
      {libraryLinks.map((libraryLink, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handleRedirect(libraryLink.url)}
        >
          <Text style={styles.cardText}>{libraryLink.name}</Text>
          <Text style={styles.cardText}>{libraryLink.url}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default OnlineLibraryScreen;
