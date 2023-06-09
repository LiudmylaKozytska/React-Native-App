import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleLogout, fetchPosts } from "../redux/operations";
import { useSelector, useDispatch } from "react-redux";
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/PostsStyles";
import {
  selectLogin,
  selectUserEmail,
  selectIsLoggedIn,
} from "../redux/selectors";
import { checkLoggedInUser } from "../redux/operations";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const userEmail = useSelector(selectUserEmail);
  const [posts, setPosts] = useState([]);
  const loggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      console.log("fetched posts in posts screen -->", fetchedPosts);
      if (fetchedPosts) {
        setPosts(fetchedPosts);
      }
    };

    loadPosts();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            onPress={() => handleLogout(dispatch, navigation)}
          />
        </View>
      ),
    });
  }, [navigation]);

  const PostItem = ({ item }) => {
    return (
      <View>
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
              <Feather name="message-circle" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <Text style={styles.commentsCount}>0</Text>
          </View>

          <TouchableOpacity
            style={styles.wrapperLocation}
            onPress={() => {
              navigation.navigate("Map");
            }}
          >
            <Ionicons name="location-outline" size={24} color="#BDBDBD" />
            <Text style={styles.locationName}>Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          {/* <Image style={styles.avatar} source={{ uri: avatar }} /> */}
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
