// src/redux/features/order/createOrder.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../../Utils/Auth";
import axiosInstance from "../../../Utils/Config";

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (address, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.post(
        `/api/users/orders/`,
        address, // actual body payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create order";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getOrderByID = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const token = getToken();
      const response = await axiosInstance.get(`/api/users/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Order Response:", response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch order details";
      console.error("Error fetching Order:", {
        status: err.response?.status,
        message: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const token = getToken();
      const response = await axiosInstance.put(
        `/api/users/orders/${orderId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Confirm Order Response:", response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to confirm order";
      console.error("Error confirming Order:", {
        status: err.response?.status,
        message: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const orderHistory = createAsyncThunk(
  "order/orderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axiosInstance.get("/api/users/orders/history", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Order History:", response.data);
      return response.data; // Returns array of orders
    } catch (err) {
      const errorMessage =
        err.response?.data?.details ||
        err.message ||
        "Failed to fetch order history";
      console.error("Error fetching order history:", {
        status: err.response?.status,
        message: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      if (!orderId) {
        throw new Error("Order ID is required");
      }
      const token = getToken();
      const response = await axiosInstance.delete(
        `/api/users/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { orderId, ...response.data }; // or just return orderId
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete order";
      return rejectWithValue(errorMessage);
    }
  }
);
