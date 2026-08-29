import React from "react";
import { NavLink } from "react-router-dom";
import { BOTTOM_NAV_ITEMS } from "../config/navItems.js";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {BOTTOM_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => "bottom-nav-btn" + (isActive ? " bottom-nav-btn-active" : "")}
        >
          <Icon size={19} />
          <span>{label}</span>
        </NavLink>
      ))}

      <style>{`
        .bottom-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          background: var(--surface, #ffffff);
          border-top: 1px solid var(--border, #e2e8f0);
          box-shadow: 0 -2px 10px rgba(0,0,0,0.06);
          z-index: 1000;
          padding-bottom: max(4px, env(safe-area-inset-bottom));
        }
        .bottom-nav-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 8px 0 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted, #64748b);
          text-decoration: none;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .bottom-nav-btn-active {
          color: #c0392b !important;
        }
        .bottom-nav-btn-active svg {
          stroke: #c0392b;
        }

        @media (min-width: 900px) {
          .bottom-nav { display: none; }
        }
      `}</style>
    </nav>
  );
}
