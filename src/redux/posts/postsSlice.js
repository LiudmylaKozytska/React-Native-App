import { createSlice } from "@reduxjs/toolkit";

import { addPost, getPosts } from "./postsOperations";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(addPost.fulfilled, (store, { payload }) => {
        store.posts = payload;
        store.error = null;
        store.loading = false;
      })
      .addCase(addPost.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
      })
      .addCase(getPosts.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(getPosts.fulfilled, (store, { payload }) => {
        store.posts = payload;
        store.error = null;
        store.loading = false;
      })
      .addCase(getPosts.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
      });
  },
});

export default postsSlice.reducer;
