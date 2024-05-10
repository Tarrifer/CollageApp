// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "",
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

export const { setUserType } = authSlice.actions;
export default authSlice.reducer;
