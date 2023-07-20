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
import { selectUser, selectUserPhoto } from "../redux/auth/selectors";
import { styles } from "../styles/CommentsStyles";

export const CommentsScreen = ({ route }) => {
  const { postId, postImg } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const userAvatar = useSelector(selectUserPhoto);
  let filteredComments = [];

  useEffect(() => {
    const fetchComments = async () => {
      const commentsResult = await dispatch(getAllComments());
      setComments(commentsResult.payload);
    };
    fetchComments();
  }, []);

  if (comments) {
    console.log("comments filtered ------>", comments);
    filteredComments = comments.filter((item) => item.postId === postId);
  } else {
    return;
  }

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
      </View>
      <Text>{item.comment}</Text>
    </View>
  );

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      dispatch(addComment({ postId, comment: commentText }));
      setCommentText("");
    }
  };

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
            data={filteredComments}
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
