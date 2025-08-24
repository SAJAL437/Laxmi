import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchAllProducts } from "../Action";
const productsSlice = createSlice({
  name: "Allproducts",
  initialState: {
    products: [],
    totalPages: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content || [];
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.sucessMessage = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product deleted successfully";

        const deletedProductId = action.meta.arg.productId;
        state.products = state.products.filter(
          (product) => product.id !== deletedProductId
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete cart item";
      });
  },
});

export default productsSlice.reducer;
