import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addNewComment: (state, action) => {
      state.comments.push(action.payload);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const commentReducer = commentsSlice.reducer;

export const { addNewComment, setComments } = commentsSlice.actions;
