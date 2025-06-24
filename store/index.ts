import { configureStore } from "@reduxjs/toolkit";
import summaryReducer from "./summarySlice";

const store = configureStore({
  reducer: {
    summary: summaryReducer,
  },
});

export default store;
