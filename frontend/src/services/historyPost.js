let getAuth,
  auth,
  getFirestore,
  firestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc;

const importFirestoreFunctions = async () => {
  const appModule = await import("../../App");
  const firestoreModule = await import("firebase/firestore");
  app = appModule.default;
  getFirestore = firestoreModule.getFirestore;
  firestore = getFirestore(app);
  doc = firestoreModule.doc;
  setDoc = firestoreModule.setDoc;
  updateDoc = firestoreModule.updateDoc;
  collection = firestoreModule.collection;
  getDocs = firestoreModule.getDocs;
  query = firestoreModule.query;
  where = firestoreModule.where;
};

const importAuthFunctions = async () => {
  const authModule = await import("firebase/auth");
  getAuth = authModule.getAuth;
  auth = getAuth();
};

const initializeFirebase = async () => {
  importAuthFunctions();
  importFirestoreFunctions();
};

initializeFirebase();

export const fetchCurrentPost = async () => {
  await importFirestoreFunctions();
  try {
    const userId = auth.currentUser.uid;
    const rawVideoCollection = collection(firestore, "raw-video");
    const q = query(rawVideoCollection, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    // Process the results
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return { success: false, error };
  }
};
