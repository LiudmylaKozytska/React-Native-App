import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
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
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { db, auth } from "../firebase/config";

// export const checkLoggedInUser = () => async (dispatch, getState) => {
//   try {
//     await onAuthStateChanged(auth, (user) => {
//       if (user) {
//         dispatch(
//           loginUser({
//             userId: user.uid,
//             email: user.email,
//           })
//         );
//       } else {
//         dispatch(logoutUser());
//       }
//     });
//   } catch (error) {
//     console.log("error check logged in user message", error.message);
//   }
// };

export const uploadPhoto = async (userId, uri) => {
  const storageRef = getStorage().ref(`users/${userId}/profile.jpg`);

  try {
    await storageRef.putFile(uri);
    const downloadUrl = await storageRef.getDownloadURL();
    console.log("URL photo:", downloadUrl);
  } catch (error) {
    console.log("Error upload photo:", error);
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
        location,
        id: nanoid(),
        comments: [],
      };

      await updateDoc(userDocRef, {
        posts: [...userData.posts, post],
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

export const fetchPosts = async () => {
  let posts;
  try {
    const user = auth.currentUser;
    const userId = user.uid;
    console.log("fetch posts user id", userId);

    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      console.log("User data:", userData);

      return (posts = userData.posts);
    }
  } catch (error) {
    console.log("Error getting posts:", error);
    return [];
  }
};

export const addComment = createAsyncThunk(
  "comments/addNewComment",
  async ({ postId, commentText }) => {
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
  "comments/fetchComments",
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
