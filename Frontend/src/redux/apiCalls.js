import { publicRequest, userRequest } from "../requestMethod";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logOut,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
} from "./userRedux";

export const register = async (dispatch, user) => {
  dispatch(registerUserStart());
  try {
    const res = await publicRequest.post("/users/register", user);
    dispatch(registerUserSuccess(res.data));
  } catch (error) {
    dispatch(registerUserFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/users/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user) => {
  const res = await userRequest.post("/users/logout", user);
  dispatch(logOut());
};

