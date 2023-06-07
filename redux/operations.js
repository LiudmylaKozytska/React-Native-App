import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { db, auth } from "../config";
import { updateUserProfile, loginUser } from "./userSlice";

export const signUpUser =
  ({ userName, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      const { uid } = await auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
      });

      const newUser = {
        userName,
        email,
        uid,
        posts: [],
      };

      const docRef = doc(db, "users", uid);
      await setDoc(docRef, newUser);

      dispatch(
        updateUserProfile({
          uid,
          login: true,
          userName: userName,
          email: email,
          image: user.photoURL,
        })
      );
      console.log("User document created with ID:", uid);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      if (user) {
        const { userName, uid } = user;
        console.log(userName);

        dispatch(
          updateUserProfile({
            userId: uid,
            login: true,
            userName,
            email,
            // image: user.photoURL,
          })
        );
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    const user = await auth.currentUser;
    const { userName, uid, email } = user;
    dispatch(
      updateUserProfile({
        userId: uid,
        login: true,
        userName,
        email,
        image: user.photoURL,
      })
    );
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const checkLoggedInUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginUser({
            userId: user.uid,
            email: user.email,
          })
        );
      } else {
        // dispatch(logoutUser());
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const handleLogout = async (dispatch, navigation) => {
  try {
    await signOut(auth);
    dispatch(updateUserProfile({ userId: null, login: false, email: null }));
    navigation.navigate("Login");
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const uploadPhoto = async (userId, uri) => {
  const storageRef = getStorage().ref(`users/${userId}/profile.jpg`);

  try {
    await storageRef.putFile(uri);
    const downloadUrl = await storageRef.getDownloadURL();
    console.log("URL фото:", downloadUrl);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const createPost = async (photoUri, name, location) => {
  try {
    const user = await auth.currentUser;
    const userId = user.uid;

    console.log("user with id --> ", userId);

    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      const post = {
        photoUri,
        name,
        // location,
        userId,
      };

      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Post created with ID:", docRef.id);

      await updateDoc(userDocRef, {
        posts: [...userData.posts, docRef.id],
      });

      const querySnapshot = await getDocs(
        collection(db, "users", userId, "posts")
      );
      querySnapshot.forEach((doc) => {
        console.log("Post data:", doc.data());
      });
    }
  } catch (error) {
    console.log("Error creating post:", error);
  }
};

export const fetchPosts = async (post) => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    console.log("Post getting data:", posts);

    return posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
};

export const addComment = createAsyncThunk(
  "comments/fetchAddComment",
  async ({ postId, comment }) => {
    try {
      const user = await auth.currentUser;
      const userId = user.uid;

      const postRef = doc(db, "users", userId, "posts", postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postDocRef = doc(
          db,
          "users",
          userId,
          "posts",
          postId,
          "comments"
        );
        await addDoc(postDocRef, { comment });

        const commentsSnapshot = await getDocs(postDocRef);
        const comments = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return comments;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "comments/fetchGetAllComments",
  async (data, thunkAPI) => {
    try {
      const Docs = await getDocs(collection(db, "comments"));
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
