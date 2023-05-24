import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Camera } from "expo-camera";

import { styles } from "../styles/CreatePostStyles";

import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";

export const CreatePostScreen = () => {
  const cameraRef = React.createRef();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
      >
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.previewPhoto}>
            <Image source={{}} style={{ height: 100, width: 100 }} />
          </View>
          <TouchableOpacity style={styles.icon} onPress={() => {}}>
            <FontAwesome name="camera" size={20} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>

        {/* <Text style={styles.text}>Редактировать фото</Text> */}

        <Text style={styles.text}>Загрузите фото</Text>

        <View>
          <TextInput
            placeholderTextColor={"#BDBDBD"}
            placeholder="Название..."
            style={styles.input}
            value=""
            onChangeText={() => {}}
          ></TextInput>

          <TextInput
            placeholderTextColor={"#BDBDBD"}
            placeholder="Местность..."
            style={styles.inputLocation}
            value=""
            onChangeText={() => {}}
          ></TextInput>
          <TouchableOpacity style={styles.locationBtn} onPress={() => {}}>
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabBarWrapper}></View>

        {/* <TouchableOpacity
            style={styles.buttonActive}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Text style={styles.buttonTextActive}>Опубликовать</Text>
          </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Опубликовать</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
