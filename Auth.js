import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { CreatePostScreen } from "./Screens/CreatePostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Registration">
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;