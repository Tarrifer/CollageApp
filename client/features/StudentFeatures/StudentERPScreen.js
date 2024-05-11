import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const StudentERPScreen = () => {
  // Sample ERP links data
  const erpLinks = [
    { name: "ERP 1", url: "https://example.com/erp1" },
    { name: "ERP 2", url: "https://example.com/erp2" },
    { name: "ERP 3", url: "https://example.com/erp3" },
  ];

  // Function to handle redirection to ERP URL
  const handleRedirect = (url) => {
    console.log("Redirecting to: ", url);
    // Implement navigation logic here
    // For example, open the URL in a web browser
    // You can use Linking API from React Native
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Student ERP</Text>
        {erpLinks.map((erpLink, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleRedirect(erpLink.url)}
          >
            <Text style={styles.cardText}>{erpLink.name}</Text>
            <Text style={styles.cardText}>{erpLink.url}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
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

export default StudentERPScreen;
