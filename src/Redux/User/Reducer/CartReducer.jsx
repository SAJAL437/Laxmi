import { createSlice } from "@reduxjs/toolkit";
import {
  addItemtoCart,
  getCartItems,
  updatecartItem,
  deleteCartItem,
  clearCart,
} from "../Action/CartAction";

const initialState = {
  cart: null,
  loading: false,
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
      // ✅ Get Cart Items
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })

      // ✅ Add Item to Cart
      .addCase(addItemtoCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemtoCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload.data;

        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems || [];

          const existingIndex = state.cart.cartItems.findIndex(
            (item) =>
              item.product.id === newItem.product.id &&
              item.size === newItem.size
          );

          if (existingIndex >= 0) {
            state.cart.cartItems[existingIndex] = newItem;
          } else {
            state.cart.cartItems.push(newItem);
          }
        } else {
          state.cart = { cartItems: [newItem] };
        }

        state.successMessage = "Item added to cart successfully";
      })
      .addCase(addItemtoCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add item to cart";
      })

      // ✅ Update Cart Item
      .addCase(updatecartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatecartItem.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        state.successMessage = "Cart item updated successfully";

        if (state.cart && state.cart.cartItems) {
          const index = state.cart.cartItems.findIndex(
            (item) => item.id === updatedItem.id
          );
          if (index !== -1) {
            state.cart.cartItems[index] = updatedItem;
          }
        }
      })
      .addCase(updatecartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart item";
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalPrice = 0;
        state.totalDiscountedPrice = 0;
        state.totalItem = 0;
        state.discount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartMessages } = cartSlice.actions;

export default cartSlice.reducer;
