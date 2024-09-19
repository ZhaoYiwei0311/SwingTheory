import { View, Text, Pressable, ScrollView, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { theme } from "../../constants/theme";
import { hp } from "../../constants/common";
import HistoryCard from "../../components/historyCard";
import Avatar from "../../components/avartar/index";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AddIcon } from "../../components/icons/icons";
import { getUserInfo } from "../../services/user";
import { fetchCurrentPost } from "../../services/historyPost";
import Loading from "../../components/loading";

const HistoryScreen = () => {
  const [user, setUser] = useState(() => getUserInfo());
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(
    useCallback(() => {
      (async () => {
        const data = await getUserInfo();
        setUser(data);
      })();
    }, [])
  );

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getPosts();
    });

    return () => {
      if (focusListener) {
        focusListener();
      }
    };
  }, []);

  const getPosts = async () => {
    let res = await fetchCurrentPost();
    if (res.success) {
      setPosts(res.data);
      setHasMore(false);
    } else {
      console.error("Failed to fetch posts: ", res.error);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Pressable>
            <Text style={styles.title}>{user.name}</Text>
          </Pressable>
          <View style={styles.icons}>
            <Pressable onPress={() => navigation.navigate("camera")}>
              <AddIcon
                name="plus"
                size={hp(3.2)}
                strokeWidth={2}
                color={theme.colors.text}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("profile")}>
              <Avatar
                uri={
                  user.image
                    ? user.image
                    : require("../../images/defaultUser.png")
                }
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{ borderWidth: 2 }}
              />
            </Pressable>
          </View>
        </View>

        {/* posts */}
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => (
            <HistoryCard item={item} user={user} navigation={navigation} />
          )}
          onEndReached={() => {
            getPosts();
            console.log("got to the end");
          }}
          onEndReachedThreshold={0}
          ListFooterComponent={
            hasMore ? (
              <View style={{ marginVertical: posts.length == 0 ? 200 : 30 }}>
                <Loading />
              </View>
            ) : (
              <View style={{ marginVertical: 30 }}>
                <Text style={styles.noPosts}>No more posts</Text>
              </View>
            )
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default HistoryScreen;
