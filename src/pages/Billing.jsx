import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  Trash2, 
  Printer, 
  Share2, 
  Search, 
  Calendar, 
  User, 
  Phone, 
  Car, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  DollarSign, 
  CreditCard, 
  QrCode, 
  Send, 
  ArrowLeft, 
  ChevronRight, 
  Filter, 
  Download, 
  Receipt,
  Sparkles,
  Percent,
  Check
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { SERVICE_TYPES, MEGA_MENU_BRANDS } from "../config/tyreCatalog";

const INITIAL_DEMO_INVOICES = [
  {
    id: "TS-INV-1001",
    invoiceNo: "TS-INV-1001",
    date: "2026-08-18",
    customerName: "Ramesh Sharma",
    customerPhone: "98765-11223",
    vehicleName: "Swift Dzire",
    vehicleNumber: "KA 05 MN 4589",
    shopName: "TyreSaathi Partner Hub",
    items: [
      { id: "1", name: "MRF Zapper FX 100/90-17 Tubeless Tyre", type: "tyre", qty: 2, rate: 2100, amount: 4200 },
      { id: "2", name: "Tyre Cut & Sidewall Repair (सर्विस)", type: "service", qty: 1, rate: 350, amount: 350 },
      { id: "3", name: "Nitrogen Air Fill (4 Tyres)", type: "service", qty: 1, rate: 100, amount: 100 }
    ],
    subtotal: 4650,
    discount: 150,
    taxType: "none", // none, gst18, gst28
    taxAmount: 0,
    grandTotal: 4500,
    paymentMode: "upi", // cash, upi, card, khata
    paymentStatus: "paid", // paid, pending
    notes: "5 Years manufacturer warranty on tyres. Free air check for 6 months.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "TS-INV-1002",
    invoiceNo: "TS-INV-1002",
    date: "2026-08-18",
    customerName: "Pooja Verma",
    customerPhone: "98440-99887",
    vehicleName: "Hyundai Creta",
    vehicleNumber: "KA 01 AB 8877",
    shopName: "TyreSaathi Partner Hub",
    items: [
      { id: "1", name: "3D Wheel Alignment & Balancing", type: "service", qty: 1, rate: 450, amount: 450 },
      { id: "2", name: "Tubeless Puncture Fix (2 Plugs)", type: "service", qty: 2, rate: 100, amount: 200 }
    ],
    subtotal: 650,
    discount: 50,
    taxType: "none",
    taxAmount: 0,
    grandTotal: 600,
    paymentMode: "cash",
    paymentStatus: "paid",
    notes: "Alignment report given. Next checkup after 5000 km.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "TS-INV-1003",
    invoiceNo: "TS-INV-1003",
    date: "2026-08-17",
    customerName: "Anil Kumar",
    customerPhone: "99001-22334",
    vehicleName: "Royal Enfield Classic 350",
    vehicleNumber: "KA 04 EQ 1234",
    shopName: "TyreSaathi Partner Hub",
    items: [
      { id: "1", name: "CEAT Secura Zoom 3.00-18 Bike Tyre", type: "tyre", qty: 1, rate: 1850, amount: 1850 },
      { id: "2", name: "Doorstep Emergency Assistance", type: "service", qty: 1, rate: 499, amount: 499 }
    ],
    subtotal: 2349,
    discount: 99,
    taxType: "none",
    taxAmount: 0,
    grandTotal: 2250,
    paymentMode: "khata",
    paymentStatus: "pending",
    notes: "Remaining payment promised by tomorrow evening.",
    createdAt: new Date().toISOString(),
  }
];

const PRESET_SERVICES = [
  { name: "Tyre Cut & Sidewall Repair (कट रिपेयर)", rate: 350, type: "service" },
  { name: "Tubeless Puncture Repair (पंचर रिपेयर)", rate: 100, type: "service" },
  { name: "3D Wheel Alignment & Balancing (अलाइनमेंट)", rate: 450, type: "service" },
  { name: "New Tyre Fitting & Nitrogen Fill (फिटिंग)", rate: 150, type: "service" },
  { name: "Doorstep Emergency Assistance (घर/रास्ते पर)", rate: 499, type: "service" },
  { name: "Nitrogen Air Fill - All 4 Tyres", rate: 100, type: "service" },
  { name: "Wheel Weights / Lead balancing (per 50g)", rate: 80, type: "service" },
  { name: "Tyre Rotation & Inspection", rate: 200, type: "service" },
];

export default function Billing() {
  const { user, profile, isVendor } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("create"); // 'create' or 'history'
  const [invoices, setInvoices] = useState(INITIAL_DEMO_INVOICES);
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState("all");

  // Active Invoice Form State
  const [invoice, setInvoice] = useState({
    invoiceNo: `TS-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split("T")[0],
    customerName: searchParams.get("customer") || "",
    customerPhone: searchParams.get("phone") || "",
    vehicleName: searchParams.get("vehicle") || "",
    vehicleNumber: searchParams.get("vehicleNo") || "",
    shopName: profile?.shopName || "TyreSaathi Partner Hub",
    shopPhone: profile?.phone || "",
    shopAddress: profile?.address || "Verified TyreSaathi Network",
    items: [
      { id: "1", name: searchParams.get("service") || "MRF / Apollo Tyre Replacement", type: "tyre", qty: 1, rate: 2500, amount: 2500 }
    ],
    subtotal: 2500,
    discount: 0,
    taxType: "none", // 'none', 'gst18', 'gst28'
    taxAmount: 0,
    grandTotal: 2500,
    paymentMode: "upi",
    paymentStatus: "paid",
    notes: "Warranty as per company terms. Free checkup on next visit.",
  });

  // Modal State for Full Page Printable Receipt
  const [printModalInvoice, setPrintModalInvoice] = useState(null);

  // Auto calculate totals whenever items, discount or tax changes
  useEffect(() => {
    const sub = invoice.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const disc = Number(invoice.discount) || 0;
    const taxable = Math.max(0, sub - disc);

    let tax = 0;
    if (invoice.taxType === "gst18") {
      tax = Math.round(taxable * 0.18);
    } else if (invoice.taxType === "gst28") {
      tax = Math.round(taxable * 0.28);
    }

    const grand = Math.max(0, taxable + tax);

    setInvoice((prev) => ({
      ...prev,
      subtotal: sub,
      taxAmount: tax,
      grandTotal: grand,
    }));
  }, [invoice.items, invoice.discount, invoice.taxType]);

  // Handle Item Row Changes
  const handleItemChange = (id, field, value) => {
    setInvoice((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === "qty" || field === "rate") {
          const q = Number(field === "qty" ? value : item.qty) || 0;
          const r = Number(field === "rate" ? value : item.rate) || 0;
          updated.amount = q * r;
        }
        return updated;
      });
      return { ...prev, items: updatedItems };
    });
  };

  // Add Item Row
  const addItemRow = (type = "tyre") => {
    const newItem = {
      id: Date.now().toString(),
      name: type === "service" ? "Wheel Alignment / Puncture Fix" : "New Tyre / Tube",
      type,
      qty: 1,
      rate: type === "service" ? 350 : 2200,
      amount: type === "service" ? 350 : 2200,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  // Add Preset Service directly
  const addPresetService = (svc) => {
    const newItem = {
      id: Date.now().toString(),
      name: svc.name,
      type: svc.type,
      qty: 1,
      rate: svc.rate,
      amount: svc.rate,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  // Remove Item Row
  const removeItemRow = (id) => {
    if (invoice.items.length <= 1) {
      alert("कम से कम एक आइटम बिल में होना चाहिए।");
      return;
    }
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  // Save Invoice
  const handleSaveInvoice = async (e) => {
    if (e) e.preventDefault();

    if (!invoice.customerName.trim()) {
      alert("कृपया ग्राहक का नाम (Customer Name) दर्ज करें।");
      return;
    }

    setLoading(true);
    const invoiceRecord = {
      ...invoice,
      id: invoice.invoiceNo,
      shopName: profile?.shopName || invoice.shopName || "TyreSaathi Partner Hub",
      createdAt: new Date().toISOString(),
    };

    try {
      // Try save to firestore
      await addDoc(collection(db, "invoices"), {
        ...invoiceRecord,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Firestore invoice save note (using local state):", err);
    }

    setInvoices((prev) => [invoiceRecord, ...prev]);
    setLoading(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);

    // Open print preview modal automatically
    setPrintModalInvoice(invoiceRecord);
  };

  // Reset Form for Next Bill
  const handleResetForm = () => {
    setInvoice({
      invoiceNo: `TS-INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      customerName: "",
      customerPhone: "",
      vehicleName: "",
      vehicleNumber: "",
      shopName: profile?.shopName || "TyreSaathi Partner Hub",
      shopPhone: profile?.phone || "",
      shopAddress: profile?.address || "Verified TyreSaathi Network",
      items: [
        { id: Date.now().toString(), name: "", type: "tyre", qty: 1, rate: 0, amount: 0 }
      ],
      subtotal: 0,
      discount: 0,
      taxType: "none",
      taxAmount: 0,
      grandTotal: 0,
      paymentMode: "upi",
      paymentStatus: "paid",
      notes: "Warranty as per company terms. Free checkup on next visit.",
    });
  };

  // Generate WhatsApp Message Link
  const getWhatsAppShareUrl = (inv) => {
    const itemsList = inv.items
      .map((it, idx) => `${idx + 1}. ${it.name} (x${it.qty}) - ₹${it.amount}`)
      .join("\n");

    const message = `🧾 *TyreSaathi Retail Invoice*\n\n` +
      `🏢 *Dukan:* ${inv.shopName}\n` +
      `📄 *Bill No:* ${inv.invoiceNo}\n` +
      `📅 *Date:* ${inv.date}\n` +
      `👤 *Customer:* ${inv.customerName} (${inv.vehicleName || "Vehicle"} ${inv.vehicleNumber || ""})\n\n` +
      `*ITEMS BREAKDOWN:*\n${itemsList}\n\n` +
      `💰 *Subtotal:* ₹${inv.subtotal}\n` +
      (inv.discount > 0 ? `🎁 *Discount:* -₹${inv.discount}\n` : "") +
      (inv.taxAmount > 0 ? `🏛️ *GST Tax:* +₹${inv.taxAmount}\n` : "") +
      `💳 *Grand Total:* ₹${inv.grandTotal}\n` +
      `✅ *Payment Mode:* ${inv.paymentMode.toUpperCase()} (${inv.paymentStatus === "paid" ? "PAID ✅" : "PENDING ⏳"})\n\n` +
      `_TyreSaathi se judne ke liye dhanyawad! Shubh Yatra!_ 🚗✨`;

    const phoneDigits = inv.customerPhone.replace(/[^0-9]/g, "");
    return `https://wa.me/91${phoneDigits}?text=${encodeURIComponent(message)}`;
  };

  // Filtered History
  const filteredInvoices = invoices.filter((inv) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      inv.customerName.toLowerCase().includes(q) ||
      inv.customerPhone.includes(q) ||
      inv.invoiceNo.toLowerCase().includes(q) ||
      (inv.vehicleNumber && inv.vehicleNumber.toLowerCase().includes(q));

    const matchesPayment = filterPayment === "all" || inv.paymentStatus === filterPayment || inv.paymentMode === filterPayment;
    return matchesSearch && matchesPayment;
  });

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.paymentStatus === "paid" ? inv.grandTotal : 0), 0);
  const pendingKhata = invoices.reduce((sum, inv) => sum + (inv.paymentStatus === "pending" ? inv.grandTotal : 0), 0);

  return (
    <div className="billing-page-container">
      {/* 🌟 Header Bar */}
      <div className="billing-header-row">
        <div>
          <h1 className="billing-title">
            <Receipt size={26} color="#c0392b" /> Tyre & Service Billing (दुकान बिलिंग)
          </h1>
          <p className="billing-sub">
            Grahak ke liye instant cash memo, GST/Non-GST retail invoice banayein, print karein aur WhatsApp par bhejein.
          </p>
        </div>

        {/* Action Toggle Tabs */}
        <div className="billing-nav-pills">
          <button
            className={`pill-btn ${activeTab === "create" ? "pill-btn-active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            <Plus size={15} /> ➕ Naya Bill Banayein
          </button>
          <button
            className={`pill-btn ${activeTab === "history" ? "pill-btn-active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            <FileText size={15} /> 📋 Sabhi Bills ({invoices.length})
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="billing-success-alert">
          <CheckCircle2 size={18} color="#27ae60" />
          <span>✅ Bill #{invoice.invoiceNo} successfully save ho gaya hai! Niche print karein ya WhatsApp karein.</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: CREATE NEW INVOICE FORM
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "create" && (
        <div className="billing-workspace-grid">
          {/* Left: Input Form */}
          <div className="billing-form-card">
            <form onSubmit={handleSaveInvoice}>
              {/* Section 1: Customer & Vehicle Info */}
              <div className="form-sub-card">
                <div className="card-section-title">
                  <span>1</span> Grahak Aur Gaadi Ki Details (Customer & Vehicle)
                </div>

                <div className="form-grid-3">
                  <div className="form-input-group">
                    <label>Customer Name (ग्राहक का नाम) *</label>
                    <div className="input-with-icon">
                      <User size={15} />
                      <input
                        type="text"
                        placeholder="उदा: Ramesh Sharma"
                        value={invoice.customerName}
                        onChange={(e) => setInvoice({ ...invoice, customerName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label>Mobile Number (मोबाइल नंबर) *</label>
                    <div className="input-with-icon">
                      <Phone size={15} />
                      <input
                        type="tel"
                        placeholder="उदा: 9876543210"
                        value={invoice.customerPhone}
                        onChange={(e) => setInvoice({ ...invoice, customerPhone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label>Invoice Date (तारीख)</label>
                    <div className="input-with-icon">
                      <Calendar size={15} />
                      <input
                        type="date"
                        value={invoice.date}
                        onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid-2" style={{ marginTop: "12px" }}>
                  <div className="form-input-group">
                    <label>Vehicle Model (गाड़ी का नाम/मॉडल)</label>
                    <div className="input-with-icon">
                      <Car size={15} />
                      <input
                        type="text"
                        placeholder="उदा: Swift Dzire / Creta / Activa"
                        value={invoice.vehicleName}
                        onChange={(e) => setInvoice({ ...invoice, vehicleName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label>Vehicle Registration No. (गाड़ी नंबर)</label>
                    <input
                      type="text"
                      placeholder="उदा: KA 05 MN 4589 / DL 01 AB 1234"
                      value={invoice.vehicleNumber}
                      onChange={(e) => setInvoice({ ...invoice, vehicleNumber: e.target.value.toUpperCase() })}
                      style={{ textTransform: "uppercase" }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Items & Service Breakdown */}
              <div className="form-sub-card">
                <div className="card-section-header">
                  <div className="card-section-title">
                    <span>2</span> Tyres, Tubes & Services (सामान और सर्विस विवरण)
                  </div>
                  <div className="quick-add-actions">
                    <button type="button" className="btn-quick-add" onClick={() => addItemRow("tyre")}>
                      + 🛞 Tyre Item
                    </button>
                    <button type="button" className="btn-quick-add" onClick={() => addItemRow("service")}>
                      + 🛠️ Service Item
                    </button>
                  </div>
                </div>

                {/* Quick Presets Bar */}
                <div className="presets-bar">
                  <span className="preset-label">⚡ Quick Services:</span>
                  {PRESET_SERVICES.slice(0, 4).map((svc, i) => (
                    <button
                      key={i}
                      type="button"
                      className="preset-chip"
                      onClick={() => addPresetService(svc)}
                    >
                      + {svc.name.split("(")[0]} (₹{svc.rate})
                    </button>
                  ))}
                </div>

                {/* Items Table */}
                <div className="items-table-wrapper">
                  <table className="items-entry-table">
                    <thead>
                      <tr>
                        <th style={{ width: "45%" }}>Item Description / Service Name</th>
                        <th style={{ width: "15%" }}>Type</th>
                        <th style={{ width: "12%" }}>Qty</th>
                        <th style={{ width: "15%" }}>Rate (₹)</th>
                        <th style={{ width: "13%" }}>Amount (₹)</th>
                        <th style={{ width: "5%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((it, idx) => (
                        <tr key={it.id}>
                          <td>
                            <input
                              type="text"
                              value={it.name}
                              placeholder="उदा: Apollo Amazer 185/65 R15 / Cut Repair"
                              onChange={(e) => handleItemChange(it.id, "name", e.target.value)}
                              className="item-name-input"
                              required
                            />
                          </td>
                          <td>
                            <select
                              value={it.type}
                              onChange={(e) => handleItemChange(it.id, "type", e.target.value)}
                              className="item-type-select"
                            >
                              <option value="tyre">🛞 Tyre</option>
                              <option value="tube">⭕ Tube</option>
                              <option value="service">🛠️ Service</option>
                              <option value="alloy">✨ Alloy</option>
                              <option value="other">📦 Other</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              value={it.qty}
                              onChange={(e) => handleItemChange(it.id, "qty", e.target.value)}
                              className="item-qty-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={it.rate}
                              onChange={(e) => handleItemChange(it.id, "rate", e.target.value)}
                              className="item-rate-input"
                            />
                          </td>
                          <td className="item-amount-col">
                            ₹{it.amount}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-remove-row"
                              onClick={() => removeItemRow(it.id)}
                              title="Delete Item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  className="btn-add-row-full"
                  onClick={() => addItemRow("tyre")}
                >
                  <Plus size={15} /> Nayi Line / Item Jodein
                </button>
              </div>

              {/* Section 3: Pricing, Tax & Payment Mode */}
              <div className="form-sub-card">
                <div className="card-section-title">
                  <span>3</span> Tax, Discount Aur Payment Details
                </div>

                <div className="form-grid-3">
                  <div className="form-input-group">
                    <label>Discount / Chhut (₹ छूट)</label>
                    <input
                      type="number"
                      min="0"
                      value={invoice.discount}
                      onChange={(e) => setInvoice({ ...invoice, discount: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="form-input-group">
                    <label>Tax Invoice Mode (जीएसटी प्रकार)</label>
                    <select
                      value={invoice.taxType}
                      onChange={(e) => setInvoice({ ...invoice, taxType: e.target.value })}
                    >
                      <option value="none">Non-GST / Kacha Bill (0% Tax)</option>
                      <option value="gst18">GST 18% (Tyres & Auto Services)</option>
                      <option value="gst28">GST 28% (Commercial / Heavy)</option>
                    </select>
                  </div>

                  <div className="form-input-group">
                    <label>Payment Method (भुगतान का तरीका)</label>
                    <select
                      value={invoice.paymentMode}
                      onChange={(e) => setInvoice({ ...invoice, paymentMode: e.target.value })}
                    >
                      <option value="upi">📱 UPI (GPay / PhonePe / Paytm)</option>
                      <option value="cash">💵 Cash (नकद)</option>
                      <option value="card">💳 Debit / Credit Card</option>
                      <option value="khata">📒 Khata / Udhar (बाकी)</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2" style={{ marginTop: "12px" }}>
                  <div className="form-input-group">
                    <label>Payment Status</label>
                    <div className="payment-status-toggle">
                      <button
                        type="button"
                        className={`status-toggle-btn ${invoice.paymentStatus === "paid" ? "status-paid-active" : ""}`}
                        onClick={() => setInvoice({ ...invoice, paymentStatus: "paid" })}
                      >
                        ✅ Paid (पूरा पैसा मिल गया)
                      </button>
                      <button
                        type="button"
                        className={`status-toggle-btn ${invoice.paymentStatus === "pending" ? "status-pending-active" : ""}`}
                        onClick={() => setInvoice({ ...invoice, paymentStatus: "pending" })}
                      >
                        ⏳ Pending / Khata (उधार बाकी)
                      </button>
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label>Warranty / Terms Notes (वारंटी व शर्तें)</label>
                    <input
                      type="text"
                      value={invoice.notes}
                      onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
                      placeholder="e.g. 5 Years Unconditional Warranty"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="billing-action-buttons">
                <button type="button" className="btn-reset-bill" onClick={handleResetForm}>
                  🔄 Form Reset Karein
                </button>

                <button type="submit" className="btn-generate-bill" disabled={loading}>
                  <Receipt size={17} /> {loading ? "Bill Save Ho Raha Hai..." : "💾 Bill Save & Print Karein"}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Live Bill Summary / Receipt Card */}
          <div className="billing-receipt-sidebar">
            <div className="live-receipt-card">
              <div className="receipt-top-brand">
                <span className="brand-badge">TYRESAATHI RETAIL INVOICE</span>
                <span className="receipt-inv-num">#{invoice.invoiceNo}</span>
              </div>

              <div className="receipt-shop-meta">
                <h3>{invoice.shopName || "TyreSaathi Partner Hub"}</h3>
                <p>Verified Tyre & Auto Service Network</p>
                <small>Date: {invoice.date}</small>
              </div>

              <div className="receipt-divider" />

              {/* Customer Box */}
              <div className="receipt-customer-details">
                <div>
                  <span className="meta-lbl">Customer:</span>
                  <strong>{invoice.customerName || "Grahak Ka Naam"}</strong>
                </div>
                <div>
                  <span className="meta-lbl">Phone:</span>
                  <span>{invoice.customerPhone || "Mobile Number"}</span>
                </div>
                {invoice.vehicleNumber && (
                  <div>
                    <span className="meta-lbl">Vehicle:</span>
                    <span>{invoice.vehicleName} ({invoice.vehicleNumber})</span>
                  </div>
                )}
              </div>

              <div className="receipt-divider" />

              {/* Items Summary */}
              <div className="receipt-items-list">
                {invoice.items.map((it, idx) => (
                  <div key={idx} className="receipt-item-row">
                    <div className="it-left">
                      <span className="it-name">{it.name || "Item Name"}</span>
                      <small className="it-qty">{it.qty} x ₹{it.rate}</small>
                    </div>
                    <span className="it-amt">₹{it.amount}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-divider" />

              {/* Calculation Breakdown */}
              <div className="receipt-calc-table">
                <div className="calc-row">
                  <span>Subtotal:</span>
                  <span>₹{invoice.subtotal}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="calc-row discount-row">
                    <span>Discount:</span>
                    <span>-₹{invoice.discount}</span>
                  </div>
                )}
                {invoice.taxAmount > 0 && (
                  <div className="calc-row tax-row">
                    <span>GST ({invoice.taxType === "gst18" ? "18%" : "28%"}):</span>
                    <span>+₹{invoice.taxAmount}</span>
                  </div>
                )}
                <div className="calc-row grand-total-row">
                  <span>Grand Total:</span>
                  <span className="grand-amount">₹{invoice.grandTotal}</span>
                </div>
              </div>

              {/* Payment Mode Tag */}
              <div className="receipt-payment-tag">
                <span>Payment Mode: <strong>{invoice.paymentMode.toUpperCase()}</strong></span>
                <span className={invoice.paymentStatus === "paid" ? "badge-paid" : "badge-pending"}>
                  {invoice.paymentStatus === "paid" ? "✅ PAID" : "⏳ KHATA"}
                </span>
              </div>

              {/* Direct Quick Actions */}
              <div className="receipt-actions-grid">
                <button
                  type="button"
                  className="btn-print-preview"
                  onClick={() => setPrintModalInvoice(invoice)}
                >
                  <Printer size={15} /> Print / PDF Slip
                </button>

                {invoice.customerPhone && (
                  <a
                    href={getWhatsAppShareUrl(invoice)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-whatsapp-share"
                  >
                    💬 WhatsApp Bill
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 2: BILLING HISTORY & KHATA RECORDS
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "history" && (
        <div className="billing-history-container">
          {/* Top Metric Stats */}
          <div className="billing-stats-grid">
            <div className="stat-card">
              <span className="stat-icon-wrap" style={{ background: "#e8f8f5", color: "#27ae60" }}>
                <DollarSign size={20} />
              </span>
              <div>
                <span className="stat-label">Total Revenue Collected</span>
                <h3 className="stat-value">₹{totalRevenue.toLocaleString()}</h3>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon-wrap" style={{ background: "#fef9e7", color: "#f39c12" }}>
                <Clock size={20} />
              </span>
              <div>
                <span className="stat-label">Khata / Pending Amount</span>
                <h3 className="stat-value" style={{ color: "#d35400" }}>₹{pendingKhata.toLocaleString()}</h3>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon-wrap" style={{ background: "#ebf5fb", color: "#2980b9" }}>
                <Receipt size={20} />
              </span>
              <div>
                <span className="stat-label">Total Bills Generated</span>
                <h3 className="stat-value">{invoices.length} Bills</h3>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="history-toolbar">
            <div className="history-search-input">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by customer, phone, vehicle no, or bill #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="history-filter-pills">
              <button
                className={`hist-filter ${filterPayment === "all" ? "hist-active" : ""}`}
                onClick={() => setFilterPayment("all")}
              >
                All
              </button>
              <button
                className={`hist-filter ${filterPayment === "paid" ? "hist-active" : ""}`}
                onClick={() => setFilterPayment("paid")}
              >
                ✅ Paid
              </button>
              <button
                className={`hist-filter ${filterPayment === "pending" ? "hist-active" : ""}`}
                onClick={() => setFilterPayment("pending")}
              >
                ⏳ Khata / Pending
              </button>
              <button
                className={`hist-filter ${filterPayment === "upi" ? "hist-active" : ""}`}
                onClick={() => setFilterPayment("upi")}
              >
                📱 UPI
              </button>
              <button
                className={`hist-filter ${filterPayment === "cash" ? "hist-active" : ""}`}
                onClick={() => setFilterPayment("cash")}
              >
                💵 Cash
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="invoices-table-card">
            {filteredInvoices.length === 0 ? (
              <div className="no-invoices-found">
                <Receipt size={40} color="#bbb" />
                <h4>No Bills Found</h4>
                <p>Naya bill banane ke liye upar "Naya Bill Banayein" button par click karein.</p>
              </div>
            ) : (
              <table className="invoices-history-table">
                <thead>
                  <tr>
                    <th>Bill No & Date</th>
                    <th>Customer Details</th>
                    <th>Vehicle</th>
                    <th>Items Summary</th>
                    <th>Total Amount</th>
                    <th>Payment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td>
                        <strong>{inv.invoiceNo}</strong>
                        <small className="cell-subtext">{inv.date}</small>
                      </td>
                      <td>
                        <span className="customer-name-bold">{inv.customerName}</span>
                        <a href={`tel:${inv.customerPhone}`} className="customer-phone-link">
                          📞 {inv.customerPhone}
                        </a>
                      </td>
                      <td>
                        {inv.vehicleName || inv.vehicleNumber ? (
                          <>
                            <span>{inv.vehicleName}</span>
                            <small className="vehicle-no-badge">{inv.vehicleNumber}</small>
                          </>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <span className="items-count-tag">{inv.items.length} Items</span>
                        <small className="items-summary-preview">
                          {inv.items.map((x) => x.name).slice(0, 2).join(", ")}
                          {inv.items.length > 2 ? "..." : ""}
                        </small>
                      </td>
                      <td>
                        <strong className="table-grand-total">₹{inv.grandTotal}</strong>
                        {inv.discount > 0 && <small className="discount-tag">₹{inv.discount} Off</small>}
                      </td>
                      <td>
                        <span className={`status-pill ${inv.paymentStatus === "paid" ? "pill-paid" : "pill-pending"}`}>
                          {inv.paymentStatus === "paid" ? "✅ Paid" : "⏳ Pending"}
                        </span>
                        <small className="pay-mode-text">{inv.paymentMode.toUpperCase()}</small>
                      </td>
                      <td>
                        <div className="table-actions-cell">
                          <button
                            type="button"
                            className="btn-tbl-print"
                            onClick={() => setPrintModalInvoice(inv)}
                            title="Print / View Invoice"
                          >
                            <Printer size={14} /> Print
                          </button>
                          <a
                            href={getWhatsAppShareUrl(inv)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-tbl-wa"
                            title="Send on WhatsApp"
                          >
                            💬 WA
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          PRINTABLE MODAL / CASH MEMO VIEW (window.print() friendly)
      ══════════════════════════════════════════════════════════════════ */}
      {printModalInvoice && (
        <div className="print-modal-overlay" onClick={() => setPrintModalInvoice(null)}>
          <div className="print-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="print-modal-controls no-print">
              <h3>📄 Retail Invoice Print Preview</h3>
              <div className="print-controls-right">
                <button
                  type="button"
                  className="btn-do-print"
                  onClick={() => window.print()}
                >
                  <Printer size={16} /> Print / Save as PDF
                </button>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setPrintModalInvoice(null)}
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* Actual Printable Invoice Paper */}
            <div className="invoice-paper-sheet" id="printable-invoice">
              {/* Header */}
              <div className="paper-header">
                <div className="paper-header-left">
                  <img src="/logo.png" alt="TyreSaathi" className="paper-logo" onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }} />
                  <div>
                    <h2 className="paper-shop-name">{printModalInvoice.shopName}</h2>
                    <p className="paper-shop-tag">Authorized TyreSaathi Network Partner</p>
                    <p className="paper-shop-info">India's Trusted Tyre & Service Network</p>
                  </div>
                </div>

                <div className="paper-header-right">
                  <span className="invoice-badge-title">
                    {printModalInvoice.taxType !== "none" ? "TAX INVOICE (जीएसटी बिल)" : "RETAIL CASH MEMO (कैश मेमो)"}
                  </span>
                  <div className="invoice-meta-pair">
                    <strong>Invoice No:</strong> <span>{printModalInvoice.invoiceNo}</span>
                  </div>
                  <div className="invoice-meta-pair">
                    <strong>Date:</strong> <span>{printModalInvoice.date}</span>
                  </div>
                  <div className="invoice-meta-pair">
                    <strong>Payment:</strong> <span style={{ textTransform: "uppercase" }}>{printModalInvoice.paymentMode} ({printModalInvoice.paymentStatus})</span>
                  </div>
                </div>
              </div>

              <div className="paper-thick-line" />

              {/* Billed To */}
              <div className="paper-billed-to-grid">
                <div className="billed-party-col">
                  <span className="paper-sec-label">BILLED TO (ग्राहक विवरण):</span>
                  <h4 className="billed-customer-name">{printModalInvoice.customerName}</h4>
                  <p><strong>Phone:</strong> {printModalInvoice.customerPhone}</p>
                </div>
                <div className="billed-vehicle-col">
                  <span className="paper-sec-label">VEHICLE DETAILS (गाड़ी विवरण):</span>
                  <p><strong>Vehicle Model:</strong> {printModalInvoice.vehicleName || "—"}</p>
                  <p><strong>Reg. Number:</strong> {printModalInvoice.vehicleNumber || "—"}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="paper-items-table">
                <thead>
                  <tr>
                    <th style={{ width: "8%" }}>#</th>
                    <th style={{ width: "52%" }}>Item Description / Service</th>
                    <th style={{ width: "12%" }}>Qty</th>
                    <th style={{ width: "14%" }}>Rate (₹)</th>
                    <th style={{ width: "14%", textAlign: "right" }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {printModalInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong>{it.name}</strong>
                        <span className="paper-type-sub">({it.type.toUpperCase()})</span>
                      </td>
                      <td>{it.qty}</td>
                      <td>₹{it.rate}</td>
                      <td style={{ textAlign: "right" }}>₹{it.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Calculations Bottom */}
              <div className="paper-totals-layout">
                <div className="paper-notes-col">
                  <span className="paper-sec-label">TERMS & CONDITIONS:</span>
                  <ul className="paper-terms-list">
                    <li>{printModalInvoice.notes || "Goods once sold cannot be returned without warranty card."}</li>
                    <li>Tyre warranty is subject to manufacturer terms and conditions.</li>
                    <li>Free wheel checkup & air pressure inspection for 3 months.</li>
                  </ul>
                </div>

                <div className="paper-amounts-col">
                  <div className="paper-amt-row">
                    <span>Subtotal:</span>
                    <strong>₹{printModalInvoice.subtotal}</strong>
                  </div>
                  {printModalInvoice.discount > 0 && (
                    <div className="paper-amt-row">
                      <span>Discount:</span>
                      <strong>-₹{printModalInvoice.discount}</strong>
                    </div>
                  )}
                  {printModalInvoice.taxAmount > 0 && (
                    <div className="paper-amt-row">
                      <span>GST ({printModalInvoice.taxType === "gst18" ? "18%" : "28%"}):</span>
                      <strong>+₹{printModalInvoice.taxAmount}</strong>
                    </div>
                  )}
                  <div className="paper-grand-total-box">
                    <span>GRAND TOTAL:</span>
                    <span className="paper-grand-amt">₹{printModalInvoice.grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Footer Signatures */}
              <div className="paper-footer-signatures">
                <div className="sign-col">
                  <div className="sign-line" />
                  <span>Customer Signature</span>
                </div>
                <div className="sign-col" style={{ textAlign: "right" }}>
                  <div className="sign-line" />
                  <span>Authorized Signature & Shop Stamp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          STYLES & PRINT RULES
      ══════════════════════════════════════════════════════════════════ */}
      <style>{`
        .billing-page-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .billing-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 800px) {
          .billing-header-row { flex-direction: column; }
        }
        .billing-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .billing-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .billing-nav-pills {
          display: flex;
          gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 4px;
          border-radius: 10px;
        }
        .pill-btn {
          background: none;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          color: var(--text-muted);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }
        .pill-btn-active {
          background: #c0392b;
          color: white;
        }

        .billing-success-alert {
          background: #eafaf1;
          border: 1.5px solid #2ecc71;
          color: #27ae60;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        /* Workspace Grid */
        .billing-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1050px) {
          .billing-workspace-grid { grid-template-columns: 1fr; }
        }

        /* Form Sub Cards */
        .billing-form-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-sub-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .card-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .card-section-title {
          font-size: 15px;
          font-weight: 800;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .card-section-title span {
          background: #c0392b;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }
        .quick-add-actions {
          display: flex;
          gap: 6px;
        }
        .btn-quick-add {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-quick-add:hover {
          background: var(--border);
        }

        .presets-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 14px;
          padding: 8px 12px;
          background: var(--bg);
          border-radius: 8px;
          border: 1px dashed var(--border);
        }
        .preset-label {
          font-size: 11.5px;
          font-weight: 700;
          color: #c0392b;
        }
        .preset-chip {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 11.5px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
        .preset-chip:hover {
          background: #fdedec;
          border-color: #c0392b;
          color: #c0392b;
        }

        /* Form Grids */
        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 700px) {
          .form-grid-3, .form-grid-2 { grid-template-columns: 1fr; }
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-input-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-with-icon svg {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .input-with-icon input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .input-with-icon input:focus,
        .form-input-group input:focus,
        .form-input-group select:focus {
          border-color: #c0392b;
        }
        .form-input-group input,
        .form-input-group select {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }

        .payment-status-toggle {
          display: flex;
          gap: 8px;
        }
        .status-toggle-btn {
          flex: 1;
          padding: 10px 8px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg);
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
          cursor: pointer;
        }
        .status-paid-active {
          background: #eafaf1;
          border-color: #2ecc71;
          color: #27ae60;
        }
        .status-pending-active {
          background: #fef9e7;
          border-color: #f39c12;
          color: #d35400;
        }

        /* Items Entry Table */
        .items-table-wrapper {
          overflow-x: auto;
          margin-bottom: 12px;
        }
        .items-entry-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .items-entry-table th {
          background: var(--surface-2);
          padding: 8px 10px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .items-entry-table td {
          padding: 8px 6px;
          border-bottom: 1px solid var(--border);
        }
        .item-name-input {
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
        }
        .item-type-select {
          width: 100%;
          padding: 8px 4px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 12px;
        }
        .item-qty-input,
        .item-rate-input {
          width: 100%;
          padding: 8px 6px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
          text-align: right;
        }
        .item-amount-col {
          font-weight: 800;
          color: #c0392b;
          text-align: right;
          padding-right: 10px;
        }
        .btn-remove-row {
          background: none;
          border: none;
          color: #c0392b;
          cursor: pointer;
          padding: 4px;
        }
        .btn-add-row-full {
          width: 100%;
          background: var(--surface-2);
          border: 1.5px dashed var(--border);
          color: var(--text);
          padding: 9px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-add-row-full:hover {
          background: var(--border);
        }

        .billing-action-buttons {
          display: flex;
          gap: 14px;
          margin-top: 10px;
        }
        .btn-reset-bill {
          flex: 1;
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-generate-bill {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }
        .btn-generate-bill:hover {
          background: #a93226;
        }

        /* Live Receipt Sidebar */
        .live-receipt-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          position: sticky;
          top: 80px;
        }
        .receipt-top-brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .brand-badge {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          letter-spacing: 0.5px;
        }
        .receipt-inv-num {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .receipt-shop-meta h3 {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 2px;
          color: var(--text);
        }
        .receipt-shop-meta p {
          font-size: 11.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .receipt-shop-meta small {
          font-size: 11px;
          color: var(--text-muted);
        }
        .receipt-divider {
          height: 1px;
          background: var(--border);
          margin: 12px 0;
        }
        .receipt-customer-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12.5px;
        }
        .meta-lbl {
          color: var(--text-muted);
          display: inline-block;
          width: 70px;
        }
        .receipt-items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 180px;
          overflow-y: auto;
        }
        .receipt-item-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 12.5px;
        }
        .it-left {
          display: flex;
          flex-direction: column;
          max-width: 75%;
        }
        .it-name {
          font-weight: 600;
          color: var(--text);
        }
        .it-qty {
          color: var(--text-muted);
          font-size: 11px;
        }
        .it-amt {
          font-weight: 700;
          color: var(--text);
        }
        .receipt-calc-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
        }
        .discount-row { color: #27ae60; font-weight: 600; }
        .tax-row { color: #8e44ad; font-weight: 600; }
        .grand-total-row {
          border-top: 1.5px dashed var(--border);
          padding-top: 8px;
          margin-top: 4px;
          font-weight: 800;
          font-size: 16px;
          color: var(--text);
        }
        .grand-amount {
          color: #c0392b;
          font-size: 18px;
        }
        .receipt-payment-tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          margin: 12px 0 16px;
        }
        .badge-paid {
          background: #eafaf1;
          color: #27ae60;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .badge-pending {
          background: #fef9e7;
          color: #d35400;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .receipt-actions-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .btn-print-preview {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-whatsapp-share {
          background: #25D366;
          color: white;
          text-decoration: none;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-align: center;
        }

        /* History Tab Styles */
        .billing-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .billing-stats-grid { grid-template-columns: 1fr; }
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stat-label {
          font-size: 12px;
          color: var(--text-muted);
          display: block;
        }
        .stat-value {
          font-size: 20px;
          font-weight: 800;
          margin: 2px 0 0;
          color: var(--text);
        }

        .history-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .history-search-input {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 260px;
        }
        .history-search-input svg {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .history-search-input input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 13.5px;
        }
        .history-filter-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .hist-filter {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
        }
        .hist-active {
          background: #c0392b;
          color: white;
          border-color: #c0392b;
        }

        /* History Table Card */
        .invoices-table-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
        }
        .invoices-history-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .invoices-history-table th {
          background: var(--surface-2);
          padding: 12px 14px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .invoices-history-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .cell-subtext {
          display: block;
          color: var(--text-muted);
          font-size: 11px;
        }
        .customer-name-bold {
          display: block;
          font-weight: 700;
          color: var(--text);
        }
        .customer-phone-link {
          font-size: 11.5px;
          color: #c0392b;
          text-decoration: none;
          font-weight: 600;
        }
        .vehicle-no-badge {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .items-count-tag {
          font-weight: 700;
          color: var(--text);
        }
        .items-summary-preview {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .table-grand-total {
          font-size: 14.5px;
          color: #c0392b;
          display: block;
        }
        .discount-tag {
          font-size: 10.5px;
          color: #27ae60;
          font-weight: 700;
        }
        .status-pill {
          display: inline-block;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 700;
        }
        .pill-paid { background: #eafaf1; color: #27ae60; }
        .pill-pending { background: #fef9e7; color: #d35400; }
        .pay-mode-text {
          display: block;
          font-size: 10.5px;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .table-actions-cell {
          display: flex;
          gap: 6px;
        }
        .btn-tbl-print {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-tbl-wa {
          background: #25D366;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Printable Modal */
        .print-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }
        .print-modal-box {
          background: white;
          border-radius: 12px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .print-modal-controls {
          background: #2c3e50;
          color: white;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .print-modal-controls h3 {
          margin: 0;
          font-size: 15px;
        }
        .print-controls-right {
          display: flex;
          gap: 10px;
        }
        .btn-do-print {
          background: #c0392b;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-close-modal {
          background: rgba(255,255,255,0.15);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
        }

        /* Paper Sheet Layout */
        .invoice-paper-sheet {
          padding: 36px 40px;
          color: #1c1c1e;
          background: white;
          font-family: 'Inter', sans-serif;
          overflow-y: auto;
        }
        .paper-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .paper-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .paper-logo {
          height: 54px;
          object-fit: contain;
        }
        .paper-shop-name {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 2px;
          color: #c0392b;
        }
        .paper-shop-tag {
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin: 0;
        }
        .paper-shop-info {
          font-size: 11px;
          color: #777;
          margin: 0;
        }
        .paper-header-right {
          text-align: right;
          font-size: 12.5px;
        }
        .invoice-badge-title {
          display: inline-block;
          background: #2c3e50;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 800;
          font-size: 12px;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
        }
        .invoice-meta-pair {
          margin-bottom: 2px;
        }
        .paper-thick-line {
          height: 2px;
          background: #c0392b;
          margin: 16px 0;
        }
        .paper-billed-to-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .paper-sec-label {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          display: block;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }
        .billed-customer-name {
          font-size: 15px;
          font-weight: 800;
          margin: 0 0 4px;
        }
        .paper-billed-to-grid p {
          margin: 2px 0;
          color: #444;
        }
        .paper-items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 13px;
        }
        .paper-items-table th {
          background: #f4f6f7;
          border: 1px solid #ddd;
          padding: 8px 10px;
          font-weight: 700;
          text-align: left;
        }
        .paper-items-table td {
          border: 1px solid #ddd;
          padding: 9px 10px;
        }
        .paper-type-sub {
          font-size: 11px;
          color: #777;
          margin-left: 6px;
        }
        .paper-totals-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 24px;
          margin-bottom: 30px;
        }
        .paper-terms-list {
          padding-left: 18px;
          margin: 0;
          font-size: 11px;
          color: #666;
          line-height: 1.4;
        }
        .paper-amounts-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13px;
        }
        .paper-amt-row {
          display: flex;
          justify-content: space-between;
          color: #444;
        }
        .paper-grand-total-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #2c3e50;
          padding-top: 8px;
          margin-top: 4px;
          font-weight: 800;
          font-size: 15px;
        }
        .paper-grand-amt {
          color: #c0392b;
          font-size: 20px;
        }
        .paper-footer-signatures {
          display: flex;
          justify-content: space-between;
          padding-top: 30px;
          margin-top: 20px;
        }
        .sign-col {
          font-size: 11.5px;
          font-weight: 700;
          color: #555;
        }
        .sign-line {
          width: 180px;
          height: 1px;
          background: #999;
          margin-bottom: 6px;
        }

        /* 🖨️ Native Browser Print Rules */
        @media print {
          body * {
            visibility: hidden;
          }
          .no-print,
          .main-site-header,
          .bottom-nav,
          .mobile-sidebar {
            display: none !important;
          }
          .print-modal-overlay {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            background: white !important;
          }
          .print-modal-box {
            box-shadow: none;
            max-width: 100%;
            border-radius: 0;
          }
          #printable-invoice,
          #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
