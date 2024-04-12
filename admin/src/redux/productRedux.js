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
    getAllProductsFailure: (state) => {
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
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    deleteOneProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload.product;
      }
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // CREATE
    createProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess: (state, action) => {
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
  getAllProductsFailure,
  deleteOneProductStart,
  deleteOneProductSuccess,
  deleteOneProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  createProductStart,
  createProductSuccess,
  createProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
