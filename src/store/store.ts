import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import favourite from "./Slice/favourite";
import postsSlice from "./Slice/posts";
import valueHeaderSearch from "./Slice/searchHeader";
import { postsApi } from "../api/posts/postsApi";
import { authApi } from "../api/auth/authApi";

export const store = configureStore({
  reducer: {
    favourite,
    posts: postsSlice,
    valueHeaderSearch,
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
