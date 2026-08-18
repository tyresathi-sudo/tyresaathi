import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgvUowdRyc6CIsKKSHqJHyNQnFsWQ1h_U",
  authDomain: "tyresathi-93306.firebaseapp.com",
  projectId: "tyresathi-93306",
  storageBucket: "tyresathi-93306.firebasestorage.app",
  messagingSenderId: "71107233578",
  appId: "1:71107233578:web:b662874092abc23bd54053",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
