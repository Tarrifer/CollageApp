import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const MAdminOnlineLibrary = () => {
  const [libraryLinks, setLibraryLinks] = useState([]);
  const [libraryName, setLibraryName] = useState("");
  const [libraryLink, setLibraryLink] = useState("");
  const [error, setError] = useState("");

  const handleAddLibraryLink = () => {
    if (
      libraryName.trim() !== "" &&
      libraryLink.trim() !== "" &&
      isValidURL(libraryLink)
    ) {
      setLibraryLinks([
        ...libraryLinks,
        { name: libraryName, url: libraryLink },
      ]);
      setLibraryName("");
      setLibraryLink("");
      setError("");
    } else {
      setError("Please enter a valid name and URL.");
    }
  };

  const handleDeleteLibraryLink = (index) => {
    const updatedLibraryLinks = [...libraryLinks];
    updatedLibraryLinks.splice(index, 1);
    setLibraryLinks(updatedLibraryLinks);
  };

  const handleRedirect = (url) => {
    // Implement navigation logic here
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Library Name"
        onChangeText={(value) => setLibraryName(value)}
        value={libraryName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Library Link"
        onChangeText={(value) => setLibraryLink(value)}
        value={libraryLink}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={handleAddLibraryLink} style={styles.button}>
        <Text style={styles.buttonText}>Add Library Link</Text>
      </TouchableOpacity>
      {libraryLinks.map((libraryLink, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardText}>{libraryLink.name}</Text>
          <Text style={styles.cardText}>{libraryLink.url}</Text>
          <View style={styles.cardButtons}>
            <TouchableOpacity
              onPress={() => handleRedirect(libraryLink.url)}
              style={[styles.cardButton, styles.goButton]}
            >
              <Text style={styles.cardButtonText}>Go</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteLibraryLink(index)}
              style={[styles.cardButton, styles.deleteButton]}
            >
              <Text style={styles.cardButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  card: {
    width: "80%",
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
  cardButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  goButton: {
    backgroundColor: "#007FFF",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MAdminOnlineLibrary;
