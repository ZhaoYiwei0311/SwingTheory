import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "../home";
import SavePostScreen from "../../screens/savePost";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="savePost"
            component={SavePostScreen}
            options={{ headerShown: false }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
