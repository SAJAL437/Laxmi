import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../Action/Action";

const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
        state.profile = null;
      });
  },
});

export default UserProfileSlice.reducer;
