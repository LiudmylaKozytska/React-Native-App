import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    userId: null,
    email: null,
    image: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      userId: payload.userId,
      userName: payload.userName,
      email: payload.email,
      image: payload.image,
    }),
    loginUser: (state, { payload }) => ({
      userId: payload.userId,
      login: true,
      email: payload.email,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const { updateUserProfile, loginUser } = userSlice.actions;
