import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const getUserWithdrawRequests = createAsyncThunk(
  "withdraws/getUserWithdrawRequests",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/withdraw/getuserwithdrawrequests`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Add Withdraw Request
export const addWithdrawRequest = createAsyncThunk(
  "withdraws/addWithdrawRequest",
  async (withdrawData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/withdraw/addwithdrawrequest`,
        withdrawData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const withdrawSlice = createSlice({
  name: "withdraws",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWithdrawRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserWithdrawRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userWithdrawRequests = action.payload.withdraws;
      })
      .addCase(getUserWithdrawRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addWithdrawRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWithdrawRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
      })
      .addCase(addWithdrawRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = withdrawSlice.actions;

export default withdrawSlice.reducer;
