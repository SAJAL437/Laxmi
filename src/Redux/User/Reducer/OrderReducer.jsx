import { createSlice } from "@reduxjs/toolkit";
import {
  orderHistory,
  createOrder,
  getOrderByID,
  deleteOrder,
} from "../Action/OrderAction";

const initialState = {
  loading: false,
  error: null,
  order: null, // For single order details
  orders: [], // For order history
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.order = null;
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Order History
      .addCase(orderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Store array of orders
      })
      .addCase(orderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order history";
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create order";
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.orderId
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete order";
      })
      // Get Order By ID
      .addCase(getOrderByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByID.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch order details";
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
