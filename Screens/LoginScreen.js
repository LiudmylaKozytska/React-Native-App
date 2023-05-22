import {
  Text,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { styles } from "../styles/LoginStyles";

import { SumbitButton } from "../components/SubmitButton";

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background_photo.jpg")}
        style={styles.backgroundImage}
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
          <SumbitButton title={"Войти"} />
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
