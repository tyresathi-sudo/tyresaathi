import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
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
  ChevronRight,
  Receipt,
  Download
} from "lucide-react";
import { SERVICE_TYPES, SAMPLE_SHOPS } from "../config/tyreCatalog";
import { exportBookingsToExcel } from "../utils/excelExport";

const INITIAL_DEMO_BOOKINGS = [
  {
    id: "booking-101",
    customerName: "Ahmad Raja",
    customerPhone: "9876543210",
    customerEmail: "ahmad@example.com",
    serviceId: "cut_repair",
    serviceName: "Tyre Cut & Sidewall Repair (टायर कट रिपेयर)",
    vehicleType: "Car (Swift Dzire)",
    vehicleNumber: "KA 05 MN 4589",
    shopId: "shop-blr-central",
    shopName: "TyreSaathi Partner Hub — Central",
    shopPhone: "",
    date: "2026-08-18",
    timeSlot: "11:00 AM - 12:00 PM",
    notes: "Left rear tyre got cut from side on highway, need urgent repair.",
    status: "pending", // pending, accepted, rejected, in_progress, completed
    createdAt: new Date().toISOString(),
  },
  {
    id: "booking-102",
    customerName: "Pooja Verma",
    customerPhone: "98440-99887",
    customerEmail: "pooja@example.com",
    serviceId: "alignment",
    serviceName: "3D Wheel Alignment & Balancing (अलाइनमेंट)",
    vehicleType: "SUV (Hyundai Creta)",
    vehicleNumber: "KA 01 AB 8877",
    shopId: "shop-blr-central",
    shopName: "TyreSaathi Partner Hub — Central",
    shopPhone: "",
    date: "2026-08-18",
    timeSlot: "03:00 PM - 04:00 PM",
    notes: "Steering vibrating at 80 km/h, alignment needed.",
    status: "accepted",
    createdAt: new Date().toISOString(),
  },
  {
    id: "booking-103",
    customerName: "Anil Kumar",
    customerPhone: "99001-22334",
    customerEmail: "anil@example.com",
    serviceId: "doorstep",
    serviceName: "Doorstep Emergency Assistance (घर/रास्ते पर सर्विस)",
    vehicleType: "Bike (Royal Enfield Classic 350)",
    vehicleNumber: "KA 04 EQ 1234",
    shopId: "shop-blr-south",
    shopName: "TyreSaathi Express Center — South",
    shopPhone: "",
    date: "2026-08-17",
    timeSlot: "06:00 PM - 07:00 PM",
    notes: "Flat tyre at home parking, need puncture fix and tube check.",
    status: "completed",
    createdAt: new Date().toISOString(),
  }
];

export default function Bookings() {
  const { user, profile, isVendor } = useAuth();
  const [bookings, setBookings] = useState(INITIAL_DEMO_BOOKINGS);
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // New Booking Form State
  const [newBooking, setNewBooking] = useState({
    serviceId: SERVICE_TYPES[0].id,
    serviceName: SERVICE_TYPES[0].name,
    shopId: SAMPLE_SHOPS[0].id,
    shopName: SAMPLE_SHOPS[0].name,
    shopPhone: SAMPLE_SHOPS[0].phone,
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
        }
      } catch (e) {
        console.warn("Using local bookings state:", e);
      }
    }
    loadBookings();
  }, []);

  // Update Status (Accept / Reject / Complete)
  const handleUpdateStatus = async (bookingId, newStatus) => {
    // Optimistic local update
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    try {
      await updateDoc(doc(db, "bookings", bookingId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
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
      setBookings((prev) => [{ id: docRef.id, ...bookingData }, ...prev]);
    } catch (err) {
      console.warn("Local fallback save for booking:", err);
      setBookings((prev) => [{ id: "b-" + Date.now(), ...bookingData }, ...prev]);
    } finally {
      setLoading(false);
      setModalOpen(false);
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
      {/* Page Header */}
      <div className="bookings-header-row">
        <div>
          <h1 className="page-heading">
            {isVendor ? "🏪 Shop Owner Bookings Dashboard" : "📅 Tyre Service Bookings"}
          </h1>
          <p className="page-sub">
            {isVendor
              ? "Aapki dukan par aayi hui customer service bookings ko Accept ya Reject karein."
              : "Tyre Cut Repair, Puncture, Fitting aur Doorstep Service ki bookings aur status dekhein."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="book-service-cta"
            style={{ background: "#27ae60" }}
            onClick={() => exportBookingsToExcel(filteredBookings)}
            title="Download Bookings as Excel Sheet (.csv)"
          >
            <Download size={16} /> 📥 Export to Excel
          </button>

          <button className="book-service-cta" onClick={() => setModalOpen(true)}>
            <Plus size={16} /> Book New Service (नई बुकिंग)
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
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
          ⏳ Pending / New ({counts.pending})
        </button>
        <button
          className={`filter-tab ${activeTab === "accepted" ? "tab-active tab-accepted" : ""}`}
          onClick={() => setActiveTab("accepted")}
        >
          ✅ Accepted ({counts.accepted})
        </button>
        <button
          className={`filter-tab ${activeTab === "in_progress" ? "tab-active" : ""}`}
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

      {/* Bookings List */}
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
                    <span className="status-badge badge-pending">⏳ Awaiting Shop Response</span>
                  )}
                  {b.status === "accepted" && (
                    <span className="status-badge badge-accepted">✅ Booking Accepted</span>
                  )}
                  {b.status === "rejected" && (
                    <span className="status-badge badge-rejected">❌ Booking Rejected</span>
                  )}
                  {b.status === "in_progress" && (
                    <span className="status-badge badge-inprogress">🔧 Service in Progress</span>
                  )}
                  {b.status === "completed" && (
                    <span className="status-badge badge-completed">🎉 Service Completed</span>
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

              {/* Bottom Row: Shop Owner Action Buttons (Accept / Reject / Call / WhatsApp) */}
              <div className="booking-card-actions">
                <div className="action-left-info">
                  <span className="time-ago-text">Booking ID: #{b.id.slice(-6)}</span>
                </div>

                <div className="action-buttons-group">
                  {/* Shop Owner Actions */}
                  {b.status === "pending" && (
                    <>
                      <button
                        className="btn-action-reject"
                        onClick={() => handleUpdateStatus(b.id, "rejected")}
                      >
                        <XCircle size={15} /> Reject (अस्वीकार करें)
                      </button>
                      <button
                        className="btn-action-accept"
                        onClick={() => handleUpdateStatus(b.id, "accepted")}
                      >
                        <CheckCircle2 size={15} /> Accept (स्वीकार करें)
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

                  {/* 📞 One-Click Direct Phone Call Button */}
                  {b.customerPhone && (
                    <>
                      <a
                        href={`tel:${b.customerPhone}`}
                        className="btn-action-call"
                        title={`Call ${b.customerName}`}
                      >
                        <Phone size={14} /> Call ({b.customerPhone})
                      </a>

                      <a
                        href={`https://wa.me/91${b.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Namaste ${b.customerName}, TyreSaathi par aapki booking (${b.serviceName}) ke regarding...`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-action-whatsapp"
                        title="Chat on WhatsApp"
                      >
                        💬 WhatsApp
                      </a>
                    </>
                  )}

                  {/* 🧾 Quick Bill Generator Shortcut */}
                  <Link
                    to={`/billing?customer=${encodeURIComponent(b.customerName)}&phone=${encodeURIComponent(b.customerPhone)}&vehicle=${encodeURIComponent(b.vehicleType)}&vehicleNo=${encodeURIComponent(b.vehicleNumber)}&service=${encodeURIComponent(b.serviceName)}`}
                    className="btn-action-bill-shortcut"
                    title="Generate Bill for this Service"
                  >
                    <Receipt size={14} /> 🧾 Bill Banayein
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
                    const shop = SAMPLE_SHOPS.find((x) => x.id === e.target.value);
                    setNewBooking({
                      ...newBooking,
                      shopId: e.target.value,
                      shopName: shop ? shop.name : "TyreSaathi Shop",
                      shopPhone: shop?.phone || "",
                    });
                  }}
                >
                  {SAMPLE_SHOPS.map((shop) => (
                    <option key={shop.id} value={shop.id}>
                      {shop.name} (📍 {shop.distanceKm} km - {shop.city})
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

      <style>{`
        .bookings-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .bookings-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .bookings-header-row {
            flex-direction: column;
          }
        }
        .page-heading {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .page-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .book-service-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
          white-space: nowrap;
        }
        .book-service-cta:hover {
          background: #a93226;
        }

        /* Filter Tabs */
        .booking-filter-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .filter-tab {
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }
        .tab-active {
          background: #1e1e24;
          color: white;
          border-color: #1e1e24;
        }
        .tab-pending.tab-active { background: #d35400; border-color: #d35400; }
        .tab-accepted.tab-active { background: #27ae60; border-color: #27ae60; }
        .tab-completed.tab-active { background: #2980b9; border-color: #2980b9; }
        .tab-rejected.tab-active { background: #c0392b; border-color: #c0392b; }

        /* Bookings List */
        .bookings-list-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .booking-item-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .status-border-pending { border-left: 5px solid #d35400; }
        .status-border-accepted { border-left: 5px solid #27ae60; }
        .status-border-in_progress { border-left: 5px solid #f39c12; }
        .status-border-completed { border-left: 5px solid #2980b9; }
        .status-border-rejected { border-left: 5px solid #c0392b; }

        .booking-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 650px) {
          .booking-card-top {
            flex-direction: column;
          }
        }
        .service-info-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .service-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: color-mix(in srgb, #c0392b 10%, var(--surface));
          color: #c0392b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .booking-service-title {
          font-size: 16.5px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 4px;
        }
        .booking-vehicle-tag {
          font-size: 12.5px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 700;
        }
        .badge-pending { background: #fef5e7; color: #d35400; }
        .badge-accepted { background: #eafaf1; color: #27ae60; }
        .badge-inprogress { background: #fef9e7; color: #b7950b; }
        .badge-completed { background: #ebf5fb; color: #2980b9; }
        .badge-rejected { background: #fdedec; color: #c0392b; }

        .booking-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          background: var(--bg);
          padding: 14px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        .meta-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .meta-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .meta-value {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text);
        }
        .meta-subtext {
          font-size: 12px;
          color: var(--text-muted);
        }
        .meta-phone-link {
          font-size: 12px;
          color: #27ae60;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .booking-notes-box {
          font-size: 12.5px;
          background: var(--surface-2);
          padding: 8px 12px;
          border-radius: 6px;
          color: var(--text);
          margin-bottom: 14px;
        }

        .booking-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          gap: 10px;
          flex-wrap: wrap;
        }
        .time-ago-text {
          font-size: 12px;
          color: var(--text-muted);
        }
        .action-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .btn-action-accept {
          background: #27ae60;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-reject {
          background: var(--surface-2);
          color: #c0392b;
          border: 1px solid #c0392b;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-progress {
          background: #f39c12;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-complete {
          background: #2980b9;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-action-call {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s ease;
        }
        .btn-action-call:hover {
          background: var(--border);
          color: #c0392b;
        }
        .btn-action-whatsapp {
          background: #25D366;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 6px rgba(37, 211, 102, 0.3);
          transition: background 0.15s ease;
        }
        .btn-action-whatsapp:hover {
          background: #1ebd56;
          color: white;
        }
        .btn-action-bill-shortcut {
          background: #2c3e50;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.15s ease;
        }
        .btn-action-bill-shortcut:hover {
          background: #1a252f;
          color: white;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .modal-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          max-width: 540px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.2);
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--text-muted);
        }
        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .modal-field label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .modal-field input,
        .modal-field select,
        .modal-field textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 500px) {
          .modal-grid-2 {
            grid-template-columns: 1fr;
          }
        }
        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }
        .btn-cancel {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-submit-booking {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .no-bookings-card {
          padding: 60px 20px;
          text-align: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 12px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
