import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Star, 
  Calendar, 
  Sparkles, 
  RefreshCw, 
  Megaphone, 
  Clock, 
  X,
  ChevronRight,
  ExternalLink,
  LifeBuoy,
  Store,
  ShieldAlert,
  User,
  Phone,
  MessageCircle,
  Car,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Layers,
  Eye
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { 
  listenUserNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from "../utils/notificationService";
import { playNotificationSound, triggerNotificationVibration } from "../utils/soundService";

export default function NotificationBell() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterTab, setFilterTab] = useState("all");
  const [latestToast, setLatestToast] = useState(null);
  const [selectedNotifDetail, setSelectedNotifDetail] = useState(null);
  const dropdownRef = useRef(null);
  const prevCountRef = useRef(0);

  const userId = user?.uid || profile?.shopId || "";
  const userRole = profile?.role || (profile?.shopName ? "shop_owner" : "customer");
  const isShopOwner = Boolean(
    profile?.shopName || 
    profile?.role === "shop_owner" || 
    profile?.role === "vendor" ||
    userRole === "shop_owner" ||
    userRole === "vendor"
  );

  useEffect(() => {
    const unsubscribe = listenUserNotifications(
      userId, 
      userRole, 
      (list) => {
        setNotifications(list);

        // Check if a new unread notification arrived in real-time
        const unreadList = list.filter((n) => !n.read);
        if (unreadList.length > prevCountRef.current && unreadList[0]) {
          const newest = unreadList[0];
          // 🔔 Play notification sound & trigger vibration
          playNotificationSound();
          triggerNotificationVibration("medium");

          // Show in-app live toast
          setLatestToast(newest);
          const timer = setTimeout(() => {
            setLatestToast(null);
          }, 5000);
          return () => clearTimeout(timer);
        }
        prevCountRef.current = unreadList.length;
      },
      profile,
      user,
      isAdminRoute
    );

    return () => unsubscribe();
  }, [userId, userRole, profile, user, isAdminRoute]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC key to close detail modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setSelectedNotifDetail(null);
      }
    }
    if (selectedNotifDetail) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNotifDetail]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Smart parser to extract structured detail fields for both Shop Owner and Customer
  const parseNotificationDetails = (notif) => {
    if (!notif) return {};
    const d = notif.data || {};
    const msg = notif.message || "";
    const title = notif.title || "";

    // 1. Service / Tyre name
    let serviceName = d.serviceName || d.tyreName || d.productName || "";
    if (!serviceName) {
      const m1 = msg.match(/ne\s*["']([^"']+)["']\s*(?:\([^)]+\))?\s*ke liye/i);
      const m2 = msg.match(/Aapki\s*["']([^"']+)["']\s*booking/i);
      const m3 = msg.match(/for\s*([^,\n]+?)\s*on\s+\d/i);
      if (m1) serviceName = m1[1].trim();
      else if (m2) serviceName = m2[1].trim();
      else if (m3) serviceName = m3[1].trim();
    }

    // 2. Shop Name
    let shopName = d.shopName || "";
    if (!shopName) {
      const m1 = msg.match(/at\s*["']([^"']+)["']/i);
      const m2 = msg.match(/shop\s*["']([^"']+)["']/i);
      const m3 = title.match(/at\s+([^!.]+)/i);
      if (m1) shopName = m1[1].trim();
      else if (m2) shopName = m2[1].trim();
      else if (m3) shopName = m3[1].trim();
    }

    // 3. Status
    let status = d.status || "";
    if (!status) {
      const m1 = title.match(/Booking Status Update:\s*([A-Za-z_-]+)/i);
      const m2 = msg.match(/status ab\s*["']([^"']+)["']/i);
      if (m1) status = m1[1].trim();
      else if (m2) status = m2[1].trim();
    }

    // 4. Customer Name & Phone
    let customerName = d.customerName || "";
    let customerPhone = d.customerPhone || "";
    if (!customerPhone) {
      const phoneMatch = msg.match(/(\d{10})/);
      if (phoneMatch) customerPhone = phoneMatch[1];
    }
    if (!customerName) {
      const nameMatch = msg.match(/^([A-Za-z0-9\s]+?)\s*\(\d{10}\)/);
      if (nameMatch) customerName = nameMatch[1].trim();
      else if (msg.includes("ne aapki shop")) {
        const revMatch = msg.match(/^([A-Za-z0-9\s]+?)\s+ne aapki shop/i);
        if (revMatch) customerName = revMatch[1].trim();
      }
    }

    // 5. Vehicle Number
    let vehicleNumber = d.vehicleNumber || "";
    if (!vehicleNumber) {
      const vMatch = msg.match(/\(([A-Za-z]{2}\s*\d{1,2}\s*[A-Za-z]{0,3}\s*\d{3,4})\)/i);
      if (vMatch) vehicleNumber = vMatch[1].trim();
    }

    // 6. Rating & Reviewer
    let rating = d.rating || "";
    let reviewerName = d.reviewerName || customerName || "";
    if (!rating) {
      const rMatch = title.match(/(\d+)\s*[- ]Star/i) || msg.match(/(\d+)\s*Star/i);
      if (rMatch) rating = rMatch[1];
    }
    if (!reviewerName && msg.includes("ne aapki shop")) {
      const rMatch = msg.match(/^([A-Za-z0-9\s]+?)\s+ne aapki shop/i);
      if (rMatch) reviewerName = rMatch[1].trim();
    }

    // 7. Booking ID
    let bookingId = d.bookingId || "";
    if (!bookingId) {
      const bMatch = msg.match(/Booking\s*#([A-Za-z0-9_-]+)/i);
      if (bMatch) bookingId = bMatch[1];
    }

    // 8. Shop Phone
    let shopPhone = d.shopPhone || "";

    // 9. Booking Date & Time Slot
    let bookingDate = d.bookingDate || "";
    let bookingTimeSlot = d.bookingTimeSlot || "";
    if (!bookingDate) {
      const dtMatch = msg.match(/on\s+(\d{1,2}\s+[A-Za-z]+)\s*(?:\(([^)]+)\))?/i);
      if (dtMatch) {
        bookingDate = dtMatch[1];
        if (dtMatch[2]) bookingTimeSlot = dtMatch[2];
      }
    }

    // 10. Support Ticket No
    let ticketNo = d.ticketNo || "";
    if (!ticketNo) {
      const tMatch = title.match(/#?([A-Za-z]{2,5}-\d{3,})/i) || msg.match(/#?([A-Za-z]{2,5}-\d{3,})/i);
      if (tMatch) ticketNo = tMatch[1];
    }

    return {
      serviceName,
      shopName,
      status,
      customerName,
      customerPhone,
      vehicleNumber,
      rating,
      reviewerName,
      bookingId,
      shopPhone,
      bookingDate,
      bookingTimeSlot,
      ticketNo
    };
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    const s = String(status).toLowerCase();
    if (s.includes("complete") || s.includes("finish") || s.includes("done")) {
      return { label: "COMPLETED", color: "#16a34a", bg: "#dcfce7", border: "#bbf7d0" };
    }
    if (s.includes("progress") || s.includes("running") || s.includes("process")) {
      return { label: "IN PROGRESS", color: "#2563eb", bg: "#dbeafe", border: "#bfdbfe" };
    }
    if (s.includes("accept") || s.includes("confirm")) {
      return { label: "ACCEPTED", color: "#4f46e5", bg: "#e0e7ff", border: "#c7d2fe" };
    }
    if (s.includes("reject") || s.includes("cancel")) {
      return { label: "CANCELLED", color: "#dc2626", bg: "#fee2e2", border: "#fecaca" };
    }
    return { label: String(status).toUpperCase(), color: "#d97706", bg: "#fef3c7", border: "#fde68a" };
  };

  const handleNotificationClick = async (notif) => {
    if (!notif) return;
    if (!notif.read) {
      await markNotificationAsRead(notif.id);
    }
    setIsOpen(false);
    setLatestToast(null);
    setSelectedNotifDetail(notif);
  };

  const handleNavigateFromDetail = (notif) => {
    setSelectedNotifDetail(null);
    if (!notif) return;
    if (notif.link) {
      navigate(notif.link);
    } else if (notif.type === "ticket_created" || notif.type === "support_ticket" || notif.type === "ticket") {
      navigate(isAdminRoute ? "/admin?tab=support" : "/support");
    } else if (notif.type === "shop_registered" || notif.type === "verification_requested" || notif.type === "vendor_registration") {
      navigate("/admin?tab=shops");
    } else if (notif.type === "booking_created" || notif.type === "booking_status") {
      navigate("/bookings");
    } else if (notif.type === "rating_received") {
      navigate("/store-location");
    } else {
      navigate("/bookings");
    }
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead(notifications);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "ticket_created":
      case "support_ticket":
      case "ticket":
        return <div className="notif-icon-box notif-icon-ticket" style={{ background: "#fef2f2", color: "#dc2626" }}><LifeBuoy size={16} /></div>;
      case "shop_registered":
      case "verification_requested":
      case "vendor_registration":
      case "partner_applied":
        return <div className="notif-icon-box notif-icon-shop" style={{ background: "#fffbeb", color: "#d97706" }}><Store size={16} /></div>;
      case "admin_alert":
      case "dispute":
        return <div className="notif-icon-box" style={{ background: "#fee2e2", color: "#b91c1c" }}><ShieldAlert size={16} /></div>;
      case "rating_received":
        return <div className="notif-icon-box notif-icon-star"><Star size={16} fill="#f59e0b" color="#f59e0b" /></div>;
      case "booking_created":
        return <div className="notif-icon-box notif-icon-booking"><Calendar size={16} color="#2563eb" /></div>;
      case "booking_status":
        return <div className="notif-icon-box notif-icon-status"><RefreshCw size={16} color="#16a34a" /></div>;
      case "app_update":
        return <div className="notif-icon-box notif-icon-update"><Sparkles size={16} color="#8b5cf6" /></div>;
      default:
        return <div className="notif-icon-box notif-icon-general"><Megaphone size={16} color="#c0392b" /></div>;
    }
  };

  return (
    <div className="notification-bell-wrapper" ref={dropdownRef}>
      {/* 🔔 Bell Button */}
      <button 
        type="button" 
        className={`bell-trigger-btn ${unreadCount > 0 ? "has-unread" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications & Alerts"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="bell-badge-count">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* 📱 Real-Time Floating Live Toast (Appears when new event happens) */}
      {latestToast && !isOpen && (
        <div 
          className="live-notif-toast"
          onClick={() => handleNotificationClick(latestToast)}
        >
          <div className="toast-left">
            {getNotificationIcon(latestToast.type)}
            <div className="toast-text">
              <strong>{latestToast.title}</strong>
              <p>{latestToast.message}</p>
            </div>
          </div>
          <button 
            className="toast-close-btn" 
            onClick={(e) => { e.stopPropagation(); setLatestToast(null); }}
            aria-label="Close Toast"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 📱 Mobile Soft Backdrop */}
      {isOpen && (
        <div 
          className="notif-mobile-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 📋 Notification Dropdown Panel (Responsive on all screen sizes) */}
      {isOpen && (
        <div className="notification-dropdown-panel" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="notif-panel-header">
            <div className="notif-header-title">
              <div className="notif-bell-icon-badge">
                <Bell size={16} color="#ffffff" />
              </div>
              <div className="notif-title-texts">
                <h4>{isAdminRoute ? "Admin Alerts Desk" : "Notifications"}</h4>
                <span className="notif-header-sub">
                  {isAdminRoute ? "Tickets Raised, Hub Approvals & Platform Alerts" : "Updates, Bookings & Ratings"}
                </span>
              </div>
              {unreadCount > 0 && (
                <span className="unread-pill">{unreadCount} New</span>
              )}
            </div>

            <div className="notif-header-actions">
              {unreadCount > 0 && (
                <button 
                  type="button" 
                  className="btn-mark-all-read" 
                  onClick={handleMarkAllRead}
                  title="Mark all as read"
                >
                  <CheckCheck size={13} />
                  <span>Mark read</span>
                </button>
              )}
              <button 
                type="button" 
                className="btn-close-notif-panel"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Quick Filter Switch Tabs */}
          <div className="notif-tabs-bar">
            <button
              type="button"
              className={`notif-tab-btn ${filterTab === "all" ? "tab-active" : ""}`}
              onClick={() => setFilterTab("all")}
            >
              All Alerts <span className="tab-count">{notifications.length}</span>
            </button>
            <button
              type="button"
              className={`notif-tab-btn ${filterTab === "unread" ? "tab-active" : ""}`}
              onClick={() => setFilterTab("unread")}
            >
              Unread <span className="tab-count tab-count-unread">{unreadCount}</span>
            </button>
          </div>

          {/* Body List */}
          <div className="notif-panel-body">
            {(filterTab === "unread" ? notifications.filter((n) => !n.read) : notifications).length === 0 ? (
              <div className="notif-empty-state">
                <div className="notif-empty-icon">
                  <Bell size={26} color="#94a3b8" />
                </div>
                <h5>{filterTab === "unread" ? "Koi Unread Notification Nahi Hai" : "Koi Nayi Notification Nahi Hai"}</h5>
                <p>
                  {isAdminRoute
                    ? "Naye support tickets, shop verification requests aur admin alerts yahan real-time dikhenge."
                    : "Nayi bookings, customer ratings aur system alerts yahan real-time dikhenge."}
                </p>
              </div>
            ) : (
              <div className="notif-items-list">
                {(filterTab === "unread" ? notifications.filter((n) => !n.read) : notifications).map((notif) => (
                  <div
                    key={notif.id}
                    className={`notif-item-row ${!notif.read ? "notif-unread" : ""}`}
                    onClick={() => handleNotificationClick(notif)}
                    title="Click to view full details (विवरण देखने के लिए क्लिक करें)"
                  >
                    {getNotificationIcon(notif.type)}

                    <div className="notif-item-content">
                      <div className="notif-item-top">
                        <span className="notif-item-title">{notif.title}</span>
                        <span className="notif-item-time">
                          <Clock size={10} style={{ display: "inline", marginRight: "3px" }} />
                          {notif.dateStr || "Recently"}
                        </span>
                      </div>
                      <p className="notif-item-msg">{notif.message}</p>
                      <div className="notif-item-action-hint">
                        <span>Tap to view details (विवरण देखें)</span>
                        <ChevronRight size={12} />
                      </div>
                    </div>

                    {!notif.read && <span className="unread-dot" title="Unread" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Quick Links */}
          <div className="notif-panel-footer">
            {isAdminRoute ? (
              <>
                <button 
                  type="button" 
                  className="btn-view-bookings"
                  onClick={() => { setIsOpen(false); navigate("/admin?tab=support"); }}
                >
                  <LifeBuoy size={13} /> Support Desk
                </button>
                <button 
                  type="button" 
                  className="btn-view-shops"
                  onClick={() => { setIsOpen(false); navigate("/admin?tab=shops"); }}
                >
                  <Store size={13} /> Hubs & Verification
                </button>
              </>
            ) : (
              <>
                <button 
                  type="button" 
                  className="btn-view-bookings"
                  onClick={() => { setIsOpen(false); navigate("/bookings"); }}
                >
                  <Calendar size={13} /> View Bookings
                </button>
                <button 
                  type="button" 
                  className="btn-view-shops"
                  onClick={() => { setIsOpen(false); navigate("/store-location"); }}
                >
                  <Star size={13} /> View Shops & Ratings
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🪟 Full Notification Details Modal (Both Shop Owner & Customer) */}
      {selectedNotifDetail && (() => {
        const details = parseNotificationDetails(selectedNotifDetail);
        const statusBadge = getStatusBadge(details.status);
        const isBooking = 
          selectedNotifDetail.type === "booking_created" || 
          selectedNotifDetail.type === "booking_status" || 
          Boolean(details.serviceName) ||
          Boolean(details.vehicleNumber);
        const isRating = selectedNotifDetail.type === "rating_received" || Boolean(details.rating);
        const isTicket = selectedNotifDetail.type?.includes("ticket") || Boolean(details.ticketNo);

        const contactPhone = isShopOwner 
          ? (details.customerPhone || details.shopPhone) 
          : (details.shopPhone || details.customerPhone);

        return (
          <div className="notif-modal-backdrop" onClick={() => setSelectedNotifDetail(null)}>
            <div className="notif-modal-card" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="notif-modal-header">
                <div className="notif-modal-header-left">
                  {getNotificationIcon(selectedNotifDetail.type)}
                  <div>
                    <span className="notif-modal-category">
                      {isBooking 
                        ? (selectedNotifDetail.type === "booking_status" ? "Booking Status Update (स्थिति अपडेट)" : "Service Booking (सर्विस बुकिंग)")
                        : isRating 
                        ? "Shop Rating & Review (ग्राहक समीक्षा)" 
                        : isTicket 
                        ? "Helpdesk & Support Ticket (सपोर्ट टिकट)" 
                        : "Notification Alert (अलर्ट)"}
                    </span>
                    <div className="notif-modal-time">
                      <Clock size={11} style={{ display: "inline", marginRight: "4px" }} />
                      {selectedNotifDetail.dateStr || "Recently"}
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="notif-modal-close-btn"
                  onClick={() => setSelectedNotifDetail(null)}
                  title="Close (बंद करें)"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Body */}
              <div className="notif-modal-body">
                {/* Hero Message Box */}
                <div className="notif-hero-box">
                  <h3 className="notif-hero-title">{selectedNotifDetail.title}</h3>
                  <p className="notif-hero-msg">{selectedNotifDetail.message}</p>
                </div>

                {/* Structured Key Details */}
                <div className="notif-details-grid">
                  {/* Booking Details */}
                  {isBooking && (
                    <>
                      {details.serviceName && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Wrench size={13} color="#2563eb" />
                            Tyre / Service
                          </span>
                          <span className="notif-field-val font-semibold">{details.serviceName}</span>
                        </div>
                      )}

                      {statusBadge && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <RefreshCw size={13} color="#16a34a" />
                            Current Status
                          </span>
                          <span 
                            className="notif-status-pill"
                            style={{ 
                              color: statusBadge.color, 
                              background: statusBadge.bg, 
                              borderColor: statusBadge.border 
                            }}
                          >
                            {statusBadge.label}
                          </span>
                        </div>
                      )}

                      {details.vehicleNumber && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Car size={13} color="#4f46e5" />
                            Vehicle Number
                          </span>
                          <span className="notif-field-val uppercase font-mono font-bold">{details.vehicleNumber}</span>
                        </div>
                      )}

                      {details.shopName && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Store size={13} color="#d97706" />
                            Shop Name
                          </span>
                          <span className="notif-field-val">{details.shopName}</span>
                        </div>
                      )}

                      {details.customerName && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <User size={13} color="#059669" />
                            Customer
                          </span>
                          <span className="notif-field-val">{details.customerName}</span>
                        </div>
                      )}

                      {contactPhone && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Phone size={13} color="#0891b2" />
                            {isShopOwner ? "Customer Mobile" : "Shop Contact"}
                          </span>
                          <span className="notif-field-val font-mono font-semibold">+91 {contactPhone}</span>
                        </div>
                      )}

                      {details.bookingDate && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Calendar size={13} color="#7c3aed" />
                            Date & Slot
                          </span>
                          <span className="notif-field-val">
                            {details.bookingDate} {details.bookingTimeSlot ? `(${details.bookingTimeSlot})` : ""}
                          </span>
                        </div>
                      )}

                      {details.bookingId && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Layers size={13} color="#64748b" />
                            Booking Ref
                          </span>
                          <span className="notif-field-val font-mono text-xs text-slate-500">#{details.bookingId}</span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Rating Details */}
                  {isRating && (
                    <>
                      {details.reviewerName && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <User size={13} color="#d97706" />
                            Customer Reviewer
                          </span>
                          <span className="notif-field-val font-semibold">
                            {details.reviewerName}
                            <span className="verified-badge-pill">Verified</span>
                          </span>
                        </div>
                      )}

                      {details.rating && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Star size={13} color="#f59e0b" />
                            Rating Given
                          </span>
                          <span className="notif-rating-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                fill={i < Number(details.rating) ? "#f59e0b" : "#e2e8f0"} 
                                color={i < Number(details.rating) ? "#f59e0b" : "#cbd5e1"} 
                              />
                            ))}
                            <strong style={{ color: "#d97706", marginLeft: "4px" }}>{details.rating} / 5 Stars</strong>
                          </span>
                        </div>
                      )}

                      {details.shopName && (
                        <div className="notif-field-row">
                          <span className="notif-field-label">
                            <Store size={13} color="#64748b" />
                            Shop Rated
                          </span>
                          <span className="notif-field-val">{details.shopName}</span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Support Ticket Details */}
                  {isTicket && details.ticketNo && (
                    <div className="notif-field-row">
                      <span className="notif-field-label">
                        <LifeBuoy size={13} color="#dc2626" />
                        Ticket Ref
                      </span>
                      <span className="notif-field-val font-mono font-bold" style={{ color: "#dc2626" }}>#{details.ticketNo}</span>
                    </div>
                  )}

                  {/* General / Generic Notice */}
                  {!isBooking && !isRating && !isTicket && (
                    <div className="notif-field-row">
                      <span className="notif-field-label">
                        <AlertCircle size={13} color="#2563eb" />
                        Notification Type
                      </span>
                      <span className="notif-field-val capitalize">{selectedNotifDetail.type || "General Alert"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="notif-modal-footer">
                {contactPhone && (
                  <a 
                    href={`tel:+91${contactPhone}`}
                    className="notif-btn-call"
                    title={`Call +91 ${contactPhone}`}
                  >
                    <Phone size={13} /> Call
                  </a>
                )}

                {contactPhone && (
                  <a 
                    href={`https://wa.me/91${contactPhone}?text=${encodeURIComponent(`Namaste! TyreSaathi par aapki booking ke sambandh me sampark kiya ja raha hai.`)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="notif-btn-whatsapp"
                    title="WhatsApp Chat"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                )}

                <button 
                  type="button" 
                  className="notif-btn-primary"
                  onClick={() => handleNavigateFromDetail(selectedNotifDetail)}
                >
                  {isBooking ? (
                    <>
                      <Calendar size={14} /> Open in Bookings
                    </>
                  ) : isRating ? (
                    <>
                      <Star size={14} /> View Shop Reviews
                    </>
                  ) : isTicket ? (
                    <>
                      <LifeBuoy size={14} /> Open Support Desk
                    </>
                  ) : (
                    <>
                      <ExternalLink size={14} /> View Details
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="notif-btn-secondary"
                  onClick={() => setSelectedNotifDetail(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Scoped Styles for Notification Bell & Panel */}
      <style>{`
        .notification-bell-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .bell-trigger-btn {
          position: relative;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          color: #475569;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .bell-trigger-btn:hover {
          background: #fef2f2;
          border-color: #fca5a5;
          color: #c0392b;
          transform: translateY(-1px);
        }

        .bell-trigger-btn.has-unread {
          color: #c0392b;
          border-color: #fca5a5;
          background: #fff5f5;
        }

        .bell-badge-count {
          position: absolute;
          top: -3px;
          right: -3px;
          background: #dc2626;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.4);
          animation: pulseBadge 2s infinite;
        }

        @keyframes pulseBadge {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        /* 📱 Floating Live Notification Toast */
        .live-notif-toast {
          position: fixed;
          top: 75px;
          right: 20px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-left: 4px solid #c0392b;
          border-radius: 14px;
          padding: 12px 16px;
          max-width: 360px;
          width: calc(100vw - 40px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          z-index: 999999;
          cursor: pointer;
          animation: slideInToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInToast {
          from { transform: translateX(100%) scale(0.9); opacity: 0; }
          to { transform: translateX(0) scale(1); opacity: 1; }
        }

        .toast-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }

        .toast-text {
          flex: 1;
          min-width: 0;
        }
        .toast-text strong {
          display: block;
          font-size: 13px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2px;
        }
        .toast-text p {
          margin: 0;
          font-size: 11.5px;
          color: #64748b;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .toast-close-btn {
          background: #f1f5f9;
          border: none;
          color: #64748b;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        /* 📱 Mobile Backdrop */
        .notif-mobile-backdrop {
          display: none;
        }

        /* Desktop Dropdown Panel */
        .notification-dropdown-panel {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 410px;
          max-width: 92vw;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.04);
          z-index: 999999;
          overflow: hidden;
          animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .notif-panel-header {
          background: #ffffff;
          padding: 14px 18px 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .notif-header-title {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .notif-bell-icon-badge {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(192, 57, 43, 0.25);
        }
        .notif-title-texts h4 {
          margin: 0;
          font-size: 14.5px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }
        .notif-header-sub {
          display: block;
          font-size: 10.5px;
          color: #64748b;
          margin-top: 1px;
        }

        .unread-pill {
          background: #fef2f2;
          color: #dc2626;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid #fecaca;
          white-space: nowrap;
        }

        .notif-header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .btn-mark-all-read {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #2563eb;
          font-size: 11px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 5px 9px;
          border-radius: 8px;
          transition: all 0.15s ease;
        }
        .btn-mark-all-read:hover {
          background: #eff6ff;
          border-color: #bfdbfe;
        }

        .btn-close-notif-panel {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .btn-close-notif-panel:hover {
          background: #fee2e2;
          color: #dc2626;
          border-color: #fca5a5;
        }

        /* Tabs Bar */
        .notif-tabs-bar {
          display: flex;
          gap: 6px;
          padding: 0 16px 10px;
          border-bottom: 1px solid #f1f5f9;
        }
        .notif-tab-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: all 0.15s ease;
        }
        .notif-tab-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .notif-tab-btn.tab-active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }
        .tab-count {
          font-size: 10px;
          background: rgba(0,0,0,0.08);
          padding: 1px 5px;
          border-radius: 8px;
        }
        .notif-tab-btn.tab-active .tab-count {
          background: rgba(255,255,255,0.2);
          color: #ffffff;
        }
        .tab-count-unread {
          background: #fee2e2 !important;
          color: #dc2626 !important;
        }

        .notif-panel-body {
          max-height: 380px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 6px 0;
        }

        /* Sleek custom scrollbar */
        .notif-panel-body::-webkit-scrollbar {
          width: 5px;
        }
        .notif-panel-body::-webkit-scrollbar-track {
          background: transparent;
        }
        .notif-panel-body::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .notif-panel-body::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .notif-empty-state {
          padding: 40px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .notif-empty-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2px;
        }
        .notif-empty-state h5 {
          margin: 0;
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
        }
        .notif-empty-state p {
          margin: 0;
          font-size: 12px;
          color: #64748b;
          max-width: 260px;
          line-height: 1.4;
        }

        .notif-items-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 8px;
        }

        .notif-item-row {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 10px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
          position: relative;
          background: #ffffff;
          border: 1px solid transparent;
        }
        .notif-item-row:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
        }

        .notif-item-row.notif-unread {
          background: #fffcfc;
          border-color: #fecaca;
        }
        .notif-item-row.notif-unread:hover {
          background: #fff5f5;
        }

        .notif-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }
        .notif-icon-star { background: #fef3c7; border: 1px solid #fde68a; }
        .notif-icon-booking { background: #eff6ff; border: 1px solid #bfdbfe; }
        .notif-icon-status { background: #ecfdf5; border: 1px solid #a7f3d0; }
        .notif-icon-update { background: #f5f3ff; border: 1px solid #ddd6fe; }
        .notif-icon-general { background: #fee2e2; border: 1px solid #fecaca; }

        .notif-item-content {
          flex: 1;
          min-width: 0;
        }

        .notif-item-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 3px;
        }

        .notif-item-title {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.35;
          word-break: break-word;
        }

        .notif-item-time {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
          flex-shrink: 0;
          white-space: nowrap;
          margin-top: 1px;
        }

        .notif-item-msg {
          margin: 0;
          font-size: 12px;
          color: #64748b;
          line-height: 1.45;
          word-break: break-word;
        }

        .notif-item-action-hint {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10.5px;
          font-weight: 700;
          color: #c0392b;
          margin-top: 5px;
          opacity: 0.85;
          transition: all 0.15s ease;
        }
        .notif-item-row:hover .notif-item-action-hint {
          opacity: 1;
          transform: translateX(2px);
        }

        .unread-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #dc2626;
          margin-top: 5px;
          flex-shrink: 0;
          box-shadow: 0 0 0 2.5px rgba(220, 38, 38, 0.2);
        }

        .notif-panel-footer {
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          padding: 10px 14px;
          display: flex;
          gap: 8px;
        }

        .btn-view-bookings, .btn-view-shops {
          flex: 1;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          color: #334155;
          padding: 7px 10px;
          border-radius: 10px;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
          transition: all 0.15s ease;
        }
        .btn-view-bookings:hover, .btn-view-shops:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #0f172a;
        }

        /* 🪟 Notification Detail Modal & Backdrop */
        .notif-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999999;
          padding: 16px;
          animation: notifBackdropFadeIn 0.2s ease-out;
        }

        @keyframes notifBackdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .notif-modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 490px;
          width: 100%;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.35);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          overflow: hidden;
          animation: notifModalScaleUp 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes notifModalScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .notif-modal-header {
          padding: 16px 20px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .notif-modal-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .notif-modal-category {
          display: block;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #dc2626;
        }

        .notif-modal-time {
          display: flex;
          align-items: center;
          font-size: 11.5px;
          color: #64748b;
          font-weight: 600;
          margin-top: 2px;
        }

        .notif-modal-close-btn {
          background: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .notif-modal-close-btn:hover {
          background: #fee2e2;
          color: #dc2626;
          transform: rotate(90deg);
        }

        .notif-modal-body {
          padding: 18px 20px;
          overflow-y: auto;
          flex: 1;
        }

        .notif-hero-box {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }

        .notif-hero-title {
          font-size: 15px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
          line-height: 1.4;
          word-break: break-word;
        }

        .notif-hero-msg {
          font-size: 13px;
          color: #334155;
          margin: 0;
          line-height: 1.55;
          word-break: break-word;
        }

        .notif-details-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #f1f5f9;
          border-radius: 14px;
          padding: 10px;
        }

        .notif-field-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 10px;
          font-size: 12.5px;
          gap: 10px;
        }

        .notif-field-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #64748b;
          font-weight: 600;
          flex-shrink: 0;
          font-size: 12px;
        }

        .notif-field-val {
          color: #0f172a;
          font-weight: 700;
          text-align: right;
          word-break: break-word;
          font-size: 12.5px;
        }

        .notif-status-pill {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid transparent;
          letter-spacing: 0.3px;
        }

        .notif-rating-stars {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .verified-badge-pill {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #059669;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
          margin-left: 6px;
        }

        .notif-modal-footer {
          padding: 14px 20px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .notif-btn-call {
          background: #16a34a;
          color: #ffffff !important;
          font-size: 12px;
          font-weight: 700;
          padding: 9px 14px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.15s ease;
          border: none;
          cursor: pointer;
        }
        .notif-btn-call:hover {
          background: #15803d;
          transform: translateY(-1px);
        }

        .notif-btn-whatsapp {
          background: #25d366;
          color: #ffffff !important;
          font-size: 12px;
          font-weight: 700;
          padding: 9px 14px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.15s ease;
          border: none;
          cursor: pointer;
        }
        .notif-btn-whatsapp:hover {
          background: #1eb857;
          transform: translateY(-1px);
        }

        .notif-btn-primary {
          flex: 1;
          min-width: 140px;
          background: #c0392b;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 700;
          padding: 9px 14px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.25);
          transition: all 0.15s ease;
        }
        .notif-btn-primary:hover {
          background: #a93226;
          transform: translateY(-1px);
        }

        .notif-btn-secondary {
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #475569;
          font-size: 12.5px;
          font-weight: 700;
          padding: 9px 14px;
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .notif-btn-secondary:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          color: #0f172a;
        }

        /* 📱 Mobile Responsive Compact View (< 640px) */
        @media (max-width: 640px) {
          .notif-mobile-backdrop {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(3px);
            z-index: 999990;
            animation: fadeInBackdrop 0.15s ease-out;
          }

          @keyframes fadeInBackdrop {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .notification-dropdown-panel {
            position: fixed !important;
            top: 56px !important;
            right: 12px !important;
            left: auto !important;
            width: calc(100vw - 24px) !important;
            max-width: 370px !important;
            max-height: 480px !important;
            border-radius: 18px !important;
            box-shadow: 0 16px 45px rgba(0, 0, 0, 0.28) !important;
            z-index: 999999 !important;
          }

          .notif-panel-body {
            max-height: 310px !important;
          }

          .notif-modal-card {
            max-width: 95vw !important;
            max-height: 85vh !important;
            border-radius: 16px !important;
          }
          .notif-modal-header {
            padding: 12px 16px !important;
          }
          .notif-modal-body {
            padding: 14px 16px !important;
          }
          .notif-modal-footer {
            padding: 12px 16px !important;
          }
          .notif-btn-primary, .notif-btn-call, .notif-btn-whatsapp {
            flex: 1 1 100% !important;
            justify-content: center !important;
          }
          .notif-btn-secondary {
            flex: 1 1 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
