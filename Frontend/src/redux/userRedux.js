import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    currentUser: null,
    isFetching: false,
    error: false,
    passwordChangeSuccess: false, // New state to track password change success
  },
  reducers: {
    registerUserStart: (state) => {
      state.isFetching = true;
    },
    registerUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    registerUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginStart,
  loginFailure,
  loginSuccess,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;
