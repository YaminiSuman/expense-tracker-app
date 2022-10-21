import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "../redux/expenseReducer";

export const store = configureStore({
  reducer: {
    expenseReducer: expenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
