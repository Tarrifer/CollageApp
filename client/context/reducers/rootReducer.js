import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { attendanceReducer } from "../actions/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  attendance: attendanceReducer,
});

export default rootReducer;
