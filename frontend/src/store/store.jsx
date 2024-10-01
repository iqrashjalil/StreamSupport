import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/Users_Slice";
import donationSlice from "./slices/Donation_Slice";
import withdrawSlice from "./slices/Withdraw_Slice";
import bankdetails from "./slices/Bankdetail_Slice";

const store = configureStore({
  reducer: {
    users: userSlice,
    donations: donationSlice,
    withdraws: withdrawSlice,
    bankdetails: bankdetails,
  },
});

export default store;
