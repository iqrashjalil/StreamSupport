import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/Users_Slice";

const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export default store;
