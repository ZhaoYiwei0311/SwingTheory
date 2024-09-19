import { getDoc, updateDoc } from "firebase/firestore";
import uuid from "uuid-random";

let getAuth, auth, getFirestore, firestore;

const importFirestoreFunctions = async () => {
  const appModule = await import("../../App");
  const firestoreModule = await import("firebase/firestore");
  app = appModule.default;
  getFirestore = firestoreModule.getFirestore;
  firestore = getFirestore();
  doc = firestoreModule.doc;
  setDoc = firestoreModule.setDoc;
  updateDoc = firestoreModule.updateDoc;
};

const importAuthFunctions = async () => {
  const authModule = await import("firebase/auth");
  getAuth = authModule.getAuth;
  auth = getAuth();
};

const importStorageFunctions = async () => {
  const appModule = await import("../../App");
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

export const getUserInfo = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    const docRef = doc(firestore, "user", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const loginTime = docSnap.data().metadata.lastSignInTime;
      let loginDate = new Date(loginTime);
      let formattedLoginDate = new Intl.DateTimeFormat("default", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(loginDate);

      const userData = {
        // uid: user.uid,
        name: docSnap.data().name,
        email: docSnap.data().email,
        image: docSnap.data().image,
        phoneNumber: docSnap.data().phoneNumber,
        loginTime: formattedLoginDate,
        gender: docSnap.data().gender,
        height: docSnap.data().height,
        weight: docSnap.data().weight,
        handPreference: docSnap.data().handPreference,
      };
      return userData;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
  }

  return null;
};

export const updateUserInfo = (userData) => {
  return new Promise(async (resolve, reject) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!firestore) {
      await importFirestoreFunctions();
    }
    if (user) {
      try {
        await updateDoc(doc(firestore, "user", user.uid), userData);
        console.log("User data successfully stored!");
        resolve({ success: true });
      } catch (error) {
        console.error("Error storing user data:", error);
        reject({ success: false, error: error });
      }
    } else {
      reject({ success: false, error: "No user provided" });
    }
  });
};

let storageRef;
export const createImage = (image) =>
  new Promise(async (resolve, reject) => {
    if (!auth.currentUser || !firestore) {
      await importAuthFunctions();
      await importFirestoreFunctions();
    }
    let avartarId = uuid();
    storageRef = ref(storage, `avartars/${auth.currentUser.uid}/${avartarId}`);
    const metadata = {
      contentType: "image/jpg",
    };
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
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
                resolve(downloadURL);
              }
            );
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching video from filesystem", error);
      });
  });
