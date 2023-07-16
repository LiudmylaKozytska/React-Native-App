import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, thunkAPI) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...data,
      });

      const Docs = await getDocs(collection(db, "posts"));
      const result = [];
      Docs.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    const posts = [];
    try {
      const postsDocRef = collection(db, "posts");
      const postsDocSnapshot = await getDocs(postsDocRef);
      postsDocSnapshot.forEach((post) => {
        posts.push({ id: post.id, ...post.data() });
      });
      return posts;
    } catch (e) {
      console.log(e);
    }
  }
);
