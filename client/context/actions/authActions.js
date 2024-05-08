// authActions.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./authActionTypes";

export const loginSuccess = (userType) => ({
  type: LOGIN_SUCCESS,
  payload: { userType },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});
