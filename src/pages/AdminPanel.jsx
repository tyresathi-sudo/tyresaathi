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
  RefreshCw
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { 
  exportBookingsToExcel, 
  exportInvoicesToExcel, 
  exportUsersToExcel, 
  exportTicketsToExcel 
} from "../utils/excelExport";

const SAMPLE_ADMIN_SHOPS = [
  {
    uid: "admin-master-01",
    name: "TyreSaathi Master Admin",
    email: "tyresathi@gmail.com",
    phone: "98765-43210",
    role: "admin",
    shopName: "TyreSaathi Central Headquarters",
    shopApproved: true,
    city: "Bengaluru, Karnataka",
    address: "MG Road Commercial Hub",
    createdAt: "2026-08-01"
  },
  {
    uid: "shop-02",
    name: "Rajesh Kumar",
    email: "rajesh.tyres@gmail.com",
    phone: "98450-11223",
    role: "vendor",
    shopName: "Star Tyre & Alignment Hub",
    shopApproved: true,
    city: "Mumbai, Maharashtra",
    address: "Andheri East Link Road",
    createdAt: "2026-08-05"
  },
  {
    uid: "shop-03",
    name: "Amit Sharma",
    email: "amit.auto@gmail.com",
    phone: "99112-33445",
    role: "vendor",
    shopName: "Highway Tyre Care & Puncture Center",
    shopApproved: false, // Pending verification
    city: "New Delhi, Delhi NCR",
    address: "NH-48 Mahipalpur Bypass",
    createdAt: "2026-08-16"
  },
  {
    uid: "user-01",
    name: "Ahmad Raja",
    email: "ahmad@example.com",
    phone: "9876543210",
    role: "customer",
    shopName: "—",
    shopApproved: false,
    city: "Bengaluru",
    address: "Indiranagar",
    createdAt: "2026-08-10"
  }
];

const SAMPLE_GLOBAL_BOOKINGS = [
  {
    id: "booking-101",
    customerName: "Ahmad Raja",
    customerPhone: "9876543210",
    vehicleType: "Car (Swift Dzire)",
    vehicleNumber: "KA 05 MN 4589",
    serviceName: "Tyre Cut & Sidewall Repair (टायर कट रिपेयर)",
    shopName: "Shree Ram Tyre Center",
    status: "accepted",
    date: "2026-08-18",
    timeSlot: "11:00 AM - 12:00 PM",
    notes: "Left rear tyre got cut from side on highway, need urgent repair."
  },
  {
    id: "booking-102",
    customerName: "Pooja Verma",
    customerPhone: "98440-99887",
    vehicleType: "SUV (Hyundai Creta)",
    vehicleNumber: "KA 01 AB 8877",
    serviceName: "3D Wheel Alignment & Balancing (अलाइनमेंट)",
    shopName: "Star Tyre & Alignment Hub",
    status: "completed",
    date: "2026-08-18",
    timeSlot: "02:00 PM - 03:00 PM",
    notes: "Car pulling towards left at 80 km/h."
  },
  {
    id: "booking-103",
    customerName: "Anil Kumar",
    customerPhone: "99001-22334",
    vehicleType: "Bike (Royal Enfield 350)",
    vehicleNumber: "KA 04 EQ 1234",
    serviceName: "Doorstep Emergency Tyre Replacement (इमरजेंसी)",
    shopName: "Highway Tyre Care & Puncture Center",
    status: "pending",
    date: "2026-08-18",
    timeSlot: "05:00 PM - 06:00 PM",
    notes: "Rear tyre flat on Ring Road."
  }
];

const SAMPLE_ADMIN_INVOICES = [
  {
    id: "TS-INV-1001",
    invoiceNo: "TS-INV-1001",
    date: "2026-08-18",
    customerName: "Ahmad Raja",
    customerPhone: "9876543210",
    vehicleName: "Swift Dzire",
    vehicleNumber: "KA 05 MN 4589",
    shopName: "Shree Ram Tyre Center",
    items: [
      { id: "1", name: "MRF Zapper FX Tyre", type: "tyre", qty: 2, rate: 2100, amount: 4200 },
      { id: "2", name: "Tyre Cut Repair", type: "service", qty: 1, rate: 350, amount: 350 }
    ],
    subtotal: 4550,
    discount: 50,
    grandTotal: 4500,
    paymentMode: "upi",
    paymentStatus: "paid"
  },
  {
    id: "TS-INV-1002",
    invoiceNo: "TS-INV-1002",
    date: "2026-08-18",
    customerName: "Pooja Verma",
    customerPhone: "98440-99887",
    vehicleName: "Hyundai Creta",
    vehicleNumber: "KA 01 AB 8877",
    shopName: "Star Tyre & Alignment Hub",
    items: [
      { id: "1", name: "3D Wheel Alignment & Balancing", type: "service", qty: 1, rate: 450, amount: 450 },
      { id: "2", name: "Tubeless Puncture Repair", type: "service", qty: 2, rate: 100, amount: 200 }
    ],
    subtotal: 650,
    discount: 50,
    grandTotal: 600,
    paymentMode: "cash",
    paymentStatus: "paid"
  }
];

const SAMPLE_ADMIN_TICKETS = [
  {
    id: "TS-TCK-701",
    ticketNo: "TS-TCK-701",
    category: "Booking Issue",
    priority: "high",
    subject: "Doorstep emergency mechanic late by 25 mins",
    description: "Maine highway par puncture assistance book kiya tha, shopkeeper se contact nahi ho pa raha tha.",
    status: "open",
    userName: "Ahmad Raja",
    userEmail: "ahmad@example.com",
    userPhone: "9876543210",
    vehicleNumber: "KA 05 MN 4589",
    adminReply: "",
    createdAt: "2026-08-18"
  },
  {
    id: "TS-TCK-702",
    ticketNo: "TS-TCK-702",
    category: "Tyre Warranty Claim",
    priority: "medium",
    subject: "Apollo tyre sidewall bulge within 3 months",
    description: "Apollo tyre me side me bubble aa gaya hai. Iska warranty replacement process bataiye.",
    status: "in_progress",
    userName: "Pooja Verma",
    userEmail: "pooja@example.com",
    userPhone: "98440-99887",
    vehicleNumber: "KA 01 AB 8877",
    adminReply: "Claim under process.",
    createdAt: "2026-08-17"
  }
];

export default function AdminPanel() {
  const { user, profile, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview"); // overview, shops, bookings, tickets, excel

  // Admin Datasets State
  const [users, setUsers] = useState(SAMPLE_ADMIN_SHOPS);
  const [bookings, setBookings] = useState(SAMPLE_GLOBAL_BOOKINGS);
  const [invoices, setInvoices] = useState(SAMPLE_ADMIN_INVOICES);
  const [tickets, setTickets] = useState(SAMPLE_ADMIN_TICKETS);

  // Search & Filter
  const [searchUser, setSearchUser] = useState("");
  const [replyTicketModal, setReplyTicketModal] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Toggle Shop Verification Badge
  const handleToggleShopApproval = (uid) => {
    setUsers((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, shopApproved: !u.shopApproved } : u))
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

  // Calculations
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const totalShops = users.filter((u) => u.role === "vendor" || u.role === "admin").length;
  const pendingApprovals = users.filter((u) => u.role === "vendor" && !u.shopApproved).length;
  const openTickets = tickets.filter((t) => t.status === "open").length;

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
            Desh bhar ki shops, customers, bookings, billing aur support tickets ko ek hi dashboard se control karein.
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
          className={`admin-tab ${activeTab === "shops" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("shops")}
        >
          <Store size={16} /> Shops & Users ({users.length})
          {pendingApprovals > 0 && <span className="tab-bubble">{pendingApprovals} Pending</span>}
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
                          u.shopApproved ? (
                            <span className="badge-verified">✓ Verified Hub</span>
                          ) : (
                            <span className="badge-unverified">⏳ Pending Approval</span>
                          )
                        ) : (
                          <span className="text-muted">Customer</span>
                        )}
                      </td>
                      <td>
                        {(u.role === "vendor" || u.role === "admin") && (
                          <button
                            className={`btn-approval-toggle ${u.shopApproved ? "btn-unapprove" : "btn-approve"}`}
                            onClick={() => handleToggleShopApproval(u.uid)}
                          >
                            {u.shopApproved ? "Revoke Verification" : "✅ Approve Shop"}
                          </button>
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
          padding: 10px 10px 40px;
        }
        .admin-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 800px) {
          .admin-header-row { flex-direction: column; }
        }
        .admin-badge-strip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 800;
          color: #c0392b;
          letter-spacing: 0.5px;
          background: #fdedec;
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 6px;
        }
        .admin-page-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
        }
        .admin-page-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .btn-excel-top-action {
          background: #27ae60;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(39, 174, 96, 0.25);
        }

        /* Nav Tabs */
        .admin-nav-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 10px;
          margin-bottom: 24px;
          overflow-x: auto;
        }
        .admin-tab {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 9px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
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
          font-size: 10.5px;
          padding: 2px 6px;
          border-radius: 10px;
        }
        .tab-bubble-red {
          background: #e74c3c;
        }

        /* Stats Grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 1000px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .admin-stats-grid { grid-template-columns: 1fr; }
        }
        .admin-metric-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }
        .metric-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .metric-lbl {
          font-size: 12px;
          color: var(--text-muted);
          display: block;
        }
        .metric-val {
          font-size: 20px;
          font-weight: 800;
          margin: 2px 0;
          color: var(--text);
        }
        .metric-note {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Quick Links Grid */
        .admin-quick-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        @media (max-width: 800px) {
          .admin-quick-links-grid { grid-template-columns: 1fr; }
        }
        .shortcut-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .shortcut-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          border-color: #c0392b;
        }
        .sc-icon { font-size: 28px; margin-bottom: 8px; }
        .shortcut-box h4 { margin: 0 0 6px; font-size: 16px; color: var(--text); }
        .shortcut-box p { margin: 0 0 12px; font-size: 12.5px; color: var(--text-muted); line-height: 1.4; }
        .sc-arrow { font-size: 13px; font-weight: 700; color: #c0392b; }

        /* Section Toolbar */
        .section-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .search-bar-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 280px;
        }
        .search-bar-wrap svg {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .search-bar-wrap input {
          width: 100%;
          padding: 10px 12px 10px 36px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 13.5px;
        }
        .btn-export-excel-action {
          background: #27ae60;
          color: white;
          border: none;
          padding: 9px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Admin Data Table */
        .admin-table-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow-x: auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
        }
        .admin-data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .admin-data-table th {
          background: var(--surface-2);
          padding: 12px 14px;
          text-align: left;
          font-weight: 700;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
        }
        .admin-data-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        .shop-title-name {
          font-size: 14px;
          color: var(--text);
          display: block;
        }
        .user-subtext {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
        }
        .role-badge {
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .role-admin { background: #fdedec; color: #c0392b; }
        .role-vendor { background: #ebf5fb; color: #2980b9; }
        .role-customer { background: #f2f3f4; color: #7f8c8d; }

        .badge-verified {
          background: #eafaf1;
          color: #27ae60;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 11px;
        }
        .badge-unverified {
          background: #fef9e7;
          color: #d35400;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 11px;
        }
        .btn-approval-toggle {
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-approve { background: #27ae60; color: white; }
        .btn-unapprove { background: var(--surface-2); color: #c0392b; border: 1px solid var(--border); }

        .reg-badge {
          background: var(--bg);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 11px;
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
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .resolved-check {
          color: #27ae60;
          font-weight: 700;
          font-size: 12px;
        }
        .admin-reply-snippet {
          background: #f4fdf8;
          border-left: 2px solid #27ae60;
          padding: 4px 8px;
          font-size: 11.5px;
          margin-top: 4px;
        }

        /* Excel Center Grid */
        .admin-excel-center {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
        }
        .excel-center-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 16px;
        }
        .excel-center-header h2 { margin: 0 0 4px; font-size: 20px; }
        .excel-center-header p { margin: 0; font-size: 13px; color: var(--text-muted); }
        .excel-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 768px) {
          .excel-cards-grid { grid-template-columns: 1fr; }
        }
        .excel-download-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .ex-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .card-top h4 { margin: 0 0 2px; font-size: 15px; }
        .card-top small { color: var(--text-muted); font-size: 12px; }
        .excel-download-card p {
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0 0 16px;
        }
        .btn-download-csv {
          background: #27ae60;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s ease;
        }
        .btn-download-csv:hover { background: #219653; }
      `}</style>
    </div>
  );
}
