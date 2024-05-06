// DrawerNavigator.js

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const LazyStackNavigator = React.lazy(() => import("./StackNavigator"));

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={LazyStackNavigator} />
      {/* Other drawer screens */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import StackNavigator from "../navigation/StackNavigator";
// import DrawerScreen from "../components/DrawerScreen";

// const DrawerNavigator = () => {
//   const Drawer = createDrawerNavigator();

//   return (
//     <Drawer.Navigator drawerContent={(props) => <DrawerScreen {...props} />}>
//       <Drawer.Screen
//         name="Home"
//         component={StackNavigator}
//         options={{ drawerLabel: "Home" }}
//       />
//       {/* Add other screens as needed */}
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigator;
