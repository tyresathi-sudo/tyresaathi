import React, { useState, useEffect } from "react";
import { 
  LifeBuoy, 
  Plus, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  ShieldCheck, 
  Tag, 
  Filter, 
  Search,
  Check
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";

const INITIAL_DEMO_TICKETS = [];

const TICKET_CATEGORIES = [
  "Booking & Service Issue (बुकिंग समस्या)",
  "Billing & Payment Issue (बिल व भुगतान)",
  "Tyre Warranty Claim (टायर वारंटी क्लेम)",
  "Shop Partner Verification (दुकान पार्टनर अप्रूवल)",
  "Emergency Roadside Assistance (इमरजेंसी सहायता)",
  "App Bug & Feature Request (ऐप सुझाव / शिकायत)",
  "Other General Inquiry (अन्य प्रश्न)"
];

export default function SupportTickets() {
  const { user, profile, isVendor } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch tickets from Firestore or fallback
  useEffect(() => {
    async function loadTickets() {
      setLoading(true);
      try {
        const q = collection(db, "support_tickets");
        const snap = await getDocs(q);
        if (!snap.empty) {
          const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTickets(list);
        } else {
          // Check localStorage
          const local = localStorage.getItem("tyresaathi_user_tickets");
          if (local) {
            setTickets(JSON.parse(local));
          } else {
            setTickets([]);
          }
        }
      } catch (err) {
        console.warn("Firestore tickets load fallback:", err);
        const local = localStorage.getItem("tyresaathi_user_tickets");
        if (local) {
          setTickets(JSON.parse(local));
        } else {
          setTickets([]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, [user]);

  // Form State
  const [formData, setFormData] = useState({
    category: TICKET_CATEGORIES[0],
    priority: "medium", // low, medium, high, urgent
    subject: "",
    description: "",
    userPhone: profile?.phone || "8877277757",
    vehicleNumber: "",
  });

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) {
      alert("कृपया विषय (Subject) और विवरण (Description) भरें।");
      return;
    }

    setSubmitting(true);
    const newTicket = {
      id: `TS-TCK-${Math.floor(700 + Math.random() * 900)}`,
      ticketNo: `TS-TCK-${Math.floor(700 + Math.random() * 900)}`,
      category: formData.category,
      priority: formData.priority,
      subject: formData.subject,
      description: formData.description,
      status: "open",
      userName: profile?.name || profile?.shopName || user?.displayName || "TyreSaathi User",
      userEmail: user?.email || "user@tyresaathi.com",
      userPhone: formData.userPhone,
      vehicleNumber: formData.vehicleNumber,
      adminReply: "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      await addDoc(collection(db, "support_tickets"), {
        ...newTicket,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Firestore support ticket fallback:", err);
    }

    setTickets((prev) => {
      const updated = [newTicket, ...prev];
      localStorage.setItem("tyresaathi_user_tickets", JSON.stringify(updated));
      return updated;
    });
    setSubmitting(false);
    setModalOpen(false);
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 5000);

    // Reset Form
    setFormData({
      category: TICKET_CATEGORIES[0],
      priority: "medium",
      subject: "",
      description: "",
      userPhone: profile?.phone || "8877277757",
      vehicleNumber: "",
    });
  };

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter === "all") return true;
    return t.status === statusFilter;
  });

  return (
    <div className="support-page-container">
      {/* Header */}
      <div className="support-header-row">
        <div>
          <h1 className="support-title">
            <LifeBuoy size={26} color="#c0392b" /> Help & Support Tickets (सहायता व शिकायत पोर्टल)
          </h1>
          <p className="support-sub">
            Kisi bhi booking, billing, warranty ya dukan samasya ke liye ticket raise karein aur instant support payein.
          </p>
        </div>

        <button className="btn-raise-ticket" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> 🎫 Naya Ticket Raise Karein
        </button>
      </div>

      {successAlert && (
        <div className="support-success-alert">
          <CheckCircle2 size={18} color="#27ae60" />
          <span>✅ Aapka support ticket successfully raise ho gaya hai! TyreSaathi team 15-30 minute me reply karegi.</span>
        </div>
      )}

      {/* Quick Support Cards (WhatsApp & Direct Helpline) */}
      <div className="support-channels-grid">
        <div className="channel-card wa-channel">
          <div className="channel-icon">💬</div>
          <div>
            <h4>Instant WhatsApp Helpdesk (+91 88772 77757)</h4>
            <p>Direct TyreSaathi official support executive se WhatsApp par chat karein.</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/918877277757?text=${encodeURIComponent("Hello TyreSaathi, mujhe support aur help ki zaroorat hai.")}`}
                target="_blank"
                rel="noreferrer"
                className="channel-link wa-link"
              >
                💬 Chat on WhatsApp (8877277757) →
              </a>
              <a
                href="tel:8877277757"
                className="channel-link phone-link"
                style={{
                  background: "#2c3e50",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                📞 Call: 8877277757
              </a>
            </div>
          </div>
        </div>

        <div className="channel-card phone-channel">
          <div className="channel-icon">🛡️</div>
          <div>
            <h4>TyreSaathi Resolution Guarantee</h4>
            <p>100% Genuine Tyres, Authorized Fitment & Quick Warranty Settlement.</p>
            <span className="channel-badge">Support Hours: 24x7 Assistance (8877277757)</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="support-filter-tabs">
        <button
          className={`filter-pill ${statusFilter === "all" ? "filter-active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          All Tickets ({tickets.length})
        </button>
        <button
          className={`filter-pill ${statusFilter === "open" ? "filter-active" : ""}`}
          onClick={() => setStatusFilter("open")}
        >
          🟡 Open ({tickets.filter((x) => x.status === "open").length})
        </button>
        <button
          className={`filter-pill ${statusFilter === "in_progress" ? "filter-active" : ""}`}
          onClick={() => setStatusFilter("in_progress")}
        >
          🔵 In Progress ({tickets.filter((x) => x.status === "in_progress").length})
        </button>
        <button
          className={`filter-pill ${statusFilter === "resolved" ? "filter-active" : ""}`}
          onClick={() => setStatusFilter("resolved")}
        >
          🟢 Resolved ({tickets.filter((x) => x.status === "resolved").length})
        </button>
      </div>

      {/* Tickets List */}
      <div className="tickets-list-grid">
        {filteredTickets.length === 0 ? (
          <div className="no-tickets-box">
            <LifeBuoy size={48} color="#bbb" />
            <h3>No Support Tickets Found</h3>
            <p>Aapko kisi bhi cheez me sahayata chahiye toh upar "Naya Ticket Raise Karein" button dabayein.</p>
          </div>
        ) : (
          filteredTickets.map((t) => (
            <div key={t.id} className="ticket-card">
              <div className="ticket-card-header">
                <div className="ticket-title-wrap">
                  <span className="ticket-id-badge">#{t.ticketNo}</span>
                  <span className="ticket-category-chip">{t.category}</span>
                  <span className={`priority-tag priority-${t.priority}`}>{t.priority.toUpperCase()} PRIORITY</span>
                </div>

                <span className={`status-badge-ticket status-${t.status}`}>
                  {t.status === "open" && "🟡 Open / Under Review"}
                  {t.status === "in_progress" && "🔵 In Progress"}
                  {t.status === "resolved" && "🟢 Resolved"}
                  {t.status === "closed" && "🔴 Closed"}
                </span>
              </div>

              <h3 className="ticket-subject">{t.subject}</h3>
              <p className="ticket-description">{t.description}</p>

              {/* Admin Reply Box if present */}
              {t.adminReply && (
                <div className="ticket-admin-reply-box">
                  <strong>🛡️ TyreSaathi Support Reply:</strong>
                  <p>{t.adminReply}</p>
                </div>
              )}

              <div className="ticket-footer-meta">
                <span>📅 Created: {t.createdAt}</span>
                {t.vehicleNumber && <span>🚗 Vehicle: {t.vehicleNumber}</span>}
                <span>👤 Raised By: {t.userName}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          RAISE TICKET MODAL FORM
      ══════════════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎫 Naya Support Ticket Raise Karein</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateTicket} className="ticket-modal-form">
              <div className="modal-field">
                <label>Issue Category (समस्या का प्रकार) *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {TICKET_CATEGORIES.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Priority (प्राथमिकता)</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low (सामान्य)</option>
                    <option value="medium">Medium (मध्यम)</option>
                    <option value="high">High (जल्द सहायता)</option>
                    <option value="urgent">🚨 Urgent (तुरंत समाधान)</option>
                  </select>
                </div>

                <div className="modal-field">
                  <label>Contact Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    value={formData.userPhone}
                    onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-field">
                <label>Vehicle / Booking Reg. No (वैकल्पिक)</label>
                <input
                  type="text"
                  placeholder="उदा: KA 05 MN 4589"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="modal-field">
                <label>Subject / Short Title (विषय) *</label>
                <input
                  type="text"
                  placeholder="उदा: Booking service payment issue / Warranty claim"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Detailed Description (पूरी समस्या का विवरण) *</label>
                <textarea
                  rows={4}
                  placeholder="Kripya apni samasya ko vistar se likhein taaki hamari team jaldi madad kar sake..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-ticket" disabled={submitting}>
                  <Send size={15} /> {submitting ? "Sending..." : "🚀 Submit Ticket (टिकट भेजें)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .support-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .support-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .support-header-row { flex-direction: column; }
        }
        .support-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .support-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .btn-raise-ticket {
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }

        .support-success-alert {
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

        .support-channels-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 700px) {
          .support-channels-grid { grid-template-columns: 1fr; }
        }
        .channel-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .channel-icon {
          font-size: 32px;
        }
        .channel-card h4 {
          margin: 0 0 2px;
          font-size: 15px;
          color: var(--text);
        }
        .channel-card p {
          margin: 0 0 8px;
          font-size: 12.5px;
          color: var(--text-muted);
        }
        .channel-link {
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .wa-link { color: #25D366; }
        .channel-badge {
          font-size: 11.5px;
          font-weight: 700;
          color: #c0392b;
        }

        .support-filter-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 6px;
        }
        .filter-pill {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
        }
        .filter-active {
          background: #c0392b;
          color: white;
          border-color: #c0392b;
        }

        .tickets-list-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .ticket-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .ticket-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ticket-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ticket-id-badge {
          font-weight: 800;
          font-size: 12px;
          color: #c0392b;
          background: var(--bg);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .ticket-category-chip {
          background: var(--surface-2);
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .priority-tag {
          font-size: 11px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .priority-low { background: #ebf5fb; color: #2980b9; }
        .priority-medium { background: #fef9e7; color: #f39c12; }
        .priority-high { background: #fdedec; color: #c0392b; }
        .priority-urgent { background: #e74c3c; color: white; }

        .status-badge-ticket {
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .status-open { background: #fef9e7; color: #d35400; }
        .status-in_progress { background: #ebf5fb; color: #2980b9; }
        .status-resolved { background: #eafaf1; color: #27ae60; }
        .status-closed { background: #f2f3f4; color: #7f8c8d; }

        .ticket-subject {
          font-size: 16px;
          font-weight: 800;
          margin: 0 0 6px;
          color: var(--text);
        }
        .ticket-description {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0 0 14px;
        }

        .ticket-admin-reply-box {
          background: #f4fdf8;
          border-left: 3px solid #27ae60;
          padding: 12px 14px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 14px;
          font-size: 13px;
        }
        .ticket-admin-reply-box strong {
          color: #27ae60;
          display: block;
          margin-bottom: 4px;
        }
        .ticket-admin-reply-box p {
          margin: 0;
          color: #2c3e50;
        }

        .ticket-footer-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 10px;
          flex-wrap: wrap;
        }

        .no-tickets-box {
          text-align: center;
          padding: 40px;
          background: var(--surface);
          border-radius: 12px;
          border: 1px solid var(--border);
        }
        .no-tickets-box h3 { margin: 12px 0 6px; }
        .no-tickets-box p { color: var(--text-muted); font-size: 13.5px; margin: 0; }

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
          max-width: 550px;
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
        .modal-header h3 { margin: 0; font-size: 17px; }
        .modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--text-muted); }
        .ticket-modal-form { display: flex; flex-direction: column; gap: 14px; }
        .modal-field { display: flex; flex-direction: column; gap: 6px; }
        .modal-field label { font-size: 12.5px; font-weight: 700; color: var(--text-muted); }
        .modal-field input, .modal-field select, .modal-field textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
          font-family: inherit;
        }
        .modal-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }
        .btn-cancel {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-submit-ticket {
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
    </div>
  );
}
