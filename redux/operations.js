import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../config";
import { updateUserProfile } from "./userSlice";

export const signUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      console.log("auth.currentUser --->", user);

      const { displayName, uid, email } = await auth.currentUser;

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
      console.log("getState - ", getState);
    }
  };
