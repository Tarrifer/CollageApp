// authActions.js
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SET_IS_LOGGED_IN,
  SET_USER_TYPE,
  UPDATE_USER_PROFILE_PIC,
} from "./authActionTypes";

export const loginSuccess = (userType) => ({
  type: LOGIN_SUCCESS,
  payload: { userType },
});
export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: { userType },
});
export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});
export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
});

// Define the login action creator
export const login = (email, password) => {
  // Return a function (thunk) that has access to dispatch
  return (dispatch) => {
    // Simulated login logic
    const correctEmail = "test@example.com";
    const correctPassword = "password";

    if (email === correctEmail && password === correctPassword) {
      // Dispatch login success action
      dispatch(loginSuccess());
      // Dispatch setIsLoggedIn action with true to indicate successful login
      dispatch(setIsLoggedIn(true));
    } else {
      // Dispatch login failure action
      dispatch(loginFailure());
      // Dispatch setIsLoggedIn action with false to indicate failed login
      dispatch(setIsLoggedIn(false));
    }
  };
};

export const updateUserProfilePic = (newProfilePic) => {
  return {
    type: UPDATE_USER_PROFILE_PIC,
    payload: newProfilePic,
  };
};

// // Define the login action
// export const login = (email, password) => {
//   // Simulated login logic
//   const correctEmail = "test@example.com";
//   const correctPassword = "password";

//   if (email === correctEmail && password === correctPassword) {
//     // Simulated successful login
//     return true;
//   } else {
//     // Simulated failed login
//     return false;
//   }
// };
