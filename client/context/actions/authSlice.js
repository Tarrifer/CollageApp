// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { updateStudentList } from "./authActions";

const initialState = {
  userType: "",
  studentList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload.userType;
    },
  },
});
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateStudentList, (state, action) => {
      state.studentList = action.payload;
    });
  },
});

export const attendanceReducer = attendanceSlice.reducer;
export const { setUserType } = authSlice.actions;
export default authSlice.reducer;
