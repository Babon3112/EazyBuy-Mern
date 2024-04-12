import { createSlice } from "@reduxjs/toolkit";

const registerUserslice = createSlice({
  name: "registerUser",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    registerUserStart: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerUserFaliure: (state) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const { registerUserStart, registerUserFaliure, registerUserSuccess } =
  registerUserslice.actions;
export default registerUserslice.reducer;
