import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import Button from "../../components/button/index";
import Input from "../../components/input/index";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import { useNavigation } from "@react-navigation/native";
// import { updateUser } from "../../services/userService";
// import {
//   getFilePath,
//   getUserImageSrc,
//   uploadFile,
// } from "../../services/imageService";

import { Image } from "expo-image";
import styles from "./styles";
import {
  ArrowLeftIcon,
  CameraIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "../../components/icons/icons";

const EditProfileScreen = () => {
  // const { user: currentUser, setUserData } = useAuth();
  // const router = useRouter();
  const [profileModal, toggleProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image: null,
    bio: "",
    address: "",
  });
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (currentUser) {
  //     setUser({
  //       name: currentUser.name || "",
  //       phoneNumber: currentUser.phoneNumber || "",
  //       image: currentUser.image || null,
  //       address: currentUser.address || "",
  //       bio: currentUser.bio || "",
  //     });
  //   }
  // }, [currentUser]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let userData = { ...user };
    let { name, phoneNumber, address, image, bio } = userData;
    if (!name || !phoneNumber || !address || !image || !bio) {
      Alert.alert("Profile", "Please fill all the fields");
      return;
    }

    setLoading(true);
    if (typeof image == "object") {
      let imageResult = await uploadFile("profiles", image?.uri, true);
      if (imageResult.success) userData.image = imageResult.data;
      else userData.image = null;
    }

    const res = await updateUser(currentUser?.id, userData);
    setLoading(false);
    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    }

    // good to go
  };

  let imageSource =
    user.image && typeof user?.image == "object"
      ? user.image.uri
      : require("../../images/defaultUser.png");

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ArrowLeftIcon strokeWidth={2.5} color={theme.colors.text} />
            </Pressable>
          </View>
          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable
                style={styles.cameraIcon}
                onPress={() => onPickImage()}
              >
                <CameraIcon name="camera" strokeWidth={2.5} size={20} />
              </Pressable>
            </View>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
              Please fill your profile details
            </Text>
            <Input
              icon={<UserIcon name="user" size={26} />}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textLight}
              value={user.name}
              onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <Input
              icon={<PhoneIcon name="call" size={26} />}
              placeholder="Enter your phone number"
              placeholderTextColor={theme.colors.textLight}
              value={user.phoneNumber}
              onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
            />
            <Input
              icon={<MailIcon name="location" size={26} />}
              placeholder="gender selector"
              placeholderTextColor={theme.colors.textLight}
              value={user.address}
              onChangeText={(value) => setUser({ ...user, address: value })}
            />

            <Input
              icon={<MailIcon name="location" size={26} />}
              placeholder="Enter your height"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => setUser({ ...user, bio: value })}
              value={user.bio}
            />
            <Input
              icon={<MailIcon name="location" size={26} />}
              placeholder="Enter your weight"
              placeholderTextColor={theme.colors.textLight}
              onChangeText={(value) => setUser({ ...user, bio: value })}
              value={user.bio}
            />

            {/* button */}
            <Button title="Update" loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfileScreen;
