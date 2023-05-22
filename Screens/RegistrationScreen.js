import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/RegistrationStyles";

import { SumbitButton } from "../components/SubmitButton";

export const Registration = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background_photo.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
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
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.formInput}
              placeholderTextColor={"#BDBDBD"}
              keyboardType="email-address"
              placeholder="Адрес электронной почты"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.formPasswordInput}
              placeholderTextColor={"#BDBDBD"}
              textContentType="password"
              placeholder="Пароль"
            />
            <TouchableOpacity style={styles.showPasswordContainer}>
              <Text style={styles.showPasswordText}>Показать</Text>
            </TouchableOpacity>
          </View>
          <SumbitButton title={"Зарегистрироваться"} />
          <Text style={styles.registerText}>Уже есть аккаунт? Войти</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
