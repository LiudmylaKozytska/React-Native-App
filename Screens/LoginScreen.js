import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { styles } from "../styles/LoginStyles";

import { SubmitButton } from "../components/SubmitButton";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocusInput, setIsFocusInput] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    console.log("User data:", state);

    setState(initialState);
  };

  const handleInputChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/background_photo.jpg")}
          style={styles.backgroundImage}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.formContainer,
                ...Platform.select({
                  ios: {
                    marginBottom: isShowKeyboard ? -260 : 0,
                  },
                }),
              }}
            >
              <Text style={styles.formTitle}>Войти</Text>
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
                  onChangeText={(value) => handleInputChange("password", value)}
                />

                <TouchableOpacity
                  style={styles.showPasswordContainer}
                  onPress={handlePasswordVisibility}
                >
                  <Text style={styles.showPasswordText}>
                    {isShowPassword ? "Скрыть" : "Показать"}
                  </Text>
                </TouchableOpacity>
              </View>
              <SubmitButton title={"Войти"} onPress={handleSubmit} />
              <TouchableOpacity>
                <Text style={styles.loginText}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
