import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  recentDonations: [],
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
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getRecentDonations = createAsyncThunk(
  "donations/getRecentDonations",
  async ({ id, page }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      let url = `${serverUrl}/api/donation/getrecentdonations/${id}?`;
      if (page) {
        url += `page=${page}`;
      }

      const { data } = await axios.get(url, config);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get All Users Donation Year
export const getYearDonationsOfAllUsers = createAsyncThunk(
  "donations/getYearDonationsOfAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/donation/getyeardonationsofallusers`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Give Donation
export const giveDonation = createAsyncThunk(
  "donations/giveDonation",
  async ({ id, formdata }, { rejectWithValue }) => {
    try {
      console.log(formdata);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/donation/givedonation/${id}`,
        formdata,
        config
      );
      console.log(formdata);

      return data;
    } catch (error) {
      console.log(error.response.data);

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
        state.currenWeekTopDonators = action.payload.top10CurrentWeekDonators;
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
        state.totalDonationCount = action.payload.totalSuperchats;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getRecentDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getYearDonationsOfAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getYearDonationsOfAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recentDonations = action.payload.donations;
        state.allUsersYearlyDonations = action.payload.donations;
      })
      .addCase(getYearDonationsOfAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(giveDonation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(giveDonation.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.donation = action.payload.donation;
        state.redirectUrl = action.payload.redirectUrl;
      })
      .addCase(giveDonation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = donationSlice.actions;

export default donationSlice.reducer;
