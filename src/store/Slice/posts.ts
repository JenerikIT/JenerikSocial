import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.status = "succeeded";
        state.posts.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts.status = "failed";
        console.log(action.error);
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
