import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";

import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { Home } from "./Screens/Home";
import { CreatePostScreen } from "./Screens/CreatePostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";
import { MapScreen } from "./Screens/MapScreen";

export default function App() {
  const MainStack = createStackNavigator();

  // const [fontsLoaded] = useFonts({
  //   RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
  //   RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <Home />
    // <NavigationContainer>
    //   <MainStack.Navigator initialRouteName="Home">
    //     <MainStack.Screen
    //       name="Registration"
    //       component={RegistrationScreen}
    //       options={{
    //         headerStyle: {
    //           height: 0,
    //         },
    //       }}
    //     />
    //     <MainStack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{
    //         headerStyle: {
    //           height: 0,
    //         },
    //       }}
    //     />
    //     <MainStack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{
    //         headerStyle: {
    //           height: 0,
    //         },
    //       }}
    //     />
    //   </MainStack.Navigator>
    // </NavigationContainer>
  );
}
