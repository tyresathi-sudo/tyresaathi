import React, { useState } from "react";
import { Search, MapPin, Phone, Star, Navigation, Clock, CheckCircle2, ExternalLink } from "lucide-react";
import { SAMPLE_SHOPS } from "../config/tyreCatalog";

export default function StoreLocation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState(SAMPLE_SHOPS[0]);
  const [filterCity, setFilterCity] = useState("all");

  const filteredShops = SAMPLE_SHOPS.filter((shop) => {
    const matchesSearch =
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === "all" || shop.city.toLowerCase() === filterCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const cities = ["all", ...new Set(SAMPLE_SHOPS.map((s) => s.city))];

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
                    {shop.servicesOffered?.slice(0, 3).map((svc, idx) => (
                      <span key={idx} className="svc-chip">✓ {svc}</span>
                    ))}
                  </div>

                  <div className="store-card-actions">
                    <button
                      className="view-on-map-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedShop(shop);
                      }}
                    >
                      <Navigation size={13} /> View on Map
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="google-maps-link"
                      onClick={(e) => e.stopPropagation()}
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
                <strong>Services:</strong> {selectedShop.servicesOffered.join(" • ")}
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
              src={`https://maps.google.com/maps?q=${selectedShop ? encodeURIComponent(selectedShop.address) : "Bengaluru"}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </div>

      <style>{`
        .store-location-page {
          max-width: 1350px;
          margin: 0 auto;
          padding: 10px 15px 40px;
        }
        .breadcrumbs-bar {
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 16px;
          display: flex;
          gap: 6px;
        }
        .breadcrumbs-bar span:last-child {
          color: var(--text);
          font-weight: 600;
        }
        .store-locator-container {
          display: flex;
          gap: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          min-height: 720px;
        }
        @media (max-width: 900px) {
          .store-locator-container {
            flex-direction: column;
          }
        }
        .store-sidebar {
          flex: 0 0 420px;
          max-width: 450px;
          padding: 24px;
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
          }
        }
        .store-main-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }
        .store-search-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-icon-inside {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }
        .search-input-wrapper input {
          width: 100%;
          padding: 12px 14px 12px 38px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 14px;
          outline: none;
        }
        .search-input-wrapper input:focus {
          border-color: #691b38;
        }
        .search-submit-btn {
          background: #631936;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .search-submit-btn:hover {
          background: #4b1227;
        }
        .city-pill-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .city-pill {
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text);
          font-size: 12px;
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
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 12px;
          font-weight: 600;
        }
        .store-list-scroll {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding-right: 4px;
          max-height: 520px;
        }
        .store-item-card {
          padding: 16px;
          border-radius: 10px;
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
          gap: 8px;
          margin-bottom: 6px;
        }
        .store-name {
          font-size: 15.5px;
          font-weight: 700;
          color: var(--text);
          margin: 0;
        }
        .nearest-tag {
          font-size: 11px;
          background: #e67e22;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 700;
          white-space: nowrap;
        }
        .store-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          margin-bottom: 8px;
        }
        .rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
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
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0 0 10px;
        }
        .store-services-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }
        .svc-chip {
          font-size: 11px;
          background: var(--surface-2);
          color: var(--text);
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        .store-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px dashed var(--border);
        }
        .view-on-map-btn {
          background: none;
          border: none;
          color: #631936;
          font-size: 12.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 0;
        }
        .view-on-map-btn:hover {
          text-decoration: underline;
        }
        .google-maps-link {
          font-size: 12px;
          color: var(--text-muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .google-maps-link:hover {
          color: #631936;
        }
        .store-map-wrapper {
          flex: 1;
          position: relative;
          min-height: 600px;
          display: flex;
          flex-direction: column;
        }
        .interactive-map-canvas {
          flex: 1;
          width: 100%;
          min-height: 600px;
          background: #e8ecef;
        }
        .map-info-popup {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(8px);
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          max-width: 360px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          color: #222;
        }
        .popup-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 8px;
        }
        .popup-title {
          margin: 0 0 4px;
          font-size: 15px;
          font-weight: 700;
          color: #111;
        }
        .popup-address {
          margin: 0;
          font-size: 12px;
          color: #555;
          line-height: 1.3;
        }
        .popup-external-icon {
          color: #631936;
          padding: 4px;
          border-radius: 4px;
        }
        .popup-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .star-num {
          font-weight: 700;
          color: #d35400;
        }
        .open-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #27ae60;
          font-weight: 600;
        }
        .popup-services {
          font-size: 11.5px;
          color: #666;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .popup-action-buttons {
          display: flex;
          gap: 8px;
        }
        .popup-call-btn,
        .popup-directions-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 12px;
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
          padding: 40px 20px;
          text-align: center;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
