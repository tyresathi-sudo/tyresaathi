import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  updateProfile,
  deleteUser
} from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

export const ROLES = {
  CUSTOMER: "customer",
  SHOP_OWNER: "shop_owner",
  ADMIN: "admin",
  USER: "customer",
  VENDOR: "shop_owner"
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState(() => {
    try {
      const cached = localStorage.getItem("tyresaathi_user_cache");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [role, setRole] = useState(() => {
    try {
      const cached = localStorage.getItem("tyresaathi_user_cache");
      return cached ? (JSON.parse(cached).role || ROLES.CUSTOMER) : ROLES.CUSTOMER;
    } catch {
      return ROLES.CUSTOMER;
    }
  });
  const [loading, setLoading] = useState(false);

  // Login
  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const basicUser = {
      uid: cred.user.uid,
      email: cred.user.email,
      name: cred.user.displayName || cred.user.email?.split("@")[0] || "User",
      role: cred.user.email?.toLowerCase() === "tyresathi@gmail.com" ? ROLES.ADMIN : ROLES.CUSTOMER,
      photoURL: cred.user.photoURL || "",
      phone: "",
      shopName: "",
    };
    setCurrentUser(cred.user);
    setUserData(basicUser);
    try {
      localStorage.setItem("tyresaathi_user_cache", JSON.stringify(basicUser));
    } catch {}
    return cred;
  }

  // Register with full profile creation
  async function register({ name, phone, email, password, role = ROLES.CUSTOMER, shopName = "" }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      try {
        await updateProfile(cred.user, { displayName: name });
      } catch (e) {
        console.warn("Could not update displayName", e);
      }
    }
    const userDocData = {
      uid: cred.user.uid,
      name: name || "",
      phone: phone || "",
      email: email || "",
      role: role || ROLES.CUSTOMER,
      shopName: shopName || "",
      shopApproved: role === ROLES.SHOP_OWNER ? true : false,
      photoURL: "",
      address: "",
      city: "",
      openingHours: "09:00 AM - 09:00 PM",
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(db, "users", cred.user.uid), userDocData);
    } catch (err) {
      console.error("Firestore user creation warning:", err);
    }
    setUserData(userDocData);
    setRole(userDocData.role);
    try {
      localStorage.setItem("tyresaathi_user_cache", JSON.stringify(userDocData));
    } catch {}
    return cred;
  }

  // Update Profile Data & Sync Context
  async function updateUserProfile(updates) {
    if (!currentUser) return;
    const uid = currentUser.uid;
    const merged = {
      ...(userData || {}),
      ...updates,
      uid,
      email: updates.email || userData?.email || currentUser.email,
      updatedAt: serverTimestamp(),
    };

    if (updates.name || updates.photoURL) {
      try {
        await updateProfile(currentUser, {
          displayName: updates.name || currentUser.displayName,
          photoURL: updates.photoURL || currentUser.photoURL,
        });
      } catch (e) {
        console.warn("Could not update auth profile:", e);
      }
    }

    try {
      await setDoc(doc(db, "users", uid), merged, { merge: true });
    } catch (err) {
      console.warn("Firestore user update warning:", err);
    }

    setUserData(merged);
    try {
      localStorage.setItem("tyresaathi_user_cache", JSON.stringify(merged));
    } catch {}
    if (updates.role) {
      setRole(updates.role);
    }
    return merged;
  }

  // Basic Signup alias
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    setUserData(null);
    setRole(ROLES.CUSTOMER);
    try {
      localStorage.removeItem("tyresaathi_user_cache");
    } catch {}
    return signOut(auth);
  }

  // Reset Password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Delete User Account and associated profile data (Google Play requirement)
  async function deleteAccount() {
    if (!currentUser) return;
    const uid = currentUser.uid;
    try {
      // 1. Delete Firestore user document
      await deleteDoc(doc(db, "users", uid));
    } catch (err) {
      console.warn("Could not delete user firestore record:", err);
    }
    // 2. Delete Firebase Auth Account
    await deleteUser(currentUser);
    setUserData(null);
    setRole(ROLES.CUSTOMER);
    setCurrentUser(null);
    try {
      localStorage.removeItem("tyresaathi_user_cache");
    } catch {}
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setRole(data.role || (user.email?.toLowerCase() === "tyresathi@gmail.com" ? ROLES.ADMIN : ROLES.CUSTOMER));
            try {
              localStorage.setItem("tyresaathi_user_cache", JSON.stringify(data));
            } catch {}
          } else {
            const fallbackData = {
              uid: user.uid,
              email: user.email,
              name: user.displayName || user.email?.split("@")[0] || "User",
              role: user.email?.toLowerCase() === "tyresathi@gmail.com" ? ROLES.ADMIN : ROLES.CUSTOMER,
              photoURL: user.photoURL || "",
              phone: "",
              shopName: "",
            };
            setUserData(fallbackData);
            setRole(fallbackData.role);
            try {
              localStorage.setItem("tyresaathi_user_cache", JSON.stringify(fallbackData));
            } catch {}
          }
        } catch (err) {
          console.warn("Firestore user fetch warning:", err);
        }
      } else {
        setUserData(null);
        setRole(ROLES.CUSTOMER);
        try {
          localStorage.removeItem("tyresaathi_user_cache");
        } catch {}
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user: currentUser,
    currentUser,
    profile: userData,
    userData,
    role,
    loading,
    login,
    register,
    signup,
    updateUserProfile,
    logout,
    deleteAccount,
    isAdmin: 
      currentUser?.email?.toLowerCase() === "tyresathi@gmail.com" || 
      role === "admin" || 
      role === ROLES.ADMIN,
    isVendor: 
      role === "vendor" || 
      role === "shop_owner" || 
      role === ROLES.SHOP_OWNER || 
      role === ROLES.VENDOR ||
      currentUser?.email?.toLowerCase() === "tyresathi@gmail.com",
    isShopOwner: 
      role === "shop_owner" || 
      role === ROLES.SHOP_OWNER ||
      currentUser?.email?.toLowerCase() === "tyresathi@gmail.com",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
