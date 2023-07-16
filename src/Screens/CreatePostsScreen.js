import React, { useState, useLayoutEffect, useEffect } from "react";
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
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";

import { selectUserId } from "../redux/auth/selectors";
import { addPost } from "../redux/posts/postsOperations";
import { addPhoto } from "../redux/storage";

import { Feather, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { styles } from "../styles/CreatePostStyles";

export const CreatePostScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  const uid = useSelector(selectUserId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const coords = location.coords;

      console.log("location", location);
      const geocodeResponse = await Location.reverseGeocodeAsync(coords);

      setLocation(geocodeResponse);
    };
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const handleSubmitPost = async () => {
    await dispatch(addPost({ photo, name, location }));
    navigation.navigate("Posts");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
      >
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.previewPhoto}>
              <Image
                source={{ uri: photo }}
                style={{ height: 240, width: "100%" }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.icon} onPress={() => takePhoto()}>
            <FontAwesome
              name="camera"
              size={20}
              color={photo ? "#FFFFFF" : "#BDBDBD"}
            ></FontAwesome>
          </TouchableOpacity>
        </Camera>

        <Text style={styles.text}>
          {photo ? "Редагувати фото" : "Загрузити фото"}
        </Text>

        <View>
          <TextInput
            placeholderTextColor="#BDBDBD"
            placeholder="Назва..."
            style={styles.input}
            value={name}
            onChangeText={(value) => {
              setName(value.trim());
            }}
          />
          <TextInput
            placeholderTextColor="#BDBDBD"
            placeholder="Місцевість..."
            style={styles.inputLocation}
            value={location}
            onChangeText={(value) => {
              setLocation(value.trim());
            }}
          />
          <Ionicons
            name="location-outline"
            size={24}
            color="#BDBDBD"
            style={styles.locationBtn}
          />
        </View>

        <View style={styles.tabBarWrapper} />
        {photo && name && location ? (
          <TouchableOpacity
            style={styles.buttonActive}
            activeOpacity={0.8}
            onPress={handleSubmitPost}
            debug
          >
            <Text style={styles.buttonTextActive}>Публікувати</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Публікувати</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.deleteBtn}
          activeOpacity={0.8}
          onPress={() => {
            setPhoto(null);
            setLocation("");
            setName("");
          }}
          disabled={!photo && !location && !name}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
