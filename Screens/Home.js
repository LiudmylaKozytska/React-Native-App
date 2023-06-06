import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { selectIsLoggedIn } from "../redux/selectors";

import { MapScreen } from "./MapScreen";
import { PostsScreen } from "./PostsScreen";
import { CreatePostScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CommentsScreen } from "./CommentsScreen";
import { LoginScreen } from "./LoginScreen";

const Tab = createBottomTabNavigator();

const Home = () => {
  const loggedIn = useSelector(selectIsLoggedIn);

  if (loggedIn) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            tabBarLabel: "",
          }}
        />
        <Tab.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <View style={styles.btn}>
                <AntDesign name="plus" size={size} color={"#FFF"} />
              </View>
            ),
            tabBarLabel: "",
            tabBarVisible: false,
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" color={color} size={size} />
            ),
            tabBarLabel: "",
          }}
        />
        <Tab.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: () => false,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: () => false,
          }}
        />
      </Tab.Navigator>
    );
  } else {
    return <LoginScreen />;
  }
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    top: 2,
    width: 70,
    height: 40,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FF6C00",
    borderRadius: 20,
  },
});

export default Home;
