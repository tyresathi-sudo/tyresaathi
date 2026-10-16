import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, X, ShieldCheck, User, MessageCircle, ChevronRight, LogOut, Share2 } from "lucide-react";
import {
  BUSINESS_NAV_ITEMS,
  GROWTH_NAV_ITEMS,
  SERVICE_NAV_ITEMS,
  ACCOUNT_NAV_ITEMS
} from "../config/navItems.js";
import { useAuth } from "../context/AuthContext.jsx";
import { shareApp } from "../utils/nativeBridge.js";
import { db } from "../firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { getSupportContactConfig } from "../config/supportConfig.js";

function NavLabelContent({ label, active }) {
  const match = typeof label === "string" ? label.match(/^(.*?)\s*\((.*?)\)$/) : null;
  if (match) {
    const titleEn = match[1].trim();
    const titleHi = match[2].trim();
    return (
      <div className="nav-text-col">
        <span className="nav-title-en">{titleEn}</span>
        <span className={`nav-title-hi ${active ? "nav-title-hi-active" : ""}`}>{titleHi}</span>
      </div>
    );
  }
  return (
    <div className="nav-text-col">
      <span className="nav-title-en">{label}</span>
    </div>
  );
}

export default function Sidebar({ open, onClose }) {
  const { user, profile, isAdmin, isVendor, logout } = useAuth();
  const [liveShopRating, setLiveShopRating] = useState({ rating: 0, reviewsCount: 0 });

  // 🌟 Live Shop Rating & Reviews Listener (Real-Time Firestore Sync)
  useEffect(() => {
    if (!user || !isVendor) return;

    try {
      const unsub = onSnapshot(
        collection(db, "shop_reviews"),
        (snapshot) => {
          const targetId = profile?.shopId || profile?.id || user.uid;
          const targetName = (profile?.shopName || "").trim().toLowerCase();

          let total = 0;
          let count = 0;

          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const matchId = data.shopId && (data.shopId === targetId || data.shopId === user.uid);
            const matchName = targetName && data.shopName && data.shopName.trim().toLowerCase() === targetName;

            if (matchId || matchName) {
              total += Number(data.rating) || 0;
              count += 1;
            }
          });

          if (count > 0) {
            setLiveShopRating({
              rating: Number((total / count).toFixed(1)),
              reviewsCount: count,
            });
          } else {
            setLiveShopRating({
              rating: 0,
              reviewsCount: 0,
            });
          }
        },
        (err) => {
          console.warn("Sidebar reviews listener warning:", err);
        }
      );

      return () => unsub();
    } catch (err) {
      console.warn("Could not setup sidebar reviews listener:", err);
    }
  }, [user, isVendor, profile]);

  const [supportConfig, setSupportConfig] = useState(getSupportContactConfig);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) setSupportConfig(e.detail);
      else setSupportConfig(getSupportContactConfig());
    };
    window.addEventListener("tyresaathi_support_config_updated", handleUpdate);
    return () => window.removeEventListener("tyresaathi_support_config_updated", handleUpdate);
  }, []);

  const supportWhatsappUrl = `https://wa.me/91${supportConfig.whatsapp || "8877277757"}?text=` + encodeURIComponent("Hello TyreSaathi Support, I need assistance with my account/shop.");

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

        {/* 🏪 Top Store / User Profile Card */}
        {user ? (
          <div className="drawer-profile-container">
            <Link to="/profile" className="drawer-store-card" onClick={onClose} title="Click to view & edit profile">
              <div className="drawer-store-avatar">
                {profile?.photoURL ? (
                  <img src={profile.photoURL} alt="User" className="drawer-avatar-img" />
                ) : (
                  <span className="store-avatar-icon">{isVendor ? "🏪" : "👤"}</span>
                )}
              </div>
              <div className="drawer-store-info">
                <strong className="drawer-store-name">{isVendor ? shopNameDisplay : (profile?.name || user.email?.split("@")[0] || "Customer")}</strong>
                <div className="drawer-rating-row">
                  {isVendor ? (
                    <div className="live-vendor-star-wrap">
                      <span className="drawer-star-tag live-star-pill" title="Live Customer Rating">
                        ⭐ {liveShopRating.reviewsCount > 0 ? liveShopRating.rating.toFixed(1) : "0.0"} 
                        <span className="live-reviews-sub">({liveShopRating.reviewsCount} {liveShopRating.reviewsCount === 1 ? "review" : "reviews"})</span>
                      </span>
                      <span className="drawer-tier-pill">
                        {liveShopRating.reviewsCount === 0 
                          ? "Verified Partner" 
                          : (liveShopRating.rating >= 4.5 ? "⭐ 5-Star Elite" : "⭐ Verified Store")}
                      </span>
                    </div>
                  ) : (
                    <span 
                      className="drawer-star-tag"
                      style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" }}
                    >
                      👤 Verified Customer
                    </span>
                  )}
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
          {/* 🏠 TOP HOME LINK */}
          <NavLink
            to="/"
            end
            className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
            onClick={onClose}
          >
            {({ isActive }) => (
              <>
                <div className="nav-icon-badge" style={{ color: "#c0392b", backgroundColor: "#fdedec" }}>
                  <Home size={19} />
                </div>
                <NavLabelContent label="Home (मुख्य पृष्ठ)" active={isActive} />
                <ChevronRight size={16} className="nav-chevron" />
              </>
            )}
          </NavLink>

          {/* 1. MANAGE BUSINESS (Shop Owners & Admin Only) */}
          {(isVendor || isAdmin) && (
            <>
              <div className="nav-section-label" style={{ marginTop: "6px" }}>MANAGE BUSINESS</div>
              {BUSINESS_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
                  onClick={onClose}
                >
                  {({ isActive }) => (
                    <>
                      <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                        <Icon size={19} />
                      </div>
                      <NavLabelContent label={label} active={isActive} />
                      <ChevronRight size={16} className="nav-chevron" />
                    </>
                  )}
                </NavLink>
              ))}
            </>
          )}

          {/* 2. GROWTH & INSIGHTS (Shop Owners & Admin Only) */}
          {(isVendor || isAdmin) && (
            <>
              <div className="nav-section-label" style={{ marginTop: "8px" }}>GROWTH & INSIGHTS</div>
              {GROWTH_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
                  onClick={onClose}
                >
                  {({ isActive }) => (
                    <>
                      <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                        <Icon size={19} />
                      </div>
                      <NavLabelContent label={label} active={isActive} />
                      <ChevronRight size={16} className="nav-chevron" />
                    </>
                  )}
                </NavLink>
              ))}
            </>
          )}

          {/* 3. CUSTOMER SERVICES */}
          <div className="nav-section-label" style={{ marginTop: "6px" }}>
            {isVendor || isAdmin ? "CUSTOMER SERVICES" : "SERVICES & DIRECTORY"}
          </div>
          {SERVICE_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                    <Icon size={19} />
                  </div>
                  <NavLabelContent label={label} active={isActive} />
                  <ChevronRight size={16} className="nav-chevron" />
                </>
              )}
            </NavLink>
          ))}

          {/* 4. ACCOUNT & SUPPORT */}
          <div className="nav-section-label" style={{ marginTop: "8px" }}>ACCOUNT & SUPPORT</div>
          {ACCOUNT_NAV_ITEMS.map(({ to, label, icon: Icon, color, bg }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => "sidebar-link-modern" + (isActive ? " link-active" : "")}
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <div className="nav-icon-badge" style={{ color: color, backgroundColor: bg }}>
                    <Icon size={19} />
                  </div>
                  <NavLabelContent label={label} active={isActive} />
                  <ChevronRight size={16} className="nav-chevron" />
                </>
              )}
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
              <MessageCircle size={19} />
            </div>
            <NavLabelContent label="WhatsApp Support (24x7 सहायता)" />
            <ChevronRight size={16} className="nav-chevron" />
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
                <LogOut size={19} />
              </div>
              <NavLabelContent label="Logout (लॉगआउट)" />
            </button>
          )}
        </nav>

        <div className="sidebar-footer">
          <span className="footer-small-brand">TyreSaathi Hub</span>
          <span className="sidebar-version-pill">
            <span className="version-status-dot" /> v1.2.4
          </span>
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
          max-width: 86vw;
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
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 18px;
          border-bottom: 1px solid #f1f5f9;
        }
        .sidebar-brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sidebar-logo-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 8px;
        }
        .sidebar-title { 
          font-size: 1.35rem;
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
          padding: 6px;
        }
        
        .drawer-profile-container {
          padding: 12px 14px 6px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .drawer-store-card {
          padding: 12px 14px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #0f172a;
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
          transition: border-color 0.2s ease;
        }
        .drawer-store-card:hover {
          border-color: #c0392b;
        }
        .drawer-store-avatar {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
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
          font-size: 0.98rem;
          font-weight: 800;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .drawer-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }
        .drawer-star-tag {
          font-size: 0.78rem;
          color: #16a34a;
          font-weight: 700;
        }
        .drawer-role-tag {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 600;
        }

        .sidebar-admin-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          background: #fff5f5;
          border: 1.5px solid #fecaca;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .admin-card-inner {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .admin-card-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: #c0392b;
        }
        .sidebar-admin-active {
          background: #fee2e2;
          border-color: #ef4444;
        }

        .drawer-auth-cta {
          padding: 12px 14px 6px;
        }
        .drawer-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #c0392b;
          color: white;
          padding: 11px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 700;
        }

        .sidebar-nav { 
          flex: 1; 
          padding: 8px 10px; 
          display: flex; 
          flex-direction: column; 
          gap: 3px;
          overflow-y: auto;
        }

        .nav-section-label {
          font-size: 12.5px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.9px;
          padding: 10px 10px 4px;
        }

        .sidebar-link-modern {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          min-height: 44px;
          border-radius: 12px;
          color: #1e293b;
          text-decoration: none;
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
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nav-text-col {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .nav-title-en {
          font-size: 14.5px;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nav-title-hi {
          font-size: 11.5px;
          font-weight: 500;
          color: #64748b;
          line-height: 1.2;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nav-chevron {
          color: #94a3b8;
          flex-shrink: 0;
        }
        .link-active { 
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%) !important; 
          color: #ffffff !important; 
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.35);
        }
        .link-active .nav-title-en {
          color: #ffffff !important;
          font-weight: 700;
        }
        .link-active .nav-title-hi {
          color: #fecaca !important;
        }
        .link-active .nav-icon-badge {
          background: rgba(255, 255, 255, 0.22) !important;
          color: #ffffff !important;
        }
        .link-active .nav-icon-badge svg {
          stroke: #ffffff !important;
          color: #ffffff !important;
        }
        .link-active .nav-chevron {
          color: #ffffff !important;
          opacity: 1;
          transform: translateX(3px);
        }
        .btn-sidebar-logout {
          margin-top: 4px;
        }
        .btn-sidebar-logout:hover {
          background: #fff1f2;
        }
        
        .sidebar-footer {
          padding: 10px 16px;
          border-top: 1px solid #f1f5f9;
          background: #fafafa;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        .footer-small-brand {
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }
        .sidebar-version-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 700;
        }
        .sidebar-share-pill {
          font-size: 10.5px;
          font-weight: 800;
          color: #2563eb;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 2px 7px;
          border-radius: 8px;
          letter-spacing: 0.3px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .live-vendor-star-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .live-star-pill {
          background: #fffbeb !important;
          color: #b45309 !important;
          border: 1px solid #fde68a !important;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .live-reviews-sub {
          font-size: 9.5px;
          color: #92400e;
          font-weight: 600;
        }
        .drawer-tier-pill {
          font-size: 9.5px;
          font-weight: 800;
          color: #166534;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 2px 6px;
          border-radius: 8px;
          letter-spacing: 0.2px;
        }

        .version-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
        }

        /* Desktop */
        @media (min-width: 900px) {
          .sidebar-backdrop { display: none; }
          .sidebar {
            position: sticky;
            transform: none;
            top: 92px;
            height: calc(100vh - 92px);
            max-height: calc(100vh - 92px);
            overflow-y: auto;
            z-index: 100;
            box-shadow: none;
            flex-shrink: 0;
            width: 280px;
          }
          .sidebar-close { display: none; }
        }
      `}</style>
    </>
  );
}
