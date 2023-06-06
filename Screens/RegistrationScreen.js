import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

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
import { signUpUser } from "../redux/operations";

const initialState = {
  userName: "",
  email: "",
  password: "",
  userImage: "",
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

    if (state.userName === "" || state.email === "" || state.password === "") {
      alert("Fill all fields please!!!");
      return;
    }

    dispatch(signUpUser(state));
    navigation.navigate("Home");
  };

  const handlePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setState((prevState) => ({
        ...prevState,
        userImage: result.assets[0].uri,
      }));
    }
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
                {state.userImage && (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                      borderRadius: 16,
                    }}
                    source={{ uri: state.userImage }}
                  />
                )}
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={pickImage}
                >
                  <Image
                    style={styles.addPhotoBtn}
                    source={require("../assets/images/add.png")}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.formTitle}>Реєстрація</Text>
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
                  placeholder="Логін"
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
                  onChangeText={(text) =>
                    setState({ ...state, password: text })
                  }
                />
                <TouchableOpacity
                  style={styles.showPasswordContainer}
                  onPress={handlePasswordVisibility}
                >
                  <Text style={styles.showPasswordText}>
                    {!isShowPassword ? "Показати" : "Приховати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <SubmitButton onPress={handleSubmit} title={"Зареєструватись"} />
              <Text
                style={styles.registerText}
                onPress={() => navigation.navigate("Login")}
              >
                Вже є акаунт? Увійти
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
