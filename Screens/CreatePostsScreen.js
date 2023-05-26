import React, { useState, useLayoutEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { Feather, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { styles } from "../styles/CreatePostStyles";

export const CreatePostScreen = () => {
  const navigation = useNavigation();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

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

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission not granted");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const apiKey = "pk.ac7a441bd462fa3aa0b8d5b701b6e8b1";

    const geocodeResponse = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
    );
    const geocodeData = await geocodeResponse.json();
    const cityName = geocodeData.address.city_district;
    console.log(geocodeData);
    console.log(cityName);

    setLocation(cityName);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    getLocation();
    setPhoto(photo.uri);
  };

  const handleLocationButtonPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission not granted");
      return;
    }
    getLocation();
    console.debug("Name:", name);
    console.debug("Location:", location);
    console.debug("Photo:", photo);
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
          <TouchableOpacity style={styles.icon} onPress={takePhoto}>
            <FontAwesome
              name="camera"
              size={20}
              color={photo ? "#FFFFFF" : "#BDBDBD"}
            ></FontAwesome>
          </TouchableOpacity>
        </Camera>

        <Text style={styles.text}>
          {photo ? "Редактировать фото" : "Загрузите фото"}
        </Text>

        <View>
          <TextInput
            placeholderTextColor="#BDBDBD"
            placeholder="Название..."
            style={styles.input}
            value={name}
            onChangeText={(value) => {
              setName(value);
            }}
          />
          <TextInput
            placeholderTextColor="#BDBDBD"
            placeholder="Местность..."
            style={styles.inputLocation}
            value={location}
            onChangeText={(value) => {
              setLocation(value);
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
            onPress={handleLocationButtonPress}
            debug
          >
            <Text style={styles.buttonTextActive}>Опубликовать</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Posts")}
          >
            <Text style={styles.buttonText}>Опубликовать</Text>
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
