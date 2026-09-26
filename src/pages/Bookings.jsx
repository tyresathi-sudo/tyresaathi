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
import { SERVICE_TYPES, SAMPLE_SHOPS } from "../config/tyreCatalog";
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
  const [availableShops, setAvailableShops] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(Boolean(paramOpen || paramShopName));
  const [loading, setLoading] = useState(false);

  // Helper to determine if current logged-in user is the shop owner for this booking
  const isShopManager = (b) => {
    if (isAdmin) return true;
    if (!isVendor && !isShopOwner) return false;
    
    const myUid = user?.uid;
    const myShopName = (profile?.shopName || "").toLowerCase().trim();
    const bShopId = b?.shopId;
    const bShopName = (b?.shopName || "").toLowerCase().trim();
    
    return (
      (bShopId && bShopId === myUid) ||
      (myShopName && bShopName && (bShopName.includes(myShopName) || myShopName.includes(bShopName)))
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
            const formatted = vendorDocs.map((v) => ({
              id: v.id || v.uid,
              name: v.shopName || v.name,
              phone: v.phone || "8877277757",
              city: v.city || (v.address ? v.address.split(",").slice(-2)[0]?.trim() : "") || "Authorized Location",
              address: v.address || (v.city ? `${v.city}, India` : "TyreSaathi Partner Hub"),
              services: v.services || ["Tyre Replacement & Fitting", "Tubeless Puncture Repair", "Tyre Cut Repair", "Nitrogen Air Fill"],
              rating: 4.9,
              reviewsCount: 24
            }));
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
        console.warn("Could not load real shops from Firestore:", e);
      }
    }
    loadRealShops();
  }, []);

  // New Booking Form State
  const [newBooking, setNewBooking] = useState({
    serviceId: paramService || SERVICE_TYPES[0]?.id || "puncture",
    serviceName: paramService ? (SERVICE_TYPES.find(s => s.id === paramService)?.name || paramService) : (SERVICE_TYPES[0]?.name || "Tubeless Puncture Repair"),
    shopId: paramShopId || "",
    shopName: paramShopName || profile?.shopName || "TyreSaathi Partner Hub",
    shopPhone: paramShopPhone || profile?.phone || "",
    customerName: profile?.name || "",
    customerPhone: profile?.phone || "",
    vehicleType: "Car / SUV",
    vehicleNumber: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM - 11:00 AM",
    notes: "",
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

  // Fetch real bookings from Firestore if available
  useEffect(() => {
    async function loadBookings() {
      try {
        const snap = await getDocs(collection(db, "bookings"));
        if (!snap.empty) {
          const fetched = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setBookings(fetched);
        } else {
          const local = localStorage.getItem("tyresaathi_user_bookings");
          if (local) setBookings(JSON.parse(local));
          else setBookings([]);
        }
      } catch (e) {
        console.warn("Using local bookings state:", e);
        const local = localStorage.getItem("tyresaathi_user_bookings");
        if (local) setBookings(JSON.parse(local));
        else setBookings([]);
      }
    }
    loadBookings();
  }, []);

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

        // 🔔 Send in-app notification to Customer
        sendInAppNotification({
          recipientId: existing.customerId || "all",
          recipientRole: "customer",
          title: `🔄 Booking Status Update: ${newStatus.toUpperCase()}`,
          message: `Aapki "${existing.serviceName || 'Tyre Service'}" booking at "${existing.shopName || 'Shop'}" ka status ab "${newStatus}" ho gaya hai.`,
          type: "booking_status",
          link: "/bookings",
          data: {
            bookingId,
            status: newStatus,
            shopName: existing.shopName,
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
      customerEmail: user?.email || "customer@tyresaathi.com",
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
    } finally {
      // 🔔 1. Notify the Shop Owner in real-time
      sendInAppNotification({
        recipientId: bookingData.shopId || "all",
        recipientRole: "shop_owner",
        title: `📅 Nayi Service Booking Aayi!`,
        message: `${bookingData.customerName} (${bookingData.customerPhone}) ne "${bookingData.serviceName}" (${bookingData.vehicleNumber}) ke liye booking ki hai.`,
        type: "booking_created",
        link: "/bookings",
        data: {
          bookingId: finalBookingId,
          shopId: bookingData.shopId,
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone,
          serviceName: bookingData.serviceName,
          vehicleNumber: bookingData.vehicleNumber,
        }
      });

      // 🔔 2. Send confirmation to the Customer
      sendInAppNotification({
        recipientId: user?.uid || "guest_cust",
        recipientRole: "customer",
        title: `✅ Booking Confirmed`,
        message: `Aapki "${bookingData.serviceName}" booking at "${bookingData.shopName}" receive ho gayi hai. Shop owner se confirmation yahan update hoga.`,
        type: "booking_created",
        link: "/bookings",
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
  // - Admin: All bookings
  // - Shop Owner: Bookings for their shop + their own bookings
  // - Customer: Only their own bookings
  const visibleBookings = bookings.filter((b) => {
    if (isAdmin) return true;
    if (isVendor || isShopOwner) {
      const myUid = user?.uid;
      const myShopName = (profile?.shopName || "").toLowerCase().trim();
      const bShopId = b?.shopId;
      const bShopName = (b?.shopName || "").toLowerCase().trim();
      const isForMyShop = (bShopId && bShopId === myUid) || 
                          (myShopName && bShopName && (bShopName.includes(myShopName) || myShopName.includes(bShopName)));
      const isMyCustomerBooking = b.customerId === user?.uid || b.customerEmail === user?.email;
      return isForMyShop || isMyCustomerBooking;
    }
    // Regular customer
    return b.customerId === user?.uid || b.customerEmail === user?.email || (profile?.phone && b.customerPhone === profile?.phone);
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
        <div>
          <h1 className="page-heading">📅 Customer Service Bookings</h1>
          <p className="page-sub">Manage, accept or complete appointment tickets</p>
        </div>

        <div className="header-actions-group">
          <Link
            to="/analytics"
            className="btn-header-insights"
            title="View Business Insights & Views Analytics"
          >
            <BarChart3 size={15} /> 📊 Shop Insights
          </Link>

          <button
            type="button"
            className="btn-header-excel"
            onClick={() => exportBookingsToExcel(filteredBookings)}
            title="Download Bookings as Excel Sheet (.csv)"
          >
            <Download size={15} /> 📥 Export to Excel
          </button>

          <button className="btn-header-new-booking" onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Book New Service (नई बुकिंग)
          </button>
        </div>
      </div>

      {/* 🏷️ Filter Tabs (As in Image 2) */}
      <div className="booking-filter-tabs">
        <button
          className={`filter-tab ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Bookings ({counts.all})
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
          🎉 Completed ({counts.completed})
        </button>
        <button
          className={`filter-tab ${activeTab === "rejected" ? "tab-active tab-rejected" : ""}`}
          onClick={() => setActiveTab("rejected")}
        >
          ❌ Rejected ({counts.rejected})
        </button>
      </div>

      {/* 📋 Bookings List Grid */}
      <div className="bookings-list-grid">
        {filteredBookings.length === 0 ? (
          <div className="no-bookings-card">
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#fef2f2",
              border: "1px solid #fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c0392b",
              boxShadow: "0 4px 12px rgba(192, 57, 43, 0.1)"
            }}>
              <Calendar size={28} />
            </div>
            <h3>No Bookings in this status</h3>
            <p>Abhi is filter me koi booking nahi hai. Aap "Book New Service" button dabakar direct nayi booking bana sakte hain.</p>
            <button
              className="btn-header-new-booking"
              style={{ marginTop: "6px" }}
              onClick={() => setModalOpen(true)}
            >
              <Plus size={15} /> Book New Service (नई बुकिंग)
            </button>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div key={b.id} className={`booking-item-card status-border-${b.status}`}>
              {/* Top Row: Service Title & Status Badge */}
              <div className="booking-card-top">
                <div className="service-info-group">
                  <span className="service-icon-circle">
                    <Wrench size={18} />
                  </span>
                  <div>
                    <h3 className="booking-service-title">{b.serviceName}</h3>
                    <span className="booking-vehicle-tag">
                      <Car size={13} /> {b.vehicleType} • <strong>{b.vehicleNumber}</strong>
                    </span>
                  </div>
                </div>

                <div className="booking-status-badge-wrap">
                  {b.status === "pending" && (
                    <span className="status-badge badge-pending">⏳ Awaiting Response</span>
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
                </div>
              </div>

              {/* Middle Row: Customer Details & Shop Location */}
              <div className="booking-meta-grid">
                <div className="meta-block">
                  <span className="meta-label">👤 Customer Details:</span>
                  <span className="meta-value">{b.customerName}</span>
                  <a href={`tel:${b.customerPhone}`} className="meta-phone-link">
                    <Phone size={12} /> {b.customerPhone}
                  </a>
                </div>

                <div className="meta-block">
                  <span className="meta-label">🏪 Service Shop:</span>
                  <span className="meta-value">{b.shopName}</span>
                  <span className="meta-subtext">{b.shopPhone ? `📞 ${b.shopPhone}` : "✓ Verified TyreSaathi Hub"}</span>
                </div>

                <div className="meta-block">
                  <span className="meta-label">⏰ Date & Time Slot:</span>
                  <span className="meta-value">{b.date}</span>
                  <span className="meta-subtext">{b.timeSlot}</span>
                </div>
              </div>

              {b.notes && (
                <div className="booking-notes-box">
                  <strong>Customer Note:</strong> "{b.notes}"
                </div>
              )}

              {/* Bottom Row: Action Buttons */}
              <div className="booking-card-actions">
                <div className="action-left-info">
                  <span className="time-ago-text">Booking ID: #{b.id.slice(-6)}</span>
                  {!isShopManager(b) && (
                    <span style={{ fontSize: "11px", color: "#64748b", marginLeft: "8px", fontWeight: "600" }}>
                      (Aapki Booking)
                    </span>
                  )}
                </div>

                <div className="action-buttons-group">
                  {isShopManager(b) ? (
                    // =================== 🏪 SHOP OWNER / ADMIN ACTIONS ===================
                    <>
                      {b.status === "pending" && (
                        <>
                          <button
                            className="btn-action-reject"
                            onClick={() => handleUpdateStatus(b.id, "rejected")}
                          >
                            <XCircle size={14} /> Reject (अस्वीकार करें)
                          </button>
                          <button
                            className="btn-action-accept"
                            onClick={() => handleUpdateStatus(b.id, "accepted")}
                          >
                            <CheckCircle2 size={14} /> Accept (स्वीकार करें)
                          </button>
                        </>
                      )}

                      {b.status === "accepted" && (
                        <button
                          className="btn-action-progress"
                          onClick={() => handleUpdateStatus(b.id, "in_progress")}
                        >
                          <Wrench size={14} /> Start Service (काम शुरू करें)
                        </button>
                      )}

                      {b.status === "in_progress" && (
                        <button
                          className="btn-action-complete"
                          onClick={() => handleUpdateStatus(b.id, "completed")}
                        >
                          <CheckCircle2 size={14} /> Mark Completed (पूरा हुआ)
                        </button>
                      )}

                      {b.customerPhone && (
                        <>
                          <a
                            href={`tel:${b.customerPhone}`}
                            className="btn-action-call"
                            title={`Call Customer (${b.customerName})`}
                          >
                            <Phone size={13} /> Call ({b.customerPhone})
                          </a>

                          <a
                            href={`https://wa.me/91${b.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${b.customerName}, TyreSaathi par aapki booking (${b.serviceName}) ke regarding...`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-action-whatsapp"
                            title="Chat on WhatsApp"
                          >
                            💬 WhatsApp
                          </a>
                        </>
                      )}

                      <Link
                        to={`/billing?customer=${encodeURIComponent(b.customerName)}&phone=${encodeURIComponent(b.customerPhone)}&vehicle=${encodeURIComponent(b.vehicleType)}&vehicleNo=${encodeURIComponent(b.vehicleNumber)}&service=${encodeURIComponent(b.serviceName)}`}
                        className="btn-action-bill-shortcut"
                        title="Generate Bill for this Service"
                      >
                        <Receipt size={13} /> 🧾 Bill Banayein
                      </Link>
                    </>
                  ) : (
                    // =================== 👤 CUSTOMER ACTIONS ===================
                    <>
                      {b.status === "pending" && (
                        <button
                          className="btn-action-reject"
                          onClick={() => {
                            if (window.confirm("Kya aap sach me ye booking cancel karna chahte hain?")) {
                              handleUpdateStatus(b.id, "cancelled");
                            }
                          }}
                        >
                          <XCircle size={14} /> Cancel Booking (रद्द करें)
                        </button>
                      )}

                      {b.shopPhone && (
                        <>
                          <a
                            href={`tel:${b.shopPhone}`}
                            className="btn-action-call"
                            title={`Call Shop (${b.shopName})`}
                          >
                            <Phone size={13} /> Call Shop ({b.shopPhone})
                          </a>

                          <a
                            href={`https://wa.me/91${b.shopPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${b.shopName}, TyreSaathi par meri service booking (#${b.id.slice(-6)} - ${b.serviceName}) ke regarding...`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-action-whatsapp"
                            title="Chat with Shop on WhatsApp"
                          >
                            💬 WhatsApp Shop
                          </a>
                        </>
                      )}
                    </>
                  )}
                </div>
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

      {/* Styling */}
      <style>{`
        .bookings-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px 80px 16px;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
        }

        .bookings-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-heading {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .page-sub {
          font-size: 13.5px;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .header-actions-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-header-insights {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eff6ff;
          border: 1.5px solid #bfdbfe;
          color: #1d4ed8;
          padding: 9px 15px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-header-insights:hover {
          background: #dbeafe;
          transform: translateY(-1px);
        }

        .btn-header-excel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #059669;
          color: #ffffff;
          border: none;
          padding: 9px 15px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(5, 150, 105, 0.25);
          transition: all 0.2s;
        }
        .btn-header-excel:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .btn-header-new-booking {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          border: none;
          padding: 9px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.35);
          transition: all 0.2s;
        }
        .btn-header-new-booking:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.45);
        }

        /* 🏷️ Clean Filter Tabs */
        .booking-filter-tabs {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          padding: 4px 2px 12px 2px;
          margin-bottom: 22px;
        }

        .filter-tab {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #64748b;
          padding: 8px 18px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
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
          box-shadow: 0 3px 10px rgba(15, 23, 42, 0.25) !important;
        }
        .tab-pending.tab-active {
          background: #d97706 !important;
          color: #ffffff !important;
          border-color: #d97706 !important;
          box-shadow: 0 3px 10px rgba(217, 119, 6, 0.3) !important;
        }
        .tab-accepted.tab-active {
          background: #16a34a !important;
          color: #ffffff !important;
          border-color: #16a34a !important;
          box-shadow: 0 3px 10px rgba(22, 163, 74, 0.3) !important;
        }
        .tab-inprogress.tab-active {
          background: #7c3aed !important;
          color: #ffffff !important;
          border-color: #7c3aed !important;
          box-shadow: 0 3px 10px rgba(124, 58, 237, 0.3) !important;
        }
        .tab-completed.tab-active {
          background: #0284c7 !important;
          color: #ffffff !important;
          border-color: #0284c7 !important;
          box-shadow: 0 3px 10px rgba(2, 132, 199, 0.3) !important;
        }
        .tab-rejected.tab-active {
          background: #dc2626 !important;
          color: #ffffff !important;
          border-color: #dc2626 !important;
          box-shadow: 0 3px 10px rgba(220, 38, 38, 0.3) !important;
        }

        /* Bookings List Grid & Clean Cards */
        .bookings-list-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .no-bookings-card {
          text-align: center;
          padding: 60px 24px;
          background: #ffffff;
          border: 1.5px dashed #cbd5e1;
          border-radius: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .no-bookings-card h3 {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .no-bookings-card p {
          font-size: 13.5px;
          color: #64748b;
          margin: 0;
          max-width: 440px;
        }

        .booking-item-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-left: 5px solid #c0392b;
          border-radius: 16px;
          padding: 20px 22px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }
        .booking-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
          border-color: #cbd5e1;
        }

        .status-border-pending { border-left-color: #f59e0b; }
        .status-border-accepted { border-left-color: #10b981; }
        .status-border-in_progress { border-left-color: #7c3aed; }
        .status-border-completed { border-left-color: #0284c7; }
        .status-border-rejected { border-left-color: #ef4444; }

        .booking-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .service-info-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .service-icon-circle {
          width: 44px;
          height: 44px;
          background: #fef2f2;
          color: #c0392b;
          border: 1px solid #fee2e2;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .booking-service-title {
          font-size: 17px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .booking-vehicle-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: #64748b;
          margin-top: 3px;
        }

        .booking-vehicle-tag strong {
          color: #0f172a;
        }

        .status-badge {
          font-size: 12px;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 20px;
        }
        .badge-pending { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
        .badge-accepted { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
        .badge-inprogress { background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; }
        .badge-completed { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }
        .badge-rejected { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }

        .booking-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          padding: 14px 16px;
          border-radius: 12px;
          margin-bottom: 14px;
        }

        .meta-block {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .meta-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .meta-value {
          font-size: 13.5px;
          font-weight: 800;
          color: #0f172a;
        }

        .meta-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #0284c7;
          font-size: 12.5px;
          font-weight: 700;
          text-decoration: none;
          margin-top: 2px;
        }
        .meta-phone-link:hover { text-decoration: underline; }

        .meta-subtext {
          font-size: 12px;
          color: #64748b;
        }

        .booking-notes-box {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12.5px;
          color: #92400e;
          margin-bottom: 14px;
        }

        .booking-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
          flex-wrap: wrap;
          gap: 10px;
        }

        .time-ago-text {
          font-size: 12px;
          color: #64748b;
          font-family: monospace;
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .action-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-action-accept {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #16a34a;
          color: #fff;
          border: none;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.2);
        }
        .btn-action-accept:hover {
          background: #15803d;
        }

        .btn-action-reject {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-action-reject:hover {
          background: #fecaca;
        }

        .btn-action-progress {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #7c3aed;
          color: #fff;
          border: none;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(124, 58, 237, 0.2);
        }
        .btn-action-progress:hover {
          background: #6d28d9;
        }

        .btn-action-complete {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #0284c7;
          color: #fff;
          border: none;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);
        }
        .btn-action-complete:hover {
          background: #0369a1;
        }

        .btn-action-call {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
        .btn-action-call:hover {
          background: #dcfce7;
        }

        .btn-action-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
        .btn-action-whatsapp:hover {
          background: #dcfce7;
        }

        .btn-action-bill-shortcut {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          padding: 6px 13px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.25);
        }
        .btn-action-bill-shortcut:hover {
          transform: translateY(-1px);
        }

        /* 🪟 Clean White Modal Styles */
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
          border-radius: 20px;
          max-width: 540px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .modal-close-btn {
          background: #f1f5f9;
          border: none;
          color: #64748b;
          width: 32px;
          height: 32px;
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
          gap: 14px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .modal-field label {
          font-size: 12.5px;
          font-weight: 700;
          color: #334155;
        }

        .modal-field input, .modal-field select, .modal-field textarea {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          color: #0f172a;
          font-size: 13.5px;
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
          gap: 12px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .btn-cancel {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 13px;
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
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.3);
        }
        .btn-submit-booking:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.4);
        }

        @media (max-width: 768px) {
          .bookings-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-actions-group {
            width: 100%;
            justify-content: space-between;
          }
          .modal-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
