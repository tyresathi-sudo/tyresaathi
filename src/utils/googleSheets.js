/**
 * Google Sheets Integration Utility for TyreSaathi
 * Handles automatic logging of User Logins, Registrations, and Service Bookings.
 */

const STORAGE_KEY = "tyresaathi_google_sheet_url";

// Default or fallback URL (can be updated from Settings / Admin Panel)
export const DEFAULT_GOOGLE_SHEET_URL = "";

// Google Apps Script template for the user
export const APPS_SCRIPT_TEMPLATE = `// TyreSaathi Google Sheet Sync Script
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = JSON.parse(e.postData.contents);
    var action = data.action || "booking";
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MM-yyyy HH:mm:ss");

    // 1. LOGIN / REGISTER LOGS
    if (action === "login" || action === "register" || action === "test_login") {
      var sheet = ss.getSheetByName("Logins");
      if (!sheet) {
        sheet = ss.insertSheet("Logins");
        sheet.appendRow(["Date & Time (IST)", "User Name", "Email Address", "Phone", "Role", "Activity Type"]);
        sheet.getRange("A1:F1").setBackground("#c0392b").setFontColor("#ffffff").setFontWeight("bold");
      }
      sheet.appendRow([
        timestamp,
        data.name || "N/A",
        data.email || "N/A",
        data.phone || "N/A",
        data.role || "Customer",
        action === "register" ? "New Registration" : (action === "test_login" ? "Test Connection" : "User Login")
      ]);
      return responseJSON({ status: "success", message: "Login record saved successfully" });
    }

    // 2. BOOKINGS LOGS
    if (action === "booking" || action === "update_status" || action === "test_booking") {
      var bSheet = ss.getSheetByName("Bookings");
      if (!bSheet) {
        bSheet = ss.insertSheet("Bookings");
        bSheet.appendRow(["Date & Time (IST)", "Booking ID", "Customer Name", "Phone", "Vehicle Number", "Vehicle Type", "Service Name", "Shop Name", "Booking Date", "Time Slot", "Status", "Notes"]);
        bSheet.getRange("A1:L1").setBackground("#2c3e50").setFontColor("#ffffff").setFontWeight("bold");
      }
      bSheet.appendRow([
        timestamp,
        data.bookingId || ("BK-" + new Date().getTime().toString().slice(-6)),
        data.customerName || "N/A",
        data.customerPhone || "N/A",
        data.vehicleNumber || "N/A",
        data.vehicleType || "N/A",
        data.serviceName || "N/A",
        data.shopName || "N/A",
        data.date || "N/A",
        data.timeSlot || "N/A",
        data.status || "pending",
        data.notes || ""
      ]);
      return responseJSON({ status: "success", message: "Booking record saved successfully" });
    }

    return responseJSON({ status: "error", message: "Unknown action" });
  } catch (err) {
    return responseJSON({ status: "error", error: err.toString() });
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var type = (e && e.parameter && e.parameter.type) ? e.parameter.type : "bookings";
  var sheet = ss.getSheetByName(type === "logins" ? "Logins" : "Bookings") || ss.getActiveSheet();
  
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return responseJSON([]);
  
  var headers = data[0];
  var rows = data.slice(1);
  var result = rows.map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) { obj[h] = row[i]; });
    return obj;
  });
  return responseJSON(result);
}

function responseJSON(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

/**
 * Get active Google Sheet Web App URL
 */
export function getGoogleSheetUrl() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {
    console.warn("Storage read error:", e);
  }
  return DEFAULT_GOOGLE_SHEET_URL;
}

/**
 * Save Google Sheet Web App URL
 */
export function setGoogleSheetUrl(url) {
  try {
    if (!url || !url.trim()) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, url.trim());
    }
  } catch (e) {
    console.warn("Storage write error:", e);
  }
}

/**
 * Log User Login or Registration to Google Sheet
 */
export async function logUserActivityToSheet({ email, name, phone, role, action = "login" }) {
  const url = getGoogleSheetUrl();
  if (!url || !url.startsWith("http")) {
    console.info("Google Sheet URL not configured yet. Skipping sheet log.");
    return false;
  }

  const payload = {
    action: action, // "login", "register", "test_login"
    email: email || "N/A",
    name: name || email?.split("@")[0] || "User",
    phone: phone || "",
    role: role || "customer",
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
  };

  try {
    // Mode 'no-cors' allows sending data to Google Apps Script without CORS blockage
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    console.log("✅ Activity logged to Google Sheet:", action, email);
    return true;
  } catch (err) {
    console.warn("Google Sheet log warning:", err);
    return false;
  }
}

/**
 * Log Booking Record to Google Sheet
 */
export async function logBookingToSheet(bookingData) {
  const url = getGoogleSheetUrl();
  if (!url || !url.startsWith("http")) {
    console.info("Google Sheet URL not configured yet. Skipping booking sheet log.");
    return false;
  }

  const payload = {
    action: "booking",
    bookingId: bookingData.bookingId || bookingData.id || ("BK-" + Date.now().toString().slice(-6)),
    customerName: bookingData.customerName || bookingData.name || "",
    customerPhone: bookingData.customerPhone || bookingData.phone || "",
    vehicleNumber: bookingData.vehicleNumber || "",
    vehicleType: bookingData.vehicleType || "Car / SUV",
    serviceName: bookingData.serviceName || "",
    shopName: bookingData.shopName || "",
    date: bookingData.date || new Date().toISOString().split("T")[0],
    timeSlot: bookingData.timeSlot || "",
    status: bookingData.status || "pending",
    notes: bookingData.notes || "",
  };

  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    console.log("✅ Booking recorded to Google Sheet:", payload.bookingId);
    return true;
  } catch (err) {
    console.warn("Google Sheet booking log warning:", err);
    return false;
  }
}

/**
 * Test Connection with Google Sheet
 */
export async function testGoogleSheetConnection(targetUrl) {
  const url = (targetUrl || getGoogleSheetUrl() || "").trim();
  if (!url || !url.startsWith("https://script.google.com")) {
    throw new Error("Kripya sahi Google Apps Script Web App URL dalein (https://script.google.com/macros/s/.../exec)");
  }

  const testPayload = {
    action: "test_login",
    name: "TyreSaathi Test User",
    email: "test@tyresaathi.com",
    phone: "8877277757",
    role: "Admin (Test Connection)",
  };

  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(testPayload),
  });

  return { success: true, message: "Connection test signal bhej diya gaya! Google Sheet me 'Logins' tab check karein." };
}
