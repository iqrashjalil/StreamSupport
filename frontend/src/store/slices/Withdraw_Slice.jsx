import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  message: null,
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

// Get All Withdraw Requests

export const getAllWithdrawRequests = createAsyncThunk(
  "withdraws/getAllWithdrawRequests",
  async (page, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      // Construct the URL with query parameters
      let url = `${serverUrl}/api/withdraw/getallwithdrawrequests?`;
      if (page) {
        url += `page=${page}&`; // Append page number if available
      }

      // Make the API request
      const { data } = await axios.get(url, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update Withdraw Request
export const updateWithdrawRequest = createAsyncThunk(
  "withdraws/updateWithdrawRequest",
  async ({ updateData, id }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/withdraw/updatewithdrawrequest/${id}`,
        updateData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete Withdraw Request
export const deleteWithdrawRequest = createAsyncThunk(
  "withdraws/deleteWithdrawRequest",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${serverUrl}/api/withdraw/deletewithdrawrequest/${id}`,
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
    resetMessage: (state) => {
      state.message = false;
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
      })
      .addCase(getAllWithdrawRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWithdrawRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.totalPages = action.payload.totalPages;
        state.totalWithdraws = action.payload.totalWithdraws;
        state.allWithdraws = action.payload.withdraws;
        state.pendingRequest = action.payload.pendingRequests;
      })
      .addCase(getAllWithdrawRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateWithdrawRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWithdrawRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateWithdrawRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWithdrawRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWithdrawRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteWithdrawRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = withdrawSlice.actions;

export default withdrawSlice.reducer;
