import React from "react";
import { NavLink } from "react-router-dom";
import { X, ShieldCheck } from "lucide-react";
import { MAIN_NAV_ITEMS, SHOP_NAV_ITEMS, ACCOUNT_NAV_ITEMS } from "../config/navItems.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar({ open, onClose }) {
  const { isAdmin, isVendor } = useAuth();

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
          <span>TyreSaathi</span>
        </div>
      </aside>

      <style>{`
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 39;
          backdrop-filter: blur(2px);
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 250px;
          background: var(--surface);
          border-right: 1px solid var(--border);
          z-index: 40;
          transform: translateX(-100%);
          transition: transform 0.22s ease;
          display: flex;
          flex-direction: column;
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
          font-size: 20px; 
          font-weight: 800;
          color: var(--heading, #1e293b);
          letter-spacing: 0.5px;
        }
        .sidebar-close { display: flex; }
        
        .sidebar-nav { 
          flex: 1; 
          padding: 12px 10px; 
          display: flex; 
          flex-direction: column; 
          gap: 2px;
          overflow-y: auto;
        }

        .nav-section-label {
          font-size: 10.5px;
          font-weight: 800;
          color: var(--text-muted, #94a3b8);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 6px 12px 2px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--text-muted, #64748b);
          text-decoration: none;
          font-weight: 600;
          font-size: 13.5px;
          transition: all 0.15s ease;
        }
        .sidebar-link:hover { 
          background: var(--surface-2, #f1f5f9); 
          color: var(--text, #1e293b);
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
          padding: 14px 16px;
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted, #94a3b8);
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
          }
          .sidebar-close { display: none; }
        }
      `}</style>
    </>
  );
}
