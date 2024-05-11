// authReducer.js

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_USER_TYPE,
  SET_IS_LOGGED_IN,
  UPDATE_USER_PROFILE_PIC,
  UPDATE_USER_DETAILS,
} from "../actions/authActionTypes";

const initialState = {
  isLoggedIn: false,
  userType: "",
  userProfile: {
    profilePic: "", // Initial profile picture URI
    // Other profile properties
  },
  userName: "",
  userEmail: "",
  // Other initial state properties
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Handle login success action
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      // Handle login failure action
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      // Handle logout action
      return {
        ...state,
        isLoggedIn: false,
        userType: "",
        // Reset other state properties
      };
    case SET_USER_TYPE:
      // Handle setting userType action
      return {
        ...state,
        userType: action.payload.userType,
      };
    case SET_IS_LOGGED_IN:
      // Handle setting isLoggedIn action
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    // case UPDATE_USER_PROFILE_PIC:
    //   return {
    //     ...state,
    //     userProfile: {
    //       ...state.userProfile,
    //       profilePic: action.payload,
    //     },
    //   };
    case "UPDATE_USER_PROFILE_PIC":
      return {
        ...state,
        profilePic: action.payload,
      };
    case "UPDATE_USER_DETAILS":
      return {
        ...state,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
    default:
      return state;
  }
};

export default authReducer;

// import {
//   LOGIN_SUCCESS,
//   SET_USER_TYPE,
//   LOGOUT,
// } from "../actions/authActionTypes";

// const initialState = {
//   isLoggedIn: false,
//   userType: "",
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: true,
//         userType: action.payload.userType,
//       };
//     case SET_USER_TYPE:
//       return {
//         ...state,
//         userType: action.payload.userType,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         userType: "",
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;
//--------------------------------------------------------------
// import {
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOGOUT,
// } from "../actions/authActionTypes";

// const initialState = {
//   isAuthenticated: false,
//   userType: "",
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         userType: action.payload.userType,
//       };
//     case LOGIN_FAILURE:
//     case LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         userType: "",
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;
