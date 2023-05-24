import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { styles } from "../styles/PostsStyles";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image
            style={styles.avatar}
            source={require("../assets/images/user.jpg")}
          />
        </View>
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <View>
        <Image source={{}} style={styles.post} />

        <View>
          <Text style={styles.title}>Comment</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.commentWrapper}>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="message-circle" size={24} color="#BDBDBD" />
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
    </View>
  );
};
