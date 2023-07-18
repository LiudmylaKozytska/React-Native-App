import { createSlice } from "@reduxjs/toolkit";
import { addComment, getAllComments } from "./commentOperations";

const initialState = {
  comments: [],
  error: null,
  loading: false,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(getAllComments.fulfilled, (store, { payload }) => {
        store.comments = payload;
        store.error = null;
        store.loading = false;
      })
      .addCase(getAllComments.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
      })
      .addCase(addComment.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(addComment.fulfilled, (store, { payload }) => {
        store.comments = payload;
        store.error = null;
        store.loading = false;
      })
      .addCase(addComment.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
      });
  },
});

export default commentSlice.reducer;
