import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleLogout } from "../redux/operations";
import { useSelector } from "react-redux";
import { Ionicons, Feather } from "@expo/vector-icons";
import { styles } from "../styles/PostsStyles";
import {
  selectLogin,
  selectUserEmail,
  selectUserAvatar,
} from "../redux/selectors";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const login = useSelector(selectLogin);
  const userEmail = useSelector(selectUserEmail);
  const avatar = useSelector(selectUserAvatar);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            onPress={handleLogout}
          />
        </View>
      ),
    });
  }, [navigation]);
  console.log(avatar);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
        </View>
        <View>
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      <View>
        <Image source={{}} style={styles.post} />

        <View>
          <Text style={styles.title}>Comment</Text>
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
    </View>
  );
};
