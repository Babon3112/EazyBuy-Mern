import { publicRequest, userRequest } from "../requestMethod";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginFailure,
  loginStart,
  loginSuccess,
  logOut,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} from "./userRedux";

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/users/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
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

export const updateAccount = async (dispatch, user) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.patch("/users/update-details", user);
    dispatch(updateSuccess(res.data.data));
  } catch (error) {
    dispatch(updateFailure());
  }
};

export const deleteAccount = async (dispatch, password) => {
  dispatch(deleteStart());
  try {
    const res = await userRequest.delete("/users/delete-account", { data: { password } });
    dispatch(deleteSuccess(res.data.data));
  } catch (error) {
    dispatch(deleteFailure());
  }
};
