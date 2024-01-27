import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    createProduct(state, action) {
      state.products = action.payload;
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p._id !== action.payload);
    },
  },
});

const productReducer = productSlice.reducer;
const productActions = productSlice.actions;

export { productReducer, productActions };
