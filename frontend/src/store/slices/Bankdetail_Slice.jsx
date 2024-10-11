import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  bankDetails: [],
};

export const addBankdetail = createAsyncThunk(
  "bankdetails/addBankdetail",
  async (bankDetails, { rejectWithValue }) => {
    try {
      console.log(bankDetails);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/bankdetail/addbankdetail`,
        bankDetails,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get Bank Detail
export const getBankdetail = createAsyncThunk(
  "bankdetails/getBankdetail",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/bankdetail/getbankdetail/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete bank details
export const deleteBankdetail = createAsyncThunk(
  "bankdetails/deleteBankdetail",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${serverUrl}/api/bankdetail/deleteBankdetail/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const bankdetailsSlice = createSlice({
  name: "bankdetails",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBankdetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBankdetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addBankdetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBankdetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBankdetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.bankDetails = action.payload.bankdetail;
      })
      .addCase(getBankdetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBankdetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBankdetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteBankdetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = bankdetailsSlice.actions;

export default bankdetailsSlice.reducer;
