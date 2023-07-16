import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "../firebase/config";

export const addPhoto = createAsyncThunk(
  "storage/addPhoto",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(data);
      const file = await response.blob();
      const uid = nanoid();
      const storageRef = ref(storage, uid);
      await uploadBytes(storageRef, file);
      const storeLink = await getDownloadURL(ref(storageRef));
      return storeLink;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePhoto = createAsyncThunk(
  "storage/deletePhoto",
  async (data, thunkAPI) => {
    try {
      const photo = await fetch(data);
      const desertRef = ref(storage, photo);
      await deleteObject(desertRef);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
