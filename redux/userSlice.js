import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "authReducer",
  initialState: {
    login: null,
    userId: null,
    email: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile(state, { payload }) {
      state.login = payload.login;
      state.userId = payload.userId;
      state.email = payload.email;
    },
  },
});

export const authReducer = userSlice.reducer;

export const { updateUserProfile } = userSlice.actions;
