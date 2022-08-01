import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features/featureSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feature: featureReducer,
  },
});
