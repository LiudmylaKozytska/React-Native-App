import React, { useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/PostsStyles";
import {
  selectUserPhoto,
  selectLogin,
  selectUserEmail,
} from "../redux/auth/selectors";
import { selectAllPosts } from "../redux/posts/selectors";
import { selectComments } from "../redux/comments/selectors";
import { handleLogout } from "../redux/auth/authOperations";
import { getPosts } from "../redux/posts/postsOperations";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const posts = useSelector(selectAllPosts);
  const comments = useSelector(selectComments);

  const commentsCount = (id) => {
    const comment = comments.filter((item) => item.postId === id).length;
    return comment;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            onPress={() => {
              navigation.navigate("Login");
              dispatch(handleLogout());
            }}
          />
        </View>
      ),
    });
  }, [dispatch, navigation]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const PostItem = ({ item }) => {
    return (
      <View>
        <Image source={{ uri: item.photo }} style={styles.post} />
        <View>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.commentWrapper}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Comments", {
                  postId: item.id,
                  postImg: item.photo,
                });
              }}
            >
              <Feather name="message-circle" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.commentsCount}>{commentsCount(item.id)}</Text>
          </View>

          <TouchableOpacity
            style={styles.wrapperLocation}
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
            <Text style={styles.locationName}>{item.location}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image style={styles.avatar} source={{ uri: userPhoto }} />
        </View>
        <View>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem key={item.id} item={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};
