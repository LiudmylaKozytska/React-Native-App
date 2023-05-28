import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { handleLogout } from "../redux/operations";

import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { selectLogin } from "../redux/selectors";

import { styles } from "../styles/ProfileStyles";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const login = useSelector(selectLogin);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background_photo.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.userInfo}>
            <TouchableOpacity style={styles.logOutBtn} onPress={handleLogout}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <View style={styles.imgBox}>
              <Image
                style={styles.avatar}
                source={require("../assets/images/user.jpg")}
              />
            </View>
            <View>
              <Text style={styles.name}>{login}</Text>
            </View>
          </View>
          <View style={styles.postsList}>
            <View>
              <Image source={{}} style={styles.post} />
              <View>
                <Text style={styles.title}>Comments</Text>
              </View>
              <View style={styles.box}>
                <View style={styles.commentWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Comments");
                    }}
                  >
                    <FontAwesome name="comment" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                  <Text style={styles.commentsCount}>0</Text>
                </View>

                <View style={styles.wrapperLocation}>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons
                      name="location-outline"
                      size={24}
                      color="#BDBDBD"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.locationName}>Location</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
