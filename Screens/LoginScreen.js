import React, { useState, useEffect } from "react";
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
import { selectIsLoggedIn } from "../redux/selectors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/operations";
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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn);
      navigation.navigate("Home");
    }
  }, []);

  const touchWithoutSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(isShowKeyboard);
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    if (state.email === "" || state.password === "") {
      return;
    }

    dispatch(
      signInUser({
        email: state.email,
        password: state.password,
      })
    );

    setState(initialState);
    navigation.navigate("Home");
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
    <TouchableWithoutFeedback onPress={touchWithoutSubmit}>
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
              <Text style={styles.formTitle}>Увійти</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={{
                    ...styles.formInput,
                    borderColor: isFocusInput.email ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusInput.email ? "#FFFFFF" : "#F6F6F6",
                  }}
                  placeholderTextColor={"#BDBDBD"}
                  keyboardType="email-address"
                  placeholder="Адреса електронної пошти"
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
                    {isShowPassword ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <SubmitButton title={"Увійти"} onPress={handleSubmit} />
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={styles.loginText}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
