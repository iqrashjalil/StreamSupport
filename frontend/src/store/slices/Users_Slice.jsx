import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
};

export const getDonationStats = createAsyncThunk(
  "users/getDonationStats",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/user/getTopStreamers`,
        {},
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDonationStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDonationStats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.topStreamers = action.payload.topStreamers;
      })
      .addCase(getDonationStats.rejected, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default usersSlice.reducer;
