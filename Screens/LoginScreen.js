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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Войти</Text>
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
            <SubmitButton title={"Войти"} />
            <TouchableOpacity>
              <Text style={styles.loginText}>
                Нет аккаунта? Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};
