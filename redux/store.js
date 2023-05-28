import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
