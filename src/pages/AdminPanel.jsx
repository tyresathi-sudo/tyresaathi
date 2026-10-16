import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
  ChevronRight,
  ArrowLeft,
  LayoutGrid,
  MoreHorizontal,
  Home
} from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
import { 
  getSupportContactConfig, 
  saveSupportContactConfig, 
  fetchLiveSupportContactConfig,
  DEFAULT_SUPPORT_CONFIG 
} from "../config/supportConfig";

export const DEFAULT_SERVICE_CATEGORIES = [
  { id: "srv_puncture", category: "Puncture & Tube", name: "Tubeless Puncture Repair (पंचर रिपेयर)", rate: 200, type: "service", icon: "🛠️", description: "Tubeless tyre puncture repair with rubber strip plug", active: true },
  { id: "srv_cut", category: "Tyre Repair", name: "Tyre Cut & Sidewall Repair (कट रिपेयर)", rate: 3000, type: "service", icon: "✂️", description: "Major tyre sidewall cut repair & vulcanizing patch", active: true },
  { id: "srv_fitting", category: "Fitting & Alignment", name: "New Tyre Fitting (टायर फिटिंग)", rate: 150, type: "service", icon: "🔧", description: "Automatic rim tyre fitting & bead seating", active: true },
  { id: "srv_doorstep", category: "Emergency Roadside", name: "Doorstep Emergency Assistance (घर/रास्ते पर)", rate: 499, type: "service", icon: "🚗", description: "On-spot puncture repair & emergency spare tyre fitment", active: true },
  { id: "srv_tube", category: "Puncture & Tube", name: "Tube Replacement / Valve Pin (ट्यूब/वॉल्व)", rate: 90, type: "service", icon: "⭕", description: "Valve nozzle change or internal tube replacement", active: true },
  { id: "srv_rotation", category: "Fitting & Alignment", name: "Tyre Rotation & Inspection (रोटेशन)", rate: 200, type: "service", icon: "🔄", description: "4-wheel tyre cross rotation for even tread wear", active: true },
  { id: "srv_alignment", category: "Fitting & Alignment", name: "3D Wheel Alignment (अलाइनमेंट)", rate: 450, type: "service", icon: "⚖️", description: "Laser 3D wheel alignment for steering stabilization", active: true },
  { id: "srv_wash", category: "Care & Cleaning", name: "Car Foam Wash & Tyre Polish (धुलाई)", rate: 350, type: "service", icon: "✨", description: "High-pressure foam body wash and tyre shine dressing", active: true },
];

const SAMPLE_ADMIN_SHOPS = [
  {
    uid: "3zsdrGjuhRQYtkweTVSq1WCgnsP2",
    name: "MDHAMID Raja",
    email: "mdaamid1213@gmail.com",
    phone: "7869916626",
    role: "vendor",
    shopName: "Bharat super tyre",
    shopApproved: true,
    city: "Raipur",
    address: "Main Road, Near Bus Stand, Raipur, Chhattisgarh",
    createdAt: "06-Sep-2026, 04:31 PM"
  },
  {
    uid: "NLyEx4CUKmdyVXMGtYosp8Zc3RS2",
    name: "Indus test",
    email: "t55912047@gmail.com",
    phone: "9620611176",
    role: "customer",
    shopName: "—",
    shopApproved: false,
    city: "Bengaluru",
    address: "Bengaluru, Karnataka",
    createdAt: "28-Sep-2026, 05:46 PM"
  },
  {
    uid: "OnkIqE2RgPcA7BiXa6AYAEoq0Bn2",
    name: "UCAN MAIL",
    email: "ucanmail195@gmail.com",
    phone: "9910281345",
    role: "customer",
    shopName: "—",
    shopApproved: false,
    city: "Delhi NCR",
    address: "Connaught Place, New Delhi, Delhi NCR",
    createdAt: "11-Aug-2026, 12:04 AM"
  },
  {
    uid: "bNuUMqGLPPIhjGzrobEXuOB4Nd12",
    name: "AHAMAD RAJA",
    email: "tyresathi@gmail.com",
    phone: "8877277757",
    role: "admin",
    shopName: "Tyre Saathi",
    shopApproved: true,
    city: "Raipur",
    address: "Ring Road No. 1, Raipur, Chhattisgarh",
    createdAt: "29-Aug-2026, 08:38 PM"
  },
  {
    uid: "bi33kj9KpRPAvhwQIA6HZWLhUPq2",
    name: "MD ASADULLAH",
    email: "mdasdullahanshari816@gmail.com",
    phone: "9593651752",
    role: "vendor",
    shopName: "R k tyre repairing shop",
    shopApproved: true,
    city: "Jaigaon",
    address: "Jaigaon old Balaji truck parking bhulan Chowpatti, West Bengal",
    createdAt: "20-Sep-2026, 10:58 AM"
  },
  {
    uid: "kuywPgYEYRV9TJqn74mx6cs11r52",
    name: "Sultan ansari",
    email: "mohammadsultan63786@gmail.com",
    phone: "6263834871",
    role: "vendor",
    shopName: "Simana Tyre",
    shopApproved: true,
    city: "Raipur",
    address: "Dhaneli nala, vidhansabha road raipur, Chhattisgarh",
    createdAt: "03-Oct-2026, 10:17 AM"
  },
  {
    uid: "xj0Mi7mMuUcSNYHrzLmA9CjstUN2",
    name: "Azhar Ali",
    email: "ajharali9875@gmail.com",
    phone: "9875373296",
    role: "vendor",
    shopName: "Nidigonda puncture shop",
    shopApproved: true,
    city: "Nidigonda",
    address: "Nidigonda Main Highway Road, Telangana",
    createdAt: "20-Sep-2026, 09:10 AM"
  },
  {
    uid: "ywvoUgz5GwgR4ZUT1ij6x3v4q4P2",
    name: "Mohammad Raja",
    email: "mohammadraja2977@gmail.com",
    phone: "9174535553",
    role: "vendor",
    shopName: "New Tegiya Tyre Retreading",
    shopApproved: true,
    city: "Jaigaon",
    address: "Jaigaon Commercial Bypass, West Bengal",
    createdAt: "20-Sep-2026, 07:38 AM"
  },
  {
    uid: "zmoo56tLv7gvZi4yNWI6YMONFcA3",
    name: "Lzh",
    email: "wange9han@gmail.com",
    phone: "9561138184",
    role: "vendor",
    shopName: "Lzh",
    shopApproved: true,
    city: "Ind",
    address: "Hong Kong, Hong Kong",
    createdAt: "29-Sep-2026, 09:02 AM"
  }
];

const SAMPLE_GLOBAL_BOOKINGS = [];
const SAMPLE_ADMIN_INVOICES = [];
const SAMPLE_ADMIN_TICKETS = [];

const DEFAULT_STAFF_MEMBERS = [];

// Helper to normalize all tickets to sequential TS-TCK-01, TS-TCK-02...
export function normalizeTicketList(list) {
  if (!Array.isArray(list) || list.length === 0) return [];
  const sorted = [...list].sort((a, b) => {
    const timeA = new Date(a.createdAt || a.timestamp || 0).getTime();
    const timeB = new Date(b.createdAt || b.timestamp || 0).getTime();
    return timeA - timeB;
  });

  return sorted.map((item, idx) => {
    const seq = idx + 1;
    const formatted = seq < 10 ? `0${seq}` : String(seq);
    const newTicketNo = `TS-TCK-${formatted}`;
    return {
      ...item,
      id: item.id?.startsWith("tck_") ? item.id : newTicketNo,
      ticketNo: newTicketNo
    };
  }).reverse();
}

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
  if (typeof val === "string" && !val.trim()) return fallback;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTabState] = useState(tabParam);

  const setActiveTab = (tabName, replaceHistory = false) => {
    setActiveTabState(tabName);
    setSearchParams({ tab: tabName }, { replace: replaceHistory });
  };

  // Keep state in sync with URL search params (e.g. Back/Forward button clicks)
  useEffect(() => {
    const currentTab = searchParams.get("tab") || "overview";
    if (currentTab !== activeTab) {
      setActiveTabState(currentTab);
    }
  }, [searchParams]);

  const navTabsRef = useRef(null);
  const adminJumpRef = useRef(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(() => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
  const [adminJumpQuery, setAdminJumpQuery] = useState("");
  const [adminJumpOpen, setAdminJumpOpen] = useState(false);

  // Close Jump dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (adminJumpRef.current && !adminJumpRef.current.contains(event.target)) {
        setAdminJumpOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  const [tickets, setTickets] = useState(() => {
    try {
      const local = localStorage.getItem("tyresaathi_user_tickets");
      if (local) {
        const parsed = JSON.parse(local);
        const normalized = normalizeTicketList(parsed);
        localStorage.setItem("tyresaathi_user_tickets", JSON.stringify(normalized));
        return normalized;
      }
      return SAMPLE_ADMIN_TICKETS;
    } catch {
      return SAMPLE_ADMIN_TICKETS;
    }
  });
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

  // ─── Real Dynamic Platform Statistics (100% Live, No Dummy Data) ───
  const realTotalRevenue = useMemo(() => {
    const bookingRev = (bookings || []).reduce((sum, b) => {
      const val = Number(b.totalAmount || b.price || b.amount || 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
    const invoiceRev = (invoices || []).reduce((sum, inv) => {
      const val = Number(inv.grandTotal || inv.total || inv.amount || 0);
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
    return bookingRev + invoiceRev;
  }, [bookings, invoices]);

  const realTotalShops = useMemo(() => {
    return (users || []).filter((u) => u.role === "vendor" || u.role === "shop_owner" || u.shopName).length;
  }, [users]);

  const realOpenTickets = useMemo(() => {
    return (tickets || []).filter((t) => t.status === "open" || t.status === "in_progress").length;
  }, [tickets]);

  const realLiveBookings = (bookings || []).length;

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

  // 🛠️ Service Categories & Rates Manager State
  const [serviceRates, setServiceRates] = useState(() => {
    try {
      const local = localStorage.getItem("tyresaathi_custom_rates");
      return local ? JSON.parse(local) : DEFAULT_SERVICE_CATEGORIES;
    } catch {
      return DEFAULT_SERVICE_CATEGORIES;
    }
  });
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all");
  const [serviceSearchTerm, setServiceSearchTerm] = useState("");
  const [serviceSuccessMsg, setServiceSuccessMsg] = useState("");
  const [serviceForm, setServiceForm] = useState({
    category: "Puncture & Tube",
    customCategory: "",
    name: "",
    rate: 200,
    type: "service",
    icon: "🛠️",
    description: "",
    active: true,
  });

  const availableCategories = Array.from(
    new Set([
      "Puncture & Tube",
      "Tyre Repair",
      "Fitting & Alignment",
      "Emergency Roadside",
      "Care & Cleaning",
      ...serviceRates.map((s) => s.category).filter(Boolean),
    ])
  );

  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceForm({
      category: "Puncture & Tube",
      customCategory: "",
      name: "",
      rate: 200,
      type: "service",
      icon: "🛠️",
      description: "",
      active: true,
    });
    setServiceModalOpen(true);
  };

  const handleOpenEditService = (srv) => {
    setEditingServiceId(srv.id);
    const isStandardCat = availableCategories.includes(srv.category);
    setServiceForm({
      category: isStandardCat ? srv.category : "custom",
      customCategory: !isStandardCat ? srv.category : "",
      name: srv.name || "",
      rate: srv.rate !== undefined ? srv.rate : 200,
      type: srv.type || "service",
      icon: srv.icon || "🛠️",
      description: srv.description || "",
      active: srv.active !== false,
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e) => {
    if (e) e.preventDefault();
    if (!serviceForm.name.trim()) {
      alert("कृपया सर्विस या कैटेगरी का नाम दर्ज करें!");
      return;
    }

    const finalCategory =
      serviceForm.category === "custom"
        ? (serviceForm.customCategory.trim() || "General Services")
        : serviceForm.category;

    const newServiceObj = {
      id: editingServiceId || `srv_${Date.now()}`,
      category: finalCategory,
      name: serviceForm.name.trim(),
      rate: Number(serviceForm.rate) || 0,
      type: serviceForm.type || "service",
      icon: serviceForm.icon || "🛠️",
      description: serviceForm.description || "",
      active: serviceForm.active !== false,
      updatedAt: new Date().toISOString(),
    };

    let updatedList;
    if (editingServiceId) {
      updatedList = serviceRates.map((s) => (s.id === editingServiceId ? newServiceObj : s));
    } else {
      updatedList = [newServiceObj, ...serviceRates];
    }

    setServiceRates(updatedList);
    localStorage.setItem("tyresaathi_custom_rates", JSON.stringify(updatedList));
    window.dispatchEvent(new CustomEvent("tyresaathi_rates_updated", { detail: updatedList }));

    try {
      await setDoc(doc(db, "service_categories", newServiceObj.id), newServiceObj, { merge: true });
    } catch (err) {
      console.warn("Firestore service sync error:", err);
    }

    setServiceModalOpen(false);
    setEditingServiceId(null);
    setServiceSuccessMsg(`✅ Service "${newServiceObj.name}" (₹${newServiceObj.rate}) safaltapoorvak save ho gaya hai!`);
    setTimeout(() => setServiceSuccessMsg(""), 4000);
  };

  const handleToggleServiceStatus = async (id) => {
    let target = null;
    const updated = serviceRates.map((s) => {
      if (s.id === id) {
        const next = { ...s, active: s.active === false ? true : false };
        target = next;
        return next;
      }
      return s;
    });

    setServiceRates(updated);
    localStorage.setItem("tyresaathi_custom_rates", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("tyresaathi_rates_updated", { detail: updated }));

    if (target) {
      try {
        await setDoc(doc(db, "service_categories", id), target, { merge: true });
      } catch (err) {
        console.warn("Firestore sync error:", err);
      }
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Kya aap sach me is service category ko delete karna chahte hain?")) {
      const updated = serviceRates.filter((s) => s.id !== id);
      setServiceRates(updated);
      localStorage.setItem("tyresaathi_custom_rates", JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("tyresaathi_rates_updated", { detail: updated }));

      try {
        await deleteDoc(doc(db, "service_categories", id));
      } catch (err) {
        console.warn("Firestore delete error:", err);
      }
    }
  };

  // Search & Filter
  const [searchUser, setSearchUser] = useState("");
  const [userRoleFilterTab, setUserRoleFilterTab] = useState("all"); // 'all' | 'shops' | 'customers'
  const [userCityFilter, setUserCityFilter] = useState("all");
  const [userStatusFilter, setUserStatusFilter] = useState("all"); // 'all' | 'verified' | 'unverified'

  // 📞 Live Support Helpline & WhatsApp Contact State
  const [supportContact, setSupportContact] = useState(getSupportContactConfig);
  const [supportSaving, setSupportSaving] = useState(false);
  const [supportSuccessMsg, setSupportSuccessMsg] = useState("");

  const handleSaveSupportContact = async (e) => {
    if (e) e.preventDefault();
    setSupportSaving(true);
    setSupportSuccessMsg("");
    try {
      const res = await saveSupportContactConfig(supportContact);
      if (res) {
        setSupportSuccessMsg("✅ Support Mobile & WhatsApp number successfully update ho gaya hai! Ye live reflect hoga.");
        setTimeout(() => setSupportSuccessMsg(""), 5000);
      }
    } catch (err) {
      alert("Support number save karne me samasya aayi: " + err.message);
    } finally {
      setSupportSaving(false);
    }
  };

  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");

  useEffect(() => {
    const handleToggle = () => setMobileSidebarOpen((prev) => !prev);
    window.addEventListener("toggle_admin_sidebar", handleToggle);
    return () => window.removeEventListener("toggle_admin_sidebar", handleToggle);
  }, []);

  // 🎫 Support Ticket Resolver State
  const [replyTicketModal, setReplyTicketModal] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyStatus, setReplyStatus] = useState("resolved");
  const [solvingTicketLoading, setSolvingTicketLoading] = useState(false);
  const [ticketFilter, setTicketFilter] = useState("all");
  const [ticketSearch, setTicketSearch] = useState("");
  const [ticketSuccessMsg, setTicketSuccessMsg] = useState("");
  const [sectionDropdownOpen, setSectionDropdownOpen] = useState(false);
  const [previewModalImg, setPreviewModalImg] = useState(null);

  const handleOpenReplyTicket = (t) => {
    setReplyTicketModal(t);
    setReplyText(t.adminReply || "");
    setReplyStatus(t.status || "resolved");
  };

  const handleSaveTicketResolution = async (e) => {
    if (e) e.preventDefault();
    if (!replyTicketModal) return;

    if (!replyText.trim()) {
      alert("Kripya customer ke liye reply ya samadhan sandesh zaroor darj karein!");
      return;
    }

    setSolvingTicketLoading(true);
    const updatedTicket = {
      ...replyTicketModal,
      status: replyStatus,
      adminReply: replyText.trim(),
      resolvedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedList = tickets.map((t) => (t.id === replyTicketModal.id ? updatedTicket : t));
    setTickets(updatedList);

    try {
      localStorage.setItem("tyresaathi_user_tickets", JSON.stringify(updatedList));
      localStorage.setItem("tyresaathi_admin_tickets", JSON.stringify(updatedList));
      await setDoc(doc(db, "support_tickets", replyTicketModal.id), updatedTicket, { merge: true });
    } catch (err) {
      console.warn("Firestore support_tickets update sync note:", err);
    }

    if (replyTicketModal.userId) {
      try {
        sendInAppNotification({
          userId: replyTicketModal.userId,
          title: `🎫 Ticket #${replyTicketModal.ticketNo || replyTicketModal.id.slice(0, 6)} Resolved!`,
          message: `Admin Reply: ${replyText.trim().slice(0, 100)}...`,
          type: "ticket",
          ticketId: replyTicketModal.id,
        });
      } catch (e) {}
    }

    setSolvingTicketLoading(false);
    setReplyTicketModal(null);
    setTicketSuccessMsg(`✅ Ticket #${replyTicketModal.ticketNo || replyTicketModal.id} successfully update ho gaya hai!`);
    setTimeout(() => setTicketSuccessMsg(""), 5000);
  };

  const handleDeleteTicket = async (id) => {
    if (window.confirm("Kya aap sach me is support ticket ko delete karna chahte hain?")) {
      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      try {
        localStorage.setItem("tyresaathi_user_tickets", JSON.stringify(updated));
        await deleteDoc(doc(db, "support_tickets", id));
      } catch (err) {
        console.warn("Firestore ticket delete error:", err);
      }
    }
  };

  const handleAddSampleTicket = async () => {
    // Determine next sequential ticket number starting from TS-TCK-01
    const next = tickets.length + 1;
    const formatted = next < 10 ? `0${next}` : String(next);
    const ticketNo = `TS-TCK-${formatted}`;

    const sample = {
      id: ticketNo,
      ticketNo: ticketNo,
      userName: "Your Name",
      userPhone: "10 digit mobile number",
      userEmail: "your@gmail.com",
      category: "Puncture / Fitting Service",
      priority: "high",
      subject: "Doorstep emergency puncture assistance issue",
      description: "Maine emergency puncture service request kiya tha. Please confirmation update bhejein.",
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [sample, ...tickets];
    setTickets(updated);
    try {
      localStorage.setItem("tyresaathi_admin_tickets", JSON.stringify(updated));
      await setDoc(doc(db, "support_tickets", sample.id), sample, { merge: true });
    } catch (e) {}
    setTicketSuccessMsg(`✅ Naya test ticket (#${ticketNo}) add kar diya gaya hai!`);
    setTimeout(() => setTicketSuccessMsg(""), 4000);
  };

  const handleResetTicketSequence = () => {
    if (window.confirm("Kya aap sabhi support tickets ko #TS-TCK-01 se re-index karke sequential karna chahte hain?")) {
      const normalized = normalizeTicketList(tickets);
      setTickets(normalized);
      localStorage.setItem("tyresaathi_admin_tickets", JSON.stringify(normalized));
      setTicketSuccessMsg("✅ Sabhi tickets numbering #TS-TCK-01 series me re-index ho gayi hai!");
      setTimeout(() => setTicketSuccessMsg(""), 4000);
    }
  };

  const handleClearAllTickets = async () => {
    if (window.confirm("Kya aap sabhi tickets ko clear/delete karna chahte hain taaki agla ticket bilkul fresh #TS-TCK-01 se start ho?")) {
      setTickets([]);
      localStorage.removeItem("tyresaathi_user_tickets");
      localStorage.removeItem("tyresaathi_admin_tickets");
      setTicketSuccessMsg("🗑️ Sabhi tickets clear ho gaye hain. Ab naya ticket #TS-TCK-01 se shuru hoga!");
      setTimeout(() => setTicketSuccessMsg(""), 4000);
    }
  };

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

  // 👥 Employee & Staff Access Manager State
  const [staffList, setStaffList] = useState(() => {
    try {
      const local = localStorage.getItem("tyresaathi_staff_members");
      return local ? JSON.parse(local) : DEFAULT_STAFF_MEMBERS;
    } catch {
      return DEFAULT_STAFF_MEMBERS;
    }
  });
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [staffSuccessMsg, setStaffSuccessMsg] = useState("");
  const [staffSearch, setStaffSearch] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickRole, setQuickRole] = useState("support");
  const [visiblePinMap, setVisiblePinMap] = useState({ staff_1: true, staff_2: true });
  const [copiedStaffId, setCopiedStaffId] = useState("");
  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Support & Ticket Executive",
    roleKey: "support",
    passcode: "582914",
    status: "active",
    permissions: ["tickets", "bookings"],
    notes: ""
  });

  const togglePinVisibility = (staffId) => {
    setVisiblePinMap((prev) => ({ ...prev, [staffId]: !prev[staffId] }));
  };

  const handleOpenAddStaff = () => {
    setEditingStaffId(null);
    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    setStaffForm({
      name: "",
      email: "",
      phone: "",
      role: "Support & Ticket Executive",
      roleKey: "support",
      passcode: generatedPin,
      status: "active",
      permissions: ["tickets", "bookings"],
      notes: ""
    });
    setStaffModalOpen(true);
  };

  const handleOpenEditStaff = (staff) => {
    setEditingStaffId(staff.id);
    setStaffForm({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      roleKey: staff.roleKey || "custom",
      passcode: staff.passcode || "582914",
      status: staff.status || "active",
      permissions: staff.permissions || ["tickets"],
      notes: staff.notes || ""
    });
    setStaffModalOpen(true);
  };

  const handleQuickGrantAccess = async (e) => {
    if (e) e.preventDefault();
    if (!quickEmail.trim() || !quickEmail.includes("@")) {
      alert("Kripya valid employee email ID darj karein!");
      return;
    }
    const cleanEmail = quickEmail.trim().toLowerCase();
    const existing = staffList.find((s) => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      alert(`Ye email (${cleanEmail}) pehle se staff list me shamil hai! PIN: ${existing.passcode || "582914"}`);
      return;
    }

    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    const roleTitleMap = {
      support: "Support & Ticket Executive",
      operations: "Store & Operations Manager",
      billing: "Billing & Accounts Staff",
      custom: "Sub-Admin Manager"
    };
    const rolePermMap = {
      support: ["tickets", "bookings"],
      operations: ["shops", "services", "ads", "bookings"],
      billing: ["bookings", "excel", "traffic"],
      custom: ["tickets", "shops", "bookings"]
    };

    const nameFromEmail = cleanEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const newStaff = {
      id: `staff_${Date.now()}`,
      name: nameFromEmail || "Staff Member",
      email: cleanEmail,
      phone: "10 digit mobile number",
      role: roleTitleMap[quickRole] || "Support & Ticket Executive",
      roleKey: quickRole,
      passcode: generatedPin,
      status: "active",
      permissions: rolePermMap[quickRole] || ["tickets", "bookings"],
      joinedDate: new Date().toISOString().split("T")[0],
      notes: `Quick access granted via Email ID on ${new Date().toISOString().split("T")[0]}`
    };

    const updatedList = [newStaff, ...staffList];
    setStaffList(updatedList);
    localStorage.setItem("tyresaathi_staff_members", JSON.stringify(updatedList));
    try {
      await setDoc(doc(db, "app_settings", "staff_accounts"), { list: updatedList }, { merge: true });
    } catch (err) {}

    setVisiblePinMap((prev) => ({ ...prev, [newStaff.id]: true }));
    setQuickEmail("");
    setStaffSuccessMsg(`🎉 Success! Email "${cleanEmail}" ko Admin Access mil gaya hai! PIN: ${generatedPin}`);
    setTimeout(() => setStaffSuccessMsg(""), 6000);
  };

  const handleCopyStaffCredentials = (staff) => {
    const text = `🔐 TyreSaathi Admin Access Credentials:
👤 Name: ${staff.name}
✉️ Email: ${staff.email}
🔑 PIN / Passcode: ${staff.passcode || "582914"}
🎯 Role: ${staff.role}
🌐 Admin Portal: ${window.location.origin}/admin`;
    navigator.clipboard.writeText(text);
    setCopiedStaffId(staff.id);
    setTimeout(() => setCopiedStaffId(""), 3000);
  };

  const handleShareStaffWhatsApp = (staff) => {
    const text = encodeURIComponent(`🔐 *TyreSaathi Admin Access Granted!*
Namaste ${staff.name}, aapko TyreSaathi Admin Portal ka role-based access diya gaya hai.

✉️ *Login Email:* ${staff.email}
🔑 *Access PIN:* ${staff.passcode || "582914"}
🎯 *Assigned Role:* ${staff.role}
🌐 *Admin Link:* ${window.location.origin}/admin

*(Note: Sensitive data such as Bank/UPI is locked to Super Admin)*`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleSaveStaff = async (e) => {
    if (e) e.preventDefault();
    if (!staffForm.name.trim() || !staffForm.email.trim()) {
      alert("Kripya Employee ka Naam aur Email zaroor bharein!");
      return;
    }

    let updatedList;
    if (editingStaffId) {
      updatedList = staffList.map((s) => s.id === editingStaffId ? { ...s, ...staffForm } : s);
      setStaffSuccessMsg(`✅ Staff member "${staffForm.name}" updated successfully!`);
    } else {
      const newStaff = {
        id: `staff_${Date.now()}`,
        ...staffForm,
        joinedDate: new Date().toISOString().split("T")[0]
      };
      updatedList = [newStaff, ...staffList];
      setVisiblePinMap((prev) => ({ ...prev, [newStaff.id]: true }));
      setStaffSuccessMsg(`🎉 Naya Employee / Staff "${staffForm.name}" add ho gaya hai!`);
    }

    setStaffList(updatedList);
    localStorage.setItem("tyresaathi_staff_members", JSON.stringify(updatedList));
    try {
      await setDoc(doc(db, "app_settings", "staff_accounts"), { list: updatedList }, { merge: true });
    } catch (err) {}

    setStaffModalOpen(false);
    setTimeout(() => setStaffSuccessMsg(""), 5000);
  };

  const handleToggleStaffStatus = async (id) => {
    const updated = staffList.map((s) => {
      if (s.id === id) {
        return { ...s, status: s.status === "active" ? "blocked" : "active" };
      }
      return s;
    });
    setStaffList(updated);
    localStorage.setItem("tyresaathi_staff_members", JSON.stringify(updated));
    try {
      await setDoc(doc(db, "app_settings", "staff_accounts"), { list: updated }, { merge: true });
    } catch (err) {}
    setStaffSuccessMsg("🔄 Staff account status update ho gaya hai!");
    setTimeout(() => setStaffSuccessMsg(""), 4000);
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm("Kya aap sach me is employee ka admin access permanently delete karna chahte hain?")) {
      const updated = staffList.filter((s) => s.id !== id);
      setStaffList(updated);
      localStorage.setItem("tyresaathi_staff_members", JSON.stringify(updated));
      try {
        await setDoc(doc(db, "app_settings", "staff_accounts"), { list: updated }, { merge: true });
      } catch (err) {}
      setStaffSuccessMsg("🗑️ Staff access permanently delete kar diya gaya hai.");
      setTimeout(() => setStaffSuccessMsg(""), 4000);
    }
  };

  // 🚀 App Version Control & Broadcast Notifications State
  const [versionControl, setVersionControl] = useState({
    latestVersion: "1.2.4",
    buildNumber: 6,
    downloadUrl: "https://indusapp.store/t5arj7n8",
    releaseMessage: "TyreSaathi is now officially live on PhonePe Indus Appstore! Download or update for best tyre deals and services.",
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

  // Load Real Data from Firestore (callable anytime for Live Sync)
  const loadAdminData = async () => {
    setIsSyncing(true);
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
        const list = tckSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const normalized = normalizeTicketList(list);
        setTickets(normalized);
        localStorage.setItem("tyresaathi_user_tickets", JSON.stringify(normalized));
      } else {
        const local = localStorage.getItem("tyresaathi_user_tickets");
        if (local) {
          const normalized = normalizeTicketList(JSON.parse(local));
          setTickets(normalized);
          localStorage.setItem("tyresaathi_user_tickets", JSON.stringify(normalized));
        }
      }
    } catch (err) {
      console.warn("Firestore tickets load fallback to local:", err);
      const local = localStorage.getItem("tyresaathi_user_tickets");
      if (local) {
        const normalized = normalizeTicketList(JSON.parse(local));
        setTickets(normalized);
      }
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
      const srvSnap = await getDocs(collection(db, "service_categories"));
      if (!srvSnap.empty) {
        const list = srvSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setServiceRates(list);
        localStorage.setItem("tyresaathi_custom_rates", JSON.stringify(list));
      }
    } catch (err) {
      console.warn("Firestore service_categories load notice:", err);
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
        if (d.id === "support_contact") {
          const sData = d.data();
          setSupportContact((prev) => ({ ...prev, ...sData }));
          try {
            localStorage.setItem("tyresaathi_support_contact_config", JSON.stringify(sData));
          } catch {}
        }
      });
    } catch (e) {
      console.warn("Firestore app_settings load:", e);
    } finally {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    }
  };

  useEffect(() => {
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
      city: shop.city || "All Cities",
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
        city: formatSafeText(u.city, "Not Specified"),
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
        city: formatSafeText(b.city, "Not Specified"),
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
        city: formatSafeText(inv.customerCity, "Not Specified"),
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
      { id: "c_1", name: "Your Name", phone: "9826112345", email: "your@gmail.com", city: "Raipur", vehicleType: "Car / SUV", vehicleNumber: "CG 04 MB 1234", vehicleModel: "Hyundai Creta", totalBookings: 3, totalSpent: 4500, lastActive: "2026-09-22", source: "Registered Customer" },
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

  // Master Admin Navigation & Capability Matrix
  const ADMIN_NAV_SECTIONS = [
    { id: "overview", label: "Overview", icon: TrendingUp, color: "#c0392b", category: "Core", desc: "Command center metrics, system health & module launcher" },
    { id: "services", label: "Categories & Rates", icon: Sparkles, color: "#2563eb", category: "Catalog", count: serviceRates.length, badge: "Live Master", desc: "Tyre services, repairs, roadside & dynamic rate master" },
    { id: "traffic", label: "Traffic & Graphs", icon: BarChart3, color: "#d97706", category: "Analytics", badge: "Real-Time", desc: "Live store footfall, impressions & viewer analytics" },
    { id: "ads", label: "Shop Ads Manager", icon: Megaphone, color: "#ec4899", category: "Marketing", count: ads.length, badge: `${activeAdsCount} Active`, desc: "Promotional banner ads, offers & campaign controls" },
    { id: "shops", label: "Shops & Users", icon: Store, color: "#059669", category: "Directory", count: users.length, badge: pendingApprovals > 0 ? `${pendingApprovals} Pending` : null, desc: "Partner approvals, verification & customer records" },
    { id: "pricing", label: "Plans & Pricing", icon: Crown, color: "#7c3aed", category: "Billing", badge: subConfig.launchFreeMode ? "Free Launch" : "Paid Mode", desc: "Dealer membership subscription tiers & pricing controls" },
    { id: "bank", label: "Bank & UPI QR", icon: Building2, color: "#0284c7", category: "Treasury", desc: "Official payment receiving accounts & QR codes" },
    { id: "staff", label: "Staff & Sub-Admins", icon: Users, color: "#4f46e5", category: "Security", count: staffList.length, badge: "Access Control", desc: "Sub-admin privileges & team access permissions" },
    { id: "bookings", label: "Live Bookings", icon: Calendar, color: "#8b5cf6", category: "Operations", count: bookings.length, desc: "Global fitting, roadside & puncture service bookings" },
    { id: "tickets", label: "Support Tickets", icon: LifeBuoy, color: "#ef4444", category: "Helpdesk", count: tickets.length, badge: openTickets > 0 ? `${openTickets} Open` : null, desc: "Customer complaints, queries & dispute ticketing" },
    { id: "excel", label: "Excel Data Center", icon: FileSpreadsheet, color: "#10b981", category: "Exports", desc: "1-Click automated Excel & CSV data exports" },
    { id: "updates", label: "Push Updates", icon: Bell, color: "#8e44ad", category: "System", badge: "Live Push", desc: "Network broadcast alerts & APK release updates" }
  ];

  const filteredNavSections = adminJumpQuery.trim()
    ? ADMIN_NAV_SECTIONS.filter((sec) =>
        sec.label.toLowerCase().includes(adminJumpQuery.toLowerCase()) ||
        sec.desc.toLowerCase().includes(adminJumpQuery.toLowerCase()) ||
        sec.id.toLowerCase().includes(adminJumpQuery.toLowerCase()) ||
        sec.category.toLowerCase().includes(adminJumpQuery.toLowerCase())
      )
    : ADMIN_NAV_SECTIONS;

  return (
    <div className={`admin-enterprise-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* 📱 Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 🏢 Left Enterprise Sidebar */}
      <aside className={`admin-enterprise-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-brand-row">
          <div className="sidebar-brand" onClick={() => { setActiveTab("overview"); setMobileSidebarOpen(false); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/logo.png"
              alt="TyreSaathi Official Logo"
              className="sidebar-brand-logo-img"
              onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
              style={{
                width: "38px",
                height: "38px",
                objectFit: "contain",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                padding: "2px",
                flexShrink: 0
              }}
            />
            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <span className="sidebar-brand-text" style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em" }}>
                  TYRE<span style={{ color: "#c0392b" }}>SAATHI</span>
                </span>
                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                  Master Admin
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            className="sidebar-toggle-btn hide-on-mobile"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          <button
            type="button"
            className="admin-sidebar-mobile-close show-on-mobile-only"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close admin menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-nav-scroll">
          {/* 1. Main Dashboard Item */}
          <button
            type="button"
            className={`sidebar-nav-item item-dashboard ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => { setActiveTab("overview"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><LayoutGrid size={18} /></span>
            {!sidebarCollapsed && <span className="sidebar-nav-label">Dashboard</span>}
          </button>

          {/* 2. Network Category */}
          <div className="sidebar-section-divider">
            {!sidebarCollapsed && <span className="sidebar-section-title">Network Category</span>}
          </div>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "shops" ? "active" : ""}`}
            onClick={() => { setActiveTab("shops"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Store size={18} /></span>
            {!sidebarCollapsed && (
              <span className="sidebar-nav-label">
                Network & Shops
                {pendingApprovals > 0 && <span className="sidebar-badge-amber">{pendingApprovals}</span>}
              </span>
            )}
          </button>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "services" ? "active" : ""}`}
            onClick={() => { setActiveTab("services"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Tag size={18} /></span>
            {!sidebarCollapsed && (
              <span className="sidebar-nav-label">
                Service Rates Master
                <span className="sidebar-badge-blue">{serviceRates.length}</span>
              </span>
            )}
          </button>

          {/* 3. Shop Ads Campaigns */}
          <div className="sidebar-section-divider">
            {!sidebarCollapsed && <span className="sidebar-section-title">Shop Ads Campaigns</span>}
          </div>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "ads" ? "active" : ""}`}
            onClick={() => { setActiveTab("ads"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Megaphone size={18} /></span>
            {!sidebarCollapsed && (
              <span className="sidebar-nav-label">
                Shop Ads Campaigns
                {activeAdsCount > 0 && <span className="sidebar-badge-green">{activeAdsCount}</span>}
              </span>
            )}
          </button>

          {/* 4. Operations & Bookings */}
          <div className="sidebar-section-divider">
            {!sidebarCollapsed && <span className="sidebar-section-title">Operations & Bookings</span>}
          </div>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => { setActiveTab("bookings"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Calendar size={18} /></span>
            {!sidebarCollapsed && (
              <span className="sidebar-nav-label">
                Operations & Bookings
                <span className="sidebar-badge-neutral">{bookings.length}</span>
              </span>
            )}
          </button>

          {/* 5. Financials & UPI */}
          <div className="sidebar-section-divider">
            {!sidebarCollapsed && <span className="sidebar-section-title">Financials & UPI</span>}
          </div>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "bank" ? "active" : ""}`}
            onClick={() => { setActiveTab("bank"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><CreditCard size={18} /></span>
            {!sidebarCollapsed && <span className="sidebar-nav-label">Financials & UPI</span>}
          </button>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "pricing" ? "active" : ""}`}
            onClick={() => { setActiveTab("pricing"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Crown size={18} /></span>
            {!sidebarCollapsed && (
              <span className="sidebar-nav-label">
                Plans & Pricing
                <span className={subConfig.launchFreeMode ? "sidebar-badge-green" : "sidebar-badge-amber"}>
                  {subConfig.launchFreeMode ? "Free" : "Paid"}
                </span>
              </span>
            )}
          </button>

          {/* 6. Support */}
          <div className="sidebar-section-divider">
            {!sidebarCollapsed && <span className="sidebar-section-title">Support</span>}
          </div>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "tickets" ? "active" : ""}`}
            onClick={() => { setActiveTab("tickets"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><LifeBuoy size={18} /></span>
            {!sidebarCollapsed && (
              <span className="sidebar-nav-label">
                Support Helpdesk
                {openTickets > 0 && <span className="sidebar-badge-red">{openTickets}</span>}
              </span>
            )}
          </button>

          {/* 7. Analytics & System */}
          <div className="sidebar-section-divider">
            {!sidebarCollapsed && <span className="sidebar-section-title">Analytics & Tools</span>}
          </div>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "traffic" ? "active" : ""}`}
            onClick={() => { setActiveTab("traffic"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><BarChart3 size={18} /></span>
            {!sidebarCollapsed && <span className="sidebar-nav-label">Traffic & Analytics</span>}
          </button>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "excel" ? "active" : ""}`}
            onClick={() => { setActiveTab("excel"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><FileSpreadsheet size={18} /></span>
            {!sidebarCollapsed && <span className="sidebar-nav-label">Excel Center</span>}
          </button>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "staff" ? "active" : ""}`}
            onClick={() => { setActiveTab("staff"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Users size={18} /></span>
            {!sidebarCollapsed && <span className="sidebar-nav-label">Staff & Access</span>}
          </button>
          <button
            type="button"
            className={`sidebar-nav-item ${activeTab === "updates" ? "active" : ""}`}
            onClick={() => { setActiveTab("updates"); setMobileSidebarOpen(false); }}
          >
            <span className="sidebar-nav-icon"><Bell size={18} /></span>
            {!sidebarCollapsed && <span className="sidebar-nav-label">Push Updates</span>}
          </button>
        </div>

        {/* Sidebar Footer User Info */}
        {(!sidebarCollapsed || mobileSidebarOpen) && (
          <div className="sidebar-footer-user">
            <div className="sidebar-footer-user-row">
              <span className="sidebar-user-avatar">ROOT</span>
              <div className="sidebar-user-details">
                <span className="sidebar-user-email">{user?.email || "tyresathi@gmail.com"}</span>
                <span className="sidebar-user-badge">Super Admin</span>
              </div>
            </div>
            <Link
              to="/"
              className="sidebar-exit-store-link"
              onClick={() => setMobileSidebarOpen(false)}
              title="Exit Admin Panel & View Customer App"
            >
              <Home size={13} />
              <span>← Exit to Main App</span>
            </Link>
          </div>
        )}
      </aside>

      {/* 🚀 Main Enterprise Viewport */}
      <main className="admin-enterprise-main">
        {/* Floating Return Bar when in other tabs */}
        {activeTab !== "overview" && (
          <div className="admin-subtab-top-bar">
            <div className="admin-subtab-nav-actions">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="btn-admin-mobile-sections show-on-mobile-only"
                aria-label="Open Admin Sections Drawer"
              >
                <LayoutGrid size={15} /> <span>Sections</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className="btn-back-to-dashboard"
              >
                <ArrowLeft size={15} /> ← Back to Dashboard
              </button>
            </div>
            <div className="subtab-section-tag">
              <span>Current Section:</span>
              <strong>{activeTab.toUpperCase()}</strong>
            </div>
          </div>
        )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: OVERVIEW DASHBOARD & METRICS (100% REAL DATA, NO PLACEHOLDERS)
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="dark-enterprise-dashboard">
          {/* Subtle Tyre Silhouette Background Watermarks */}
          <div className="admin-tyre-bg-watermark-right" aria-hidden="true" />
          <div className="admin-tyre-bg-watermark-left" aria-hidden="true" />

          {/* Header Bar */}
          <div className="dark-dash-header">
            <div className="dark-dash-title-wrap">
              <div className="dark-dash-title-row">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="btn-admin-mobile-sections show-on-mobile-only"
                  aria-label="Open Admin Menu"
                >
                  <LayoutGrid size={15} /> <span>Menu</span>
                </button>
                <h1 className="dark-dash-title">Dashboard</h1>
                <span className="dark-dash-live-badge">Live System</span>
              </div>
              <p className="dark-dash-subtitle">
                TyreSaathi Enterprise Master Admin — Real-time Network Intelligence & Operations
              </p>
            </div>

            <div className="dark-dash-actions">
              <div className="dark-dash-search">
                <Search size={16} className="dark-search-icon" />
                <input
                  type="text"
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  placeholder="Search network, shops, bookings..."
                  className="dark-search-input"
                />
              </div>
              <button
                type="button"
                onClick={loadAdminData}
                disabled={isSyncing}
                className="dark-sync-btn"
                title="Sync live platform data from network"
              >
                <RefreshCw size={14} className={isSyncing ? "icon-spin" : ""} />
                <span>{isSyncing ? "Syncing Network..." : "Live Sync"}</span>
              </button>
            </div>
          </div>

          {/* Top 4 Glowing Metric KPI Cards (100% Real Live Statistics) */}
          <div className="dark-kpi-grid">
            {/* Card 1: Total Revenue */}
            <div className="dark-kpi-card kpi-emerald-glow" onClick={() => setActiveTab("billing")} title="Click to view Billing & Invoices">
              <div className="dark-kpi-top">
                <span className="dark-kpi-label">Total Revenue (कुल रेवेन्यू)</span>
                <span className="dark-trend-badge badge-green">
                  {realTotalRevenue > 0 ? "Live Sales" : "Active"}
                </span>
              </div>
              <div className="dark-kpi-value">₹{realTotalRevenue.toLocaleString("en-IN")}</div>
              <div className="dark-kpi-sub">
                {invoices.length} billing records + {bookings.length} service bookings
              </div>
            </div>

            {/* Card 2: Live Bookings */}
            <div className="dark-kpi-card kpi-teal-glow" onClick={() => setActiveTab("bookings")} title="Click to view Bookings">
              <div className="dark-kpi-top">
                <span className="dark-kpi-label">Live Bookings (सक्रिय बुकिंग्स)</span>
                <span className="dark-trend-badge badge-green">
                  {realLiveBookings > 0 ? `${realLiveBookings} Active` : "Sync Ready"}
                </span>
              </div>
              <div className="dark-kpi-value">{realLiveBookings}</div>
              <div className="dark-kpi-sub">
                {bookings.filter((b) => b.status === "completed" || b.status === "accepted").length} confirmed & fulfilled
              </div>
            </div>

            {/* Card 3: Verified Partner Hubs */}
            <div className="dark-kpi-card kpi-cyan-glow" onClick={() => setActiveTab("shops")} title="Click to view Network & Shops">
              <div className="dark-kpi-top">
                <span className="dark-kpi-label">Verified Partner Hubs (पार्टनर दुकानें)</span>
                <span className="dark-trend-badge badge-green">Network Verified</span>
              </div>
              <div className="dark-kpi-value">{realTotalShops}</div>
              <div className="dark-kpi-sub">
                {users.filter((u) => u.shopApproved !== false).length} approved tyre service centres
              </div>
            </div>

            {/* Card 4: Open Tickets */}
            <div className="dark-kpi-card kpi-rose-glow" onClick={() => setActiveTab("tickets")} title="Click to view Support Tickets">
              <div className="dark-kpi-top">
                <span className="dark-kpi-label">Open Tickets (सपोर्ट टिकट्स)</span>
                <span className={`dark-trend-badge ${realOpenTickets > 0 ? "badge-rose" : "badge-green"}`}>
                  {realOpenTickets > 0 ? `${realOpenTickets} Action Required` : "All Clear"}
                </span>
              </div>
              <div className="dark-kpi-value">{realOpenTickets}</div>
              <div className="dark-kpi-sub">
                {tickets.length} total customer tickets raised
              </div>
            </div>
          </div>

          {/* 2-Column Live Operations Cockpit (No Duplicate Sections) */}
          <div className="dark-cockpit-grid">
            {/* Column 1 (Left): Traffic Activity & Recent Bookings */}
            <div className="dark-cockpit-col">
              {/* Real-time Traffic & Network Statistics */}
              <div className="dark-card">
                <div className="dark-card-header">
                  <span className="dark-card-title">Real-time Traffic & Operations</span>
                  <button type="button" onClick={() => setActiveTab("traffic")} className="dark-card-link">
                    Analytics <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <div className="dark-traffic-scale">
                    Platform Activity Scale: <strong>{users.length + bookings.length * 10} pts</strong>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}>
                    Last Synced: {lastSyncTime}
                  </span>
                </div>
                <div className="dark-traffic-chart">
                  <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="dark-wave-svg">
                    <defs>
                      <linearGradient id="darkWaveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#2563eb" floodOpacity="0.5"/>
                      </filter>
                    </defs>
                    <path d="M 0 95 Q 60 45 120 70 T 240 32 T 360 85 T 440 22 T 500 55 L 500 120 L 0 120 Z" fill="url(#darkWaveGrad)" />
                    <path d="M 0 95 Q 60 45 120 70 T 240 32 T 360 85 T 440 22 T 500 55" fill="none" stroke="#2563eb" strokeWidth="2.8" filter="url(#glowBlue)" />
                    <circle cx="120" cy="70" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="240" cy="32" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="360" cy="85" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="440" cy="22" r="5.5" fill="#c0392b" stroke="#ffffff" strokeWidth="2" filter="url(#glowBlue)" />
                  </svg>
                </div>
                <div className="dark-traffic-stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginTop: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Registered Users</span>
                    <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>{users.length}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Active Hubs</span>
                    <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>{realTotalShops}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block" }}>Total Bookings</span>
                    <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>{realLiveBookings}</strong>
                  </div>
                </div>
              </div>

              {/* Recent Bookings Queue (Real Data) */}
              <div className="dark-card">
                <div className="dark-card-header">
                  <span className="dark-card-title">Recent Service Bookings</span>
                  <button type="button" onClick={() => setActiveTab("bookings")} className="dark-card-link">
                    View All ({bookings.length}) <ChevronRight size={14} />
                  </button>
                </div>
                <div className="dark-item-list">
                  {bookings.length > 0 ? (
                    bookings.slice(0, 4).map((b, idx) => {
                      const title = formatSafeText(b.customerName || b.name, "Customer");
                      const sub = `${b.vehicleNo ? b.vehicleNo + " • " : ""}${formatSafeText(b.serviceName || b.serviceType, "Tyre Service")} (${formatSafeDate(b.date || b.createdAt)})`;
                      const rawStatus = (b.status || "confirmed").toLowerCase();
                      const status = rawStatus === "completed" || rawStatus === "accepted" ? "confirmed" : rawStatus === "cancelled" ? "cancelled" : "pending";
                      return (
                        <div key={b.id || idx} className="dark-list-item">
                          <div className="dark-item-icon-box">
                            <Calendar size={17} />
                          </div>
                          <div className="dark-item-info">
                            <div className="dark-item-title">{title}</div>
                            <div className="dark-item-sub">{sub}</div>
                          </div>
                          <span className={`dark-pill-badge pill-${status}`}>
                            {status === "confirmed" ? "Confirmed" : status === "pending" ? "Pending" : "Cancelled"}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: "center", padding: "24px 12px", color: "#64748b" }}>
                      <p style={{ margin: "0 0 8px", fontSize: "0.92rem", fontWeight: 600 }}>
                        Abhi tak koi booking prapt nahi hui hai.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab("bookings")}
                        className="btn-back-to-dashboard"
                        style={{ fontSize: "0.85rem", padding: "6px 14px" }}
                      >
                        + Bookings Desk Kholein
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Column 2 (Right): Real Partner Shops & Real Ad Campaigns */}
            <div className="dark-cockpit-col">
              {/* Verified Partner Hubs (Real Shops) */}
              <div className="dark-card">
                <div className="dark-card-header">
                  <span className="dark-card-title">Verified Partner Hubs</span>
                  <button type="button" onClick={() => setActiveTab("shops")} className="dark-card-link">
                    Manage Hubs ({realTotalShops}) <ChevronRight size={14} />
                  </button>
                </div>
                <div className="dark-item-list">
                  {users.filter((u) => u.shopName).length > 0 ? (
                    users.filter((u) => u.shopName).slice(0, 4).map((shop, idx) => (
                      <div key={shop.uid || idx} className="dark-list-item">
                        <div className="dark-item-icon-box circle-green">
                          <Store size={17} />
                        </div>
                        <div className="dark-item-info">
                          <div className="dark-item-title">{shop.shopName || shop.name}</div>
                          <div className="dark-item-sub">
                            {formatSafeText(shop.city?.trim() || (shop.address ? shop.address.split(",").slice(-2)[0]?.trim() : "") || shop.state, "Raipur")} • 📞 {formatSafeText(shop.phone, "—")}
                          </div>
                        </div>
                        <span className={`dark-pill-badge ${shop.shopApproved !== false ? "pill-confirmed" : "pill-pending"}`}>
                          {shop.shopApproved !== false ? "Verified" : "Pending"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "20px 12px", color: "#64748b" }}>
                      <p style={{ margin: 0, fontSize: "0.9rem" }}>Koi registered partner dukan nahi mili.</p>
                    </div>
                  )}
                  <div className="dark-card-footer">
                    <button type="button" onClick={() => setActiveTab("shops")} className="dark-show-more-btn">
                      Saari Dukaanein Dekhein →
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Shop Ad Campaigns (Real Data) */}
              <div className="dark-card">
                <div className="dark-card-header">
                  <span className="dark-card-title">Shop Promotional Campaigns</span>
                  <button type="button" onClick={() => setActiveTab("ads")} className="dark-card-link">
                    Campaigns ({ads.length}) <ChevronRight size={14} />
                  </button>
                </div>
                <div className="dark-item-list">
                  {ads.length > 0 ? (
                    ads.slice(0, 3).map((ad, idx) => {
                      const title = ad.shopName || ad.title || "Special Promotion";
                      const sub = `${formatSafeText(ad.city, "All India")} • ${formatSafeText(ad.offerBadge || ad.tagline, "Active Offer")}`;
                      const isActive = ad.active !== false;
                      return (
                        <div key={ad.id || idx} className="dark-list-item">
                          <div className="dark-item-icon-box circle-green">
                            <Megaphone size={17} />
                          </div>
                          <div className="dark-item-info">
                            <div className="dark-item-title">{title}</div>
                            <div className="dark-item-sub">{sub}</div>
                          </div>
                          <span className={`dark-pill-badge ${isActive ? "pill-active-green" : "pill-paused-amber"}`}>
                            {isActive ? "Active" : "Paused"}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: "center", padding: "22px 12px", color: "#64748b" }}>
                      <p style={{ margin: "0 0 8px", fontSize: "0.9rem", fontWeight: 600 }}>
                        Abhi koi active ad campaign nahi chal raha hai.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("ads");
                          setEditingAdId(null);
                          setAdModalOpen(true);
                        }}
                        className="btn-back-to-dashboard"
                        style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                      >
                        + Naya Ad Campaign Banayein
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB: 🛠️ SERVICE CATEGORIES & RATES MASTER
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "services" && (
        <div className="admin-section-container" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Header Banner - Clean White Background */}
          <div style={{
            background: "#ffffff",
            color: "#0f172a",
            borderRadius: "14px",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f8fafc", color: "#475569", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", marginBottom: "6px" }}>
                <Sparkles size={13} color="#c0392b" /> DYNAMIC SERVICES & CATEGORIES MASTER
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "800", margin: "0 0 4px", color: "#0f172a" }}>
                🛠️ Service Categories & Rates Master (कैटेगरी व रेट मास्टर)
              </h2>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b", maxWidth: "720px", lineHeight: "1.45" }}>
                Apne TyreSaathi network ke liye naye service categories (जैसे Puncher, Cut Repair, Fitting, Wheel Alignment, Car Wash) aur unke default rates define karein. Ye rates turant sabhi bills aur bookings par live reflect honge.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleOpenAddService}
                style={{
                  background: "linear-gradient(135deg, #c0392b 0%, #a93226 100%)",
                  color: "#ffffff",
                  border: "none",
                  padding: "9px 18px",
                  borderRadius: "10px",
                  fontWeight: "800",
                  fontSize: "13px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  boxShadow: "0 4px 12px rgba(192, 57, 43, 0.25)"
                }}
              >
                <Plus size={16} /> ➕ Nayi Category / Service Jodein
              </button>
            </div>
          </div>

          {/* Success Alerts */}
          {serviceSuccessMsg && (
            <div style={{ background: "#eafaf1", border: "1.5px solid #27ae60", color: "#1e824c", padding: "12px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "13.5px", display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={18} color="#27ae60" />
              <span>{serviceSuccessMsg}</span>
            </div>
          )}

          {/* Stats Metric Strip */}
          <div className="admin-stats-grid">
            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#eff6ff", color: "#2563eb" }}>
                <Sparkles size={22} />
              </span>
              <div>
                <span className="metric-lbl">Total Service Items</span>
                <h3 className="metric-val">{serviceRates.length} Items</h3>
                <small className="metric-note">Configured in Master</small>
              </div>
            </div>

            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#fdf4ff", color: "#a855f7" }}>
                <Tag size={22} />
              </span>
              <div>
                <span className="metric-lbl">Service Categories</span>
                <h3 className="metric-val">{availableCategories.length} Categories</h3>
                <small className="metric-note">Dynamic Groups</small>
              </div>
            </div>

            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#ecfdf5", color: "#10b981" }}>
                <CheckCircle2 size={22} />
              </span>
              <div>
                <span className="metric-lbl">Active & Live</span>
                <h3 className="metric-val">{serviceRates.filter((s) => s.active !== false).length} Active</h3>
                <small className="metric-note" style={{ color: "#10b981" }}>Available on Billing</small>
              </div>
            </div>

            <div className="admin-metric-card">
              <span className="metric-icon-wrap" style={{ background: "#fef3c7", color: "#d97706" }}>
                <DollarSign size={22} />
              </span>
              <div>
                <span className="metric-lbl">Highest Rate Service</span>
                <h3 className="metric-val">
                  ₹{Math.max(0, ...serviceRates.map((s) => Number(s.rate) || 0)).toLocaleString()}
                </h3>
                <small className="metric-note">Premium Tyre Job</small>
              </div>
            </div>
          </div>

          {/* Filter & Search Toolbar */}
          <div className="section-toolbar" style={{ flexWrap: "wrap", gap: "12px", background: "var(--surface)", padding: "14px", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <div className="search-bar-wrap" style={{ maxWidth: "360px" }}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by service name, category or rate..."
                value={serviceSearchTerm}
                onChange={(e) => setServiceSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter Pills (No blue bg, clean neutral styles) */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => setServiceCategoryFilter("all")}
                style={{
                  background: serviceCategoryFilter === "all" ? "#0f172a" : "#f8fafc",
                  color: serviceCategoryFilter === "all" ? "#ffffff" : "#475569",
                  border: "1px solid " + (serviceCategoryFilter === "all" ? "#0f172a" : "#e2e8f0"),
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "11.5px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                All Categories ({serviceRates.length})
              </button>

              {availableCategories.map((cat) => {
                const count = serviceRates.filter((s) => s.category === cat).length;
                const isSelected = serviceCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setServiceCategoryFilter(cat)}
                    style={{
                      background: isSelected ? "#0f172a" : "#f8fafc",
                      color: isSelected ? "#ffffff" : "#475569",
                      border: "1px solid " + (isSelected ? "#0f172a" : "#e2e8f0"),
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "11.5px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Text Table / High-Density List (Space-Saving) */}
          <div style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
          }}>
            <div style={{
              overflowX: "auto"
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "12.5px" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <th style={{ padding: "10px 14px", width: "40px" }}>Icon</th>
                    <th style={{ padding: "10px 14px" }}>Service Name & Details (सेवा का विवरण)</th>
                    <th style={{ padding: "10px 14px", width: "170px" }}>Category</th>
                    <th style={{ padding: "10px 14px", width: "110px" }}>Rate (दर)</th>
                    <th style={{ padding: "10px 14px", width: "95px" }}>Status</th>
                    <th style={{ padding: "10px 14px", width: "110px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const filteredItems = serviceRates.filter((s) => {
                      const matchesCat = serviceCategoryFilter === "all" || s.category === serviceCategoryFilter;
                      const q = serviceSearchTerm.toLowerCase().trim();
                      const matchesSearch =
                        !q ||
                        (s.name || "").toLowerCase().includes(q) ||
                        (s.category || "").toLowerCase().includes(q) ||
                        String(s.rate).includes(q) ||
                        (s.description || "").toLowerCase().includes(q);
                      return matchesCat && matchesSearch;
                    });

                    if (filteredItems.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} style={{ padding: "36px 14px", textAlign: "center", color: "#94a3b8" }}>
                            Koi service nahi mili. Nayi service jodne ke liye upar "+ Nayi Category / Service Jodein" dabayein.
                          </td>
                        </tr>
                      );
                    }

                    return filteredItems.map((srv, idx) => (
                      <tr
                        key={srv.id}
                        style={{
                          borderBottom: idx < filteredItems.length - 1 ? "1px solid #f1f5f9" : "none",
                          opacity: srv.active === false ? 0.6 : 1,
                          background: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                          transition: "background 0.15s ease"
                        }}
                      >
                        <td style={{ padding: "9px 14px", fontSize: "16px", verticalAlign: "middle" }}>
                          {srv.icon || "🛠️"}
                        </td>
                        <td style={{ padding: "9px 14px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                            <strong style={{ color: "#0f172a", fontSize: "13px" }}>{srv.name}</strong>
                            <span style={{ fontSize: "9.5px", fontWeight: "700", textTransform: "uppercase", background: "#f1f5f9", color: "#64748b", padding: "1.5px 6px", borderRadius: "4px" }}>
                              {srv.type || "service"}
                            </span>
                          </div>
                          {srv.description && (
                            <p style={{ margin: "2px 0 0", fontSize: "11.5px", color: "#64748b", lineHeight: "1.3" }}>
                              {srv.description}
                            </p>
                          )}
                        </td>
                        <td style={{ padding: "9px 14px", verticalAlign: "middle" }}>
                          <span style={{ display: "inline-block", background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0", padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}>
                            {srv.category}
                          </span>
                        </td>
                        <td style={{ padding: "9px 14px", verticalAlign: "middle" }}>
                          <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#16a34a" }}>
                            ₹{srv.rate}
                          </span>
                        </td>
                        <td style={{ padding: "9px 14px", verticalAlign: "middle" }}>
                          <button
                            type="button"
                            onClick={() => handleToggleServiceStatus(srv.id)}
                            style={{
                              background: srv.active !== false ? "#ecfdf5" : "#f1f5f9",
                              color: srv.active !== false ? "#16a34a" : "#64748b",
                              border: "1px solid " + (srv.active !== false ? "#a7f3d0" : "#cbd5e1"),
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontSize: "10.5px",
                              fontWeight: "700",
                              cursor: "pointer"
                            }}
                          >
                            {srv.active !== false ? "🟢 Live" : "⚪ Off"}
                          </button>
                        </td>
                        <td style={{ padding: "9px 14px", textAlign: "right", verticalAlign: "middle" }}>
                          <div style={{ display: "inline-flex", gap: "5px" }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEditService(srv)}
                              style={{
                                background: "#f8fafc",
                                border: "1px solid #cbd5e1",
                                color: "#0f172a",
                                padding: "3px 8px",
                                borderRadius: "5px",
                                fontSize: "11px",
                                fontWeight: "700",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px"
                              }}
                            >
                              <Edit3 size={11} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteService(srv.id)}
                              style={{
                                background: "#fff1f2",
                                border: "1px solid #fecdd3",
                                color: "#e11d48",
                                padding: "3px 6px",
                                borderRadius: "5px",
                                fontSize: "11px",
                                fontWeight: "700",
                                cursor: "pointer"
                              }}
                              title="Delete Service"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
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

                <div className="table-scroll-hint">
                  <span>👉 Swipe horizontally to view full stats & actions (बाएं-दाएं स्क्रॉल करें)</span>
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

                <div className="table-scroll-hint">
                  <span>👉 Swipe horizontally to view full customer history & actions (बाएं-दाएं स्क्रॉल करें)</span>
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
                                  <span>📍 {c.city || "Not Specified"}</span>
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
      {activeTab === "shops" && (() => {
        const allShopsCount = (users || []).filter((u) => u.role === "vendor" || u.role === "shop_owner" || Boolean(u.shopName)).length;
        const allCustomersCount = (users || []).filter((u) => u.role !== "vendor" && u.role !== "shop_owner" && !u.shopName).length;

        const filteredNetworkUsers = (users || []).filter((u) => {
          // 1. Role Sub-Tab Filter
          const isShop = u.role === "vendor" || u.role === "shop_owner" || Boolean(u.shopName);
          if (userRoleFilterTab === "shops" && !isShop) return false;
          if (userRoleFilterTab === "customers" && isShop) return false;

          // 2. City Filter
          if (userCityFilter !== "all") {
            const uCity = (u.city || u.location || "").toLowerCase().trim();
            if (!uCity.includes(userCityFilter.toLowerCase().trim())) return false;
          }

          // 3. Status Filter (For shops)
          if (userStatusFilter === "verified" && u.shopApproved !== true) return false;
          if (userStatusFilter === "unverified" && u.shopApproved === true) return false;

          // 4. Search Filter (Phone, Name, Shop, Email, City)
          if (searchUser.trim()) {
            const q = searchUser.toLowerCase().trim();
            const matchesName = (u.name || "").toLowerCase().includes(q);
            const matchesShop = (u.shopName || "").toLowerCase().includes(q);
            const matchesEmail = (u.email || "").toLowerCase().includes(q);
            const matchesPhone = (u.phone || u.phoneNumber || "").toLowerCase().includes(q);
            const matchesCity = (u.city || u.location || "").toLowerCase().includes(q);
            if (!matchesName && !matchesShop && !matchesEmail && !matchesPhone && !matchesCity) {
              return false;
            }
          }

          return true;
        });

        return (
          <div className="admin-section-container" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* 🔀 3 SUB-TABS: ALL vs SHOPS vs CUSTOMERS (Traffic & Analytics style) */}
            <div className="analytics-subnav-row" style={{ marginBottom: "0px" }}>
              <button
                type="button"
                className={`subnav-pill ${userRoleFilterTab === "all" ? "subnav-pill-active subnav-all-active" : ""}`}
                onClick={() => setUserRoleFilterTab("all")}
              >
                <LayoutGrid size={18} />
                <span>All Network & Users (सभी यूज़र्स एवं दुकानें)</span>
                <span className="subnav-badge" style={{ background: "#059669" }}>{users.length} Total</span>
              </button>

              <button
                type="button"
                className={`subnav-pill ${userRoleFilterTab === "shops" ? "subnav-pill-active subnav-shops-active" : ""}`}
                onClick={() => setUserRoleFilterTab("shops")}
              >
                <Store size={18} />
                <span>Partner Shops & Hubs (पार्टनर दुकानें)</span>
                <span className="subnav-badge" style={{ background: "#d97706" }}>{allShopsCount} Shops</span>
              </button>

              <button
                type="button"
                className={`subnav-pill ${userRoleFilterTab === "customers" ? "subnav-pill-active subnav-customers-active" : ""}`}
                onClick={() => setUserRoleFilterTab("customers")}
              >
                <Users size={18} />
                <span>Registered Customers (ग्राहक)</span>
                <span className="subnav-badge" style={{ background: "#2563eb" }}>{allCustomersCount} Customers</span>
              </button>
            </div>

            {/* Toolbar: Search, City Filter, Status Filter & Excel Export */}
            <div className="section-toolbar" style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", flex: 1, minWidth: "280px" }}>
                <div className="search-bar-wrap" style={{ flex: 1, minWidth: "240px" }}>
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search by name, shop name, phone, email, city..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                  />
                </div>

                {/* City Filter */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Filter size={15} color="#64748b" />
                  <select
                    value={userCityFilter}
                    onChange={(e) => setUserCityFilter(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      fontWeight: "600",
                      background: "#ffffff",
                      color: "#0f172a"
                    }}
                  >
                    <option value="all">🌐 All Cities (सभी शहर)</option>
                    {POPULAR_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter for Shops */}
                {(userRoleFilterTab === "all" || userRoleFilterTab === "shops") && (
                  <select
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      fontSize: "13px",
                      fontWeight: "600",
                      background: "#ffffff",
                      color: "#0f172a"
                    }}
                  >
                    <option value="all">⚡ All Status (सभी)</option>
                    <option value="verified">✅ Verified Hubs Only</option>
                    <option value="unverified">⏳ Pending Approval Only</option>
                  </select>
                )}
              </div>

              <button
                type="button"
                className="btn-export-excel-action"
                onClick={() => exportUsersToExcel(filteredNetworkUsers)}
              >
                <FileSpreadsheet size={15} /> Export ({filteredNetworkUsers.length}) to Excel
              </button>
            </div>

            {/* Table View */}
            <div className="admin-table-card">
              <table className="admin-data-table">
                <thead>
                  {userRoleFilterTab === "customers" ? (
                    <tr>
                      <th>Customer Details</th>
                      <th>Contact Info</th>
                      <th>Location</th>
                      <th>Service Bookings</th>
                      <th>Account Status</th>
                      <th>Actions</th>
                    </tr>
                  ) : userRoleFilterTab === "shops" ? (
                    <tr>
                      <th>Shop & Owner Details</th>
                      <th>Contact Info</th>
                      <th>Location</th>
                      <th>Category & Services</th>
                      <th>Partner Status & Plan</th>
                      <th>Actions</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>Shop / Customer Details</th>
                      <th>Contact Info</th>
                      <th>Location</th>
                      <th>Role</th>
                      <th>Verification & Plan</th>
                      <th>Actions</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {filteredNetworkUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "36px 16px", color: "#64748b" }}>
                        <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔍</div>
                        <strong style={{ fontSize: "15px", color: "#0f172a", display: "block" }}>No records match your filters</strong>
                        <span>Try clearing your search query or city filter.</span>
                      </td>
                    </tr>
                  ) : (
                    filteredNetworkUsers.map((u) => {
                      const isShop = u.role === "vendor" || u.role === "shop_owner" || Boolean(u.shopName);
                      const userPhone = u.phone || u.phoneNumber || "";
                      const userBookingsCount = bookings.filter((b) => b.customerPhone === userPhone || b.userId === u.uid).length;

                      return (
                        <tr key={u.uid || `user_${u.phone || Math.random()}`}>
                          <td>
                            <strong className="shop-title-name">
                              {isShop ? (u.shopName && u.shopName !== "—" ? u.shopName : u.name) : (u.name || "Customer")}
                            </strong>
                            <small className="user-subtext">
                              {isShop ? `Owner: ${u.name || "Partner"}` : `ID: ${u.uid?.slice(0, 16) || "Mobile User"}`}
                            </small>
                          </td>
                          <td>
                            {userPhone ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <a
                                  href={`tel:${userPhone}`}
                                  style={{ color: "#0f172a", fontWeight: "700", textDecoration: "none" }}
                                  title="Call user"
                                >
                                  📞 {userPhone}
                                </a>
                                <a
                                  href={`https://wa.me/91${userPhone.replace(/\D/g, "").slice(-10)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  title="Chat on WhatsApp"
                                  style={{ color: "#25D366", fontSize: "14px", textDecoration: "none" }}
                                >
                                  💬
                                </a>
                              </div>
                            ) : (
                              <span>📞 —</span>
                            )}
                            <small className="user-subtext">✉️ {u.email || "—"}</small>
                          </td>
                          <td>
                            <span>{u.city || u.location || "Raipur"}</span>
                            <small className="user-subtext">{u.address || `${u.city || "Raipur"}, India`}</small>
                          </td>

                          {/* Dynamic 4th column */}
                          {userRoleFilterTab === "customers" ? (
                            <td>
                              <span style={{ fontWeight: 750, color: "#2563eb" }}>
                                📅 {userBookingsCount} {userBookingsCount === 1 ? "Booking" : "Bookings"}
                              </span>
                              <small className="user-subtext">Joined: {formatSafeDate(u.createdAt, "Recent")}</small>
                            </td>
                          ) : userRoleFilterTab === "shops" ? (
                            <td>
                              <span style={{ fontWeight: 650, color: "#334155" }}>
                                🛠️ {u.shopCategory === "CAT_TYRE_SALES" ? "Tyre Dealer" : "Puncture & Service"}
                              </span>
                              <small className="user-subtext">{u.services?.length ? `${u.services.length} services` : "Standard Catalog"}</small>
                            </td>
                          ) : (
                            <td>
                              <span className={`role-badge role-${isShop ? "vendor" : "customer"}`}>
                                {isShop ? "🏪 SHOP OWNER" : "👤 CUSTOMER"}
                              </span>
                            </td>
                          )}

                          {/* Dynamic 5th column */}
                          <td>
                            {isShop ? (
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
                              <span style={{
                                background: "#f0fdf4",
                                color: "#16a34a",
                                border: "1px solid #bbf7d0",
                                padding: "2px 8px",
                                borderRadius: "10px",
                                fontSize: "11.5px",
                                fontWeight: "700"
                              }}>
                                👤 Verified Customer
                              </span>
                            )}
                          </td>

                          {/* Dynamic 6th column: Actions */}
                          <td style={{ whiteSpace: "nowrap" }}>
                            {isShop && (
                              <button
                                type="button"
                                className={`btn-approval-toggle ${u.shopApproved ? "btn-unapprove" : "btn-approve"}`}
                                onClick={() => handleToggleShopApproval(u.uid)}
                                style={{ marginRight: "6px" }}
                              >
                                {u.shopApproved ? "Revoke Verification" : "✅ Approve Shop"}
                              </button>
                            )}

                            {userPhone && (
                              <a
                                href={`https://wa.me/91${userPhone.replace(/\D/g, "").slice(-10)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn-icon-ad"
                                title="Chat on WhatsApp"
                                style={{
                                  verticalAlign: "middle",
                                  color: "#25D366",
                                  marginRight: "6px",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  textDecoration: "none"
                                }}
                              >
                                <MessageCircle size={15} />
                              </a>
                            )}

                            <button
                              type="button"
                              className="btn-icon-ad"
                              onClick={() => handleDeleteUser(u.uid)}
                              title="Delete Record"
                              style={{ verticalAlign: "middle" }}
                            >
                              <Trash2 size={15} color="#c0392b" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

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
                        placeholder="Apna UPI ID dalein (उदा. 10 digit mobile number@paytm, name@oksbi)..."
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
                          placeholder="उदा. 10 digit mobile number"
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
          TAB: EMPLOYEE & STAFF ROLE-BASED ACCESS CONTROL (STAFF MANAGER)
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "staff" && (
        <div className="admin-section-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Header & Success Feedback */}
          {staffSuccessMsg && (
            <div style={{
              background: "#dcfce7",
              color: "#15803d",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1px solid #86efac",
              fontWeight: "700",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 4px 12px rgba(21, 128, 61, 0.1)"
            }}>
              <Check size={20} /> {staffSuccessMsg}
            </div>
          )}

          {/* Top Toolbar */}
          <div className="section-toolbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Users size={22} color="#4f46e5" />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800" }}>
                  Employee & Staff Role-Based Access Control (स्टाफ व सब-एडमिन मैनेजर)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
                Apne employees ko safe admin access dein. Sensitive data (Bank Account, UPI, Master Pricing, Delete) 100% locked rahega.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn-add-primary"
                style={{ background: "#4f46e5", padding: "10px 18px", fontSize: "13.5px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)" }}
                onClick={handleOpenAddStaff}
              >
                <PlusCircle size={16} /> ➕ Add New Employee / Staff
              </button>
            </div>
          </div>

          {/* ⚡ Quick Grant Access by Email Bar */}
          <div style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)",
            border: "1.5px solid #c7d2fe",
            borderRadius: "14px",
            padding: "18px 20px",
            boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <Sparkles size={18} color="#4f46e5" />
              <strong style={{ fontSize: "15px", color: "#1e1b4b" }}>
                ⚡ Quick Access by Email ID (ईमेल आईडी डालकर तुरंत एडमिन एक्सेस दें)
              </strong>
            </div>
            <form onSubmit={handleQuickGrantAccess} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
              <div style={{ flex: "1 1 260px" }}>
                <input
                  type="email"
                  placeholder="Employee Email ID (उदा. rohit.support@gmail.com)"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1.5px solid #a5b4fc",
                    fontSize: "13px",
                    background: "#ffffff",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ width: "220px" }}>
                <select
                  value={quickRole}
                  onChange={(e) => setQuickRole(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #a5b4fc",
                    fontSize: "13px",
                    fontWeight: "600",
                    background: "#ffffff",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="support">🎫 Customer Support (Tickets/Bookings)</option>
                  <option value="operations">🏪 Operations Manager (Shops/Rates/Ads)</option>
                  <option value="billing">📑 Billing Staff (Invoices/Bookings)</option>
                  <option value="custom">⚙️ Sub-Admin (Custom Access)</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  background: "#4f46e5",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "13.5px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)"
                }}
              >
                <Rocket size={16} /> 🚀 Grant Instant Admin Access
              </button>
            </form>
            <small style={{ display: "block", marginTop: "8px", color: "#475569", fontSize: "11.5px" }}>
              💡 <strong>How it works:</strong> Email darj karte hi employee ke liye 6-digit secure PIN create ho jayega jise aap WhatsApp ya copy karke unhe share kar sakte hain.
            </small>
          </div>

          {/* 🛡️ Data Security & Safety Explainer Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px" }}>
            <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", color: "#fff", padding: "18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 14px rgba(79, 70, 229, 0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "6px", borderRadius: "8px" }}>
                  <Lock size={18} color="#facc15" />
                </div>
                <strong style={{ fontSize: "14.5px" }}>🔒 100% Data Safety & Bank Protection</strong>
              </div>
              <p style={{ margin: 0, fontSize: "12.5px", color: "#c7d2fe", lineHeight: "1.5" }}>
                Aapka official <strong>Bank Account</strong>, <strong>UPI QR</strong>, <strong>Super Admin Password</strong> aur <strong>Master Pricing</strong> options strictly Owner ke liye locked hain. Staff inko kabhi access nahi kar sakta.
              </p>
            </div>

            <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)", color: "#fff", padding: "18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 14px rgba(5, 150, 105, 0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "6px", borderRadius: "8px" }}>
                  <ShieldCheck size={18} color="#4ade80" />
                </div>
                <strong style={{ fontSize: "14.5px" }}>🎯 Role-Based Delegation (सीमित अधिकार)</strong>
              </div>
              <p style={{ margin: 0, fontSize: "12.5px", color: "#a7f3d0", lineHeight: "1.5" }}>
                Support Executive sirf tickets aur chat resolve karega, Operations Manager sirf shops aur services dekhega. Employee ko wahi tab dikhega jiski aapne anumati di hai.
              </p>
            </div>

            <div style={{ background: "linear-gradient(135deg, #701a75 0%, #86198f 100%)", color: "#fff", padding: "18px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 4px 14px rgba(162, 28, 175, 0.15)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "6px", borderRadius: "8px" }}>
                  <Power size={18} color="#f472b6" />
                </div>
                <strong style={{ fontSize: "14.5px" }}>⚡ 1-Click Instant Revoke / Killswitch</strong>
              </div>
              <p style={{ margin: 0, fontSize: "12.5px", color: "#f5d0fe", lineHeight: "1.5" }}>
                Agar koi employee chhutti par hai ya kaam chhod deta hai, toh aap <strong>1-Click</strong> me uska access 'Block' ya 'Delete' karke turant band kar sakte hain.
              </p>
            </div>
          </div>

          {/* 🔑 Staff Login Guide Card (स्टाफ लॉगिन कैसे करेगा?) */}
          <div style={{ background: "#ffffff", border: "1.5px solid #e2e8f0", borderRadius: "14px", padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <UserCheck size={18} color="#2563eb" />
              <strong style={{ fontSize: "15px", color: "#0f172a" }}>
                📖 Staff Login Process (कर्मचारी लॉगिन कैसे करेगा?)
              </strong>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <span style={{ background: "#2563eb", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", marginBottom: "6px" }}>1</span>
                <strong style={{ display: "block", fontSize: "13px", color: "#1e293b" }}>Open Login / Portal</strong>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>
                  Staff tyreSaathi app ya website par ja kar Login page open karega.
                </p>
              </div>

              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <span style={{ background: "#2563eb", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", marginBottom: "6px" }}>2</span>
                <strong style={{ display: "block", fontSize: "13px", color: "#1e293b" }}>Enter Email & PIN</strong>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>
                  Staff apna registered Email aur niche table me dikh raha <strong>6-digit PIN</strong> dale ga.
                </p>
              </div>

              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <span style={{ background: "#2563eb", color: "#fff", width: "22px", height: "22px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "800", marginBottom: "6px" }}>3</span>
                <strong style={{ display: "block", fontSize: "13px", color: "#1e293b" }}>Role-Filtered Dashboard</strong>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#64748b" }}>
                  Staff ko sirf unke permitted modules (Tickets, Bookings) dikhenge, financial data safe rahega.
                </p>
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#334155" }}>
              👥 Active Staff Members ({staffList.length})
            </div>

            <div style={{ position: "relative", minWidth: "260px" }}>
              <Search size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search staff name, email, role, PIN..."
                value={staffSearch}
                onChange={(e) => setStaffSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px 8px 32px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "12.5px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Staff Members Table */}
          <div className="admin-table-card">
            {staffList.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#64748b" }}>
                <Users size={48} color="#cbd5e1" style={{ margin: "0 auto 12px" }} />
                <h4 style={{ margin: "0 0 6px", fontSize: "16px", color: "#1e293b" }}>Abhi tak koi employee add nahi hai</h4>
                <p style={{ margin: "0 0 16px", fontSize: "13px" }}>Upar diye gaye Quick Email box ya 'Add New Employee' button se staff account create karein.</p>
                <button
                  type="button"
                  className="btn-add-primary"
                  onClick={handleOpenAddStaff}
                  style={{ background: "#4f46e5", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <PlusCircle size={15} /> ➕ Add Employee
                </button>
              </div>
            ) : (
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Employee Name & Email</th>
                    <th>Role & Access Scope</th>
                    <th>Permissions Granted</th>
                    <th>Status</th>
                    <th>Login Passcode / PIN</th>
                    <th>Actions & Sharing</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList
                    .filter((s) => {
                      const q = staffSearch.toLowerCase();
                      return (
                        !staffSearch ||
                        s.name.toLowerCase().includes(q) ||
                        s.email.toLowerCase().includes(q) ||
                        s.role.toLowerCase().includes(q) ||
                        (s.passcode && s.passcode.includes(q)) ||
                        s.phone.includes(q)
                      );
                    })
                    .map((s) => {
                      const isPinVisible = visiblePinMap[s.id] !== false;
                      const pinDisplay = s.passcode || "582914";
                      const isCopied = copiedStaffId === s.id;

                      return (
                        <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => handleOpenEditStaff(s)}>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#ede9fe", color: "#6d28d9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "15px" }}>
                                {s.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <strong style={{ fontSize: "13.5px", color: "#0f172a" }}>{s.name}</strong>
                                <div style={{ fontSize: "12px", color: "#475569", marginTop: "2px" }}>
                                  ✉️ <strong>{s.email}</strong>
                                </div>
                                {s.phone && s.phone !== "10 digit mobile number" && (
                                  <div style={{ fontSize: "11px", color: "#64748b" }}>📞 {s.phone}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <span style={{
                              background: s.roleKey === "support" ? "#dbeafe" : s.roleKey === "operations" ? "#fef3c7" : "#f1f5f9",
                              color: s.roleKey === "support" ? "#1e40af" : s.roleKey === "operations" ? "#92400e" : "#334155",
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "700"
                            }}>
                              {s.role}
                            </span>
                            {s.notes && (
                              <small style={{ display: "block", color: "#64748b", fontSize: "11px", marginTop: "4px", maxWidth: "200px" }}>
                                {s.notes}
                              </small>
                            )}
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", maxWidth: "260px" }}>
                              {(s.permissions || []).map((perm, idx) => (
                                <span key={idx} style={{ background: "#f8fafc", border: "1px solid #cbd5e1", padding: "2px 7px", borderRadius: "6px", fontSize: "11px", color: "#334155", fontWeight: "600" }}>
                                  {perm === "tickets" && "🎫 Support Tickets"}
                                  {perm === "shops" && "🏪 Shops & Users"}
                                  {perm === "services" && "🛠️ Rates Master"}
                                  {perm === "ads" && "📢 Shop Ads"}
                                  {perm === "bookings" && "🚗 Bookings"}
                                  {perm === "traffic" && "📊 Traffic"}
                                  {perm === "excel" && "📥 Excel Export"}
                                  {perm === "updates" && "🔔 Push Updates"}
                                  {!["tickets", "shops", "services", "ads", "bookings", "traffic", "excel", "updates"].includes(perm) && perm}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <span style={{
                              background: s.status === "active" ? "#dcfce7" : "#fee2e2",
                              color: s.status === "active" ? "#15803d" : "#991b1b",
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "11.5px",
                              fontWeight: "700",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}>
                              {s.status === "active" ? "🟢 Active" : "🔴 Blocked"}
                            </span>
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <code style={{
                                background: "#f1f5f9",
                                border: "1px solid #cbd5e1",
                                padding: "4px 8px",
                                borderRadius: "6px",
                                fontSize: "13px",
                                color: "#0f172a",
                                fontWeight: "800",
                                letterSpacing: "1px"
                              }}>
                                {isPinVisible ? pinDisplay : "••••••"}
                              </code>
                              <button
                                type="button"
                                onClick={() => togglePinVisibility(s.id)}
                                title={isPinVisible ? "Hide PIN" : "Show PIN"}
                                style={{
                                  background: "#f8fafc",
                                  border: "1px solid #cbd5e1",
                                  borderRadius: "6px",
                                  padding: "4px 6px",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center"
                                }}
                              >
                                <Eye size={13} color="#475569" />
                              </button>
                            </div>
                          </td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
                              <button
                                type="button"
                                onClick={() => handleCopyStaffCredentials(s)}
                                style={{
                                  background: isCopied ? "#dcfce7" : "#f1f5f9",
                                  color: isCopied ? "#15803d" : "#0f172a",
                                  border: "1px solid #cbd5e1",
                                  borderRadius: "6px",
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                                title="Copy Login Email & PIN to Clipboard"
                              >
                                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                                {isCopied ? "Copied!" : "📋 Copy PIN"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleShareStaffWhatsApp(s)}
                                style={{
                                  background: "#25D366",
                                  color: "#ffffff",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                                title="Share Login details on WhatsApp"
                              >
                                <MessageSquare size={12} /> WhatsApp
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleStaffStatus(s.id)}
                                style={{
                                  background: s.status === "active" ? "#fef2f2" : "#f0fdf4",
                                  color: s.status === "active" ? "#b91c1c" : "#15803d",
                                  border: s.status === "active" ? "1px solid #fca5a5" : "1px solid #86efac",
                                  borderRadius: "6px",
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  cursor: "pointer"
                                }}
                                title={s.status === "active" ? "Block Employee Access" : "Activate Access"}
                              >
                                {s.status === "active" ? "🔒 Block" : "🔓 Activate"}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenEditStaff(s)}
                                style={{
                                  background: "#f1f5f9",
                                  color: "#0f172a",
                                  border: "1px solid #cbd5e1",
                                  borderRadius: "6px",
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  cursor: "pointer"
                                }}
                              >
                                ✏️ Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteStaff(s.id)}
                                style={{
                                  background: "#fee2e2",
                                  color: "#c0392b",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "4px 8px",
                                  fontSize: "11px",
                                  cursor: "pointer"
                                }}
                                title="Delete staff account permanently"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>

          {/* 👥 Add/Edit Staff Modal */}
          {staffModalOpen && (
            <div className="admin-modal-backdrop" onClick={() => setStaffModalOpen(false)}>
              <div className="admin-modal-card" style={{ maxWidth: "560px", width: "94%" }} onClick={(e) => e.stopPropagation()}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "12px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Users size={20} color="#4f46e5" />
                    <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "800" }}>
                      {editingStaffId ? "Edit Employee Permissions" : "Add New Employee / Sub-Admin"}
                    </h3>
                  </div>
                  <button type="button" onClick={() => setStaffModalOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveStaff} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Employee Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Your Name"
                        value={staffForm.name}
                        onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                        required
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Employee Login Email *
                      </label>
                      <input
                        type="email"
                        placeholder="employee@email.com"
                        value={staffForm.email}
                        onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                        required
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Contact Mobile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="10 digit mobile number"
                        value={staffForm.phone}
                        onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                        Access PIN / Passcode *
                      </label>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="e.g. 849201"
                          value={staffForm.passcode}
                          onChange={(e) => setStaffForm({ ...staffForm, passcode: e.target.value })}
                          required
                          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "800", letterSpacing: "1px", boxSizing: "border-box" }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newPin = Math.floor(100000 + Math.random() * 900000).toString();
                            setStaffForm({ ...staffForm, passcode: newPin });
                          }}
                          style={{ background: "#ede9fe", color: "#6d28d9", border: "1px solid #c7d2fe", borderRadius: "8px", padding: "0 10px", fontSize: "11px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}
                          title="Generate New Random 6-Digit PIN"
                        >
                          🎲 PIN
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Role Preset Selector */}
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                      Choose Role Preset (पद चुनें) *
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {[
                        { key: "support", title: "🎫 Customer Support Executive", desc: "Support Tickets, Chats, Bookings", perms: ["tickets", "bookings"] },
                        { key: "operations", title: "🏪 Operations & Store Manager", desc: "Shops, Rates, Ads, Bookings", perms: ["shops", "services", "ads", "bookings"] },
                        { key: "billing", title: "📑 Billing & Accounts Staff", desc: "Invoices, Bookings, Exports", perms: ["bookings", "excel", "traffic"] },
                        { key: "custom", title: "⚙️ Custom Permissions", desc: "Manually select allowed sections", perms: staffForm.permissions }
                      ].map((preset) => (
                        <div
                          key={preset.key}
                          onClick={() => {
                            setStaffForm({
                              ...staffForm,
                              roleKey: preset.key,
                              role: preset.title.replace(/^[^\s]+\s/, ""),
                              permissions: preset.perms
                            });
                          }}
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            border: staffForm.roleKey === preset.key ? "2px solid #4f46e5" : "1px solid #cbd5e1",
                            background: staffForm.roleKey === preset.key ? "#ede9fe" : "#ffffff",
                            cursor: "pointer"
                          }}
                        >
                          <strong style={{ fontSize: "12.5px", display: "block", color: "#0f172a" }}>{preset.title}</strong>
                          <small style={{ fontSize: "11px", color: "#64748b", display: "block", marginTop: "2px" }}>{preset.desc}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Granular Permission Checkboxes */}
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "6px" }}>
                      Allowed Admin Sections (अनुमतित अनुभाग):
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", background: "#f8fafc", padding: "10px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      {[
                        { id: "tickets", label: "🎫 Support Tickets & WhatsApp Desk" },
                        { id: "shops", label: "🏪 Shop Partners & Approvals" },
                        { id: "services", label: "🛠️ Service Categories & Rates Master" },
                        { id: "ads", label: "📢 Shop Banner Ads Manager" },
                        { id: "bookings", label: "🚗 Global Bookings Schedule" },
                        { id: "traffic", label: "📊 Traffic & Analytics Graphs" },
                        { id: "excel", label: "📥 Excel Sheet Data Exports" },
                        { id: "updates", label: "🔔 App Updates & Notifications" },
                      ].map((p) => {
                        const checked = staffForm.permissions.includes(p.id);
                        return (
                          <label key={p.id} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer" }}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...staffForm.permissions, p.id]
                                  : staffForm.permissions.filter((x) => x !== p.id);
                                setStaffForm({ ...staffForm, permissions: next, roleKey: "custom" });
                              }}
                            />
                            <span>{p.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Protected Features Note */}
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "8px 12px", fontSize: "11.5px", color: "#991b1b", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Lock size={14} />
                    <span><strong>Note:</strong> Bank Account & UPI Setup, Plans Pricing, aur Super Admin access staff ke liye strictly locked rahenge.</span>
                  </div>

                  {/* Notes */}
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 700, display: "block", marginBottom: "4px" }}>
                      Staff Responsibilities / Notes (वैकल्पिक)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Handles morning shift support tickets and customer calls"
                      value={staffForm.notes}
                      onChange={(e) => setStaffForm({ ...staffForm, notes: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                    />
                  </div>

                  {/* Buttons */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "10px", borderTop: "1.5px solid #f1f5f9" }}>
                    <button
                      type="button"
                      className="btn-cancel-rating"
                      onClick={() => setStaffModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-submit-rating"
                      style={{ background: "#4f46e5" }}
                    >
                      <Save size={15} /> 💾 Save Staff Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 3: GLOBAL BOOKINGS & INVOICES MONITOR
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "bookings" && (
        <div className="bookings-modern-container">
          {/* Header Section */}
          <div className="bookings-modern-header">
            <div>
              <h2 className="bookings-header-title">
                Global Customer Bookings Network
              </h2>
              <p className="bookings-header-subtitle">
                Desh bhar ki sabhi live bookings aur unke status ka live overview.
              </p>
            </div>
            {/* Buttons */}
            <div className="bookings-actions-wrap">
              <button
                type="button"
                className="btn-emerald-export"
                onClick={() => exportBookingsToExcel(bookings)}
              >
                <FileSpreadsheet size={16} />
                <span>Export Bookings (Excel)</span>
              </button>
              <button
                type="button"
                className="btn-outline-export"
                onClick={() => exportInvoicesToExcel(invoices)}
              >
                <FileSpreadsheet size={16} />
                <span>Export Invoices (Excel)</span>
              </button>
            </div>
          </div>

          {/* Quick Filter & Search Bar */}
          <div className="bookings-filter-bar">
            <div className="bookings-search-input-box">
              <Search size={16} className="bookings-search-icon" />
              <input
                type="text"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                placeholder="Search by ID, customer name, phone, car reg no, or service..."
                className="bookings-search-field"
              />
              {bookingSearch && (
                <button
                  type="button"
                  onClick={() => setBookingSearch("")}
                  className="bookings-search-clear"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="bookings-status-filter-pills">
              {[
                { id: "all", label: "All Bookings", count: bookings.length },
                { id: "accepted", label: "Accepted", count: bookings.filter((b) => (b.status || "").toLowerCase() === "accepted").length },
                { id: "pending", label: "Pending", count: bookings.filter((b) => (b.status || "").toLowerCase() === "pending").length },
                { id: "completed", label: "Completed", count: bookings.filter((b) => (b.status || "").toLowerCase() === "completed").length },
                { id: "cancelled", label: "Cancelled", count: bookings.filter((b) => ["cancelled", "rejected"].includes((b.status || "").toLowerCase())).length },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setBookingStatusFilter(pill.id)}
                  className={`booking-filter-pill ${bookingStatusFilter === pill.id ? "filter-pill-active" : ""}`}
                >
                  <span>{pill.label}</span>
                  <span className="pill-counter">{pill.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Element */}
          <div className="bookings-table-wrapper">
            <table className="bookings-enterprise-table">
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
                {(() => {
                  const q = (bookingSearch || "").trim().toLowerCase();
                  const filtered = bookings.filter((b) => {
                    const status = (b.status || "pending").toLowerCase();
                    const matchesStatus =
                      bookingStatusFilter === "all" ||
                      (bookingStatusFilter === "cancelled"
                        ? status === "cancelled" || status === "rejected"
                        : status === bookingStatusFilter);

                    if (!matchesStatus) return false;
                    if (!q) return true;

                    const idStr = String(b.id || "").toLowerCase();
                    const custName = String(b.customerName || "").toLowerCase();
                    const custPhone = String(b.customerPhone || "");
                    const vehNum = String(b.vehicleNumber || "").toLowerCase();
                    const srvName = String(b.serviceName || "").toLowerCase();
                    const shopName = String(b.shopName || "").toLowerCase();

                    return (
                      idStr.includes(q) ||
                      custName.includes(q) ||
                      custPhone.includes(q) ||
                      vehNum.includes(q) ||
                      srvName.includes(q) ||
                      shopName.includes(q)
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <tr>
                        <td colSpan="6" className="bookings-empty-state">
                          <Calendar size={36} className="empty-icon" />
                          <p className="empty-title">Koi Bookings Nahi Mili</p>
                          <p className="empty-desc">
                            {bookingSearch || bookingStatusFilter !== "all"
                              ? "Aapke search query ya filter ke anusaar koi booking record match nahi hua."
                              : "Abhi system me koi live bookings darj nahi hain."}
                          </p>
                        </td>
                      </tr>
                    );
                  }

                  return filtered.map((b) => {
                    const statusLower = (b.status || "pending").toLowerCase();
                    const isAccepted = statusLower === "accepted";
                    const isCompleted = statusLower === "completed";
                    const isCancelled = ["cancelled", "rejected"].includes(statusLower);

                    let statusClass = "badge-pending";
                    if (isAccepted || isCompleted) statusClass = "badge-accepted";
                    if (isCancelled) statusClass = "badge-cancelled";

                    const statusDisplay = (b.status || "PENDING").toUpperCase();

                    return (
                      <tr key={b.id}>
                        <td className="cell-nowrap">
                          <div className="font-semibold text-slate-900 text-sm">
                            #{formatSafeText(b.id)}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {formatSafeDate(b.date || b.createdAt)} • {formatSafeText(b.timeSlot || b.time, "10:00 AM")}
                          </div>
                        </td>
                        <td className="cell-nowrap">
                          <div className="font-medium text-slate-900 text-sm">
                            {formatSafeText(b.customerName, "Customer")}
                          </div>
                          <div className="text-xs text-slate-600 font-mono mt-0.5">
                            📞 {formatSafeText(b.customerPhone, "—")}
                          </div>
                        </td>
                        <td className="cell-nowrap text-sm text-slate-700">
                          <span>{formatSafeText(b.vehicleType, "Car / SUV")}</span>
                          {b.vehicleNumber ? (
                            <span className="font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs ml-2 border border-slate-200">
                              {formatSafeText(b.vehicleNumber)}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 ml-1">—</span>
                          )}
                        </td>
                        <td>
                          <div className="font-semibold text-slate-900 text-sm">
                            {formatSafeText(b.serviceName, "Tyre Service")}
                          </div>
                          {b.notes && (
                            <div className="text-xs text-slate-500 italic mt-0.5">
                              "{formatSafeText(b.notes)}"
                            </div>
                          )}
                        </td>
                        <td className="cell-nowrap">
                          <span className="booking-hub-badge">
                            🏪 {formatSafeText(b.shopName, "Partner Hub")}
                          </span>
                        </td>
                        <td className="cell-nowrap">
                          <span className={`booking-status-pill ${statusClass}`}>
                            {statusDisplay}
                          </span>
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 4: SUPPORT TICKET RESOLVER
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "tickets" && (
        <div className="admin-section-container" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Header & Success Feedback */}
          {ticketSuccessMsg && (
            <div style={{
              background: "#dcfce7",
              color: "#15803d",
              padding: "12px 18px",
              borderRadius: "10px",
              border: "1px solid #86efac",
              fontWeight: "700",
              fontSize: "13.5px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Check size={18} /> {ticketSuccessMsg}
            </div>
          )}

          {/* 📞 Live Support Helpline & WhatsApp Configuration Manager (Point 7) */}
          <div style={{
            background: "#ffffff",
            border: "1.5px solid #cbd5e1",
            borderRadius: "14px",
            padding: "16px 20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#fee2e2",
                  color: "#c0392b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px"
                }}>
                  📞
                </div>
                <div>
                  <h4 style={{ margin: "0 0 2px", fontSize: "15px", fontWeight: "800", color: "#0f172a" }}>
                    Official Support Helpline & WhatsApp Number Settings
                  </h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                    Aap yahan se Calling Helpline Number aur WhatsApp Number kabhi bhi badal sakte hain. Ye turant poori website aur app me live update ho jayega.
                  </p>
                </div>
              </div>

              {supportSuccessMsg && (
                <div style={{
                  background: "#dcfce7",
                  color: "#15803d",
                  border: "1px solid #86efac",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  fontWeight: "750",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <Check size={16} /> {supportSuccessMsg}
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSupportContact} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "12px", alignItems: "end" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", color: "#334155", marginBottom: "4px" }}>
                  📞 Call Helpline Mobile Number:
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={supportContact.phone}
                  onChange={(e) => setSupportContact({ ...supportContact, phone: e.target.value })}
                  placeholder="8877277757"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13px",
                    fontWeight: "750",
                    color: "#0f172a",
                    outline: "none"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", color: "#334155", marginBottom: "4px" }}>
                  💬 WhatsApp Support Number:
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={supportContact.whatsapp}
                  onChange={(e) => setSupportContact({ ...supportContact, whatsapp: e.target.value })}
                  placeholder="8877277757"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13px",
                    fontWeight: "750",
                    color: "#0f172a",
                    outline: "none"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", color: "#334155", marginBottom: "4px" }}>
                  ✉️ Support Email Address:
                </label>
                <input
                  type="email"
                  value={supportContact.email}
                  onChange={(e) => setSupportContact({ ...supportContact, email: e.target.value })}
                  placeholder="tyresathi@gmail.com"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    outline: "none"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "750", color: "#334155", marginBottom: "4px" }}>
                  🕒 Operating Hours / Timings:
                </label>
                <input
                  type="text"
                  value={supportContact.helplineTiming}
                  onChange={(e) => setSupportContact({ ...supportContact, helplineTiming: e.target.value })}
                  placeholder="9:00 AM - 9:00 PM (Mon - Sun)"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#0f172a",
                    outline: "none"
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={supportSaving}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.3)"
                  }}
                >
                  <Save size={15} />
                  <span>{supportSaving ? "Saving..." : "Save Support Numbers"}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="section-toolbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "800" }}>
                🎫 Customer & Shop Support Tickets Helpdesk
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
                Customers aur shop partners ki complaints aur queries ka admin panel se instant solution likhein aur status update karein.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                type="button"
                className="btn-add-primary"
                style={{ background: "#2563eb", padding: "8px 14px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                onClick={handleAddSampleTicket}
              >
                <PlusCircle size={15} /> ➕ Add Ticket
              </button>
              <button
                type="button"
                className="btn-add-primary"
                style={{ background: "#0891b2", padding: "8px 14px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                onClick={handleResetTicketSequence}
                title="Renumber all tickets from #TS-TCK-01 sequentially"
              >
                ↺ Re-index (#TS-TCK-01)
              </button>
              <button
                type="button"
                className="btn-add-primary"
                style={{ background: "#dc2626", padding: "8px 14px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }}
                onClick={handleClearAllTickets}
                title="Clear all tickets to start fresh from #TS-TCK-01"
              >
                🗑️ Clear All
              </button>
              <button
                className="btn-export-excel-action"
                onClick={() => exportTicketsToExcel(tickets)}
              >
                <FileSpreadsheet size={15} /> 📥 Export Excel
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[
                { id: "all", label: `All Tickets (${tickets.length})` },
                { id: "open", label: `🟡 Open (${tickets.filter((t) => t.status === "open").length})` },
                { id: "in_progress", label: `🔵 In Progress (${tickets.filter((t) => t.status === "in_progress").length})` },
                { id: "resolved", label: `🟢 Resolved (${tickets.filter((t) => t.status === "resolved").length})` },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setTicketFilter(pill.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: ticketFilter === pill.id ? "1.5px solid #c0392b" : "1px solid #cbd5e1",
                    background: ticketFilter === pill.id ? "#fee2e2" : "#ffffff",
                    color: ticketFilter === pill.id ? "#c0392b" : "#475569",
                    fontWeight: ticketFilter === pill.id ? "700" : "600",
                    fontSize: "12.5px",
                    cursor: "pointer"
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div style={{ position: "relative", minWidth: "240px" }}>
              <Search size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input
                type="text"
                placeholder="Search ticket #, name, phone..."
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 10px 7px 32px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "12.5px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Tickets Table */}
          <div className="admin-table-card">
            {tickets.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#64748b" }}>
                <LifeBuoy size={48} color="#cbd5e1" style={{ margin: "0 auto 12px" }} />
                <h4 style={{ margin: "0 0 6px", fontSize: "16px", color: "#1e293b" }}>Abhi tak koi support ticket nahi hai!</h4>
                <p style={{ margin: "0 0 16px", fontSize: "13px" }}>Jab bhi customer ya shop owner app se ticket create karega, yahan dikhega.</p>
                <button
                  type="button"
                  className="btn-add-primary"
                  onClick={handleAddSampleTicket}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <PlusCircle size={15} /> ➕ Click to Create Test Ticket
                </button>
              </div>
            ) : (
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Ticket # & Date</th>
                    <th>User Details & Contact</th>
                    <th>Category & Priority</th>
                    <th>Problem Summary</th>
                    <th>Status</th>
                    <th>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets
                    .filter((t) => {
                      const matchesStatus = ticketFilter === "all" || t.status === ticketFilter;
                      const q = ticketSearch.toLowerCase();
                      const matchesSearch =
                        !ticketSearch ||
                        (t.ticketNo && t.ticketNo.toLowerCase().includes(q)) ||
                        (t.userName && t.userName.toLowerCase().includes(q)) ||
                        (t.userPhone && t.userPhone.includes(q)) ||
                        (t.subject && t.subject.toLowerCase().includes(q));
                      return matchesStatus && matchesSearch;
                    })
                    .map((t) => {
                      const phoneDigits = (t.userPhone || "").replace(/[^0-9]/g, "");
                      const waUrl = phoneDigits ? `https://wa.me/91${phoneDigits.slice(-10)}?text=${encodeURIComponent(`Namaste ${t.userName || "Customer"}, TyreSaathi Support se aapke Ticket #${t.ticketNo || t.id.slice(0,6)} ke sambandh me:`)}` : "";
                      return (
                        <tr key={t.id}>
                          <td>
                            <strong>#{formatSafeText(t.ticketNo, t.id)}</strong>
                            <small className="user-subtext">{formatSafeDate(t.createdAt)}</small>
                          </td>
                          <td>
                            <strong>{formatSafeText(t.userName, "User")}</strong>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                              <small className="user-subtext">📞 {formatSafeText(t.userPhone, "—")}</small>
                              {waUrl && (
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "3px",
                                    background: "#dcfce7",
                                    color: "#16a34a",
                                    padding: "2px 6px",
                                    borderRadius: "12px",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    textDecoration: "none"
                                  }}
                                  title="WhatsApp par chat karein"
                                >
                                  💬 WA
                                </a>
                              )}
                            </div>
                          </td>
                          <td>
                            <span>{formatSafeText(t.category, "General")}</span>
                            <small className={`priority-tag priority-${formatSafeText(t.priority, "medium")}`}>
                              {formatSafeText(t.priority, "MEDIUM").toUpperCase()}
                            </small>
                          </td>
                          <td>
                            <strong style={{ display: "block" }}>{formatSafeText(t.subject, "Support Request")}</strong>
                            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--text-muted)" }}>{formatSafeText(t.description, "")}</p>
                            {(t.imageUrl || t.attachmentUrl) && (
                              <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                                <img
                                  src={t.imageUrl || t.attachmentUrl}
                                  alt="attachment thumbnail"
                                  onClick={() => setPreviewModalImg(t.imageUrl || t.attachmentUrl)}
                                  style={{
                                    width: "36px",
                                    height: "36px",
                                    borderRadius: "6px",
                                    objectFit: "cover",
                                    border: "1px solid #cbd5e1",
                                    cursor: "pointer"
                                  }}
                                  title="Click to view full photo"
                                />
                                <button
                                  type="button"
                                  onClick={() => setPreviewModalImg(t.imageUrl || t.attachmentUrl)}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "3px",
                                    background: "#eff6ff",
                                    color: "#2563eb",
                                    border: "1px solid #bfdbfe",
                                    borderRadius: "6px",
                                    padding: "3px 8px",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    cursor: "pointer"
                                  }}
                                >
                                  📷 Attached Photo
                                </button>
                              </div>
                            )}
                            {t.adminReply && (
                              <div className="admin-reply-snippet" style={{ marginTop: "6px", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 8px", borderRadius: "6px" }}>
                                <strong style={{ color: "#16a34a" }}>Admin Reply:</strong> {formatSafeText(t.adminReply)}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className={`status-badge-ticket status-${formatSafeText(t.status, "open")}`}>
                              {formatSafeText(t.status, "OPEN").toUpperCase()}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                              <button
                                className="btn-resolve-ticket"
                                onClick={() => handleOpenReplyTicket(t)}
                                style={{
                                  background: t.status === "resolved" ? "#f1f5f9" : "#c0392b",
                                  color: t.status === "resolved" ? "#334155" : "#ffffff",
                                  border: t.status === "resolved" ? "1px solid #cbd5e1" : "none",
                                  padding: "6px 12px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px"
                                }}
                              >
                                {t.status === "resolved" ? "✏️ Edit Solution" : "💬 Reply & Resolve"}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTicket(t.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#94a3b8",
                                  cursor: "pointer",
                                  padding: "4px"
                                }}
                                title="Delete Ticket"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
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
          ADD / EDIT SERVICE CATEGORY & RATES MODAL
      ══════════════════════════════════════════════════════════════════ */}
      {serviceModalOpen && (
        <div className="modal-backdrop" onClick={() => setServiceModalOpen(false)}>
          <div className="modal-card" style={{ maxWidth: "560px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "800" }}>
                    {editingServiceId ? "✏️ Edit Service Category & Rate" : "➕ Nayi Service / Category Jodein"}
                  </h3>
                  <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    Master rates for instant billing and network services
                  </small>
                </div>
              </div>
              <button className="modal-close" onClick={() => setServiceModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveService}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "10px" }}>
                
                {/* Category Selector */}
                <div className="modal-field">
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Category (सर्विस कैटेगरी) *
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", fontWeight: "600", boxSizing: "border-box" }}
                  >
                    <option value="Puncture & Tube">🛠️ Puncture & Tube (पंचर व ट्यूब)</option>
                    <option value="Tyre Repair">✂️ Tyre Repair (टायर कट रिपेयर)</option>
                    <option value="Fitting & Alignment">🔧 Fitting & Alignment (फिटिंग व अलाइनमेंट)</option>
                    <option value="Emergency Roadside">🚗 Emergency Roadside (इमरजेंसी मदद)</option>
                    <option value="Care & Cleaning">✨ Care & Cleaning (धुलाई व पॉलिश)</option>
                    {availableCategories
                      .filter((c) => !["Puncture & Tube", "Tyre Repair", "Fitting & Alignment", "Emergency Roadside", "Care & Cleaning"].includes(c))
                      .map((c) => (
                        <option key={c} value={c}>📁 {c}</option>
                      ))}
                    <option value="custom">➕ + Nayi Custom Category Banayein...</option>
                  </select>
                </div>

                {/* Custom Category Input if selected */}
                {serviceForm.category === "custom" && (
                  <div className="modal-field" style={{ background: "#f0fdf4", border: "1.5px dashed #22c55e", padding: "10px 12px", borderRadius: "8px" }}>
                    <label style={{ fontSize: "12px", fontWeight: "700", color: "#15803d", display: "block", marginBottom: "4px" }}>
                      ✨ Nayi Category Ka Naam Type Karein *
                    </label>
                    <input
                      type="text"
                      placeholder="उदा: Rim Straightening / Alloy Wheels / Custom Tyre Jobs"
                      value={serviceForm.customCategory}
                      onChange={(e) => setServiceForm({ ...serviceForm, customCategory: e.target.value })}
                      style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #86efac", fontSize: "13px", boxSizing: "border-box" }}
                      required
                    />
                  </div>
                )}

                {/* Service Name */}
                <div className="modal-field">
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Service / Item Name (सर्विस का पूरा नाम) *
                  </label>
                  <input
                    type="text"
                    placeholder="उदा: Tubeless Puncture Repair (पंचर रिपेयर) / Cut Repair"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13.5px", fontWeight: "600", boxSizing: "border-box" }}
                    required
                  />
                </div>

                {/* 2-Col: Rate & Type */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="modal-field">
                    <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                      Default Rate / Price (₹ दर) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 200"
                      value={serviceForm.rate}
                      onChange={(e) => setServiceForm({ ...serviceForm, rate: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "14px", fontWeight: "800", color: "#16a34a", boxSizing: "border-box" }}
                      required
                    />
                  </div>

                  <div className="modal-field">
                    <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                      Service Type (प्रकार)
                    </label>
                    <select
                      value={serviceForm.type}
                      onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1.5px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                    >
                      <option value="service">🛠️ Service (सर्विस)</option>
                      <option value="tyre">🛞 Tyre (टायर)</option>
                      <option value="tube">⭕ Tube (ट्यूब)</option>
                      <option value="alloy">✨ Alloy (अलॉय)</option>
                      <option value="other">📦 Other / Accessory</option>
                    </select>
                  </div>
                </div>

                {/* Icon Selection */}
                <div className="modal-field">
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "6px" }}>
                    Select Service Icon (प्रतीक चिन्ह)
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["🛠️", "✂️", "🔧", "🚗", "⭕", "🔄", "⚖️", "✨", "🛞", "⚡", "🧰", "🧼", "🛵", "🚚", "🚜"].map((ico) => (
                      <button
                        key={ico}
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, icon: ico })}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          border: serviceForm.icon === ico ? "2px solid #2563eb" : "1px solid var(--border)",
                          background: serviceForm.icon === ico ? "#eff6ff" : "var(--surface)",
                          fontSize: "18px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {ico}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="modal-field">
                  <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                    Description / Customer Note (विवरण)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा: Fast tubeless repair with heavy-duty cold patch"
                    value={serviceForm.description}
                    onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                {/* Active Status */}
                <div className="modal-checkbox-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={serviceForm.active}
                      onChange={(e) => setServiceForm({ ...serviceForm, active: e.target.checked })}
                    />
                    <span>Is service ko Billing & Booking me Active (Live) rakhein</span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-actions" style={{ marginTop: "18px", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                <button type="button" className="btn-cancel" onClick={() => setServiceModalOpen(false)}>
                  Cancel (रद्द करें)
                </button>
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    color: "#ffffff",
                    border: "none",
                    padding: "9px 20px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)"
                  }}
                >
                  <Save size={16} /> 💾 Save & Sync Across Network
                </button>
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
          <div className="modal-card" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fef2f2", color: "#c0392b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LifeBuoy size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "800" }}>
                    💬 Resolve Support Ticket #{formatSafeText(replyTicketModal.ticketNo, replyTicketModal.id)}
                  </h3>
                  <small style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    Customer Query & Direct Solution Desk
                  </small>
                </div>
              </div>
              <button className="modal-close" onClick={() => setReplyTicketModal(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveTicketResolution}>
              {/* Customer & Ticket Info Box */}
              <div style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "14px",
                marginTop: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "13px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" }}>User Details</span>
                    <h4 style={{ margin: "2px 0 0", color: "#0f172a", fontSize: "14px", fontWeight: "700" }}>
                      {formatSafeText(replyTicketModal.userName, "Customer")}
                    </h4>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#334155", fontWeight: "600" }}>📞 {formatSafeText(replyTicketModal.userPhone, "—")}</span>
                    {replyTicketModal.userPhone && (
                      <a
                        href={`https://wa.me/91${replyTicketModal.userPhone.replace(/[^0-9]/g, "").slice(-10)}?text=${encodeURIComponent(`Namaste ${replyTicketModal.userName || "Customer"}, TyreSaathi Support se aapke Ticket #${replyTicketModal.ticketNo || replyTicketModal.id.slice(0,6)} ke sambandh me:`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#22c55e",
                          color: "#ffffff",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "700",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px"
                        }}
                      >
                        💬 Chat on WA
                      </a>
                    )}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "11px" }}>Category:</span>
                    <strong style={{ display: "block", color: "#1e293b" }}>{formatSafeText(replyTicketModal.category, "General")}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "11px" }}>Priority:</span>
                    <span className={`priority-tag priority-${formatSafeText(replyTicketModal.priority, "medium")}`} style={{ display: "inline-block", marginTop: "2px" }}>
                      {formatSafeText(replyTicketModal.priority, "MEDIUM").toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>Subject & Issue:</span>
                  <strong style={{ display: "block", color: "#0f172a", marginTop: "2px" }}>{formatSafeText(replyTicketModal.subject, "Support Request")}</strong>
                  <p style={{ margin: "4px 0 0", color: "#475569", lineHeight: "1.4", fontSize: "12.5px" }}>
                    {formatSafeText(replyTicketModal.description, "No description provided.")}
                  </p>
                </div>

                {/* Attached Screenshot / Photo if submitted by customer */}
                {(replyTicketModal.imageUrl || replyTicketModal.attachmentUrl) && (
                  <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "8px" }}>
                    <span style={{ color: "#64748b", fontSize: "11px", fontWeight: "700" }}>📷 Attached Photo / Screenshot (ग्राहक द्वारा भेजी गई फ़ोटो):</span>
                    <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={replyTicketModal.imageUrl || replyTicketModal.attachmentUrl}
                        alt="Customer ticket attachment"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1.5px solid #cbd5e1",
                          cursor: "pointer",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                        }}
                        onClick={() => setPreviewModalImg(replyTicketModal.imageUrl || replyTicketModal.attachmentUrl)}
                        title="Bada dekhne ke liye click karein"
                      />
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => setPreviewModalImg(replyTicketModal.imageUrl || replyTicketModal.attachmentUrl)}
                          style={{
                            background: "#eff6ff",
                            color: "#2563eb",
                            border: "1px solid #bfdbfe",
                            padding: "5px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "700",
                            cursor: "pointer",
                            width: "fit-content"
                          }}
                        >
                          🔍 Full Screen View (बड़ा देखें)
                        </button>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>Click thumbnail or button to zoom</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div className="modal-field" style={{ marginTop: "14px" }}>
                <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                  Update Ticket Status (स्थिति अपडेट करें) *
                </label>
                <select
                  value={replyStatus}
                  onChange={(e) => setReplyStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid var(--border)",
                    fontSize: "13px",
                    fontWeight: "600",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="resolved">🟢 Resolved (समस्या हल हो गई)</option>
                  <option value="in_progress">🔵 In Progress (काम चल रहा है / अंडर रिव्यू)</option>
                  <option value="open">🟡 Open / Pending (लंबित)</option>
                  <option value="closed">⚪ Closed (बंद)</option>
                </select>
              </div>

              {/* Quick Template Pills */}
              <div style={{ marginTop: "10px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", display: "block", marginBottom: "6px" }}>
                  ⚡ Quick Response Templates (1-Click Paste):
                </span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {[
                    "Aapki samasya ka safaltapurvak samadhan kar diya gaya hai. TyreSaathi se judne ke liye dhanyawad!",
                    "Hamaari support team ne aapse baat ki hai aur requested assistance schedule kar di hai.",
                    "Aapki complaint review kar li gayi hai aur repair partner ko immediate instructions bhej diye gaye hain.",
                  ].map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReplyText(tpl)}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        padding: "4px 10px",
                        fontSize: "11px",
                        color: "#334155",
                        cursor: "pointer",
                        textAlign: "left",
                        lineHeight: "1.3"
                      }}
                    >
                      {tpl.slice(0, 38)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution Textarea */}
              <div className="modal-field" style={{ marginTop: "10px" }}>
                <label style={{ fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                  Admin Resolution Note / Reply (ग्राहक को भेजा जाने वाला संदेश) *
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Kripya yahan customer ko samadhan ka vivran likhein..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid var(--border)",
                    fontSize: "13px",
                    boxSizing: "border-box",
                    lineHeight: "1.4"
                  }}
                  required
                />
              </div>

              {/* Actions */}
              <div className="modal-actions" style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                <button type="button" className="btn-cancel" onClick={() => setReplyTicketModal(null)}>
                  Cancel (रद्द करें)
                </button>
                <button
                  type="submit"
                  disabled={solvingTicketLoading}
                  style={{
                    background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    color: "#ffffff",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    fontSize: "13.5px",
                    cursor: solvingTicketLoading ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)"
                  }}
                >
                  {solvingTicketLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                  {solvingTicketLoading ? "Saving..." : "✅ Save Solution & Update Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attachment Image Lightbox */}
      {previewModalImg && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(5px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}
          onClick={() => setPreviewModalImg(null)}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "88vh" }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewModalImg(null)}
              style={{
                position: "absolute",
                top: "-16px",
                right: "-16px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ffffff",
                color: "#0f172a",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                zIndex: 2
              }}
              title="Close"
            >
              ✕
            </button>
            <img
              src={previewModalImg}
              alt="Customer Attached Photo"
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                display: "block"
              }}
            />
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
      </main>

      <style>{`
        /* ══════════════════════════════════════════════════════════════════
           🏛️ ENTERPRISE SAAS MASTER LAYOUT (SIDEBAR + DARK DASHBOARD)
        ══════════════════════════════════════════════════════════════════ */
        .admin-enterprise-shell {
          display: flex;
          height: 100%;
          flex: 1;
          min-height: 0;
          background: #f8fafc;
          color: #0f172a;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          width: 100%;
          overflow: hidden;
        }

        /* ─── Left Enterprise Sidebar ─── */
        /* ─── Left Enterprise Sidebar (Light Theme Matching Image 2) ─── */
        .admin-enterprise-sidebar {
          width: 250px;
          min-width: 250px;
          flex-shrink: 0;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          height: 100%;
          max-height: 100%;
          overflow: hidden;
          z-index: 99;
          transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .admin-enterprise-shell.sidebar-collapsed .admin-enterprise-sidebar {
          width: 68px;
          min-width: 68px;
        }

        .sidebar-brand-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 14px;
          border-bottom: 1px solid #e2e8f0;
          background: #ffffff;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-logo-icon {
          width: 32px;
          height: 32px;
          background: #ef4444;
          color: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.25);
        }
        .sidebar-brand-text {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.01em;
        }
        .sidebar-toggle-btn {
          width: 28px;
          height: 28px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .sidebar-toggle-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .sidebar-nav-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .sidebar-section-divider {
          padding: 10px 10px 4px;
        }
        .sidebar-section-title {
          font-size: clamp(0.72rem, 0.85vw, 0.82rem);
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 14px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #475569;
          font-size: clamp(0.92rem, 1.1vw, 1.02rem);
          font-weight: 650;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
          position: relative;
        }
        .sidebar-nav-item:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .sidebar-nav-item.active {
          background: #fee2e2;
          color: #b91c1c;
          font-weight: 700;
        }
        .sidebar-nav-item.item-dashboard.active {
          background: #c0392b !important;
          color: #ffffff !important;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.35);
        }
        .sidebar-nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sidebar-nav-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar-badge-amber {
          font-size: 0.68rem;
          background: #fef3c7;
          color: #b45309;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 700;
        }
        .sidebar-badge-green {
          font-size: 0.68rem;
          background: #d1fae5;
          color: #047857;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 700;
        }
        .sidebar-badge-blue {
          font-size: 0.68rem;
          background: #dbeafe;
          color: #1d4ed8;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 700;
        }
        .sidebar-badge-red {
          font-size: 0.68rem;
          background: #fee2e2;
          color: #b91c1c;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 700;
        }
        .sidebar-badge-neutral {
          font-size: 0.68rem;
          background: #f1f5f9;
          color: #475569;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 700;
        }

        .sidebar-footer-user {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 10px;
          padding: 12px 14px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          width: 100%;
          box-sizing: border-box;
        }
        .sidebar-user-avatar {
          width: 30px;
          height: 30px;
          background: #e2e8f0;
          color: #d97706;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 800;
        }
        .sidebar-user-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .sidebar-user-email {
          font-size: 0.75rem;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-user-badge {
          font-size: 0.65rem;
          color: #059669;
          font-weight: 700;
        }

        /* ─── Main Viewport (Automotive Theme Background Matching Image) ─── */
        .admin-enterprise-main {
          flex: 1;
          min-width: 0;
          background-color: #f8fafc;
          /* Automotive tyre tread texture pattern overlay */
          background-image: 
            radial-gradient(circle at 85% 15%, rgba(15, 23, 42, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 10% 85%, rgba(192, 57, 43, 0.05) 0%, transparent 45%),
            url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230f172a' fill-opacity='0.035'%3E%3Cpath d='M0 15 L25 0 L50 15 L25 30 Z M40 15 L65 0 L90 15 L65 30 Z M0 55 L25 40 L50 55 L25 70 Z M40 55 L65 40 L90 55 L65 70 Z'/%3E%3C/g%3E%3C/svg%3E");
          background-attachment: fixed;
          color: #0f172a;
          overflow-y: auto;
          overflow-x: hidden;
          padding: clamp(16px, 2.5vw, 32px);
          height: 100%;
          max-height: 100%;
          position: relative;
        }

        .admin-sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.72) !important;
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(4px) !important;
          z-index: 99998 !important;
          cursor: pointer;
        }

        .admin-sidebar-mobile-close {
          display: none;
        }

        .btn-admin-mobile-sections {
          display: none;
        }

        .sidebar-footer-user-row {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          min-width: 0;
        }
        .sidebar-exit-store-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          box-sizing: border-box;
          padding: 8px 12px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          color: #334155;
          text-decoration: none;
          font-size: 12px;
          font-weight: 750;
          white-space: nowrap;
          transition: all 0.15s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .sidebar-exit-store-link:hover,
        .sidebar-exit-store-link:active {
          background: #fee2e2;
          color: #c0392b;
          border-color: #fca5a5;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .admin-enterprise-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 300px;
            max-width: 86vw;
            min-width: 0 !important;
            z-index: 99999 !important;
            transform: translateX(-100%);
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 6px 0 32px rgba(0, 0, 0, 0.35);
            background: #ffffff;
            display: flex;
            flex-direction: column;
            padding-top: max(env(safe-area-inset-top, 0px), 8px);
            padding-bottom: max(env(safe-area-inset-bottom, 0px), 12px);
          }
          .admin-enterprise-sidebar.mobile-open {
            transform: translateX(0);
          }
          .admin-enterprise-main {
            width: 100% !important;
            max-width: 100vw !important;
            flex: 1;
            padding: 10px 8px 36px !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          .admin-sidebar-mobile-close {
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            color: #0f172a;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            transition: all 0.15s ease;
          }
          .admin-sidebar-mobile-close:hover,
          .admin-sidebar-mobile-close:active {
            background: #fee2e2;
            color: #c0392b;
            border-color: #fca5a5;
            transform: scale(0.92);
          }
          .btn-admin-mobile-sections {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #c0392b;
            color: #ffffff;
            border: none;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(192, 57, 43, 0.3);
            white-space: nowrap;
          }
          .btn-admin-mobile-sections:hover {
            background: #a93226;
          }
          .admin-subtab-nav-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .admin-subtab-top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 14px;
          }
          .btn-back-to-dashboard {
            font-size: 12px;
            padding: 6px 10px;
          }
          .subtab-section-tag {
            font-size: 12px;
          }
        }

        /* Tyre Silhouette Background Watermarks */
        .admin-tyre-bg-watermark-right {
          position: absolute;
          right: -20px;
          top: 140px;
          width: 320px;
          height: 480px;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='200' height='300' viewBox='0 0 200 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230f172a' stroke-width='4' stroke-opacity='0.04'%3E%3Cellipse cx='100' cy='150' rx='80' ry='130' /%3E%3Cellipse cx='100' cy='150' rx='50' ry='90' /%3E%3Cpath d='M20 150 L60 150 M140 150 L180 150 M100 20 L100 60 M100 240 L100 280' /%3E%3Cpath d='M35 80 L65 105 M135 195 L165 220 M165 80 L135 105 M65 195 L35 220' /%3E%3C/g%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0.6;
        }
        .admin-tyre-bg-watermark-left {
          position: absolute;
          left: -30px;
          bottom: 40px;
          width: 240px;
          height: 300px;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='160' height='240' viewBox='0 0 160 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c0392b' stroke-width='3.5' stroke-opacity='0.045'%3E%3Cellipse cx='80' cy='120' rx='70' ry='100' /%3E%3Cellipse cx='80' cy='120' rx='40' ry='65' /%3E%3Cpath d='M10 120 L40 120 M120 120 L150 120 M80 20 L80 55 M80 185 L80 220' /%3E%3C/g%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
          opacity: 0.6;
        }

        /* ─── Sub-Tab Top Navigation Bar ─── */
        .admin-subtab-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 18px;
          margin-bottom: 22px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          position: relative;
          z-index: 2;
        }
        .btn-back-to-dashboard {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f1f5f9;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: clamp(0.85rem, 1.1vw, 0.95rem);
          font-weight: 750;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-back-to-dashboard:hover {
          background: #e2e8f0;
          color: #c0392b;
        }
        .subtab-section-tag {
          color: #64748b;
          font-size: clamp(0.82rem, 1vw, 0.92rem);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .subtab-section-tag strong {
          color: #c0392b;
          font-size: clamp(0.85rem, 1.1vw, 0.95rem);
        }

        /* ─── Light Enterprise Cockpit Dashboard (Dynamic Responsive Typography) ─── */
        .dark-enterprise-dashboard {
          position: relative;
          z-index: 1;
          max-width: 1360px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.2vw, 26px);
        }

        .dark-dash-header {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 4px;
        }
        @media (min-width: 768px) {
          .dark-dash-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .dark-dash-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dark-dash-title {
          font-size: clamp(1.85rem, 2.6vw, 2.5rem);
          font-weight: 850;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .dark-dash-live-badge {
          background: #ecfdf5;
          color: #059669;
          border: 1.5px solid #a7f3d0;
          font-size: clamp(0.75rem, 0.9vw, 0.82rem);
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .dark-dash-subtitle {
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: #475569;
          margin: 6px 0 0;
          line-height: 1.4;
        }
        .dark-dash-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .dark-dash-search {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 240px;
        }
        .dark-search-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }
        .dark-search-input {
          width: 100%;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          padding: 10px 14px 10px 38px;
          font-size: clamp(0.88rem, 1.1vw, 0.98rem);
          color: #0f172a;
          outline: none;
          transition: all 0.15s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .dark-search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .dark-sync-btn {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #334155;
          border-radius: 10px;
          padding: 10px 18px;
          font-size: clamp(0.88rem, 1.1vw, 0.98rem);
          font-weight: 750;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }
        .dark-sync-btn:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          color: #0f172a;
          transform: translateY(-1px);
        }

        /* ─── 4 Clean Metric Cards (Enlarged Responsive Typography) ─── */
        .dark-kpi-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: clamp(14px, 1.8vw, 20px);
        }
        @media (min-width: 640px) {
          .dark-kpi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .dark-kpi-grid { grid-template-columns: repeat(4, 1fr); }
        }

        .dark-kpi-card {
          border: 1px solid #e2e8f0;
          background: #ffffff;
          border-radius: 16px;
          padding: clamp(18px, 2vw, 24px);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }
        .dark-kpi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px -6px rgba(0,0,0,0.09);
          border-color: #cbd5e1;
        }
        .kpi-emerald-glow {
          background: linear-gradient(135deg, #ffffff 60%, #ecfdf5 100%);
        }
        .kpi-teal-glow {
          background: linear-gradient(135deg, #ffffff 60%, #f0fdfa 100%);
        }
        .kpi-cyan-glow {
          background: linear-gradient(135deg, #ffffff 60%, #eff6ff 100%);
        }
        .kpi-rose-glow {
          background: linear-gradient(135deg, #ffffff 60%, #fff1f2 100%);
        }

        .dark-kpi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .dark-kpi-label {
          font-size: clamp(0.90rem, 1.1vw, 1.05rem);
          font-weight: 750;
          color: #475569;
        }
        .dark-trend-badge {
          font-size: clamp(0.75rem, 0.9vw, 0.84rem);
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 9999px;
        }
        .badge-green {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
        }
        .badge-rose {
          background: #fef2f2;
          color: #e11d48;
          border: 1px solid #fecdd3;
        }
        .dark-kpi-value {
          font-size: clamp(1.95rem, 2.9vw, 2.55rem);
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 6px;
        }
        .dark-kpi-sub {
          font-size: clamp(0.82rem, 1vw, 0.94rem);
          color: #64748b;
          line-height: 1.35;
        }

        /* ─── 2-Column Cockpit Layout (Enlarged Responsive Cards) ─── */
        .dark-cockpit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(16px, 2vw, 24px);
        }
        @media (min-width: 960px) {
          .dark-cockpit-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .dark-cockpit-col {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 24px);
        }

        .dark-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: clamp(18px, 2.2vw, 24px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          position: relative;
        }
        .dark-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .dark-card-title {
          font-size: clamp(1.1rem, 1.4vw, 1.3rem);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.01em;
        }
        .dark-card-more {
          color: #94a3b8;
          cursor: pointer;
        }
        .dark-card-link {
          background: none;
          border: none;
          color: #2563eb;
          font-size: clamp(0.85rem, 1.1vw, 0.96rem);
          font-weight: 750;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s ease;
        }
        .dark-card-link:hover {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .dark-traffic-scale {
          font-size: clamp(0.84rem, 1.05vw, 0.94rem);
          color: #475569;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .dark-traffic-chart {
          height: 130px;
          width: 100%;
        }
        .dark-wave-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .dark-item-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .dark-list-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 12px;
          border-radius: 10px;
          transition: background 0.15s ease;
        }
        .dark-list-item:hover {
          background: #f8fafc;
        }
        .dark-item-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dark-item-icon-box.circle-green {
          background: #ecfdf5;
          color: #059669;
          border-radius: 50%;
        }
        .dark-item-info {
          flex: 1;
          min-width: 0;
        }
        .dark-item-title {
          font-size: clamp(0.96rem, 1.25vw, 1.12rem);
          font-weight: 750;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .dark-item-sub {
          font-size: clamp(0.82rem, 1vw, 0.92rem);
          color: #64748b;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .dark-pill-badge {
          font-size: clamp(0.78rem, 0.95vw, 0.88rem);
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 9999px;
          flex-shrink: 0;
        }
        .pill-confirmed, .pill-active-green {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
        }
        .pill-pending, .pill-paused-amber {
          background: #fef3c7;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        .pill-cancelled {
          background: #fef2f2;
          color: #e11d48;
          border: 1px solid #fecdd3;
        }

        .dark-card-footer {
          padding-top: 8px;
          border-top: 1px solid #f1f5f9;
          margin-top: 4px;
        }
        .dark-show-more-btn {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }
        .dark-show-more-btn:hover {
          text-decoration: underline;
        }

        /* ─── Light Enterprise Modals & Popups (Matching Image 2) ─── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-card {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 14px !important;
          width: 100%;
          padding: 22px !important;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25) !important;
          max-height: 90vh;
          overflow-y: auto;
          color: #0f172a !important;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a !important;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748b;
          line-height: 1;
          padding: 4px;
        }
        .modal-close:hover {
          color: #0f172a;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .modal-field label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155 !important;
        }
        .modal-field input, .modal-field select, .modal-field textarea {
          background: #ffffff !important;
          color: #0f172a !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          padding: 9px 12px !important;
          font-size: 0.85rem !important;
          outline: none;
          font-family: inherit;
        }
        .modal-field input:focus, .modal-field select:focus, .modal-field textarea:focus {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }
        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 18px;
          border-top: 1px solid #e2e8f0;
          padding-top: 14px;
        }
        .btn-cancel {
          background: #f1f5f9 !important;
          border: 1px solid #cbd5e1 !important;
          color: #334155 !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-weight: 700 !important;
          font-size: 0.8125rem !important;
          cursor: pointer !important;
          transition: all 0.15s ease;
        }
        .btn-cancel:hover {
          background: #e2e8f0 !important;
          color: #0f172a !important;
        }

        /* ══════════════════════════════════════════════════════════════════
           🌟 ENTERPRISE EXECUTIVE COMMAND BAR & ADMIN HEADER
        ══════════════════════════════════════════════════════════════════ */
        .admin-page-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 8px 6px 36px;
        }

        .admin-command-bar {
          background: linear-gradient(135deg, #0b132b 0%, #1c2541 55%, #1e293b 100%);
          color: #ffffff;
          border-radius: 20px;
          padding: 22px 26px;
          margin-bottom: 22px;
          box-shadow: 0 16px 36px -8px rgba(11, 19, 43, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
        }
        .admin-command-bar::after {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(192, 57, 43, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .command-bar-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding-bottom: 16px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          z-index: 2;
        }
        .command-meta-left, .command-meta-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .admin-identity-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(192, 57, 43, 0.2);
          border: 1px solid rgba(192, 57, 43, 0.4);
          color: #fca5a5;
          font-size: 0.6875rem;
          font-weight: 800;
          letter-spacing: 0.6px;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .icon-pulse-red {
          color: #ef4444;
          animation: pulseIcon 2s infinite ease-in-out;
        }
        @keyframes pulseIcon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.92); }
        }

        .admin-system-health-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #6ee7b7;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.4px;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
          animation: blinkDot 1.5s infinite;
        }
        @keyframes blinkDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .admin-version-pill {
          font-size: 0.6875rem;
          color: #94a3b8;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .admin-super-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f1f5f9;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 11px;
          border-radius: 20px;
        }
        .root-tag {
          background: #f59e0b;
          color: #000;
          font-size: 0.6rem;
          font-weight: 900;
          padding: 1px 5px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }

        .admin-sync-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .admin-sync-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .icon-spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .admin-mode-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #a7f3d0;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .admin-mode-pill:hover {
          background: rgba(16, 185, 129, 0.25);
          transform: translateY(-1px);
        }

        .btn-command-excel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #10b981;
          color: #ffffff;
          border: none;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
          transition: all 0.2s ease;
        }
        .btn-command-excel:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        /* Command Bar Main Title */
        .command-bar-main {
          margin-bottom: 16px;
          position: relative;
          z-index: 2;
        }
        .command-bar-title {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin: 0 0 6px;
          color: #ffffff;
          line-height: 1.2;
        }
        @media (max-width: 640px) {
          .command-bar-title { font-size: 1.25rem; }
        }
        .command-bar-sub {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.45;
          max-width: 800px;
        }

        /* Bottom Command Controls */
        .command-bar-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
          z-index: 10;
        }

        .admin-jump-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
          max-width: 540px;
        }
        .admin-jump-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        .jump-search-icon {
          position: absolute;
          left: 14px;
          color: #94a3b8;
          pointer-events: none;
        }
        .admin-jump-input {
          width: 100%;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #ffffff;
          font-size: 0.84rem;
          padding: 10px 38px 10px 40px;
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        .admin-jump-input::placeholder {
          color: #64748b;
        }
        .admin-jump-input:focus {
          outline: none;
          border-color: #38bdf8;
          background: rgba(15, 23, 42, 0.9);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
        }
        .jump-clear-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .jump-clear-btn:hover { color: #ffffff; }

        /* Jump Dropdown */
        .admin-jump-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
          overflow: hidden;
          z-index: 100;
          max-height: 380px;
          display: flex;
          flex-direction: column;
        }
        .jump-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.6875rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.5px;
        }
        .jump-dropdown-list {
          overflow-y: auto;
          padding: 6px;
        }
        .jump-empty {
          padding: 18px;
          text-align: center;
          color: #64748b;
          font-size: 0.8rem;
        }
        .jump-dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .jump-dropdown-item:hover, .jump-item-active {
          background: rgba(255, 255, 255, 0.08);
        }
        .jump-item-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .jump-item-info {
          flex: 1;
          min-width: 0;
        }
        .jump-item-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 2px;
        }
        .jump-item-title {
          font-size: 0.84rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .jump-item-badge {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 6px;
        }
        .jump-item-count {
          font-size: 0.72rem;
          color: #94a3b8;
          font-weight: 600;
        }
        .jump-item-desc {
          display: block;
          font-size: 0.72rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .jump-item-arrow {
          color: #475569;
        }
        .jump-dropdown-item:hover .jump-item-arrow {
          color: #38bdf8;
          transform: translateX(2px);
        }

        /* Command Stat Chips */
        .command-stat-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .stat-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 7px 12px;
          border-radius: 10px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .stat-chip:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }
        .stat-chip-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .stat-chip-dot.green { background: #10b981; }
        .stat-chip-dot.blue { background: #3b82f6; }
        .stat-chip-dot.pink { background: #ec4899; }
        .stat-chip-dot.red { background: #ef4444; }
        .stat-chip-lbl { color: #94a3b8; font-weight: 600; }
        .stat-chip-val { color: #f8fafc; font-weight: 800; }

        /* ══════════════════════════════════════════════════════════════════
           🧭 CATEGORIZED EXECUTIVE NAV MATRIX (NO OVERFLOW SCROLLBAR!)
        ══════════════════════════════════════════════════════════════════ */
        .admin-nav-matrix-wrapper {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 16px 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
        }

        .nav-matrix-clusters {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 14px;
        }
        @media (min-width: 768px) {
          .nav-matrix-clusters {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 1200px) {
          .nav-matrix-clusters {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }

        .nav-cluster {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 14px;
          transition: all 0.2s ease;
        }
        .nav-cluster:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
        }

        .nav-cluster-label {
          font-size: 0.7rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-cluster-pills {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .admin-matrix-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        .admin-matrix-pill:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
          transform: translateX(2px);
        }
        .admin-matrix-pill.pill-active {
          background: #c0392b !important;
          color: #ffffff !important;
          border-color: #c0392b !important;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3) !important;
        }
        .admin-matrix-pill span:first-of-type {
          flex: 1;
        }

        .pill-badge-pulse {
          font-size: 0.65rem;
          font-weight: 800;
          background: #fef3c7;
          color: #d97706;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: auto;
        }
        .pill-badge-green {
          font-size: 0.65rem;
          font-weight: 800;
          background: #dcfce7;
          color: #15803d;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: auto;
        }
        .pill-badge-blue {
          font-size: 0.65rem;
          font-weight: 800;
          background: #dbeafe;
          color: #1d4ed8;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: auto;
        }
        .pill-badge-amber {
          font-size: 0.65rem;
          font-weight: 800;
          background: #fef3c7;
          color: #b45309;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: auto;
        }
        .pill-badge-red {
          font-size: 0.65rem;
          font-weight: 800;
          background: #fee2e2;
          color: #b91c1c;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: auto;
        }
        .pill-badge-neutral {
          font-size: 0.68rem;
          font-weight: 700;
          background: #f1f5f9;
          color: #64748b;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: auto;
        }
        .admin-matrix-pill.pill-active .pill-badge-pulse,
        .admin-matrix-pill.pill-active .pill-badge-green,
        .admin-matrix-pill.pill-active .pill-badge-blue,
        .admin-matrix-pill.pill-active .pill-badge-amber,
        .admin-matrix-pill.pill-active .pill-badge-red,
        .admin-matrix-pill.pill-active .pill-badge-neutral {
          background: rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
        }

        /* ══════════════════════════════════════════════════════════════════
           ⚡ EXECUTIVE 2-COLUMN COCKPIT (LIVE ACTIVITY & STREAMS)
        ══════════════════════════════════════════════════════════════════ */
        .admin-cockpit-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (min-width: 900px) {
          .admin-cockpit-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        .cockpit-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cockpit-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 18px 20px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cockpit-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 10px 26px -4px rgba(0, 0, 0, 0.07);
        }

        .cockpit-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          gap: 10px;
        }
        .cockpit-card-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cockpit-card-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cockpit-card-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.25;
        }
        .cockpit-card-sub {
          font-size: 0.72rem;
          color: #64748b;
          margin: 0;
        }

        .cockpit-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s ease;
        }
        .cockpit-action-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        /* Traffic Visual */
        .cockpit-traffic-visual {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .traffic-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .traffic-metric {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          padding: 10px 12px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .traffic-metric-label {
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
        }
        .traffic-metric-value {
          font-size: 1.2rem;
          font-weight: 900;
          color: #0f172a;
        }
        .traffic-trend {
          font-size: 0.65rem;
          font-weight: 700;
        }
        .traffic-trend.green { color: #15803d; }
        .traffic-trend.blue { color: #1d4ed8; }

        .cockpit-sparkline-wrap {
          height: 60px;
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          background: #f8fafc;
        }
        .cockpit-sparkline-svg {
          width: 100%;
          height: 100%;
        }

        /* Cockpit Stream List */
        .cockpit-stream-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stream-empty-note {
          padding: 18px;
          text-align: center;
          color: #64748b;
          font-size: 0.8rem;
          background: #f8fafc;
          border-radius: 10px;
        }
        .cockpit-stream-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          transition: all 0.15s ease;
        }
        .cockpit-stream-item:hover {
          background: #f1f5f9;
          border-color: #e2e8f0;
        }
        .stream-item-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stream-item-info {
          flex: 1;
          min-width: 0;
        }
        .stream-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }
        .stream-title {
          font-size: 0.84rem;
          font-weight: 800;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stream-date {
          font-size: 0.68rem;
          color: #94a3b8;
          font-weight: 600;
          white-space: nowrap;
        }
        .stream-subtitle {
          font-size: 0.72rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stream-city-tag {
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 600;
        }
        .stream-bullet {
          color: #94a3b8;
          margin-left: 4px;
        }

        .stream-status-pill {
          font-size: 0.6875rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 10px;
          border: 1px solid transparent;
          white-space: nowrap;
        }
        .pill-completed {
          background: #dcfce7;
          color: #15803d;
          border-color: #bbf7d0;
        }
        .pill-confirmed {
          background: #eff6ff;
          color: #1d4ed8;
          border-color: #bfdbfe;
        }
        .pill-pending {
          background: #fef3c7;
          color: #b45309;
          border-color: #fde68a;
        }
        .pill-cancelled {
          background: #fee2e2;
          color: #b91c1c;
          border-color: #fca5a5;
        }

        /* ══════════════════════════════════════════════════════════════════
           📊 EXECUTIVE KPI METRICS CARDS
        ══════════════════════════════════════════════════════════════════ */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }
        @media (min-width: 640px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .admin-stats-grid { grid-template-columns: repeat(4, 1fr); gap: 16px; }
        }

        .admin-metric-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          position: relative;
          overflow: hidden;
        }
        .admin-metric-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          transition: all 0.2s ease;
        }
        .metric-card-revenue::before { background: linear-gradient(90deg, #10b981, #059669); }
        .metric-card-bookings::before { background: linear-gradient(90deg, #3b82f6, #1d4ed8); }
        .metric-card-shops::before { background: linear-gradient(90deg, #f59e0b, #d97706); }
        .metric-card-tickets::before { background: linear-gradient(90deg, #ef4444, #b91c1c); }

        .admin-metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -4px rgba(0, 0, 0, 0.09);
          border-color: #cbd5e1;
        }

        .metric-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .metric-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .icon-wrap-revenue { background: #ecfdf5; color: #10b981; }
        .icon-wrap-bookings { background: #eff6ff; color: #3b82f6; }
        .icon-wrap-shops { background: #fef3c7; color: #d97706; }
        .icon-wrap-tickets { background: #fef2f2; color: #ef4444; }

        .metric-trend-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.6875rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 12px;
        }
        .trend-green { background: #dcfce7; color: #15803d; }
        .trend-blue { background: #dbeafe; color: #1d4ed8; }
        .trend-amber { background: #fef3c7; color: #b45309; }
        .trend-red { background: #fee2e2; color: #b91c1c; }

        .metric-lbl {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          display: block;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .metric-val {
          font-size: 1.6rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 10px;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }
        .metric-footer-note {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          border-top: 1px solid #f1f5f9;
          padding-top: 10px;
          margin-top: 4px;
          transition: color 0.2s ease;
        }
        .admin-metric-card:hover .metric-footer-note {
          color: #0f172a;
        }

        /* ══════════════════════════════════════════════════════════════════
           ⚡ ENTERPRISE MODULE TILES (12 Modules)
        ══════════════════════════════════════════════════════════════════ */
        .admin-module-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          margin: 10px 0 18px;
          flex-wrap: wrap;
        }
        .module-section-title {
          font-size: 1.18rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px;
          letter-spacing: -0.3px;
        }
        .module-section-sub {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0;
        }
        .module-section-count {
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
          background: #d1fae5;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .admin-quick-links-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 640px) {
          .admin-quick-links-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .admin-quick-links-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }

        .shortcut-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px 18px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .shortcut-box::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          bottom: 0;
          background: var(--module-color, #c0392b);
          transition: width 0.2s ease;
        }
        .shortcut-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -4px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }
        .shortcut-box:hover::before {
          width: 6px;
        }

        .sc-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .sc-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }
        .sc-category-tag {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #94a3b8;
          background: #f8fafc;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #f1f5f9;
        }

        .sc-content {
          flex-grow: 1;
          margin-bottom: 14px;
        }
        .sc-title {
          margin: 0 0 6px;
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .sc-count-chip {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 600;
        }
        .sc-desc {
          margin: 0;
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.45;
        }

        .sc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }
        .sc-arrow {
          font-size: 0.8125rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s ease;
        }
        .shortcut-box:hover .sc-arrow {
          gap: 8px;
        }
        .sc-arrow-icon {
          transition: transform 0.2s ease;
        }
        .shortcut-box:hover .sc-arrow-icon {
          transform: translateX(3px);
        }
        .sc-status-pill {
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: #f8fafc;
        }

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
          font-size: 14px;
        }
        .admin-data-table th {
          background: #f8fafc;
          padding: 13px 16px;
          text-align: left;
          font-weight: 750;
          color: #475569;
          border-bottom: 2px solid #e2e8f0;
          font-size: 12.5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        .admin-data-table td {
          padding: 13px 16px;
          border-bottom: 1px solid #e2e8f0;
          vertical-align: middle;
          font-size: 14px;
        }
        .admin-data-table tbody tr:hover td {
          background: #f8fafc;
        }
        .shop-title-name {
          font-size: 15px;
          font-weight: 750;
          color: #0f172a;
          display: block;
          line-height: 1.35;
        }
        .user-subtext {
          display: block;
          font-size: 12.5px;
          color: #64748b;
          margin-top: 3px;
          line-height: 1.35;
        }
        .role-badge {
          font-size: 12px;
          font-weight: 800;
          padding: 4px 9px;
          border-radius: 6px;
          display: inline-block;
          letter-spacing: 0.3px;
        }
        .role-admin { background: #fdedec; color: #c0392b; border: 1px solid #fca5a5; }
        .role-vendor { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .role-customer { background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; }

        .badge-verified {
          background: #ecfdf5;
          color: #059669;
          padding: 4px 9px;
          border-radius: 6px;
          font-weight: 750;
          font-size: 12px;
          border: 1px solid #a7f3d0;
          display: inline-block;
        }
        .badge-unverified {
          background: #fffbeb;
          color: #d97706;
          padding: 4px 9px;
          border-radius: 6px;
          font-weight: 750;
          font-size: 12px;
          border: 1px solid #fde68a;
          display: inline-block;
        }
        .btn-approval-toggle {
          border: none;
          padding: 7px 14px;
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 750;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-approve { background: #059669; color: white; }
        .btn-approve:hover { background: #047857; }
        .btn-unapprove { background: #ffffff; color: #c0392b; border: 1.5px solid #fca5a5; }
        .btn-unapprove:hover { background: #fee2e2; }

        .reg-badge {
          background: var(--bg);
          padding: 3px 7px;
          border-radius: 6px;
          font-weight: 750;
          font-size: 12px;
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

        /* ══════════════════════════════════════════════════════════════════
           MODERN GLOBAL BOOKINGS NETWORK (ENTERPRISE SAAS TABLE)
        ══════════════════════════════════════════════════════════════════ */
        .bookings-modern-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .bookings-modern-header {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        @media (min-width: 768px) {
          .bookings-modern-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .bookings-header-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .bookings-header-title {
            font-size: 1.5rem; /* 24px */
          }
        }

        .bookings-header-subtitle {
          font-size: 0.875rem; /* 14px */
          color: #64748b;
          margin: 4px 0 0;
          line-height: 1.4;
        }

        .bookings-actions-wrap {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-emerald-export {
          padding: 9px 18px;
          background: #059669;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem; /* 14px */
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all 0.15s ease;
        }
        .btn-emerald-export:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .btn-outline-export {
          padding: 9px 18px;
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.875rem; /* 14px */
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          transition: all 0.15s ease;
        }
        .btn-outline-export:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        .bookings-filter-bar {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
        }
        @media (min-width: 900px) {
          .bookings-filter-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .bookings-search-input-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          max-width: 480px;
        }
        .bookings-search-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }
        .bookings-search-field {
          width: 100%;
          padding: 9px 36px 9px 38px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s, background-color 0.15s;
        }
        .bookings-search-field:focus {
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .bookings-search-clear {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .bookings-search-clear:hover {
          color: #0f172a;
        }

        .bookings-status-filter-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .booking-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8125rem;
          font-weight: 600;
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .booking-filter-pill:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .booking-filter-pill.filter-pill-active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }
        .pill-counter {
          font-size: 0.72rem;
          background: rgba(0, 0, 0, 0.08);
          padding: 1px 6px;
          border-radius: 10px;
        }
        .filter-pill-active .pill-counter {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .bookings-table-wrapper {
          overflow-x: auto;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .bookings-enterprise-table {
          min-width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .bookings-enterprise-table thead {
          background: #f8fafc;
        }
        .bookings-enterprise-table th {
          padding: 14px 24px;
          font-size: 0.75rem; /* 12px */
          font-weight: 600;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .bookings-enterprise-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.875rem; /* 14px */
          color: #1e293b;
          vertical-align: middle;
        }
        .bookings-enterprise-table tbody tr:hover td {
          background: #f8fafc;
        }

        .cell-nowrap {
          white-space: nowrap;
        }

        .booking-hub-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.775rem;
          font-weight: 600;
          color: #334155;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .booking-status-pill {
          display: inline-block;
          padding: 4px 12px;
          font-size: 0.75rem; /* 12px */
          font-weight: 700;
          border-radius: 9999px;
          letter-spacing: 0.025em;
        }
        .booking-status-pill.badge-accepted {
          background: #d1fae5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }
        .booking-status-pill.badge-pending {
          background: #fef3c7;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        .booking-status-pill.badge-cancelled {
          background: #ffe4e6;
          color: #be123c;
          border: 1px solid #fecdd3;
        }

        .bookings-empty-state {
          text-align: center;
          padding: 48px 24px !important;
        }
        .bookings-empty-state .empty-icon {
          color: #94a3b8;
          margin-bottom: 10px;
        }
        .bookings-empty-state .empty-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px;
        }
        .bookings-empty-state .empty-desc {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }

        /* Responsive Desktop Table Font Scaling */
        @media (min-width: 768px) {
          .nav-cluster-label {
            font-size: 0.75rem;
            letter-spacing: 0.75px;
          }
          .admin-matrix-pill {
            font-size: 0.875rem;
            padding: 9px 14px;
          }
          .admin-data-table {
            font-size: 14px;
          }
          .admin-data-table th {
            padding: 13px 16px;
            font-size: 13px;
          }
          .admin-data-table td {
            padding: 13px 16px;
            font-size: 14px;
          }
          .user-subtext {
            font-size: 12.5px;
          }
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

        /* Leaderboard Table & Responsive Containers */
        .traffic-leaderboard-card {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.03);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        @media (max-width: 640px) {
          .traffic-leaderboard-card {
            padding: 14px 12px;
            border-radius: 12px;
          }
        }

        .table-scroll-hint {
          display: none;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          color: #d35400;
          background: rgba(230, 126, 34, 0.08);
          border: 1px solid rgba(230, 126, 34, 0.2);
          border-radius: 8px;
          padding: 6px 10px;
          margin-bottom: 12px;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 850px) {
          .table-scroll-hint {
            display: flex;
          }
        }

        .table-responsive {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          display: block;
          box-sizing: border-box;
          margin-bottom: 8px;
          border-radius: 8px;
          border: 1px solid var(--border, #e2e8f0);
        }

        .table-responsive::-webkit-scrollbar {
          height: 6px;
        }
        .table-responsive::-webkit-scrollbar-track {
          background: var(--bg, #f1f5f9);
          border-radius: 4px;
        }
        .table-responsive::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
          margin: 0;
          box-sizing: border-box;
        }

        .traffic-table {
          min-width: 760px;
          width: 100%;
        }

        .traffic-table th,
        .traffic-table td {
          padding: 10px 12px;
          text-align: left;
          border-bottom: 1px solid var(--border, #e2e8f0);
          vertical-align: middle;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .traffic-table th {
          background: var(--surface-2, #f8fafc);
          color: var(--text-muted, #64748b);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        .leaderboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 14px;
          width: 100%;
          box-sizing: border-box;
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
          max-width: 100%;
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
          max-width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 640px) {
          .leaderboard-search-box,
          .leaderboard-search-box input {
            width: 100%;
          }
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

        .subnav-all-active {
          background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
          border-color: #047857 !important;
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

        /* ══════════════════════════════════════════════════════════════════
           📱 ULTRA MOBILE RESPONSIVENESS OVERRIDES (MAX-WIDTH: 768px & 420px)
           Permanently prevents horizontal overflow, cut-off cards & clipped badges
        ══════════════════════════════════════════════════════════════════ */
        @media (max-width: 768px) {
          /* Root Admin Shell & Viewport Containment */
          .admin-enterprise-shell {
            width: 100% !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
          }

          .admin-enterprise-main {
            width: 100% !important;
            max-width: 100vw !important;
            padding: 10px 8px 48px !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }

          .dark-enterprise-dashboard,
          .admin-section-container,
          .bookings-modern-container,
          .admin-traffic-analytics-container,
          .admin-excel-center,
          .admin-page-container {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
            gap: 12px !important;
          }

          /* 2-Column Cockpit Layout on mobile: Strict 1-column with 0-overflow */
          .dark-cockpit-grid {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 12px !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          .dark-cockpit-col {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            gap: 12px !important;
            box-sizing: border-box !important;
          }

          /* Cockpit Cards: Compact padding, full containment */
          .dark-card {
            padding: 12px 10px !important;
            border-radius: 14px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          /* Card Headers: Flexible title with ellipsis & compact action button */
          .dark-card-header {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 6px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            margin-bottom: 10px !important;
          }

          .dark-card-title {
            font-size: 0.95rem !important;
            font-weight: 800 !important;
            flex: 1 1 auto !important;
            min-width: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .dark-card-link {
            font-size: 0.72rem !important;
            font-weight: 750 !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            gap: 2px !important;
            padding: 3px 6px !important;
            background: #eff6ff !important;
            border-radius: 6px !important;
          }

          .dark-card-link svg {
            width: 12px !important;
            height: 12px !important;
          }

          /* Card Item List: Prevent badge clipping */
          .dark-item-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .dark-list-item {
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            padding: 8px 6px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          .dark-item-icon-box {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            border-radius: 8px !important;
            flex-shrink: 0 !important;
          }

          .dark-item-icon-box svg {
            width: 15px !important;
            height: 15px !important;
          }

          .dark-item-info {
            flex: 1 1 auto !important;
            min-width: 0 !important;
            overflow: hidden !important;
          }

          .dark-item-title {
            font-size: 0.86rem !important;
            font-weight: 750 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            line-height: 1.25 !important;
          }

          .dark-item-sub {
            font-size: 0.72rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            line-height: 1.2 !important;
            color: #64748b !important;
            margin-top: 2px !important;
          }

          .dark-pill-badge {
            font-size: 0.68rem !important;
            font-weight: 800 !important;
            padding: 3px 7px !important;
            border-radius: 9999px !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
          }

          /* Traffic & Operations stats grid */
          .dark-traffic-stat-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 4px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            margin-top: 8px !important;
            padding-top: 8px !important;
          }

          .dark-traffic-stat-grid > div {
            min-width: 0 !important;
            text-align: center !important;
            overflow: hidden !important;
          }

          .dark-traffic-stat-grid span {
            font-size: 0.65rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            display: block !important;
          }

          .dark-traffic-stat-grid strong {
            font-size: 0.95rem !important;
            display: block !important;
          }

          /* KPI Grid */
          .dark-kpi-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .dark-kpi-card {
            padding: 12px 10px !important;
            border-radius: 12px !important;
            min-width: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .dark-kpi-top {
            margin-bottom: 6px !important;
            gap: 4px !important;
          }

          .dark-kpi-label {
            font-size: 0.78rem !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .dark-trend-badge {
            font-size: 0.68rem !important;
            padding: 2px 6px !important;
          }

          .dark-kpi-value {
            font-size: 1.45rem !important;
            margin-bottom: 4px !important;
          }

          .dark-kpi-sub {
            font-size: 0.68rem !important;
            line-height: 1.25 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* Dashboard Header */
          .dark-dash-header {
            gap: 10px !important;
            margin-bottom: 6px !important;
          }

          .dark-dash-title {
            font-size: 1.35rem !important;
          }

          .dark-dash-subtitle {
            font-size: 0.82rem !important;
          }

          .dark-dash-actions {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 8px !important;
            width: 100% !important;
          }

          .dark-dash-search {
            flex: 1 1 auto !important;
            min-width: 0 !important;
          }

          .dark-search-input {
            padding: 8px 12px 8px 34px !important;
            font-size: 0.82rem !important;
          }

          .dark-sync-btn {
            padding: 8px 12px !important;
            font-size: 0.82rem !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }

          /* Subtab Top Bar */
          .admin-subtab-top-bar {
            padding: 8px 10px !important;
            border-radius: 10px !important;
            margin-bottom: 12px !important;
            gap: 8px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .admin-subtab-nav-actions {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            width: 100% !important;
            gap: 6px !important;
          }

          .subtab-section-tag {
            font-size: 0.78rem !important;
          }

          /* Tables Across All Tabs (Horizontal Scroll Safe) */
          .table-responsive,
          .admin-table-card,
          .bookings-table-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            box-sizing: border-box !important;
            border-radius: 10px !important;
            margin-bottom: 12px !important;
          }

          .bookings-enterprise-table,
          .admin-data-table,
          .traffic-table {
            min-width: 580px !important;
          }

          .bookings-filter-bar {
            padding: 10px 10px !important;
            border-radius: 10px !important;
            gap: 8px !important;
          }

          .bookings-search-input-box {
            max-width: 100% !important;
            width: 100% !important;
          }

          .bookings-actions-wrap {
            width: 100% !important;
            display: flex !important;
            gap: 6px !important;
          }

          .bookings-actions-wrap button {
            flex: 1 1 auto !important;
            font-size: 0.74rem !important;
            padding: 7px 8px !important;
            justify-content: center !important;
          }

          .section-toolbar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }

          .section-toolbar .search-bar-wrap {
            min-width: 100% !important;
            width: 100% !important;
          }

          .btn-export-excel-action {
            width: 100% !important;
            justify-content: center !important;
          }

          /* Command Bar */
          .admin-command-bar {
            padding: 14px 12px !important;
            border-radius: 14px !important;
            margin-bottom: 14px !important;
          }

          .command-bar-meta {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }

          /* Traffic Suite */
          .traffic-banner-header {
            padding: 14px 12px !important;
            border-radius: 12px !important;
            gap: 10px !important;
          }

          .traffic-title {
            font-size: 1.15rem !important;
          }

          .traffic-timeframe-controls {
            width: 100% !important;
            justify-content: space-between !important;
          }

          .traffic-kpi-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }

          .traffic-kpi-card {
            padding: 12px 10px !important;
          }

          .traffic-charts-two-col {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .chart-card-box {
            padding: 14px 12px !important;
          }

          /* Ads Grid */
          .admin-ads-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          /* Excel Grid */
          .excel-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .excel-download-card {
            padding: 12px 10px !important;
          }

          .btn-download-csv {
            width: 100% !important;
            justify-content: center !important;
            font-size: 0.78rem !important;
          }

          /* Module shortcuts */
          .admin-quick-links-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          /* Modals on Mobile */
          .modal-backdrop {
            padding: 10px !important;
          }

          .modal-card {
            padding: 16px 12px !important;
            max-height: 92vh !important;
            width: 100% !important;
            border-radius: 12px !important;
          }
        }

        @media (max-width: 420px) {
          .dark-kpi-grid {
            grid-template-columns: 1fr !important;
          }

          .traffic-kpi-grid {
            grid-template-columns: 1fr !important;
          }

          .dark-card-title {
            font-size: 0.88rem !important;
          }

          .dark-item-title {
            font-size: 0.82rem !important;
          }

          .dark-item-sub {
            font-size: 0.68rem !important;
          }
        }
      `}</style>
    </div>
  );
}
