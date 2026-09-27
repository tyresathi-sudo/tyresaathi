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
    { category: "Indus Appstore Store Listing", name: "Privacy Policy URL (Mandatory)", url: "https://tyresathi-93306.web.app/privacy-policy", status: "Live & Compliant", desc: "Mandatory store listing link for user privacy and permissions disclosure" },
    { category: "Indus Appstore Store Listing", name: "User Data Deletion URL (Mandatory)", url: "https://tyresathi-93306.web.app/privacy-policy#data-deletion", status: "Live & Compliant", desc: "Mandatory requirement for account deletion & data wipe request" },
    { category: "Indus Appstore Store Listing", name: "Official Website / Homepage", url: "https://tyresathi-93306.web.app/", status: "Live Production", desc: "Official company landing page & web portal" },
    { category: "Indus Appstore Store Listing", name: "Terms of Service URL", url: "https://tyresathi-93306.web.app/terms-of-service", status: "Live Production", desc: "User terms, disclaimer & platform rules" },
    { category: "Indus Appstore Store Listing", name: "Trademark & IP Disclaimer", url: "https://tyresathi-93306.web.app/trademark-disclaimer", status: "Live Production", desc: "Brand trademarks disclaimer (MRF, Apollo, CEAT, etc.)" },
    { category: "Indus Appstore Store Listing", name: "Developer / Support Email", url: "tyresathi@gmail.com", status: "Active", desc: "Primary developer contact email for app store console" },
    { category: "Indus Appstore Store Listing", name: "Support Helpline & WhatsApp", url: "+91 88772 77757", status: "Active", desc: "Direct helpline number for customer & store verification" },
    { category: "Indus Appstore Store Listing", name: "Support & Helpdesk Portal", url: "https://tyresathi-93306.web.app/support", status: "Live Production", desc: "Customer ticketing & grievance redressal portal" },
    { category: "Official App Package", name: "Release Signed APK Download (v1.2.4)", url: "https://github.com/tyresathi-sudo/tyresaathi/releases/download/v1.2.4/TyreSaathi.apk", status: "Active (Direct Download)", desc: "Direct signed release APK ready to upload on Indus Appstore" },
    { category: "Official App Package", name: "Latest Release Hub", url: "https://github.com/tyresathi-sudo/tyresaathi/releases/latest", status: "Active", desc: "Official GitHub releases portal with release notes & tags" },
    { category: "CI/CD & Cloud Build", name: "Automated APK Build Workflow", url: "https://github.com/tyresathi-sudo/tyresaathi/actions", status: "Automated", desc: "GitHub Actions CI/CD building signed APKs automatically" },
    { category: "Source Code Repository", name: "GitHub Main Repository", url: "https://github.com/tyresathi-sudo/tyresaathi", status: "Active", desc: "Complete source code, React PWA & Android Capacitor code" },
    { category: "App Store Console", name: "Indus Appstore Developer Portal", url: "https://developer.indusappstore.com/", status: "Target Console", desc: "PhonePe Indus Appstore developer console for publishing" },
    { category: "Cloud Infrastructure", name: "Firebase Project Console", url: "https://console.firebase.google.com/project/tyresathi-93306/overview", status: "Connected", desc: "Backend cloud configuration, Firestore DB, Auth & Storage" },
    { category: "Live Web Application", name: "Primary Firebase Domain", url: "https://tyresathi-93306.web.app", status: "Live Production", desc: "High-speed Google Cloud hosted PWA domain" },
    { category: "Live Web Application", name: "Secondary Firebase Domain", url: "https://tyresaathi-sudo.web.app", status: "Live Production", desc: "Alternative production domain mirror" },
    { category: "App Navigation", name: "Store Directory & Maps", url: "https://tyresathi-93306.web.app/store-location", status: "Live Production", desc: "Verified tyre stores, puncture hubs & GPS navigation" },
    { category: "App Navigation", name: "Tyre Catalog & Search", url: "https://tyresathi-93306.web.app/search", status: "Live Production", desc: "Car, Bike, Truck, Tractor tyre catalogue search" },
    { category: "App Navigation", name: "Service Bookings", url: "https://tyresathi-93306.web.app/bookings", status: "Live Production", desc: "Tyre fitting, alignment & puncture appointment bookings" },
    { category: "App Navigation", name: "GST & Digital Invoicing", url: "https://tyresathi-93306.web.app/billing", status: "Live Production", desc: "Tax invoices, instant PDF generation & WhatsApp bill sharing" },
    { category: "App Navigation", name: "Shop Analytics & Insights", url: "https://tyresathi-93306.web.app/analytics", status: "Live Production", desc: "Live shop performance, store views & customer booking graphs" },
    { category: "App Navigation", name: "Membership & Pricing Plans", url: "https://tyresathi-93306.web.app/subscription", status: "Live Production", desc: "Free trial, Silver partner & Gold dealer subscriptions" },
    { category: "Master Control", name: "Master Admin Portal", url: "https://tyresathi-93306.web.app/admin", status: "Protected (Admin)", desc: "Super admin management dashboard (tyresathi@gmail.com only)" }
  ];

  const headers = {
    category: "Category / Area",
    name: "Service / Field Name",
    url: "Official URL / Link",
    status: "Status",
    desc: "Purpose & Indus Appstore Requirement"
  };

  exportToCSV(masterLinksData, `TyreSaathi_Master_Links_and_Portals_${new Date().toISOString().split("T")[0]}.csv`, headers);
}

