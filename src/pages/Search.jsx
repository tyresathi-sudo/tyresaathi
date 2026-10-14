import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { 
  Search as SearchIcon, 
  MapPin, 
  Phone, 
  Tag, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  Calendar, 
  Truck, 
  ShieldCheck, 
  ChevronRight 
} from "lucide-react";
import { 
  INITIAL_FEATURED_PRODUCTS, 
  MEGA_MENU_BRANDS, 
  TYRE_CATEGORIES, 
  POPULAR_SIZES 
} from "../config/tyreCatalog";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const brandParam = searchParams.get("brand") || "all";
  const categoryParam = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSize, setSelectedSize] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync state with URL params if they change
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (brandParam) setSelectedBrand(brandParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, brandParam, categoryParam]);

  // Load real published products from Firestore
  useEffect(() => {
    async function loadFirestoreProducts() {
      try {
        const snap = await getDocs(collection(db, "products"));
        if (!snap.empty) {
          const fetched = snap.docs
            .map((d) => ({
              id: d.id,
              distanceKm: (1.5).toFixed(1),
              isNearest: true,
              ...d.data(),
            }))
            .filter((p) => p.published !== false);
          setProducts(fetched);
        } else {
          setProducts([]);
        }
      } catch (e) {
        console.warn("Firestore products load notice:", e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadFirestoreProducts();
  }, []);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.productName?.toLowerCase().includes(q) ||
      p.brandName?.toLowerCase().includes(q) ||
      p.sizeName?.toLowerCase().includes(q) ||
      p.vehicleTypeName?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.shopName?.toLowerCase().includes(q);

    const matchesBrand =
      selectedBrand === "all" ||
      p.brandName?.toLowerCase() === selectedBrand.toLowerCase();

    const matchesCategory =
      selectedCategory === "all" ||
      p.categoryName?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      p.categoryKey === selectedCategory;

    const matchesSize =
      selectedSize === "all" ||
      p.sizeName === selectedSize;

    return matchesQuery && matchesBrand && matchesCategory && matchesSize;
  });

  // Sort: Nearest Shops (<= 5 km) First, followed by farther shops
  const nearestProducts = filteredProducts.filter((p) => (p.distanceKm || 0) <= 5.0);
  const distantProducts = filteredProducts.filter((p) => (p.distanceKm || 0) > 5.0);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSelectedSize("all");
    setSearchParams({});
  };

  return (
    <div className="search-page-container">
      {/* Top Search Filter Header */}
      <div className="search-hero-bar">
        <h1 className="search-page-title">🔍 Search Tyres, Tubes & Services</h1>
        <p className="search-page-sub">
          Results are automatically sorted with <strong>Nearest Shops (निकटतम दुकानें)</strong> first for quick pickup and doorstep service.
        </p>

        {/* Search Input Box */}
        <div className="search-input-row">
          <div className="search-bar-wrap">
            <SearchIcon size={20} className="search-bar-icon" />
            <input
              type="text"
              placeholder="Search by Tyre Size (185/65 R15), Brand (Apollo, MRF), Bike or Car..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Quick Filter Selectors */}
        <div className="search-filters-row">
          {/* Brand Filter */}
          <div className="filter-select-wrap">
            <label>Brand:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="all">All Brands</option>
              {MEGA_MENU_BRANDS.map((b, idx) => (
                <option key={idx} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="filter-select-wrap">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Vehicle Categories</option>
              {TYRE_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Size Filter */}
          <div className="filter-select-wrap">
            <label>Popular Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="all">All Sizes</option>
              <option value="185/65 R15">185/65 R15 (Swift/Dzire/i20)</option>
              <option value="165/80 R14">165/80 R14 (WagonR/Ritz)</option>
              <option value="205/55 R16">205/55 R16 (Creta/Seltos/City)</option>
              <option value="215/60 R16">215/60 R16 (Brezza/Nexon)</option>
              <option value="235/65 R17">235/65 R17 (Scorpio/Thar)</option>
              <option value="90/90-12">90/90-12 (Activa/Jupiter)</option>
              <option value="100/90-17">100/90-17 (Pulsar/Apache/Filt)</option>
              <option value="10.00-20">10.00-20 (Heavy Truck/Bus)</option>
            </select>
          </div>

          {(selectedBrand !== "all" || selectedCategory !== "all" || selectedSize !== "all" || searchQuery) && (
            <button className="reset-all-filters-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Results Section */}
      <div className="search-results-layout">
        {filteredProducts.length === 0 ? (
          <div className="no-results-card">
            <SearchIcon size={48} color="#aaa" />
            <h3>No Tyres or Services found</h3>
            <p>Try searching for popular sizes like "185/65 R15", "100/90-17" or brand names like "Apollo", "MRF", "CEAT".</p>
            <button className="btn-browse-all" onClick={resetFilters}>
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            {/* 📍 SECTION 1: NEAREST SHOPS (Priority 1) */}
            {nearestProducts.length > 0 && (
              <div className="results-group-section">
                <div className="group-section-header">
                  <div className="header-left">
                    <span className="nearest-flame-icon">⚡</span>
                    <h2 className="group-title">Nearest Shop Products (निकटतम दुकानें)</h2>
                  </div>
                  <span className="group-count-tag">
                    {nearestProducts.length} items available within 5 km
                  </span>
                </div>

                <div className="products-card-grid">
                  {nearestProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* 🚗 SECTION 2: OTHER SHOPS (More Distances) */}
            {distantProducts.length > 0 && (
              <div className="results-group-section" style={{ marginTop: "32px" }}>
                <div className="group-section-header">
                  <div className="header-left">
                    <span className="other-shops-icon">🚗</span>
                    <h2 className="group-title">Other Partner Shops (अन्य क्षेत्रों की दुकानें)</h2>
                  </div>
                  <span className="group-count-tag" style={{ background: "#7f8c8d" }}>
                    {distantProducts.length} items from other regional hubs
                  </span>
                </div>

                <div className="products-card-grid">
                  {distantProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .search-page-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 8px 0 50px;
        }
        .search-hero-bar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(16px, 2vw, 26px);
          margin-bottom: 22px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .search-page-title {
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .search-page-sub {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0 0 18px;
          line-height: 1.45;
        }
        .search-input-row {
          margin-bottom: 14px;
        }
        .search-bar-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-bar-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          width: 20px;
          height: 20px;
        }
        .search-bar-wrap input {
          width: 100%;
          padding: 13px 40px 13px 46px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
          font-weight: 600;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .search-bar-wrap input:focus {
          border-color: #c0392b;
        }
        .clear-search-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 16px;
          cursor: pointer;
        }
        .search-filters-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .filter-select-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          padding: 9px 14px;
          border-radius: 10px;
        }
        .filter-select-wrap label {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .filter-select-wrap select {
          border: none;
          background: none;
          color: var(--text);
          font-size: 0.95rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        .reset-all-filters-btn {
          background: var(--surface-2);
          border: 1.5px solid var(--border);
          color: #c0392b;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 9px 16px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .reset-all-filters-btn:hover {
          background: #fdedec;
        }

        /* Results Group */
        .results-group-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: clamp(16px, 2.2vw, 26px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          margin-bottom: 24px;
        }
        .group-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          border-bottom: 1.5px solid var(--border);
          padding-bottom: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nearest-flame-icon {
          font-size: 22px;
        }
        .other-shops-icon {
          font-size: 22px;
        }
        .group-title {
          font-size: clamp(1.15rem, 1.6vw, 1.45rem);
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }
        .group-count-tag {
          font-size: 0.85rem;
          background: #16a34a;
          color: white;
          padding: 5px 12px;
          border-radius: 16px;
          font-weight: 700;
        }

        /* Product Grid */
        .products-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 22px;
          width: 100%;
        }

        @media (max-width: 640px) {
          .products-card-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .search-filters-row {
            gap: 8px;
          }
          .filter-select-wrap {
            width: 100%;
            justify-content: space-between;
          }
          .reset-all-filters-btn {
            width: 100%;
            text-align: center;
          }
          .results-group-section {
            padding: 14px 12px;
          }
        }

        .no-results-card {
          padding: 54px 20px;
          text-align: center;
          background: var(--surface);
          border: 1.5px dashed var(--border);
          border-radius: 16px;
          color: var(--text-muted);
          font-size: 1rem;
        }
        .btn-browse-all {
          margin-top: 16px;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px 22px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

// Single Product Card with 4-photo thumbnails and distance badge
function ProductCard({ product }) {
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.imageUrl || "/tyresaathi-logo.png"];

  const [selectedImg, setSelectedImg] = useState(images[0] || "/tyresaathi-logo.png");

  const discount = (() => {
    const mrp = Number(product.originalPrice || 0);
    const offer = Number(product.offerPrice || 0);
    return mrp > 0 && offer > 0 && mrp > offer ? Math.round(((mrp - offer) / mrp) * 100) : 0;
  })();

  return (
    <div className="product-item-card">
      {/* Top Image Box */}
      <div className="card-img-wrapper">
        <img
          src={selectedImg}
          alt={product.productName || "Tyre"}
          className="main-card-img"
          onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
        />

        {discount > 0 && (
          <span className="card-discount-pill">{discount}% OFF</span>
        )}

        {/* Distance Badge */}
        <span className={`card-distance-pill ${(product.distanceKm || 0) <= 3 ? "dist-nearest" : "dist-far"}`}>
          📍 {product.distanceKm || 2.5} km away
        </span>
      </div>

      {/* Multi-photo Mini Thumbs (if more than 1 photo exists) */}
      {images.length > 1 && (
        <div className="card-thumbs-strip">
          {images.map((imgUrl, i) => (
            <button
              key={i}
              type="button"
              className={`card-mini-thumb ${selectedImg === imgUrl ? "thumb-selected" : ""}`}
              onClick={() => setSelectedImg(imgUrl)}
            >
              <img src={imgUrl} alt={`angle ${i + 1}`} />
            </button>
          ))}
        </div>
      )}

      {/* Body Info */}
      <div className="card-info-content">
        <div className="brand-size-tag-row">
          <span className="brand-badge-tag">{product.brandName}</span>
          {product.sizeName && <span className="size-badge-tag">{product.sizeName}</span>}
          {product.condition === "new" ? (
            <span className="condition-badge-tag">🆕 New</span>
          ) : (
            <span className="condition-badge-tag">♻️ Used</span>
          )}
        </div>

        <h3 className="card-product-title">{product.productName}</h3>

        <div className="card-price-row">
          <span className="card-selling-price">₹{product.offerPrice || "0"}</span>
          {Number(product.originalPrice) > Number(product.offerPrice) && (
            <span className="card-mrp-price">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Shop Info & Distance */}
        <div className="card-shop-banner">
          <div className="shop-name-row">
            <span className="shop-icon">🏪</span>
            <span className="shop-title-text">{product.shopName || "TyreSaathi Partner"}</span>
          </div>
          <span className="stock-info-text">
            {Number(product.stock) > 0 ? `✅ In Stock (${product.stock} pcs)` : "❌ Out of Stock"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="card-action-buttons">
          <Link
            to={`/bookings?shopId=${product.shopId || ""}&shopName=${encodeURIComponent(product.shopName || "TyreSaathi Partner Hub")}&shopPhone=${encodeURIComponent(product.shopPhone || "")}&service=${encodeURIComponent(product.productName || "Tyre Purchase & Fitment")}&openModal=true`}
            className="card-book-service-btn"
          >
            <Calendar size={14} /> Book / Buy
          </Link>

          {product.shopPhone && (
            <a href={`tel:${product.shopPhone}`} className="card-call-shop-btn" title="Call Shop">
              <Phone size={14} /> Call
            </a>
          )}
        </div>
      </div>

      <style>{`
        .product-item-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 14px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .product-item-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.09);
          border-color: #c0392b;
        }
        .card-img-wrapper {
          position: relative;
          height: 240px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 12px;
          border-bottom: 1px solid var(--border);
        }
        .main-card-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .product-item-card:hover .main-card-img {
          transform: scale(1.04);
        }
        .card-discount-pill {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #c0392b;
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.4);
          z-index: 2;
        }
        .card-distance-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 11.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 14px;
          color: white;
          z-index: 2;
        }
        .dist-nearest {
          background: rgba(22, 163, 74, 0.95);
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.4);
        }
        .dist-far {
          background: rgba(30, 41, 59, 0.85);
        }
        .card-thumbs-strip {
          display: flex;
          gap: 8px;
          padding: 8px 12px;
          background: var(--surface-2);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }
        .card-mini-thumb {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          padding: 2px;
          overflow: hidden;
          cursor: pointer;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .thumb-selected {
          border-color: #c0392b;
          box-shadow: 0 0 0 1.5px #c0392b;
        }
        .card-mini-thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .card-info-content {
          padding: 14px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .brand-size-tag-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .brand-badge-tag {
          font-size: 13px;
          font-weight: 800;
          color: #c0392b;
          text-transform: uppercase;
        }
        .size-badge-tag {
          font-size: 13px;
          font-weight: 700;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 3px 9px;
          border-radius: 6px;
          color: var(--text);
        }
        .condition-badge-tag {
          font-size: 12.5px;
          color: var(--text-muted);
          font-weight: 600;
        }
        .card-product-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text);
          margin: 0;
          line-height: 1.35;
        }
        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .card-selling-price {
          font-size: 1.6rem;
          font-weight: 800;
          color: #16a34a;
        }
        .card-mrp-price {
          font-size: 0.95rem;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .card-shop-banner {
          background: var(--bg);
          padding: 10px 12px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border: 1px solid var(--border);
        }
        .shop-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 14px;
          color: var(--text);
        }
        .stock-info-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .card-action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 8px;
        }
        .card-book-service-btn {
          flex: 1;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: white;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 11px 16px;
          box-shadow: 0 2px 10px rgba(192, 57, 43, 0.3);
          transition: transform 0.15s ease;
        }
        .card-book-service-btn:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }
        .card-call-shop-btn {
          background: #16a34a;
          color: white;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 11px 18px;
          transition: background 0.15s ease;
        }
        .card-call-shop-btn:hover {
          background: #15803d;
        }
      `}</style>
    </div>
  );
}
