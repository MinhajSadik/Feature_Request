import { configureStore } from "@reduxjs/toolkit";
import featureReducer from "./features/featureSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feature: featureReducer,
  },

  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/setUser"],
      },
    }),

  preloadedState: {
    user: {
      user: null,
      loading: false,
      error: null,
    },
    feature: {
      features: [],
      loading: false,
      error: null,
    },
  },

  // enhancers: [
  //   (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActions: ["user/setUser"],
  //       },
  //     }),
  // ],
});

// export const { setUser } = userReducer.actions;
// export const { setFeatures } = featureReducer.actions;
// export const { addNewFeature } = featureReducer.actions;
// export const { searchByFeatureName } = featureReducer.actions;
// export const { register, login } = userReducer.actions;
// export const { getFeatures } = featureReducer.actions;
