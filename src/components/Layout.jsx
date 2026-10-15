import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import BottomNav from "./BottomNav.jsx";
import Footer from "./Footer.jsx";
import { MessageSquare } from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Prevent document window scrolling on admin routes so topbar and sidebar stay permanently frozen
  useEffect(() => {
    if (isAdminRoute) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return (
      <div className="app-shell admin-fullscreen-shell">
        <Navbar onMenuClick={() => {
          window.dispatchEvent(new CustomEvent("toggle_admin_sidebar"));
          setSidebarOpen((prev) => !prev);
        }} />
        <main className="admin-main-viewport">
          <Outlet />
        </main>

        <style>{`
          .admin-fullscreen-shell {
            height: 100vh;
            height: 100dvh;
            max-height: 100vh;
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 100vw;
            background: #f8fafc;
            color: #0f172a;
            overflow: hidden !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            box-sizing: border-box !important;
          }
          .admin-fullscreen-shell .main-site-header {
            position: relative !important;
            top: 0 !important;
            flex-shrink: 0 !important;
            width: 100% !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
            z-index: 100 !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08) !important;
          }
          .admin-main-viewport {
            flex: 1;
            min-height: 0;
            width: 100%;
            max-width: 100vw;
            overflow: hidden !important;
            display: flex;
            flex-direction: column;
            padding: 0 !important;
            margin: 0 !important;
            position: relative;
            z-index: 200;
            box-sizing: border-box !important;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="app-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-main main-dashboard-viewport">
          <div className="page-pad full-width-dashboard-pad">
            {/* Nested routes render here */}
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      <BottomNav onMenuClick={() => setSidebarOpen(true)} />

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
        .main-dashboard-viewport {
          flex: 1;
          min-width: 0;
          width: 100%;
          overflow-x: hidden;
          background-color: #f8fafc;
          background-image: 
            radial-gradient(circle at 85% 15%, rgba(15, 23, 42, 0.035) 0%, transparent 50%),
            radial-gradient(circle at 10% 85%, rgba(192, 57, 43, 0.045) 0%, transparent 45%),
            url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230f172a' fill-opacity='0.025'%3E%3Cpath d='M0 15 L25 0 L50 15 L25 30 Z M40 15 L65 0 L90 15 L65 30 Z M0 55 L25 40 L50 55 L25 70 Z M40 55 L65 40 L90 55 L65 70 Z'/%3E%3C/g%3E%3C/svg%3E");
          background-attachment: fixed;
          color: #0f172a;
          display: flex;
          flex-direction: column;
        }

        .full-width-dashboard-pad {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 12px 12px 80px !important;
          flex: 1;
        }

        @media (min-width: 900px) {
          .full-width-dashboard-pad {
            padding: 16px 24px 60px !important;
          }
        }

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
