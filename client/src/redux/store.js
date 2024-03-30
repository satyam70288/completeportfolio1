import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./slice/navSlice";
import pageSlice from "./slice/pageSlice";
import userSlice from "./slice/userSlice"

const store = configureStore({
  reducer: {
    nav: navSlice,
    page: pageSlice,
    user:userSlice,
  },
});

export default store;
