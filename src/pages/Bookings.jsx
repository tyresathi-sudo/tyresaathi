import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

export default function Bookings() {
  const { user, profile, isVendor } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [availableShops, setAvailableShops] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
              city: v.city || "Raipur",
              address: v.address || "TyreSaathi Partner Hub",
              services: v.services || ["Tyre Replacement & Fitting", "Tubeless Puncture Repair", "Tyre Cut Repair", "Nitrogen Air Fill"],
              rating: 4.9,
              reviewsCount: 24
            }));
            setAvailableShops(formatted);
            if (formatted[0]) {
              setNewBooking((prev) => ({
                ...prev,
                shopId: formatted[0].id,
                shopName: formatted[0].name,
                shopPhone: formatted[0].phone
              }));
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
    serviceId: SERVICE_TYPES[0]?.id || "puncture",
    serviceName: SERVICE_TYPES[0]?.name || "Tubeless Puncture Repair",
    shopId: "",
    shopName: profile?.shopName || "TyreSaathi Partner Hub",
    shopPhone: profile?.phone || "",
    customerName: profile?.name || "",
    customerPhone: profile?.phone || "",
    vehicleType: "Car / SUV",
    vehicleNumber: "",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM - 11:00 AM",
    notes: "",
  });

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

    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...bookingData,
        createdAtServer: serverTimestamp(),
      });
      const finalBooking = { id: docRef.id, ...bookingData };
      setBookings((prev) => [finalBooking, ...prev]);
      logBookingToSheet(finalBooking);
    } catch (err) {
      console.warn("Local fallback save for booking:", err);
      const fallbackBooking = { id: "b-" + Date.now(), ...bookingData };
      setBookings((prev) => [fallbackBooking, ...prev]);
      logBookingToSheet(fallbackBooking);
    } finally {
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

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    return b.status === activeTab;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    in_progress: bookings.filter((b) => b.status === "in_progress").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
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
            <Calendar size={48} color="#aaa" />
            <h3>No Bookings in this status</h3>
            <p>Aap "Book New Service" button dabakar nayi booking create kar sakte hain.</p>
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
                </div>

                <div className="action-buttons-group">
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
                        title={`Call ${b.customerName}`}
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
                    placeholder="Enter your name"
                    value={newBooking.customerName}
                    onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                  />
                </div>

                <div className="modal-field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
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
          padding: 20px 16px 80px 16px;
          font-family: 'Inter', sans-serif;
          color: #f3f4f6;
        }

        .bookings-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .page-heading {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .page-sub {
          font-size: 13px;
          color: #94a3b8;
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
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.35);
          color: #60a5fa;
          padding: 9px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-header-insights:hover {
          background: rgba(59, 130, 246, 0.25);
          transform: translateY(-1px);
        }

        .btn-header-excel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #059669;
          color: #fff;
          border: none;
          padding: 9px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-header-excel:hover {
          background: #10b981;
          transform: translateY(-1px);
        }

        .btn-header-new-booking {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #fff;
          border: none;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
          transition: all 0.2s;
        }
        .btn-header-new-booking:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
        }

        /* Filter Tabs (Exact image 2 styling) */
        .booking-filter-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 20px;
        }

        .filter-tab {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          padding: 9px 18px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .filter-tab:hover {
          background: rgba(30, 41, 59, 0.9);
          color: #fff;
        }
        .tab-active {
          background: #3b82f6 !important;
          color: #fff !important;
          border-color: #3b82f6 !important;
        }
        .tab-pending {
          background: #f59e0b !important;
          border-color: #f59e0b !important;
        }
        .tab-accepted {
          background: #10b981 !important;
          border-color: #10b981 !important;
        }
        .tab-inprogress {
          background: #6366f1 !important;
          border-color: #6366f1 !important;
        }
        .tab-completed {
          background: #059669 !important;
          border-color: #059669 !important;
        }
        .tab-rejected {
          background: #ef4444 !important;
          border-color: #ef4444 !important;
        }

        /* Bookings List Grid & Cards */
        .bookings-list-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .no-bookings-card {
          text-align: center;
          padding: 50px 20px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 14px;
        }

        .booking-item-card {
          background: linear-gradient(180deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 4px solid #3b82f6;
          border-radius: 14px;
          padding: 18px 20px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .booking-item-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.18);
        }

        .status-border-pending { border-left-color: #f59e0b; }
        .status-border-accepted { border-left-color: #10b981; }
        .status-border-in_progress { border-left-color: #6366f1; }
        .status-border-completed { border-left-color: #059669; }
        .status-border-rejected { border-left-color: #ef4444; }

        .booking-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .service-info-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .service-icon-circle {
          width: 40px;
          height: 40px;
          background: rgba(59, 130, 246, 0.15);
          color: #38bdf8;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .booking-service-title {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .booking-vehicle-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 2px;
        }

        .status-badge {
          font-size: 12px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 20px;
        }
        .badge-pending { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .badge-accepted { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
        .badge-inprogress { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); }
        .badge-completed { background: rgba(5, 150, 105, 0.2); color: #10b981; border: 1px solid rgba(5, 150, 105, 0.4); }
        .badge-rejected { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }

        .booking-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
          background: rgba(15, 23, 42, 0.5);
          padding: 12px 14px;
          border-radius: 10px;
          margin-bottom: 12px;
        }

        .meta-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-label {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }

        .meta-value {
          font-size: 13px;
          font-weight: 700;
          color: #f1f5f9;
        }

        .meta-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #38bdf8;
          font-size: 12px;
          text-decoration: none;
          margin-top: 2px;
        }
        .meta-phone-link:hover { text-decoration: underline; }

        .meta-subtext {
          font-size: 12px;
          color: #94a3b8;
        }

        .booking-notes-box {
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          color: #fcd34d;
          margin-bottom: 12px;
        }

        .booking-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 10px;
        }

        .time-ago-text {
          font-size: 12px;
          color: #64748b;
          font-family: monospace;
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
          background: #10b981;
          color: #fff;
          border: none;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-action-reject {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #f87171;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-action-progress {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #6366f1;
          color: #fff;
          border: none;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-action-complete {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #059669;
          color: #fff;
          border: none;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-action-call {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(59, 130, 246, 0.15);
          color: #38bdf8;
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
        }
        .btn-action-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(37, 211, 102, 0.15);
          color: #25d366;
          border: 1px solid rgba(37, 211, 102, 0.3);
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
        }
        .btn-action-bill-shortcut {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          padding: 6px 11px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 16px;
        }

        .modal-card {
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          max-width: 520px;
          width: 100%;
          padding: 22px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .modal-title {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 18px;
          cursor: pointer;
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
          font-weight: 600;
          color: #cbd5e1;
        }

        .modal-field input, .modal-field select, .modal-field textarea {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 9px 12px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
        }

        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #cbd5e1;
          padding: 9px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-submit-booking {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          border: none;
          padding: 9px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
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
