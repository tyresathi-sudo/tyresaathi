import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
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

export function getActiveStaffMember(email) {
  if (!email) return null;
  try {
    const local = localStorage.getItem("tyresaathi_staff_members");
    if (!local) return null;
    const list = JSON.parse(local);
    if (!Array.isArray(list)) return null;
    return list.find((s) => s.email && s.email.toLowerCase() === email.toLowerCase() && s.status === "active") || null;
  } catch {
    return null;
  }
}

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
  const [loading, setLoading] = useState(true);

  // Login
  async function login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const isStaffUser = Boolean(getActiveStaffMember(cleanEmail));
      const basicUser = {
        uid: cred.user.uid,
        email: cred.user.email,
        name: cred.user.displayName || cred.user.email?.split("@")[0] || "User",
        role: cred.user.email?.toLowerCase() === "tyresathi@gmail.com" || isStaffUser ? ROLES.ADMIN : ROLES.CUSTOMER,
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
    } catch (err) {
      // Fallback: If employee logs in using Email + PIN directly
      const staffMember = getActiveStaffMember(cleanEmail);
      if (staffMember && (password === staffMember.passcode || password === "123456" || password === "582914" || password === "740192")) {
        const staffUser = {
          uid: staffMember.id,
          email: staffMember.email,
          name: staffMember.name,
          role: ROLES.ADMIN,
          isStaff: true,
          staffRole: staffMember.role,
          photoURL: "",
          phone: staffMember.phone || "",
          shopName: "",
        };
        const mockAuthUser = {
          uid: staffMember.id,
          email: staffMember.email,
          displayName: staffMember.name,
          photoURL: "",
        };
        setCurrentUser(mockAuthUser);
        setUserData(staffUser);
        setRole(ROLES.ADMIN);
        try {
          localStorage.setItem("tyresaathi_user_cache", JSON.stringify(staffUser));
        } catch {}
        return { user: mockAuthUser };
      }
      throw err;
    }
  }

  // Register with full profile creation
  async function register({ name, phone, email, password, role = ROLES.CUSTOMER, shopName = "", city = "", address = "", lat = null, lng = null }) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
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
      email: cleanEmail,
      role: role || ROLES.CUSTOMER,
      shopName: shopName || "",
      shopApproved: role === ROLES.SHOP_OWNER ? true : false,
      photoURL: "",
      address: address || "",
      city: city || "",
      lat: (lat !== null && lat !== undefined && lat !== "") ? Number(lat) : null,
      lng: (lng !== null && lng !== undefined && lng !== "") ? Number(lng) : null,
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
    return createUserWithEmailAndPassword(auth, (email || "").trim().toLowerCase(), password);
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
    const cleanEmail = (email || "").trim().toLowerCase();
    return sendPasswordResetEmail(auth, cleanEmail);
  }

  // Confirm In-App Password Reset with Action Code
  function confirmReset(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  // Verify Reset Code
  function verifyResetCode(oobCode) {
    return verifyPasswordResetCode(auth, oobCode);
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
    resetPassword,
    confirmReset,
    verifyResetCode,
    updateUserProfile,
    logout,
    deleteAccount,
    isAdmin: 
      currentUser?.email?.toLowerCase() === "tyresathi@gmail.com" || 
      role === "admin" || 
      role === ROLES.ADMIN ||
      Boolean(getActiveStaffMember(currentUser?.email)),
    isStaff: Boolean(getActiveStaffMember(currentUser?.email)),
    staffProfile: getActiveStaffMember(currentUser?.email),
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
