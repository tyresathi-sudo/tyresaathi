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
  Check,
  Camera,
  Image as ImageIcon,
  X,
  ZoomIn,
  Upload
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { getSupportContactConfig } from "../config/supportConfig";

// High quality canvas image compressor (resizes to max 1200px and converts to compact JPEG)
export const compressImage = (file, maxWidth = 1200, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const INITIAL_DEMO_TICKETS = [];

export const TICKET_CATEGORIES = [
  "📱 Mobile OTP & Login Issue (मोबाइल OTP / लॉगिन समस्या)",
  "👤 Account & Profile Problem (खाता व प्रोफ़ाइल समस्या)",
  "📅 Booking & Service Issue (बुकिंग व सर्विस समस्या)",
  "💳 Billing, Payment & Refund (बिल, भुगतान व रिफंड)",
  "🛞 Tyre Delivery & Fitment (टायर डिलीवरी व फिटमेंट)",
  "🛡️ Tyre Warranty Claim (टायर वारंटी क्लेम)",
  "🏪 Shop Partner Verification (दुकान पार्टनर अप्रूवल)",
  "🚗 Emergency Roadside Assistance (इमरजेंसी सहायता)",
  "🐞 App Bug & Technical Problem (ऐप एरर / तकनीकी समस्या)",
  "💬 Other Issue or Feedback (अन्य कोई भी समस्या / सुझाव)"
];

// Helper to normalize tickets to sequential TS-TCK-01, TS-TCK-02...
export const normalizeTicketList = (list) => {
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
};

// Helper to generate sequential ticket numbers starting from 01 (e.g. TS-TCK-01, TS-TCK-02)
export const generateNextTicketNo = (existingList = [], prefix = "TS-TCK-") => {
  const next = (Array.isArray(existingList) ? existingList.length : 0) + 1;
  const formatted = next < 10 ? `0${next}` : String(next);
  return `${prefix}${formatted}`;
};

export const getShopTicketStorageKey = (user, profile) => {
  if (user?.uid) return `tyresaathi_tickets_user_${user.uid}`;
  if (profile?.shopName && profile.shopName.trim() && profile.shopName !== "TyreSaathi Partner Hub") {
    return `tyresaathi_tickets_shop_${profile.shopName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  }
  return "tyresaathi_guest_tickets";
};

export default function SupportTickets() {
  const { user, profile, isVendor, isAdmin } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [previewModalImg, setPreviewModalImg] = useState(null);
  const [supportConfig, setSupportConfig] = useState(getSupportContactConfig);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) setSupportConfig(e.detail);
      else setSupportConfig(getSupportContactConfig());
    };
    window.addEventListener("tyresaathi_support_config_updated", handleUpdate);
    return () => window.removeEventListener("tyresaathi_support_config_updated", handleUpdate);
  }, []);

  // Fetch tickets from Firestore or fallback
  useEffect(() => {
    async function loadTickets() {
      setLoading(true);
      const storageKey = getShopTicketStorageKey(user, profile);
      try {
        const q = collection(db, "support_tickets");
        const snap = await getDocs(q);
        if (!snap.empty) {
          let list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          if (!isAdmin) {
            // Strictly filter tickets for the logged-in user or shop
            const myUid = user?.uid;
            const myEmail = (user?.email || "").toLowerCase().trim();
            const myPhone = (profile?.phone || user?.phoneNumber || "").replace(/[^0-9]/g, "").slice(-10);

            list = list.filter(t => {
              const tUid = t?.userId;
              const tEmail = (t?.userEmail || "").toLowerCase().trim();
              const tPhone = (t?.userPhone || "").replace(/[^0-9]/g, "").slice(-10);

              const matchesId = Boolean(myUid && tUid && tUid === myUid);
              const matchesEmail = Boolean(myEmail && tEmail && tEmail === myEmail);
              const matchesPhone = Boolean(myPhone && tPhone && myPhone === tPhone);

              return matchesId || matchesEmail || matchesPhone;
            });
          }
          const normalized = normalizeTicketList(list);
          setTickets(normalized);
          localStorage.setItem(storageKey, JSON.stringify(normalized));
        } else {
          // Check localStorage strictly for this user's storageKey
          const local = localStorage.getItem(storageKey);
          if (local) {
            const normalized = normalizeTicketList(JSON.parse(local));
            setTickets(normalized);
          } else {
            setTickets([]);
          }
        }
      } catch (err) {
        console.warn("Firestore tickets load fallback:", err);
        const local = localStorage.getItem(storageKey);
        if (local) {
          const normalized = normalizeTicketList(JSON.parse(local));
          setTickets(normalized);
        } else {
          setTickets([]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadTickets();
  }, [user, profile, isAdmin]);

  // Form State
  const [formData, setFormData] = useState({
    category: TICKET_CATEGORIES[0],
    priority: "medium", // low, medium, high, urgent
    subject: "",
    description: "",
    imageUrl: "",
    userPhone: profile?.phone || "8877277757",
    vehicleNumber: "",
  });

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Kripya photo/image file hi upload karein (PNG, JPG, WebP).");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert("Photo file 15MB se kam honi chahiye.");
      return;
    }
    try {
      setImageUploading(true);
      const compressedDataUrl = await compressImage(file, 1200, 0.82);
      setImagePreview(compressedDataUrl);
      setFormData((prev) => ({ ...prev, imageUrl: compressedDataUrl }));
    } catch (err) {
      console.error("Image processing error:", err);
      alert("Photo process karne me error aayi. Kripya dusri photo try karein.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) {
      alert("कृपया विषय (Subject) और विवरण (Description) भरें।");
      return;
    }

    setSubmitting(true);
    const storageKey = getShopTicketStorageKey(user, profile);
    const nextTicketNo = generateNextTicketNo(tickets);

    const newTicket = {
      id: nextTicketNo,
      ticketNo: nextTicketNo,
      userId: user?.uid || "user_self",
      category: formData.category,
      priority: formData.priority,
      subject: formData.subject,
      description: formData.description,
      imageUrl: formData.imageUrl || "",
      attachmentUrl: formData.imageUrl || "",
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
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
    setSubmitting(false);
    setModalOpen(false);
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 5000);

    // Reset Form
    setImagePreview("");
    setFormData({
      category: TICKET_CATEGORIES[0],
      priority: "medium",
      subject: "",
      description: "",
      imageUrl: "",
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
            <h4>Instant WhatsApp Helpdesk (+91 {supportConfig.whatsapp || "88772 77757"})</h4>
            <p>Direct TyreSaathi official support executive se WhatsApp par chat karein.</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/91${supportConfig.whatsapp || "8877277757"}?text=${encodeURIComponent("Hello TyreSaathi, mujhe support aur help ki zaroorat hai.")}`}
                target="_blank"
                rel="noreferrer"
                className="channel-link wa-link"
              >
                💬 Chat on WhatsApp ({supportConfig.whatsapp || "8877277757"}) →
              </a>
              <a
                href={`tel:${supportConfig.phone || "8877277757"}`}
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
                📞 Call: {supportConfig.phone || "8877277757"}
              </a>
            </div>
          </div>
        </div>

        <div className="channel-card phone-channel">
          <div className="channel-icon">🛡️</div>
          <div>
            <h4>TyreSaathi Resolution Guarantee</h4>
            <p>100% Genuine Tyres, Authorized Fitment & Quick Warranty Settlement.</p>
            <span className="channel-badge">Support Hours: {supportConfig.helplineTiming || "24x7 Assistance"} ({supportConfig.phone || "8877277757"})</span>
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

              {/* Attached Screenshot / Photo if present */}
              {(t.imageUrl || t.attachmentUrl) && (
                <div className="ticket-card-attachment-wrap">
                  <div className="ticket-attachment-badge">
                    <ImageIcon size={13} color="#c0392b" />
                    <span>Attached Screenshot / Photo:</span>
                  </div>
                  <div 
                    className="ticket-thumb-container"
                    onClick={() => setPreviewModalImg(t.imageUrl || t.attachmentUrl)}
                    title="Bada karke dekhne ke liye click karein"
                  >
                    <img 
                      src={t.imageUrl || t.attachmentUrl} 
                      alt="Ticket issue" 
                      className="ticket-thumb-img" 
                    />
                    <div className="ticket-thumb-overlay">
                      <ZoomIn size={14} /> Bada Dekhein
                    </div>
                  </div>
                </div>
              )}

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

            {/* Helpful Notice Banner */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "8px 12px", borderRadius: "8px", fontSize: "12px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>💡</span>
              <span>Aap kisi bhi samasya—jaise Mobile OTP, Login, Booking, Payment ya Shop Service—ke liye yahan ticket raise kar sakte hain.</span>
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
                    placeholder="10-digit Mobile No."
                    value={formData.userPhone}
                    onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-field">
                <label>Reference / Vehicle / Booking No (वैकल्पिक)</label>
                <input
                  type="text"
                  placeholder="उदा: Mobile No / Booking ID / Vehicle No (यदि उपलब्ध हो)"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="modal-field">
                <label>Subject / Short Title (विषय) *</label>
                <input
                  type="text"
                  placeholder="उदा: Mobile OTP nahi aa raha / Login error / Payment issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Detailed Description (पूरी समस्या का विवरण) *</label>
                <textarea
                  rows={4}
                  placeholder="Kripya apni samasya vistar se likhein (जैसे: Mobile OTP nahi mila, login me dikkat, payment deduct hua, etc.) taaki team turant madad kar sake..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              {/* Photo / Screenshot Upload Field */}
              <div className="modal-field">
                <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>📷 Screenshot ya Photo Upload Karein (वैकल्पिक)</span>
                  <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>PNG, JPG, WebP</span>
                </label>

                {!imagePreview ? (
                  <label className="ticket-dropzone">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      style={{ display: "none" }}
                      disabled={imageUploading}
                    />
                    <div className="dropzone-inner">
                      <div className="dropzone-icon">
                        {imageUploading ? (
                          <div className="spinner-mini" />
                        ) : (
                          <Camera size={22} color="#c0392b" />
                        )}
                      </div>
                      <div className="dropzone-text">
                        <strong>
                          {imageUploading ? "Photo process ho rahi hai..." : "Photo / Screenshot chunein ya click karein"}
                        </strong>
                        <small>
                          Mobile OTP problem, app error screenshot, tyre defect ya receipt ki photo attach karein
                        </small>
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="ticket-image-preview-container">
                    <div
                      className="preview-image-wrapper"
                      onClick={() => setPreviewModalImg(imagePreview)}
                      title="Bada karke dekhne ke liye click karein"
                    >
                      <img src={imagePreview} alt="Issue preview" />
                      <span className="preview-zoom-tag">
                        <ZoomIn size={12} /> Bada Dekhein
                      </span>
                    </div>
                    <div className="preview-info-col">
                      <span className="preview-ok-tag">✅ Photo attach ho gayi hai</span>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={handleRemoveImage}
                      >
                        <X size={13} /> Photo Hatayein (Remove)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-ticket" disabled={submitting || imageUploading}>
                  <Send size={15} /> {submitting ? "Sending..." : "🚀 Submit Ticket (टिकट भेजें)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox for Viewing Attachment Full Screen */}
      {previewModalImg && (
        <div className="ticket-lightbox-backdrop" onClick={() => setPreviewModalImg(null)}>
          <div className="ticket-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ticket-lightbox-close" onClick={() => setPreviewModalImg(null)} title="Band Karein">
              <X size={20} />
            </button>
            <img src={previewModalImg} alt="Enlarged Attachment" className="ticket-lightbox-img" />
          </div>
        </div>
      )}

      <style>{`
        .support-page-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 8px 0 60px;
          box-sizing: border-box;
        }
        .support-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 18px;
        }
        @media (max-width: 768px) {
          .support-header-row { flex-direction: column; gap: 12px; }
        }
        .support-title {
          font-size: clamp(1.35rem, 2.2vw, 1.85rem);
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 1.25;
        }
        .support-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.45;
        }
        .btn-raise-ticket {
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 9px;
          font-weight: 800;
          font-size: 0.92rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.28);
          transition: transform 0.15s ease;
        }
        .btn-raise-ticket:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(192, 57, 43, 0.38);
        }

        .support-success-alert {
          background: #eafaf1;
          border: 1.5px solid #2ecc71;
          color: #27ae60;
          padding: 12px 14px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }

        .support-channels-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .support-channels-grid { grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px; }
        }
        .channel-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          gap: 14px;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .channel-icon {
          font-size: 26px;
        }
        .channel-card h4 {
          margin: 0 0 4px;
          font-size: 1rem;
          font-weight: 800;
          color: var(--text);
        }
        .channel-card p {
          margin: 0 0 6px;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .channel-link {
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
        }
        .wa-link { color: #25D366; }
        .channel-badge {
          font-size: 0.8rem;
          font-weight: 700;
          color: #c0392b;
        }

        .support-filter-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 18px;
          overflow-x: auto;
          padding-bottom: 4px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .support-filter-tabs::-webkit-scrollbar {
          display: none;
        }
        .filter-pill {
          background: var(--surface);
          border: 1.5px solid var(--border);
          padding: 7px 16px;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .filter-active {
          background: #c0392b !important;
          color: white !important;
          border-color: #c0392b !important;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.25);
        }

        .tickets-list-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        .ticket-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ticket-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }
        .ticket-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
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
          font-size: 0.8rem;
          color: #c0392b;
          background: var(--bg);
          padding: 3px 8px;
          border-radius: 6px;
        }
        .ticket-category-chip {
          background: var(--surface-2);
          font-size: 0.8rem;
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .priority-tag {
          font-size: 0.78rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .priority-low { background: #ebf5fb; color: #2980b9; }
        .priority-medium { background: #fef9e7; color: #f39c12; }
        .priority-high { background: #fdedec; color: #c0392b; }
        .priority-urgent { background: #e74c3c; color: white; }

        .status-badge-ticket {
          font-size: 0.82rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
        }
        .status-open { background: #fef9e7; color: #d35400; }
        .status-in_progress { background: #ebf5fb; color: #2980b9; }
        .status-resolved { background: #eafaf1; color: #27ae60; }
        .status-closed { background: #f2f3f4; color: #7f8c8d; }

        .ticket-subject {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 4px 0 6px;
          color: var(--text);
          line-height: 1.3;
        }
        .ticket-description {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0 0 12px;
        }

        .ticket-admin-reply-box {
          background: #f4fdf8;
          border-left: 4px solid #27ae60;
          padding: 12px 16px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 12px;
          font-size: 0.92rem;
          line-height: 1.5;
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
          gap: 14px;
          font-size: 0.82rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 10px;
          flex-wrap: wrap;
        }

        .no-tickets-box {
          text-align: center;
          padding: 30px 16px;
          background: var(--surface);
          border-radius: 10px;
          border: 1px solid var(--border);
        }
        .no-tickets-box h3 { margin: 8px 0 4px; font-size: 0.95rem; }
        .no-tickets-box p { color: var(--text-muted); font-size: 0.75rem; margin: 0; }

        /* 📱 Mobile Optimized Rules */
        @media (max-width: 640px) {
          .support-page-container {
            padding: 4px 0 50px;
          }
          .support-title {
            font-size: 1.25rem;
          }
          .support-sub {
            font-size: 0.82rem;
          }
          .btn-raise-ticket {
            width: 100%;
            justify-content: center;
            padding: 10px 14px;
            font-size: 0.88rem;
          }
          .channel-card {
            padding: 12px 14px;
          }
          .channel-card h4 {
            font-size: 0.92rem;
          }
          .channel-card p {
            font-size: 0.8rem;
          }
          .ticket-card {
            padding: 14px 14px;
          }
          .ticket-subject {
            font-size: 1rem;
          }
          .ticket-description {
            font-size: 0.85rem;
          }
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .modal-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          max-width: 520px;
          width: 100%;
          padding: 20px 20px;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.28);
          max-height: 90vh;
          overflow-y: auto;
          color: #0f172a;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
        }
        .modal-header h3 { margin: 0; font-size: 1.05rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px; }
        .modal-close { background: none; border: none; font-size: 20px; cursor: pointer; color: #64748b; line-height: 1; padding: 2px; }
        .modal-close:hover { color: #0f172a; }
        .ticket-modal-form { display: flex; flex-direction: column; gap: 12px; }
        .modal-field { display: flex; flex-direction: column; gap: 4px; }
        .modal-field label { font-size: 0.78rem; font-weight: 700; color: #334155; }
        .modal-field input, .modal-field select, .modal-field textarea {
          padding: 9px 12px;
          border-radius: 8px;
          border: 1.5px solid #cbd5e1;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.82rem;
          outline: none;
          font-family: inherit;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .modal-field input:focus, .modal-field select:focus, .modal-field textarea:focus {
          border-color: #c0392b;
          box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.12);
        }
        .modal-field input::placeholder, .modal-field textarea::placeholder {
          color: #94a3b8;
        }
        .modal-grid-2 { display: grid; grid-template-columns: 1fr; gap: 8px; }
        @media (min-width: 500px) {
          .modal-grid-2 { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
        }
        .btn-cancel {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #334155;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-cancel:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .btn-submit-ticket {
          background: #c0392b;
          color: #ffffff;
          border: none;
          padding: 9px 18px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.82rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
          transition: all 0.15s ease;
        }
        .btn-submit-ticket:hover:not(:disabled) {
          background: #a93226;
          transform: translateY(-1px);
        }
        .btn-submit-ticket:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ── Image Upload Dropzone & Previews ── */
        .ticket-dropzone {
          display: block;
          border: 2px dashed #cbd5e1;
          background: #f8fafc;
          border-radius: 10px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ticket-dropzone:hover {
          border-color: #c0392b;
          background: #fff5f5;
        }
        .dropzone-inner {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dropzone-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dropzone-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .dropzone-text strong {
          font-size: 0.82rem;
          color: #0f172a;
        }
        .dropzone-text small {
          font-size: 0.72rem;
          color: #64748b;
          line-height: 1.3;
        }

        .ticket-image-preview-container {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border: 1.5px solid #bbf7d0;
          padding: 8px 12px;
          border-radius: 10px;
        }
        .preview-image-wrapper {
          position: relative;
          width: 68px;
          height: 68px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #cbd5e1;
          flex-shrink: 0;
        }
        .preview-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .preview-zoom-tag {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(15, 23, 42, 0.75);
          color: #ffffff;
          font-size: 9px;
          padding: 2px 0;
          text-align: center;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        .preview-info-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .preview-ok-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: #16a34a;
        }
        .btn-remove-photo {
          background: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fecaca;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          width: fit-content;
          transition: all 0.15s ease;
        }
        .btn-remove-photo:hover {
          background: #fca5a5;
          color: #7f1d1d;
        }

        /* ── Ticket Card Attachment ── */
        .ticket-card-attachment-wrap {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed var(--border);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ticket-attachment-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .ticket-thumb-container {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 8px;
          overflow: hidden;
          border: 1.5px solid var(--border);
          cursor: pointer;
          background: #000;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .ticket-thumb-container:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .ticket-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ticket-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          color: #ffffff;
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          transition: opacity 0.15s ease;
        }
        .ticket-thumb-container:hover .ticket-thumb-overlay {
          opacity: 1;
        }

        /* ── Lightbox Modal ── */
        .ticket-lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(5px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .ticket-lightbox-modal {
          position: relative;
          max-width: 90vw;
          max-height: 88vh;
        }
        .ticket-lightbox-close {
          position: absolute;
          top: -16px;
          right: -16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          color: #0f172a;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          z-index: 2;
          transition: transform 0.15s ease;
        }
        .ticket-lightbox-close:hover {
          transform: scale(1.1);
        }
        .ticket-lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          display: block;
        }

        .spinner-mini {
          width: 18px;
          height: 18px;
          border: 2px solid #fee2e2;
          border-top: 2px solid #c0392b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
