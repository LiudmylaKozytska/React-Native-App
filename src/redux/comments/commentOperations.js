import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (data, thunkAPI) => {
    try {
      await addDoc(collection(db, "comments"), {
        ...data,
      });

      const commentsSnapshot = await getDocs(collection(db, "comments"));

      const comments = [];
      commentsSnapshot.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });

      return comments;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async (data, thunkAPI) => {
    try {
      const Docs = await getDocs(collection(db, "comments"));
      const comments = [];
      Docs.forEach((doc) => {
        comments.push({ id: doc.id, ...doc.data() });
      });
      return comments;
    } catch (error) {
      console.log(error);
    }
  }
);
