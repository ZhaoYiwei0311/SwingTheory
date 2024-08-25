import { initializeApp, getApps } from "firebase/app";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { QueryClient, QueryClientProvider } from "react-query";
import rootReducer from "./src/redux/reducers";
import Route from "./src/navigation/main";
import { View, Text } from "react-native";

const store = createStore(rootReducer, applyMiddleware(thunk));

firebaseConfig = {
  apiKey: "AIzaSyDjPGDgGs0CLfYHqjFSBjxj6elKM9oJnok",
  authDomain: "tiktok-clone-32fdc.firebaseapp.com",
  projectId: "tiktok-clone-32fdc",
  storageBucket: "tiktok-clone-32fdc.appspot.com",
  messagingSenderId: "732533980352",
  appId: "1:732533980352:web:a203f754c74ba1cd90c125",
  measurementId: "G-DKPN99GQPM",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}
