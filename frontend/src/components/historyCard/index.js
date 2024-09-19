import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../constants/theme";
import { hp, stripHtmlTags, wp } from "../../constants/common";
import RenderHtml from "react-native-render-html";
import { Video } from "expo-av";
import Avatar from "../avartar/index";
import { styles, tagsStyles, shadowStyles } from "./styles";
import { EditIcon } from "../icons/icons";

const HistoryCard = ({
  item,
  user,
  navigation,
  showMoreIcon = true,
  hasShadow = true,
  showDelete = false,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const createdAt = item.create_at ? item.create_at : "18/09/2024 7:00 PM";
  const htmlBody = { html: item?.body };

  const handlePostDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to do this?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel delete"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(item),
        style: "destructive",
      },
    ]);
  };

  const openPostDetails = () => {
    navigation.navigate("postDetails", { postId: item?.id });
  };

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        {/* user info and post time */}
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={
              user.image ? user.image : require("../../images/defaultUser.png")
            }
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>
              {user.name ? user.name : "NAME"}
            </Text>
            <Text style={styles.postTime}>{createdAt}</Text>
          </View>
        </View>

        {/* actions */}
        {showMoreIcon && (
          <TouchableOpacity onPress={openPostDetails}>
            <EditIcon
              name="threeDotsHorizontal"
              size={hp(3.4)}
              strokeWidth={3}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
        {showDelete && currentUser.id == item.userId && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(item)}>
              <EditIcon name="edit" size={hp(2.5)} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePostDelete}>
              <EditIcon
                name="delete"
                size={hp(2.5)}
                color={theme.colors.rose}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* post image & body */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHtml
              contentWidth={wp(100)}
              source={htmlBody}
              tagsStyles={tagsStyles}
              render
            />
          )}
        </View>
        <Text style={styles.username}>
          {item.title ? item.title : "Uploaded Yesterday"}
        </Text>

        {/* post video */}
        <Video
          style={[styles.postMedia, { height: hp(30) }]}
          source={{ uri: item.url }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      </View>
    </View>
  );
};

export default HistoryCard;
