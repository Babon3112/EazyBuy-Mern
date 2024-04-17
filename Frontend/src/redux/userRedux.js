import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
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
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.data.user = action.payload;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteStart: (state) => {
      state.isFetching = true;
    },
    deleteSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
    },
    deleteFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginFailure,
  loginSuccess,
  logOut,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} = userSlice.actions;

export default userSlice.reducer;
