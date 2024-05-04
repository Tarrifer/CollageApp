import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
} from "react-native";

const MAdminERPLink = () => {
  const [erpLinks, setERPLinks] = useState([]);
  const [erpName, setERPName] = useState("");
  const [erpURL, setERPURL] = useState("");
  const [error, setError] = useState("");

  const handleAddERPLink = () => {
    if (erpName.trim() !== "" && erpURL.trim() !== "" && isValidURL(erpURL)) {
      setERPLinks([...erpLinks, { name: erpName, url: erpURL }]);
      setERPName("");
      setERPURL("");
      setError("");
    } else {
      setError("Please enter a valid name and URL.");
    }
  };

  const handleDeleteERPLink = (index) => {
    const updatedERPLinks = [...erpLinks];
    updatedERPLinks.splice(index, 1);
    setERPLinks(updatedERPLinks);
  };

  const handleRedirect = (url) => {
    Linking.openURL(url);
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
        placeholder="Enter ERP Name"
        onChangeText={(value) => setERPName(value)}
        value={erpName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter ERP Link"
        onChangeText={(value) => setERPURL(value)}
        value={erpURL}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={handleAddERPLink} style={styles.button}>
        <Text style={styles.buttonText}>Add ERP Link</Text>
      </TouchableOpacity>
      {erpLinks.map((erpLink, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardText}>{erpLink.name}</Text>
          <Text style={styles.cardText}>{erpLink.url}</Text>
          <View style={styles.cardButtons}>
            <TouchableOpacity
              onPress={() => handleRedirect(erpLink.url)}
              style={[styles.cardButton, styles.goButton]}
            >
              <Text style={styles.cardButtonText}>Go</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDeleteERPLink(index)}
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

export default MAdminERPLink;
