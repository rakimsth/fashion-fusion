import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PRODUCT_API from "../services/products";

const initialState = {
  currentPage: 1,
  error: "",
  loading: false,
  products: [],
  product: {},
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await PRODUCT_API.list();
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // Add user to the state array
        state.products = [...action.payload];
      })
      .addCase(fetchProducts.pending, (state) => {
        // Add user to the state array
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = productSlice.actions;

export const productReducer = productSlice.reducer;
