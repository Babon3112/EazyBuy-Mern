import { publicRequest, userRequest } from "../requestMethod";
import {
  createProductFailure,
  createProductStart,
  createProductSuccess,
  deleteOneProductFaliure,
  deleteOneProductStart,
  deleteOneProductSuccess,
  getAllProductsFaliure,
  getAllProductsStart,
  getAllProductsSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productReedux";
import { loginFaliure, loginStart, loginSuccess } from "./userRedux";

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
    dispatch(getAllProductsFaliure());
  }
};

export const deleteOneProduct = async (id, dispatch) => {
  dispatch(deleteOneProductStart());
  try {
    const res = await userRequest.delete(`/products/delete-product/${id}`);
    dispatch(deleteOneProductSuccess(id));
  } catch (error) {
    dispatch(deleteOneProductFaliure());
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
export const createProduct = async (id, dispatch) => {
  dispatch(createProductStart());
  try {
    const res = await userRequest.post(`/products/add-product`,product);
    dispatch(createProductSuccess(res.data));
  } catch (error) {
    dispatch(createProductFailure());
  }
};
