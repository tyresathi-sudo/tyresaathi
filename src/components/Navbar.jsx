import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  Phone, 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Moon, 
  Sun, 
  LogOut, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Store,
  Receipt
} from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { MEGA_MENU_BRANDS, TYRE_CATEGORIES } from "../config/tyreCatalog";

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout, isVendor } = useAuth();
  const navigate = useNavigate();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const megaMenuRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
        setMegaMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleBrandClick = (brandName) => {
    setMegaMenuOpen(false);
    navigate(`/search?brand=${encodeURIComponent(brandName)}`);
  };

  const handleCategoryClick = (catId) => {
    setMegaMenuOpen(false);
    navigate(`/search?category=${encodeURIComponent(catId)}`);
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    navigate("/login");
  };

  return (
    <header className="main-site-header">
      {/* 📞 Top Utility Bar (Matching Reference Photo) */}
      <div className="top-utility-bar">
        <div className="utility-container">
          <div className="top-left-info">
            <span className="top-phone">
              ⚡ TyreSaathi — India's Verified Tyre & Service Network
            </span>
            <span className="top-timing">🛡️ 100% Genuine Tyres & Authorized Fitment</span>
          </div>

          <div className="top-right-tools">
            {/* Quick Theme Toggle */}
            <button className="utility-tool-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* User Account / Profile */}
            <div className="user-profile-menu-wrap" ref={userDropdownRef}>
              <button 
                className="utility-tool-btn user-btn" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <User size={14} />
                <span>{profile?.name ? profile.name.split(" ")[0] : (user ? "My Account" : "Login")}</span>
                <ChevronDown size={12} />
              </button>

              {userDropdownOpen && (
                <div className="dropdown-panel user-dropdown">
                  {user ? (
                    <>
                      <div className="user-dropdown-header">
                        <strong>{profile?.name || "TyreSaathi User"}</strong>
                        <span className="role-tag">{profile?.role === "shop_owner" ? "🏪 Shop Owner" : "👤 Customer"}</span>
                        <small>{user.email}</small>
                      </div>
                      <div className="dropdown-divider" />
                      <Link to="/profile" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <User size={14} /> My Profile & Settings
                      </Link>
                      <Link to="/bookings" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <Calendar size={14} /> My Bookings
                      </Link>
                      <Link to="/billing" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        <Receipt size={14} /> Shop Billing & Invoices
                      </Link>
                      {isVendor && (
                        <Link to="/shop/add-product" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                          <PlusCircle size={14} /> Add Product / Service
                        </Link>
                      )}
                      <div className="dropdown-divider" />
                      <button className="dropdown-item logout-item" onClick={handleLogout}>
                        <LogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        Login to Account
                      </Link>
                      <Link to="/register" className="dropdown-item" onClick={() => setUserDropdownOpen(false)}>
                        Register New Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/bookings" className="top-cart-btn" title="View Bookings & Cart">
              <ShoppingCart size={15} />
              <span className="cart-badge-count">0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 🚗 Main Navigation Bar (Logo + Links + Mega Menu) */}
      <div className="main-nav-bar">
        <div className="nav-container">
          {/* Mobile Menu Hamburger */}
          <button className="mobile-hamburger-btn" onClick={onMenuClick} aria-label="Toggle Menu">
            <Menu size={24} />
          </button>

          {/* Logo Section with Generated TyreSaathi Logo Badge */}
          <Link to="/" className="site-brand-logo">
            <img src="/logo.png" alt="TyreSaathi Logo" className="logo-img" onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }} />
            <div className="logo-text-group">
              <span className="brand-primary-name">TYRE<span className="brand-highlight">SAATHI</span></span>
              <span className="brand-tagline">India's Trusted Tyre & Service Network</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="desktop-nav-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              HOME
            </NavLink>

            {/* CATEGORIES with Mega Menu Dropdown */}
            <div 
              className="categories-mega-wrap" 
              ref={megaMenuRef}
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button 
                className={`nav-link categories-trigger-btn ${megaMenuOpen ? "nav-link-active" : ""}`}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                CATEGORIES <ChevronDown size={14} className={`chevron-icon ${megaMenuOpen ? "chevron-open" : ""}`} />
              </button>

              {/* 🌟 Full Mega Menu Box (Photo 1 Look) */}
              {megaMenuOpen && (
                <div className="mega-menu-panel">
                  <div className="mega-menu-inner">
                    {/* Left Quick Category Types Bar */}
                    <div className="mega-categories-sidebar">
                      <h4 className="mega-col-title">Vehicle Types</h4>
                      <ul className="cat-type-list">
                        {TYRE_CATEGORIES.map((cat) => (
                          <li key={cat.id}>
                            <button onClick={() => handleCategoryClick(cat.id)}>
                              <span>{cat.icon}</span> {cat.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Multi-Column Brands Grid (Photo 1 Look) */}
                    <div className="mega-brands-grid-wrap">
                      <div className="mega-brands-header">
                        <h4 className="mega-col-title">Popular Tyre & Wheel Brands</h4>
                        <span className="brands-subnote">Click on any brand to view available tyres and sizes</span>
                      </div>

                      <div className="mega-brands-multi-columns">
                        {MEGA_MENU_BRANDS.map((brand, idx) => (
                          <button 
                            key={idx} 
                            className={`mega-brand-btn ${brand.popular ? "mega-brand-popular" : ""} ${brand.tag ? "mega-brand-tagged" : ""}`}
                            onClick={() => handleBrandClick(brand.name)}
                          >
                            <span className="brand-title-text">{brand.name}</span>
                            {brand.tag && <span className="brand-deal-tag">{brand.tag}</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/store-location" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              STORE LOCATION
            </NavLink>

            <NavLink to="/bookings" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              BOOKINGS
            </NavLink>

            <NavLink to="/billing" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              BILLING
            </NavLink>

            <NavLink to="/search" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              SEARCH
            </NavLink>

            <NavLink to="/privacy-policy" className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              ABOUT US
            </NavLink>
          </nav>

          {/* Right Action Section */}
          <div className="nav-right-actions">
            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="nav-search-form">
              <input
                type="text"
                placeholder="Search tyres, sizes (e.g. 185/65 R15)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search">
                <Search size={16} />
              </button>
            </form>

            {/* Shop Owner Add Product CTA */}
            {isVendor && (
              <Link to="/shop/add-product" className="nav-add-product-btn" title="Add Product to Shop">
                <PlusCircle size={15} />
                <span>Add Product</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .main-site-header {
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          background: var(--surface);
        }
        
        /* Top Utility Bar */
        .top-utility-bar {
          background: #1e1e24;
          color: #e0e0e0;
          font-size: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 5px 0;
        }
        .utility-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-left-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .top-phone {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-weight: 700;
          color: #ffc145;
          letter-spacing: 0.3px;
        }
        .top-timing {
          color: #a8acb3;
          font-size: 11.5px;
        }
        @media (max-width: 768px) {
          .top-timing { display: none; }
        }
        .top-right-tools {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .utility-tool-btn {
          background: none;
          border: none;
          color: #e0e0e0;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 3px 6px;
          border-radius: 4px;
        }
        .utility-tool-btn:hover {
          color: #ff6b35;
          background: rgba(255,255,255,0.06);
        }
        .user-profile-menu-wrap {
          position: relative;
        }
        .dropdown-panel {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          min-width: 220px;
          z-index: 120;
          padding: 8px 0;
          color: var(--text);
        }
        .user-dropdown-header {
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .role-tag {
          display: inline-block;
          font-size: 11px;
          color: var(--orange);
          font-weight: 700;
        }
        .dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 6px 0;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          color: var(--text);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background: var(--surface-2);
          color: var(--orange);
        }
        .logout-item {
          color: var(--danger);
        }
        .top-cart-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #c0392b;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
        }
        .cart-badge-count {
          background: white;
          color: #c0392b;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 800;
        }

        /* Main Navigation Bar */
        .main-nav-bar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
        }
        .nav-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .mobile-hamburger-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 4px;
        }
        @media (max-width: 900px) {
          .mobile-hamburger-btn { display: block; }
          .desktop-nav-links { display: none !important; }
        }

        /* Logo Styling */
        .site-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--text);
        }
        .logo-img {
          height: 48px;
          width: auto;
          object-fit: contain;
          border-radius: 6px;
        }
        .logo-text-group {
          display: flex;
          flex-direction: column;
        }
        .brand-primary-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 0.5px;
          line-height: 1;
        }
        .brand-highlight {
          color: #c0392b;
        }
        .brand-tagline {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        /* Desktop Nav Links */
        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-link {
          text-decoration: none;
          color: var(--text);
          font-weight: 700;
          font-size: 13.5px;
          letter-spacing: 0.3px;
          padding: 8px 4px;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.15s ease;
        }
        .nav-link:hover,
        .nav-link-active {
          color: #c0392b;
        }
        .categories-trigger-btn {
          color: #c0392b;
          font-weight: 800;
        }
        .chevron-icon {
          transition: transform 0.2s ease;
        }
        .chevron-open {
          transform: rotate(180deg);
        }

        /* 🌟 Mega Menu Dropdown (Photo 1 Multi-Column Layout) */
        .categories-mega-wrap {
          position: static;
        }
        .mega-menu-panel {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--surface);
          border-top: 2px solid #c0392b;
          border-bottom: 1px solid var(--border);
          box-shadow: 0 16px 36px rgba(0,0,0,0.16);
          z-index: 150;
          padding: 24px 0 30px;
          animation: megaSlideDown 0.2s ease-out;
        }
        @keyframes megaSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mega-menu-inner {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          gap: 32px;
        }
        .mega-categories-sidebar {
          flex: 0 0 260px;
          border-right: 1px solid var(--border);
          padding-right: 20px;
        }
        .mega-col-title {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #c0392b;
          margin: 0 0 12px;
          border-bottom: 2px solid var(--surface-2);
          padding-bottom: 6px;
        }
        .cat-type-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cat-type-list button {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s ease;
        }
        .cat-type-list button:hover {
          background: var(--surface-2);
          color: #c0392b;
        }
        .mega-brands-grid-wrap {
          flex: 1;
        }
        .mega-brands-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .brands-subnote {
          font-size: 12px;
          color: var(--text-muted);
        }
        .mega-brands-multi-columns {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 16px;
        }
        @media (max-width: 1100px) {
          .mega-brands-multi-columns {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .mega-brand-btn {
          background: none;
          border: none;
          text-align: left;
          padding: 8px 12px;
          border-radius: 6px;
          color: var(--text);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.15s ease;
        }
        .mega-brand-btn:hover {
          background: var(--surface-2);
          color: #c0392b;
          transform: translateX(3px);
        }
        .mega-brand-popular .brand-title-text {
          font-weight: 700;
        }
        .brand-deal-tag {
          font-size: 10px;
          background: #c0392b;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
        }

        /* Right Search & CTA */
        .nav-right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-search-form {
          display: flex;
          align-items: center;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 4px 10px 4px 14px;
          width: 220px;
          transition: width 0.2s ease, border-color 0.2s ease;
        }
        .nav-search-form:focus-within {
          width: 260px;
          border-color: #c0392b;
        }
        .nav-search-form input {
          border: none;
          background: none;
          outline: none;
          font-size: 12.5px;
          width: 100%;
          color: var(--text);
        }
        .nav-search-form button {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
        }
        @media (max-width: 600px) {
          .nav-search-form { display: none; }
        }
        .nav-add-product-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c0392b;
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.3);
          white-space: nowrap;
        }
        .nav-add-product-btn:hover {
          background: #a93226;
        }
      `}</style>
    </header>
  );
}
