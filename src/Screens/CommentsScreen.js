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
import { selectComments } from "../redux/comments/selectors";
import { styles } from "../styles/CommentsStyles";

export const CommentsScreen = ({ route }) => {
  const { postId, postImg } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const postComments = comments.filter((item) => item.postId === postId);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text>{item.commentText}</Text>
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
            data={postComments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id}
          />
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
