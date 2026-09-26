import React from "react";
import { NavLink, Link } from "react-router-dom";
import { X, ShieldCheck, User, MessageCircle, ChevronRight, LogOut } from "lucide-react";
import { 
  BUSINESS_NAV_ITEMS, 
  GROWTH_NAV_ITEMS, 
  SERVICE_NAV_ITEMS, 
  ACCOUNT_NAV_ITEMS 
} from "../config/navItems.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar({ open, onClose }) {
  const { user, profile, isAdmin, isVendor, logout } = useAuth();

  const supportWhatsappUrl = "https://wa.me/918877277757?text=" + encodeURIComponent("Hello TyreSaathi Support, I need assistance with my account/shop.");

  const shopNameDisplay = profile?.shopName || profile?.name || "TyreSaathi Partner";
  const userRoleDisplay = profile?.role === "shop_owner" 
    ? "🏪 Shop Owner" 
    : (isAdmin ? "🛡️ Super Admin" : "👤 Customer");

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={"sidebar" + (open ? " sidebar-open" : "")}>
        <div className="sidebar-header">
          <div className="sidebar-brand-group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="sidebar-logo-img" 
              onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }} 
            />
            <span className="brand-font sidebar-title">TyreSaathi</span>
          </div>
          <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* 🏪 Top Store Profile Card */}
        {user ? (
          <div className="drawer-profile-container">
            <Link to="/profile" className="drawer-store-card" onClick={onClose}>
              <div className="drawer-store-avatar">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="Store" className="drawer-avatar-img" />
                ) : (
                  <span className="store-avatar-icon">🏪</span>
                )}
              </div>
              <div className="drawer-store-info">
                <strong className="drawer-store-name">{shopNameDisplay}</strong>
                <div className="drawer-rating-row">
                  <span className="drawer-star-tag">⭐ 4.9 Verified Partner</span>
                </div>
                <span className="drawer-role-tag">{userRoleDisplay}</span>
              </div>
            </Link>

            {/* 🛡️ Exclusive Highlighted Master Admin Button for Super Admin */}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) => "sidebar-admin-card" + (isActive ? " sidebar-admin-active" : "")}
                onClick={onClose}
              >
                <div className="admin-card-inner">
                  <ShieldCheck size={18} color="#c0392b" />
                  <span className="admin-card-title">Master Admin Panel</span>
                </div>
                <ChevronRight size={16} color="#c0392b" />
              </NavLink>
            )}
          </div>
        ) : (
          <div className="drawer-auth-cta">
            <Link to="/login" className="drawer-login-btn" onClick={onClose}>
              <User size={15} /> Login / Register Account
            </Link>
          </div>
        )}

        <nav className="sidebar-nav">
          {/* 1. MANAGE BUSINESS */}
          <div className="nav-section-label">MANAGE BUSINESS</div>
          {BUSINESS_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
              onClick={onClose}
            >
              <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                <Icon size={16} />
              </div>
              <span className="nav-link-text">{label}</span>
              <ChevronRight size={14} className="nav-chevron" />
            </NavLink>
          ))}

          {/* 2. GROWTH & INSIGHTS */}
          <div className="nav-section-label" style={{ marginTop: "14px" }}>GROWTH & INSIGHTS</div>
          {GROWTH_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
              onClick={onClose}
            >
              <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                <Icon size={16} />
              </div>
              <span className="nav-link-text">{label}</span>
              <ChevronRight size={14} className="nav-chevron" />
            </NavLink>
          ))}

          {/* 3. CUSTOMER SERVICES */}
          <div className="nav-section-label" style={{ marginTop: "14px" }}>CUSTOMER SERVICES</div>
          {SERVICE_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
              onClick={onClose}
            >
              <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                <Icon size={16} />
              </div>
              <span className="nav-link-text">{label}</span>
              <ChevronRight size={14} className="nav-chevron" />
            </NavLink>
          ))}

          {/* 4. ACCOUNT & SUPPORT */}
          <div className="nav-section-label" style={{ marginTop: "14px" }}>ACCOUNT & SUPPORT</div>
          {ACCOUNT_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
              onClick={onClose}
            >
              <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                <Icon size={16} />
              </div>
              <span className="nav-link-text">{label}</span>
              <ChevronRight size={14} className="nav-chevron" />
            </NavLink>
          ))}

          {/* WhatsApp Support Direct Link */}
          <a
            href={supportWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link-modern"
            onClick={onClose}
          >
            <div className="nav-icon-badge" style={{ color: "#25D366", backgroundColor: "#f0fdf4" }}>
              <MessageCircle size={16} />
            </div>
            <span className="nav-link-text">WhatsApp Support</span>
            <ChevronRight size={14} className="nav-chevron" />
          </a>

          {/* Logout Button if user is logged in */}
          {user && (
            <button
              type="button"
              onClick={() => {
                logout();
                onClose();
              }}
              className="sidebar-link-modern btn-sidebar-logout"
            >
              <div className="nav-icon-badge" style={{ color: "#e11d48", backgroundColor: "#fff1f2" }}>
                <LogOut size={16} />
              </div>
              <span className="nav-link-text">Logout</span>
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <span>TyreSaathi • India's Verified Tyre Hub</span>
        </div>
      </aside>

      <style>{`
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1040;
          backdrop-filter: blur(3px);
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 290px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          z-index: 1050;
          transform: translateX(-100%);
          transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          padding-top: env(safe-area-inset-top, 0px);
        }
        .sidebar-open { transform: translateX(0); }
        .sidebar-header {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-brand-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sidebar-logo-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          border-radius: 6px;
        }
        .sidebar-title { 
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.5px;
        }
        .sidebar-close { 
          display: flex; 
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
        }
        
        .drawer-profile-container {
          padding: 10px 12px 4px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .drawer-store-card {
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }
        .drawer-store-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          overflow: hidden;
          flex-shrink: 0;
        }
        .drawer-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .drawer-store-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .drawer-store-name {
          font-size: 0.875rem;
          font-weight: 800;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .drawer-rating-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 1px;
        }
        .drawer-star-tag {
          font-size: 0.6875rem;
          color: #16a34a;
          font-weight: 700;
        }
        .drawer-role-tag {
          font-size: 0.6875rem;
          color: #64748b;
          font-weight: 600;
        }

        .sidebar-admin-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          background: #fff5f5;
          border: 1.5px solid #fecaca;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .admin-card-inner {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-card-title {
          font-size: 0.8125rem;
          font-weight: 800;
          color: #c0392b;
        }
        .sidebar-admin-active {
          background: #fee2e2;
          border-color: #ef4444;
        }

        .drawer-auth-cta {
          padding: 10px 12px 4px;
        }
        .drawer-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #c0392b;
          color: white;
          padding: 9px 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 0.8125rem;
          font-weight: 700;
        }

        .sidebar-nav { 
          flex: 1; 
          padding: 8px 10px; 
          display: flex; 
          flex-direction: column; 
          gap: 2px;
          overflow-y: auto;
        }

        .nav-section-label {
          font-size: 0.6875rem;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 8px 10px 4px;
        }

        .sidebar-link-modern {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          border-radius: 10px;
          color: #334155;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8125rem;
          transition: all 0.15s ease;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .sidebar-link-modern:hover { 
          background: #f8fafc; 
          color: #0f172a;
        }
        .nav-icon-badge {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nav-link-text {
          flex: 1;
        }
        .nav-chevron {
          color: #cbd5e1;
        }
        .link-active { 
          background: #f1f5f9 !important; 
          color: #0f172a !important; 
          font-weight: 800;
        }
        .link-active .nav-chevron {
          color: #0f172a;
        }
        .btn-sidebar-logout {
          margin-top: 10px;
        }
        .btn-sidebar-logout:hover {
          background: #fff1f2;
        }
        
        .sidebar-footer {
          padding: 10px 12px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: #94a3b8;
          border-top: 1px solid #f1f5f9;
          text-align: center;
        }

        /* Desktop */
        @media (min-width: 900px) {
          .sidebar-backdrop { display: none; }
          .sidebar {
            position: sticky;
            transform: none;
            top: 58px;
            height: calc(100vh - 58px);
            z-index: 10;
            box-shadow: none;
          }
          .sidebar-close { display: none; }
        }
      `}</style>
    </>
  );
}
