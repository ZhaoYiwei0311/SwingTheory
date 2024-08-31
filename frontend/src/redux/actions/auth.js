// import { USER_STATE_CHANGE } from "../constants";
// import { getPostsByUser } from "./post";

let getAuth,
  auth,
  app,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword;

const importAuthFunctions = async () => {
  const appModule = await import("../../../App");
  const authModule = await import("firebase/auth");
  app = appModule.default;
  getAuth = authModule.getAuth;
  createUserWithEmailAndPassword = authModule.createUserWithEmailAndPassword;
  signInWithEmailAndPassword = authModule.signInWithEmailAndPassword;
  auth = getAuth(app);
};

const initializeAuth = async () => {
  await importAuthFunctions();
};

initializeAuth();

export const login = (email, password) => (dispatch) => {
  console.log("login function started.", email, password);
  new Promise((resolve, reject) => {
    console.log("login function started2.");
    console.log("auth", auth);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        resolve();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        reject();
      });
  });
};

export const register = (email, password) => (dispatch) => {
  console.log("register function started.");
  new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        resolve();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        reject();
      });
  });
};

// export const userAuthStateListener = () => (dispatch) => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       dispatch(getCurrentUserData());
//       dispatch(getPostsByUser(firebase.auth().currentUser.uid));
//     } else {
//       dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
//     }
//   });
// };

// export const getCurrentUserData = () => (dispatch) => {
//   firebase
//     .firestore()
//     .collection("user")
//     .doc(firebase.auth().currentUser.uid)
//     .onSnapshot((res) => {
//       if (res.exists) {
//         return dispatch({
//           type: USER_STATE_CHANGE,
//           currentUser: res.data(),
//           loaded: true,
//         });
//       }
//     });
// };
