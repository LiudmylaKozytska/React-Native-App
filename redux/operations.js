import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config";
import { updateUserProfile, authStateChange, authSignOut } from "./userSlice";

export const signUpUser =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await auth.currentUser;

      console.log("====================================");
      console.log("auth.currentUser --->", auth.currentUser);
      console.log("====================================");

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: "",
      });

      const { displayName, uid, email, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
          email,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("errorCode - ", errorCode);
      console.log("errorMessage - ", errorMessage);
    }
  };
