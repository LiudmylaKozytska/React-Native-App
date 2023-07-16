import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  signUpUser,
  handleLogout,
  getUserProfile,
} from "./authOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: null,
    uid: null,
    email: null,
    image: null,
    isAuth: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(signUpUser.fulfilled, (store, { payload }) => {
        const { uid, email, displayName, photoURL } = payload;
        store.userName = displayName;
        store.email = email;
        store.uid = uid;
        store.image = photoURL;
        store.error = null;
        store.loading = false;
        store.isAuth = true;
      })
      .addCase(signUpUser.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(signInUser.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(signInUser.fulfilled, (store, { payload }) => {
        const { email, displayName, localId, profilePicture } = payload;
        store.userName = displayName;
        store.email = email;
        store.uid = localId;
        store.image = profilePicture;
        store.error = null;
        store.loading = false;
        store.isAuth = true;
      })
      .addCase(signInUser.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(getUserProfile.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (store, { payload }) => {
        const user = payload;
        if (!user) {
          store.error = null;
          store.loading = false;
          store.isAuth = false;
        } else {
          store.email = user.email;
          store.userName = user.displayName;
          store.uid = user.uid;
          store.image = user.photoURL;
          store.error = null;
          store.loading = false;
          store.isAuth = true;
        }
      })
      .addCase(getUserProfile.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(handleLogout.pending, (store) => {
        store.error = null;
        store.loading = true;
      })
      .addCase(handleLogout.fulfilled, (store) => {
        (store.userName = ""), (store.user = "");
        store.uid = "";
        store.error = null;
        store.loading = false;
        store.isAuth = false;
      })
      .addCase(handleLogout.rejected, (store, { payload }) => {
        store.error = payload;
        store.loading = false;
        store.isAuth = false;
      });
  },
});

export default authSlice.reducer;
