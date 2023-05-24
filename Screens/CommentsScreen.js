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

import { styles } from "../styles/CommentsStyles";

export const CommentsScreen = () => {
  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.userName}>{item.userName}</Text>
      <Text>{item.commentText}</Text>
    </View>
  );

  const commentsData = [
    { userName: "User Name", commentText: "Comment text 1" },
    { userName: "User Name", commentText: "Comment text 2" },
    { userName: "User Name", commentText: "Comment text 3" },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/images/CommentsImage.jpg")}
          style={styles.post}
          alt="Image"
        />
        <SafeAreaView style={styles.wrapper}>
          <FlatList
            data={commentsData}
            renderItem={renderCommentItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </SafeAreaView>
      </View>

      <TextInput
        placeholderTextColor={"#BDBDBD"}
        placeholder="Комментировать..."
        style={styles.input}
        value=""
        onChangeText={() => {}}
      ></TextInput>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <AntDesign name="arrowup" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
