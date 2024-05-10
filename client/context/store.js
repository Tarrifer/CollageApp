// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"; // Import your authReducer and any other reducers

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/authReducer";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;
