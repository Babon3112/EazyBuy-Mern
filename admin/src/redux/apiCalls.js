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
import { loginFaliure, loginStart, loginSuccess, logOut } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFaliure());
  }
};

export const getAllProducts = async (dispatch) => {
  dispatch(getAllProductsStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getAllProductsSuccess(res.data));
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
    // const res = await userRequest.delete(`/products/delete-product/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const createProduct = async (product, dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await userRequest.post(`/products/add-product`, product);
    dispatch(createProductSuccess(res.data));
  } catch (error) {
    dispatch(createProductFailure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logOut());
};
