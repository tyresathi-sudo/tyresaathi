// Centralized Support & Helpline Configuration for TyreSaathi
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const DEFAULT_SUPPORT_CONFIG = {
  phone: "8877277757",
  whatsapp: "8877277757",
  email: "tyresathi@gmail.com",
  helplineTiming: "9:00 AM - 9:00 PM (Mon - Sun)",
  supportOfficer: "TyreSaathi Support Executive",
  callHelplineLabel: "+91 88772 77757",
  whatsappLabel: "+91 88772 77757"
};

const STORAGE_KEY = "tyresaathi_support_contact_config";

// Get current configured support details
export function getSupportContactConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SUPPORT_CONFIG, ...parsed };
    }
  } catch (e) {
    console.warn("Could not read support config from storage:", e);
  }
  return { ...DEFAULT_SUPPORT_CONFIG };
}

// Save support contact details (to localStorage & Firestore)
export async function saveSupportContactConfig(config) {
  try {
    const cleanConfig = {
      phone: String(config.phone || DEFAULT_SUPPORT_CONFIG.phone).replace(/\D/g, "").slice(-10) || DEFAULT_SUPPORT_CONFIG.phone,
      whatsapp: String(config.whatsapp || DEFAULT_SUPPORT_CONFIG.whatsapp).replace(/\D/g, "").slice(-10) || DEFAULT_SUPPORT_CONFIG.whatsapp,
      email: String(config.email || DEFAULT_SUPPORT_CONFIG.email).trim().toLowerCase(),
      helplineTiming: config.helplineTiming || DEFAULT_SUPPORT_CONFIG.helplineTiming,
      supportOfficer: config.supportOfficer || DEFAULT_SUPPORT_CONFIG.supportOfficer,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanConfig));
    window.dispatchEvent(new CustomEvent("tyresaathi_support_config_updated", { detail: cleanConfig }));

    // Sync to Firestore
    try {
      await setDoc(doc(db, "app_settings", "support_contact"), cleanConfig, { merge: true });
    } catch (fsErr) {
      console.warn("Firestore sync warning for support contact:", fsErr);
    }

    return cleanConfig;
  } catch (e) {
    console.error("Could not save support config:", e);
    return null;
  }
}

// Fetch live support contact from Firestore on boot
export async function fetchLiveSupportContactConfig() {
  try {
    const snap = await getDoc(doc(db, "app_settings", "support_contact"));
    if (snap.exists()) {
      const liveData = snap.data();
      const merged = { ...DEFAULT_SUPPORT_CONFIG, ...liveData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent("tyresaathi_support_config_updated", { detail: merged }));
      return merged;
    }
  } catch (err) {
    console.warn("Could not fetch remote support contact config:", err);
  }
  return getSupportContactConfig();
}
