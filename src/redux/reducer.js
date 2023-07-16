import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import postsReducer from "./posts/postsSlice";
// import commentsSliceReduser from "./comments/commentsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  //   comments: commentsSliceReduser,
});

export default rootReducer;
