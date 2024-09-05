import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeIcon, AddIcon, UserIcon } from "../../components/icons/icons";
import { theme } from "../../constants/theme";
import HomeScreen from "../../screens/home";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return <View></View>;
};

export default function MainScreen() {
  return (
    <Tab.Navigator
      activeColor={theme.colors.primaryDark2}
      inactiveColor="white"
      barStyle={{
        backgroundColor: theme.colors.primary,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
      }}
      initialRouteName="main"
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="Add"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("camera");
          },
        })}
        options={{
          tabBarIcon: ({ color }) => <AddIcon color={color} />,
        }}
      />

      <Tab.Screen
        name="Me"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
