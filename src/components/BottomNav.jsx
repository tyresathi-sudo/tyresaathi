import React from "react";
import { NavLink } from "react-router-dom";
import { BOTTOM_NAV_ITEMS } from "../config/navItems.js";
import { triggerHaptic } from "../utils/nativeBridge.js";

export default function BottomNav({ onMenuClick, sidebarOpen }) {
  return (
    <nav className="bottom-nav">
      {BOTTOM_NAV_ITEMS.map((item, idx) => {
        const { to, label, icon: Icon, end, isMenuAction } = item;

        if (isMenuAction) {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                triggerHaptic("medium");
                if (onMenuClick) onMenuClick();
              }}
              className={"bottom-nav-btn" + (sidebarOpen ? " bottom-nav-btn-active" : "")}
              aria-label="Open Menu Drawer"
            >
              <div className="icon-wrapper">
                <Icon size={18} />
              </div>
              <span className="btn-label">{label}</span>
            </button>
          );
        }

        return (
          <NavLink
            key={to || idx}
            to={to}
            end={end}
            onClick={() => triggerHaptic("light")}
            className={({ isActive }) => "bottom-nav-btn" + (isActive ? " bottom-nav-btn-active" : "")}
          >
            <div className="icon-wrapper">
              <Icon size={18} />
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
          background: var(--surface);
          border-top: 1px solid var(--border);
          box-shadow: 0 -4px 18px rgba(0,0,0,0.06);
          z-index: 1000;
          padding-bottom: max(5px, env(safe-area-inset-bottom));
          padding-top: 3px;
        }
        .bottom-nav-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
          padding: 3px 0 2px;
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.18s ease;
          position: relative;
        }
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 22px;
          border-radius: 11px;
          transition: all 0.2s ease;
        }
        .bottom-nav-btn:active {
          transform: scale(0.92);
        }
        .bottom-nav-btn-active {
          color: #c0392b !important;
        }
        .bottom-nav-btn-active .icon-wrapper {
          background: color-mix(in srgb, #c0392b 12%, transparent);
        }
        .bottom-nav-btn-active svg {
          stroke: #c0392b;
          stroke-width: 2.2px;
        }
        .btn-label {
          font-size: 10px;
          line-height: 1.1;
          letter-spacing: 0.1px;
        }

        @media (min-width: 900px) {
          .bottom-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
