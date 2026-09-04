// Centralized Admin Bank Account & UPI Configuration for TyreSaathi

export const DEFAULT_BANK_CONFIG = {
  upiId: "",
  payeeName: "",
  phone: "",
  bankName: "",
  accountHolderName: "",
  accountNumber: "",
  ifscCode: "",
  branchName: "",
  customQrUrl: "",
  paymentNotes: ""
};

// Get current configured bank details
export function getAdminBankConfig() {
  try {
    const saved = localStorage.getItem("tyresaathi_admin_bank_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean up old dummy data if present
      if (parsed.accountNumber === "389201928371" || parsed.upiId === "8877277757@okaxis") {
        localStorage.removeItem("tyresaathi_admin_bank_config");
        return { ...DEFAULT_BANK_CONFIG };
      }
      return { ...DEFAULT_BANK_CONFIG, ...parsed };
    }
  } catch (e) {
    console.warn("Could not read admin bank config:", e);
  }
  return { ...DEFAULT_BANK_CONFIG };
}

// Save admin bank details
export function saveAdminBankConfig(config) {
  try {
    localStorage.setItem("tyresaathi_admin_bank_config", JSON.stringify(config));
    window.dispatchEvent(new Event("tyresaathi_bank_config_updated"));
    return true;
  } catch (e) {
    console.warn("Could not save admin bank config:", e);
    return false;
  }
}

// Helper to construct UPI pay URL (returns null if upiId is empty)
export function getUpiQrCodeUrl(upiId, payeeName, amount = 0) {
  if (!upiId || !upiId.trim()) return null;
  const cleanUpi = encodeURIComponent(upiId.trim());
  const cleanName = encodeURIComponent((payeeName && payeeName.trim()) || "TyreSaathi");
  const amtParam = amount > 0 ? `&am=${amount}` : "";
  const upiString = `upi://pay?pa=${cleanUpi}&pn=${cleanName}${amtParam}&cu=INR&tn=TyreSaathiPlan`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;
}
