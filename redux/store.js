import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
