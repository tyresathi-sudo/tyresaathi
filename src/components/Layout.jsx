import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import BottomNav from "./BottomNav.jsx";
import Footer from "./Footer.jsx";
import { MessageSquare } from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="app-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-main">
          <div className="page-pad">
            {/* Nested routes render here */}
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <BottomNav />

      {/* 💬 Global Floating WhatsApp / Support Widget */}
      <a
        href={`https://wa.me/918877277757?text=${encodeURIComponent("Hello TyreSaathi, mujhe support aur jaankari chahiye.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="24x7 Customer & Shop Support"
        aria-label="Support Assistance"
      >
        <span className="wa-icon-glow">💬</span>
        <span className="wa-btn-text">Support</span>
      </a>

      <style>{`
        .floating-whatsapp-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #25d366;
          color: white;
          border-radius: 30px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 13.5px;
          box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45);
          z-index: 99;
          transition: all 0.25s ease;
        }
        .floating-whatsapp-btn:hover {
          background: #1ebd5a;
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 6px 22px rgba(37, 211, 102, 0.6);
        }
        .wa-icon-glow {
          font-size: 18px;
          line-height: 1;
        }
        @media (max-width: 900px) {
          .floating-whatsapp-btn {
            bottom: 74px; /* Clearly above mobile bottom navigation bar */
            right: 14px;
            width: 44px;
            height: 44px;
            padding: 0;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
          }
          .wa-btn-text {
            display: none; /* Icon-only on small mobile screens */
          }
        }
      `}</style>
    </div>
  );
}
