import { publicRequest } from "../requestMethod";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  loginFaliure,
  loginStart,
  loginSuccess,
  logOut,
  registerUserStart,
  registerUserSuccess,
  registerUserFaliure,
} from "./userRedux";

export const register = async (dispatch, user) => {
  dispatch(registerUserStart());
  try {
    const res = await publicRequest.post("/users/register", user);
    dispatch(registerUserSuccess(res.data));
  } catch (error) {
    dispatch(registerUserFaliure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFaliure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logOut());
};
