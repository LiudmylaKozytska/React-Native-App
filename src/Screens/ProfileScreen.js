import React from "react";
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

import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { handleLogout } from "../redux/auth/authOperations";
import { selectUserPosts } from "../redux/posts/selectors";
import { selectUserPhoto, selectLogin } from "../redux/auth/selectors";

import { styles } from "../styles/ProfileStyles";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const userPhoto = useSelector(selectUserPhoto);
  const posts = useSelector(selectUserPosts);

  const PostItem = ({ item }) => {
    return (
      <View style={styles.postsList}>
        <Image source={{ uri: item.photo }} style={styles.post} />
        <View>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.commentWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Comments", {
                  postId: item.id,
                  postImg: item.photo,
                })
              }
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
        source={require("../../assets/images/background_photo.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.userInfo}>
            <TouchableOpacity
              style={styles.logOutBtn}
              onPress={() => {
                dispatch(handleLogout());
                navigation.navigate("Login");
              }}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.imgBox}>
              <Image style={styles.avatar} source={{ uri: userPhoto }} />
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
