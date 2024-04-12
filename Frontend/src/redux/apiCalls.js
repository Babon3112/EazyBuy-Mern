import { publicRequest } from "../requestMethod";
import { loginFaliure, loginStart, loginSuccess, logOut } from "./userRedux";
import {
  registerUserStart,
  registerUserSuccess,
  registerUserFaliure,
} from "./registerRedux";

export const register = async (dispatch, user) => {
  dispatch(registerUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerUserSuccess(res.data));
  } catch (error) {
    dispatch(registerUserFaliure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFaliure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logOut());
};
