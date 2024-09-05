import uuid from "uuid-random";

let getAuth, auth, getFirestore, firestore, Timestamp;

const importFirestoreFunctions = async () => {
  const appModule = await import("../../../App");
  const firestoreModule = await import("firebase/firestore");
  app = appModule.default;
  getFirestore = firestoreModule.getFirestore;
  firestore = getFirestore(app);
  Timestamp = firestoreModule.Timestamp;
  doc = firestoreModule.doc;
  setDoc = firestoreModule.setDoc;
};

const importAuthFunctions = async () => {
  const authModule = await import("firebase/auth");
  getAuth = authModule.getAuth;
  auth = getAuth();
};

const importStorageFunctions = async () => {
  const appModule = await import("../../../App");
  const storageModule = await import("firebase/storage");
  storage = appModule.storage;
  ref = storageModule.ref;
  getDownloadURL = storageModule.getDownloadURL;
  uploadBytesResumable = storageModule.uploadBytesResumable;
  getMetadata = storageModule.getMetadata;
};

const initializeFirebase = async () => {
  importStorageFunctions();
  importAuthFunctions();
  importFirestoreFunctions();
};

initializeFirebase();

let storageRef;

export const createPost = (description, video) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    if (!auth.currentUser || !firestore) {
      await importAuthFunctions();
      await importFirestoreFunctions();
    }
    let storagePostId = uuid();
    storageRef = ref(storage, `posts/${auth.currentUser.uid}/${storagePostId}`);
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
          (snapshot) => {},
          (error) => {
            console.error("Upload failed.", error);
            reject();
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);

                try {
                  // Get the metadata
                  const metadata = await getMetadata(storageRef);
                  const videoSize = metadata.size;
                  const timeCreated = metadata.timeCreated;
                  const updatedTime = metadata.updated;

                  // Prepare the post data
                  let postData = {
                    creator: auth.currentUser.uid,
                    media: downloadURL,
                    description,
                    timestamp: Timestamp.now(),
                    videoSize,
                    timeCreated,
                    updatedTime,
                  };

                  // Use postData
                  await setDoc(
                    doc(firestore, "raw-video", storagePostId),
                    postData
                  );

                  // TODO: Uncomment this line to send the post data to the backend
                  // await sendPostData(postData, reject);
                } catch (error) {
                  console.error("Error getting file metadata:", error);
                }
                resolve();
              }
            );
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching video from filesystem", error);
        reject();
      });
  });

async function sendPostData(postData, reject) {
  console.log("POST request started.");
  console.log("POST request data: ", postData);
  // New POST request
  let response = await fetch(
    "http://10.89.129.175:5001/add_videos_by_user_id",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }
  );
  console.log("POST request finished.");
  if (!response.ok) {
    console.error("POST request failed.", response.status);

    reject();
  }
}
