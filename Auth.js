import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedInUser } from "./redux/operations";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import Home from "./Screens/Home";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoggedInUser());
  }, [dispatch]);

  return (
    <AuthStack.Navigator initialRouteName="Login">
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
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
