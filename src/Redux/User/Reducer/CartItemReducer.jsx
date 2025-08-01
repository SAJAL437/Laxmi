import { createSlice } from "@reduxjs/toolkit";
import { deleteCartItem, updatecartItem } from "../Action/CartAction";

const initialState = {
  loading: false,
  cart: [],
  error: null,
  successMessage: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Update Cart Item
      .addCase(updatecartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatecartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Cart item updated successfully";

        const updatedItem = action.payload;
        const index = state.cart.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.cart[index] = updatedItem;
        }
      })
      .addCase(updatecartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart item";
      })

      // ✅ Delete Cart Item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Cart item deleted successfully";

        const deletedItemId = action.meta.arg.cartItemId;
        state.cart = state.cart.filter((item) => item.id !== deletedItemId);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete cart item";
      });
  },
});

export const { clearCartMessages } = cartSlice.actions;

export default cartSlice.reducer;
