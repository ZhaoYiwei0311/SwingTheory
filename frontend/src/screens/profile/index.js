import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "../../constants/common";
// import { useAuth } from "../../contexts/AuthContext";
import { theme } from "../../constants/theme";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { getUserImageSrc } from "../../services/imageService";
import { Image } from "expo-image";
// import Header from "../../components/Header";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
// import Icon from "../../assets/icons";
import Avatar from "../../components/avartar/index";
// import { supabase } from "../../lib/supabase";
// import { fetchPosts } from "../../services/postService";
// import PostCard from "../../components/PostCard";
import Loading from "../../components/loading";
import styles from "./styles";

var limit = 0;
const ProfileScreen = () => {
  // const { user, setAuth } = useAuth();
  // const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

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
    setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
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
          // handleLogout={handleLogout}
          <UserHeader user={user} navigation={navigation} />
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

const UserHeader = ({ user, handleLogout, router }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Header title="Profile" mb={30} />
        {/* onPress={handleLogout} */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="logout" size={26} color={theme.colors.rose} />
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
            {/* <Image source={getUserImageSrc(user?.image)} style={styles.avatar} /> */}
            <Pressable
              style={styles.editIcon}
              onPress={() => navigation.push("home")}
            >
              <Icon name="edit" strokeWidth={2.5} size={20} />
            </Pressable>
          </View>

          {/* username & address */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>
              {/* {user && user.name} */}
              {"username"}
            </Text>
            <Text style={styles.infoText}>
              {/* {user && user.address} */}
              {"address"}
            </Text>
          </View>

          {/* email, phone */}
          <View style={{ gap: 10 }}>
            <View style={styles.info}>
              <Icon name="mail" size={20} color={theme.colors.textLight} />
              <Text style={[styles.infoText, { fontSize: hp(1.8) }]}>
                {/* {user && user.email} */}
                {"email"}
              </Text>
            </View>
            {user && user.phoneNumber && (
              <View style={styles.info}>
                <Icon name="call" size={20} color={theme.colors.textLight} />
                <Text style={[styles.infoText, { fontSize: hp(1.8) }]}>
                  {/* {user.phoneNumber} */}
                  {"phone"}
                </Text>
              </View>
            )}

            {/* {user && user.bio && ( */}
            <Text style={[styles.infoText]}>
              {/* {user.bio} */}
              {"bio"}
            </Text>
            {/* )} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
