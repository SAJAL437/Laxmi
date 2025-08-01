import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Utils/Config";
import { getToken } from "../../../Utils/Auth";

export const fetchProducts = createAsyncThunk(
  "user/fetchProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const {
        category,
        color = [],
        size = [],
        minPrice = 0,
        maxPrice = 100000,
        minDiscount = 0,
        sort = "price_low",
        stock = "all",
        pageNumber = 0,
        pageSize = 10,
      } = filters;

      // Prepare params, omitting category if it's "all" to align with backend
      const params = {
        ...(color.length > 0 && { color }), // Only include if non-empty
        ...(size.length > 0 && { size }), // Only include if non-empty
        minPrice,
        category,
        maxPrice,
        minDiscount,
        sort,
        stock,
        pageNumber,
        pageSize,
      };

      const response = await axiosInstance.get("/api/users/products/", {
        params,
        paramsSerializer: (params) => {
          // Serialize arrays correctly (e.g., color=red&color=blue)
          return Object.entries(params)
            .flatMap(([key, value]) =>
              Array.isArray(value)
                ? value.map((v) => `${key}=${encodeURIComponent(v)}`)
                : `${key}=${encodeURIComponent(value)}`
            )
            .join("&");
        },
      });

      console.log("Fetched products:", response.data);

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to fetch products";
      console.error("Error fetching products:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getProductById = createAsyncThunk(
  "user/getProductById",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const { data } = await axiosInstance.get(
        `/api/users/products/id/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API response:", data);
      return data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to fetch product details";
      console.error("Error fetching product:", {
        status: err.response?.status,
        message: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  }
);
