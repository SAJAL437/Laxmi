import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../../Utils/Auth";
import axiosInstance from "../../../Utils/Config"; // Fixed typo

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      console.log("get user with token:", token);
      const response = await axiosInstance.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Data :", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      return rejectWithValue(message);
    }
  }
);
