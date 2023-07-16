import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebase/config";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (data, thunkAPI) => {
    try {
      const { email, password, login, photo } = data;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userProfile = {
        displayName: login,
        email: result.user.email,
        photoURL: photo,
        uid: result.user.uid,
      };

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: photo,
      });

      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (data, thunkAPI) => {
    try {
      const { email, password } = data;
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result._tokenResponse;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, thunkAPI) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          return;
        }
        return user;
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const handleLogout = createAsyncThunk(
  "auth/handleLogout",
  async (_, thunkAPI) => {
    try {
      const result = await auth.signOut();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
