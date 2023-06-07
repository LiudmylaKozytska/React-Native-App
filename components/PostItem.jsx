import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { styles } from "../styles/PostsStyles";

const PostItem = ({ item }) => {
  const navigation = useNavigation();

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

export default PostItem;
