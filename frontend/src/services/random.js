import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const saveMediaToStorage = (media, path) =>
  new Promise((resolve, reject) => {
    const fileRef = firebase.storage().ref().child(path);

    fetch(media)
      .then((response) => response.blob())
      .then((blob) => fileRef.put(blob))
      .then((task) => task.ref.getDownloadURL())
      .then((downloadUrl) => resolve(downloadUrl))
      .catch(() => reject());
  });
