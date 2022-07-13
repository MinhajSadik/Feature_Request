import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features/featureSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    features: featureReducer,
  },
});

// export const { setUser } = userReducer.actions;
// export const { setFeatures } = featureReducer.actions;
// export const { addNewFeature } = featureReducer.actions;
// export const { searchByFeatureName } = featureReducer.actions;
// export const { register, login } = userReducer.actions;
// export const { getFeatures } = featureReducer.actions;
