import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/Config";
import { getToken } from "../../Utils/Auth";

export const fetchUsers = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.get("/api/admin/user/", {
        header: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User : ", response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to fetch orders";
      console.error("Error fetching Users :", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);



export const fetchAllProducts = createAsyncThunk(
  "admin/fetchAllProducts",
  async (filter, { rejectWithValue }) => {
    try {
      const {
        category,
        color = [],
        size = [],
        minPrice,
        maxPrice,
        minDiscount,
        sort = "price_low",
        stock = "all",
        pageNumber = 0,
        pageSize = 20,
      } = filter;

      const params = {
        ...(category && { category }),
        ...(color.length > 0 && { color }),
        ...(size.length > 0 && { size }),
        ...(minPrice !== undefined && { minPrice }),
        ...(maxPrice !== undefined && { maxPrice }),
        ...(minDiscount !== undefined && { minDiscount }),

        sort,
        stock,
        pageNumber,
        pageSize,
      };

      const queryString = Object.entries(params)
        .flatMap(([key, value]) =>
          Array.isArray(value)
            ? value.map((v) => ` ${key}=${encodeURIComponent(v)}`)
            : `${key}=${encodeURIComponent(value)}`
        )
        .join("&");
      console.log("API URL", `/api/users/produtcs/?${queryString}`);

      const response = await axiosInstance.get("/api/users/products/", {
        params,
        paramsSerializer: (params) => {
          return Object.entries(params)
            .flatMap(([key, value]) =>
              Array.isArray(value)
                ? value.map((v) => `${key}=${encodeURIComponent(v)}`)
                : `${key}=${encodeURIComponent(value)}`
            )
            .join("&");
        },
      });
      console.log("Products :", response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to fetch produtcs";
      console.error("Error fetching products:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete(
        `/api/admin/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete product";

      console.error("Error deleting product:", {
        status: err.response?.status,
        message: errorMessage,
      });

      return rejectWithValue(errorMessage);
    }
  }
);

export const allOrders = createAsyncThunk(
  "admin/AllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.get("/api/admin/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("AllOrders Response:", response.data); // Debug full response
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to fetch orders";
      console.error("Error fetching orders:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axiosInstance.delete(
        `/api/admin/orders/${orderId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete order";
      console.error("Error deleting order:", {
        status: err.response?.status,
        message: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = getToken();
      let endpoint;
      switch (status.toUpperCase()) {
        case "PENDING":
          endpoint = `/api/admin/orders/${orderId}/place`;
          break;
        case "CONFIRMED":
          endpoint = `/api/admin/orders/${orderId}/confirm`;
          break;
        case "SHIPPED":
          endpoint = `/api/admin/orders/${orderId}/ship`;
          break;
        case "DELIVERED":
          endpoint = `/api/admin/orders/${orderId}/deliver`;
          break;
        case "CANCELED":
          endpoint = `/api/admin/orders/${orderId}/cancel`;
          break;
        default:
          throw new Error("Invalid status");
      }

      const response = await axiosInstance.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Status update response:", response.data);
      return { orderId, status };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update order status";
      console.error("Update order status error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      return rejectWithValue(errorMessage);
    }
  }
);
