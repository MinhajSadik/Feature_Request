import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  //   reducer: {
  //     posts: postsReducer,
  //     comments: commentsReducer,
  //     users: usersReducer,
  //   },
});
