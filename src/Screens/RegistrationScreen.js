import React, { useState } from "react";
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
import { signUpUser } from "../redux/auth/authOperations";
import { addPhoto } from "../redux/storage";
import { SubmitButton } from "../components/SubmitButton";
import { styles } from "../styles/RegistrationStyles";

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFocusInput, setIsFocusInput] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const handleLogin = (text) => {
    setLogin(text.trim());
  };
  const handleEmail = (text) => {
    setEmail(text.trim());
  };
  const handlePassword = (text) => {
    setPassword(text.trim());
  };

  const touchWithoutSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    if (login === "" || email === "" || password === "") {
      alert("Fill all fields please!!!");
      return;
    }

    try {
      let photoURL = null;
      if (photo) {
        const photoResult = await dispatch(addPhoto(photo));
        if (photoResult.type === "storage/addPhoto/fulfilled") {
          photoURL = photoResult.payload;
        } else {
          alert("Error uploading photo!!!");
          return;
        }
      }

      const signUpResult = await dispatch(
        signUpUser({ email, password, login, photo: photoURL })
      );
      if (signUpResult.type === "auth/signUpUser/fulfilled") {
        navigation.navigate("Home");
      } else {
        alert("Incorrect registration!!!");
      }
    } catch (error) {
      console.log(error);
      alert("Error creating user!");
    }
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
      const { assets } = result;
      const selectedImage = assets[0];
      const { uri } = selectedImage;
      setPhoto(uri);
      dispatch(addPhoto(uri)).then((result) => {
        if (result.type !== "storage/addPhoto/fulfilled") {
          alert("Error uploading photo!!!");
          setPhoto(null);
        }
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={touchWithoutSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/background_photo.jpg")}
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
                {photo && (
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                      borderRadius: 16,
                    }}
                    source={{ uri: `${photo}` }}
                  />
                )}
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={pickImage}
                >
                  <Image
                    style={styles.addPhotoBtn}
                    source={require("../../assets/images/add.png")}
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
                  value={login}
                  onChangeText={handleLogin}
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

export default RegistrationScreen;
