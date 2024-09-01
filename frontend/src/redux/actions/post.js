import uuid from "uuid-random";

let getAuth, auth, getFirestore, firestore, Timestamp, doc, setDoc;

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
};

const initializeFirebase = async () => {
  importStorageFunctions();
  importAuthFunctions();
  importFirestoreFunctions();
};

initializeFirebase();

let storageRef;

//Same reason as above, need to dynamically import the required modules
const initializeStorage = async () => {
  await importStorageFunctions();
};
initializeStorage();

export const createPost = (description, video) => async (dispatch) =>
  new Promise(async (resolve, reject) => {
    if (!auth.currentUser || !firestore) {
      await importAuthFunctions();
      await importFirestoreFunctions();
    }
    let storagePostId = uuid();
    console.log("CreatePost function started.");
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
                let postData = {
                  creator: auth.currentUser.uid,
                  media: downloadURL,
                  description,
                  timestamp: Timestamp.now(),
                };
                await setDoc(
                  doc(firestore, "raw-video", storagePostId),
                  postData
                );
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
