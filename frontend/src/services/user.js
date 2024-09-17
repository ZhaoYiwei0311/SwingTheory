let getAuth, auth;
const importAuthFunctions = async () => {
  const authModule = await import("firebase/auth");
  getAuth = authModule.getAuth;
  auth = getAuth();
};

let getFirestore, firestore, doc, onSnapshot;

const importFirestore = async () => {
  const firestoreModule = await import("firebase/firestore");
  getFirestore = firestoreModule.getFirestore;
  doc = firestoreModule.doc;
  setDoc = firestoreModule.setDoc;
  firestore = getFirestore();
};

const initializeFirebase = async () => {
  await importAuthFunctions();
  await importFirestore();
};

initializeFirebase();

export const getUserInfo = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    const loginTime = user.metadata.lastSignInTime;
    let loginDate = new Date(loginTime);
    let formattedLoginDate = new Intl.DateTimeFormat("default", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(loginDate);

    const userData = {
      // uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      loginTime: formattedLoginDate,
      gender: user.gender,
      age: user.age,
      address: user.address,
      height: user.heightCm,
      weight: user.weightKg,
    };
    console.log(userData);
    // Return the user's user-specific profile information
    return userData;
  }
  return null;
};

export const updateUserInfo = async (userData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userRef = firestore.collection("users").doc(user.uid);
    console.log("Updating user data...");
    console.log(userData);
    console.log(userRef);
    userRef
      .update(userData)
      .then(() => {
        console.log("User data updated successfully!");
        return true;
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        throw error;
      });
  }
};
