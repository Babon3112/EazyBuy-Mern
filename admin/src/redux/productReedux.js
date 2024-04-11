import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL
    getAllProductsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAllProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getAllProductsFaliure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE
    deleteOneProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOneProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteOneProductFaliure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPADATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // CREAtE
    createProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess: (state) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    createProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFaliure,
  deleteOneProductStart,
  deleteOneProductSuccess,
  deleteOneProductFaliure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
