import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerUserStart: (state) => {
      state.isFetching = true;
    },
    registerUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerUserFaliure: (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFaliure: (state) => {
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
  registerUserFaliure,
  loginStart,
  loginFaliure,
  loginSuccess,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
