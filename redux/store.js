import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { user } from "./userSlice";

const rootReducer = combineReducers({
  auth: user,
});

export const store = configureStore({
  reducer: rootReducer,
});
