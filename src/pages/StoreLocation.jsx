import React, { useState, useEffect } from "react";
import { Search, MapPin, Phone, Star, Navigation, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { SAMPLE_SHOPS } from "../config/tyreCatalog";
import { trackStoreEvent } from "../utils/analyticsTracker";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function StoreLocation() {
  const [shopsList, setShopsList] = useState(SAMPLE_SHOPS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState(SAMPLE_SHOPS[0]);
  const [filterCity, setFilterCity] = useState("all");

  // Track page view on load
  useEffect(() => {
    trackStoreEvent("view", { page: "store_location" });
  }, []);

  // Fetch real registered shops from Firestore
  useEffect(() => {
    async function loadFirestoreShops() {
      try {
        const snap = await getDocs(collection(db, "users"));
        if (!snap.empty) {
          const vendors = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((u) => u.role === "vendor" || u.role === "admin" || u.shopName);
          if (vendors.length > 0) {
            const mapped = vendors.map((v, idx) => {
              const shopServices = v.services || v.servicesOffered || ["3D Wheel Alignment", "Tubeless Tyre Repair", "Nitrogen Air Fill", "Laser Wheel Balancing"];
              return {
                id: v.id || v.uid,
                name: v.shopName || v.name || "TyreSaathi Partner Hub",
                city: v.city || "Raipur",
                address: v.address || "TyreSaathi Partner Hub",
                phone: v.phone || "8877277757",
                rating: v.rating || 4.9,
                reviewsCount: v.reviewsCount || 28,
                distanceKm: (1.2 + idx * 0.8).toFixed(1),
                isNearest: idx === 0,
                services: shopServices,
                servicesOffered: shopServices,
                timing: "Mon - Sun: 09:00 AM - 09:00 PM",
                lat: 21.2514,
                lng: 81.6296
              };
            });
            setShopsList(mapped);
            setSelectedShop(mapped[0]);
          }
        }
      } catch (err) {
        console.warn("Firestore shops load fallback:", err);
      }
    }
    loadFirestoreShops();
  }, []);

  const filteredShops = shopsList.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === "all" || shop.city.toLowerCase() === filterCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const cities = ["all", ...new Set(shopsList.map((s) => s.city))];

  return (
    <div className="store-location-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-bar">
        <span>Home</span> / <span>Store Location</span>
      </div>

      <div className="store-locator-container">
        {/* Left Side: Store List & Search */}
        <div className="store-sidebar">
          <h1 className="store-main-title">Find a Store Near You</h1>

          <div className="store-search-box">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon-inside" />
              <input
                type="text"
                placeholder="Search by city or store name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="search-submit-btn" onClick={() => {}}>
              Search
            </button>
          </div>

          {/* City Filter Pills */}
          <div className="city-pill-row">
            {cities.map((city) => (
              <button
                key={city}
                className={`city-pill ${filterCity === city ? "city-pill-active" : ""}`}
                onClick={() => setFilterCity(city)}
              >
                {city === "all" ? "All Locations" : city}
              </button>
            ))}
          </div>

          <div className="store-count-badge">
            Showing {filteredShops.length} TyreSaathi Authorized Stores
          </div>

          {/* Store List */}
          <div className="store-list-scroll">
            {filteredShops.length === 0 ? (
              <div className="no-stores-found">
                <MapPin size={32} color="#999" />
                <p>No stores found for "{searchTerm}". Try another city.</p>
              </div>
            ) : (
              filteredShops.map((shop) => (
                <div
                  key={shop.id}
                  className={`store-item-card ${selectedShop?.id === shop.id ? "store-item-selected" : ""}`}
                  onClick={() => setSelectedShop(shop)}
                >
                  <div className="store-card-header">
                    <h3 className="store-name">{shop.name}</h3>
                    {shop.isNearest && <span className="nearest-tag">⚡ Nearest</span>}
                  </div>

                  <div className="store-rating-row">
                    <span className="rating-badge">
                      <Star size={13} fill="#ffc107" color="#ffc107" /> {shop.rating}
                    </span>
                    <span className="reviews-text">({shop.reviewsCount} reviews)</span>
                    <span className="distance-text">📍 {shop.distanceKm} km away</span>
                  </div>

                  <p className="store-address">{shop.address}</p>

                  <div className="store-services-chips">
                    {(shop.servicesOffered || shop.services || []).slice(0, 3).map((svc, idx) => (
                      <span key={idx} className="svc-chip">✓ {svc}</span>
                    ))}
                  </div>

                  <div className="store-card-actions">
                    <button
                      className="view-on-map-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedShop(shop);
                        trackStoreEvent("map_direction", { shopName: shop.name, city: shop.city });
                      }}
                    >
                      <Navigation size={13} /> View on Map
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="google-maps-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        trackStoreEvent("map_direction", { shopName: shop.name, city: shop.city });
                      }}
                    >
                      Open in Maps <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Interactive Map View */}
        <div className="store-map-wrapper">
          {selectedShop && (
            <div className="map-info-popup">
              <div className="popup-top">
                <div>
                  <h4 className="popup-title">{selectedShop.name}</h4>
                  <p className="popup-address">{selectedShop.address}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedShop.name + " " + selectedShop.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="popup-external-icon"
                  title="Open in Google Maps"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="popup-rating">
                <span className="star-num">{selectedShop.rating} ★</span>
                <span className="reviews-count">({selectedShop.reviewsCount} reviews)</span>
                <span className="open-badge">
                  <CheckCircle2 size={13} color="#27ae60" /> Verified TyreSaathi Hub
                </span>
              </div>
              <div className="popup-services">
                <strong>Services:</strong> {(selectedShop.servicesOffered || selectedShop.services || ["Tyre Replacement", "Wheel Alignment", "Puncture Repair"]).join(" • ")}
              </div>
              <div className="popup-action-buttons">
                <a
                  href="/bookings"
                  className="popup-call-btn"
                  style={{ background: "#c0392b", color: "white", textDecoration: "none" }}
                >
                  📅 Book at this Hub
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedShop.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="popup-directions-btn"
                >
                  <Navigation size={14} /> Get Directions
                </a>
              </div>
            </div>
          )}

          {/* Visual Interactive Map Canvas */}
          <div className="interactive-map-canvas">
            {/* Real OpenStreetMap Embedded Frame for Selected Shop Location */}
            <iframe
              title="Store Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${selectedShop ? encodeURIComponent(selectedShop.address) : "Transport Nagar, Rawabhatha, Raipur, Chhattisgarh"}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </div>

      <style>{`
        .store-location-page {
          max-width: 1350px;
          margin: 0 auto;
          padding: 6px 4px 30px;
        }
        .breadcrumbs-bar {
          font-size: 0.75rem; /* text-xs */
          color: var(--text-muted);
          margin-bottom: 12px;
          display: flex;
          gap: 4px;
        }
        .breadcrumbs-bar span:last-child {
          color: var(--text);
          font-weight: 600;
        }
        .store-locator-container {
          display: flex;
          gap: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          min-height: 640px;
        }
        @media (max-width: 900px) {
          .store-locator-container {
            flex-direction: column;
            border-radius: 10px;
            min-height: auto;
          }
        }
        .store-sidebar {
          flex: 0 0 380px;
          max-width: 420px;
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border);
          background: var(--surface);
        }
        @media (max-width: 900px) {
          .store-sidebar {
            flex: none;
            max-width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 14px 10px;
          }
        }
        .store-main-title {
          font-size: 1.25rem; /* text-xl on mobile */
          font-weight: 800;
          color: var(--text);
          margin: 0 0 10px;
          line-height: 1.25;
        }
        @media (min-width: 640px) {
          .store-main-title {
            font-size: 1.5rem;
          }
        }
        .store-search-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon-inside {
          position: absolute;
          left: 10px;
          color: var(--text-muted);
          width: 16px;
          height: 16px;
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 8px 10px 8px 32px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.8125rem;
          outline: none;
        }
        .search-input-wrapper input:focus {
          border-color: #691b38;
        }
        .search-submit-btn {
          background: #631936;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .search-submit-btn:hover {
          background: #4b1227;
        }
        .city-pill-row {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding-bottom: 6px;
          margin-bottom: 10px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .city-pill-row::-webkit-scrollbar {
          display: none;
        }
        .city-pill {
          padding: 4px 10px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text);
          font-size: 0.72rem;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
        }
        .city-pill-active {
          background: #631936;
          color: white;
          border-color: #631936;
        }
        .store-count-badge {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-bottom: 10px;
          font-weight: 600;
        }
        .store-list-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-right: 2px;
          max-height: 480px;
        }
        .store-item-card {
          padding: 12px 10px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .store-item-card:hover {
          border-color: #631936;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }
        .store-item-selected {
          border-color: #631936;
          background: color-mix(in srgb, #631936 5%, var(--surface));
          box-shadow: 0 2px 12px rgba(99, 25, 54, 0.15);
        }
        .store-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 6px;
          margin-bottom: 4px;
        }
        .store-name {
          font-size: 0.875rem; /* text-sm */
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: 1.25;
        }
        .nearest-tag {
          font-size: 0.6875rem;
          background: #e67e22;
          color: white;
          padding: 2px 5px;
          border-radius: 4px;
          font-weight: 700;
          white-space: nowrap;
        }
        .store-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          margin-bottom: 6px;
        }
        .rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          font-weight: 700;
          color: #d35400;
        }
        .reviews-text {
          color: var(--text-muted);
        }
        .distance-text {
          color: #27ae60;
          font-weight: 600;
          margin-left: auto;
        }
        .store-address {
          font-size: 0.75rem; /* text-xs */
          color: var(--text-muted);
          line-height: 1.35;
          margin: 0 0 8px;
        }
        .store-services-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 8px;
        }
        .svc-chip {
          font-size: 0.6875rem;
          background: var(--surface-2);
          color: var(--text);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
        .store-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 6px;
          border-top: 1px dashed var(--border);
        }
        .view-on-map-btn {
          background: none;
          border: none;
          color: #631936;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          padding: 0;
        }
        .view-on-map-btn:hover {
          text-decoration: underline;
        }
        .google-maps-link {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .google-maps-link:hover {
          color: #631936;
        }
        .store-map-wrapper {
          flex: 1;
          position: relative;
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }
        .interactive-map-canvas {
          flex: 1;
          width: 100%;
          min-height: 500px;
          background: #e8ecef;
        }
        .map-info-popup {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 12px;
          max-width: 320px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          color: #222;
        }
        .popup-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 6px;
        }
        .popup-title {
          margin: 0 0 3px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #111;
        }
        .popup-address {
          margin: 0;
          font-size: 0.75rem;
          color: #555;
          line-height: 1.3;
        }
        .popup-external-icon {
          color: #631936;
          padding: 2px;
        }
        .popup-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          margin-bottom: 6px;
        }
        .star-num {
          font-weight: 700;
          color: #d35400;
        }
        .open-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          color: #27ae60;
          font-weight: 600;
        }
        .popup-services {
          font-size: 0.6875rem;
          color: #666;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .popup-action-buttons {
          display: flex;
          gap: 6px;
        }
        .popup-call-btn,
        .popup-directions-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 7px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-decoration: none;
          text-align: center;
        }
        .popup-call-btn {
          background: #27ae60;
          color: white;
        }
        .popup-directions-btn {
          background: #631936;
          color: white;
        }
        .no-stores-found {
          padding: 30px 16px;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8125rem;
        }

        @media (max-width: 900px) {
          .store-map-wrapper {
            min-height: 280px;
          }
          .interactive-map-canvas {
            min-height: 280px;
          }
          .map-info-popup {
            position: relative;
            top: 0;
            left: 0;
            max-width: 100%;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
        }
      `}</style>
    </div>
  );
}
