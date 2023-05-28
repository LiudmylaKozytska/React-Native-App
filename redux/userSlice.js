import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: null,
    userId: null,
    email: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
    }),
    loginUser: (state, { payload }) => ({
      userId: payload.userId,
      login: true,
      email: payload.email,
    }),
  },
});

export const user = userSlice.reducer;

export const { updateUserProfile, loginUser } = userSlice.actions;
