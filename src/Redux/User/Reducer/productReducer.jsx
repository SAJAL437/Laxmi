import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../Action/ProductAction"; // Your async thunk

const initialState = {
  products: [],
  totalItems: 0,
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null,
  filters: {
    category: "",
    color: [],
    size: [],
    minPrice: 0,
    maxPrice: 100000,
    minDiscount: 0,
    sort: "price_low",
    stock: "all",
    pageNumber: 0,
    pageSize: 10,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalItems = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;
