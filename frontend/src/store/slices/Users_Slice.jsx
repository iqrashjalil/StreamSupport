import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

export const register = createAsyncThunk(
  "users/register",
  async (formdata, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/user/register`,
        formdata,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (formdata, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${serverUrl}/api/user/login`,
        formdata,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getDonationStats = createAsyncThunk(
  "users/getDonationStats",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${serverUrl}/api/user/getTopStreamers`,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };

      const { data } = await axios.get(`${serverUrl}/api/user/getUser`, config);

      return data;
    } catch (error) {
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
      .addCase(getDonationStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default usersSlice.reducer;
