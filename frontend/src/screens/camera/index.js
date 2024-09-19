import React, { useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Analysising from "../analysising";
import { createPost } from "../../redux/actions";
import CircularProgress from "react-native-circular-progress-indicator";
import CountdownBar from "react-native-countdown-bar";
import { GalleryIcon, ArrowLeftIcon } from "../../components/icons/icons";
import Button from "../../components/button";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [imagePermission, requestImagePermission] =
    ImagePicker.useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showProgress, setShowProgress] = useState(false);

  if (!cameraPermission || !audioPermission || !mediaLibraryPermission) {
    return <View />;
  }

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

  const startRecording = async () => {
    if (!cameraRef.current) return;

    console.log("3 seconds passed. Start recording video.");

    setIsRecording(true);

    const videoPromise = await cameraRef.current.recordAsync({
      maxDuration: 11,
      codec: "avc1",
    });

    if (videoPromise) {
      console.log("Video recorded", videoPromise.uri);
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
          setIsRecording(false);
          setRequestRunning(false);
        });
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current) return;
    try {
      await cameraRef.current.stopRecording();
      console.log("Video recording stopped");
    } catch (error) {
      console.error("Error stopping video recording:", error.message);
    } finally {
      setIsRecording(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      setShowProgress(true);
      console.log("Waiting for 3 seconds...");
      // Delay the recording for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setShowProgress(false);
      await startRecording();
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
          <View style={styles.backButtonContainer}>
            <Pressable
              onPress={() => navigation.navigate("home")}
              style={styles.backButton}
            >
              <ArrowLeftIcon
                strokeWidth={2.0}
                color="white"
                width={50}
                height={50}
              />
            </Pressable>
          </View>
          <View style={styles.sideBarContainer}>
            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={toggleCameraFacing}
            >
              <Feather name="refresh-ccw" size={32} color="white" />
            </TouchableOpacity>
          </View>

          {isRecording && (
            <View style={styles.countdownBarContainer}>
              <CountdownBar
                time={10}
                height="3"
                BgColor="rgba(139,0,0,0.8)"
                BgColorIn="rgba(0, 0, 0, 0)"
              />
            </View>
          )}

          {showProgress ? (
            <View style={styles.counterCircularProgress}>
              <CircularProgress
                value={0}
                radius={80}
                maxValue={3}
                initialValue={3}
                progressValueColor={"#fff"}
                activeStrokeWidth={15}
                inActiveStrokeWidth={15}
                duration={3000}
              />
            </View>
          ) : null}
        </CameraView>
      ) : null}

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady || showProgress}
            onPress={toggleRecording}
            style={[
              styles.recordButton,
              isRecording,
              (!isCameraReady || showProgress) && styles.recordButtonDisabled,
            ]}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.galleryButton} onPress={pickVideo}>
            <GalleryIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
