import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../Action";

const userSlice = createSlice({
  name: "userList", // Fixed capitalization for consistency (optional, but conventional)
  initialState: {
    users: [],
    loading: false,
    error: null,
    successMessage: null, // Fixed typo
  },
  reducers: {}, // Empty reducers since no synchronous actions are defined
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null; // Fixed typo
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = Array.isArray(action.payload)
          ? action.payload
          : action.payload.content || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;