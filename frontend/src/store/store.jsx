import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/Users_Slice";
import donationSlice from "./slices/Donation_Slice";
import withdrawSlice from "./slices/Withdraw_Slice";
const store = configureStore({
  reducer: {
    users: userSlice,
    donations: donationSlice,
    withdraws: withdrawSlice,
  },
});

export default store;
