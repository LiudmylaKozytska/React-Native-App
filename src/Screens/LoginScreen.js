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
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/auth/authOperations";
import { selectIsAuth } from "../redux/auth/selectors";
import { styles } from "../styles/LoginStyles";

import { SubmitButton } from "../components/SubmitButton";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocusInput, setIsFocusInput] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (loggedIn) {
      navigation.navigate("Home");
    }
  }, [loggedIn, navigation]);

  const touchWithoutSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleEmail = (text) => {
    setEmail(text.trim());
  };
  const handlePassword = (text) => {
    setPassword(text.trim());
  };

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    if (email === "" || password === "") {
      return;
    }

    try {
      const signInResult = await dispatch(signInUser({ email, password }));
      if (signInResult.type === "auth/signInUser/fulfilled") {
        navigation.navigate("Home");
      } else {
        console.log("signInResult.type", signInResult.type);
        alert("Failed signIn!!!");
      }
    } catch (error) {
      console.log(error);
      alert("Error sign in user!");
    }
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={touchWithoutSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background_photo.jpg")}
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
                  value={email}
                  onChangeText={handleEmail}
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
                  value={password}
                  onChangeText={handlePassword}
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

export default LoginScreen;
