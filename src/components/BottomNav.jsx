import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, Store, Receipt, Calendar } from "lucide-react";
import { triggerHaptic } from "../utils/nativeBridge.js";

export default function BottomNav() {
  const navLinks = [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/search", label: "Search", icon: Search },
    { to: "/store-location", label: "Stores", icon: Store },
    { to: "/billing", label: "Invoices", icon: Receipt },
    { to: "/bookings", label: "Bookings", icon: Calendar },
  ];

  return (
    <nav className="bottom-nav">
      {navLinks.map((item, idx) => {
        const { to, label, icon: Icon, end } = item;

        return (
          <NavLink
            key={to || idx}
            to={to}
            end={end}
            onClick={() => triggerHaptic("light")}
            className={({ isActive }) => "bottom-nav-btn" + (isActive ? " bottom-nav-btn-active" : "")}
          >
            <div className="icon-wrapper">
              <Icon size={19} />
            </div>
            <span className="btn-label">{label}</span>
          </NavLink>
        );
      })}

      <style>{`
        .bottom-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: #ffffff;
          border-top: 1px solid #eef2f6;
          box-shadow: 0 -2px 14px rgba(0, 0, 0, 0.05);
          z-index: 1000;
          padding-top: 6px;
          padding-bottom: max(6px, env(safe-area-inset-bottom));
        }

        .bottom-nav-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 2px 0 3px;
          color: #334155;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: transform 0.15s ease;
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 26px;
          border-radius: 13px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }

        .icon-wrapper svg {
          stroke: #334155;
          stroke-width: 2.1px;
          transition: stroke 0.2s ease, stroke-width 0.2s ease;
        }

        .btn-label {
          font-size: 11px;
          font-weight: 700;
          color: #334155;
          line-height: 1.2;
          letter-spacing: -0.1px;
          transition: color 0.2s ease;
        }

        .bottom-nav-btn:active {
          transform: scale(0.92);
        }

        /* Active State matching screenshot pixel-for-pixel */
        .bottom-nav-btn-active .icon-wrapper {
          background: #fdeeed;
        }

        .bottom-nav-btn-active .icon-wrapper svg {
          stroke: #c0392b;
          stroke-width: 2.3px;
        }

        .bottom-nav-btn-active .btn-label {
          color: #c0392b;
          font-weight: 750;
        }

        /* Dark Mode Compatibility */
        [data-theme="dark"] .bottom-nav {
          background: #0f172a;
          border-top: 1px solid #1e293b;
          box-shadow: 0 -2px 14px rgba(0, 0, 0, 0.25);
        }

        [data-theme="dark"] .bottom-nav-btn {
          color: #94a3b8;
        }

        [data-theme="dark"] .icon-wrapper svg {
          stroke: #94a3b8;
        }

        [data-theme="dark"] .btn-label {
          color: #94a3b8;
        }

        [data-theme="dark"] .bottom-nav-btn-active .icon-wrapper {
          background: rgba(220, 38, 38, 0.18);
        }

        [data-theme="dark"] .bottom-nav-btn-active .icon-wrapper svg {
          stroke: #f87171;
        }

        [data-theme="dark"] .bottom-nav-btn-active .btn-label {
          color: #f87171;
        }

        @media (min-width: 900px) {
          .bottom-nav { 
            display: none !important; 
          }
        }
      `}</style>
    </nav>
  );
}
