import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  ExternalLink
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
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterTab, setFilterTab] = useState("all");
  const [latestToast, setLatestToast] = useState(null);
  const dropdownRef = useRef(null);
  const prevCountRef = useRef(0);

  const userId = user?.uid || profile?.shopId || "";
  const userRole = profile?.role || (profile?.shopName ? "shop_owner" : "customer");

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
      user
    );

    return () => unsubscribe();
  }, [userId, userRole, profile, user]);

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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = async (notif) => {
    if (!notif.read) {
      await markNotificationAsRead(notif.id);
    }
    setIsOpen(false);
    setLatestToast(null);

    if (notif.link) {
      navigate(notif.link);
    } else if (notif.type === "booking_created" || notif.type === "booking_status") {
      navigate("/bookings");
    } else if (notif.type === "rating_received") {
      navigate("/store-location");
    }
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead(notifications);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
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
                <h4>Notifications</h4>
                <span className="notif-header-sub">Updates, Bookings & Ratings</span>
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
                <p>Nayi bookings, customer ratings aur system alerts yahan real-time dikhenge.</p>
              </div>
            ) : (
              <div className="notif-items-list">
                {(filterTab === "unread" ? notifications.filter((n) => !n.read) : notifications).map((notif) => (
                  <div
                    key={notif.id}
                    className={`notif-item-row ${!notif.read ? "notif-unread" : ""}`}
                    onClick={() => handleNotificationClick(notif)}
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
                    </div>

                    {!notif.read && <span className="unread-dot" title="Unread" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Quick Links */}
          <div className="notif-panel-footer">
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
          </div>
        </div>
      )}

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
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-bottom: 2px;
        }

        .notif-item-title {
          font-size: 12.5px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .notif-item-time {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 600;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .notif-item-msg {
          margin: 0;
          font-size: 11.5px;
          color: #64748b;
          line-height: 1.4;
          word-break: break-word;
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
        }
      `}</style>
    </div>
  );
}
