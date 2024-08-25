import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import {
  Camera,
  CameraView,
  FlashMode,
  CameraType,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Do not render anything until permissions are requested
  if (!cameraPermission || !audioPermission) {
    return <View />;
  }

  // Display a message if permissions are not granted
  if (!cameraPermission.granted || !audioPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera and microphone
        </Text>
        <Button
          onPress={() => {
            requestCameraPermission();
            requestAudioPermission();
          }}
          title="Grant permissions"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const recordVideo = async () => {
    if (cameraRef) {
      console.log("Recording video");
      try {
        console.log("Recording video22222");
        const videoPromise = await cameraRef.current.recordAsync({
          maxDuration: 3,
          codec: "avc1",
        });
        if (videoPromise) {
          console.log("Video recorded", videoPromise.uri);
          const data = await videoPromise;
        }
        console.log("Recording video33333");
      } catch (error) {
        console.warn("Failed to record video");
      }
    }
  };

  async function stopRecording() {
    console.log("Stopping video recording...");

    if (!cameraRef.current) {
      console.log("Camera reference is null or undefined");
      return;
    }

    try {
      cameraRef.current.stopRecording();
      console.log("Video recording stopped");
    } catch (error) {
      console.error("Error stopping video recording:", error.message);
    } finally {
    }

    console.log("Video URL after stop:", video);
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
          <View style={styles.flipButtonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.flipText}>Flip</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : null}

      <View style={styles.bottomBarContainer}>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            // onPressOut={() => stopVideo()}
            style={styles.recordButton}
          />
        </View>
      </View>
    </View>
  );
}
