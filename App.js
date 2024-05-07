import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./client/navigation/StackNavigator";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();
        // Artificial delay to simulate loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // After the delay, hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

//---------------------hide splash screen---------------------------------------
// import "react-native-gesture-handler";
// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import StackNavigator from "./client/navigation/StackNavigator";
// import * as SplashScreen from "expo-splash-screen";

// export default function App() {
//   useEffect(() => {
//     setTimeout(() => {
//       SplashScreen.hideAsync();
//     }, 900);
//   }, []);

//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// }

//------------------------------- old code ---------------------------------------
// import "react-native-gesture-handler";
// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import StackNavigator from "./client/navigation/StackNavigator";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function initializeApp() {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 5000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//         await SplashScreen.hideAsync();
//       }
//     }

//     initializeApp();
//   }, []);

//   if (!appIsReady) {
//     return null;
//   }

//   return (
//     <NavigationContainer>
//       <StackNavigator />
//     </NavigationContainer>
//   );
// }
//--------------------------------------------------------------------
// import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
// import { View } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import React, { useCallback, useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import StackNavigator from "./client/navigation/StackNavigator";
// import * as SplashScreen from "expo-splash-screen";
// import Entypo from "@expo/vector-icons/Entypo";
// import * as Font from "expo-font";
// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [appIsReady, setAppIsReady] = useState(false);

//   useEffect(() => {
//     async function initializeApp() {
//       try {
//         await Font.loadAsync(Entypo.font);
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//         await SplashScreen.hideAsync();
//       }
//     }

//     initializeApp();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (appIsReady) {
//       await SplashScreen.hideAsync();
//     }
//   }, [appIsReady]);

//   if (!appIsReady) {
//     return null;
//   }
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <NavigationContainer>
//         <StackNavigator />
//       </NavigationContainer>
//       <View style={{ position: "absolute", top: 20, right: 20 }}>
//         <Entypo name="rocket" size={30} />
//       </View>
//       <StatusBar style="auto" />
//     </GestureHandlerRootView>
//   );
// }
