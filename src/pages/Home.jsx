import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Star, 
  ChevronRight, 
  Calendar, 
  Phone 
} from "lucide-react";
import { 
  MEGA_MENU_BRANDS, 
  TYRE_CATEGORIES, 
  INITIAL_FEATURED_PRODUCTS, 
  SAMPLE_SHOPS, 
  SERVICE_TYPES 
} from "../config/tyreCatalog";

export default function Home() {
  const navigate = useNavigate();
  const [searchSize, setSearchSize] = useState("");
  const [searchBrand, setSearchBrand] = useState("all");

  const handleHeroSearch = (e) => {
    e.preventDefault();
    let url = "/search?";
    if (searchSize.trim()) url += `q=${encodeURIComponent(searchSize.trim())}&`;
    if (searchBrand !== "all") url += `brand=${encodeURIComponent(searchBrand)}&`;
    navigate(url);
  };

  return (
    <div className="home-page-container">
      {/* 🌟 1. Hero Section with Tyre Finder */}
      <section className="hero-banner-section">
        <div className="hero-content">
          <span className="hero-badge">⚡ India's #1 Tyre & Auto Service Network</span>
          <h1 className="hero-heading">
            Find the Perfect Tyre for Your <span className="highlight-text">Car & Bike</span>
          </h1>
          <p className="hero-description">
            Compare prices across nearest authorized tyre shops, get genuine brand warranty, and book 15-minute doorstep puncture or 3D alignment.
          </p>

          {/* Quick Search Widget */}
          <form className="hero-search-card" onSubmit={handleHeroSearch}>
            <div className="search-field-unit">
              <label>Tyre Size / Vehicle</label>
              <input
                type="text"
                placeholder="e.g. 185/65 R15, Swift, Activa..."
                value={searchSize}
                onChange={(e) => setSearchSize(e.target.value)}
              />
            </div>

            <div className="search-field-unit">
              <label>Brand</label>
              <select value={searchBrand} onChange={(e) => setSearchBrand(e.target.value)}>
                <option value="all">All Brands</option>
                {MEGA_MENU_BRANDS.slice(0, 15).map((b, i) => (
                  <option key={i} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="hero-search-btn">
              <Search size={18} /> Search Tyres
            </button>
          </form>

          {/* Value props */}
          <div className="hero-features-strip">
            <div className="feature-item">
              <ShieldCheck size={18} color="#27ae60" /> 100% Genuine Warranty
            </div>
            <div className="feature-item">
              <MapPin size={18} color="#c0392b" /> 500+ Verified Stores
            </div>
            <div className="feature-item">
              <Truck size={18} color="#ffc145" /> Doorstep Mobile Van
            </div>
          </div>
        </div>
      </section>

      {/* 🏍️ 2. Vehicle Categories Row */}
      <section className="home-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">Shop by Vehicle Category</h2>
            <p className="section-sub-title">Choose your vehicle type to see compatible tyres and sizes</p>
          </div>
        </div>

        <div className="categories-card-grid">
          {TYRE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/search?category=${cat.id}`}
              className="cat-box-card"
            >
              <span className="cat-box-emoji">{cat.icon}</span>
              <h3 className="cat-box-name">{cat.name}</h3>
              <span className="cat-browse-link">
                View Tyres <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🌟 3. Popular Brands Row (Matching Reference Photo) */}
      <section className="home-section brands-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">Popular Tyre & Wheel Brands</h2>
            <p className="section-sub-title">Authorized sales and warranty for all leading manufacturers</p>
          </div>
          <Link to="/search" className="view-all-link">
            All Brands →
          </Link>
        </div>

        <div className="brands-logo-row">
          {MEGA_MENU_BRANDS.slice(0, 12).map((brand, i) => (
            <Link
              key={i}
              to={`/search?brand=${encodeURIComponent(brand.name)}`}
              className="brand-pill-box"
            >
              <span className="brand-name-bold">{brand.name}</span>
              <span className="brand-count-sub">{brand.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🛞 4. Featured / Related Products (Matching Reference Photo) */}
      <section className="home-section">
        <div className="section-header-row">
          <div>
            <span className="section-tag-red">HOT DEALS</span>
            <h2 className="section-main-title">Featured Tyres & Accessories</h2>
            <p className="section-sub-title">Top rated products in stock with special shop discounts</p>
          </div>
          <Link to="/search" className="view-all-link">
            View All in Search →
          </Link>
        </div>

        <div className="home-products-grid">
          {INITIAL_FEATURED_PRODUCTS.slice(0, 4).map((p) => (
            <div key={p.id} className="home-product-card">
              <div className="product-image-box">
                <img src={p.images[0]} alt={p.productName} />
                <span className="dist-badge">📍 {p.distanceKm} km (Nearest)</span>
              </div>
              <div className="product-info-box">
                <span className="brand-tag">{p.brandName} • {p.sizeName}</span>
                <h4 className="prod-title">{p.productName}</h4>
                <div className="price-line">
                  <span className="deal-price">₹{p.offerPrice}</span>
                  <span className="mrp-price">₹{p.originalPrice}</span>
                </div>
                <div className="shop-line">
                  <small>🏪 {p.shopName}</small>
                </div>
                <div className="btn-row">
                  <Link to="/bookings" className="btn-book">
                    <Calendar size={13} /> Book Service
                  </Link>
                  <a href={`tel:${p.shopPhone}`} className="btn-call">
                    <Phone size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🛠️ 5. Instant Service Booking Banner */}
      <section className="home-section service-cta-banner">
        <div className="service-banner-left">
          <Wrench size={36} className="wrench-icon-gold" />
          <div>
            <h3 className="banner-title">Need Urgent Tyre Cut Repair or Puncture Fix?</h3>
            <p className="banner-desc">
              Book doorstep service or priority shop queue. Verified technician reaches within 30 minutes.
            </p>
          </div>
        </div>
        <Link to="/bookings" className="banner-cta-btn">
          📅 Book Tyre Service Now
        </Link>
      </section>

      {/* 📍 6. Store Locator Banner (Matching Photo 2) */}
      <section className="home-section store-cta-section">
        <div className="store-cta-card">
          <div className="store-cta-text">
            <h2>📍 Find a TyreSaathi Authorized Store Near You</h2>
            <p>
              Over 500+ verified tyre shops with 3D Wheel Alignment machines, Nitrogen filling, and genuine tyre stocks.
            </p>
            <div className="store-sample-pills">
              <span>📍 Bengaluru AMR</span>
              <span>📍 Erode ATG</span>
              <span>📍 Delhi NCR</span>
              <span>📍 Mumbai</span>
            </div>
            <Link to="/store-location" className="btn-store-explore">
              Open Interactive Store Locator →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .home-page-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 10px 40px;
        }

        /* Hero Banner */
        .hero-banner-section {
          background: linear-gradient(135deg, #1e1e24 0%, #2c3e50 100%);
          color: white;
          border-radius: 16px;
          padding: 40px 30px;
          margin-bottom: 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .hero-content {
          max-width: 860px;
        }
        .hero-badge {
          display: inline-block;
          background: rgba(255, 107, 53, 0.2);
          border: 1px solid #ff6b35;
          color: #ff6b35;
          font-size: 12px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
        }
        .hero-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 42px;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 12px;
          letter-spacing: 0.5px;
        }
        @media (max-width: 600px) {
          .hero-heading { font-size: 30px; }
        }
        .highlight-text {
          color: #ffc145;
        }
        .hero-description {
          font-size: 15px;
          color: #d1d5db;
          line-height: 1.5;
          margin: 0 0 24px;
        }
        .hero-search-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 14px;
          align-items: flex-end;
          color: #222;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .hero-search-card {
            flex-direction: column;
            align-items: stretch;
          }
        }
        .search-field-unit {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .search-field-unit label {
          font-size: 11.5px;
          font-weight: 700;
          color: #555;
          text-transform: uppercase;
        }
        .search-field-unit input,
        .search-field-unit select {
          padding: 10px 12px;
          border-radius: 6px;
          border: 1.5px solid #ddd;
          font-size: 13.5px;
          outline: none;
          color: #111;
          background: white;
        }
        .hero-search-btn {
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .hero-features-strip {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          font-size: 13px;
          color: #e5e7eb;
          font-weight: 600;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Home Sections */
        .home-section {
          margin-bottom: 36px;
        }
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 18px;
        }
        .section-tag-red {
          font-size: 11px;
          background: #c0392b;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }
        .section-main-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          margin: 4px 0 2px;
        }
        .section-sub-title {
          font-size: 13px;
          color: var(--text-muted);
          margin: 0;
        }
        .view-all-link {
          font-size: 13px;
          color: #c0392b;
          font-weight: 700;
          text-decoration: none;
        }

        /* Categories Grid */
        .categories-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
        }
        .cat-box-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          text-decoration: none;
          color: var(--text);
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .cat-box-card:hover {
          border-color: #c0392b;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }
        .cat-box-emoji {
          font-size: 28px;
        }
        .cat-box-name {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
          line-height: 1.3;
        }
        .cat-browse-link {
          font-size: 12px;
          color: #c0392b;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 2px;
          margin-top: 4px;
        }

        /* Brands Logo Row */
        .brands-logo-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }
        .brand-pill-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 14px;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transition: all 0.15s ease;
        }
        .brand-pill-box:hover {
          border-color: #c0392b;
          background: var(--surface-2);
          transform: translateY(-2px);
        }
        .brand-name-bold {
          font-size: 14.5px;
          font-weight: 800;
          color: var(--text);
        }
        .brand-count-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        /* Products Grid */
        .home-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 18px;
        }
        .home-product-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .home-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #c0392b;
        }
        .product-image-box {
          position: relative;
          height: 160px;
          background: #f8f9fa;
        }
        .product-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .dist-badge {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(39, 174, 96, 0.95);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 4px;
        }
        .product-info-box {
          padding: 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .brand-tag {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          text-transform: uppercase;
        }
        .prod-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin: 4px 0 8px;
          line-height: 1.3;
          min-height: 36px;
        }
        .price-line {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 6px;
        }
        .deal-price {
          font-size: 19px;
          font-weight: 800;
          color: #27ae60;
        }
        .mrp-price {
          font-size: 12.5px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .shop-line {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .btn-row {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .btn-book {
          flex: 1;
          background: #c0392b;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 700;
          padding: 8px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .btn-call {
          background: #27ae60;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Service Banner */
        .service-cta-banner {
          background: #1e1e24;
          color: white;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .service-banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .wrench-icon-gold {
          color: #ffc145;
        }
        .banner-title {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 4px;
        }
        .banner-desc {
          font-size: 13px;
          color: #aaa;
          margin: 0;
        }
        .banner-cta-btn {
          background: #ff6b35;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
        }

        /* Store Locator Banner */
        .store-cta-card {
          background: linear-gradient(135deg, #631936 0%, #3e0e20 100%);
          color: white;
          border-radius: 14px;
          padding: 30px;
        }
        .store-cta-text h2 {
          font-size: 22px;
          margin: 0 0 8px;
          font-weight: 800;
        }
        .store-cta-text p {
          font-size: 14px;
          color: #e0d0d8;
          margin: 0 0 16px;
          max-width: 600px;
        }
        .store-sample-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .store-sample-pills span {
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        .btn-store-explore {
          display: inline-block;
          background: white;
          color: #631936;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 800;
          text-decoration: none;
          font-size: 13.5px;
        }
      `}</style>
    </div>
  );
}
