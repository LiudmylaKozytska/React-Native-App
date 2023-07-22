import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getAllComments,
} from "../redux/comments/commentOperations";
import { getPosts } from "../redux/posts/postsOperations";
import {
  selectUser,
  selectUserId,
  selectUserPhoto,
} from "../redux/auth/selectors";
import { styles } from "../styles/CommentsStyles";

export const CommentsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { postId, postImg } = route.params;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const userAvatar = useSelector(selectUserPhoto);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    fetchComments();
  }, [dispatch, postId]);

  const fetchComments = async () => {
    try {
      const commentsResult = await dispatch(getAllComments());
      if (commentsResult.payload) {
        setComments(
          commentsResult.payload.filter((item) => item.postId === postId)
        );
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({ postId, comment: commentText, userId, userAvatar })
      );
      setCommentText("");
    }
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
      </View>
      <Text>{item.comment}</Text>
    </View>
  );

  React.useLayoutEffect(() => {
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

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: `${postImg}` }} style={styles.post} />
        <SafeAreaView style={styles.wrapper}>
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id}
          ></FlatList>
        </SafeAreaView>
      </View>

      <TextInput
        placeholderTextColor={"#BDBDBD"}
        placeholder="Комментировать..."
        style={styles.input}
        value={commentText}
        onChangeText={setCommentText}
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleAddComment}
      >
        <AntDesign name="arrowup" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
