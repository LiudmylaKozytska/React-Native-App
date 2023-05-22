import React, { useState } from "react";
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
import { styles } from "../styles/RegistrationStyles";

import { SubmitButton } from "../components/SubmitButton";

export const Registration = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
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
                  style={styles.formInput}
                  placeholderTextColor={"#BDBDBD"}
                  placeholder="Логин"
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.formInput}
                  placeholderTextColor={"#BDBDBD"}
                  keyboardType="email-address"
                  placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.formPasswordInput}
                  placeholderTextColor={"#BDBDBD"}
                  textContentType="password"
                  placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity style={styles.showPasswordContainer}>
                  <Text style={styles.showPasswordText}>Показать</Text>
                </TouchableOpacity>
              </View>
              <SubmitButton title={"Зарегистрироваться"} />
              <Text style={styles.registerText}>Уже есть аккаунт? Войти</Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
