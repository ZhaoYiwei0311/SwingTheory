import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "../home";
import SavePostScreen from "../../screens/savePost";
import WelcomeScreen from "../../screens/welcome";
import LoginScreen from "../../screens/login";
import CameraScreen from "../../screens/camera";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../../screens/signUp";
import { useEffect } from "react";
import { userAuthStateListener } from "../../redux/actions/auth";
import TestScreen from "../../screens/test";
import { MailIcon } from "../../components/icons/icons";

const Stack = createStackNavigator();

export default function Route() {
  const currentUserObj = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        {currentUserObj.currentUser == null ? (
          <>
            <Stack.Screen
              name="welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="main"
              component={MailIcon}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="savePost"
              component={SavePostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="camera"
              component={CameraScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="test"
              component={TestScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
