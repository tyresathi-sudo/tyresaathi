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
    itemsSummary: inv.items ? inv.items.map((x) => `${x.name} (x${x.qty}) - ₹${x.amount}`).join(" | ") : "",
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
