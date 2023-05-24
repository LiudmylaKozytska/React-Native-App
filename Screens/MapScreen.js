import { View, Text, Image } from "react-native";

import { styles } from "../styles/PostsStyles";

export const MapScreen = () => {
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
    </View>
  );
};
