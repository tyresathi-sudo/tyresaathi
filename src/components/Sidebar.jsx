import React from "react";
import { NavLink, Link } from "react-router-dom";
import { X, ShieldCheck, User } from "lucide-react";
import { MAIN_NAV_ITEMS, SHOP_NAV_ITEMS, ACCOUNT_NAV_ITEMS } from "../config/navItems.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar({ open, onClose }) {
  const { user, profile, isAdmin, isVendor } = useAuth();

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

        {/* User Card in Mobile Drawer */}
        {user ? (
          <Link to="/profile" className="drawer-user-card" onClick={onClose}>
            <div className="drawer-avatar">
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="User" className="drawer-avatar-img" />
              ) : (
                <span className="drawer-avatar-text">{profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}</span>
              )}
            </div>
            <div className="drawer-user-info">
              <strong className="drawer-user-name">{profile?.name || "TyreSaathi User"}</strong>
              <span className="drawer-user-role">
                {profile?.role === "shop_owner" ? "🏪 Shop Owner" : (isAdmin ? "🛡️ Super Admin" : "👤 Customer")}
              </span>
            </div>
          </Link>
        ) : (
          <div className="drawer-auth-cta">
            <Link to="/login" className="drawer-login-btn" onClick={onClose}>
              <User size={15} /> Login / Register
            </Link>
          </div>
        )}

        <nav className="sidebar-nav">
          {/* 1. Main Navigation */}
          <div className="nav-section-label">Main Navigation</div>
          {MAIN_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          {/* 2. Shop & Workshop Section */}
          <div className="nav-section-label" style={{ marginTop: "14px" }}>Garage & Shop</div>
          {SHOP_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}

          {/* Exclusive Master Admin Link for Super Admin */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) => "sidebar-link admin-sidebar-link" + (isActive ? " sidebar-link-active" : "")}
              onClick={onClose}
            >
              <ShieldCheck size={18} color="#c0392b" />
              <span>Master Admin</span>
            </NavLink>
          )}

          {/* 3. Account & Support Section */}
          <div className="nav-section-label" style={{ marginTop: "14px" }}>Account & Help</div>
          {ACCOUNT_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
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
          width: 270px;
          background: var(--surface);
          border-right: 1px solid var(--border);
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
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1px solid var(--border);
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
          font-size: 1.15rem; /* text-lg */
          font-weight: 800;
          color: var(--text);
          letter-spacing: 0.5px;
        }
        .sidebar-close { 
          display: flex; 
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }
        
        .drawer-user-card {
          margin: 10px 10px 4px;
          padding: 8px 10px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text);
        }
        .drawer-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #c0392b;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.875rem;
          overflow: hidden;
          flex-shrink: 0;
        }
        .drawer-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .drawer-user-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .drawer-user-name {
          font-size: 0.8125rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .drawer-user-role {
          font-size: 0.6875rem;
          color: var(--orange);
          font-weight: 700;
        }
        .drawer-auth-cta {
          padding: 10px 10px 4px;
        }
        .drawer-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #c0392b;
          color: white;
          padding: 8px 10px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .sidebar-nav { 
          flex: 1; 
          padding: 6px 8px; 
          display: flex; 
          flex-direction: column; 
          gap: 2px;
          overflow-y: auto;
        }

        .nav-section-label {
          font-size: 0.6875rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 6px 10px 2px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 8px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.8125rem;
          transition: all 0.15s ease;
        }
        .sidebar-link:hover { 
          background: var(--surface-2); 
          color: var(--text);
        }
        .sidebar-link-active { 
          background: #c0392b !important; 
          color: #ffffff !important; 
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }
        .admin-sidebar-link {
          color: #c0392b;
        }
        
        .sidebar-footer {
          padding: 10px 12px;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          text-align: center;
        }

        /* Desktop: sidebar is permanent, no backdrop, no close button */
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
          .drawer-user-card,
          .drawer-auth-cta {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
