import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, PlusCircle } from "lucide-react"; // 👇 PlusCircle आइकॉन जोड़ा गया है
import { NAV_ITEMS } from "../config/navItems.js";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay backdrop, only shows when drawer is open */}
      {open && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={"sidebar" + (open ? " sidebar-open" : "")}>
        <div className="sidebar-header">
          <span className="brand-font sidebar-title">Menu</span>
          <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {/* पुराने मेनू आइटम्स */}
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
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

          {/* 👇 यह नया 'Add Product' का बटन जोड़ा गया है */}
          <NavLink
            to="/shop/add-product"
            className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
            onClick={onClose}
          >
            <PlusCircle size={18} />
            <span>Add Product</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <span>TyreSaathi v2 · Phase 1</span>
        </div>
      </aside>

      <style>{`
        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 39;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 240px;
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
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
          border-bottom: 1px solid var(--border);
        }
        .sidebar-title { font-size: 17px; }
        .sidebar-close { display: flex; }
        .sidebar-nav { flex: 1; padding: 10px; display: flex; flex-direction: column; gap: 2px; }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }
        .sidebar-link:hover { background: var(--surface-2); }
        .sidebar-link-active { background: var(--orange); color: white; }
        .sidebar-footer {
          padding: 14px;
          font-size: 11px;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
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
