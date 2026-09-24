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
import { exportInvoicesToExcel } from "../utils/excelExport";
import { triggerHaptic, showNativeToast, shareNativeContent } from "../utils/nativeBridge.js";

const INITIAL_DEMO_INVOICES = [];

const PRESET_SERVICES = [
  { name: "Tubeless Puncture Repair (पंचर रिपेयर)", rate: 200, type: "service" },
  { name: "Tyre Cut & Sidewall Repair (कट रिपेयर)", rate: 3000, type: "service" },
  { name: "New Tyre Fitting (टायर फिटिंग)", rate: 150, type: "service" },
  { name: "Doorstep Emergency Assistance (घर/रास्ते पर)", rate: 499, type: "service" },
  { name: "Tube Replacement / Valve Pin (ट्यूब/वॉल्व)", rate: 90, type: "service" },
  { name: "Tyre Rotation & Inspection (रोटेशन)", rate: 200, type: "service" },
];

// Helper to generate sequential invoice numbers starting from 01 (e.g. TS-INV-01, TS-INV-02) per shop
export const generateNextInvoiceNo = (existingList = [], prefix = "TS-INV-") => {
  let highest = 0;
  if (Array.isArray(existingList)) {
    existingList.forEach((inv) => {
      if (inv && inv.invoiceNo) {
        const match = String(inv.invoiceNo).match(/(\d+)$/);
        if (match) {
          const val = parseInt(match[1], 10);
          if (!isNaN(val) && val > highest) {
            highest = val;
          }
        }
      }
    });
  }
  const next = highest + 1;
  const formatted = next < 10 ? `0${next}` : String(next);
  return `${prefix}${formatted}`;
};

// Helper to determine the dedicated storage key per shop/vendor
export const getShopInvoiceStorageKey = (user, profile) => {
  if (user?.uid) return `tyresaathi_invoices_vendor_${user.uid}`;
  if (profile?.shopName && profile.shopName.trim() && profile.shopName !== "TyreSaathi Partner Hub") {
    return `tyresaathi_invoices_shop_${profile.shopName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  }
  return "tyresaathi_invoices_default";
};

export default function Billing() {
  const { user, profile, isVendor } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("create"); // 'create' or 'history'

  // Load shop-specific invoices from dedicated shop storage
  const [invoices, setInvoices] = useState(() => {
    try {
      const key = getShopInvoiceStorageKey(user, profile);
      const local = localStorage.getItem(key);
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPayment, setFilterPayment] = useState("all");

  const [presetServices, setPresetServices] = useState(() => {
    try {
      const local = localStorage.getItem("tyresaathi_custom_rates");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((s) => s.active !== false && s.status !== "inactive");
        }
      }
    } catch {
      // fallback
    }
    return PRESET_SERVICES;
  });

  // Load and synchronize shop-specific invoices when shop/user profile changes
  useEffect(() => {
    const key = getShopInvoiceStorageKey(user, profile);
    let currentShopList = [];
    try {
      const local = localStorage.getItem(key);
      if (local) {
        currentShopList = JSON.parse(local);
        setInvoices(currentShopList);
      } else {
        setInvoices([]);
      }
    } catch (e) {
      console.warn("Could not read shop local invoices:", e);
    }

    // Auto-update active form invoice number and shop details for the current shop
    setInvoice((prev) => ({
      ...prev,
      invoiceNo: generateNextInvoiceNo(currentShopList),
      shopName: profile?.shopName || prev.shopName || "TyreSaathi Partner Hub",
      shopPhone: profile?.phone || prev.shopPhone || "",
      shopAddress: profile?.address || prev.shopAddress || "Verified TyreSaathi Network",
    }));

    // Also fetch cloud invoices for this specific shop/vendor from Firestore
    const fetchShopCloudInvoices = async () => {
      if (!user?.uid) return;
      try {
        const q = query(
          collection(db, "invoices"),
          where("vendorId", "==", user.uid)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const cloudList = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          cloudList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setInvoices(cloudList);
          try {
            localStorage.setItem(key, JSON.stringify(cloudList));
          } catch {}
          setInvoice((prev) => ({
            ...prev,
            invoiceNo: generateNextInvoiceNo(cloudList),
          }));
        }
      } catch (err) {
        console.warn("Firestore shop invoices query fallback:", err);
      }
    };

    fetchShopCloudInvoices();
  }, [user?.uid, profile?.shopName, profile?.phone, profile?.address]);

  // Keep preset services synced with Admin Panel updates in real time
  useEffect(() => {
    const syncServices = () => {
      try {
        const local = localStorage.getItem("tyresaathi_custom_rates");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPresetServices(parsed.filter((s) => s.active !== false && s.status !== "inactive"));
          }
        }
      } catch (e) {
        console.warn("Could not parse updated rates:", e);
      }
    };

    window.addEventListener("tyresaathi_rates_updated", syncServices);
    window.addEventListener("storage", syncServices);

    // Also fetch live service categories from Firestore
    const fetchCloudCategories = async () => {
      try {
        const snap = await getDocs(collection(db, "service_categories"));
        if (!snap.empty) {
          const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          const activeList = list.filter((s) => s.active !== false && s.status !== "inactive");
          if (activeList.length > 0) {
            setPresetServices(activeList);
            localStorage.setItem("tyresaathi_custom_rates", JSON.stringify(list));
          }
        }
      } catch (err) {
        console.warn("Firestore service sync note (using local state):", err);
      }
    };
    fetchCloudCategories();

    return () => {
      window.removeEventListener("tyresaathi_rates_updated", syncServices);
      window.removeEventListener("storage", syncServices);
    };
  }, []);

  // Keep dedicated localStorage in sync with this shop's invoices list
  useEffect(() => {
    try {
      const key = getShopInvoiceStorageKey(user, profile);
      localStorage.setItem(key, JSON.stringify(invoices));
    } catch (e) {
      console.warn("Could not save to shop localStorage", e);
    }
  }, [invoices, user?.uid, profile?.shopName]);

  // Active Invoice Form State - starts cleanly with TS-INV-01 for this specific shop
  const [invoice, setInvoice] = useState(() => {
    let savedList = [];
    try {
      const key = getShopInvoiceStorageKey(user, profile);
      const local = localStorage.getItem(key);
      if (local) savedList = JSON.parse(local);
    } catch {
      savedList = [];
    }

    return {
      invoiceNo: generateNextInvoiceNo(savedList),
      date: new Date().toISOString().split("T")[0],
      customerName: searchParams.get("customer") || "",
      customerPhone: searchParams.get("phone") || "",
      vehicleName: searchParams.get("vehicle") || "",
      vehicleNumber: searchParams.get("vehicleNo") || "",
      shopName: profile?.shopName || "TyreSaathi Partner Hub",
      shopPhone: profile?.phone || "",
      shopAddress: profile?.address || "Verified TyreSaathi Network",
      items: [
        {
          id: "1",
          name: searchParams.get("service") || "",
          tyreSize: "",
          serialNo: "",
          type: "tyre",
          qty: 1,
          rate: 0,
          amount: 0
        }
      ],
      subtotal: 0,
      discount: 0,
      taxType: "none", // 'none', 'gst18', 'gst28'
      taxAmount: 0,
      grandTotal: 0,
      paymentMode: "cash",
      paymentStatus: "paid",
      notes: "Warranty as per company terms. Free checkup on next visit.",
    };
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
    triggerHaptic("light");
    const newItem = {
      id: Date.now().toString(),
      name: type === "service" ? "Puncture Repair / Tyre Fitting" : "",
      tyreSize: "",
      serialNo: "",
      type,
      qty: 1,
      rate: type === "service" ? 150 : 0,
      amount: type === "service" ? 150 : 0,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  // Add Preset Service directly
  const addPresetService = (svc) => {
    triggerHaptic("light");
    const newItem = {
      id: Date.now().toString(),
      name: svc.name,
      tyreSize: "",
      serialNo: "",
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
    triggerHaptic("warning");
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
    const key = getShopInvoiceStorageKey(user, profile);
    const invoiceRecord = {
      ...invoice,
      id: invoice.invoiceNo,
      vendorId: user?.uid || null,
      shopKey: key,
      shopName: profile?.shopName || invoice.shopName || "TyreSaathi Partner Hub",
      shopPhone: profile?.phone || invoice.shopPhone || "",
      shopAddress: profile?.address || invoice.shopAddress || "Verified TyreSaathi Network",
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

    const updatedList = [invoiceRecord, ...invoices];
    setInvoices(updatedList);
    try {
      localStorage.setItem(key, JSON.stringify(updatedList));
    } catch (err) {}

    setLoading(false);
    setSavedSuccess(true);
    triggerHaptic("success");
    showNativeToast(`Bill #${invoiceRecord.invoiceNo} saved successfully!`);
    setTimeout(() => setSavedSuccess(false), 4000);

    // Open print preview modal automatically
    setPrintModalInvoice(invoiceRecord);
  };

  // Reset Form for Next Bill
  const handleResetForm = () => {
    setInvoice({
      invoiceNo: generateNextInvoiceNo(invoices),
      date: new Date().toISOString().split("T")[0],
      customerName: "",
      customerPhone: "",
      vehicleName: "",
      vehicleNumber: "",
      shopName: profile?.shopName || "TyreSaathi Partner Hub",
      shopPhone: profile?.phone || "",
      shopAddress: profile?.address || "Verified TyreSaathi Network",
      items: [
        { id: Date.now().toString(), name: "", tyreSize: "", serialNo: "", type: "tyre", qty: 1, rate: 0, amount: 0 }
      ],
      subtotal: 0,
      discount: 0,
      taxType: "none",
      taxAmount: 0,
      grandTotal: 0,
      paymentMode: "cash",
      paymentStatus: "paid",
      notes: "Warranty as per company terms. Free checkup on next visit.",
    });
  };

  // Generate WhatsApp Message Link
  const getWhatsAppShareUrl = (inv) => {
    const itemsList = (inv.items || [])
      .map((it, idx) => {
        let line = `${idx + 1}. *${it.name}* (x${it.qty}) - ₹${it.amount}`;
        const tags = [];
        if (it.tyreSize) tags.push(`🛞 Size: ${it.tyreSize}`);
        if (it.serialNo) tags.push(`🔢 DOT/Serial: ${it.serialNo}`);
        if (tags.length > 0) {
          line += `\n   ↳ ${tags.join(" | ")}`;
        }
        return line;
      })
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
            <h1 className="billing-title" style={{ margin: 0 }}>
              <Receipt size={26} color="#c0392b" /> Tyre & Service Billing (दुकान बिलिंग)
            </h1>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              fontWeight: 700,
              background: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe"
            }}>
              🏪 {profile?.shopName || "Individual Shop"} • 🆔 Series: #TS-INV-01 se shuru
            </span>
          </div>
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
                  <span>1</span> Dukan, Grahak Aur Gaadi Ki Details (Shop & Customer Info)
                </div>

                <div className="form-grid-3" style={{ marginBottom: "14px" }}>
                  <div className="form-input-group">
                    <label>Bill / Invoice No. (बिल नंबर) *</label>
                    <div className="input-with-icon">
                      <Receipt size={15} />
                      <input
                        type="text"
                        placeholder="TS-INV-01"
                        value={invoice.invoiceNo}
                        onChange={(e) => setInvoice({ ...invoice, invoiceNo: e.target.value.toUpperCase() })}
                        style={{ fontFamily: "monospace", fontWeight: 700 }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label>Shop / Business Name (दुकान का नाम) *</label>
                    <input
                      type="text"
                      placeholder="e.g. ABC Tyre & Service Center"
                      value={invoice.shopName}
                      onChange={(e) => setInvoice({ ...invoice, shopName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-input-group">
                    <label>Invoice Date (तारीख)</label>
                    <input
                      type="date"
                      value={invoice.date}
                      onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-input-group">
                    <label>Customer Name (ग्राहक का नाम) *</label>
                    <div className="input-with-icon">
                      <User size={15} />
                      <input
                        type="text"
                        placeholder="e.g. Your Name"
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
                        placeholder="10 digit mobile number"
                        value={invoice.customerPhone}
                        onChange={(e) => setInvoice({ ...invoice, customerPhone: e.target.value })}
                        required
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
                        placeholder="e.g. Swift Dzire / Creta / Activa"
                        value={invoice.vehicleName}
                        onChange={(e) => setInvoice({ ...invoice, vehicleName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-input-group">
                    <label>Vehicle Registration No. (गाड़ी नंबर)</label>
                    <input
                      type="text"
                      placeholder="e.g. DL 01 AB 1234 / KA 05 MN 4589"
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
                  {presetServices.map((svc, i) => (
                    <button
                      key={svc.id || i}
                      type="button"
                      className="preset-chip"
                      onClick={() => addPresetService(svc)}
                      title={svc.category ? `Category: ${svc.category}` : undefined}
                    >
                      {svc.icon ? `${svc.icon} ` : "+ "}
                      {svc.name.includes("(") ? svc.name.split("(")[0].trim() : svc.name} (₹{Number(svc.rate || 0).toLocaleString("en-IN")})
                    </button>
                  ))}
                </div>

                {/* Items Table */}
                <datalist id="tyre-sizes-list">
                  <option value="145/80 R12" label="Alto / WagonR" />
                  <option value="155/80 R13" label="Santro / Eon" />
                  <option value="165/80 R14" label="Swift / Dzire" />
                  <option value="175/65 R14" label="Tiago / i10 / Amaze" />
                  <option value="185/65 R15" label="Baleno / Swift / Ertiga" />
                  <option value="195/65 R15" label="City / Corolla / Civic" />
                  <option value="195/55 R16" label="i20 / Baleno Top" />
                  <option value="205/60 R16" label="Brezza / EcoSport" />
                  <option value="215/60 R16" label="Creta / Seltos" />
                  <option value="215/65 R16" label="Duster / Harrier" />
                  <option value="235/65 R17" label="Scorpio / XUV500" />
                  <option value="265/65 R17" label="Fortuner / Endeavour" />
                  <option value="90/90-12" label="Activa / Jupiter Front" />
                  <option value="90/100-10" label="Pleasure / Scooty" />
                  <option value="2.75-17" label="Splendor / HF Deluxe" />
                  <option value="3.00-17" label="Shine / Passion" />
                  <option value="100/90-17" label="Pulsar / Apache Rear" />
                  <option value="140/60 R17" label="FZ / Duke Rear" />
                  <option value="10.00-20" label="Commercial Truck / Bus" />
                  <option value="295/90 R20" label="Heavy Truck Radial" />
                  <option value="13.6-28" label="Tractor Rear Tyre" />
                </datalist>

                <div className="items-table-wrapper" style={{ overflowX: "auto" }}>
                  <table className="items-entry-table" style={{ minWidth: "720px" }}>
                    <thead>
                      <tr>
                        <th style={{ width: "26%" }}>Item / Brand (आइटम नाम)</th>
                        <th style={{ width: "20%" }}>🛞 Tyre Size / No. (टायर नंबर)</th>
                        <th style={{ width: "20%" }}>🔢 Serial No. (सीरियल नंबर)</th>
                        <th style={{ width: "10%" }}>Type</th>
                        <th style={{ width: "7%" }}>Qty</th>
                        <th style={{ width: "10%" }}>Rate (₹)</th>
                        <th style={{ width: "10%" }}>Amount (₹)</th>
                        <th style={{ width: "4%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((it, idx) => (
                        <tr key={it.id}>
                          <td>
                            <input
                              type="text"
                              value={it.name}
                              placeholder="उदा: Apollo Amazer / MRF ZVTV"
                              onChange={(e) => handleItemChange(it.id, "name", e.target.value)}
                              className="item-name-input"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              list="tyre-sizes-list"
                              value={it.tyreSize || ""}
                              placeholder=""
                              onChange={(e) => handleItemChange(it.id, "tyreSize", e.target.value)}
                              className="item-size-input"
                              autoComplete="off"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              maxLength={15}
                              value={it.serialNo || ""}
                              placeholder=""
                              onChange={(e) => handleItemChange(it.id, "serialNo", e.target.value.toUpperCase().slice(0, 15))}
                              className="item-serial-input"
                              title="Tyre Serial / DOT No. (Max 15 digits)"
                              autoComplete="off"
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
                      <option value="cash">💵 Cash (नकद)</option>
                      <option value="upi">📱 UPI (GPay / PhonePe / Paytm)</option>
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
                <span className="brand-badge">🧾 RETAIL INVOICE</span>
                <span className="receipt-inv-num">#{invoice.invoiceNo}</span>
              </div>

              <div className="receipt-shop-meta">
                <h3 style={{ color: "#c0392b", fontWeight: 800, fontSize: "16px", margin: "0 0 2px" }}>
                  {invoice.shopName || profile?.shopName || "ABC Tyre & Service Center"}
                </h3>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#c0392b", margin: 0 }}>
                  Authorized TyreSaathi Partner Network
                </p>
                <small style={{ color: "var(--text-muted)", fontSize: "11px" }}>Date: {invoice.date}</small>
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
                      {(it.tyreSize || it.serialNo) && (
                        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", margin: "3px 0" }}>
                          {it.tyreSize && (
                            <span style={{ fontSize: "11px", background: "#eff6ff", color: "#1d4ed8", padding: "1px 6px", borderRadius: "4px", fontWeight: 700 }}>
                              🛞 {it.tyreSize}
                            </span>
                          )}
                          {it.serialNo && (
                            <span style={{ fontSize: "11px", background: "#fef3c7", color: "#b45309", padding: "1px 6px", borderRadius: "4px", fontWeight: 700, fontFamily: "monospace" }}>
                              🔢 #{it.serialNo}
                            </span>
                          )}
                        </div>
                      )}
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

              <button
                type="button"
                className="btn-tbl-wa"
                style={{ background: "#27ae60", cursor: "pointer", border: "none", marginLeft: "6px" }}
                onClick={() => exportInvoicesToExcel(filteredInvoices)}
                title="Download All Filtered Bills in Excel / CSV"
              >
                <Download size={13} /> 📥 Export to Excel
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
                        <span className="items-count-tag">{(inv.items || []).length} Items</span>
                        <small className="items-summary-preview">
                          {(inv.items || []).map((x) => x.name).slice(0, 2).join(", ")}
                          {(inv.items || []).length > 2 ? "..." : ""}
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
                          <button
                            type="button"
                            className="btn-tbl-share"
                            onClick={() => {
                              const itemsSummary = (inv.items || []).map((i) => `${i.name} (x${i.qty})`).join(", ");
                              shareNativeContent({
                                title: `TyreSaathi Invoice #${inv.invoiceNo}`,
                                text: `🧾 TyreSaathi Retail Invoice\nBill No: #${inv.invoiceNo}\nCustomer: ${inv.customerName}\nTotal: ₹${inv.grandTotal}\nItems: ${itemsSummary}\nShop: ${inv.shopName || "TyreSaathi Partner"}`,
                                dialogTitle: "Share Invoice"
                              });
                            }}
                            title="Share Invoice via App / Sheet"
                          >
                            <Share2 size={14} /> Share
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
                  className="btn-do-share"
                  style={{
                    background: "#2563eb",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onClick={() => {
                    const itemsSummary = (printModalInvoice.items || []).map((i) => `${i.name} (x${i.qty})`).join(", ");
                    shareNativeContent({
                      title: `Invoice #${printModalInvoice.invoiceNo} - ${printModalInvoice.shopName}`,
                      text: `🧾 TyreSaathi Invoice #${printModalInvoice.invoiceNo}\nCustomer: ${printModalInvoice.customerName} (${printModalInvoice.vehicleNumber || ""})\nTotal: ₹${printModalInvoice.grandTotal}\nItems: ${itemsSummary}\nShop: ${printModalInvoice.shopName}`,
                      dialogTitle: "Share Invoice Slip"
                    });
                  }}
                >
                  <Share2 size={16} /> Share Slip
                </button>
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
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "30%" }}>Item Description / Brand</th>
                    <th style={{ width: "18%" }}>Tyre Number / Size (साइज)</th>
                    <th style={{ width: "18%" }}>Serial / DOT No. (सीरियल)</th>
                    <th style={{ width: "7%" }}>Qty</th>
                    <th style={{ width: "10%" }}>Rate (₹)</th>
                    <th style={{ width: "12%", textAlign: "right" }}>Amount (₹)</th>
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
                      <td>
                        {it.tyreSize ? <strong style={{ color: "#0f172a" }}>{it.tyreSize}</strong> : <span style={{ color: "#94a3b8" }}>—</span>}
                      </td>
                      <td>
                        {it.serialNo ? <code style={{ fontSize: "11px", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontWeight: "700" }}>{it.serialNo}</code> : <span style={{ color: "#94a3b8" }}>—</span>}
                      </td>
                      <td>{it.qty}</td>
                      <td>₹{it.rate}</td>
                      <td style={{ textAlign: "right", fontWeight: "700" }}>₹{it.amount}</td>
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
          padding: 6px 4px 30px;
        }
        .billing-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 800px) {
          .billing-header-row { flex-direction: column; gap: 10px; }
        }
        .billing-title {
          font-size: 1.25rem; /* text-xl on mobile */
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1.25;
        }
        @media (min-width: 640px) {
          .billing-title { font-size: 1.5rem; }
        }
        .billing-sub {
          font-size: 0.75rem; /* text-xs */
          color: var(--text-muted);
          margin: 0;
          line-height: 1.35;
        }
        .billing-nav-pills {
          display: flex;
          gap: 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 3px;
          border-radius: 8px;
        }
        .pill-btn {
          background: none;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem; /* text-xs */
          color: var(--text-muted);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
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
          padding: 10px 12px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        /* Workspace Grid */
        .billing-workspace-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 16px;
          align-items: start;
        }
        @media (max-width: 1050px) {
          .billing-workspace-grid { grid-template-columns: 1fr; }
        }

        /* Form Sub Cards */
        .billing-form-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .form-sub-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        @media (min-width: 640px) {
          .form-sub-card {
            padding: 18px 20px;
            border-radius: 12px;
          }
        }
        .card-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 6px;
        }
        .card-section-title {
          font-size: 0.95rem; /* text-base or text-sm */
          font-weight: 700;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .card-section-title span {
          background: #c0392b;
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          flex-shrink: 0;
        }
        .quick-add-actions {
          display: flex;
          gap: 4px;
        }
        .btn-quick-add {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-quick-add:hover {
          background: var(--border);
        }

        .presets-bar {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
          margin-bottom: 10px;
          padding: 6px 10px;
          background: var(--bg);
          border-radius: 6px;
          border: 1px dashed var(--border);
        }
        .preset-label {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #c0392b;
        }
        .preset-chip {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 0.6875rem;
          padding: 3px 6px;
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
          gap: 10px;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        @media (max-width: 700px) {
          .form-grid-3, .form-grid-2 { grid-template-columns: 1fr; gap: 8px; }
        }

        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-input-group label {
          font-size: 0.75rem; /* text-xs */
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
          left: 10px;
          color: var(--text-muted);
          pointer-events: none;
          z-index: 1;
          width: 16px;
          height: 16px;
        }
        .input-with-icon input {
          width: 100%;
          padding: 8px 10px 8px 32px !important;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.8125rem;
          outline: none;
        }
        .input-with-icon input:focus,
        .form-input-group input:focus,
        .form-input-group select:focus {
          border-color: #c0392b;
        }
        .form-input-group input,
        .form-input-group select {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.8125rem;
          outline: none;
        }

        .payment-status-toggle {
          display: flex;
          gap: 6px;
        }
        .status-toggle-btn {
          flex: 1;
          padding: 8px 6px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          font-size: 0.75rem; /* text-xs */
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
          margin-bottom: 10px;
        }
        .items-entry-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.75rem;
        }
        .items-entry-table th {
          background: var(--surface-2);
          padding: 6px 8px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          font-size: 0.72rem;
        }
        .items-entry-table td {
          padding: 6px 4px;
          border-bottom: 1px solid var(--border);
        }
        .item-name-input,
        .item-size-input,
        .item-serial-input {
          width: 100%;
          padding: 6px 8px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.78rem;
          font-weight: 600;
          outline: none;
        }
        .item-serial-input {
          font-family: monospace;
          text-transform: uppercase;
        }
        .item-name-input:focus,
        .item-size-input:focus,
        .item-serial-input:focus,
        .item-type-select:focus,
        .item-qty-input:focus,
        .item-rate-input:focus {
          border-color: #c0392b;
          box-shadow: 0 0 0 2px rgba(192, 57, 43, 0.1);
        }
        .item-type-select {
          width: 100%;
          padding: 6px 4px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.72rem;
        }
        .item-qty-input,
        .item-rate-input {
          width: 100%;
          padding: 6px 6px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.75rem;
          text-align: right;
        }
        .item-amount-col {
          font-weight: 800;
          color: #c0392b;
          text-align: right;
          padding-right: 8px;
          font-size: 0.78rem;
        }
        .btn-remove-row {
          background: none;
          border: none;
          color: #c0392b;
          cursor: pointer;
          padding: 3px;
        }
        .btn-add-row-full {
          width: 100%;
          background: var(--surface-2);
          border: 1.5px dashed var(--border);
          color: var(--text);
          padding: 7px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .btn-add-row-full:hover {
          background: var(--border);
        }

        .billing-action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }
        .btn-reset-bill {
          flex: 1;
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
        }
        .btn-generate-bill {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          font-weight: 800;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }
        .btn-generate-bill:hover {
          background: #a93226;
        }

        /* Live Receipt Sidebar */
        .live-receipt-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.05);
          position: sticky;
          top: 80px;
        }
        .receipt-top-brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .brand-badge {
          font-size: 0.6875rem;
          font-weight: 800;
          color: #c0392b;
          letter-spacing: 0.5px;
        }
        .receipt-inv-num {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .receipt-shop-meta h3 {
          font-size: 0.95rem;
          font-weight: 800;
          margin: 0 0 2px;
          color: var(--text);
        }
        .receipt-shop-meta p {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin: 0;
        }
        .receipt-shop-meta small {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }
        .receipt-divider {
          height: 1px;
          background: var(--border);
          margin: 10px 0;
        }
        .receipt-customer-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 0.75rem;
        }
        .meta-lbl {
          color: var(--text-muted);
          display: inline-block;
          width: 65px;
        }
        .receipt-items-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 160px;
          overflow-y: auto;
        }
        .receipt-item-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          font-size: 0.75rem;
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
          font-size: 0.6875rem;
        }
        .it-amt {
          font-weight: 700;
          color: var(--text);
        }
        .receipt-calc-table {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.75rem;
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
          padding-top: 6px;
          margin-top: 2px;
          font-weight: 800;
          font-size: 0.95rem;
          color: var(--text);
        }
        .grand-amount {
          color: #c0392b;
          font-size: 1.15rem;
        }
        .receipt-payment-tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          margin: 10px 0 12px;
        }
        .badge-paid {
          background: #eafaf1;
          color: #27ae60;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }
        .badge-pending {
          background: #fef9e7;
          color: #d35400;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }
        .receipt-actions-grid {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .btn-print-preview {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.78rem;
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
