import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { BackHandler, Alert } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { BigCardCollage } from "../../features/MasterAdminFeatures/MACustomization";

const MasterAdminHomePage = ({ route }) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  // Add event listener for Android back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);
  const handleNotifications = () => {
    navigation.navigate("Notification");
  };
  // const openDrawer = () => {
  //   navigation.dispatch(DrawerActions.openDrawer());
  // };
  const openDrawer = () => {
    navigation.navigate("DrawerOpen");
  };

  // const handleCardPress = (screenName) => {
  //   if (screenName === "Customization") {
  //     navigation.navigate(screenName, {
  //       collageName: "Collage Name",
  //       onCollageNameChange: setCollageName,
  //     });
  //   } else {
  //     navigation.navigate(screenName);
  //   }
  // };
  const [collageName, setCollageName] = useState(
    route.params?.collageName || ""
  );
  const [image, setImage] = useState(route.params?.image || null);

  useEffect(() => {
    setCollageName(route.params?.collageName || "Collage Name");
    setImage(route.params?.image || null);
  }, [route.params?.collageName, route.params?.image]);

  // const handleCardPress = (screenName) => {
  //   navigation.navigate(screenName);
  // };
  const handleCardPress = (screenName) => {
    if (screenName === "Customization") {
      navigation.navigate(screenName);
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer} style={styles.iconContainer}>
            <Ionicons name="md-menu" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.headerText}>My College App</Text>
          <TouchableOpacity
            onPress={handleNotifications}
            style={styles.iconContainer}
          >
            <Ionicons name="md-notifications" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <BigCardCollage
          onPress={() => handleCardPress("Customization")}
          collageName={collageName}
          image={image}
        />

        {/* <TouchableOpacity
          onPress={() => handleCardPress("Customization")}
          style={styles.bigCard}
        >
          <Image
            source={require("../../image/3033337.png")}
            style={styles.bigCardImage}
          />
          <Text style={styles.bigCardText}>Collage Name</Text>
        </TouchableOpacity> */}
        <View style={styles.features}>
          <Text style={styles.featuresText}>Features</Text>
        </View>
        <View style={styles.cards}>
          <TouchableOpacity
            // key="DataBaseCreation"
            onPress={() => handleCardPress("DataBaseCreation")}
            style={styles.card}
          >
            <Text style={styles.cardText}>DataBase Creation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // key="RegistrationApproval"
            onPress={() => handleCardPress("RegistrationApproval")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Registration Approval</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // key="CalendarCreation"
            onPress={() => handleCardPress("CalendarCreation")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Calendar Creation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // key="MasterReports"
            onPress={() => handleCardPress("MasterReports")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // key="OnlineLibrary"
            onPress={() => handleCardPress("MasterOnlineLibrary")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Online Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // key="ERPLink"
            onPress={() => handleCardPress("ERPLink")}
            style={styles.card}
          >
            <Text style={styles.cardText}>ERP Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // key="Monitoring"
            onPress={() => handleCardPress("Monitoring")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Monitoring</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            // key="Customization"
            onPress={() => handleCardPress("Customization")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Customization</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            // key="Customization"
            onPress={() => handleCardPress("Settings")}
            style={styles.card}
          >
            <Text style={styles.cardText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f0f0f0",
    backgroundColor: "lightblue",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  bigCard: {
    margin: 20,

    width: "90%",
    aspectRatio: 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bigCardText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    top: 60,
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bigCardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  header: {
    padding: 20,
    backgroundColor: "#007FFF",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  iconContainer: {
    padding: 5,
  },
  card: {
    width: "40%",
    aspectRatio: 1,
    // backgroundColor: "#fff",
    backgroundColor: "#6490E8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
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
  },
  features: {
    padding: 10,

    alignItems: "center",
  },
  featuresText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
  },
});

export default MasterAdminHomePage;
