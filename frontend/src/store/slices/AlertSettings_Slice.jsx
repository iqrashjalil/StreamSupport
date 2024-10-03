import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: null,
};

export const updateAlertSettings = createAsyncThunk(
  "alertSettings/updateAlertSettings",
  async (updateData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/alert/updatealertsettings`,
        updateData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Uplaod Alert Image
export const uploadAlertImage = createAsyncThunk(
  "alertSettings/updateAlertImage",
  async (alertImage, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/alert/updatealertimage`,
        alertImage,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Uplaod Alert Sound

export const uploadAlertSound = createAsyncThunk(
  "alertSettings/uploadAlertSound",
  async (alertSound, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/alert/updatealertsound`,
        alertSound,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const alertSettingsSlice = createSlice({
  name: "alertSettings",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAlertSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAlertSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateAlertSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Alert Image
      .addCase(uploadAlertImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAlertImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(uploadAlertImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Upload Alert Sound
      .addCase(uploadAlertSound.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAlertSound.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(uploadAlertSound.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = alertSettingsSlice.actions;

export default alertSettingsSlice.reducer;
