import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { handleLogout, fetchPosts } from "../redux/operations";

import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { selectLogin } from "../redux/selectors";

import { styles } from "../styles/ProfileStyles";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    loadPosts();
  }, []);

  const PostItem = ({ item }) => {
    return (
      <View style={styles.postsList}>
        <Image source={{ uri: item.photoUri }} style={styles.post} />
        <View>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.commentWrapper}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Comments");
              }}
            >
              <FontAwesome name="comment" size={24} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.commentsCount}>0</Text>
          </View>

          <View style={styles.wrapperLocation}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="location-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.locationName}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background_photo.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.userInfo}>
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => handleLogout(dispatch, navigation)}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.imgBox}>
              <Image
                style={styles.avatar}
                source={require("../assets/images/user.jpg")}
              />
            </View>
            <View>
              <Text style={styles.name}>{login}</Text>
            </View>
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => <PostItem key={item.id} item={item} />}
            keyExtractor={(item) => item.id}
          ></FlatList>
        </View>
      </ImageBackground>
    </View>
  );
};
