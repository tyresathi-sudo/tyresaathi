import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { 
  getAuth, 
  initializeAuth, 
  indexedDBLocalPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgvUowdRyc6CIsKKSHqJHyNQnFsWQ1h_U",
  authDomain: "tyresathi-93306.firebaseapp.com",
  projectId: "tyresathi-93306",
  storageBucket: "tyresathi-93306.firebasestorage.app",
  messagingSenderId: "71107233578",
  appId: "1:71107233578:web:b662874092abc23bd54053",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

// Configure Auth with multi-layer persistence (IndexedDB + LocalStorage) for reliable Android APK & Web session retention
let authInstance;
try {
  authInstance = initializeAuth(app, {
    persistence: [indexedDBLocalPersistence, browserLocalPersistence]
  });
} catch {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const storage = getStorage(app);
export default app;
