import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Plus,
  Wrench,
  Car,
  MapPin,
  User,
  Filter,
  Receipt,
  Download,
  MessageCircle,
  BarChart3
} from "lucide-react";
import { SHOP_PRIMARY_CATEGORIES, SERVICE_TYPES, getCategoryByCode, SAMPLE_SHOPS } from "../config/tyreCatalog";
import { exportBookingsToExcel } from "../utils/excelExport";
import { logBookingToSheet } from "../utils/googleSheets";
import { triggerHaptic, showNativeToast, scheduleServiceReminder } from "../utils/nativeBridge.js";
import { trackStoreEvent } from "../utils/analyticsTracker";
import { sendInAppNotification } from "../utils/notificationService";

export default function Bookings() {
  const [searchParams] = useSearchParams();
  const paramShopId = searchParams.get("shopId");
  const paramShopName = searchParams.get("shopName");
  const paramShopPhone = searchParams.get("shopPhone");
  const paramService = searchParams.get("service");
  const paramOpen = searchParams.get("openModal");

  const { user, profile, isVendor, isAdmin, isShopOwner } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [availableShops, setAvailableShops] = useState(() => {
    return (SAMPLE_SHOPS || []).map((s) => {
      const catCode = s.categoryCode || "CAT_PUNCTURE_REPAIR";
      const catObj = getCategoryByCode(catCode);
      return {
        id: s.id || s.uid,
        name: s.name || s.shopName,
        phone: s.phone || "8877277757",
        categoryCode: catCode,
        categoryName: s.categoryName || catObj.name,
        city: s.city || "Authorized Location",
        address: s.address || (s.city ? `${s.city}, India` : "TyreSaathi Partner Hub"),
        services: s.services || catObj.services,
        rating: s.rating || 4.8,
        reviewsCount: s.reviewsCount || 10
      };
    });
  });
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(Boolean(paramOpen || paramShopName));
  const [loading, setLoading] = useState(false);

  // Helper to determine if current logged-in user is the shop owner for this booking
  const isShopManager = (b) => {
    if (isAdmin) return true;
    if (!isVendor && !isShopOwner) return false;

    const myUid = user?.uid;
    const myShopName = (profile?.shopName || "").toLowerCase().trim();
    const myPhone = (profile?.phone || "").replace(/[^0-9]/g, "").slice(-10);
    const bShopId = b?.shopId;
    const bShopName = (b?.shopName || "").toLowerCase().trim();
    const bShopPhone = (b?.shopPhone || "").replace(/[^0-9]/g, "").slice(-10);

    return (
      (bShopId && myUid && bShopId === myUid) ||
      (myShopName && bShopName && (bShopName === myShopName || bShopName.includes(myShopName) || myShopName.includes(bShopName))) ||
      (myPhone && bShopPhone && myPhone === bShopPhone)
    );
  };

  // Load real registered shops from Firestore
  useEffect(() => {
    async function loadRealShops() {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        if (!usersSnap.empty) {
          const vendorDocs = usersSnap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((u) => u.role === "vendor" || u.role === "admin" || u.shopName);
          if (vendorDocs.length > 0) {
            const formatted = vendorDocs.map((v) => {
              const catCode = v.shopCategory || v.categoryCode || "CAT_PUNCTURE_REPAIR";
              const catObj = getCategoryByCode(catCode);
              const shopServices = (Array.isArray(v.services) && v.services.length > 0)
                ? v.services
                : ((Array.isArray(v.servicesOffered) && v.servicesOffered.length > 0)
                    ? v.servicesOffered
                    : catObj.services);

              return {
                id: v.id || v.uid,
                name: v.shopName || v.name,
                phone: v.phone || "8877277757",
                categoryCode: catCode,
                categoryName: v.shopType || catObj.name,
                city: v.city || (v.address ? v.address.split(",").slice(-2)[0]?.trim() : "") || "Authorized Location",
                address: v.address || (v.city ? `${v.city}, India` : "TyreSaathi Partner Hub"),
                services: shopServices,
                rating: 0,
                reviewsCount: 0
              };
            });
            setAvailableShops(formatted);
            if (paramShopId || paramShopName) {
              const matched = formatted.find(s => s.id === paramShopId || (paramShopName && s.name?.toLowerCase() === paramShopName.toLowerCase()));
              if (matched) {
                setNewBooking((prev) => ({
                  ...prev,
                  shopId: matched.id,
                  shopName: matched.name,
                  shopPhone: matched.phone || prev.shopPhone
                }));
              }
            } else if (formatted[0]) {
              setNewBooking((prev) => {
                if (prev.shopId) return prev;
                return {
                  ...prev,
                  shopId: formatted[0].id,
                  shopName: formatted[0].name,
                  shopPhone: formatted[0].phone
                };
              });
            }
          }
        }
      } catch (e) {
        console.warn("Could not load real shops from Firestore, using verified partner shops:", e);
      }
    }
    loadRealShops();
  }, [paramShopId, paramShopName]);

  // New Booking Form State
  const [newBooking, setNewBooking] = useState(() => {
    const initShop = (paramShopId ? availableShops.find(s => s.id === paramShopId) : null) || 
      (paramShopName ? availableShops.find(s => s.name?.toLowerCase() === paramShopName.toLowerCase()) : null) || 
      availableShops[0] || null;

    return {
      serviceId: paramService || SERVICE_TYPES[0]?.id || "puncture",
      serviceName: paramService ? (SERVICE_TYPES.find(s => s.id === paramService)?.name || paramService) : (SERVICE_TYPES[0]?.name || "Tubeless Puncture Repair"),
      shopId: paramShopId || initShop?.id || "",
      shopName: paramShopName || profile?.shopName || initShop?.name || "TyreSaathi Partner Hub",
      shopPhone: paramShopPhone || profile?.phone || initShop?.phone || "",
      customerName: profile?.name || "",
      customerPhone: profile?.phone || "",
      vehicleType: "Car / SUV",
      vehicleNumber: "",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "10:00 AM - 11:00 AM",
      notes: "",
    };
  });

  // Sync if URL search params change
  useEffect(() => {
    if (paramShopName || paramShopId || paramService) {
      setNewBooking((prev) => ({
        ...prev,
        shopId: paramShopId || prev.shopId,
        shopName: paramShopName || prev.shopName,
        shopPhone: paramShopPhone || prev.shopPhone,
        serviceId: paramService || prev.serviceId,
        serviceName: paramService ? (SERVICE_TYPES.find(s => s.id === paramService)?.name || paramService) : prev.serviceName
      }));
      setModalOpen(true);
    }
  }, [paramShopName, paramShopId, paramShopPhone, paramService]);

  const getBookingStorageKey = () => user?.uid ? `tyresaathi_bookings_${user.uid}` : "tyresaathi_guest_bookings";

  // Fetch real bookings from Firestore if available
  useEffect(() => {
    async function loadBookings() {
      const storageKey = getBookingStorageKey();
      try {
        const snap = await getDocs(collection(db, "bookings"));
        if (!snap.empty) {
          const fetched = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setBookings(fetched);
        } else {
          const local = localStorage.getItem(storageKey);
          if (local) setBookings(JSON.parse(local));
          else setBookings([]);
        }
      } catch (e) {
        console.warn("Using local bookings state:", e);
        const local = localStorage.getItem(storageKey);
        if (local) setBookings(JSON.parse(local));
        else setBookings([]);
      }
    }
    loadBookings();
  }, [user?.uid]);

  // Update Status (Accept / Reject / Complete)
  const handleUpdateStatus = async (bookingId, newStatus) => {
    const targetBooking = bookings.find((b) => b.id === bookingId);
    if (!targetBooking) return;

    // Security check: Only Shop Owner or Admin can accept, start service, or complete.
    // Customer can only cancel their own pending booking.
    const isOwnerOrAdmin = isAdmin || isShopManager(targetBooking);
    const isCustomerOwner = targetBooking.customerId === user?.uid || targetBooking.customerEmail === user?.email;

    if (!isOwnerOrAdmin) {
      if (isCustomerOwner && (newStatus === "cancelled" || newStatus === "rejected")) {
        // Customer cancelling their own booking is allowed
      } else {
        alert("⚠️ Permission Denied: Sirf Shop Owner hi booking accept ya complete kar sakte hain.");
        return;
      }
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
      const existing = bookings.find((b) => b.id === bookingId);
      if (existing) {
        logBookingToSheet({
          ...existing,
          bookingId,
          status: newStatus,
        });

        // 🔔 Send in-app notification to Customer (Strictly locked to Customer Mobile & Email)
        const custPhoneClean = (existing.customerPhone || "").replace(/\D/g, "").slice(-10);
        const custEmailClean = (existing.customerEmail || "").toLowerCase().trim();
        const targetCustRecipient = custPhoneClean ? `phone_${custPhoneClean}` : (custEmailClean || existing.customerId || "unknown_cust");

        sendInAppNotification({
          recipientId: targetCustRecipient,
          recipientRole: "customer",
          title: `🔄 Booking Status Update: ${newStatus.toUpperCase()}`,
          message: `Aapki "${existing.serviceName || 'Tyre Service'}" booking at "${existing.shopName || 'Shop'}" ka status ab "${newStatus}" ho gaya hai.`,
          type: "booking_status",
          link: "/bookings",
          data: {
            bookingId,
            status: newStatus,
            shopName: existing.shopName,
            shopPhone: (existing.shopPhone || "").replace(/\D/g, "").slice(-10),
            shopId: existing.shopId || "",
            customerId: existing.customerId || targetCustRecipient,
            customerPhone: custPhoneClean,
            customerEmail: custEmailClean,
            customerName: existing.customerName || "",
          }
        });
      }
    } catch (e) {
      console.warn("Firestore update notice:", e);
    }
  };

  // Submit New Booking
  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!newBooking.customerName || !newBooking.customerPhone || !newBooking.vehicleNumber) {
      alert("Kripya Naam, Phone aur Gaadi number zaroor bharein!");
      return;
    }

    setLoading(true);
    const bookingData = {
      ...newBooking,
      customerId: user?.uid || "guest_cust",
      userId: user?.uid || "guest_cust",
      customerEmail: user?.email || (profile?.email || ""),
      customerPhone: newBooking.customerPhone || profile?.phone || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    let finalBookingId = "b-" + Date.now();

    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...bookingData,
        createdAtServer: serverTimestamp(),
      });
      finalBookingId = docRef.id;
      const finalBooking = { id: docRef.id, ...bookingData };
      setBookings((prev) => [finalBooking, ...prev]);
      logBookingToSheet(finalBooking);
      trackStoreEvent("booking", {
        shopId: bookingData.shopId || "",
        shopName: bookingData.shopName || "",
        service: bookingData.serviceType || "",
        customerName: bookingData.customerName,
      });
      try {
        const storageKey = getBookingStorageKey();
        const local = JSON.parse(localStorage.getItem(storageKey) || "[]");
        localStorage.setItem(storageKey, JSON.stringify([finalBooking, ...local.filter(b => b.id !== finalBooking.id)]));
      } catch (e) {}
    } catch (err) {
      console.warn("Local fallback save for booking:", err);
      const fallbackBooking = { id: finalBookingId, ...bookingData };
      setBookings((prev) => [fallbackBooking, ...prev]);
      logBookingToSheet(fallbackBooking);
      trackStoreEvent("booking", {
        shopId: bookingData.shopId || "",
        shopName: bookingData.shopName || "",
        service: bookingData.serviceType || "",
        customerName: bookingData.customerName,
      });
      try {
        const storageKey = getBookingStorageKey();
        const local = JSON.parse(localStorage.getItem(storageKey) || "[]");
        localStorage.setItem(storageKey, JSON.stringify([fallbackBooking, ...local.filter(b => b.id !== fallbackBooking.id)]));
      } catch (e) {}
    } finally {
      // 🔔 1. Notify the Shop Owner in real-time
      const shopPhoneClean = (bookingData.shopPhone || "").replace(/\D/g, "").slice(-10);
      const targetShopRecipient = bookingData.shopId || (shopPhoneClean ? `phone_${shopPhoneClean}` : "shop_unknown");
      const custPhoneClean = (bookingData.customerPhone || "").replace(/\D/g, "").slice(-10);
      const custEmailClean = (bookingData.customerEmail || "").toLowerCase().trim();

      sendInAppNotification({
        recipientId: targetShopRecipient,
        recipientRole: "shop_owner",
        title: `📅 Nayi Service Booking Aayi!`,
        message: `${bookingData.customerName} (${bookingData.customerPhone}) ne "${bookingData.serviceName}" (${bookingData.vehicleNumber}) ke liye booking ki hai.`,
        type: "booking_created",
        link: "/bookings",
        data: {
          bookingId: finalBookingId,
          shopId: bookingData.shopId,
          shopName: bookingData.shopName,
          shopPhone: shopPhoneClean,
          customerName: bookingData.customerName,
          customerPhone: custPhoneClean,
          customerEmail: custEmailClean,
          customerId: bookingData.customerId,
          serviceName: bookingData.serviceName,
          vehicleNumber: bookingData.vehicleNumber,
        }
      });

      // 🔔 2. Send confirmation to the Customer (Locked to Mobile & Email)
      const targetCustRecipient = custPhoneClean ? `phone_${custPhoneClean}` : (custEmailClean || user?.uid || "guest_cust");

      sendInAppNotification({
        recipientId: targetCustRecipient,
        recipientRole: "customer",
        title: `✅ Booking Confirmed`,
        message: `Aapki "${bookingData.serviceName}" booking at "${bookingData.shopName}" receive ho gayi hai. Shop owner se confirmation yahan update hoga.`,
        type: "booking_created",
        link: "/bookings",
        data: {
          bookingId: finalBookingId,
          shopId: bookingData.shopId,
          shopName: bookingData.shopName,
          shopPhone: shopPhoneClean,
          customerId: user?.uid || targetCustRecipient,
          customerPhone: custPhoneClean,
          customerEmail: custEmailClean,
          customerName: bookingData.customerName,
          serviceName: bookingData.serviceName,
        }
      });

      setLoading(false);
      setModalOpen(false);
      triggerHaptic("success");
      scheduleServiceReminder({
        title: "TyreSaathi Service Scheduled! 🚗",
        body: `Booking for ${bookingData.vehicleNumber} at ${bookingData.shopName || "Tyre Hub"} has been registered.`,
        scheduleInSeconds: 5,
      });
      showNativeToast("✅ Booking Submitted Successfully!");
      alert("✅ Aapki Booking Shop Owner ko bhej di gayi hai! Dukan se call ya approval status yahan dikhega.");
    }
  };

  // Filter bookings based on role:
  // - Admin: Master view (all bookings)
  // - Shop Owner: STRICTLY bookings for their own registered shop OR their personal bookings
  // - Customer: STRICTLY their own bookings (matching UID, email, or verified phone)
  const visibleBookings = bookings.filter((b) => {
    if (isAdmin) return true;

    const myUid = user?.uid;
    const myEmail = (user?.email || "").toLowerCase().trim();
    const myPhone = (profile?.phone || user?.phoneNumber || "").replace(/[^0-9]/g, "").slice(-10);

    const bCustId = b?.customerId || b?.userId;
    const bCustEmail = (b?.customerEmail || "").toLowerCase().trim();
    const bCustPhone = (b?.customerPhone || "").replace(/[^0-9]/g, "").slice(-10);

    const isMyCustomerBooking = 
      Boolean(myUid && bCustId && bCustId === myUid) ||
      Boolean(myEmail && bCustEmail && bCustEmail === myEmail) ||
      Boolean(myPhone && bCustPhone && myPhone === bCustPhone);

    if (isVendor || isShopOwner) {
      const myShopName = (profile?.shopName || "").toLowerCase().trim();
      const bShopId = b?.shopId;
      const bShopName = (b?.shopName || "").toLowerCase().trim();
      const bShopPhone = (b?.shopPhone || "").replace(/[^0-9]/g, "").slice(-10);

      const isForMyShop = 
        Boolean(bShopId && myUid && bShopId === myUid) ||
        Boolean(myPhone && bShopPhone && myPhone === bShopPhone) ||
        Boolean(myShopName && bShopName && (bShopName === myShopName || bShopName.includes(myShopName) || myShopName.includes(bShopName)));

      return isForMyShop || isMyCustomerBooking;
    }

    // Regular customer / New user
    // Strictly isolate: If user has no match, never leak other users' bookings!
    if (!user && !myPhone) return false;

    return isMyCustomerBooking;
  });

  const filteredBookings = visibleBookings.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "rejected") return b.status === "rejected" || b.status === "cancelled";
    return b.status === activeTab;
  });

  const counts = {
    all: visibleBookings.length,
    pending: visibleBookings.filter((b) => b.status === "pending").length,
    accepted: visibleBookings.filter((b) => b.status === "accepted").length,
    in_progress: visibleBookings.filter((b) => b.status === "in_progress").length,
    completed: visibleBookings.filter((b) => b.status === "completed").length,
    rejected: visibleBookings.filter((b) => b.status === "rejected" || b.status === "cancelled").length,
  };

  return (
    <div className="bookings-page-container">
      {/* 📅 Top Page Header */}
      <div className="bookings-header-row">
        <div className="bookings-header-text">
          <h1 className="page-heading">
            {isVendor || isAdmin ? "📅 Customer Service Bookings" : "📅 My Service Appointments"}
          </h1>
          <p className="page-sub">
            {isVendor || isAdmin ? "Manage, accept or complete appointment tickets" : "Track your tyre service appointments"}
          </p>
        </div>

        <div className="header-actions-group">
          {(isVendor || isAdmin) && (
            <>
              <Link
                to="/analytics"
                className="btn-header-action-compact btn-insights"
                title="Shop Insights"
              >
                <BarChart3 size={14} /> Insights
              </Link>

              <button
                type="button"
                className="btn-header-action-compact btn-excel"
                onClick={() => exportBookingsToExcel(filteredBookings)}
                title="Export Bookings to Excel (.csv)"
              >
                <Download size={14} /> Excel
              </button>
            </>
          )}

          <button className="btn-header-new-booking" onClick={() => setModalOpen(true)}>
            <Plus size={15} /> New Booking (नई बुकिंग)
          </button>
        </div>
      </div>

      {/* 🏷️ Filter Tabs (Horizontal Scrollable Chips) */}
      <div className="booking-filter-tabs">
        <button
          className={`filter-tab ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All ({counts.all})
        </button>
        <button
          className={`filter-tab ${activeTab === "pending" ? "tab-active tab-pending" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          ⏳ Pending ({counts.pending})
        </button>
        <button
          className={`filter-tab ${activeTab === "accepted" ? "tab-active tab-accepted" : ""}`}
          onClick={() => setActiveTab("accepted")}
        >
          ✅ Accepted ({counts.accepted})
        </button>
        <button
          className={`filter-tab ${activeTab === "in_progress" ? "tab-active tab-inprogress" : ""}`}
          onClick={() => setActiveTab("in_progress")}
        >
          🔧 In Progress ({counts.in_progress})
        </button>
        <button
          className={`filter-tab ${activeTab === "completed" ? "tab-active tab-completed" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          🎉 Done ({counts.completed})
        </button>
        <button
          className={`filter-tab ${activeTab === "rejected" ? "tab-active tab-rejected" : ""}`}
          onClick={() => setActiveTab("rejected")}
        >
          ❌ Rejected ({counts.rejected})
        </button>
      </div>

      {/* 📋 Dynamic Responsive Bookings List Grid */}
      <div className="bookings-list-grid">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings-card">
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "#fef2f2",
              border: "1px solid #fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c0392b",
              boxShadow: "0 4px 12px rgba(192, 57, 43, 0.08)"
            }}>
              <Calendar size={26} />
            </div>
            <h3>No Bookings in this status</h3>
            <p>Abhi is filter me koi booking nahi hai. Aap "New Booking" button dabakar direct booking bana sakte hain.</p>
            <button
              className="btn-header-new-booking"
              style={{ marginTop: "4px" }}
              onClick={() => setModalOpen(true)}
            >
              <Plus size={15} /> New Booking (नई बुकिंग)
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div key={b.id} className={`booking-item-card status-border-${b.status}`}>
              {/* Top Row: Service Title, Vehicle Tag & Status Badge */}
              <div className="booking-card-top">
                <div className="service-info-group">
                  <span className="service-icon-circle">
                    <Wrench size={16} />
                  </span>
                  <div className="service-title-wrap">
                    <h3 className="booking-service-title">{b.serviceName}</h3>
                    <span className="booking-vehicle-tag">
                      <Car size={12} /> {b.vehicleType} • <strong style={{ whiteSpace: "nowrap" }}>{b.vehicleNumber}</strong>
                    </span>
                  </div>
                </div>

                <div className="booking-status-badge-wrap">
                  {b.status === "pending" && (
                    <span className="status-badge badge-pending">⏳ Pending</span>
                  )}
                  {b.status === "accepted" && (
                    <span className="status-badge badge-accepted">✅ Accepted</span>
                  )}
                  {b.status === "rejected" && (
                    <span className="status-badge badge-rejected">❌ Rejected</span>
                  )}
                  {b.status === "in_progress" && (
                    <span className="status-badge badge-inprogress">🔧 In Progress</span>
                  )}
                  {b.status === "completed" && (
                    <span className="status-badge badge-completed">🎉 Completed</span>
                  )}
                  <span className="booking-id-tag">#{b.id.slice(-6)}</span>
                </div>
              </div>

              {/* Middle Dynamic Info Box */}
              <div className="booking-meta-box">
                {/* 2-Column Details: Customer vs Shop */}
                <div className="booking-meta-2col">
                  <div className="meta-block">
                    <span className="meta-label">👤 CUSTOMER:</span>
                    <span className="meta-value">{b.customerName}</span>
                    {b.customerPhone && (
                      <a href={`tel:${b.customerPhone}`} className="meta-phone-link">
                        <Phone size={11} /> {b.customerPhone}
                      </a>
                    )}
                  </div>

                  <div className="meta-block">
                    <span className="meta-label">🏪 SERVICE SHOP:</span>
                    <span className="meta-value">{b.shopName}</span>
                    <span className="meta-subtext">{b.shopPhone ? `📞 ${b.shopPhone}` : "✓ Verified Hub"}</span>
                  </div>
                </div>

                {/* Date & Slot Strip */}
                <div className="booking-slot-strip">
                  <span className="slot-date-item">
                    <Calendar size={12} /> {b.date}
                  </span>
                  <span className="slot-divider">•</span>
                  <span className="slot-time-item">
                    ⏰ {b.timeSlot}
                  </span>
                </div>

                {/* Direct Action Contact Pills (Full Width Row - No Clipping!) */}
                <div className="quick-contact-pills-row">
                  {isShopManager(b) ? (
                    b.customerPhone && (
                      <>
                        <a
                          href={`tel:${b.customerPhone}`}
                          className="btn-action-call-pill"
                          title={`Call Customer (${b.customerName})`}
                        >
                          <Phone size={12} /> Call Customer
                        </a>
                        <a
                          href={`https://wa.me/91${b.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${b.customerName}, TyreSaathi par aapki booking (${b.serviceName}) ke regarding...`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-action-whatsapp-pill"
                          title="Chat on WhatsApp"
                        >
                          💬 WhatsApp
                        </a>
                      </>
                    )
                  ) : (
                    b.shopPhone && (
                      <>
                        <a
                          href={`tel:${b.shopPhone}`}
                          className="btn-action-call-pill"
                          title={`Call Shop (${b.shopName})`}
                        >
                          <Phone size={12} /> Call Shop
                        </a>
                        <a
                          href={`https://wa.me/91${b.shopPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${b.shopName}, TyreSaathi par meri service booking (#${b.id.slice(-6)}) ke regarding...`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-action-whatsapp-pill"
                          title="Chat with Shop on WhatsApp"
                        >
                          💬 WhatsApp
                        </a>
                      </>
                    )
                  )}
                </div>
              </div>

              {b.notes && (
                <div className="booking-notes-box">
                  <strong>Note:</strong> "{b.notes}"
                </div>
              )}

              {/* Bottom Row: Work & Invoice Actions (Responsive 2-Button Grid for All States) */}
              <div className="booking-card-actions">
                {isShopManager(b) ? (
                  <div className="shop-bottom-cta-grid">
                    {b.status === "pending" && (
                      <>
                        <button
                          className="btn-action-reject"
                          onClick={() => handleUpdateStatus(b.id, "rejected")}
                        >
                          <XCircle size={13} /> Reject
                        </button>
                        <button
                          className="btn-action-accept"
                          onClick={() => handleUpdateStatus(b.id, "accepted")}
                        >
                          <CheckCircle2 size={13} /> Accept
                        </button>
                      </>
                    )}

                    {b.status === "accepted" && (
                      <>
                        <button
                          className="btn-action-progress"
                          onClick={() => handleUpdateStatus(b.id, "in_progress")}
                        >
                          <Wrench size={13} /> Start Service
                        </button>
                        <Link
                          to={`/billing?customer=${encodeURIComponent(b.customerName)}&phone=${encodeURIComponent(b.customerPhone)}&vehicle=${encodeURIComponent(b.vehicleType)}&vehicleNo=${encodeURIComponent(b.vehicleNumber)}&service=${encodeURIComponent(b.serviceName)}`}
                          className="btn-action-bill-shortcut"
                          title="Generate Bill for this Service"
                        >
                          <Receipt size={13} /> 🧾 Bill Banayein
                        </Link>
                      </>
                    )}

                    {b.status === "in_progress" && (
                      <>
                        <button
                          className="btn-action-complete"
                          onClick={() => handleUpdateStatus(b.id, "completed")}
                        >
                          <CheckCircle2 size={13} /> Mark Done
                        </button>
                        <Link
                          to={`/billing?customer=${encodeURIComponent(b.customerName)}&phone=${encodeURIComponent(b.customerPhone)}&vehicle=${encodeURIComponent(b.vehicleType)}&vehicleNo=${encodeURIComponent(b.vehicleNumber)}&service=${encodeURIComponent(b.serviceName)}`}
                          className="btn-action-bill-shortcut"
                          title="Generate Bill for this Service"
                        >
                          <Receipt size={13} /> 🧾 Bill Banayein
                        </Link>
                      </>
                    )}

                    {b.status === "completed" && (
                      <>
                        <span className="btn-action-done-badge">
                          <CheckCircle2 size={13} /> Completed ✓
                        </span>
                        <Link
                          to={`/billing?customer=${encodeURIComponent(b.customerName)}&phone=${encodeURIComponent(b.customerPhone)}&vehicle=${encodeURIComponent(b.vehicleType)}&vehicleNo=${encodeURIComponent(b.vehicleNumber)}&service=${encodeURIComponent(b.serviceName)}`}
                          className="btn-action-bill-shortcut"
                          title="Generate Bill for this Service"
                        >
                          <Receipt size={13} /> 🧾 Bill Banayein
                        </Link>
                      </>
                    )}

                    {(b.status === "rejected" || b.status === "cancelled") && (
                      <>
                        <span className="btn-action-rejected-badge">
                          <XCircle size={13} /> Cancelled
                        </span>
                        {b.customerPhone ? (
                          <a
                            href={`tel:${b.customerPhone}`}
                            className="btn-action-call-pill"
                            style={{ height: "34px" }}
                          >
                            <Phone size={12} /> Call Customer
                          </a>
                        ) : (
                          <span className="btn-action-done-badge" style={{ background: "#f1f5f9", color: "#64748b", borderColor: "#cbd5e1" }}>
                            Closed
                          </span>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  b.status === "pending" && (
                    <button
                      className="btn-action-reject full-width"
                      onClick={() => {
                        if (window.confirm("Kya aap sach me ye booking cancel karna chahte hain?")) {
                          handleUpdateStatus(b.id, "cancelled");
                        }
                      }}
                    >
                      <XCircle size={13} /> Cancel Booking
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🌟 New Booking Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">🛠️ Book a Tyre Service (सर्विस बुक करें)</h3>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="modal-form">
              <div className="modal-field">
                <label>Choose Service (सर्विस चुनें) *</label>
                <select
                  value={newBooking.serviceId}
                  onChange={(e) => {
                    const s = SERVICE_TYPES.find((x) => x.id === e.target.value);
                    setNewBooking({
                      ...newBooking,
                      serviceId: e.target.value,
                      serviceName: s ? s.name : e.target.value,
                    });
                  }}
                >
                  {SERVICE_TYPES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-field">
                <label>Choose Preferred Shop (दुकान चुनें) *</label>
                <select
                  value={newBooking.shopId}
                  onChange={(e) => {
                    const shop = availableShops.find((x) => x.id === e.target.value);
                    setNewBooking({
                      ...newBooking,
                      shopId: e.target.value,
                      shopName: shop ? shop.name : "TyreSaathi Shop",
                      shopPhone: shop?.phone || "",
                    });
                  }}
                >
                  {availableShops.map((shop) => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name} {shop.city ? `(📍 ${shop.city})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Aapka Naam (Customer Name) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={newBooking.customerName}
                    onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                  />
                </div>

                <div className="modal-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10 digit mobile number"
                    value={newBooking.customerPhone}
                    onChange={(e) => setNewBooking({ ...newBooking, customerPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Vehicle Type *</label>
                  <select
                    value={newBooking.vehicleType}
                    onChange={(e) => setNewBooking({ ...newBooking, vehicleType: e.target.value })}
                  >
                    <option>Car / SUV</option>
                    <option>Motorcycle / Bike</option>
                    <option>Scooter / Activa</option>
                    <option>Commercial Truck / Bus</option>
                    <option>Auto Rickshaw</option>
                    <option>Tractor</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Vehicle Number (गाड़ी का नंबर) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DL 01 AB 1234"
                    value={newBooking.vehicleNumber}
                    onChange={(e) => setNewBooking({ ...newBooking, vehicleNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Booking Date *</label>
                  <input
                    type="date"
                    required
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                  />
                </div>

                <div className="modal-field">
                  <label>Preferred Time Slot *</label>
                  <select
                    value={newBooking.timeSlot}
                    onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                  >
                    <option>09:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>01:00 PM - 02:00 PM</option>
                    <option>03:00 PM - 04:00 PM</option>
                    <option>05:00 PM - 06:00 PM</option>
                    <option>07:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="modal-field">
                <label>Problem Notes / Special Request</label>
                <textarea
                  rows={2}
                  placeholder="Tell shop about tyre condition or location..."
                  value={newBooking.notes}
                  onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-booking" disabled={loading}>
                  {loading ? "Sending..." : "🚀 Confirm Booking (बुक करें)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Responsive Styling */}
      <style>{`
        .bookings-page-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 8px 0 80px;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .bookings-page-container {
            padding: 10px 0 90px;
          }
        }

        .bookings-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .bookings-header-text {
          min-width: 0;
          flex: 1;
        }

        .page-heading {
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.4px;
        }

        .page-sub {
          font-size: 0.95rem;
          color: #64748b;
          margin: 4px 0 0 0;
          line-height: 1.45;
        }

        .header-actions-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-header-action-compact {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 15px;
          border-radius: 9px;
          font-size: 0.88rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          white-space: nowrap;
        }
        .btn-insights {
          background: #eff6ff;
          border: 1.2px solid #bfdbfe;
          color: #1d4ed8;
        }
        .btn-insights:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }

        .btn-excel {
          background: #ecfdf5;
          border: 1.2px solid #a7f3d0;
          color: #047857;
        }
        .btn-excel:hover {
          background: #d1fae5;
          transform: translateY(-1px);
        }

        .btn-header-new-booking {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          border: none;
          padding: 10px 18px;
          border-radius: 9px;
          font-size: 0.92rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.28);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-header-new-booking:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(192, 57, 43, 0.38);
        }

        /* 🏷️ Clean Horizontal Filter Chips */
        .booking-filter-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 2px 2px 14px 2px;
          margin-bottom: 20px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .booking-filter-tabs::-webkit-scrollbar {
          display: none;
        }

        .filter-tab {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .filter-tab:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #0f172a;
        }
        .tab-active {
          background: #0f172a !important;
          color: #ffffff !important;
          border-color: #0f172a !important;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2) !important;
        }
        .tab-pending.tab-active {
          background: #d97706 !important;
          color: #ffffff !important;
          border-color: #d97706 !important;
        }
        .tab-accepted.tab-active {
          background: #16a34a !important;
          color: #ffffff !important;
          border-color: #16a34a !important;
        }
        .tab-inprogress.tab-active {
          background: #7c3aed !important;
          color: #ffffff !important;
          border-color: #7c3aed !important;
        }
        .tab-completed.tab-active {
          background: #0284c7 !important;
          color: #ffffff !important;
          border-color: #0284c7 !important;
        }
        .tab-rejected.tab-active {
          background: #dc2626 !important;
          color: #ffffff !important;
          border-color: #dc2626 !important;
        }

        /* 📋 Dynamic Responsive Grid (Auto-fits comfortably on all devices) */
        .bookings-list-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          width: 100%;
        }

        @media (min-width: 680px) {
          .bookings-list-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }

        @media (min-width: 1100px) {
          .bookings-list-grid {
            grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
            gap: 22px;
          }
        }

        .no-bookings-card {
          grid-column: 1 / -1;
          text-align: center;
          padding: 44px 20px;
          background: #ffffff;
          border: 1.5px dashed #cbd5e1;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .no-bookings-card h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .no-bookings-card p {
          font-size: 0.92rem;
          color: #64748b;
          margin: 0;
          max-width: 440px;
        }

        /* 📦 Dynamic Fluid Booking Card */
        .booking-item-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-left: 5px solid #c0392b;
          border-radius: 14px;
          padding: clamp(14px, 2.5vw, 20px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          box-sizing: border-box;
        }
        .booking-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .status-border-pending { border-left-color: #f59e0b; }
        .status-border-accepted { border-left-color: #10b981; }
        .status-border-in_progress { border-left-color: #7c3aed; }
        .status-border-completed { border-left-color: #0284c7; }
        .status-border-rejected { border-left-color: #ef4444; }

        /* Card Top Header */
        .booking-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .service-info-group {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          flex: 1;
        }

        .service-icon-circle {
          width: 38px;
          height: 38px;
          background: #fef2f2;
          color: #c0392b;
          border: 1px solid #fee2e2;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-title-wrap {
          min-width: 0;
          flex: 1;
        }

        .booking-service-title {
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
          word-break: break-word;
        }

        .booking-vehicle-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.85rem;
          color: #64748b;
          margin-top: 3px;
          word-break: break-word;
        }
        .booking-vehicle-tag strong {
          color: #0f172a;
        }

        .booking-status-badge-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          flex-shrink: 0;
        }

        .status-badge {
          font-size: 0.8rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 12px;
          white-space: nowrap;
        }
        .badge-pending { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
        .badge-accepted { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
        .badge-inprogress { background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; }
        .badge-completed { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
        .badge-rejected { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

        .booking-id-tag {
          font-size: 10.5px;
          color: #94a3b8;
          font-weight: 700;
          background: #f8fafc;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #e2e8f0;
        }

        /* 📋 Meta Details Box (Clean & Dynamic) */
        .booking-meta-box {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          padding: 12px 14px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .booking-meta-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .meta-block {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .meta-label {
          font-size: 9.5px;
          color: #64748b;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25px;
        }

        .meta-value {
          font-size: clamp(11.5px, 2.5vw, 13px);
          font-weight: 800;
          color: #0f172a;
          word-break: break-word;
        }

        .meta-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0284c7;
          font-size: clamp(11px, 2.2vw, 12px);
          font-weight: 700;
          text-decoration: none;
          margin-top: 1px;
        }
        .meta-phone-link:hover { text-decoration: underline; }

        .meta-subtext {
          font-size: clamp(10.5px, 2.2vw, 12px);
          color: #64748b;
          margin-top: 1px;
        }

        /* Slot Strip */
        .booking-slot-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 5px 9px;
          border-radius: 6px;
          font-size: clamp(11px, 2.2vw, 12px);
          font-weight: 700;
          color: #334155;
          flex-wrap: wrap;
        }

        .slot-date-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0f172a;
        }

        .slot-divider {
          color: #cbd5e1;
        }

        .slot-time-item {
          color: #475569;
        }

        /* Full Width Quick Contact Row (50% - 50% split, never clips!) */
        .quick-contact-pills-row {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .btn-action-call-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: #f0fdf4;
          color: #15803d;
          border: 1.2px solid #bbf7d0;
          padding: 6px 10px;
          border-radius: 7px;
          font-size: clamp(11px, 2.2vw, 12px);
          font-weight: 700;
          text-decoration: none;
          flex: 1;
          text-align: center;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .btn-action-call-pill:hover {
          background: #dcfce7;
        }

        .btn-action-whatsapp-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          background: #f0fdf4;
          color: #16a34a;
          border: 1.2px solid #bbf7d0;
          padding: 6px 10px;
          border-radius: 7px;
          font-size: clamp(11px, 2.2vw, 12px);
          font-weight: 700;
          text-decoration: none;
          flex: 1;
          text-align: center;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .btn-action-whatsapp-pill:hover {
          background: #dcfce7;
        }

        .booking-notes-box {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          padding: 6px 10px;
          border-radius: 7px;
          font-size: 11.5px;
          color: #92400e;
        }

        /* Bottom Action Buttons (Responsive & Full visibility) */
        .booking-card-actions {
          padding-top: 8px;
          border-top: 1px solid #f1f5f9;
        }

        .shop-bottom-cta-grid {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .btn-action-accept,
        .btn-action-reject,
        .btn-action-progress,
        .btn-action-complete,
        .btn-action-bill-shortcut {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: clamp(11.5px, 2.5vw, 13px);
          font-weight: 800;
          flex: 1;
          min-width: 0;
          text-align: center;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
          box-sizing: border-box;
        }

        .btn-action-accept {
          background: #16a34a;
          color: #ffffff;
          border: none;
        }
        .btn-action-accept:hover { background: #15803d; }

        .btn-action-reject {
          background: #fee2e2;
          border: 1.2px solid #fecaca;
          color: #b91c1c;
        }
        .btn-action-reject:hover { background: #fecaca; }

        .btn-action-reject.full-width {
          width: 100%;
          flex: 1;
        }

        .btn-action-progress {
          background: #7c3aed;
          color: #ffffff;
          border: none;
        }
        .btn-action-progress:hover { background: #6d28d9; }

        .btn-action-complete {
          background: #0284c7;
          color: #ffffff;
          border: none;
        }
        .btn-action-complete:hover { background: #0369a1; }

        .btn-action-bill-shortcut {
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          text-decoration: none;
          border: none;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.25);
        }
        .btn-action-bill-shortcut:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }

        .btn-action-done-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: clamp(11.5px, 2.5vw, 13px);
          font-weight: 800;
          flex: 1;
          min-width: 0;
          text-align: center;
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
          box-sizing: border-box;
          white-space: nowrap;
        }

        .btn-action-rejected-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: clamp(11.5px, 2.5vw, 13px);
          font-weight: 800;
          flex: 1;
          min-width: 0;
          text-align: center;
          background: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          box-sizing: border-box;
          white-space: nowrap;
        }

        /* 🪟 Clean Modal Styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 16px;
        }

        .modal-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          max-width: 540px;
          width: 100%;
          padding: clamp(16px, 4vw, 24px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          font-size: clamp(15px, 3.5vw, 18px);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .modal-close-btn {
          background: #f1f5f9;
          border: none;
          color: #64748b;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .modal-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-field label {
          font-size: 12px;
          font-weight: 700;
          color: #334155;
        }

        .modal-field input, .modal-field select, .modal-field textarea {
          background: #f8fafc;
          border: 1.2px solid #e2e8f0;
          border-radius: 8px;
          padding: 9px 12px;
          color: #0f172a;
          font-size: 13px;
          outline: none;
          transition: all 0.2s;
        }
        .modal-field input:focus, .modal-field select:focus, .modal-field textarea:focus {
          border-color: #c0392b;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.1);
        }

        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .btn-cancel {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-cancel:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .btn-submit-booking {
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(192, 57, 43, 0.28);
        }
        .btn-submit-booking:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(192, 57, 43, 0.38);
        }

        @media (max-width: 640px) {
          .bookings-page-container {
            padding: 4px 0 70px;
          }
          .bookings-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .header-actions-group {
            width: 100%;
          }
          .btn-header-new-booking {
            flex: 1;
            justify-content: center;
          }
          .booking-item-card {
            padding: 14px 14px;
            gap: 10px;
          }
          .btn-action-accept,
          .btn-action-reject,
          .btn-action-progress,
          .btn-action-complete,
          .btn-action-bill-shortcut,
          .btn-action-done-badge,
          .btn-action-rejected-badge {
            padding: 8px 8px;
            font-size: 12px;
          }
          .modal-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
