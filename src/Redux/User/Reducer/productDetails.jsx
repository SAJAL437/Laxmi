import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../../User/Action/ProductAction";

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.product = null; // Fixed typo from 'products' to 'product'
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch product";
            });
    },
});

export default productDetailsSlice.reducer;