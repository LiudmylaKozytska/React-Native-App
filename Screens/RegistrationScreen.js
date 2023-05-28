import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { SubmitButton } from "../components/SubmitButton";
import { styles } from "../styles/RegistrationStyles";
import { authSignUpUser } from "../redux/operations";
import { updateUserProfile } from "../redux/userSlice";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocusInput, setIsFocusInput] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const touchWithoutSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("line-53", JSON.stringify(state));

    try {
      await createUserWithEmailAndPassword(auth, state.email, state.password);
      await updateProfile(auth.currentUser, {
        displayName: state.userName,
        photoURL: "",
      });

      const { displayName, uid, email, photoURL } = auth.currentUser;

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

    // if (isLoggedIn) {
    //   navigation.navigate("Home");
    // }
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={touchWithoutSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/background_photo.jpg")}
          style={styles.backgroundImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formContainer,
                ...Platform.select({
                  ios: {
                    marginTop: isShowKeyboard ? 200 : 219,
                  },
                  android: {
                    marginTop: isShowKeyboard ? -70 : 0,
                  },
                }),
              }}
            >
              <View style={styles.addImageContainer}>
                <TouchableOpacity style={styles.addPhotoBtn}>
                  <Image
                    style={styles.addPhotoBtn}
                    source={require("../assets/images/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.formTitle}>Регистрация</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={{
                    ...styles.formInput,
                    borderColor: isFocusInput.userName ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusInput.userName
                      ? "#FFFFFF"
                      : "#F6F6F6",
                  }}
                  placeholderTextColor={"#BDBDBD"}
                  placeholder="Логин"
                  onFocus={() =>
                    setIsFocusInput({ ...isFocusInput, userName: true })
                  }
                  onBlur={() =>
                    setIsFocusInput({ ...isFocusInput, userName: false })
                  }
                  value={state.userName}
                  onChangeText={(text) =>
                    setState({ ...state, userName: text })
                  }
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={{
                    ...styles.formInput,
                    borderColor: isFocusInput.email ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusInput.email ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholderTextColor={"#BDBDBD"}
                  keyboardType="email-address"
                  placeholder="Адрес электронной почты"
                  onFocus={() =>
                    setIsFocusInput({ ...isFocusInput, email: true })
                  }
                  onBlur={() =>
                    setIsFocusInput({ ...isFocusInput, email: false })
                  }
                  value={state.email}
                  onChangeText={(text) => setState({ ...state, email: text })}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={{
                    ...styles.formPasswordInput,
                    borderColor: isFocusInput.password ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusInput.password
                      ? "#FFFFFF"
                      : "#F6F6F6",
                  }}
                  placeholderTextColor={"#BDBDBD"}
                  textContentType="password"
                  placeholder="Пароль"
                  secureTextEntry={!isShowPassword}
                  onFocus={() =>
                    setIsFocusInput({ ...isFocusInput, password: true })
                  }
                  onBlur={() =>
                    setIsFocusInput({ ...isFocusInput, password: false })
                  }
                  value={state.password}
                  onChangeText={(text) =>
                    setState({ ...state, password: text })
                  }
                />
                <TouchableOpacity
                  style={styles.showPasswordContainer}
                  onPress={handlePasswordVisibility}
                >
                  <Text style={styles.showPasswordText}>
                    {!isShowPassword ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
              </View>
              <SubmitButton
                onPress={handleSubmit}
                title={"Зарегистрироваться"}
              />
              <Text
                style={styles.registerText}
                onPress={() => navigation.navigate("Login")}
              >
                Уже есть аккаунт? Войти
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
