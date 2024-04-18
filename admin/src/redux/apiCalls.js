import { publicRequest, userRequest } from "../requestMethod";
import {
  createProductFailure,
  createProductStart,
  createProductSuccess,
  deleteOneProductFailure,
  deleteOneProductStart,
  deleteOneProductSuccess,
  getAllProductsFailure,
  getAllProductsStart,
  getAllProductsSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import {
  getAllUsersFailure,
  getAllUsersStart,
  getAllUsersSuccess,
  loginFaliure,
  loginStart,
  loginSuccess,
  logOut,
} from "./userRedux";

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
  await userRequest.post("/users/logout", user);
  dispatch(logOut());
};

export const getAllUsers = async (dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getAllUsersSuccess(res.data.data));
  } catch (error) {
    dispatch(getAllUsersFailure());
  }
};

export const getAllProducts = async (dispatch) => {
  dispatch(getAllProductsStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getAllProductsSuccess(res.data.data));
  } catch (error) {
    dispatch(getAllProductsFailure());
  }
};

export const deleteOneProduct = async (id, dispatch) => {
  dispatch(deleteOneProductStart());
  try {
    const res = await userRequest.delete(`/products/delete-product/${id}`);
    dispatch(deleteOneProductSuccess(id));
  } catch (error) {
    dispatch(deleteOneProductFailure());
  }
};

export const upadateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.patch(`/products//update-product/${id}`,product);
    dispatch(updateProductSuccess(id, res.data.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const createProduct = async (product, dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await userRequest.post(`/products/add-product`, product);
    dispatch(createProductSuccess(res.data.data));
  } catch (error) {
    dispatch(createProductFailure());
  }
};
