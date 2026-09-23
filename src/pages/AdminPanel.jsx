import React, { useState, useEffect, useRef } from "react";
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
  Bell,
  Send,
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
  Check,
  Upload,
  Camera,
  Loader2,
  Image as ImageIcon,
  BarChart3,
  Activity,
  Compass,
  Navigation,
  ExternalLink,
  Car,
  Bike,
  Truck,
  MessageCircle,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { 
  exportBookingsToExcel, 
  exportInvoicesToExcel, 
  exportUsersToExcel, 
  exportTicketsToExcel,
  exportMasterLinksToExcel
} from "../utils/excelExport";
import { getGoogleSheetUrl } from "../utils/googleSheets";
import { sendInAppNotification } from "../utils/notificationService";
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

const SAMPLE_ADMIN_SHOPS = [];

const SAMPLE_GLOBAL_BOOKINGS = [];
const SAMPLE_ADMIN_INVOICES = [];
const SAMPLE_ADMIN_TICKETS = [];

export function formatSafeDate(rawDate, fallback = "Recent") {
  if (!rawDate) return fallback;
  if (typeof rawDate === "string") {
    if (rawDate.includes("T")) return rawDate.split("T")[0];
    return rawDate;
  }
  if (typeof rawDate === "number") {
    try {
      return new Date(rawDate).toISOString().split("T")[0];
    } catch {
      return fallback;
    }
  }
  if (typeof rawDate === "object") {
    if (typeof rawDate.toDate === "function") {
      try {
        return rawDate.toDate().toISOString().split("T")[0];
      } catch {
        return fallback;
      }
    }
    if (typeof rawDate.seconds === "number") {
      try {
        return new Date(rawDate.seconds * 1000).toISOString().split("T")[0];
      } catch {
        return fallback;
      }
    }
    if (rawDate instanceof Date) {
      try {
        return rawDate.toISOString().split("T")[0];
      } catch {
        return fallback;
      }
    }
  }
  return fallback;
}

export function formatSafeText(val, fallback = "—") {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "object") {
    if (typeof val.seconds === "number" || typeof val.toDate === "function" || val instanceof Date) {
      return formatSafeDate(val, fallback);
    }
    return fallback;
  }
  return String(val);
}

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
  const navTabsRef = useRef(null);

  const scrollNavTabs = (direction) => {
    if (navTabsRef.current) {
      navTabsRef.current.scrollBy({
        left: direction === "left" ? -240 : 240,
        behavior: "smooth"
      });
    }
  };

  const handleTabsWheel = (e) => {
    if (navTabsRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        navTabsRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  // Admin Datasets State
  const [users, setUsers] = useState(SAMPLE_ADMIN_SHOPS);
  const [bookings, setBookings] = useState(SAMPLE_GLOBAL_BOOKINGS);
  const [invoices, setInvoices] = useState(SAMPLE_ADMIN_INVOICES);
  const [tickets, setTickets] = useState(SAMPLE_ADMIN_TICKETS);
  const [analyticsEvents, setAnalyticsEvents] = useState([]);
  const [trafficTimeframe, setTrafficTimeframe] = useState("7d"); // '7d' or '30d'
  const [trafficSearchTerm, setTrafficSearchTerm] = useState("");
  const [selectedShopFilter, setSelectedShopFilter] = useState("all");
  const [analyticsDataMode, setAnalyticsDataMode] = useState("real"); // 'real' (100% Live Firestore) or 'preview' (Demo Sample)
  const [analyticsSubTab, setAnalyticsSubTab] = useState("shops"); // 'shops' (Shop Traffic & Performance) or 'customers' (Customer Insights & Directory)
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [customerVehicleFilter, setCustomerVehicleFilter] = useState("all");

  // Shop Ads State
  const [ads, setAds] = useState(() => {
    try {
      const local = localStorage.getItem("tyresaathi_shop_ads");
      if (local) {
        const parsed = JSON.parse(local);
        const cleaned = parsed.filter(
          (a) => a.id !== "ad-01" && a.id !== "ad-02" && a.id !== "ad-03" && !a.shopName?.toLowerCase().includes("alignment") && !a.shopName?.toLowerCase().includes("star tyre")
        );
        return cleaned;
      }
      return [];
    } catch {
      return [];
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
    city: "Muzaffarpur",
    customCity: "",
    address: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    gradient: AD_THEMES[0].gradient,
    badgeColor: AD_THEMES[0].badgeColor,
    imageUrl: "",
    isActive: true,
    featured: true,
  });

  const [uploadingAdImage, setUploadingAdImage] = useState(false);

  // Upload Ad Photo / Poster Image
  const handleAdImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Kripya 5MB se chhota photo chunein!");
      return;
    }

    setUploadingAdImage(true);
    try {
      const storageRef = ref(storage, `shop_ads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setAdForm((prev) => ({ ...prev, imageUrl: downloadUrl }));
    } catch (err) {
      console.warn("Storage upload fallback to base64 Data URL:", err);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAdForm((prev) => ({ ...prev, imageUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingAdImage(false);
    }
  };

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

  // 🚀 App Version Control & Broadcast Notifications State
  const [versionControl, setVersionControl] = useState({
    latestVersion: "1.2.0",
    buildNumber: 5,
    downloadUrl: "https://github.com/tyresathi-sudo/tyresaathi/releases/latest/download/TyreSaathi.apk",
    releaseMessage: "TyreSaathi me live star ratings, instant booking notifications aur fast store search shuru!",
    highlights: [
      "⭐ Real-Time Customer Star Ratings & Review System",
      "🔔 Live In-App Notifications for Bookings & Store Actions",
      "🚀 Fast Store Directions & Nearest Tyre Hubs Finder",
      "📊 Live Analytics & Google Sheet Auto-Sync"
    ],
    forceUpdate: false // false = allows 'Baad Me Karein (Skip)'
  });
  const [versionSuccessMsg, setVersionSuccessMsg] = useState("");
  const [savingVersion, setSavingVersion] = useState(false);
  const [newHighlightText, setNewHighlightText] = useState("");

  const handleAddHighlight = () => {
    if (!newHighlightText.trim()) return;
    setVersionControl((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), newHighlightText.trim()]
    }));
    setNewHighlightText("");
  };

  const handleRemoveHighlight = (index) => {
    setVersionControl((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleSaveVersionControl = async (e) => {
    if (e) e.preventDefault();
    setSavingVersion(true);
    try {
      await setDoc(doc(db, "app_settings", "version_control"), versionControl, { merge: true });
      setVersionSuccessMsg("✅ Naya App Version & Update Notification Firestore me live save ho gaya hai! Sabhi purane app users ko update prompt jayega.");
      setTimeout(() => setVersionSuccessMsg(""), 6000);
    } catch (err) {
      alert("Version update error: " + err.message);
    } finally {
      setSavingVersion(false);
    }
  };

  // 📢 Broadcast Alert Form State
  const [broadcastForm, setBroadcastForm] = useState({
    title: "⭐ TyreSaathi Live Update & Star Reviews",
    message: "TyreSaathi par apne pasandida shop ko star rating dein aur naye live updates check karein!",
    type: "announcement",
    targetRole: "all"
  });
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastSuccessMsg, setBroadcastSuccessMsg] = useState("");

  const handleSendBroadcast = async (e) => {
    if (e) e.preventDefault();
    if (!broadcastForm.title.trim() || !broadcastForm.message.trim()) {
      alert("Kripya title aur message zaroor bharein!");
      return;
    }
    setBroadcasting(true);
    try {
      await sendInAppNotification({
        recipientId: broadcastForm.targetRole === "all" ? "all" : broadcastForm.targetRole,
        title: broadcastForm.title,
        message: broadcastForm.message,
        type: broadcastForm.type,
        link: broadcastForm.type === "star_rating" ? "/stores" : (broadcastForm.type === "booking" ? "/bookings" : "/")
      });
      setBroadcastSuccessMsg(`✅ Broadcast notification successfully bhej diya gaya! (${broadcastForm.targetRole.toUpperCase()})`);
      setTimeout(() => setBroadcastSuccessMsg(""), 5000);
    } catch (err) {
      alert("Broadcast error: " + err.message);
    } finally {
      setBroadcasting(false);
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

      try {
        const anSnap = await getDocs(collection(db, "shop_analytics_events"));
        if (!anSnap.empty) {
          setAnalyticsEvents(anSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } else {
          const local = localStorage.getItem("tyresaathi_analytics_events");
          if (local) setAnalyticsEvents(JSON.parse(local));
        }
      } catch (err) {
        const local = localStorage.getItem("tyresaathi_analytics_events");
        if (local) setAnalyticsEvents(JSON.parse(local));
      }

      try {
        const appSetSnap = await getDocs(collection(db, "app_settings"));
        appSetSnap.forEach((d) => {
          if (d.id === "version_control") {
            const data = d.data();
            setVersionControl((prev) => ({
              ...prev,
              ...data,
              highlights: Array.isArray(data.highlights) ? data.highlights : prev.highlights
            }));
          }
        });
      } catch (e) {
        console.warn("Firestore app_settings load:", e);
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

  // Toggle Ad Active / Inactive & Auto-extend if expired
  const handleToggleAdStatus = async (id) => {
    const today = new Date().toISOString().split("T")[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    let targetUpdatedAd = null;

    setAds((prev) => {
      const updated = prev.map((a) => {
        if (a.id === id) {
          const nextActive = a.isActive === false ? true : false;
          let newStartDate = a.startDate || today;
          let newEndDate = a.endDate;

          // If turning active and date is expired or in the past, auto-extend to +30 days
          if (nextActive) {
            if (!newEndDate || newEndDate < today) {
              newStartDate = today;
              newEndDate = nextMonth;
            }
          }

          const modified = {
            ...a,
            isActive: nextActive,
            startDate: newStartDate,
            endDate: newEndDate,
          };
          targetUpdatedAd = modified;
          return modified;
        }
        return a;
      });

      localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("tyresaathi_ads_updated", { detail: updated }));
      return updated;
    });

    if (targetUpdatedAd) {
      try {
        await setDoc(doc(db, "shop_ads", id), targetUpdatedAd, { merge: true });
      } catch (err) {
        console.warn("Firestore ad status sync notice:", err);
      }
    }
  };

  // Delete Ad
  const handleDeleteAd = async (id) => {
    if (window.confirm("Kya aap sach me is dukan ke ad ko delete karna chahte hain?")) {
      setAds((prev) => {
        const updated = prev.filter((a) => a.id !== id);
        localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("tyresaathi_ads_updated", { detail: updated }));
        return updated;
      });
      try {
        await deleteDoc(doc(db, "shop_ads", id));
      } catch (err) {
        console.warn("Firestore ad delete sync notice:", err);
      }
    }
  };

  // Open Create Ad Modal
  const handleOpenCreateAd = () => {
    setEditingAdId(null);
    const today = new Date().toISOString().split("T")[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    setAdForm({
      shopName: "",
      tagline: "",
      offerBadge: "🔥 20% OFF + FREE FITMENT",
      description: "",
      phone: "",
      whatsapp: "",
      city: "Muzaffarpur",
      customCity: "",
      address: "",
      startDate: today,
      endDate: nextMonth,
      gradient: AD_THEMES[0].gradient,
      badgeColor: AD_THEMES[0].badgeColor,
      imageUrl: "",
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
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
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
      city: isCityInList ? (ad.city || "Muzaffarpur") : "Other",
      customCity: !isCityInList ? (ad.city || "") : "",
      address: ad.address || "",
      startDate: ad.startDate || today,
      endDate: ad.endDate || (ad.endDate === "" ? "" : nextMonth),
      gradient: ad.gradient || AD_THEMES[0].gradient,
      badgeColor: ad.badgeColor || AD_THEMES[0].badgeColor,
      imageUrl: ad.imageUrl || "",
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
  const handleSaveAd = async (e, asDraft = false) => {
    if (e) e.preventDefault();
    if (!adForm.shopName.trim() || !adForm.tagline.trim()) {
      alert("Kripya Shop Name aur Offer Tagline zaroor bharein!");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const finalCity = adForm.city === "Other" 
      ? (adForm.customCity.trim() || "Local") 
      : adForm.city;

    const isActive = asDraft ? false : true;
    let startDate = adForm.startDate || today;
    let endDate = adForm.endDate;

    // If active and end date is expired, auto-extend to next month
    if (isActive && endDate && endDate < today) {
      endDate = nextMonth;
    }

    const payload = {
      ...adForm,
      city: finalCity,
      startDate,
      endDate,
      isActive,
    };

    let targetId = editingAdId;
    let targetAd = null;

    if (editingAdId) {
      setAds((prev) => {
        const updated = prev.map((a) => {
          if (a.id === editingAdId) {
            targetAd = { ...a, ...payload };
            return targetAd;
          }
          return a;
        });
        localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("tyresaathi_ads_updated", { detail: updated }));
        return updated;
      });
    } else {
      targetId = `ad-${Date.now()}`;
      const newAdItem = {
        id: targetId,
        ...payload,
        views: 0,
        clicks: 0,
        createdAt: today,
      };
      targetAd = newAdItem;
      setAds((prev) => {
        const updated = [newAdItem, ...prev];
        localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent("tyresaathi_ads_updated", { detail: updated }));
        return updated;
      });
    }

    setAdModalOpen(false);

    if (targetId && targetAd) {
      try {
        await setDoc(doc(db, "shop_ads", targetId), targetAd, { merge: true });
      } catch (err) {
        console.warn("Firestore ad save sync notice:", err);
      }
    }
  };

  // Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.grandTotal || 0), 0);
  const totalShops = users.filter((u) => u.role === "vendor" || u.role === "admin").length;
  const pendingApprovals = users.filter((u) => u.role === "vendor" && !u.shopApproved).length;
  const openTickets = tickets.filter((t) => t.status === "open").length;
  const activeAdsCount = ads.filter((a) => a.isActive !== false).length;

  // 📊 Shop-Wise & Customer Analytics Calculations
  const isRealMode = analyticsDataMode === "real";
  const rawShops = users.filter((u) => u.role === "vendor" || u.role === "shop_owner" || u.role === "admin" || u.shopName);
  const baseShops = rawShops.length > 0 ? rawShops : [
    { uid: "shop_1", shopName: "Bharat super tyre", city: "Raipur", phone: "8877277757", rating: 4.9 },
    { uid: "shop_2", shopName: "Tyre Saathi Partner Hub", city: "Raipur", phone: "8877277757", rating: 4.9 },
    { uid: "shop_3", shopName: "R k tyre repairing shop", city: "Raipur", phone: "8877277757", rating: 4.8 },
  ];

  const shopTrafficList = baseShops.map((shop, idx) => {
    const sName = (shop.shopName || shop.name || "").toLowerCase();
    const sId = shop.uid || shop.id || `shop_${idx}`;

    const shopEvents = analyticsEvents.filter((ev) => {
      const evShopName = (ev.metadata?.shopName || "").toLowerCase();
      const evShopId = ev.metadata?.shopId;
      return (sId && evShopId === sId) || (sName && evShopName && (evShopName.includes(sName) || sName.includes(evShopName)));
    });

    const shopBookings = bookings.filter((b) => {
      const bShopName = (b.shopName || "").toLowerCase();
      const bShopId = b.shopId;
      return (sId && bShopId === sId) || (sName && bShopName && (bShopName.includes(sName) || sName.includes(bShopName)));
    });

    const realViews = shopEvents.filter((e) => e.type === "view").length;
    const realMaps = shopEvents.filter((e) => e.type === "map_direction").length;
    const realCalls = shopEvents.filter((e) => e.type === "call_lead").length;
    const realBookingsCount = shopBookings.length;

    // In Real Mode: strictly use real database numbers; In Preview Mode: provide illustrative baseline
    const views = isRealMode ? realViews : (realViews || (18 + (idx === 0 ? 46 : (idx === 1 ? 28 : (idx === 2 ? 14 : 6)))));
    const mapClicks = isRealMode ? realMaps : (realMaps || (6 + (idx === 0 ? 19 : (idx === 1 ? 12 : (idx === 2 ? 5 : 2)))));
    const callLeads = isRealMode ? realCalls : (realCalls || (4 + (idx === 0 ? 15 : (idx === 1 ? 8 : (idx === 2 ? 3 : 1)))));
    const bookingsCount = isRealMode ? realBookingsCount : (realBookingsCount || (idx === 0 ? 8 : (idx === 1 ? 4 : (idx === 2 ? 2 : 1))));

    const totalInteractions = views + mapClicks + callLeads + bookingsCount;
    const trafficScore = views * 1 + mapClicks * 3 + callLeads * 4 + bookingsCount * 8;

    return {
      id: sId,
      name: shop.shopName || shop.name || "Partner Hub",
      owner: shop.name || "Shop Partner",
      city: shop.city || "Raipur",
      phone: shop.phone || "8877277757",
      views,
      mapClicks,
      callLeads,
      bookingsCount,
      totalInteractions,
      trafficScore,
      rating: shop.rating || 4.9,
    };
  });

  // Sort shops by highest traffic score descending
  shopTrafficList.sort((a, b) => b.trafficScore - a.trafficScore);

  const totalNetworkViews = shopTrafficList.reduce((acc, s) => acc + s.views, 0);
  const totalNetworkMaps = shopTrafficList.reduce((acc, s) => acc + s.mapClicks, 0);
  const totalNetworkCalls = shopTrafficList.reduce((acc, s) => acc + s.callLeads, 0);
  const totalNetworkBookings = shopTrafficList.reduce((acc, s) => acc + s.bookingsCount, 0);
  const totalNetworkInteractions = shopTrafficList.reduce((acc, s) => acc + s.totalInteractions, 0) || (isRealMode ? 0 : 1);

  const topTrafficShop = shopTrafficList[0] || { name: "Bharat super tyre", city: "Raipur", totalInteractions: 0 };
  const maxShopTraffic = Math.max(...shopTrafficList.map((s) => s.totalInteractions), 1);

  // Generate daily points for network traffic trend curve
  const daysCount = trafficTimeframe === "7d" ? 7 : 30;
  const trafficDailyPoints = [];
  const todayDate = new Date();
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayEvents = analyticsEvents.filter((e) => (e.dateStr || e.timestamp?.split("T")[0]) === dateStr);
    const dayBookings = bookings.filter((b) => (b.date || b.createdAt?.split("T")[0]) === dateStr);
    const dayTotal = dayEvents.length + dayBookings.length;
    const valueToShow = isRealMode ? dayTotal : Math.max(dayTotal, Math.round(14 + Math.sin(i * 1.3) * 6 + (daysCount - i) * 2));
    trafficDailyPoints.push({
      dateStr,
      label: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      val: valueToShow,
    });
  }

  const trafficChartMax = Math.max(...trafficDailyPoints.map((p) => p.val), 5);
  const trafficChartPoints = trafficDailyPoints.map((p, idx) => {
    const x = 40 + (idx / Math.max(trafficDailyPoints.length - 1, 1)) * (540 - 80);
    const y = 170 - 25 - (p.val / trafficChartMax) * (170 - 55);
    return { x, y, val: p.val, label: p.label, dateStr: p.dateStr };
  });

  const trafficPathD = trafficChartPoints.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const trafficAreaD = trafficChartPoints.length > 0
    ? `${trafficPathD} L ${trafficChartPoints[trafficChartPoints.length - 1].x},155 L ${trafficChartPoints[0].x},155 Z`
    : "";

  const filteredTrafficShops = shopTrafficList.filter((s) => {
    if (!trafficSearchTerm.trim()) return true;
    const q = trafficSearchTerm.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.owner.toLowerCase().includes(q);
  });

  // 👥 CUSTOMER DATA & DIRECTORY AGGREGATION
  const customerMap = new Map();

  // 1. From Users collection (Customers)
  users.forEach((u) => {
    const isCustomer = u.role === "customer" || (!u.shopName && u.role !== "admin" && u.role !== "vendor" && u.role !== "shop_owner");
    if (isCustomer) {
      const safePhone = formatSafeText(u.phone, "");
      const safeEmail = formatSafeText(u.email, "");
      const key = (safePhone || safeEmail || u.uid || "").trim().toLowerCase();
      if (!key) return;
      customerMap.set(key, {
        id: u.uid || key,
        name: formatSafeText(u.name, "Registered Customer"),
        email: formatSafeText(u.email, "—"),
        phone: formatSafeText(u.phone, "—"),
        city: formatSafeText(u.city, "Raipur"),
        address: formatSafeText(u.address, "—"),
        vehicleType: formatSafeText(u.vehicleType, "Car / SUV"),
        vehicleNumber: formatSafeText(u.vehicleNumber, "—"),
        vehicleModel: formatSafeText(u.vehicleModel || u.carModel, ""),
        createdAt: formatSafeDate(u.createdAt, "Recent"),
        totalBookings: 0,
        totalSpent: 0,
        lastActive: formatSafeDate(u.createdAt || u.lastLogin, "Active"),
        source: "Registered User",
      });
    }
  });

  // 2. From Bookings collection
  bookings.forEach((b) => {
    const safePhone = formatSafeText(b.customerPhone, "");
    const safeEmail = formatSafeText(b.customerEmail, "");
    const safeName = formatSafeText(b.customerName, "");
    const key = (safePhone || safeEmail || safeName || "").trim().toLowerCase();
    if (!key) return;

    const bDate = formatSafeDate(b.date || b.createdAt, "Recent");

    if (customerMap.has(key)) {
      const c = customerMap.get(key);
      c.totalBookings += 1;
      c.totalSpent += Number(b.price) || 0;
      if (safeName && c.name === "Registered Customer") c.name = safeName;
      if (b.vehicleType && (!c.vehicleType || c.vehicleType === "Car / SUV")) c.vehicleType = formatSafeText(b.vehicleType, "Car / SUV");
      if (b.vehicleNumber && (!c.vehicleNumber || c.vehicleNumber === "—")) c.vehicleNumber = formatSafeText(b.vehicleNumber, "—");
      if (bDate) c.lastActive = bDate;
    } else {
      customerMap.set(key, {
        id: b.id || key,
        name: safeName || "Customer",
        email: safeEmail || "—",
        phone: safePhone || "—",
        city: formatSafeText(b.city, "Raipur"),
        address: formatSafeText(b.address, "—"),
        vehicleType: formatSafeText(b.vehicleType, "Car / SUV"),
        vehicleNumber: formatSafeText(b.vehicleNumber, "—"),
        vehicleModel: formatSafeText(b.vehicleModel, ""),
        createdAt: bDate,
        totalBookings: 1,
        totalSpent: Number(b.price) || 0,
        lastActive: bDate,
        source: "Service Booking",
      });
    }
  });

  // 3. From Invoices collection
  invoices.forEach((inv) => {
    const safePhone = formatSafeText(inv.customerPhone, "");
    const safeName = formatSafeText(inv.customerName, "");
    const key = (safePhone || safeName || "").trim().toLowerCase();
    if (!key) return;

    const invDate = formatSafeDate(inv.createdAt, "Recent");

    if (customerMap.has(key)) {
      const c = customerMap.get(key);
      c.totalSpent += Number(inv.grandTotal) || 0;
      if (safeName && (!c.name || c.name === "Customer")) c.name = safeName;
      if (inv.vehicleNumber && (!c.vehicleNumber || c.vehicleNumber === "—")) c.vehicleNumber = formatSafeText(inv.vehicleNumber, "—");
      if (inv.vehicleName && (!c.vehicleModel || c.vehicleModel === "")) c.vehicleModel = formatSafeText(inv.vehicleName, "");
      if (invDate) c.lastActive = invDate;
    } else {
      customerMap.set(key, {
        id: inv.id || key,
        name: safeName || "Customer",
        email: "—",
        phone: safePhone || "—",
        city: formatSafeText(inv.customerCity, "Raipur"),
        address: formatSafeText(inv.customerAddress, "—"),
        vehicleType: formatSafeText(inv.vehicleType, "Car / SUV"),
        vehicleNumber: formatSafeText(inv.vehicleNumber, "—"),
        vehicleModel: formatSafeText(inv.vehicleName, ""),
        createdAt: invDate,
        totalBookings: 1,
        totalSpent: Number(inv.grandTotal) || 0,
        lastActive: invDate,
        source: "In-Store Billing",
      });
    }
  });

  let rawCustomerList = Array.from(customerMap.values());

  // If real database is empty and preview mode is on, provide helpful preview sample customers
  if (rawCustomerList.length === 0 && !isRealMode) {
    rawCustomerList = [
      { id: "c_1", name: "Rahul Sharma", phone: "9826112345", email: "rahul.sharma@gmail.com", city: "Raipur", vehicleType: "Car / SUV", vehicleNumber: "CG 04 MB 1234", vehicleModel: "Hyundai Creta", totalBookings: 3, totalSpent: 4500, lastActive: "2026-09-22", source: "Registered Customer" },
      { id: "c_2", name: "Vikram Verma", phone: "9425298765", email: "vikram.verma@yahoo.com", city: "Bhilai", vehicleType: "Commercial / Truck", vehicleNumber: "CG 07 CA 9081", vehicleModel: "Tata 407", totalBookings: 5, totalSpent: 18200, lastActive: "2026-09-23", source: "Service Booking" },
      { id: "c_3", name: "Amit Patel", phone: "9755567890", email: "amit.patel@gmail.com", city: "Bilaspur", vehicleType: "Bike / Scooter", vehicleNumber: "CG 10 AB 4567", vehicleModel: "Honda Activa 6G", totalBookings: 2, totalSpent: 1200, lastActive: "2026-09-20", source: "In-Store Billing" },
      { id: "c_4", name: "Suresh Sahu", phone: "9131012456", email: "suresh.sahu@gmail.com", city: "Raipur", vehicleType: "Tractor / Agri", vehicleNumber: "CG 04 TR 5521", vehicleModel: "Mahindra 575 DI", totalBookings: 1, totalSpent: 14500, lastActive: "2026-09-18", source: "Service Booking" },
      { id: "c_5", name: "Pooja Deshmukh", phone: "8878901234", email: "pooja.d@outlook.com", city: "Durg", vehicleType: "Car / SUV", vehicleNumber: "CG 07 KT 7788", vehicleModel: "Maruti Swift", totalBookings: 2, totalSpent: 2800, lastActive: "2026-09-21", source: "Registered Customer" },
    ];
  }

  const totalRegisteredCustomers = rawCustomerList.length;
  const activeBookerCustomers = rawCustomerList.filter((c) => c.totalBookings > 0).length;
  const totalCustomerSpend = rawCustomerList.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
  const returningCustomers = rawCustomerList.filter((c) => c.totalBookings > 1).length;

  // Vehicle Breakdown Counts
  const vehicleDistribution = {
    car: rawCustomerList.filter((c) => (c.vehicleType || "").toLowerCase().includes("car") || (c.vehicleType || "").toLowerCase().includes("suv")).length,
    bike: rawCustomerList.filter((c) => (c.vehicleType || "").toLowerCase().includes("bike") || (c.vehicleType || "").toLowerCase().includes("scooter") || (c.vehicleType || "").toLowerCase().includes("2")).length,
    commercial: rawCustomerList.filter((c) => (c.vehicleType || "").toLowerCase().includes("truck") || (c.vehicleType || "").toLowerCase().includes("commercial") || (c.vehicleType || "").toLowerCase().includes("bus")).length,
    tractor: rawCustomerList.filter((c) => (c.vehicleType || "").toLowerCase().includes("tractor") || (c.vehicleType || "").toLowerCase().includes("agri")).length,
  };
  const totalVehiclesCount = Object.values(vehicleDistribution).reduce((a, b) => a + b, 0) || 1;

  const filteredCustomerList = rawCustomerList.filter((c) => {
    const q = customerSearchTerm.toLowerCase().trim();
    const matchSearch = !q || (
      (c.name || "").toLowerCase().includes(q) ||
      (c.phone || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.city || "").toLowerCase().includes(q) ||
      (c.vehicleNumber || "").toLowerCase().includes(q) ||
      (c.vehicleModel || "").toLowerCase().includes(q)
    );

    const matchVehicle =
      customerVehicleFilter === "all" ||
      (customerVehicleFilter === "car" && ((c.vehicleType || "").toLowerCase().includes("car") || (c.vehicleType || "").toLowerCase().includes("suv"))) ||
      (customerVehicleFilter === "bike" && ((c.vehicleType || "").toLowerCase().includes("bike") || (c.vehicleType || "").toLowerCase().includes("scooter") || (c.vehicleType || "").toLowerCase().includes("2"))) ||
      (customerVehicleFilter === "commercial" && ((c.vehicleType || "").toLowerCase().includes("truck") || (c.vehicleType || "").toLowerCase().includes("commercial"))) ||
      (customerVehicleFilter === "tractor" && ((c.vehicleType || "").toLowerCase().includes("tractor") || (c.vehicleType || "").toLowerCase().includes("agri")));

    return matchSearch && matchVehicle;
  });

  // Shop Ads Filtered List
  const filteredAds = ads.filter((ad) => {
    if (!adSearchTerm.trim()) return true;
    const q = adSearchTerm.toLowerCase();
    return (
      (ad.shopName || "").toLowerCase().includes(q) ||
      (ad.city || "").toLowerCase().includes(q) ||
      (ad.offerBadge || "").toLowerCase().includes(q) ||
      (ad.description || "").toLowerCase().includes(q) ||
      (ad.tagline || "").toLowerCase().includes(q)
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

      {/* 🧭 Admin Navigation Tabs (Scrollable & Slidable) */}
      <div className="admin-nav-tabs-wrapper">
        <button
          type="button"
          className="nav-tabs-arrow-btn arrow-left"
          onClick={() => scrollNavTabs("left")}
          title="Scroll Left (बाएं सरकाएं)"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          className="admin-nav-tabs"
          ref={navTabsRef}
          onWheel={handleTabsWheel}
        >
          <button
            className={`admin-tab ${activeTab === "overview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <TrendingUp size={16} /> Overview
          </button>

          <button
            className={`admin-tab ${activeTab === "traffic" ? "tab-active tab-traffic-active" : ""}`}
            onClick={() => setActiveTab("traffic")}
          >
            <BarChart3 size={16} /> 📊 Traffic & Graphs
            <span className="tab-bubble" style={{ background: "#e67e22" }}>🔥 Real-Time</span>
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

          <button
            className={`admin-tab ${activeTab === "updates" ? "tab-active tab-updates-active" : ""}`}
            onClick={() => setActiveTab("updates")}
          >
            <Bell size={16} /> 🔔 App Updates & Notifications
            <span className="tab-bubble" style={{ background: "#8e44ad" }}>Live Push</span>
          </button>
        </div>

        <button
          type="button"
          className="nav-tabs-arrow-btn arrow-right"
          onClick={() => scrollNavTabs("right")}
          title="Scroll Right (दाएं सरकाएं)"
        >
          <ChevronRight size={16} />
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
            <div className="shortcut-box" onClick={() => setActiveTab("traffic")} style={{ borderLeft: "4px solid #e67e22" }}>
              <div className="sc-icon">📊</div>
              <h4>Shop Traffic & Customer Graphs</h4>
              <p>Check karein kis dukan par sabse zyada customer traffic, views aur bookings hain (Live Visual Graphs).</p>
              <span className="sc-arrow" style={{ color: "#e67e22", fontWeight: 700 }}>Open Traffic Graphs →</span>
            </div>

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
          TAB 1.5: 📈 SHOP TRAFFIC & CUSTOMER ANALYTICS (VISUAL GRAPHS)
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "traffic" && (
        <div className="admin-traffic-analytics-container">
          {/* Top Traffic Header & Controls */}
          <div className="traffic-banner-header">
            <div className="traffic-banner-left">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                <span className="traffic-badge-pill">
                  <BarChart3 size={14} /> PLATFORM ANALYTICS SUITE
                </span>

                {/* 🔴 Real Database vs Preview Indicator & Toggle */}
                <button
                  type="button"
                  className={`data-mode-toggle-btn ${isRealMode ? "mode-real-active" : "mode-preview-active"}`}
                  onClick={() => setAnalyticsDataMode(isRealMode ? "preview" : "real")}
                  title="Click to toggle between 100% Real Live Database Data and Demo Preview Simulation"
                >
                  <span className={`status-dot ${isRealMode ? "dot-live-pulse" : "dot-demo"}`} />
                  {isRealMode ? "🟢 100% Live Real Database" : "✨ Sample Demo Preview"}
                  <span className="mode-switch-hint">({isRealMode ? "Click for Preview" : "Click for Live Real Data"})</span>
                </button>
              </div>

              <h2 className="traffic-title">
                {analyticsSubTab === "shops" 
                  ? "🏪 Shop Traffic & Store Analytics (दुकानों का ट्रैफिक)" 
                  : "👥 Customer Insights & Directory (ग्राहकों का डेटा और विश्लेषण)"}
              </h2>
              <p className="traffic-desc">
                {analyticsSubTab === "shops"
                  ? "देखें किस दुकान पर ग्राहक सबसे ज़्यादा आ रहे हैं, किसका मैप खोला गया और कहाँ से कॉल्स व बुकिंग्स हो रही हैं।"
                  : "प्लेटफॉर्म के सभी रजिस्टर्ड व बुकिंग कराने वाले ग्राहकों का पूरा डेटा, गाड़ियाँ, संपर्क, बुकिंग इतिहास व खर्च विवरण।"}
              </p>
            </div>

            <div className="traffic-timeframe-controls">
              <div className="timeframe-pill-toggle">
                <button
                  className={`tf-btn ${trafficTimeframe === "7d" ? "tf-btn-active" : ""}`}
                  onClick={() => setTrafficTimeframe("7d")}
                >
                  Last 7 Days
                </button>
                <button
                  className={`tf-btn ${trafficTimeframe === "30d" ? "tf-btn-active" : ""}`}
                  onClick={() => setTrafficTimeframe("30d")}
                >
                  Last 30 Days
                </button>
              </div>

              <Link to="/store-location" className="btn-view-stores-map" title="View Stores Live">
                <Compass size={15} /> Store Locator
              </Link>
            </div>
          </div>

          {/* 🔀 TWO DEDICATED SUB-TABS (Shops vs Customers) */}
          <div className="analytics-subnav-row">
            <button
              className={`subnav-pill ${analyticsSubTab === "shops" ? "subnav-pill-active subnav-shops-active" : ""}`}
              onClick={() => setAnalyticsSubTab("shops")}
            >
              <Store size={18} />
              <span>🏪 Shop Traffic & Store Leaderboard (दुकानों का ट्रैफिक)</span>
              <span className="subnav-badge">{shopTrafficList.length} Shops</span>
            </button>

            <button
              className={`subnav-pill ${analyticsSubTab === "customers" ? "subnav-pill-active subnav-customers-active" : ""}`}
              onClick={() => setAnalyticsSubTab("customers")}
            >
              <Users size={18} />
              <span>👥 Customer Insights & Directory (ग्राहकों का डेटा)</span>
              <span className="subnav-badge" style={{ background: "#2563eb" }}>{totalRegisteredCustomers} Customers</span>
            </button>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              SUB-TAB A: 🏪 SHOP TRAFFIC & LEADERBOARD
          ══════════════════════════════════════════════════════════════════ */}
          {analyticsSubTab === "shops" && (
            <>
              {/* 5 High-Impact KPI Metric Cards */}
              <div className="traffic-kpi-grid">
                <div className="traffic-kpi-card">
                  <div className="kpi-icon-wrap" style={{ background: "rgba(59, 130, 246, 0.12)", color: "#2563eb" }}>
                    <Eye size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Total Store Views</span>
                    <h3 className="kpi-value">{totalNetworkViews.toLocaleString()}</h3>
                    <small className="kpi-subtext">👁️ Customer visits on shop pages</small>
                  </div>
                </div>

                <div className="traffic-kpi-card">
                  <div className="kpi-icon-wrap" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#16a34a" }}>
                    <Navigation size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Map Route Directions</span>
                    <h3 className="kpi-value">{totalNetworkMaps.toLocaleString()}</h3>
                    <small className="kpi-subtext">📍 Customers navigating to shops</small>
                  </div>
                </div>

                <div className="traffic-kpi-card">
                  <div className="kpi-icon-wrap" style={{ background: "rgba(245, 158, 11, 0.12)", color: "#d97706" }}>
                    <Phone size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Direct Phone Calls</span>
                    <h3 className="kpi-value">{totalNetworkCalls.toLocaleString()}</h3>
                    <small className="kpi-subtext">📞 Call inquiries from customers</small>
                  </div>
                </div>

                <div className="traffic-kpi-card">
                  <div className="kpi-icon-wrap" style={{ background: "rgba(239, 68, 68, 0.12)", color: "#dc2626" }}>
                    <Calendar size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Total Service Bookings</span>
                    <h3 className="kpi-value">{totalNetworkBookings.toLocaleString()}</h3>
                    <small className="kpi-subtext">🚗 Confirmed service appointments</small>
                  </div>
                </div>

                <div className="traffic-kpi-card highlight-leader-kpi">
                  <div className="kpi-icon-wrap" style={{ background: "rgba(230, 126, 34, 0.15)", color: "#e67e22" }}>
                    <Flame size={24} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label" style={{ color: "#d35400" }}>🔥 #1 Top Traffic Hub</span>
                    <h3 className="kpi-value" style={{ fontSize: "17px", color: "#c0392b" }}>{topTrafficShop.name}</h3>
                    <small className="kpi-subtext">{topTrafficShop.city} • {topTrafficShop.totalInteractions} Interactions</small>
                  </div>
                </div>
              </div>

              {/* 📊 Visual Graph Section (2 Columns: Bar Comparison & Trend Curve) */}
              <div className="traffic-charts-two-col">
                {/* Chart 1: Shop Traffic Comparison Bar Graph */}
                <div className="chart-card-box">
                  <div className="chart-card-header">
                    <div>
                      <h3 className="chart-box-title">📊 Shop Traffic Comparison (दुकान अनुसार ट्रैफिक तुलना)</h3>
                      <p className="chart-box-subtitle">
                        नीचे दिए गए विज़ुअल बार से देखें किस दुकान को कितने ग्राहक, मैप क्लिक्स व कॉल्स मिले हैं:
                      </p>
                    </div>
                    <span className="chart-pill-tag">Ranked by Traffic</span>
                  </div>

                  <div className="shop-bars-container">
                    {shopTrafficList.map((shop, idx) => {
                      const percent = Math.round((shop.totalInteractions / maxShopTraffic) * 100) || (isRealMode && shop.totalInteractions === 0 ? 0 : 5);
                      const networkShare = totalNetworkInteractions > 0 ? Math.round((shop.totalInteractions / totalNetworkInteractions) * 100) : 0;
                      const isFirst = idx === 0 && shop.totalInteractions > 0;

                      return (
                        <div key={shop.id} className={`shop-bar-row ${isFirst ? "bar-row-leader" : ""}`}>
                          <div className="shop-bar-top-info">
                            <div className="shop-rank-name">
                              <span className={`rank-badge-circle ${isFirst ? "rank-gold" : idx === 1 ? "rank-silver" : idx === 2 ? "rank-bronze" : "rank-norm"}`}>
                                {isFirst ? "🏆 #1" : `#${idx + 1}`}
                              </span>
                              <strong className="shop-title-link">{shop.name}</strong>
                              <span className="shop-city-chip">{shop.city}</span>
                              {isFirst && <span className="top-badge-flame">🔥 Most Visited Hub</span>}
                            </div>

                            <div className="shop-metrics-mini-chips">
                              <span className="mini-chip chip-views" title="Store Views">👁️ {shop.views}</span>
                              <span className="mini-chip chip-maps" title="Map Directions">📍 {shop.mapClicks}</span>
                              <span className="mini-chip chip-calls" title="Calls">📞 {shop.callLeads}</span>
                              <span className="mini-chip chip-bookings" title="Bookings">🚗 {shop.bookingsCount}</span>
                              <span className="mini-chip chip-total" title="Total Traffic Score"><strong>{shop.totalInteractions} Total</strong> ({networkShare}%)</span>
                            </div>
                          </div>

                          {/* Glowing Multi-Segment Progress Bar */}
                          <div className="bar-track">
                            <div
                              className="bar-fill-gradient"
                              style={{
                                width: `${Math.max(percent, isRealMode && shop.totalInteractions === 0 ? 0 : 3)}%`,
                                background: isFirst
                                  ? "linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)"
                                  : idx === 1
                                  ? "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)"
                                  : "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)",
                              }}
                            >
                              <span className="bar-glow-tail" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart 2: Network Customer Daily Trend Curve */}
                <div className="chart-card-box">
                  <div className="chart-card-header">
                    <div>
                      <h3 className="chart-box-title">📈 Customer Visits Trend Curve (ट्रैफिक ग्राफ़)</h3>
                      <p className="chart-box-subtitle">
                        नेटवर्क पर ग्राहकों की दैनिक विज़िट और एक्टिविटी की ग्रोथ ({trafficTimeframe === "7d" ? "पिछले 7 दिन" : "पिछले 30 दिन"}):
                      </p>
                    </div>
                    <span className="chart-pill-tag">Timeline Curve</span>
                  </div>

                  <div className="svg-chart-container">
                    <svg viewBox="0 0 550 170" className="trend-svg-canvas">
                      <defs>
                        <linearGradient id="adminTrafficGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#c0392b" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#c0392b" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="35" y1="35" x2="515" y2="35" stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
                      <line x1="35" y1="85" x2="515" y2="85" stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
                      <line x1="35" y1="135" x2="515" y2="135" stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />

                      {/* Filled Area */}
                      {trafficAreaD && <path d={trafficAreaD} fill="url(#adminTrafficGrad)" />}

                      {/* Main Thin Curve Line */}
                      {trafficPathD && (
                        <path
                          d={trafficPathD}
                          fill="none"
                          stroke="#c0392b"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Point Dots */}
                      {trafficChartPoints.map((pt, i) => {
                        const shouldShowDate =
                          trafficChartPoints.length <= 8 ||
                          i % Math.ceil(trafficChartPoints.length / 6) === 0 ||
                          i === trafficChartPoints.length - 1;
                        const shouldShowVal =
                          trafficChartPoints.length <= 8 ||
                          (pt.val > 0 && (pt.val >= trafficChartMax * 0.25 || trafficChartPoints.length <= 14));

                        return (
                          <g key={i} className="chart-point-group">
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={pt.val > 0 ? "3.5" : "2.5"}
                              fill="#c0392b"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                            {shouldShowVal && (
                              <text x={pt.x} y={pt.y - 8} textAnchor="middle" fill="var(--text, #1e293b)" fontSize="9.5" fontWeight="700">
                                {pt.val}
                              </text>
                            )}
                            {shouldShowDate && (
                              <>
                                <line x1={pt.x} y1="148" x2={pt.x} y2="153" stroke="#cbd5e1" strokeWidth="1" />
                                <text x={pt.x} y="165" textAnchor="middle" fill="var(--text-muted, #64748b)" fontSize="9.5" fontWeight="600">
                                  {pt.label}
                                </text>
                              </>
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Action Distribution Breakdown */}
                  <div className="action-distribution-wrap">
                    <h4 className="dist-title">Customer Interaction Breakdown:</h4>
                    <div className="dist-bars-row">
                      <div className="dist-item">
                        <span className="dist-dot dot-views" />
                        <span>Views: <strong>{totalNetworkInteractions > 0 ? Math.round((totalNetworkViews / totalNetworkInteractions) * 100) : 0}%</strong></span>
                      </div>
                      <div className="dist-item">
                        <span className="dist-dot dot-maps" />
                        <span>Map Directions: <strong>{totalNetworkInteractions > 0 ? Math.round((totalNetworkMaps / totalNetworkInteractions) * 100) : 0}%</strong></span>
                      </div>
                      <div className="dist-item">
                        <span className="dist-dot dot-calls" />
                        <span>Calls: <strong>{totalNetworkInteractions > 0 ? Math.round((totalNetworkCalls / totalNetworkInteractions) * 100) : 0}%</strong></span>
                      </div>
                      <div className="dist-item">
                        <span className="dist-dot dot-bookings" />
                        <span>Bookings: <strong>{totalNetworkInteractions > 0 ? Math.round((totalNetworkBookings / totalNetworkInteractions) * 100) : 0}%</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📋 Detailed Shop Traffic Leaderboard Table */}
              <div className="traffic-leaderboard-card">
                <div className="leaderboard-header">
                  <div>
                    <h3 className="leaderboard-title">🏆 All Shops Traffic Leaderboard (पूरी सूची)</h3>
                    <p className="leaderboard-subtitle">Detailed breakdown of customer engagements per registered store</p>
                  </div>

                  <div className="leaderboard-search-box">
                    <Search size={15} />
                    <input
                      type="text"
                      placeholder="Filter by shop or city..."
                      value={trafficSearchTerm}
                      onChange={(e) => setTrafficSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="admin-table traffic-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Shop / Hub Name</th>
                        <th>City & Contact</th>
                        <th>Profile Views</th>
                        <th>Map Directions</th>
                        <th>Phone Leads</th>
                        <th>Service Bookings</th>
                        <th>Total Traffic</th>
                        <th>Network Share</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTrafficShops.map((s, idx) => {
                        const isTop = idx === 0 && s.totalInteractions > 0;
                        const share = totalNetworkInteractions > 0 ? Math.round((s.totalInteractions / totalNetworkInteractions) * 100) : 0;

                        return (
                          <tr key={s.id} className={isTop ? "leaderboard-row-top" : ""}>
                            <td>
                              <span className={`rank-pill ${isTop ? "rank-pill-first" : ""}`}>
                                {isTop ? "🏆 #1" : `#${idx + 1}`}
                              </span>
                            </td>
                            <td>
                              <div className="tbl-shop-info">
                                <strong>{s.name}</strong>
                                <small>{s.owner}</small>
                              </div>
                            </td>
                            <td>
                              <div className="tbl-contact-info">
                                <span>📍 {s.city}</span>
                                <small>📞 {s.phone}</small>
                              </div>
                            </td>
                            <td>
                              <span className="stat-pill-view">👁️ {s.views}</span>
                            </td>
                            <td>
                              <span className="stat-pill-map">📍 {s.mapClicks}</span>
                            </td>
                            <td>
                              <span className="stat-pill-call">📞 {s.callLeads}</span>
                            </td>
                            <td>
                              <span className="stat-pill-booking">🚗 {s.bookingsCount}</span>
                            </td>
                            <td>
                              <strong className="stat-total-score">{s.totalInteractions}</strong>
                            </td>
                            <td>
                              <div className="share-bar-cell">
                                <span className="share-percent-text">{share}%</span>
                                <div className="mini-share-bar">
                                  <div className="mini-share-fill" style={{ width: `${share}%` }} />
                                </div>
                              </div>
                            </td>
                            <td>
                              <Link
                                to={`/store-location?shopName=${encodeURIComponent(s.name)}`}
                                className="btn-inspect-shop"
                                title="View Store Location"
                              >
                                <ExternalLink size={13} /> View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              SUB-TAB B: 👥 CUSTOMER INSIGHTS & DIRECTORY
          ══════════════════════════════════════════════════════════════════ */}
          {analyticsSubTab === "customers" && (
            <>
              {/* 4 High-Impact Customer KPI Cards */}
              <div className="traffic-kpi-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <div className="traffic-kpi-card" style={{ borderLeft: "4px solid #2563eb" }}>
                  <div className="kpi-icon-wrap" style={{ background: "rgba(37, 99, 235, 0.12)", color: "#2563eb" }}>
                    <Users size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Total Registered Customers</span>
                    <h3 className="kpi-value">{totalRegisteredCustomers} Customers</h3>
                    <small className="kpi-subtext">👤 Profiles in system</small>
                  </div>
                </div>

                <div className="traffic-kpi-card" style={{ borderLeft: "4px solid #16a34a" }}>
                  <div className="kpi-icon-wrap" style={{ background: "rgba(22, 163, 74, 0.12)", color: "#16a34a" }}>
                    <Car size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Active Bookers</span>
                    <h3 className="kpi-value">{activeBookerCustomers} Bookers</h3>
                    <small className="kpi-subtext">🚗 Customers with confirmed service</small>
                  </div>
                </div>

                <div className="traffic-kpi-card" style={{ borderLeft: "4px solid #f59e0b" }}>
                  <div className="kpi-icon-wrap" style={{ background: "rgba(245, 158, 11, 0.12)", color: "#d97706" }}>
                    <DollarSign size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Total Customer Spend</span>
                    <h3 className="kpi-value">₹{totalCustomerSpend.toLocaleString()}</h3>
                    <small className="kpi-subtext">🧾 Cumulative invoice & booking revenue</small>
                  </div>
                </div>

                <div className="traffic-kpi-card" style={{ borderLeft: "4px solid #9333ea" }}>
                  <div className="kpi-icon-wrap" style={{ background: "rgba(147, 51, 234, 0.12)", color: "#9333ea" }}>
                    <UserCheck size={22} />
                  </div>
                  <div className="kpi-details">
                    <span className="kpi-label">Repeat Customers</span>
                    <h3 className="kpi-value">{returningCustomers} Returning</h3>
                    <small className="kpi-subtext">🔄 Customers with 2+ bookings</small>
                  </div>
                </div>
              </div>

              {/* 📊 Customer Vehicle Distribution & Behavioral Insights */}
              <div className="traffic-charts-two-col">
                {/* Chart 1: Vehicle Type Distribution */}
                <div className="chart-card-box">
                  <div className="chart-card-header">
                    <div>
                      <h3 className="chart-box-title">🚗 Customer Vehicle Types (वाहन अनुसार ग्राहक)</h3>
                      <p className="chart-box-subtitle">
                        देखें किस वाहन श्रेणी के कितने ग्राहक प्लेटफ़ॉर्म से जुड़े हैं:
                      </p>
                    </div>
                    <span className="chart-pill-tag">Vehicle Category</span>
                  </div>

                  <div className="vehicle-dist-container">
                    <div className="veh-bar-row">
                      <div className="veh-row-top">
                        <span className="veh-name-label">🚗 Cars & SUVs</span>
                        <strong className="veh-count-badge">
                          {vehicleDistribution.car} ({Math.round((vehicleDistribution.car / totalVehiclesCount) * 100)}%)
                        </strong>
                      </div>
                      <div className="veh-bar-track">
                        <div
                          className="veh-bar-fill"
                          style={{
                            width: `${Math.max(Math.round((vehicleDistribution.car / totalVehiclesCount) * 100), 5)}%`,
                            background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="veh-bar-row">
                      <div className="veh-row-top">
                        <span className="veh-name-label">🏍️ Bikes & Scooters (2-Wheeler)</span>
                        <strong className="veh-count-badge">
                          {vehicleDistribution.bike} ({Math.round((vehicleDistribution.bike / totalVehiclesCount) * 100)}%)
                        </strong>
                      </div>
                      <div className="veh-bar-track">
                        <div
                          className="veh-bar-fill"
                          style={{
                            width: `${Math.max(Math.round((vehicleDistribution.bike / totalVehiclesCount) * 100), 5)}%`,
                            background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="veh-bar-row">
                      <div className="veh-row-top">
                        <span className="veh-name-label">🚚 Commercial & Heavy Trucks</span>
                        <strong className="veh-count-badge">
                          {vehicleDistribution.commercial} ({Math.round((vehicleDistribution.commercial / totalVehiclesCount) * 100)}%)
                        </strong>
                      </div>
                      <div className="veh-bar-track">
                        <div
                          className="veh-bar-fill"
                          style={{
                            width: `${Math.max(Math.round((vehicleDistribution.commercial / totalVehiclesCount) * 100), 5)}%`,
                            background: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
                          }}
                        />
                      </div>
                    </div>

                    <div className="veh-bar-row">
                      <div className="veh-row-top">
                        <span className="veh-name-label">🚜 Tractors & Agriculture Equipment</span>
                        <strong className="veh-count-badge">
                          {vehicleDistribution.tractor} ({Math.round((vehicleDistribution.tractor / totalVehiclesCount) * 100)}%)
                        </strong>
                      </div>
                      <div className="veh-bar-track">
                        <div
                          className="veh-bar-fill"
                          style={{
                            width: `${Math.max(Math.round((vehicleDistribution.tractor / totalVehiclesCount) * 100), 5)}%`,
                            background: "linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart 2: Customer Behavioral Channels */}
                <div className="chart-card-box">
                  <div className="chart-card-header">
                    <div>
                      <h3 className="chart-box-title">⚡ Customer Action Stream (ग्राहक एक्टिविटी)</h3>
                      <p className="chart-box-subtitle">
                        ग्राहक दुकानों के साथ किस माध्यम से संपर्क कर रहे हैं:
                      </p>
                    </div>
                    <span className="chart-pill-tag">Live Activity Channels</span>
                  </div>

                  <div className="customer-activity-grid">
                    <div className="action-stat-box" style={{ borderColor: "#3b82f6" }}>
                      <div className="action-stat-header">
                        <Eye size={18} color="#2563eb" />
                        <span>Store Page Views</span>
                      </div>
                      <h4 className="action-stat-num">{totalNetworkViews}</h4>
                      <small>Browsed tyre inventory & pricing</small>
                    </div>

                    <div className="action-stat-box" style={{ borderColor: "#10b981" }}>
                      <div className="action-stat-header">
                        <Navigation size={18} color="#059669" />
                        <span>Map Navigations</span>
                      </div>
                      <h4 className="action-stat-num">{totalNetworkMaps}</h4>
                      <small>Used GPS to reach partner hub</small>
                    </div>

                    <div className="action-stat-box" style={{ borderColor: "#f59e0b" }}>
                      <div className="action-stat-header">
                        <Phone size={18} color="#d97706" />
                        <span>Direct Calls</span>
                      </div>
                      <h4 className="action-stat-num">{totalNetworkCalls}</h4>
                      <small>Called shop for tyre enquiry</small>
                    </div>

                    <div className="action-stat-box" style={{ borderColor: "#ef4444" }}>
                      <div className="action-stat-header">
                        <Calendar size={18} color="#dc2626" />
                        <span>Service Appointments</span>
                      </div>
                      <h4 className="action-stat-num">{totalNetworkBookings}</h4>
                      <small>Confirmed roadside & shop bookings</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📋 Complete Customer Master Directory Table */}
              <div className="traffic-leaderboard-card">
                <div className="leaderboard-header" style={{ flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <h3 className="leaderboard-title">👥 Customer Master Directory ({filteredCustomerList.length} Records)</h3>
                    <p className="leaderboard-subtitle">Detailed profiles, contact numbers, vehicles, and booking history</p>
                  </div>

                  {/* Filters & Search Toolbar */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                    {/* Vehicle Filter Pills */}
                    <div className="customer-veh-filter-row">
                      <button
                        className={`veh-filter-btn ${customerVehicleFilter === "all" ? "veh-filter-active" : ""}`}
                        onClick={() => setCustomerVehicleFilter("all")}
                      >
                        All
                      </button>
                      <button
                        className={`veh-filter-btn ${customerVehicleFilter === "car" ? "veh-filter-active" : ""}`}
                        onClick={() => setCustomerVehicleFilter("car")}
                      >
                        🚗 Car/SUV
                      </button>
                      <button
                        className={`veh-filter-btn ${customerVehicleFilter === "bike" ? "veh-filter-active" : ""}`}
                        onClick={() => setCustomerVehicleFilter("bike")}
                      >
                        🏍️ Bike
                      </button>
                      <button
                        className={`veh-filter-btn ${customerVehicleFilter === "commercial" ? "veh-filter-active" : ""}`}
                        onClick={() => setCustomerVehicleFilter("commercial")}
                      >
                        🚚 Truck
                      </button>
                      <button
                        className={`veh-filter-btn ${customerVehicleFilter === "tractor" ? "veh-filter-active" : ""}`}
                        onClick={() => setCustomerVehicleFilter("tractor")}
                      >
                        🚜 Tractor
                      </button>
                    </div>

                    <div className="leaderboard-search-box" style={{ minWidth: "240px" }}>
                      <Search size={15} />
                      <input
                        type="text"
                        placeholder="Search by customer name, phone, vehicle no..."
                        value={customerSearchTerm}
                        onChange={(e) => setCustomerSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="admin-table traffic-table">
                    <thead>
                      <tr>
                        <th>Customer Details</th>
                        <th>Contact Number</th>
                        <th>City / Location</th>
                        <th>Registered Vehicle</th>
                        <th>Bookings Done</th>
                        <th>Total Spent (₹)</th>
                        <th>Last Active</th>
                        <th>Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomerList.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ textAlign: "center", padding: "36px 16px", color: "var(--text-muted)" }}>
                            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔍</div>
                            <strong>Koi customer record nahi mila.</strong>
                            <p style={{ margin: "4px 0 0", fontSize: "12.5px" }}>Filter change karke ya search clear karke dobara dekhein.</p>
                          </td>
                        </tr>
                      ) : (
                        filteredCustomerList.map((c) => {
                          const cleanPhone = (c.phone || "").replace(/[^0-9]/g, "");

                          return (
                            <tr key={c.id}>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div className="customer-avatar-badge">
                                    {(c.name || "C").charAt(0).toUpperCase()}
                                  </div>
                                  <div className="tbl-shop-info">
                                    <strong style={{ fontSize: "14px", color: "var(--text, #0f172a)" }}>{c.name}</strong>
                                    <small style={{ color: "#64748b" }}>{c.email !== "—" ? c.email : c.source}</small>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="tbl-contact-info">
                                  <strong style={{ color: "#0f172a" }}>📞 {c.phone}</strong>
                                </div>
                              </td>

                              <td>
                                <div className="tbl-contact-info">
                                  <span>📍 {c.city || "Raipur"}</span>
                                  {c.address && c.address !== "—" && <small style={{ maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.address}</small>}
                                </div>
                              </td>

                              <td>
                                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                  <span className="customer-veh-pill">
                                    {c.vehicleType?.toLowerCase().includes("bike") ? "🏍️" : c.vehicleType?.toLowerCase().includes("truck") ? "🚚" : c.vehicleType?.toLowerCase().includes("tractor") ? "🚜" : "🚗"} {c.vehicleType || "Car / SUV"}
                                  </span>
                                  <strong style={{ fontSize: "12px", color: "#1e293b", fontFamily: "monospace" }}>
                                    {c.vehicleNumber !== "—" ? c.vehicleNumber : (c.vehicleModel || "—")}
                                  </strong>
                                </div>
                              </td>

                              <td>
                                <span className="stat-pill-booking" style={{ fontSize: "13px", fontWeight: "700" }}>
                                  🚗 {c.totalBookings} Bookings
                                </span>
                              </td>

                              <td>
                                <strong style={{ color: "#16a34a", fontSize: "14px", fontWeight: "800" }}>
                                  ₹{(c.totalSpent || 0).toLocaleString()}
                                </strong>
                              </td>

                              <td>
                                <span style={{ fontSize: "12px", color: "#64748b" }}>
                                  {c.lastActive || "Recent"}
                                </span>
                              </td>

                              <td>
                                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                  {cleanPhone ? (
                                    <>
                                      <a
                                        href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Namaste ${c.name}, TyreSaathi par aapka swagat hai!`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-quick-wa"
                                        title="WhatsApp Message"
                                      >
                                        <MessageCircle size={14} /> WhatsApp
                                      </a>
                                      <a
                                        href={`tel:${cleanPhone}`}
                                        className="btn-quick-call"
                                        title="Call Customer"
                                      >
                                        <Phone size={14} /> Call
                                      </a>
                                    </>
                                  ) : (
                                    <span style={{ fontSize: "11px", color: "#94a3b8" }}>—</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
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
                      <strong>#{formatSafeText(b.id)}</strong>
                      <small className="user-subtext">{formatSafeDate(b.date || b.createdAt)} • {formatSafeText(b.timeSlot || b.time, "10:00 AM")}</small>
                    </td>
                    <td>
                      <strong>{formatSafeText(b.customerName, "Customer")}</strong>
                      <small className="user-subtext">📞 {formatSafeText(b.customerPhone, "—")}</small>
                    </td>
                    <td>
                      <span>{formatSafeText(b.vehicleType, "Car / SUV")}</span>
                      <small className="reg-badge">{formatSafeText(b.vehicleNumber, "—")}</small>
                    </td>
                    <td>
                      <strong>{formatSafeText(b.serviceName, "Tyre Service")}</strong>
                      {b.notes && <small className="user-subtext">"{formatSafeText(b.notes)}"</small>}
                    </td>
                    <td>
                      <span className="hub-tag">🏪 {formatSafeText(b.shopName, "Partner Hub")}</span>
                    </td>
                    <td>
                      <span className={`status-badge-ticket status-${formatSafeText(b.status, "pending")}`}>
                        {formatSafeText(b.status, "PENDING").toUpperCase()}
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
                      <strong>#{formatSafeText(t.ticketNo, t.id)}</strong>
                      <small className="user-subtext">{formatSafeDate(t.createdAt)}</small>
                    </td>
                    <td>
                      <strong>{formatSafeText(t.userName, "User")}</strong>
                      <small className="user-subtext">📞 {formatSafeText(t.userPhone, "—")}</small>
                    </td>
                    <td>
                      <span>{formatSafeText(t.category, "General")}</span>
                      <small className={`priority-tag priority-${formatSafeText(t.priority, "medium")}`}>{formatSafeText(t.priority, "MEDIUM").toUpperCase()}</small>
                    </td>
                    <td>
                      <strong style={{ display: "block" }}>{formatSafeText(t.subject, "Support Request")}</strong>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>{formatSafeText(t.description, "")}</p>
                      {t.adminReply && (
                        <div className="admin-reply-snippet">
                          <strong>Reply:</strong> {formatSafeText(t.adminReply)}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge-ticket status-${formatSafeText(t.status, "open")}`}>
                        {formatSafeText(t.status, "OPEN").toUpperCase()}
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
            {/* Card 0: Master Links & Project Portals */}
            <div className="excel-download-card" style={{ border: "2px solid #3b82f6", background: "#f8faff" }}>
              <div className="card-top">
                <span className="ex-icon" style={{ background: "#dbeafe", color: "#2563eb" }}>🔗</span>
                <div>
                  <h4 style={{ color: "#1e40af" }}>Master Links & Project Directory</h4>
                  <small style={{ color: "#2563eb", fontWeight: "bold" }}>⚡ All App, Web, GitHub & Admin Links</small>
                </div>
              </div>
              <p>Uptodown, GitHub repo, CI/CD APK builds, Firebase Cloud, Web PWA, aur saare live page routes ki master list.</p>
              <button
                className="btn-download-csv"
                style={{ background: "#2563eb", borderColor: "#1d4ed8" }}
                onClick={() => exportMasterLinksToExcel()}
              >
                <Download size={16} /> Download Master_Links.csv (Excel)
              </button>
            </div>

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

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 className="prev-shop-name">{ad.shopName}</h4>
                        <p className="prev-tagline">{ad.tagline}</p>
                        <p className="prev-desc">{ad.description}</p>
                        <div className="prev-meta">
                          <span>📍 {ad.city}</span>
                          {ad.address && <span>🏠 {ad.address}</span>}
                        </div>
                      </div>
                      {ad.imageUrl && (
                        <div style={{ width: "84px", height: "64px", borderRadius: "8px", overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.35)", flexShrink: 0, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
                          <img
                            src={ad.imageUrl}
                            alt={ad.shopName}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </div>
                      )}
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
                        className={`btn-toggle-ad ${scheduleInfo.status === "active" ? "btn-toggle-active" : "btn-toggle-inactive"}`}
                        onClick={() => handleToggleAdStatus(ad.id)}
                      >
                        <Power size={13} />
                        {scheduleInfo.status === "active"
                          ? "Ad Pause Karein"
                          : scheduleInfo.status === "expired"
                          ? "⚡ Renew & Make Live (+30d)"
                          : "⚡ Ad Live Karein"}
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
                      placeholder="e.g. Star Tyre & Express Hub"
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
                      placeholder="e.g. Free Nitrogen Air & Valve Fitting on 4 Tyres!"
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

                  {/* 📸 Shop Offer Banner / Poster Image Upload */}
                  <div className="modal-field" style={{ background: "rgba(0,0,0,0.02)", padding: "14px", borderRadius: "12px", border: "1.5px dashed var(--border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <label style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", margin: 0, color: "var(--heading, #1e293b)" }}>
                        <Camera size={16} color="#c0392b" /> 📸 Shop Photo / Offer Image (दुकान या ऑफर का फोटो)
                      </label>
                      {adForm.imageUrl && (
                        <button
                          type="button"
                          onClick={() => setAdForm((prev) => ({ ...prev, imageUrl: "" }))}
                          style={{ background: "none", border: "none", color: "#e74c3c", fontSize: "12px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                        >
                          <Trash2 size={13} /> Remove Photo
                        </button>
                      )}
                    </div>

                    {adForm.imageUrl ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--surface)", padding: "10px", borderRadius: "10px", border: "1px solid var(--border)" }}>
                        <img
                          src={adForm.imageUrl}
                          alt="Offer Preview"
                          style={{ width: "90px", height: "65px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border)" }}
                        />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: "12px", fontWeight: "700", color: "#27ae60", display: "block" }}>
                            ✅ Photo Uploaded Successfully
                          </span>
                          <small style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                            Ye photo Homepage slider banner par offer ke sath dikhegi.
                          </small>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          id="admin-ad-image-file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleAdImageUpload}
                          disabled={uploadingAdImage}
                        />
                        <label
                          htmlFor="admin-ad-image-file"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "14px",
                            borderRadius: "10px",
                            background: "var(--surface)",
                            border: "1.5px dashed #c0392b",
                            color: "#c0392b",
                            fontWeight: "700",
                            fontSize: "13px",
                            cursor: uploadingAdImage ? "not-allowed" : "pointer",
                            textAlign: "center"
                          }}
                        >
                          {uploadingAdImage ? (
                            <>
                              <Loader2 size={16} className="animate-spin" /> Uploading image to Cloud...
                            </>
                          ) : (
                            <>
                              <Upload size={16} /> 📁 Click to Upload Shop / Offer Photo (Gallery se chunein)
                            </>
                          )}
                        </label>
                        <small style={{ color: "var(--text-muted)", fontSize: "11px", display: "block", marginTop: "4px" }}>
                          * JPG, PNG, WEBP supported (Max 5MB). Photo upload karne par banner aur aakarshak lagega.
                        </small>
                      </div>
                    )}
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
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 className="ad-shop-name">{adForm.shopName || "Dukan Ka Naam"}</h3>
                          <h4 className="ad-tagline">{adForm.tagline || "Offer Headline Yahan Dikhegi"}</h4>
                          <p className="ad-desc">{adForm.description || "Offer ka poora vivran yahan customer ko dikhega..."}</p>
                          {adForm.address && <div className="ad-address-snippet">🏠 {adForm.address}</div>}
                        </div>
                        {adForm.imageUrl && (
                          <div style={{ width: "90px", height: "70px", borderRadius: "8px", overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.4)", flexShrink: 0, boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }}>
                            <img src={adForm.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                          </div>
                        )}
                      </div>
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

      {/* ══════════════════════════════════════════════════════════════════
          TAB 7: APP UPDATES & BROADCAST NOTIFICATIONS CONTROLLER
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "updates" && (
        <div className="admin-updates-section" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Section Header */}
          <div style={{
            background: "linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)",
            borderRadius: "16px",
            padding: "22px 26px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8e44ad, #9b59b6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "22px"
              }}>
                <Bell size={24} />
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: "20px", fontWeight: "800" }}>
                  App Version Updates & Real-Time Broadcasts
                </h2>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#bdc3c7" }}>
                  Purane app users ko naye update ka notification popup bhejein (Skip option ke sath) aur live alerts broadcast karein.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                background: "rgba(142, 68, 173, 0.25)",
                color: "#e8d8f0",
                border: "1px solid #8e44ad",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700"
              }}>
                Current Live Version: v{versionControl.latestVersion}
              </span>
            </div>
          </div>

          {/* Success Alerts */}
          {versionSuccessMsg && (
            <div style={{ background: "#eafaf1", border: "1.5px solid #27ae60", color: "#1e824c", padding: "12px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13.5px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} color="#27ae60" />
              <span>{versionSuccessMsg}</span>
            </div>
          )}

          {broadcastSuccessMsg && (
            <div style={{ background: "#eafaf1", border: "1.5px solid #27ae60", color: "#1e824c", padding: "12px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13.5px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} color="#27ae60" />
              <span>{broadcastSuccessMsg}</span>
            </div>
          )}

          {/* 2-Column Controller Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "24px" }}>
            
            {/* ═══ Left Card: App Version Control & Release Manager ═══ */}
            <div style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.04)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <Rocket size={20} color="#8e44ad" />
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>
                    1. App Version Release Controller
                  </h3>
                  <small style={{ color: "var(--text-muted)", fontSize: "11.5px" }}>
                    Naye update ka notification popup sabhi purane app users ke screen par turant bhejta hai.
                  </small>
                </div>
              </div>

              <form onSubmit={handleSaveVersionControl} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                      Latest Version (वर्ज़न नंबर)
                    </label>
                    <input
                      type="text"
                      value={versionControl.latestVersion}
                      onChange={(e) => setVersionControl({ ...versionControl, latestVersion: e.target.value.trim() })}
                      placeholder="e.g. 1.2.0"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                      Build Code (बिल्ड नंबर)
                    </label>
                    <input
                      type="number"
                      value={versionControl.buildNumber || 3}
                      onChange={(e) => setVersionControl({ ...versionControl, buildNumber: Number(e.target.value) })}
                      placeholder="e.g. 3"
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    APK / Store Download Link (डाउनलोड लिंक)
                  </label>
                  <input
                    type="url"
                    value={versionControl.downloadUrl}
                    onChange={(e) => setVersionControl({ ...versionControl, downloadUrl: e.target.value.trim() })}
                    placeholder="https://tyresaathi.en.uptodown.com/android ya Google Play link"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "12.5px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Release Summary Message (अपडेट संदेश)
                  </label>
                  <textarea
                    rows={3}
                    value={versionControl.releaseMessage}
                    onChange={(e) => setVersionControl({ ...versionControl, releaseMessage: e.target.value })}
                    placeholder="Naye tyre tools, live ratings aur fast booking ke sath naya update taiyar hai..."
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "12.5px", boxSizing: "border-box" }}
                  />
                </div>

                {/* Highlights List */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    ✨ What's New Bullet Points (मुख्य बदलाव)
                  </label>
                  
                  <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                    <input
                      type="text"
                      value={newHighlightText}
                      onChange={(e) => setNewHighlightText(e.target.value)}
                      placeholder="उदा: ⭐ New Star Rating System added"
                      style={{ flex: 1, padding: "8px 10px", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "12px" }}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddHighlight(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      style={{ background: "#8e44ad", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                    >
                      + Add
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {versionControl.highlights?.map((h, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg, #f8fafc)", padding: "6px 10px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: "12px" }}>✓ {h}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          style={{ background: "transparent", border: "none", color: "#e74c3c", cursor: "pointer", fontSize: "12px" }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skip / Force Update Control */}
                <div style={{
                  background: versionControl.forceUpdate ? "#fdedec" : "#eafaf1",
                  border: `1.5px solid ${versionControl.forceUpdate ? "#e74c3c" : "#27ae60"}`,
                  borderRadius: "10px",
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <strong style={{ fontSize: "13px", color: versionControl.forceUpdate ? "#c0392b" : "#27ae60" }}>
                      {versionControl.forceUpdate ? "🔴 Mandatory Force Update" : "🟢 Optional Update (Skip Allowed)"}
                    </strong>
                    <p style={{ margin: "2px 0 0", fontSize: "11.5px", color: "#666" }}>
                      {versionControl.forceUpdate
                        ? "User ko bina update kiye app aage use karne ki anumati nahi hogi."
                        : "User 'Baad Me Karein (Skip)' button dabakar bina rukawat app use kar sakte hain."}
                    </p>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={versionControl.forceUpdate}
                      onChange={(e) => setVersionControl({ ...versionControl, forceUpdate: e.target.checked })}
                    />
                    <span className="slider round" />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={savingVersion}
                  style={{
                    background: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "8px",
                    boxShadow: "0 4px 14px rgba(142, 68, 173, 0.3)"
                  }}
                >
                  <Save size={16} /> {savingVersion ? "Publishing to Cloud..." : "🚀 Publish Version Update to All Users"}
                </button>
              </form>
            </div>

            {/* ═══ Right Card: Broadcast Notifications & Live Star Rating Alerts ═══ */}
            <div style={{
              background: "var(--surface)",
              border: "1.5px solid var(--border)",
              borderRadius: "16px",
              padding: "22px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                <Megaphone size={20} color="#e67e22" />
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>
                    2. Instant Broadcast Push Notification
                  </h3>
                  <small style={{ color: "var(--text-muted)", fontSize: "11.5px" }}>
                    Sabhi customers ya shop owners ko ek sath live in-app notification & sound alert bhejein.
                  </small>
                </div>
              </div>

              <form onSubmit={handleSendBroadcast} style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Target Audience (किसे भेजना है)
                  </label>
                  <select
                    value={broadcastForm.targetRole}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, targetRole: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                  >
                    <option value="all">👥 Sabhi Users & Shop Owners (All Users)</option>
                    <option value="vendor">🏪 Sirf Tyre Shop Owners / Vendors</option>
                    <option value="customer">🚗 Sirf Registered Customers</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Notification Category (सूचना का प्रकार)
                  </label>
                  <select
                    value={broadcastForm.type}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, type: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                  >
                    <option value="announcement">📢 General Announcement / Offer Notice</option>
                    <option value="star_rating">⭐ Star Ratings & Store Reviews Alert</option>
                    <option value="booking">📅 Service Bookings & Status Update</option>
                    <option value="update">🚀 App Update & New Feature Notice</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Notification Title (शीर्षक)
                  </label>
                  <input
                    type="text"
                    value={broadcastForm.title}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                    placeholder="उदा: ⭐ TyreSaathi New Star Ratings Live!"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Notification Message Body (संदेश)
                  </label>
                  <textarea
                    rows={3}
                    value={broadcastForm.message}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                    placeholder="Apna pasandida shop review karein aur real-time live notification paayein..."
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "12.5px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                {/* Preview Box */}
                <div style={{
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "auto"
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#e67e22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "800"
                  }}>
                    🔔
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: "13px", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {broadcastForm.title || "Notification Title"}
                    </strong>
                    <p style={{ margin: 0, fontSize: "11.5px", color: "#cbd5e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {broadcastForm.message || "Message content will appear here..."}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={broadcasting}
                  style={{
                    background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
                    color: "#fff",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                    boxShadow: "0 4px 14px rgba(230, 126, 34, 0.3)"
                  }}
                >
                  <Send size={16} /> {broadcasting ? "Sending Broadcast..." : "📢 Send Real-Time Broadcast Notification"}
                </button>
              </form>
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

        /* 🧭 Nav Tabs Wrapper & Controls */
        .admin-nav-tabs-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 20px;
          position: relative;
          width: 100%;
        }

        .nav-tabs-arrow-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 50%;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #0f172a;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          z-index: 3;
          transition: all 0.2s ease;
        }
        .nav-tabs-arrow-btn:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          transform: scale(1.1);
          color: #c0392b;
        }
        .nav-tabs-arrow-btn:active {
          transform: scale(0.95);
        }

        .admin-nav-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 6px 2px 10px 2px;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
          flex: 1;
        }
        .admin-nav-tabs::-webkit-scrollbar {
          height: 4px;
        }
        .admin-nav-tabs::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-nav-tabs::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .admin-nav-tabs::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .admin-tab {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
        }
        .admin-tab:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
          transform: translateY(-1px);
        }
        .tab-active {
          background: #c0392b !important;
          color: white !important;
          border-color: #c0392b !important;
          box-shadow: 0 3px 10px rgba(192, 57, 43, 0.3) !important;
        }
        .tab-traffic-active {
          background: #d35400 !important;
          border-color: #d35400 !important;
          box-shadow: 0 3px 10px rgba(211, 84, 0, 0.3) !important;
        }
        .tab-ads-active {
          background: #16a34a !important;
          border-color: #16a34a !important;
          box-shadow: 0 3px 10px rgba(22, 163, 74, 0.3) !important;
        }
        .tab-excel-active {
          background: #27ae60 !important;
          border-color: #27ae60 !important;
          box-shadow: 0 3px 10px rgba(39, 174, 96, 0.3) !important;
        }
        .tab-bubble {
          background: #f39c12;
          color: white;
          font-size: 0.6875rem;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 800;
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
        /* ══════════════════════════════════════════════════════════════════
           📊 SHOP TRAFFIC & CUSTOMER ANALYTICS STYLES
        ══════════════════════════════════════════════════════════════════ */
        .admin-traffic-analytics-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .tab-traffic-active {
          background: #e67e22 !important;
          color: white !important;
          box-shadow: 0 4px 14px rgba(230, 126, 34, 0.4);
        }

        .traffic-banner-header {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          border-radius: 16px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.15);
        }

        .traffic-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(230, 126, 34, 0.2);
          color: #fbbf24;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .traffic-title {
          font-size: 22px;
          font-weight: 800;
          margin: 0 0 6px;
          letter-spacing: -0.5px;
        }

        .traffic-desc {
          margin: 0;
          font-size: 13px;
          color: #cbd5e1;
          max-width: 650px;
          line-height: 1.5;
        }

        .traffic-timeframe-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .timeframe-pill-toggle {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 3px;
          display: flex;
          gap: 4px;
        }

        .tf-btn {
          background: transparent;
          border: none;
          color: #cbd5e1;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .tf-btn-active {
          background: #c0392b;
          color: white;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.5);
        }

        .btn-view-stores-map {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-view-stores-map:hover { background: rgba(255, 255, 255, 0.25); }

        .traffic-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 16px;
        }

        .traffic-kpi-card {
          background: var(--surface, #ffffff);
          border: 1.5px solid var(--border, #e2e8f0);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: transform 0.2s;
        }
        .traffic-kpi-card:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
        }

        .highlight-leader-kpi {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.04);
        }

        .kpi-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .kpi-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted, #64748b);
          display: block;
          margin-bottom: 2px;
        }

        .kpi-value {
          font-size: 22px;
          font-weight: 800;
          color: var(--text, #0f172a);
          margin: 0 0 2px;
          line-height: 1.1;
        }

        .kpi-subtext {
          font-size: 11px;
          color: var(--text-muted, #94a3b8);
          display: block;
        }

        /* 2-Column Charts */
        .traffic-charts-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 990px) {
          .traffic-charts-two-col { grid-template-columns: 1fr; }
        }

        .chart-card-box {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
          display: flex;
          flex-direction: column;
        }

        .chart-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .chart-box-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--text, #0f172a);
          margin: 0 0 4px;
        }

        .chart-box-subtitle {
          font-size: 12px;
          color: var(--text-muted, #64748b);
          margin: 0;
        }

        .chart-pill-tag {
          font-size: 11px;
          font-weight: 700;
          background: var(--bg, #f1f5f9);
          color: var(--text-muted, #475569);
          padding: 3px 8px;
          border-radius: 6px;
        }

        /* Shop Progress Bars */
        .shop-bars-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .shop-bar-row {
          background: var(--bg, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bar-row-leader {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }

        .shop-bar-top-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .shop-rank-name {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rank-badge-circle {
          font-size: 11px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
        }
        .rank-gold { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
        .rank-silver { background: #e2e8f0; color: #334155; }
        .rank-bronze { background: #ffedd5; color: #9a3412; }
        .rank-norm { background: var(--bg, #f1f5f9); color: #64748b; }

        .shop-title-link {
          font-size: 14px;
          color: var(--text, #0f172a);
        }

        .shop-city-chip {
          font-size: 11px;
          background: rgba(0,0,0,0.05);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--text-muted, #64748b);
        }

        .top-badge-flame {
          font-size: 10.5px;
          font-weight: 800;
          background: #fee2e2;
          color: #dc2626;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .shop-metrics-mini-chips {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .mini-chip {
          padding: 2px 6px;
          border-radius: 4px;
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #cbd5e1);
        }
        .chip-views { color: #2563eb; }
        .chip-maps { color: #16a34a; }
        .chip-calls { color: #d97706; }
        .chip-bookings { color: #dc2626; }
        .chip-total { background: #1e293b; color: #fff; border-color: #0f172a; }

        .bar-track {
          width: 100%;
          height: 10px;
          background: #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }

        .bar-fill-gradient {
          height: 100%;
          border-radius: 20px;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* SVG Trend Canvas */
        .svg-chart-container {
          width: 100%;
          background: var(--bg, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 14px;
        }

        .trend-svg-canvas {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .action-distribution-wrap {
          border-top: 1px solid var(--border, #e2e8f0);
          padding-top: 12px;
        }

        .dist-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted, #64748b);
          margin: 0 0 8px;
        }

        .dist-bars-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 12px;
          color: var(--text, #334155);
        }

        .dist-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dist-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-views { background: #2563eb; }
        .dot-maps { background: #16a34a; }
        .dot-calls { background: #d97706; }
        .dot-bookings { background: #dc2626; }

        /* Leaderboard Table */
        .traffic-leaderboard-card {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
        }

        .leaderboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }

        .leaderboard-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--text, #0f172a);
          margin: 0 0 2px;
        }

        .leaderboard-subtitle {
          font-size: 12px;
          color: var(--text-muted, #64748b);
          margin: 0;
        }

        .leaderboard-search-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        .leaderboard-search-box svg {
          position: absolute;
          left: 10px;
          color: #94a3b8;
        }
        .leaderboard-search-box input {
          padding: 8px 12px 8px 32px;
          border-radius: 8px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--bg, #f8fafc);
          color: var(--text, #0f172a);
          font-size: 12.5px;
          outline: none;
        }

        .traffic-table th {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .leaderboard-row-top {
          background: rgba(245, 158, 11, 0.05);
        }

        .rank-pill {
          font-size: 12px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          background: var(--bg, #f1f5f9);
          color: var(--text, #334155);
        }
        .rank-pill-first {
          background: #fef3c7;
          color: #b45309;
        }

        .tbl-shop-info {
          display: flex;
          flex-direction: column;
        }
        .tbl-shop-info strong { font-size: 13.5px; color: var(--text, #0f172a); }
        .tbl-shop-info small { font-size: 11.5px; color: var(--text-muted, #64748b); }

        .tbl-contact-info {
          display: flex;
          flex-direction: column;
          font-size: 11.5px;
          color: var(--text-muted, #475569);
        }

        .stat-pill-view {
          font-size: 12px;
          font-weight: 700;
          color: #2563eb;
          background: #eff6ff;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .stat-pill-map {
          font-size: 12px;
          font-weight: 700;
          color: #16a34a;
          background: #f0fdf4;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .stat-pill-call {
          font-size: 12px;
          font-weight: 700;
          color: #d97706;
          background: #fffbeb;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .stat-pill-booking {
          font-size: 12px;
          font-weight: 700;
          color: #dc2626;
          background: #fef2f2;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .stat-total-score {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }

        .share-bar-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 80px;
        }

        .share-percent-text {
          font-size: 11px;
          font-weight: 700;
          color: var(--text, #334155);
        }

        .mini-share-bar {
          width: 100%;
          height: 6px;
          background: #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .mini-share-fill {
          height: 100%;
          background: linear-gradient(90deg, #c0392b 0%, #f59e0b 100%);
          border-radius: 10px;
        }

        .btn-inspect-shop {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--surface, #fff);
          color: var(--text, #334155);
          font-size: 11.5px;
          font-weight: 700;
          text-decoration: none;
        }
        .btn-inspect-shop:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          color: #1d4ed8;
        }

        /* ══════════════════════════════════════════════════════════════════
           🔀 SUBNAV PILLS & DATA MODE TOGGLE STYLES
        ══════════════════════════════════════════════════════════════════ */
        .analytics-subnav-row {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .subnav-pill {
          flex: 1;
          min-width: 260px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          background: var(--surface, #ffffff);
          border: 2px solid var(--border, #e2e8f0);
          border-radius: 14px;
          font-size: 14px;
          font-weight: 800;
          color: var(--text, #334155);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          transition: all 0.2s ease;
        }

        .subnav-pill:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }

        .subnav-pill-active {
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .subnav-shops-active {
          background: linear-gradient(135deg, #e67e22 0%, #d35400 100%) !important;
          border-color: #d35400 !important;
          color: #ffffff !important;
        }

        .subnav-customers-active {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
          border-color: #1d4ed8 !important;
          color: #ffffff !important;
        }

        .subnav-badge {
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.15);
          color: white;
        }

        /* Mode Toggle Button in Header */
        .data-mode-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: all 0.2s ease;
        }

        .mode-real-active {
          background: rgba(34, 197, 94, 0.18);
          color: #4ade80;
          border-color: rgba(74, 222, 128, 0.4);
        }

        .mode-preview-active {
          background: rgba(245, 158, 11, 0.18);
          color: #fbbf24;
          border-color: rgba(251, 191, 36, 0.4);
        }

        .mode-switch-hint {
          font-size: 10px;
          font-weight: 600;
          opacity: 0.8;
          text-decoration: underline;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot-live-pulse {
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          animation: pulseGlow 1.8s infinite;
        }

        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        .dot-demo {
          background: #f59e0b;
        }

        /* 🚗 Customer Vehicle Distribution Styles */
        .vehicle-dist-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .veh-bar-row {
          background: var(--bg, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .veh-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .veh-name-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text, #1e293b);
        }

        .veh-count-badge {
          font-size: 12px;
          font-weight: 800;
          color: #2563eb;
        }

        .veh-bar-track {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .veh-bar-fill {
          height: 100%;
          border-radius: 8px;
          transition: width 0.4s ease;
        }

        /* Customer Activity Stat Boxes */
        .customer-activity-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 500px) {
          .customer-activity-grid { grid-template-columns: 1fr; }
        }

        .action-stat-box {
          background: var(--bg, #f8fafc);
          border: 1.5px solid var(--border, #e2e8f0);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .action-stat-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted, #64748b);
        }

        .action-stat-num {
          margin: 4px 0 0;
          font-size: 20px;
          font-weight: 800;
          color: var(--text, #0f172a);
        }

        .action-stat-box small {
          font-size: 11px;
          color: var(--text-muted, #94a3b8);
        }

        /* Vehicle Filter Buttons */
        .customer-veh-filter-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .veh-filter-btn {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #cbd5e1);
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text, #475569);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .veh-filter-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .veh-filter-active {
          background: #2563eb !important;
          color: #ffffff !important;
          border-color: #2563eb !important;
        }

        /* Customer Row Avatar & Badges */
        .customer-avatar-badge {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
          flex-shrink: 0;
        }

        .customer-veh-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
          background: #eff6ff;
          color: #1d4ed8;
          width: fit-content;
        }

        .btn-quick-wa {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 9px;
          border-radius: 6px;
          background: #25D366;
          color: #ffffff;
          font-size: 11.5px;
          font-weight: 700;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .btn-quick-wa:hover { opacity: 0.88; }

        .btn-quick-call {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 5px 9px;
          border-radius: 6px;
          background: #f1f5f9;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          font-size: 11.5px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-quick-call:hover {
          background: #e2e8f0;
        }
      `}</style>
    </div>
  );
}
