import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { styles } from "../styles/LoginStyles";

import { SubmitButton } from "../components/SubmitButton";

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background_photo.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Войти</Text>
          <KeyboardAvoidingView
            style={styles.inputBox}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.formInput}
              placeholderTextColor={"#BDBDBD"}
              keyboardType="email-address"
              placeholder="Адрес электронной почты"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            style={styles.inputBox}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.formPasswordInput}
              placeholderTextColor={"#BDBDBD"}
              textContentType="password"
              placeholder="Пароль"
            />
            <TouchableOpacity style={styles.showPasswordContainer}>
              <Text style={styles.showPasswordText}>Показать</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <SubmitButton title={"Войти"} />
          <TouchableOpacity>
            <Text style={styles.loginText}>
              Нет аккаунта? Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
