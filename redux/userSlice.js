import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    uid: null,
    email: null,
    image: null,
    stateChange: false,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      uid: payload.uid,
      userName: payload.userName,
      email: payload.email,
      image: payload.image,
    }),
    loginUser: (state, { payload }) => ({
      uid: payload.uid,
      login: true,
      email: payload.email,
    }),
  },
});

export const userReducer = userSlice.reducer;

export const { updateUserProfile, loginUser } = userSlice.actions;
