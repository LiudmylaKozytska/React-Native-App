import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, userDocRef, updateDoc } from "firebase/firestore";
import { db, auth } from "../config";
import { updateUserProfile, loginUser, logoutUser } from "./userSlice";

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

      dispatch(
        updateUserProfile({
          userId: uid,
          login: true,
          userName: userName,
          email: email,
          image: user.photoURL,
        })
      );

      const docRef = await addDoc(collection(db, "users"), {
        userName: user.displayName,
        stateChange: new Date(),
        email: user.email,
        id: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const signInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { displayName, uid } = await auth.currentUser;

      dispatch(
        loginUser({
          userId: uid,
          email: email,
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

export const handleLogout = async () => {
  try {
    await signOut(auth);
    dispatch(updateUserProfile({ userId: null, login: false, email: null }));
    navigation.navigate("Login");
  } catch (error) {
    console.log("error.message", error.message);
  }
};

export const uploadPhoto = async (userId, uri) => {
  const storageRef = storage().ref(`users/${userId}/profile.jpg`);

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
    const docRef = await addDoc(collection(db, "posts"), {
      photoUri,
      name,
      // location,
    });

    console.log("Post created with ID:", docRef.id);
  } catch (error) {
    console.log("Error creating post:", error);
  }
};
