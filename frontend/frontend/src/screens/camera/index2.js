import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";

import * as VideoThumbnails from "expo-video-thumbnails";

import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";

/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */

export default function CameraScreen() {
  const [permissions, setPermissions] = useState({
    hasCameraPermissions: false,
    hasAudioPermissions: false,
    hasGalleryPermissions: false,
  });

  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const cameraStatus = await Camera.requestPermissionsAsync();
        const audioStatus = await Audio.requestPermissionsAsync();
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        setPermissions({
          hasCameraPermissions: cameraStatus.status === "granted",
          hasAudioPermissions: audioStatus.status === "granted",
          hasGalleryPermissions: galleryStatus.status === "granted",
        });

        if (galleryStatus.status === "granted") {
          const userGalleryMedia = await MediaLibrary.getAssetsAsync({
            sortBy: ["creationTime"],
            mediaType: ["video"],
          });
          setGalleryItems(userGalleryMedia.assets);
        }
      } catch (error) {
        console.error("Error requesting permissions or fetching media:", error);
      }
    })();
  }, []);

  const { hasCameraPermissions, hasAudioPermissions, hasGalleryPermissions } =
    permissions;

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return (
      <View>
        <Text style={{ marginTop: 50 }}>No permission</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ marginTop: 50 }}>CameraScreen</Text>
      {/* 你可以在这里添加更多的组件和功能 */}
    </View>
  );
}

// const [cameraRef, setCameraRef] = useState(null);
// const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
// const [cameraFlash, setCameraFlash] = useState(
//   Camera.Constants.FlashMode.off
// );

// const [isCameraReady, setIsCameraReady] = useState(false);
// const isFocused = useIsFocused();

// const navigation = useNavigation();
// useEffect(() => {
//   (async () => {
//     const cameraStatus = await Camera.requestPermissionsAsync();
//     setHasCameraPermissions(cameraStatus.status == "granted");

//     const audioStatus = await Audio.requestPermissionsAsync();
//     setHasAudioPermissions(audioStatus.status == "granted");

//     const galleryStatus =
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     setHasGalleryPermissions(galleryStatus.status == "granted");

//     if (galleryStatus.status == "granted") {
//       const userGalleryMedia = await MediaLibrary.getAssetsAsync({
//         sortBy: ["creationTime"],
//         mediaType: ["video"],
//       });
//       setGalleryItems(userGalleryMedia.assets);
//     }
//   })();
// }, []);

// const recordVideo = async () => {
//   if (cameraRef) {
//     try {
//       const options = {
//         maxDuration: 60,
//         quality: Camera.Constants.VideoQuality["480"],
//       };
//       const videoRecordPromise = cameraRef.recordAsync(options);
//       if (videoRecordPromise) {
//         const data = await videoRecordPromise;
//         const source = data.uri;
//         let sourceThumb = await generateThumbnail(source);
//         navigation.navigate("savePost", { source, sourceThumb });
//       }
//     } catch (error) {
//       console.warn(error);
//     }
//   }
// };

// const stopVideo = async () => {
//   if (cameraRef) {
//     cameraRef.stopRecording();
//   }
// };

// const pickFromGallery = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
//     allowsEditing: true,
//     aspect: [16, 9],
//     quality: 1,
//   });
//   if (!result.cancelled) {
//     let sourceThumb = await generateThumbnail(result.uri);
//     navigation.navigate("savePost", { source: result.uri, sourceThumb });
//   }
// };

// const generateThumbnail = async (source) => {
//   try {
//     const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
//       time: 5000,
//     });
//     return uri;
//   } catch (e) {
//     console.warn(e);
//   }
// };

// if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
//   return <View></View>;
// }

// return (
//   <View style={styles.container}>
//     {isFocused ? (
//       <Camera
//         ref={(ref) => setCameraRef(ref)}
//         style={styles.camera}
//         ratio={"16:9"}
//         type={cameraType}
//         flashMode={cameraFlash}
//         onCameraReady={() => setIsCameraReady(true)}
//       />
//     ) : null}

//     <View style={styles.sideBarContainer}>
//       <TouchableOpacity
//         style={styles.sideBarButton}
//         onPress={() =>
//           setCameraType(
//             cameraType === Camera.Constants.Type.back
//               ? Camera.Constants.Type.front
//               : Camera.Constants.Type.back
//           )
//         }
//       >
//         <Feather name="refresh-ccw" size={24} color={"white"} />
//         <Text style={styles.iconText}>Flip</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.sideBarButton}
//         onPress={() =>
//           setCameraFlash(
//             cameraFlash === Camera.Constants.FlashMode.off
//               ? Camera.Constants.FlashMode.torch
//               : Camera.Constants.FlashMode.off
//           )
//         }
//       >
//         <Feather name="zap" size={24} color={"white"} />
//         <Text style={styles.iconText}>Flash</Text>
//       </TouchableOpacity>
//     </View>

//     <View style={styles.bottomBarContainer}>
//       <View style={{ flex: 1 }}></View>
//       <View style={styles.recordButtonContainer}>
//         <TouchableOpacity
//           disabled={!isCameraReady}
//           onLongPress={() => recordVideo()}
//           onPressOut={() => stopVideo()}
//           style={styles.recordButton}
//         />
//       </View>
//       <View style={{ flex: 1 }}>
//         <TouchableOpacity
//           onPress={() => pickFromGallery()}
//           style={styles.galleryButton}
//         >
//           {galleryItems[0] == undefined ? (
//             <></>
//           ) : (
//             <Image
//               style={styles.galleryButtonImage}
//               source={{ uri: galleryItems[0].uri }}
//             />
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
// );
