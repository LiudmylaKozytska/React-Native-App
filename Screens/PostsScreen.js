import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleLogout, fetchPosts } from "../redux/operations";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import PostItem from "../components/PostItem";
import { styles } from "../styles/PostsStyles";
import { selectLogin, selectUserEmail } from "../redux/selectors";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const userEmail = useSelector(selectUserEmail);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
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
