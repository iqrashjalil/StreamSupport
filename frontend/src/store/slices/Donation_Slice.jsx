import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const getWeekEarnings = createAsyncThunk(
  "donations/getWeekEarnings",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/donation/getweekearnings/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getDonationsStats = createAsyncThunk(
  "donations/getDonationsStats",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/donation/getdonationstats/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getYearDonations = createAsyncThunk(
  "donations/getYearDonations",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/donation/getyeardonations/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllDonations = createAsyncThunk(
  "donations/getAllDonations",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/donation/getalldonations/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getRecentDonations = createAsyncThunk(
  "donations/getRecentDonations",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/donation/getrecentdonations/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const donationSlice = createSlice({
  name: "donations",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeekEarnings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeekEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.earningStats = action.payload.earningStats;
      })
      .addCase(getWeekEarnings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDonationsStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDonationsStats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.donationsStats = action.payload.donationsStats;
      })
      .addCase(getDonationsStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getYearDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYearDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.yearDonations = action.payload.donations;
      })
      .addCase(getYearDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allDonations = action.payload.donations;
        state.topDonators = action.payload.donators;
      })
      .addCase(getAllDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRecentDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecentDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recentDonations = action.payload.donations;
      })
      .addCase(getRecentDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = donationSlice.actions;

export default donationSlice.reducer;
