import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/authActionTypes";

const initialState = {
  isAuthenticated: false,
  userType: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userType: action.payload.userType,
      };
    case LOGIN_FAILURE:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userType: "",
      };
    default:
      return state;
  }
};

export default authReducer;
