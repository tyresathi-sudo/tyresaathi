import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const ROLES = {
  CUSTOMER: "customer",
  SHOP_OWNER: "shop_owner",
  ADMIN: "admin",
  USER: "customer",
  VENDOR: "shop_owner"
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(ROLES.CUSTOMER);
  const [loading, setLoading] = useState(true);

  // Login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
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
    return signOut(auth);
  }

  // Reset Password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
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
            setRole(data.role || ROLES.CUSTOMER);
          } else {
            const fallbackData = {
              uid: user.uid,
              email: user.email,
              name: user.displayName || user.email?.split("@")[0] || "User",
              role: ROLES.CUSTOMER,
              photoURL: user.photoURL || "",
              phone: "",
              shopName: "",
            };
            setUserData(fallbackData);
            setRole(ROLES.CUSTOMER);
          }
        } catch (err) {
          console.error("Firestore user fetch error:", err);
          const fallbackData = {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split("@")[0] || "User",
            role: ROLES.CUSTOMER,
            photoURL: user.photoURL || "",
            phone: "",
            shopName: "",
          };
          setUserData(fallbackData);
          setRole(ROLES.CUSTOMER);
        }
      } else {
        setUserData(null);
        setRole(ROLES.CUSTOMER);
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
    isAdmin: 
      role === "admin" || 
      role === ROLES.ADMIN || 
      currentUser?.email?.toLowerCase() === "tyresathi@gmail.com" || 
      currentUser?.email?.toLowerCase() === "ucanmail195@gmail.com",
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
