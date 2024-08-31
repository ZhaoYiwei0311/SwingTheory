// import { storage } from "../../../App";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import uuid from "uuid-random";
const importStorageFunctions = async () => {
  const appModule = await import("../../../App");
  const storageModule = await import("firebase/storage");
  storage = appModule.storage;
  ref = storageModule.ref;
  getDownloadURL = storageModule.getDownloadURL;
  uploadBytesResumable = storageModule.uploadBytesResumable;
};

// Call the function to import the required modules
importStorageFunctions();
let storageRef;

//Same reason as above, need to dynamically import the required modules
const initializeStorage = async () => {
  await importStorageFunctions();
};
initializeStorage();

export const createPost = (description, video) => (dispatch) =>
  new Promise((resolve, reject) => {
    let storagePostId = uuid();

    console.log("CreatePost function started.");
    storageRef = ref(storage, `posts/${storagePostId}`);
    const metadata = {
      contentType: "video/mp4",
    };

    console.log("Starting fetching video from filesystem.");

    // Read the file from the filesystem
    fetch(video)
      .then((response) => response.blob())
      .then((blob) => {
        console.log("Blob created, starting upload.");

        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
          },
          (error) => {
            console.error("Upload failed.", error);
            reject();
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve();
            });
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching video from filesystem", error);
        reject();
      });
  });
