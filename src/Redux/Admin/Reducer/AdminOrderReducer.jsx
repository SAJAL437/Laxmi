import { createSlice } from "@reduxjs/toolkit";
import { allOrders, deleteOrder, updateOrderStatus } from "../Action";

const orderSlice = createSlice({
  name: "AllOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("allOrders.fulfilled payload:", action.payload); 
        state.orders = Array.isArray(action.payload)
          ? action.payload
          : action.payload.content || [];
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
        // console.error("allOrders.rejected:", action.payload); 
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Order deleted successfully";
        const deletedOrderId = action.meta.arg.orderId;
        state.orders = state.orders.filter(
          (order) => order.id !== deletedOrderId
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete order";
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Order status updated successfully";
        const { orderId, status } = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: status } : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update order status";
      });
  },
});

export const { clearMessages } = orderSlice.actions;
export default orderSlice.reducer;