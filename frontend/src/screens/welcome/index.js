import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { StatusBar } from "expo-status-bar";
import { wp } from "../../constants/common";
import { theme } from "../../constants/theme";
import Button from "../../components/button";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../../images/welcome_image.jpg")}
        />

        {/* title */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>APP NAME!</Text>
          <Text style={styles.punchline}>
            App Tagline. App Tagline. App Tagline. App Tagline.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => navigation.navigate("signUp")}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account!</Text>
            <Pressable onPress={() => navigation.navigate("login")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default WelcomeScreen;
