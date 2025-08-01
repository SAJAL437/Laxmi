import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Utils/Config";
import { getToken } from "../../../Utils/Auth";

export const addItemtoCart = createAsyncThunk(
  "user/addItemtoCart",
  async (reqdata, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.put(
        `/api/users/carts/add`,
        reqdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("addItemtoCart", response.data);
      return response.data; // Returns ApiResponse { success, message, data }
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || // Backend sends 'error' field
        err.response?.data?.message ||
        "Failed to add item to cart";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getCartItems = createAsyncThunk(
  "user/getCartItems",

  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.get(`/api/users/carts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cart:", response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch cart items";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const updatecartItem = createAsyncThunk(
  "cart/updatecartItem",
  async ({ cartItemId, data }, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.put(
        `/api/users/cart_items/${cartItemId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh cart after successful update
      dispatch(getCartItems());

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ cartItemId }, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete(
        `/api/users/cart_items/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh cart after successful deletion
      dispatch(getCartItems());

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete("/api/users/carts/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Clear Cart Response:", response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to clear cart";
      console.error("Error clearing cart:", {
        status: err.response?.status,
        message: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);
