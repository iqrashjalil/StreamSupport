import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverUrl.jsx";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  userAlertSettings: null,
};

export const updateAlertSettings = createAsyncThunk(
  "alertSettings/updateAlertSettings",
  async (updateData, { rejectWithValue }) => {
    try {
      console.log(updateData);

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

// Uplaod Audio Alerts

export const addAudioAlert = createAsyncThunk(
  "alertSettings/addAudioAlert",
  async (alertSound, { rejectWithValue }) => {
    try {
      console.log(alertSound);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/alert/updateaudioalertsounds`,
        alertSound,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Uplaod Audio Alerts

export const updateAudioAlert = createAsyncThunk(
  "alertSettings/updateAudioAlert",
  async (updateAudio, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/alert/updateaudioalert/${updateAudio.alertId}`,
        updateAudio,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete Audio Alert
export const deleteAudioAlert = createAsyncThunk(
  "alertSettings/deleteAudioAlert",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.patch(
        `${serverUrl}/api/alert/deleteaudioalert/${id}`,
        {},
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get Alert Settings
export const getAlertSettings = createAsyncThunk(
  "alertSettings/getAlertSettings",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/alert/getalertsettings/${id}`
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
      })
      // Upload Audio Alerts
      .addCase(addAudioAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAudioAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addAudioAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Audio Alerts
      .addCase(updateAudioAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAudioAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateAudioAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Audio Alerts
      .addCase(deleteAudioAlert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAudioAlert.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(deleteAudioAlert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Alert Settings
      .addCase(getAlertSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAlertSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userAlertSettings = action.payload.getAlertSettingsDocument;
      })
      .addCase(getAlertSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = alertSettingsSlice.actions;

export default alertSettingsSlice.reducer;
