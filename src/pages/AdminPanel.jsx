import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Users, 
  Store, 
  Calendar, 
  Receipt, 
  LifeBuoy, 
  Download, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Filter, 
  Eye, 
  MessageSquare, 
  Plus, 
  FileSpreadsheet,
  AlertTriangle,
  RefreshCw,
  Megaphone,
  Flame,
  Sparkles,
  Trash2,
  Edit3,
  PlusCircle,
  Phone,
  Power,
  Rocket,
  FileText,
  X,
  Crown,
  Gift,
  Tag,
  Save,
  RotateCcw,
  Lock,
  Building2,
  QrCode,
  CreditCard,
  Copy,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { 
  exportBookingsToExcel, 
  exportInvoicesToExcel, 
  exportUsersToExcel, 
  exportTicketsToExcel 
} from "../utils/excelExport";
import { getGoogleSheetUrl } from "../utils/googleSheets";
import { INITIAL_SHOP_ADS, AD_THEMES } from "../config/shopAdsData";
import { 
  getActiveSubscriptionConfig, 
  saveActiveSubscriptionConfig, 
  DEFAULT_PLAN_SETTINGS 
} from "../config/subscriptionPlans";
import { 
  getAdminBankConfig, 
  saveAdminBankConfig, 
  getUpiQrCodeUrl, 
  DEFAULT_BANK_CONFIG 
} from "../config/paymentConfig";

const SAMPLE_ADMIN_SHOPS = [
  {
    uid: "admin-master-01",
    name: "TyreSaathi Master Admin",
    email: "tyresathi@gmail.com",
    phone: "8877277757",
    role: "admin",
    shopName: "TyreSaathi Central Headquarters",
    shopApproved: true,
    city: "Raipur, Chhattisgarh",
    address: "Transport Nagar, Rawabhatha, Raipur, Chhattisgarh",
    createdAt: "2026-08-01"
  }
];

const SAMPLE_GLOBAL_BOOKINGS = [];
const SAMPLE_ADMIN_INVOICES = [];
const SAMPLE_ADMIN_TICKETS = [];

export function getAdScheduleStatus(ad) {
  if (ad.isActive === false) {
    return { status: "paused", label: "⚪ Paused / Inactive", color: "#64748b" };
  }
  const today = new Date().toISOString().split("T")[0];
  if (ad.startDate && ad.startDate > today) {
    return { status: "scheduled", label: `🟡 Starts on ${ad.startDate}`, color: "#f39c12" };
  }
  if (ad.endDate) {
    if (ad.endDate < today) {
      return { status: "expired", label: `🔴 Expired (${ad.endDate})`, color: "#e74c3c" };
    }
    const diffDays = Math.ceil((new Date(ad.endDate) - new Date(today)) / (1000 * 60 * 60 * 24));
    return { status: "active", label: `🟢 Live (${diffDays}d left)`, color: "#27ae60" };
  }
  return { status: "active", label: "🟢 Live (Permanent)", color: "#27ae60" };
}

const POPULAR_CITIES = [
  "Raipur",
  "Bhilai & Durg",
  "Bilaspur",
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Patna",
  "Muzaffarpur",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Nagpur",
  "Bhopal",
  "Other"
];

export default function AdminPanel() {
  const { user, profile, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview"); // overview, shops, bookings, tickets, ads, excel

  // Admin Datasets State
  const [users, setUsers] = useState(SAMPLE_ADMIN_SHOPS);
  const [bookings, setBookings] = useState(SAMPLE_GLOBAL_BOOKINGS);
  const [invoices, setInvoices] = useState(SAMPLE_ADMIN_INVOICES);
  const [tickets, setTickets] = useState(SAMPLE_ADMIN_TICKETS);

  // Shop Ads State
  const [ads, setAds] = useState(() => {
    try {
      const local = localStorage.getItem("tyresaathi_shop_ads");
      return local ? JSON.parse(local) : INITIAL_SHOP_ADS;
    } catch {
      return INITIAL_SHOP_ADS;
    }
  });
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [editingAdId, setEditingAdId] = useState(null);
  const [adSearchTerm, setAdSearchTerm] = useState("");
  const [adForm, setAdForm] = useState({
    shopName: "",
    tagline: "",
    offerBadge: "🔥 20% OFF + FREE FITMENT",
    description: "",
    phone: "",
    whatsapp: "",
    city: "Raipur",
    customCity: "",
    address: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    gradient: AD_THEMES[0].gradient,
    badgeColor: AD_THEMES[0].badgeColor,
    isActive: true,
    featured: true,
  });

  // Custom Color State
  const [customColor1, setCustomColor1] = useState("#1e3c72");
  const [customColor2, setCustomColor2] = useState("#2a5298");
  const [customBadgeColor, setCustomBadgeColor] = useState("#ff4757");
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);

  const handleCustomColorChange = (c1, c2, badge) => {
    const col1 = c1 !== undefined ? c1 : customColor1;
    const col2 = c2 !== undefined ? c2 : customColor2;
    const bColor = badge !== undefined ? badge : customBadgeColor;
    if (c1 !== undefined) setCustomColor1(c1);
    if (c2 !== undefined) setCustomColor2(c2);
    if (badge !== undefined) setCustomBadgeColor(badge);
    setAdForm((prev) => ({
      ...prev,
      gradient: `linear-gradient(135deg, ${col1} 0%, ${col2} 100%)`,
      badgeColor: bColor,
    }));
  };

  // Search & Filter
  const [searchUser, setSearchUser] = useState("");
  const [replyTicketModal, setReplyTicketModal] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Subscription & Pricing Manager State
  const [subConfig, setSubConfig] = useState(getActiveSubscriptionConfig);
  const [pricingSuccessMsg, setPricingSuccessMsg] = useState("");

  const handleToggleLaunchFreeMode = () => {
    setSubConfig((prev) => ({
      ...prev,
      launchFreeMode: !prev.launchFreeMode
    }));
  };

  const handlePlanPriceChange = (planId, field, value) => {
    setSubConfig((prev) => ({
      ...prev,
      plans: prev.plans.map((p) => (p.id === planId ? { ...p, [field]: value } : p))
    }));
  };

  const handlePlanFeatureChange = (planId, featureIdx, newText) => {
    setSubConfig((prev) => ({
      ...prev,
      plans: prev.plans.map((p) => {
        if (p.id !== planId) return p;
        const newFeatures = [...p.features];
        newFeatures[featureIdx] = newText;
        return { ...p, features: newFeatures };
      })
    }));
  };

  const handleAddPlanFeature = (planId) => {
    setSubConfig((prev) => ({
      ...prev,
      plans: prev.plans.map((p) => {
        if (p.id !== planId) return p;
        return { ...p, features: [...p.features, "✨ Naya feature yahan likhein..."] };
      })
    }));
  };

  const handleRemovePlanFeature = (planId, featureIdx) => {
    setSubConfig((prev) => ({
      ...prev,
      plans: prev.plans.map((p) => {
        if (p.id !== planId) return p;
        return { ...p, features: p.features.filter((_, idx) => idx !== featureIdx) };
      })
    }));
  };

  const handleSaveSubscriptionConfig = async () => {
    const success = saveActiveSubscriptionConfig(subConfig);
    try {
      await setDoc(doc(db, "app_settings", "subscription_plans"), subConfig, { merge: true });
    } catch (e) {
      console.warn("Firestore subscription settings sync:", e);
    }
    if (success) {
      setPricingSuccessMsg("✅ Badhaai ho! Subscription Plans & Prices live update ho gaye hain!");
      setTimeout(() => setPricingSuccessMsg(""), 5000);
    }
  };

  const handleResetSubscriptionConfig = () => {
    if (window.confirm("Kya aap sach me default prices aur plans wapas restore karna chahte hain?")) {
      setSubConfig(DEFAULT_PLAN_SETTINGS);
      saveActiveSubscriptionConfig(DEFAULT_PLAN_SETTINGS);
      setPricingSuccessMsg("↺ Plans wapas default settings par reset kar diye gaye hain.");
      setTimeout(() => setPricingSuccessMsg(""), 5000);
    }
  };

  // Bank Account & UPI Setup State
  const [bankConfig, setBankConfig] = useState(getAdminBankConfig);
  const [bankSuccessMsg, setBankSuccessMsg] = useState("");
  const [adminCopiedKey, setAdminCopiedKey] = useState("");

  const handleAdminCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setAdminCopiedKey(key);
    setTimeout(() => setAdminCopiedKey(""), 3000);
  };

  const handleSaveBankConfig = async (e) => {
    if (e) e.preventDefault();
    if (!bankConfig.upiId?.trim() && !bankConfig.accountNumber?.trim()) {
      alert("Kripya kam se kam apna UPI ID ya Bank Account number zaroor bharein!");
      return;
    }

    const success = saveAdminBankConfig(bankConfig);
    try {
      await setDoc(doc(db, "app_settings", "bank_account_config"), bankConfig, { merge: true });
    } catch (err) {
      console.warn("Firestore bank config sync:", err);
    }

    if (success) {
      setBankSuccessMsg("✅ Badhaai ho! Aapka Bank Account aur UPI ID successfully save ho gaya hai!");
      setTimeout(() => setBankSuccessMsg(""), 5000);
    }
  };

  const handleResetBankConfig = () => {
    if (window.confirm("Kya aap default bank details wapas set karna chahte hain?")) {
      setBankConfig(DEFAULT_BANK_CONFIG);
      saveAdminBankConfig(DEFAULT_BANK_CONFIG);
      setBankSuccessMsg("↺ Default Bank details restore ho gayi hain.");
      setTimeout(() => setBankSuccessMsg(""), 5000);
    }
  };

  // Load Real Data from Firestore if available
  useEffect(() => {
    async function loadAdminData() {
      try {
        const adsSnap = await getDocs(collection(db, "shop_ads"));
        if (!adsSnap.empty) {
          const list = adsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setAds(list);
        }
      } catch (err) {
        console.warn("Firestore ads load:", err);
      }

      try {
        const usersSnap = await getDocs(collection(db, "users"));
        if (!usersSnap.empty) {
          const list = usersSnap.docs.map((d) => ({ uid: d.id, ...d.data() }));
          setUsers(list);
        }
      } catch (err) {
        console.warn("Firestore users load:", err);
      }

      try {
        const tckSnap = await getDocs(collection(db, "support_tickets"));
        if (!tckSnap.empty) {
          setTickets(tckSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        console.warn("Firestore tickets load:", err);
      }

      try {
        const bkgSnap = await getDocs(collection(db, "bookings"));
        if (!bkgSnap.empty) {
          setBookings(bkgSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        console.warn("Firestore bookings load:", err);
      }
    }
    loadAdminData();
  }, []);

  // Delete User / Shop
  const handleDeleteUser = async (uid) => {
    if (window.confirm("Kya aap sach me is user/shop account ko delete karna chahte hain?")) {
      try {
        await deleteDoc(doc(db, "users", uid));
      } catch (e) {
        console.warn("Firestore user delete:", e);
      }
      setUsers((prev) => prev.filter((u) => u.uid !== uid));
    }
  };

  // Toggle Shop Verification Badge
  const handleToggleShopApproval = async (uid) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.uid === uid) {
          const newStatus = !u.shopApproved;
          try {
            updateDoc(doc(db, "users", uid), { shopApproved: newStatus });
          } catch (e) {
            console.warn("Firestore update:", e);
          }
          return { ...u, shopApproved: newStatus };
        }
        return u;
      })
    );
  };

  // Resolve Ticket
  const handleResolveTicket = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: "resolved", adminReply: replyText || "Resolved by TyreSaathi Admin Team." }
          : t
      )
    );
    setReplyTicketModal(null);
    setReplyText("");
  };

  // Toggle Ad Active / Inactive
  const handleToggleAdStatus = (id) => {
    setAds((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a));
      localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete Ad
  const handleDeleteAd = (id) => {
    if (window.confirm("Kya aap sach me is dukan ke ad ko delete karna chahte hain?")) {
      setAds((prev) => {
        const updated = prev.filter((a) => a.id !== id);
        localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Open Create Ad Modal
  const handleOpenCreateAd = () => {
    setEditingAdId(null);
    const today = new Date().toISOString().split("T")[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    setAdForm({
      shopName: "",
      tagline: "",
      offerBadge: "🔥 20% OFF + FREE FITMENT",
      description: "",
      phone: "",
      whatsapp: "",
      city: "Raipur",
      customCity: "",
      address: "",
      startDate: today,
      endDate: nextWeek,
      gradient: AD_THEMES[0].gradient,
      badgeColor: AD_THEMES[0].badgeColor,
      isActive: true,
      featured: true,
    });
    setShowCustomColorPicker(false);
    setAdModalOpen(true);
  };

  // Open Edit Ad Modal
  const handleOpenEditAd = (ad) => {
    setEditingAdId(ad.id);
    const today = new Date().toISOString().split("T")[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const isPreset = AD_THEMES.some((t) => t.gradient === ad.gradient);
    const isCityInList = POPULAR_CITIES.includes(ad.city);
    setShowCustomColorPicker(!isPreset);
    setAdForm({
      shopName: ad.shopName || "",
      tagline: ad.tagline || "",
      offerBadge: ad.offerBadge || "🔥 20% OFF",
      description: ad.description || "",
      phone: ad.phone || "",
      whatsapp: ad.whatsapp || "",
      city: isCityInList ? (ad.city || "Raipur") : "Other",
      customCity: !isCityInList ? (ad.city || "") : "",
      address: ad.address || "",
      startDate: ad.startDate || today,
      endDate: ad.endDate || (ad.endDate === "" ? "" : nextWeek),
      gradient: ad.gradient || AD_THEMES[0].gradient,
      badgeColor: ad.badgeColor || AD_THEMES[0].badgeColor,
      isActive: ad.isActive !== false,
      featured: ad.featured || false,
    });
    setAdModalOpen(true);
  };

  // Quick Preset Helper for Ad Duration
  const setAdDurationPreset = (days) => {
    const start = adForm.startDate || new Date().toISOString().split("T")[0];
    if (days === null) {
      setAdForm((prev) => ({ ...prev, startDate: start, endDate: "" }));
    } else {
      const end = new Date(new Date(start).getTime() + days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      setAdForm((prev) => ({ ...prev, startDate: start, endDate: end }));
    }
  };

  // Save Ad (Publish Live or Save as Draft)
  const handleSaveAd = (e, asDraft = false) => {
    if (e) e.preventDefault();
    if (!adForm.shopName.trim() || !adForm.tagline.trim()) {
      alert("Kripya Shop Name aur Offer Tagline zaroor bharein!");
      return;
    }

    const finalCity = adForm.city === "Other" 
      ? (adForm.customCity.trim() || "Local") 
      : adForm.city;

    const payload = {
      ...adForm,
      city: finalCity,
      isActive: asDraft ? false : true,
    };

    if (editingAdId) {
      setAds((prev) => {
        const updated = prev.map((a) => (a.id === editingAdId ? { ...a, ...payload } : a));
        localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
        return updated;
      });
    } else {
      const newAdItem = {
        id: `ad-${Date.now()}`,
        ...payload,
        views: 0,
        clicks: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setAds((prev) => {
        const updated = [newAdItem, ...prev];
        localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
        return updated;
      });
    }

    setAdModalOpen(false);
  };

  // Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
  const totalShops = users.filter((u) => u.role === "vendor" || u.role === "admin").length;
  const pendingApprovals = users.filter((u) => u.role === "vendor" && !u.shopApproved).length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const activeAdsCount = ads.filter((a) => a.isActive !== false).length;

  const filteredAds = ads.filter((a) => {
    if (!adSearchTerm.trim()) return true;
    const term = adSearchTerm.toLowerCase();
    return (
      a.shopName?.toLowerCase().includes(term) ||
      a.city?.toLowerCase().includes(term) ||
      a.offerBadge?.toLowerCase().includes(term)
    );
  });

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: "560px", margin: "60px auto", padding: "40px 24px", textAlign: "center", background: "var(--surface, #fff)", borderRadius: "16px", border: "1px solid var(--border, #eee)", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fdedec", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <ShieldCheck size={36} color="#c0392b" />
        </div>
        <h2 style={{ color: "#c0392b", margin: "0 0 10px", fontSize: "22px" }}>Access Restricted / अनधिकृत प्रवेश</h2>
        <p style={{ color: "var(--text-muted, #64748b)", fontSize: "14px", lineHeight: "1.6", margin: "0 0 20px" }}>
          Ye Master Admin Panel sirf authorized super admin email (<strong>tyresathi@gmail.com</strong>) ke liye reserved hai.
        </p>
        <Link to="/" style={{ display: "inline-block", background: "#c0392b", color: "#fff", padding: "10px 22px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13.5px" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {/* 🌟 Top Admin Header */}
      <div className="admin-header-row">
        <div>
          <div className="admin-badge-strip">
            <ShieldCheck size={16} color="#c0392b" />
            <span>TYRESAATHI MASTER ADMIN SUITE</span>
          </div>
          <h1 className="admin-page-title">Platform Administration & Analytics (एडमिन पैनल)</h1>
          <p className="admin-page-sub">
            Desh bhar ki shops, customers, bookings, billing, ads aur support tickets ko ek hi dashboard se control karein.
          </p>
        </div>

        {/* Excel Export Quick Trigger */}
        <div className="admin-header-actions">
          <button
            className="btn-excel-top-action"
            onClick={() => setActiveTab("excel")}
          >
            <FileSpreadsheet size={16} /> 📊 Excel Data Center
          </button>
        </div>
      </div>

      {/* 🧭 Admin Navigation Tabs */}
      <div className="admin-nav-tabs">
        <button
          className={`admin-tab ${activeTab === "overview" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <TrendingUp size={16} /> Overview
        </button>

        <button
          className={`admin-tab ${activeTab === "ads" ? "tab-active tab-ads-active" : ""}`}
          onClick={() => setActiveTab("ads")}
        >
          <Megaphone size={16} /> 📢 Shop Ads Manager ({ads.length})
          <span className="tab-bubble" style={{ background: "#27ae60" }}>{activeAdsCount} Active</span>
        </button>

        <button
          className={`admin-tab ${activeTab === "shops" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("shops")}
        >
          <Store size={16} /> Shops & Users ({users.length})
          {pendingApprovals > 0 && <span className="tab-bubble">{pendingApprovals} Pending</span>}
        </button>

        <button
          className={`admin-tab ${activeTab === "pricing" ? "tab-active tab-pricing-active" : ""}`}
          onClick={() => setActiveTab("pricing")}
        >
          <Crown size={16} /> 👑 Plans & Pricing Control
          {subConfig.launchFreeMode ? (
            <span className="tab-bubble" style={{ background: "#27ae60" }}>🚀 Free Launch Active</span>
          ) : (
            <span className="tab-bubble" style={{ background: "#c0392b" }}>💰 Paid Mode</span>
          )}
        </button>

        <button
          className={`admin-tab ${activeTab === "bank" ? "tab-active tab-bank-active" : ""}`}
          onClick={() => setActiveTab("bank")}
        >
          <Building2 size={16} /> 🏦 Bank Account & UPI
        </button>

        <button
          className={`admin-tab ${activeTab === "bookings" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <Calendar size={16} /> Global Bookings ({bookings.length})
        </button>

        <button
          className={`admin-tab ${activeTab === "tickets" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("tickets")}
        >
          <LifeBuoy size={16} /> Support Tickets ({tickets.length})
          {openTickets > 0 && <span className="tab-bubble tab-bubble-red">{openTickets} Open</span>}
        </button>

        <button
          className={`admin-tab ${activeTab === "excel" ? "tab-active tab-excel-active" : ""}`}
          onClick={() => setActiveTab("excel")}
        >
          <FileSpreadsheet size={16} /> 📥 Excel Sheet Exports
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW DASHBOARD & METRICS
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="admin-overview-section">
          {/* Stat Cards */}
          <div className="admin-stats-grid">
            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#eafaf1", color: "#27ae60" }}>
                <DollarSign size={24} />
              </span>
              <div>
                <span className="metric-lbl">Total Network Revenue</span>
                <h3 className="metric-val">₹{totalRevenue.toLocaleString()}</h3>
                <small className="metric-note">Across all partner hubs</small>
              </div>
            </div>

            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#ebf5fb", color: "#2980b9" }}>
                <Calendar size={24} />
              </span>
              <div>
                <span className="metric-lbl">Total Service Bookings</span>
                <h3 className="metric-val">{bookings.length} Bookings</h3>
                <small className="metric-note">{bookings.filter((b) => b.status === "completed").length} Completed</small>
              </div>
            </div>

            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#fef9e7", color: "#f39c12" }}>
                <Store size={24} />
              </span>
              <div>
                <span className="metric-lbl">Registered Shops</span>
                <h3 className="metric-val">{totalShops} Partner Hubs</h3>
                <small className="metric-note" style={{ color: "#d35400" }}>{pendingApprovals} Awaiting Approval</small>
              </div>
            </div>

            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#fdedec", color: "#c0392b" }}>
                <LifeBuoy size={24} />
              </span>
              <div>
                <span className="metric-lbl">Support Tickets</span>
                <h3 className="metric-val">{tickets.length} Tickets</h3>
                <small className="metric-note" style={{ color: "#c0392b" }}>{openTickets} Need Response</small>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts Grid */}
          <div className="admin-quick-links-grid">
            <div className="shortcut-box" onClick={() => setActiveTab("shops")}>
              <div className="sc-icon">🏪</div>
              <h4>Shop Partner Approvals</h4>
              <p>Nayi judne wali dukaano ko review karein aur Verified badge pradaan karein.</p>
              <span className="sc-arrow">Manage Shops →</span>
            </div>

            <div className="shortcut-box" onClick={() => setActiveTab("bookings")}>
              <div className="sc-icon">🚗</div>
              <h4>Live Network Bookings</h4>
              <p>Desh bhar ki roadside repair aur tyre fitment bookings ko live monitor karein.</p>
              <span className="sc-arrow">View Bookings →</span>
            </div>

            <div className="shortcut-box" onClick={() => setActiveTab("excel")}>
              <div className="sc-icon">📊</div>
              <h4>Excel / CSV Data Download</h4>
              <p>Bookings, in-store billing aur customer records ko 1-click me Excel me export karein.</p>
              <span className="sc-arrow">Open Excel Center →</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 2: SHOPS & USERS MANAGEMENT
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "shops" && (
        <div className="admin-section-container">
          <div className="section-toolbar">
            <div className="search-bar-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by shop name, owner, city, email or phone..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </div>

            <button
              className="btn-export-excel-action"
              onClick={() => exportUsersToExcel(users)}
            >
              <FileSpreadsheet size={15} /> Export Shops to Excel
            </button>
          </div>

          <div className="admin-table-card">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Shop & Owner Details</th>
                  <th>Contact Info</th>
                  <th>Location</th>
                  <th>Role</th>
                  <th>Partner Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) => {
                    const q = searchUser.toLowerCase();
                    return (
                      u.name.toLowerCase().includes(q) ||
                      u.email.toLowerCase().includes(q) ||
                      u.shopName.toLowerCase().includes(q) ||
                      u.city.toLowerCase().includes(q)
                    );
                  })
                  .map((u) => (
                    <tr key={u.uid}>
                      <td>
                        <strong className="shop-title-name">{u.shopName !== "—" ? u.shopName : u.name}</strong>
                        <small className="user-subtext">Owner: {u.name}</small>
                      </td>
                      <td>
                        <span>📞 {u.phone}</span>
                        <small className="user-subtext">✉️ {u.email}</small>
                      </td>
                      <td>
                        <span>{u.city}</span>
                        <small className="user-subtext">{u.address}</small>
                      </td>
                      <td>
                        <span className={`role-badge role-${u.role}`}>{u.role.toUpperCase()}</span>
                      </td>
                      <td>
                        {u.role === "vendor" || u.role === "admin" ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {u.shopApproved ? (
                              <span className="badge-verified">✓ Verified Hub</span>
                            ) : (
                              <span className="badge-unverified">⏳ Pending Approval</span>
                            )}
                            <span style={{
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "12px",
                              display: "inline-block",
                              width: "fit-content",
                              background: u.subscriptionPlan === "elite_vip" ? "#fef3c7" : u.subscriptionPlan === "pro_partner" ? "#e0e7ff" : "#ecfdf5",
                              color: u.subscriptionPlan === "elite_vip" ? "#92400e" : u.subscriptionPlan === "pro_partner" ? "#3730a3" : "#065f46",
                              border: "1px solid currentColor"
                            }}>
                              {u.subscriptionPlan === "elite_vip" ? "👑 Elite VIP" : u.subscriptionPlan === "pro_partner" ? "⭐ Pro Partner" : "🟢 Lifetime Free (₹0)"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted">Customer</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {(u.role === "vendor" || u.role === "admin") && (
                          <button
                            className={`btn-approval-toggle ${u.shopApproved ? "btn-unapprove" : "btn-approve"}`}
                            onClick={() => handleToggleShopApproval(u.uid)}
                            style={{ marginRight: "6px" }}
                          >
                            {u.shopApproved ? "Revoke Verification" : "✅ Approve Shop"}
                          </button>
                        )}
                        <button
                          className="btn-icon-ad"
                          onClick={() => handleDeleteUser(u.uid)}
                          title="Delete User / Shop Record"
                          style={{ verticalAlign: "middle" }}
                        >
                          <Trash2 size={15} color="#c0392b" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB: PLANS & PRICING MANAGER (DYNAMIC REVENUE & LAUNCH CONTROL)
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "pricing" && (
        <div className="admin-section-container">
          {/* Header Strip */}
          <div className="section-toolbar" style={{ flexWrap: "wrap", gap: "12px", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Crown size={22} color="#f39c12" />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>
                  Subscription & Pricing Control System (प्लान व कीमत प्रबंधक)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
                Shuruat mein sabhi plans 100% Free rakhein ya jab marzi ho tab apni custom Monthly/Yearly kimat (prices) set karke update karein.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn-export-excel-action"
                style={{ background: "#718096", color: "#fff" }}
                onClick={handleResetSubscriptionConfig}
              >
                <RotateCcw size={15} /> Reset Defaults
              </button>
              <button
                type="button"
                className="btn-export-excel-action"
                style={{ background: "#27ae60", color: "#fff", fontWeight: "800" }}
                onClick={handleSaveSubscriptionConfig}
              >
                <Save size={15} /> 💾 Save & Publish All Prices
              </button>
            </div>
          </div>

          {/* Success Notification Alert */}
          {pricingSuccessMsg && (
            <div style={{ background: "#eafaf1", border: "1.5px solid #27ae60", color: "#1e824c", padding: "12px 18px", borderRadius: "10px", marginBottom: "16px", fontWeight: 700, fontSize: "13.5px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} color="#27ae60" />
              <span>{pricingSuccessMsg}</span>
            </div>
          )}

          {/* 🚀 Master Launch Mode Switch (100% Free vs Live Paid Mode) */}
          <div style={{
            background: subConfig.launchFreeMode ? "linear-gradient(135deg, rgba(39, 174, 96, 0.12) 0%, rgba(46, 204, 113, 0.05) 100%)" : "linear-gradient(135deg, rgba(192, 57, 43, 0.1) 0%, rgba(231, 76, 60, 0.05) 100%)",
            border: `1.5px solid ${subConfig.launchFreeMode ? "#27ae60" : "#c0392b"}`,
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
              <div style={{ flex: 1, minWidth: "280px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    background: subConfig.launchFreeMode ? "#27ae60" : "#c0392b",
                    color: "#fff"
                  }}>
                    {subConfig.launchFreeMode ? "🚀 Launch Mode: 100% FREE ACTIVE" : "💰 Live Paid Revenue Mode ACTIVE"}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {subConfig.launchFreeMode ? "(Sabhi plans ₹0 me milenge)" : "(Dukandar set ki gayi fees pay karenge)"}
                  </span>
                </div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 800 }}>
                  {subConfig.launchFreeMode
                    ? "🎉 App Launch Offer Chalu Hai (Sabhi Dukandaron Ke Liye Free)"
                    : "💳 Paid Revenue Mode Chalu Hai (Har Plan Ke Rate Lagu Hain)"}
                </h4>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  {subConfig.launchFreeMode
                    ? "Jab tak ye mode ON hai, Pro aur VIP plans par price ₹0 dikhegi aur dukandar bina paise diye plan le sakenge. Jab aapko payment lena shuru karna ho, to 'Switch to Paid Mode' dabayein."
                    : "Abhi dukandar Pro ya VIP plan lene par neeche set kiye gaye Monthly/Yearly rate ke anusaar payment karenge."}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleToggleLaunchFreeMode}
                  style={{
                    background: subConfig.launchFreeMode ? "#c0392b" : "#27ae60",
                    color: "#fff",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {subConfig.launchFreeMode ? (
                    <>
                      <span>💰 Switch to Paid Mode (कीमत लागू करें)</span>
                    </>
                  ) : (
                    <>
                      <span>🚀 Switch to 100% Free Launch Mode (फ्री करें)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Launch Banner Text Field */}
            {subConfig.launchFreeMode && (
              <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px dashed rgba(39, 174, 96, 0.4)" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                  📢 Special Launch Banner Note (Dukandaron ko pricing page par dikhne wala message):
                </label>
                <input
                  type="text"
                  value={subConfig.launchBannerNote || ""}
                  onChange={(e) => setSubConfig({ ...subConfig, launchBannerNote: e.target.value })}
                  placeholder="🎉 LAUNCH OFFER: Sabhi Plans & Features Filhaal 100% FREE Hain!..."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                    boxSizing: "border-box"
                  }}
                />
              </div>
            )}
          </div>

          {/* 🏷️ Individual Plan Price & Features Editor Cards Grid */}
          <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 800 }}>
            📝 Set Custom Prices & Features Per Plan (प्रत्येक प्लान का रेट व फीचर्स बदलें)
          </h4>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px", marginBottom: "28px" }}>
            {subConfig.plans.map((plan) => {
              const isFreeLocked = plan.id === "free_lifetime";

              return (
                <div
                  key={plan.id}
                  style={{
                    background: "var(--surface)",
                    border: `1.5px solid ${plan.popular ? "#c0392b" : "var(--border)"}`,
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                  }}
                >
                  {/* Plan Top Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <span style={{ fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "10px", background: `${plan.color}20`, color: plan.color, border: `1px solid ${plan.color}40`, display: "inline-block", marginBottom: "4px" }}>
                        {isFreeLocked ? "🌱 100% LIFETIME FREE TIER" : (plan.popular ? "🔥 PRO GROWTH TIER" : "👑 ELITE VIP TIER")}
                      </span>
                      <h4 style={{ margin: 0, fontSize: "17px", fontWeight: 800 }}>{plan.name}</h4>
                    </div>

                    {isFreeLocked && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11.5px", fontWeight: 700, color: "#27ae60", background: "#eafaf1", padding: "4px 8px", borderRadius: "8px" }}>
                        <Lock size={13} /> Chhote Dukandar Free
                      </span>
                    )}
                  </div>

                  {/* Pricing Inputs */}
                  <div style={{ background: "rgba(0,0,0,0.02)", padding: "12px", borderRadius: "10px", border: "1px solid var(--border)", marginBottom: "14px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 800, color: "var(--heading)", display: "block", marginBottom: "8px" }}>
                      💰 Plan Price Setting (कीमत दर्ज करें):
                    </label>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "3px" }}>
                          Monthly Fee (प्रति माह ₹)
                        </label>
                        <input
                          type="number"
                          disabled={isFreeLocked}
                          value={plan.priceMonthly}
                          onChange={(e) => handlePlanPriceChange(plan.id, "priceMonthly", Number(e.target.value))}
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1.5px solid var(--border)",
                            fontWeight: 800,
                            fontSize: "14px",
                            color: isFreeLocked ? "#27ae60" : "var(--text)",
                            background: isFreeLocked ? "rgba(39, 174, 96, 0.08)" : "var(--surface)",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginBottom: "3px" }}>
                          Yearly Fee (वार्षिक ₹)
                        </label>
                        <input
                          type="number"
                          disabled={isFreeLocked}
                          value={plan.priceYearly}
                          onChange={(e) => handlePlanPriceChange(plan.id, "priceYearly", Number(e.target.value))}
                          style={{
                            width: "100%",
                            padding: "8px 10px",
                            borderRadius: "8px",
                            border: "1.5px solid var(--border)",
                            fontWeight: 800,
                            fontSize: "14px",
                            color: isFreeLocked ? "#27ae60" : "var(--text)",
                            background: isFreeLocked ? "rgba(39, 174, 96, 0.08)" : "var(--surface)",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hindi Name & Tagline */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "3px" }}>
                        Hindi Title / Subtitle:
                      </label>
                      <input
                        type="text"
                        value={plan.hindiName || ""}
                        onChange={(e) => handlePlanPriceChange(plan.id, "hindiName", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "12.5px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "3px" }}>
                        Tagline / Offer Note:
                      </label>
                      <input
                        type="text"
                        value={plan.tagline || ""}
                        onChange={(e) => handlePlanPriceChange(plan.id, "tagline", e.target.value)}
                        style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "12.5px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  {/* Features List Editor */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <label style={{ fontSize: "11.5px", fontWeight: 800, color: "var(--heading)" }}>
                        ✨ Feature Bullets ({plan.features.length}):
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddPlanFeature(plan.id)}
                        style={{ background: "transparent", border: "none", color: "#c0392b", fontSize: "11px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}
                      >
                        <Plus size={13} /> Add Feature
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <input
                            type="text"
                            value={feat}
                            onChange={(e) => handlePlanFeatureChange(plan.id, fIdx, e.target.value)}
                            style={{ flex: 1, padding: "5px 8px", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px" }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePlanFeature(plan.id, fIdx)}
                            style={{ background: "transparent", border: "none", color: "#e74c3c", cursor: "pointer", padding: "2px" }}
                            title="Remove bullet"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Save CTA Bar */}
          <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <strong style={{ fontSize: "14px", display: "block" }}>💾 Ready to apply changes?</strong>
              <small style={{ color: "var(--text-muted)" }}>
                'Save & Publish' dabate hi naye prices aur launch mode sabhi users ko turant dikhne lagenge.
              </small>
            </div>
            <button
              type="button"
              onClick={handleSaveSubscriptionConfig}
              style={{
                background: "#27ae60",
                color: "#ffffff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(39, 174, 96, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Save size={16} /> Save & Publish Live Prices
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB: BANK ACCOUNT & UPI SETTINGS (ADMIN REVENUE PAYMENTS)
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "bank" && (
        <div className="admin-section-container">
          {/* Header Toolbar */}
          <div className="section-toolbar" style={{ flexWrap: "wrap", gap: "12px", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Building2 size={22} color="#c0392b" />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>
                  Admin Official Bank Account & UPI Setup (बैंक खाता व UPI सेटिंग्स)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
                Yahan apna UPI ID aur Bank Account details darj karein. Dukandar subscription lete samay isi account par payment bhejenge.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn-export-excel-action"
                style={{ background: "#718096", color: "#fff" }}
                onClick={handleResetBankConfig}
              >
                <RotateCcw size={15} /> Reset Defaults
              </button>
              <button
                type="button"
                className="btn-export-excel-action"
                style={{ background: "#27ae60", color: "#fff", fontWeight: "800" }}
                onClick={handleSaveBankConfig}
              >
                <Save size={15} /> 💾 Save Bank Details
              </button>
            </div>
          </div>

          {/* Success Notification Alert */}
          {bankSuccessMsg && (
            <div style={{ background: "#eafaf1", border: "1.5px solid #27ae60", color: "#1e824c", padding: "12px 18px", borderRadius: "10px", marginBottom: "16px", fontWeight: 700, fontSize: "13.5px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} color="#27ae60" />
              <span>{bankSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveBankConfig}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", marginBottom: "28px" }}>
              
              {/* 📝 Left Column: Form Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* 1. UPI & Instant Payment Details */}
                <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
                    <QrCode size={18} color="#c0392b" />
                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>1. UPI & Instant QR Details</h4>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Primary UPI ID (Google Pay / PhonePe / Paytm / BHIM)
                      </label>
                      <input
                        type="text"
                        value={bankConfig.upiId || ""}
                        onChange={(e) => setBankConfig({ ...bankConfig, upiId: e.target.value.trim() })}
                        placeholder="Apna UPI ID dalein (उदा. 9876543210@paytm, name@oksbi)..."
                        style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "14px", fontWeight: 700, color: "#c0392b", boxSizing: "border-box" }}
                      />
                      <small style={{ color: "var(--text-muted)", fontSize: "11px", marginTop: "3px", display: "block" }}>
                        * Jaise hi aap yahan UPI ID dalenge, right side mein iska live QR Code turant generate ho jayega.
                      </small>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          Payee / Business Name
                        </label>
                        <input
                          type="text"
                          value={bankConfig.payeeName || ""}
                          onChange={(e) => setBankConfig({ ...bankConfig, payeeName: e.target.value })}
                          placeholder="उदा. TyreSaathi Official"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          Payment Support Phone (WhatsApp)
                        </label>
                        <input
                          type="tel"
                          value={bankConfig.phone || ""}
                          onChange={(e) => setBankConfig({ ...bankConfig, phone: e.target.value })}
                          placeholder="उदा. 9876543210"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Payment Instruction / Help Note (दुकानदारों के लिए संदेश)
                      </label>
                      <input
                        type="text"
                        value={bankConfig.paymentNotes || ""}
                        onChange={(e) => setBankConfig({ ...bankConfig, paymentNotes: e.target.value })}
                        placeholder="उदा. Payment karne ke baad screenshot is number par WhatsApp karein."
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "12.5px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Direct Bank Account Details (NEFT / IMPS / RTGS) */}
                <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
                    <Building2 size={18} color="#27ae60" />
                    <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>2. Bank Account Details (NEFT / IMPS)</h4>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          Bank Name (बैंक का नाम)
                        </label>
                        <input
                          type="text"
                          value={bankConfig.bankName || ""}
                          onChange={(e) => setBankConfig({ ...bankConfig, bankName: e.target.value })}
                          placeholder="उदा. State Bank of India, HDFC Bank"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          Account Holder Name
                        </label>
                        <input
                          type="text"
                          value={bankConfig.accountHolderName || ""}
                          onChange={(e) => setBankConfig({ ...bankConfig, accountHolderName: e.target.value })}
                          placeholder="उदा. Aapka Naam ya Firm ka Naam"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          Account Number (खाता संख्या)
                        </label>
                        <input
                          type="text"
                          value={bankConfig.accountNumber || ""}
                          onChange={(e) => setBankConfig({ ...bankConfig, accountNumber: e.target.value.trim() })}
                          placeholder="उदा. 389201928371"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "14px", fontWeight: 700, letterSpacing: "0.5px", boxSizing: "border-box" }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          value={bankConfig.ifscCode || ""}
                          onChange={(e) => setBankConfig({ ...bankConfig, ifscCode: e.target.value.toUpperCase().trim() })}
                          placeholder="उदा. SBIN0001234"
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13.5px", fontWeight: 700, textTransform: "uppercase", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Branch Name & City
                      </label>
                      <input
                        type="text"
                        value={bankConfig.branchName || ""}
                        onChange={(e) => setBankConfig({ ...bankConfig, branchName: e.target.value })}
                        placeholder="उदा. Main Branch, Raipur"
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 👁️ Right Column: Live Visual Passbook & UPI QR Preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                {/* 💳 Virtual Bank Passbook Card Preview */}
                <div style={{
                  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #0f2027 100%)",
                  borderRadius: "18px",
                  padding: "24px",
                  color: "#ffffff",
                  boxShadow: "0 12px 30px rgba(30, 60, 114, 0.35)",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Subtle Background Badge Pattern */}
                  <div style={{ position: "absolute", right: "-10px", top: "-10px", opacity: 0.08, fontSize: "130px", fontWeight: 900, pointerEvents: "none" }}>
                    ₹
                  </div>

                  {/* Top Card Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>
                    <div>
                      <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", opacity: 0.8 }}>OFFICIAL SETTLEMENT ACCOUNT</span>
                      <h4 style={{ margin: "2px 0 0", fontSize: "17px", fontWeight: 800, letterSpacing: "0.5px" }}>
                        {bankConfig.bankName || "BANK NAME (खाली)"}
                      </h4>
                    </div>

                    <div style={{ width: "36px", height: "26px", borderRadius: "4px", background: "linear-gradient(135deg, #FFD200 0%, #F7971E 100%)", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} title="EMV Smart Chip" />
                  </div>

                  {/* Account Number in Passbook Card */}
                  <div style={{ marginBottom: "18px" }}>
                    <span style={{ fontSize: "10px", opacity: 0.75, display: "block" }}>ACCOUNT NUMBER</span>
                    <strong style={{ fontSize: "19px", letterSpacing: "2.5px", fontFamily: "monospace" }}>
                      {bankConfig.accountNumber ? bankConfig.accountNumber.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• ••••"}
                    </strong>
                  </div>

                  {/* Bottom Holder & IFSC details */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "11px" }}>
                    <div>
                      <span style={{ opacity: 0.75, display: "block" }}>ACCOUNT HOLDER</span>
                      <strong style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {bankConfig.accountHolderName || "HOLDER NAME"}
                      </strong>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ opacity: 0.75, display: "block" }}>IFSC CODE</span>
                      <strong style={{ fontSize: "12px", fontFamily: "monospace", letterSpacing: "1px" }}>
                        {bankConfig.ifscCode || "IFSC CODE"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 📱 Live Generated UPI QR Code Preview Box */}
                <div style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "16px", padding: "20px", textAlign: "center", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "12px" }}>
                    <QrCode size={18} color="#c0392b" />
                    <strong style={{ fontSize: "15px" }}>Live Generated UPI QR Code (लाइव प्रीव्यू)</strong>
                  </div>

                  {bankConfig.upiId && bankConfig.upiId.trim() ? (
                    <>
                      <div style={{ background: "#ffffff", padding: "12px", borderRadius: "14px", border: "1px solid #e2e8f0", display: "inline-block", boxShadow: "0 4px 14px rgba(0,0,0,0.06)", margin: "0 auto 12px auto" }}>
                        <img
                          src={getUpiQrCodeUrl(bankConfig.upiId, bankConfig.payeeName, 0)}
                          alt="Admin UPI QR Preview"
                          style={{ width: "160px", height: "160px", display: "block", borderRadius: "8px" }}
                        />
                      </div>

                      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--surface-2)", padding: "6px 14px", borderRadius: "20px", border: "1px solid var(--border)", fontSize: "12px" }}>
                        <span>UPI ID: <strong style={{ color: "#c0392b" }}>{bankConfig.upiId}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleAdminCopy(bankConfig.upiId, "admin_upi")}
                          style={{ background: "transparent", border: "none", color: "#c0392b", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "2px", fontWeight: 700 }}
                        >
                          {adminCopiedKey === "admin_upi" ? <Check size={13} /> : <Copy size={13} />}
                          {adminCopiedKey === "admin_upi" ? "Copied" : "Copy"}
                        </button>
                      </div>

                      <p style={{ margin: "12px 0 0", fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                        * Yeh QR code direct aapke is UPI ID se linked hai. Dukandar ise scan karke direct aapke account me payment bhej sakenge.
                      </p>
                    </>
                  ) : (
                    <div style={{
                      padding: "32px 16px",
                      border: "2px dashed var(--border, #cbd5e1)",
                      borderRadius: "14px",
                      background: "rgba(0,0,0,0.02)",
                      margin: "0 auto",
                      maxWidth: "280px"
                    }}>
                      <QrCode size={46} color="#94a3b8" style={{ margin: "0 auto 10px", display: "block", opacity: 0.7 }} />
                      <strong style={{ display: "block", fontSize: "13.5px", color: "var(--text)", marginBottom: "4px" }}>
                        UPI ID Khali Hai
                      </strong>
                      <p style={{ margin: 0, fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                        Left side mein apna <strong>UPI ID</strong> dalein, yahan live QR Code turant ban kar aa jayega.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Bottom Save CTA Bar */}
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <strong style={{ fontSize: "14px", display: "block" }}>💾 Save Bank & UPI Details</strong>
                <small style={{ color: "var(--text-muted)" }}>
                  'Save Bank Details' dabate hi naya UPI ID aur Bank info poore TyreSaathi subscription system me update ho jayega.
                </small>
              </div>
              <button
                type="submit"
                style={{
                  background: "#27ae60",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(39, 174, 96, 0.3)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Save size={16} /> Save Bank & UPI Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 3: GLOBAL BOOKINGS & INVOICES MONITOR
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "bookings" && (
        <div className="admin-section-container">
          <div className="section-toolbar">
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px" }}>Global Customer Bookings Network</h3>
              <p style={{ margin: 0, fontSize: "12.5px", color: "var(--text-muted)" }}>
                Desh bhar ki sabhi live bookings aur inke status ka live overview.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-export-excel-action"
                onClick={() => exportBookingsToExcel(bookings)}
              >
                <FileSpreadsheet size={15} /> Export Bookings (Excel)
              </button>
              <button
                className="btn-export-excel-action"
                onClick={() => exportInvoicesToExcel(invoices)}
              >
                <FileSpreadsheet size={15} /> Export Invoices (Excel)
              </button>
            </div>
          </div>

          <div className="admin-table-card">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Booking ID & Date</th>
                  <th>Customer & Phone</th>
                  <th>Vehicle & Reg No</th>
                  <th>Service Requested</th>
                  <th>Assigned Partner Hub</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <strong>#{b.id}</strong>
                      <small className="user-subtext">{b.date} • {b.timeSlot}</small>
                    </td>
                    <td>
                      <strong>{b.customerName}</strong>
                      <small className="user-subtext">📞 {b.customerPhone}</small>
                    </td>
                    <td>
                      <span>{b.vehicleType}</span>
                      <small className="reg-badge">{b.vehicleNumber}</small>
                    </td>
                    <td>
                      <strong>{b.serviceName}</strong>
                      {b.notes && <small className="user-subtext">"{b.notes}"</small>}
                    </td>
                    <td>
                      <span className="hub-tag">🏪 {b.shopName}</span>
                    </td>
                    <td>
                      <span className={`status-badge-ticket status-${b.status}`}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 4: SUPPORT TICKET RESOLVER
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "tickets" && (
        <div className="admin-section-container">
          <div className="section-toolbar">
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "16px" }}>Customer & Shop Support Tickets</h3>
              <p style={{ margin: 0, fontSize: "12.5px", color: "var(--text-muted)" }}>
                Aap yahan se complaints ka solution likh sakte hain aur status update kar sakte hain.
              </p>
            </div>

            <button
              className="btn-export-excel-action"
              onClick={() => exportTicketsToExcel(tickets)}
            >
              <FileSpreadsheet size={15} /> Export Tickets (Excel)
            </button>
          </div>

          <div className="admin-table-card">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Ticket # & Date</th>
                  <th>User Details</th>
                  <th>Category & Priority</th>
                  <th>Problem Summary</th>
                  <th>Status</th>
                  <th>Admin Reply / Resolve</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>#{t.ticketNo}</strong>
                      <small className="user-subtext">{t.createdAt}</small>
                    </td>
                    <td>
                      <strong>{t.userName}</strong>
                      <small className="user-subtext">📞 {t.userPhone}</small>
                    </td>
                    <td>
                      <span>{t.category}</span>
                      <small className={`priority-tag priority-${t.priority}`}>{t.priority.toUpperCase()}</small>
                    </td>
                    <td>
                      <strong style={{ display: "block" }}>{t.subject}</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>{t.description}</p>
                      {t.adminReply && (
                        <div className="admin-reply-snippet">
                          <strong>Reply:</strong> {t.adminReply}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge-ticket status-${t.status}`}>
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      {t.status !== "resolved" ? (
                        <button
                          className="btn-resolve-ticket"
                          onClick={() => setReplyTicketModal(t)}
                        >
                          💬 Reply & Resolve
                        </button>
                      ) : (
                        <span className="resolved-check">✓ Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 5: EXCEL SHEET EXPORT CENTER
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "excel" && (
        <div className="admin-excel-center">
          <div className="excel-center-header">
            <FileSpreadsheet size={32} color="#27ae60" />
            <div>
              <h2>Excel Sheet & CSV Data Export Center</h2>
              <p>TyreSaathi ke sabhi records ko ek click me Excel sheet (.csv) format me download karein.</p>
            </div>
          </div>

          <div className="excel-cards-grid">
            {/* Card 1: Bookings */}
            <div className="excel-download-card">
              <div className="card-top">
                <span className="ex-icon" style={{ background: "#eafaf1", color: "#27ae60" }}>🚗</span>
                <div>
                  <h4>Customer Service Bookings</h4>
                  <small>{bookings.length} Total Bookings Records</small>
                </div>
              </div>
              <p>Customer Name, Phone, Vehicle No, Service Type, Slot, Shop Hub aur Status.</p>
              <button
                className="btn-download-csv"
                onClick={() => exportBookingsToExcel(bookings)}
              >
                <Download size={16} /> Download Bookings.csv (Excel)
              </button>
            </div>

            {/* Card 2: Invoices */}
            <div className="excel-download-card">
              <div className="card-top">
                <span className="ex-icon" style={{ background: "#ebf5fb", color: "#2980b9" }}>🧾</span>
                <div>
                  <h4>Billing & Retail Invoices</h4>
                  <small>{invoices.length} Generated Invoices</small>
                </div>
              </div>
              <p>Invoice #, Items Breakdown, Subtotal, GST Tax, Grand Total, Cash/UPI mode aur Khata details.</p>
              <button
                className="btn-download-csv"
                onClick={() => exportInvoicesToExcel(invoices)}
              >
                <Download size={16} /> Download Invoices.csv (Excel)
              </button>
            </div>

            {/* Card 3: Shops & Users */}
            <div className="excel-download-card">
              <div className="card-top">
                <span className="ex-icon" style={{ background: "#fef9e7", color: "#f39c12" }}>🏪</span>
                <div>
                  <h4>Shops & Registered Users</h4>
                  <small>{users.length} Total Registered Users</small>
                </div>
              </div>
              <p>Shop Name, Owner Name, Contact Phone, City, Complete Address aur Partner Verification status.</p>
              <button
                className="btn-download-csv"
                onClick={() => exportUsersToExcel(users)}
              >
                <Download size={16} /> Download Shops_Users.csv (Excel)
              </button>
            </div>

            {/* Card 4: Support Tickets */}
            <div className="excel-download-card">
              <div className="card-top">
                <span className="ex-icon" style={{ background: "#fdedec", color: "#c0392b" }}>🎫</span>
                <div>
                  <h4>Support & Help Tickets</h4>
                  <small>{tickets.length} Total Complaints & Inquiries</small>
                </div>
              </div>
              <p>Ticket ID, Category, Problem Subject, Priority, Customer Info aur Admin Resolution Notes.</p>
              <button
                className="btn-download-csv"
                onClick={() => exportTicketsToExcel(tickets)}
              >
                <Download size={16} /> Download Support_Tickets.csv (Excel)
              </button>
            </div>

            {/* Card 5: Google Sheets Live Sync */}
            <div className="excel-download-card" style={{ border: "2px dashed #27ae60", background: "#f9fcf9" }}>
              <div className="card-top">
                <span className="ex-icon" style={{ background: "#eafaf1", color: "#27ae60" }}>📊</span>
                <div>
                  <h4>Google Sheets Realtime Sync</h4>
                  <small style={{ color: getGoogleSheetUrl() ? "#27ae60" : "#e67e22", fontWeight: "bold" }}>
                    {getGoogleSheetUrl() ? "🟢 Live Sync Connected" : "🟡 Setup Pending"}
                  </small>
                </div>
              </div>
              <p>Live Logins, Registrations aur Service Bookings real-time me aapke Google Sheet me sync hoti hain.</p>
              <Link
                to="/settings"
                className="btn-download-csv"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#27ae60",
                  color: "#fff"
                }}
              >
                ⚙️ Manage Google Sheet Settings →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 6: SHOP ADS & BANNER PROMOTIONS MANAGER
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "ads" && (
        <div className="admin-ads-section">
          {/* Top Ads Header & Action */}
          <div className="section-toolbar">
            <div className="search-bar-wrap">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search ads by shop name, city, offer..."
                value={adSearchTerm}
                onChange={(e) => setAdSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                className="btn-create-ad"
                onClick={handleOpenCreateAd}
              >
                <Plus size={16} /> ➕ Naya Shop Ad Banayein
              </button>
            </div>
          </div>

          {/* Ads Metric Strip */}
          <div className="ads-metrics-strip">
            <div className="ad-mini-stat">
              <span className="ad-stat-val">{ads.length}</span>
              <span className="ad-stat-lbl">Total Shop Ads</span>
            </div>
            <div className="ad-mini-stat">
              <span className="ad-stat-val" style={{ color: "#27ae60" }}>{activeAdsCount}</span>
              <span className="ad-stat-lbl">Active on Home Page</span>
            </div>
            <div className="ad-mini-stat">
              <span className="ad-stat-val" style={{ color: "#e74c3c" }}>{ads.length - activeAdsCount}</span>
              <span className="ad-stat-lbl">Inactive / Paused</span>
            </div>
          </div>

          {/* Ads Cards Grid */}
          <div className="admin-ads-grid">
            {filteredAds.length === 0 ? (
              <div className="no-ads-box">
                <Megaphone size={48} color="#ccc" />
                <h3>Koi Shop Ad nahi mila</h3>
                <p>Upar "Naya Shop Ad Banayein" button dabayein aur kisi bhi dukan ka offer homepage par dikhayein.</p>
              </div>
            ) : (
              filteredAds.map((ad) => {
                const scheduleInfo = getAdScheduleStatus(ad);
                return (
                  <div key={ad.id} className="admin-ad-card-item">
                    {/* Status & Featured Badge */}
                    <div className="ad-item-header">
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span 
                          className="ad-status-pill"
                          style={{
                            background: scheduleInfo.status === "active" ? "#eafaf1" : (scheduleInfo.status === "scheduled" ? "#fef9e7" : "#fdf2f2"),
                            color: scheduleInfo.color,
                            border: `1px solid ${scheduleInfo.color}`,
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "700"
                          }}
                        >
                          {scheduleInfo.label}
                        </span>
                        {ad.featured && <span className="ad-featured-pill">⭐ Featured</span>}
                        {ad.startDate && (
                          <span style={{ fontSize: "11px", color: "#888" }}>
                            📅 {ad.startDate} {ad.endDate ? `to ${ad.endDate}` : "(Permanent)"}
                          </span>
                        )}
                      </div>

                      <div className="ad-item-top-btns">
                        <button
                          className="btn-icon-ad"
                          title="Edit Ad"
                          onClick={() => handleOpenEditAd(ad)}
                        >
                          <Edit3 size={15} color="#2980b9" />
                        </button>
                        <button
                          className="btn-icon-ad"
                          title="Delete Ad"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          <Trash2 size={15} color="#c0392b" />
                        </button>
                      </div>
                    </div>

                  {/* Live Homepage Visual Preview */}
                  <div
                    className="ad-preview-box"
                    style={{ background: ad.gradient || "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)" }}
                  >
                    <div className="prev-top">
                      <span className="prev-shop-badge">
                        <ShieldCheck size={12} color="#2ed573" /> Verified Partner
                      </span>
                      <span
                        className="prev-offer-pill"
                        style={{ background: ad.badgeColor || "#ff4757" }}
                      >
                        {ad.offerBadge}
                      </span>
                    </div>

                    <h4 className="prev-shop-name">{ad.shopName}</h4>
                    <p className="prev-tagline">{ad.tagline}</p>
                    <p className="prev-desc">{ad.description}</p>
                    <div className="prev-meta">
                      <span>📍 {ad.city}</span>
                      {ad.address && <span>🏠 {ad.address}</span>}
                    </div>
                  </div>

                  {/* Ad Management Bar */}
                  <div className="ad-manage-bar">
                    <div className="ad-contact-info">
                      <span>📞 {ad.phone}</span>
                      <span>💬 {ad.whatsapp}</span>
                    </div>

                    <div className="ad-toggle-wrap">
                      <button
                        className={`btn-toggle-ad ${ad.isActive !== false ? "btn-toggle-active" : "btn-toggle-inactive"}`}
                        onClick={() => handleToggleAdStatus(ad.id)}
                      >
                        <Power size={13} />
                        {ad.isActive !== false ? "Ad Pause Karein" : "Ad Live Karein"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          CREATE / EDIT SHOP AD MODAL
      ══════════════════════════════════════════════════════════════════ */}
      {adModalOpen && (
        <div className="modal-backdrop" onClick={() => setAdModalOpen(false)}>
          <div className="modal-card ad-modal-wide" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header ad-modal-header-styled">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fdedec", display: "flex", alignItems: "center", justifyContent: "center", color: "#c0392b", flexShrink: 0 }}>
                  <Megaphone size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "var(--heading, #1e293b)" }}>
                    {editingAdId ? "✏️ Shop Ad Edit Karein" : "📢 Naya Shop Ad / Banner Banayein"}
                  </h3>
                  <small style={{ color: "var(--text-muted, #64748b)", fontSize: "12px" }}>
                    Homepage par live customer offer dikhane ke liye details bharein
                  </small>
                </div>
              </div>
              <button type="button" className="btn-modal-close-icon" onClick={() => setAdModalOpen(false)} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => handleSaveAd(e, false)}>
              <div className="ad-modal-grid">
                {/* Form Inputs */}
                <div className="ad-form-inputs">
                  <div className="modal-field">
                    <label>🏪 Shop / Business Name (दुकान का नाम) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Star Tyre & 3D Alignment Hub"
                      value={adForm.shopName}
                      onChange={(e) => setAdForm({ ...adForm, shopName: e.target.value })}
                    />
                  </div>

                  <div className="modal-field">
                    <label>🏷️ Offer Badge (डिस्काउंट या ऑफर टैग) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 🔥 20% OFF + FREE FITMENT"
                      value={adForm.offerBadge}
                      onChange={(e) => setAdForm({ ...adForm, offerBadge: e.target.value })}
                    />
                  </div>

                  <div className="modal-field">
                    <label>✨ Main Tagline / Offer Headline *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free 3D Alignment on purchase of 4 Car Tyres!"
                      value={adForm.tagline}
                      onChange={(e) => setAdForm({ ...adForm, tagline: e.target.value })}
                    />
                  </div>

                  <div className="modal-field">
                    <label>📝 Offer Description / Details</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Authorized MRF, Apollo, CEAT dealer with 5-year warranty..."
                      value={adForm.description}
                      onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2col">
                    <div className="modal-field">
                      <label>📞 Calling Phone Number</label>
                      <input
                        type="text"
                        placeholder="10-digit Calling No."
                        value={adForm.phone}
                        onChange={(e) => setAdForm({ ...adForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="modal-field">
                      <label>💬 WhatsApp Number</label>
                      <input
                        type="text"
                        placeholder="10-digit WhatsApp No."
                        value={adForm.whatsapp}
                        onChange={(e) => setAdForm({ ...adForm, whatsapp: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="modal-field">
                      <label>📍 City / Location (शहर चुनें)</label>
                      <select
                        value={adForm.city}
                        onChange={(e) => setAdForm({ ...adForm, city: e.target.value })}
                        style={{ width: "100%", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "8px", padding: "9px 12px", fontSize: "13.5px", color: "var(--text)", boxSizing: "border-box" }}
                      >
                        {POPULAR_CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {adForm.city === "Other" && (
                        <input
                          type="text"
                          placeholder="Type your city name (शहर का नाम लिखें)..."
                          value={adForm.customCity}
                          onChange={(e) => setAdForm({ ...adForm, customCity: e.target.value })}
                          style={{ marginTop: "6px" }}
                        />
                      )}
                    </div>
                    <div className="modal-field">
                      <label>🏠 Address / Landmark</label>
                      <input
                        type="text"
                        placeholder="Near Auto Market, Ring Road"
                        value={adForm.address}
                        onChange={(e) => setAdForm({ ...adForm, address: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* ⏰ Date & Time Schedule & Auto-Expiry */}
                  <div className="modal-field" style={{ background: "rgba(0,0,0,0.03)", padding: "14px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                    <label style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", color: "var(--heading, #1e293b)", marginBottom: "8px" }}>
                      <Clock size={15} color="#c0392b" /> ⏰ Ad Schedule & Auto-Expiry (तारीख व वैधता)
                    </label>
                    
                    {/* Duration Presets */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                      <button type="button" className="btn-ad-preset" onClick={() => setAdDurationPreset(3)}>⚡ 3 Days</button>
                      <button type="button" className="btn-ad-preset" onClick={() => setAdDurationPreset(7)}>🔥 7 Days</button>
                      <button type="button" className="btn-ad-preset" onClick={() => setAdDurationPreset(15)}>💎 15 Days</button>
                      <button type="button" className="btn-ad-preset" onClick={() => setAdDurationPreset(30)}>👑 30 Days</button>
                      <button type="button" className="btn-ad-preset" onClick={() => setAdDurationPreset(null)}>♾️ Lifetime</button>
                    </div>

                    <div className="form-row-2col">
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "3px" }}>Start Date (शुरू होने की तारीख)</label>
                        <input
                          type="date"
                          value={adForm.startDate || ""}
                          onChange={(e) => setAdForm({ ...adForm, startDate: e.target.value })}
                          style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "3px" }}>Expiry Date (समाप्त होने की तारीख)</label>
                        <input
                          type="date"
                          value={adForm.endDate || ""}
                          onChange={(e) => setAdForm({ ...adForm, endDate: e.target.value })}
                          style={{ width: "100%", padding: "7px 10px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px" }}
                        />
                      </div>
                    </div>
                    <small style={{ color: "#64748b", fontSize: "11.5px", marginTop: "4px", display: "block" }}>
                      * Expiry date aate hi ye ad automatic Home page se hat jayega.
                    </small>
                  </div>

                  {/* Gradient Theme Presets & Custom Color Picker */}
                  <div className="modal-field">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <label style={{ margin: 0, fontWeight: "700" }}>🎨 Banner Color Theme</label>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !showCustomColorPicker;
                          setShowCustomColorPicker(next);
                          if (next) {
                            handleCustomColorChange(customColor1, customColor2, customBadgeColor);
                          }
                        }}
                        style={{
                          background: showCustomColorPicker ? "#c0392b" : "var(--surface-2, #f1f5f9)",
                          color: showCustomColorPicker ? "#ffffff" : "var(--text, #1e293b)",
                          border: "1px solid var(--border)",
                          padding: "5px 12px",
                          borderRadius: "8px",
                          fontSize: "11.5px",
                          fontWeight: "700",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px"
                        }}
                      >
                        🎨 Custom Color (कस्टम रंग) {showCustomColorPicker ? "▲" : "▼"}
                      </button>
                    </div>

                    {/* Presets */}
                    <div className="theme-pills-row">
                      {AD_THEMES.map((theme) => (
                        <button
                          key={theme.id}
                          type="button"
                          className={`theme-pill ${!showCustomColorPicker && adForm.gradient === theme.gradient ? "theme-pill-selected" : ""}`}
                          style={{ background: theme.gradient }}
                          onClick={() => {
                            setShowCustomColorPicker(false);
                            setAdForm({ ...adForm, gradient: theme.gradient, badgeColor: theme.badgeColor });
                          }}
                        >
                          {theme.name}
                        </button>
                      ))}
                    </div>

                    {/* Custom Color Palette Controls */}
                    {showCustomColorPicker && (
                      <div style={{ marginTop: "12px", background: "rgba(0,0,0,0.03)", border: "1.5px dashed #c0392b", padding: "12px", borderRadius: "10px" }}>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: "#c0392b", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>🎨 Custom Gradient & Badge Colors (अपनी पसंद का रंग चुनें)</span>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                          {/* Start Color */}
                          <div style={{ textAlign: "center", background: "var(--surface)", padding: "8px 6px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                            <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "4px" }}>Start Color</label>
                            <input
                              type="color"
                              value={customColor1}
                              onChange={(e) => handleCustomColorChange(e.target.value, undefined, undefined)}
                              style={{ width: "100%", height: "32px", border: "none", borderRadius: "4px", cursor: "pointer", background: "none" }}
                            />
                            <span style={{ fontSize: "10.5px", fontFamily: "monospace", color: "#475569", display: "block", marginTop: "2px" }}>{customColor1}</span>
                          </div>

                          {/* End Color */}
                          <div style={{ textAlign: "center", background: "var(--surface)", padding: "8px 6px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                            <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "4px" }}>End Color</label>
                            <input
                              type="color"
                              value={customColor2}
                              onChange={(e) => handleCustomColorChange(undefined, e.target.value, undefined)}
                              style={{ width: "100%", height: "32px", border: "none", borderRadius: "4px", cursor: "pointer", background: "none" }}
                            />
                            <span style={{ fontSize: "10.5px", fontFamily: "monospace", color: "#475569", display: "block", marginTop: "2px" }}>{customColor2}</span>
                          </div>

                          {/* Badge Color */}
                          <div style={{ textAlign: "center", background: "var(--surface)", padding: "8px 6px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                            <label style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", display: "block", marginBottom: "4px" }}>Offer Badge</label>
                            <input
                              type="color"
                              value={customBadgeColor}
                              onChange={(e) => handleCustomColorChange(undefined, undefined, e.target.value)}
                              style={{ width: "100%", height: "32px", border: "none", borderRadius: "4px", cursor: "pointer", background: "none" }}
                            />
                            <span style={{ fontSize: "10.5px", fontFamily: "monospace", color: "#475569", display: "block", marginTop: "2px" }}>{customBadgeColor}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Active Toggle Checkbox */}
                  <div className="modal-checkbox-row">
                    <label>
                      <input
                        type="checkbox"
                        checked={adForm.isActive}
                        onChange={(e) => setAdForm({ ...adForm, isActive: e.target.checked })}
                      />
                      <span>Is Ad ko Home Page par Live (Active) rakhein</span>
                    </label>
                  </div>
                </div>

                {/* Live Preview Column */}
                <div className="ad-modal-preview-col">
                  <h4>👁️ Real-Time Home Page Card Preview</h4>
                  <div
                    className="shop-ad-card preview-card"
                    style={{ background: adForm.gradient }}
                  >
                    <div className="ad-card-top">
                      <div className="ad-shop-header">
                        <span className="ad-shop-badge">
                          <ShieldCheck size={13} color="#2ed573" /> Verified Partner
                        </span>
                        <span className="ad-city-tag">📍 {adForm.city || "City"}</span>
                      </div>
                      <span
                        className="ad-offer-pill"
                        style={{ background: adForm.badgeColor }}
                      >
                        {adForm.offerBadge || "SPECIAL OFFER"}
                      </span>
                    </div>

                    <div className="ad-card-body">
                      <h3 className="ad-shop-name">{adForm.shopName || "Dukan Ka Naam"}</h3>
                      <h4 className="ad-tagline">{adForm.tagline || "Offer Headline Yahan Dikhegi"}</h4>
                      <p className="ad-desc">{adForm.description || "Offer ka poora vivran yahan customer ko dikhega..."}</p>
                      {adForm.address && <div className="ad-address-snippet">🏠 {adForm.address}</div>}
                    </div>

                    <div className="ad-card-actions">
                      <span className="btn-ad-call" style={{ cursor: "default" }}>
                        <Phone size={13} /> Call Shop
                      </span>
                      <span className="btn-ad-whatsapp" style={{ cursor: "default" }}>
                        <MessageSquare size={13} /> WhatsApp Inquiry
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="ad-modal-actions-bar">
                <button type="button" className="btn-ad-act-cancel" onClick={() => setAdModalOpen(false)}>
                  Cancel (रद्द करें)
                </button>
                <div className="ad-modal-right-btns">
                  <button type="button" className="btn-ad-act-draft" onClick={(e) => handleSaveAd(e, true)}>
                    <FileText size={15} /> 📝 Save as Draft (ड्राफ्ट में रखें)
                  </button>
                  <button type="submit" className="btn-ad-act-publish">
                    <Rocket size={15} /> {editingAdId ? "Update & Publish" : "🚀 Save & Publish Ad to Home"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          REPLY & RESOLVE TICKET MODAL
      ══════════════════════════════════════════════════════════════════ */}
      {replyTicketModal && (
        <div className="modal-backdrop" onClick={() => setReplyTicketModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💬 Resolve Support Ticket #{replyTicketModal.ticketNo}</h3>
              <button className="modal-close" onClick={() => setReplyTicketModal(null)}>✕</button>
            </div>

            <div style={{ marginBottom: "14px", fontSize: "13px" }}>
              <p><strong>Customer:</strong> {replyTicketModal.userName} (📞 {replyTicketModal.userPhone})</p>
              <p><strong>Subject:</strong> {replyTicketModal.subject}</p>
              <p><strong>Issue:</strong> {replyTicketModal.description}</p>
            </div>

            <div className="modal-field">
              <label>Admin Resolution Note (ग्राहक को समाधान संदेश)</label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Aapki samasya solve kar di gayi hai..."
              />
            </div>

            <div className="modal-actions" style={{ marginTop: "16px" }}>
              <button className="btn-cancel" onClick={() => setReplyTicketModal(null)}>Cancel</button>
              <button
                className="btn-submit-ticket"
                onClick={() => handleResolveTicket(replyTicketModal.id)}
              >
                ✅ Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-page-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 6px 4px 30px;
        }
        .admin-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 800px) {
          .admin-header-row { flex-direction: column; gap: 10px; }
        }
        .admin-badge-strip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.6875rem;
          font-weight: 800;
          color: #c0392b;
          letter-spacing: 0.5px;
          background: #fdedec;
          padding: 3px 8px;
          border-radius: 4px;
          margin-bottom: 4px;
        }
        .admin-page-title {
          font-size: 1.25rem; /* text-xl on mobile */
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          line-height: 1.25;
        }
        @media (min-width: 640px) {
          .admin-page-title { font-size: 1.5rem; }
        }
        .admin-page-sub {
          font-size: 0.75rem; /* text-xs */
          color: var(--text-muted);
          margin: 0;
          line-height: 1.35;
        }
        .btn-excel-top-action {
          background: #27ae60;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.25);
        }

        /* Nav Tabs */
        .admin-nav-tabs {
          display: flex;
          gap: 6px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
          margin-bottom: 16px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .admin-nav-tabs::-webkit-scrollbar {
          display: none;
        }
        .admin-tab {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 0.75rem; /* text-xs */
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tab-active {
          background: #c0392b !important;
          color: white !important;
          border-color: #c0392b;
        }
        .tab-excel-active {
          background: #27ae60 !important;
          border-color: #27ae60 !important;
        }
        .tab-bubble {
          background: #f39c12;
          color: white;
          font-size: 0.6875rem;
          padding: 1px 5px;
          border-radius: 8px;
        }
        .tab-bubble-red {
          background: #e74c3c;
        }

        /* Stats Grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        @media (min-width: 768px) {
          .admin-stats-grid { 
            grid-template-columns: repeat(4, 1fr); 
            gap: 12px;
            margin-bottom: 20px;
          }
        }
        .admin-metric-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }
        .metric-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .metric-lbl {
          font-size: 0.6875rem;
          color: var(--text-muted);
          display: block;
        }
        .metric-val {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 1px 0;
          color: var(--text);
        }
        .metric-note {
          font-size: 0.6875rem;
          color: var(--text-muted);
        }

        /* Quick Links Grid */
        .admin-quick-links-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .admin-quick-links-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .admin-quick-links-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }
        .shortcut-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .shortcut-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          border-color: #c0392b;
        }
        .sc-icon { font-size: 22px; margin-bottom: 6px; }
        .shortcut-box h4 { margin: 0 0 4px; font-size: 0.95rem; color: var(--text); }
        .shortcut-box p { margin: 0 0 8px; font-size: 0.75rem; color: var(--text-muted); line-height: 1.35; }
        .sc-arrow { font-size: 0.75rem; font-weight: 700; color: #c0392b; }

        /* Section Toolbar */
        .section-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .search-bar-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 200px;
        }
        .search-bar-wrap svg {
          position: absolute;
          left: 10px;
          color: var(--text-muted);
          width: 16px;
          height: 16px;
        }
        .search-bar-wrap input {
          width: 100%;
          padding: 8px 10px 8px 32px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 0.8125rem;
        }
        .btn-export-excel-action {
          background: #27ae60;
          color: white;
          border: none;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Admin Data Table */
        .admin-table-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow-x: auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
        }
        .admin-data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.75rem;
        }
        .admin-data-table th {
          background: var(--surface-2);
          padding: 8px 10px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          font-size: 0.72rem;
        }
        .admin-data-table td {
          padding: 8px 10px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .shop-title-name {
          font-size: 0.8125rem;
          color: var(--text);
          display: block;
        }
        .user-subtext {
          display: block;
          font-size: 0.6875rem;
          color: var(--text-muted);
        }
        .role-badge {
          font-size: 0.6875rem;
          font-weight: 800;
          padding: 2px 5px;
          border-radius: 4px;
        }
        .role-admin { background: #fdedec; color: #c0392b; }
        .role-vendor { background: #ebf5fb; color: #2980b9; }
        .role-customer { background: #f2f3f4; color: #7f8c8d; }

        .badge-verified {
          background: #eafaf1;
          color: #27ae60;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.6875rem;
        }
        .badge-unverified {
          background: #fef9e7;
          color: #d35400;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.6875rem;
        }
        .btn-approval-toggle {
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-approve { background: #27ae60; color: white; }
        .btn-unapprove { background: var(--surface-2); color: #c0392b; border: 1px solid var(--border); }

        .reg-badge {
          background: var(--bg);
          padding: 2px 5px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.6875rem;
          display: inline-block;
          margin-top: 2px;
        }
        .hub-tag {
          font-weight: 600;
          color: #c0392b;
        }
        .btn-resolve-ticket {
          background: #2c3e50;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
        }
        .resolved-check {
          color: #27ae60;
          font-weight: 700;
          font-size: 0.75rem;
        }
        .admin-reply-snippet {
          background: #f4fdf8;
          border-left: 2px solid #27ae60;
          padding: 3px 6px;
          font-size: 0.6875rem;
          margin-top: 3px;
        }

        /* Excel Center Grid */
        .admin-excel-center {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 14px;
        }
        .excel-center-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .excel-center-header h2 { margin: 0 0 2px; font-size: 1.05rem; }
        .excel-center-header p { margin: 0; font-size: 0.75rem; color: var(--text-muted); }
        .excel-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .excel-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .excel-download-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .ex-icon {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .card-top h4 { margin: 0 0 2px; font-size: 0.875rem; }
        .card-top small { color: var(--text-muted); font-size: 0.6875rem; }
        .excel-download-card p {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.35;
          margin: 0 0 12px;
        }
        .btn-download-csv {
          background: #27ae60;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.15s ease;
        }
        .btn-download-csv:hover { background: #219653; }

        /* 📢 Shop Ads Manager Styles */
        .tab-ads-active {
          background: #ff4757 !important;
          border-color: #ff4757 !important;
        }
        .btn-create-ad {
          background: #ff4757;
          color: white;
          border: none;
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 12px rgba(255, 71, 87, 0.25);
        }
        .btn-create-ad:hover { background: #e03646; }

        .ads-metrics-strip {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .ad-mini-stat {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ad-stat-val {
          font-size: 1.15rem;
          font-weight: 800;
        }
        .ad-stat-lbl {
          font-size: 0.6875rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .admin-ads-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .admin-ads-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .admin-ad-card-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 12px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ad-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ad-status-pill {
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .status-active { background: #eafaf1; color: #27ae60; }
        .status-paused { background: #f2f3f4; color: #7f8c8d; }
        .ad-featured-pill {
          background: #fef9e7;
          color: #f39c12;
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .ad-item-top-btns {
          display: flex;
          gap: 4px;
        }
        .btn-icon-ad {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-icon-ad:hover { background: var(--surface-2); }

        .ad-preview-box {
          border-radius: 10px;
          padding: 14px 12px;
          color: white;
        }
        .prev-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .prev-shop-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.6875rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 5px;
          border-radius: 4px;
        }
        .prev-offer-pill {
          color: white;
          font-size: 0.6875rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 10px;
        }
        .prev-shop-name {
          font-size: 0.95rem;
          font-weight: 800;
          margin: 0 0 2px;
          color: white;
        }
        .prev-tagline {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffc145;
          margin: 0 0 4px;
        }
        .prev-desc {
          font-size: 0.6875rem;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 6px;
          line-height: 1.3;
        }
        .prev-meta {
          font-size: 0.6875rem;
          color: rgba(255, 255, 255, 0.75);
          display: flex;
          gap: 8px;
        }

        .ad-manage-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 10px;
          font-size: 0.72rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 8px;
        }
        .ad-contact-info {
          display: flex;
          gap: 8px;
        }
        .btn-toggle-ad {
          border: none;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-toggle-active { background: #fdedec; color: #c0392b; }
        .btn-toggle-inactive { background: #eafaf1; color: #27ae60; }

        .no-ads-box {
          grid-column: 1 / -1;
          text-align: center;
          padding: 30px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          color: var(--text-muted);
          font-size: 0.8125rem;
        }

        /* Modern Ad Create / Edit Modal */
        .ad-modal-wide {
          max-width: 800px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 12px;
          padding: 18px 16px;
        }
        .ad-modal-header-styled {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 14px;
        }
        .btn-modal-close-icon {
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.15s ease;
        }
        .btn-modal-close-icon:hover {
          background: #fdedec;
          color: #c0392b;
          border-color: #c0392b;
        }
        .ad-modal-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .ad-modal-grid { grid-template-columns: 1fr; }
        }
        .ad-form-inputs .modal-field {
          margin-bottom: 10px;
        }
        .ad-form-inputs .modal-field label {
          display: block;
          font-size: 0.75rem; /* text-xs */
          font-weight: 700;
          color: var(--heading, #1e293b);
          margin-bottom: 4px;
        }
        .ad-form-inputs .modal-field input,
        .ad-form-inputs .modal-field textarea {
          width: 100%;
          background: var(--surface, #ffffff);
          border: 1.5px solid var(--border, #cbd5e1);
          border-radius: 6px;
          padding: 7px 10px;
          font-size: 0.8125rem;
          color: var(--text, #1e293b);
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .ad-form-inputs .modal-field input:focus,
        .ad-form-inputs .modal-field textarea:focus {
          border-color: #c0392b;
          box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.12);
        }
        .form-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 500px) {
          .form-row-2col { grid-template-columns: 1fr; }
        }
        .theme-pills-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 4px;
        }
        .theme-pill {
          color: white;
          border: 2px solid transparent;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.6875rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .btn-ad-preset {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-ad-preset:hover {
          background: var(--surface-2);
          border-color: #c0392b;
          color: #c0392b;
        }
        .theme-pill-selected {
          border-color: #ffffff;
          box-shadow: 0 0 0 2px #ff4757;
          transform: scale(1.05);
        }
        .modal-checkbox-row {
          margin-top: 10px;
          background: rgba(0,0,0,0.02);
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid var(--border);
        }
        .modal-checkbox-row label {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text);
        }
        .ad-modal-preview-col h4 {
          margin: 0 0 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--heading, #1e293b);
        }
        .ad-modal-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 14px;
          margin-top: 18px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ad-modal-right-btns {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .btn-ad-act-publish {
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.3);
          transition: all 0.2s ease;
        }
        .btn-ad-act-publish:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(192, 57, 43, 0.45);
        }
        .btn-ad-act-draft {
          background: var(--surface-2, #f1f5f9);
          border: 1.5px solid var(--border, #cbd5e1);
          color: var(--text, #334155);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.15s ease;
        }
        .btn-ad-act-draft:hover {
          background: #e2e8f0;
          border-color: #94a3b8;
          color: #0f172a;
        }
        .btn-ad-act-cancel {
          background: transparent;
          border: 1px solid var(--border, #cbd5e1);
          color: var(--text-muted, #64748b);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-ad-act-cancel:hover {
          background: var(--surface-2);
          color: var(--text);
        }
      `}</style>
    </div>
  );
}
