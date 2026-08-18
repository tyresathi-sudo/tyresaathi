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
  const [products, setProducts] = useState(INITIAL_FEATURED_PRODUCTS);

  // Sync state with URL params if they change
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (brandParam) setSelectedBrand(brandParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, brandParam, categoryParam]);

  // Load any newly published products from Firestore
  useEffect(() => {
    async function loadFirestoreProducts() {
      try {
        const snap = await getDocs(collection(db, "products"));
        if (!snap.empty) {
          const fetched = snap.docs.map((d) => ({
            id: d.id,
            distanceKm: 2.5, // default local distance for freshly added products
            isNearest: true,
            ...d.data(),
          }));
          // Merge with initial catalog
          setProducts((prev) => {
            const combined = [...fetched, ...INITIAL_FEATURED_PRODUCTS];
            const unique = Array.from(new Map(combined.map((item) => [item.id, item])).values());
            return unique;
          });
        }
      } catch (e) {
        console.warn("Using default catalog items:", e);
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
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .search-hero-bar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }
        .search-page-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .search-page-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0 0 16px;
        }
        .search-input-row {
          margin-bottom: 16px;
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
        }
        .search-bar-wrap input {
          width: 100%;
          padding: 14px 44px 14px 44px;
          border-radius: 10px;
          border: 2px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 15px;
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
          font-size: 14px;
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
          gap: 6px;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 8px;
        }
        .filter-select-wrap label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .filter-select-wrap select {
          border: none;
          background: none;
          color: var(--text);
          font-size: 13px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }
        .reset-all-filters-btn {
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: #c0392b;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Results Group */
        .results-group-section {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .group-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nearest-flame-icon {
          font-size: 22px;
        }
        .other-shops-icon {
          font-size: 20px;
        }
        .group-title {
          font-size: 18px;
          font-weight: 800;
          color: var(--text);
          margin: 0;
        }
        .group-count-tag {
          font-size: 12px;
          background: #27ae60;
          color: white;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 700;
        }

        /* Product Grid */
        .products-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        @media (max-width: 600px) {
          .products-card-grid {
            grid-template-columns: 1fr;
          }
        }

        .no-results-card {
          padding: 80px 20px;
          text-align: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 16px;
          color: var(--text-muted);
        }
        .btn-browse-all {
          margin-top: 16px;
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 700;
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
    : ["https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"];

  const [selectedImg, setSelectedImg] = useState(images[0]);

  const discount = (() => {
    const mrp = Number(product.originalPrice || 0);
    const offer = Number(product.offerPrice || 0);
    return mrp > 0 && offer > 0 && mrp > offer ? Math.round(((mrp - offer) / mrp) * 100) : 0;
  })();

  return (
    <div className="product-item-card">
      {/* Top Image Box */}
      <div className="card-img-wrapper">
        <img src={selectedImg} alt={product.productName} className="main-card-img" />

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
            to={`/bookings`}
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
          border: 1.5px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .product-item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #c0392b;
        }
        .card-img-wrapper {
          position: relative;
          height: 180px;
          background: #f8f9fa;
          overflow: hidden;
        }
        .main-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          padding: 3px 6px;
          border-radius: 4px;
        }
        .card-distance-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 12px;
          color: white;
        }
        .dist-nearest {
          background: rgba(39, 174, 96, 0.95);
          box-shadow: 0 2px 6px rgba(39, 174, 96, 0.4);
        }
        .dist-far {
          background: rgba(44, 62, 80, 0.85);
        }
        .card-thumbs-strip {
          display: flex;
          gap: 6px;
          padding: 6px 12px;
          background: var(--surface-2);
          border-bottom: 1px solid var(--border);
        }
        .card-mini-thumb {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid var(--border);
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          background: none;
        }
        .thumb-selected {
          border-color: #c0392b;
          border-width: 2px;
        }
        .card-mini-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .card-info-content {
          padding: 14px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .brand-size-tag-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }
        .brand-badge-tag {
          font-size: 11px;
          font-weight: 800;
          color: #c0392b;
          text-transform: uppercase;
        }
        .size-badge-tag {
          font-size: 11px;
          font-weight: 700;
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--text);
        }
        .condition-badge-tag {
          font-size: 11px;
          color: var(--text-muted);
        }
        .card-product-title {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px;
          line-height: 1.3;
          min-height: 38px;
        }
        .card-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 10px;
        }
        .card-selling-price {
          font-size: 20px;
          font-weight: 800;
          color: #27ae60;
        }
        .card-mrp-price {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .card-shop-banner {
          background: var(--bg);
          padding: 8px 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .shop-name-row {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          color: var(--text);
        }
        .stock-info-text {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .card-action-buttons {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }
        .card-book-service-btn {
          flex: 1;
          background: #c0392b;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 8px;
          box-shadow: 0 2px 6px rgba(192, 57, 43, 0.25);
        }
        .card-call-shop-btn {
          background: #27ae60;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 9px 12px;
        }
      `}</style>
    </div>
  );
}
