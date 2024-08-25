import React, { useEffect, useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import {
  Camera,
  CameraView,
  FlashMode,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library"; // 导入MediaLibrary
import * as ImageManipulator from "expo-image-manipulator";
import Analysising from "../analysising";
import { createPost } from "../../redux/actions";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [imagePermission, requestImagePermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions(); // 新增：请求媒体库权限
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 不渲染任何内容直到权限请求完毕
  if (!cameraPermission || !audioPermission || !mediaLibraryPermission) {
    return <View />;
  }

  // 如果权限未被授予，则显示一条消息
  if (
    !cameraPermission.granted ||
    !audioPermission.granted ||
    !mediaLibraryPermission.granted
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera, microphone, and media
          library
        </Text>
        <Button
          onPress={() => {
            requestCameraPermission();
            requestAudioPermission();
            requestImagePermission();
            requestMediaLibraryPermission();
          }}
          title="Grant permissions"
        />
      </View>
    );
  }

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    const selectedVideo = result.assets[0].uri;
    if (!selectedVideo) return;

    if (!result.canceled) {
      navigation.navigate("savePost", { source: selectedVideo });
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const toggleRecording = async () => {
    if (!cameraRef.current) return;

    if (isRecording) {
      // Stop recording
      try {
        await cameraRef.current.stopRecording();
        console.log("Video recording stopped");
      } catch (error) {
        console.error("Error stopping video recording:", error.message);
      } finally {
        setIsRecording(false);
      }
    } else {
      // Start recording
      try {
        setIsRecording(true);
        console.log("Recording video");
        const videoPromise = await cameraRef.current.recordAsync({
          maxDuration: 10,
          codec: "avc1",
        });
        if (videoPromise) {
          await saveVideoToLibrary(videoPromise.uri);
          const description = "Uploaded from camera recording";
          console.log("Video recorded", videoPromise.uri);
          setRequestRunning(true);
          await dispatch(createPost(description, videoPromise.uri))
            .then(() => {
              console.log(
                "createPost dispatched successfully. Navigating to top..."
              );
            })
            .catch((error) => {
              console.log("Dispatching createPost failed:", error);
            })
            .finally(() => {
              setRequestRunning(false);
            });
        }
      } catch (error) {
        console.warn("Failed to upload video");
        setIsRecording(false);
        setRequestRunning(false);
      }
    }
  };

  // Save video to local storage
  const saveVideoToLibrary = async (uri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      console.log("Video saved to media library");
    } catch (error) {
      console.error("Error saving video to library:", error.message);
    }
  };

  if (requestRunning) {
    return <Analysising />;
  }

  return (
    <View style={styles.container}>
      {isFocused ? (
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing={facing}
          flashMode={"auto"}
          CameraRatio={"16:9"}
          onCameraReady={() => setIsCameraReady(true)}
          mode={"video"}
        >
          <View style={styles.sideBarContainer}>
            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={toggleCameraFacing}
            >
              <Feather name="refresh-ccw" size={32} color="white" />
              <Text style={styles.iconText}>Flip</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : null}

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onPress={toggleRecording} // 使用单击切换录制
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonActive, // 动态样式更改
            ]}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.galleryButton} onPress={pickVideo}>
            <Image
              style={styles.galleryButtonImage}
              source={require("../../image/album_logo.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
