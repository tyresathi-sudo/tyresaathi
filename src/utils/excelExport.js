// Excel / CSV Universal Data Exporter for TyreSaathi

export function exportToCSV(data, fileName = "TyreSaathi_Export.csv", headers = null) {
  if (!data || !data.length) {
    alert("डाउनलोड करने के लिए कोई डेटा उपलब्ध नहीं है।");
    return;
  }

  // Determine headers
  const columnKeys = headers ? Object.keys(headers) : Object.keys(data[0]);
  const columnLabels = headers ? Object.values(headers) : columnKeys;

  // Build CSV content
  let csvContent = "\uFEFF"; // UTF-8 BOM for Excel Hindi/English proper rendering

  // Header row
  csvContent += columnLabels.map((col) => `"${String(col).replace(/"/g, '""')}"`).join(",") + "\r\n";

  // Data rows
  data.forEach((row) => {
    const rowValues = columnKeys.map((key) => {
      let val = row[key];
      if (val === undefined || val === null) val = "";
      if (Array.isArray(val)) {
        val = val.map((item) => (typeof item === "object" ? item.name || JSON.stringify(item) : item)).join("; ");
      } else if (typeof val === "object") {
        val = JSON.stringify(val);
      }
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvContent += rowValues.join(",") + "\r\n";
  });

  // Create Blob & Trigger Download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Preset formatters for TyreSaathi Data
export function exportBookingsToExcel(bookings) {
  const headers = {
    id: "Booking ID",
    date: "Booking Date",
    timeSlot: "Time Slot",
    customerName: "Customer Name",
    customerPhone: "Customer Phone",
    customerEmail: "Customer Email",
    vehicleType: "Vehicle Type",
    vehicleNumber: "Vehicle Reg Number",
    serviceName: "Service Required",
    shopName: "Service Shop / Hub",
    status: "Status",
    notes: "Customer Problem Notes",
    createdAt: "Created Timestamp"
  };
  exportToCSV(bookings, `TyreSaathi_Bookings_${new Date().toISOString().split("T")[0]}.csv`, headers);
}

export function exportInvoicesToExcel(invoices) {
  const formatted = invoices.map((inv) => ({
    invoiceNo: inv.invoiceNo,
    date: inv.date,
    customerName: inv.customerName,
    customerPhone: inv.customerPhone,
    vehicleName: inv.vehicleName || "",
    vehicleNumber: inv.vehicleNumber || "",
    tyreSizes: (inv.items || []).map((x) => x.tyreSize).filter(Boolean).join(", ") || "—",
    tyreSerials: (inv.items || []).map((x) => x.serialNo).filter(Boolean).join(", ") || "—",
    itemsSummary: (inv.items || []).map((x) => {
      let desc = `${x.name} (x${x.qty})`;
      if (x.tyreSize) desc += ` [Size: ${x.tyreSize}]`;
      if (x.serialNo) desc += ` [Serial: ${x.serialNo}]`;
      desc += ` - ₹${x.amount}`;
      return desc;
    }).join(" | "),
    subtotal: `₹${inv.subtotal}`,
    discount: `₹${inv.discount || 0}`,
    taxAmount: `₹${inv.taxAmount || 0}`,
    grandTotal: `₹${inv.grandTotal}`,
    paymentMode: inv.paymentMode ? inv.paymentMode.toUpperCase() : "CASH",
    paymentStatus: inv.paymentStatus === "paid" ? "PAID" : "PENDING/KHATA",
    shopName: inv.shopName || "TyreSaathi Hub",
    notes: inv.notes || ""
  }));

  const headers = {
    invoiceNo: "Invoice Number",
    date: "Bill Date",
    customerName: "Customer Name",
    customerPhone: "Customer Phone",
    vehicleName: "Vehicle Name",
    vehicleNumber: "Vehicle Number",
    tyreSizes: "Tyre Size / Number (टायर नंबर)",
    tyreSerials: "Tyre Serial / DOT No. (सीरियल नंबर)",
    itemsSummary: "Items & Services Breakdown",
    subtotal: "Subtotal",
    discount: "Discount",
    taxAmount: "GST Tax",
    grandTotal: "Grand Total Amount",
    paymentMode: "Payment Method",
    paymentStatus: "Payment Status",
    shopName: "Billed By Shop",
    notes: "Warranty & Remarks"
  };

  exportToCSV(formatted, `TyreSaathi_Billing_Invoices_${new Date().toISOString().split("T")[0]}.csv`, headers);
}

export function exportUsersToExcel(users) {
  const headers = {
    uid: "User ID",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    role: "User Role",
    shopName: "Shop / Center Name",
    shopApproved: "Verified Partner",
    city: "City / Location",
    address: "Address",
    createdAt: "Registered Date"
  };
  exportToCSV(users, `TyreSaathi_Users_Shops_${new Date().toISOString().split("T")[0]}.csv`, headers);
}

export function exportTicketsToExcel(tickets) {
  const headers = {
    id: "Ticket ID",
    category: "Issue Category",
    subject: "Subject",
    userName: "Raised By",
    userEmail: "Email",
    userPhone: "Phone",
    priority: "Priority",
    status: "Status",
    description: "Issue Description",
    adminReply: "Admin Resolution Note",
    createdAt: "Created Date"
  };
  exportToCSV(tickets, `TyreSaathi_Support_Tickets_${new Date().toISOString().split("T")[0]}.csv`, headers);
}

export function exportMasterLinksToExcel() {
  const masterLinksData = [
    { category: "Official App Download", name: "GitHub Latest Release APK (Direct)", url: "https://github.com/tyresathi-sudo/tyresaathi/releases/latest/download/TyreSaathi.apk", status: "Active (Recommended)", desc: "Direct APK download for Android users & WhatsApp sharing" },
    { category: "App Store Listing", name: "Uptodown Developer Portal", url: "https://developers.uptodown.com/", status: "In Review (v1.1)", desc: "Official Uptodown release console for TyreSaathi APK" },
    { category: "Source Code", name: "GitHub Main Repository", url: "https://github.com/tyresathi-sudo/tyresaathi", status: "Active", desc: "Complete source code, Android Capacitor app and React codebase" },
    { category: "CI/CD & APK Build", name: "GitHub Actions Workflow", url: "https://github.com/tyresathi-sudo/tyresaathi/actions", status: "Automated", desc: "Auto-compiles release & debug signed APKs on every git push" },
    { category: "Live Web Application", name: "Firebase Web App", url: "https://tyresaathi-sudo.web.app", status: "Live PWA", desc: "Production Web & Mobile Web App accessible on any browser" },
    { category: "Secondary Web Mirror", name: "Firebase App Domain", url: "https://tyresaathi-sudo.firebaseapp.com", status: "Live", desc: "Alternative production domain hosted on Google Cloud" },
    { category: "Cloud Database & Auth", name: "Firebase Cloud Console", url: "https://console.firebase.google.com/project/tyresaathi-sudo/overview", status: "Connected", desc: "Firestore database, user authentication & cloud storage" },
    { category: "Firestore Collections", name: "Firestore Live Database", url: "https://console.firebase.google.com/project/tyresaathi-sudo/firestore", status: "Cloud Sync", desc: "Real-time collections: users, bookings, invoices, tickets, ads" },
    { category: "App Core Screen", name: "Home Dashboard", url: "https://tyresaathi-sudo.web.app/", status: "Production", desc: "Quick services, SOS roadside help, tyre brands & actions" },
    { category: "GPS & Maps", name: "Nearby Tyre Shops Locator", url: "https://tyresaathi-sudo.web.app/shops", status: "Production", desc: "Real-time GPS shop search, puncture hubs, alignments" },
    { category: "Catalogue & Search", name: "Tyre Search & Compatibility", url: "https://tyresaathi-sudo.web.app/search", status: "Production", desc: "Search tyres by vehicle type (Car, Bike, Truck, Tractor, EV)" },
    { category: "Camera AI Tool", name: "Tyre Health Inspection", url: "https://tyresaathi-sudo.web.app/inspection", status: "Production", desc: "Camera tyre condition scanner, tread depth & wear report" },
    { category: "Service Management", name: "Bookings & Appointments", url: "https://tyresaathi-sudo.web.app/bookings", status: "Production", desc: "Tyre change, puncture, wheel alignment appointment scheduling" },
    { category: "B2B Shop Billing", name: "Digital Invoicing & GST Bill", url: "https://tyresaathi-sudo.web.app/billing", status: "Production", desc: "Generate tax bills, calculate discounts, share via WhatsApp/PDF" },
    { category: "Monetization", name: "Subscription & Plans", url: "https://tyresaathi-sudo.web.app/subscription", status: "Production", desc: "Free, Silver & Gold dealer partner subscription plans" },
    { category: "Master Control", name: "Admin Super Dashboard", url: "https://tyresaathi-sudo.web.app/admin", status: "Protected", desc: "Manage all shops, users, billing records, tickets & Excel export" },
    { category: "Customer Helpdesk", name: "Support Tickets", url: "https://tyresaathi-sudo.web.app/support", status: "Production", desc: "Raise grievance tickets, track ticket status & admin replies" },
    { category: "Legal & Compliance", name: "Terms of Service & Privacy", url: "https://tyresaathi-sudo.web.app/terms", status: "Production", desc: "Store compliance policies, privacy policy & user terms" }
  ];

  const headers = {
    category: "Category / Area",
    name: "Service / Page Name",
    url: "Official URL / Link",
    status: "Status",
    desc: "Purpose & Description"
  };

  exportToCSV(masterLinksData, `TyreSaathi_Master_Links_and_Portals_${new Date().toISOString().split("T")[0]}.csv`, headers);
}

