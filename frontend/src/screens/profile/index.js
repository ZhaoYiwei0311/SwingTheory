import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import Avatar from "../../components/avartar/index";
import Loading from "../../components/loading";
import { Image } from "expo-image";
import styles from "./styles";
import {
  EditIcon,
  LogOutIcon,
  MailIcon,
  PhoneIcon,
} from "../../components/icons/icons";
import {} from "@react-navigation/native";
import { getUserInfo } from "../../services/user";
import Button from "../../components/button";
// import { fetchPosts } from "../../services/postService";
// import PostCard from "../../components/PostCard";
// import { getUserImageSrc } from "../../services/imageService";

var limit = 0;
const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(() => getUserInfo());
  console.log("profileData: ", profileData);

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      console.log("ProfileScreen was focused");
      (async () => {
        const data = await getUserInfo();
        setProfileData(data);
      })();
    }, [])
  );

  // first do this
  const getPosts = async () => {
    if (!hasMore) return null; // if no more posts then don't call the api
    limit = limit + 10; // get 10 more posts everytime
    console.log("fetching posts: ", limit);
    let res = await fetchPosts(limit, user.id);
    if (res.success) {
      if (posts.length == res.data.length) setHasMore(false);
      setPosts(res.data);
    }
  };

  const onLogout = async () => {
    navigation.navigate("welcome");
  };

  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure you want log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      {/* first create UserHeader and use it here, then move it to header comp when implementing user posts */}
      {/* posts */}
      <FlatList
        data={{ 1: 1 }}
        ListHeaderComponent={
          <UserHeader
            navigation={navigation}
            handleLogout={handleLogout}
            profileData={profileData}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 30 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          // currentUser={user}
          <PostCard item={item} navigation={navigation} />
        )}
        onEndReached={() => {
          // getPosts();
          console.log("got to the end");
        }}
        onEndReachedThreshold={0} //  Specifies how close to the bottom the user must scroll before endreached is triggers, 0 -> 1
        ListFooterComponent={
          hasMore ? (
            <View style={{ marginTop: posts.length == 0 ? 100 : 30 }}>
              <Loading />
            </View>
          ) : (
            <View style={{ marginVertical: 30 }}>
              <Text style={styles.noPosts}>No more posts</Text>
            </View>
          )
        }
      />
    </ScreenWrapper>
  );
};

const UserHeader = ({ handleLogout, navigation, profileData }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOutIcon name="logout" size={40} color={theme.colors.rose} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          {/* avatar */}
          <View style={styles.avatarContainer}>
            <Avatar
              uri={"../../images/defaultUser.png"}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Image
              // source={getUserImageSrc(user?.image)}
              source={require("../../images/defaultUser.png")}
              style={styles.avatar}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => navigation.navigate("editProfile")}
            >
              <EditIcon name="edit" strokeWidth={2.5} size={20} />
            </Pressable>
          </View>

          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>
              {profileData.name ? profileData.name : "USER NAME"}
            </Text>
            <Text style={styles.infoText}>
              Last Login In:
              {profileData.loginTime ? " " + profileData.loginTime : ""}
            </Text>
          </View>

          <View style={styles.profileContainer}>
            <View style={styles.info}>
              <MailIcon name="mail" size={20} color={theme.colors.textLight} />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Email:</Text>
                <Text style={styles.infoText}>
                  {profileData.email ? profileData.email : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <PhoneIcon
                name="phoneNumber"
                size={20}
                color={theme.colors.textLight}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Phone:</Text>
                <Text style={styles.infoText}>
                  {profileData.phoneNumber
                    ? profileData.phoneNumber
                    : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <PhoneIcon
                name="gender"
                size={20}
                color={theme.colors.textLight}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Gender:</Text>
                <Text style={styles.infoText}>
                  {profileData.gender ? profileData.gender : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <PhoneIcon
                name="height"
                size={20}
                color={theme.colors.textLight}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Height:</Text>
                <Text style={styles.infoText}>
                  {profileData.height ? profileData.height : "166"} cm
                </Text>
              </View>

              <PhoneIcon
                name="weight"
                size={20}
                color={theme.colors.textLight}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Weight:</Text>
                <Text style={styles.infoText}>
                  {profileData.weight ? profileData.weight : "51"} kg
                </Text>
              </View>
            </View>
            {/* gap */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
