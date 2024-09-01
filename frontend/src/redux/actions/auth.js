import { USER_STATE_CHANGE } from "../constants";
import { doc, onSnapshot } from "firebase/firestore";

let getAuth,
  auth,
  firestore,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged;

const importAuthFunctions = async () => {
  const appModule = await import("../../../App");
  const authModule = await import("firebase/auth");
  const firestoreModule = await import("firebase/firestore");
  firestore = firestoreModule.getFirestore();
  app = appModule.default;
  getAuth = authModule.getAuth;
  onAuthStateChanged = authModule.onAuthStateChanged;
  createUserWithEmailAndPassword = authModule.createUserWithEmailAndPassword;
  signInWithEmailAndPassword = authModule.signInWithEmailAndPassword;
  auth = getAuth();
};

const initializeAuth = async () => {
  await importAuthFunctions();
};

initializeAuth();

export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const register = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userAuthStateListener = () => async (dispatch) => {
  if (!auth) {
    await importAuthFunctions();
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getCurrentUserData());
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserData = () => (dispatch) => {
  const uid = auth.currentUser.uid;
  const userDocRef = doc(firestore, "user", uid);
  onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: snapshot.data(),
        loaded: true,
      });
    } else {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: null,
        loaded: true,
      });
    }
  });
};
