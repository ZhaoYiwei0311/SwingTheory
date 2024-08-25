import React, { createContext, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "../../screens/feed";

const { Screen, Navigator } = createMaterialTopTabNavigator();

export const CurrentUserProfileItemInViewContext = createContext(null);

const FeedNavigation = () => {
  const [currentUserProfileItemInView, setCurrentUserProfileItemInView] =
    useState(null);

  return (
    <CurrentUserProfileItemInViewContext.Provider
      value={currentUserProfileItemInView}
    >
      <Navigator initialRouteName="feedList" tabBar={() => <></>}>
        <Screen
          name="feedList"
          component={FeedScreen}
          initialParams={{ profile: false }}
        />
      </Navigator>
    </CurrentUserProfileItemInViewContext.Provider>
  );
};

export default FeedNavigation;
