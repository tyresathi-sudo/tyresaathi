import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../config/navItems.js";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => "bottom-nav-btn" + (isActive ? " bottom-nav-btn-active" : "")}
        >
          <Icon size={20} />
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
          background: var(--surface);
          border-top: 1px solid var(--border);
          z-index: 20;
        }
        .bottom-nav-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 9px 0 8px;
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          text-decoration: none;
        }
        .bottom-nav-btn-active { color: var(--orange); }

        @media (min-width: 900px) {
          .bottom-nav { display: none; }
        }
      `}</style>
    </nav>
  );
}
