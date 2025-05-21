import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "@/shared/model/session";
import loadingPageSlice from "@/shared/model/loadingPage";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    loadingPage: loadingPageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
