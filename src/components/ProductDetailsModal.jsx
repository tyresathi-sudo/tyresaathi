import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  X, 
  Package, 
  Calendar, 
  Phone, 
  MessageCircle, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Maximize2, 
  ShoppingCart, 
  Tag, 
  Star,
  Sparkles,
  AlertCircle
} from "lucide-react";

export default function ProductDetailsModal({ product, onClose }) {
  const navigate = useNavigate();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else if (onClose) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed, onClose]);

  if (!product) return null;

  // Extract images array
  const images = (Array.isArray(product.images) && product.images.filter(Boolean).length > 0)
    ? product.images.filter(Boolean)
    : [product.imageUrl || "/tyresaathi-logo.png"];

  const currentImage = images[activeImgIndex] || images[0] || "/tyresaathi-logo.png";

  const stockNum = product.stock !== undefined && product.stock !== null && product.stock !== "" 
    ? Number(product.stock) 
    : null;
  const isOutOfStock = stockNum !== null && stockNum <= 0;
  const isLowStock = stockNum !== null && stockNum > 0 && stockNum <= 3;

  const unitPrice = Number(product.offerPrice || product.price || 0);
  const mrpPrice = Number(product.originalPrice || 0);
  const discountPercent = (mrpPrice > 0 && unitPrice > 0 && mrpPrice > unitPrice)
    ? Math.round(((mrpPrice - unitPrice) / mrpPrice) * 100)
    : null;

  const shopPhone = product.shopPhone || product.phone || "";
  const shopName = product.shopName || "TyreSaathi Verified Partner";
  const shopCity = product.city || product.shopAddress || "";

  // Add to cart handler
  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    if (isOutOfStock) {
      setToastMessage("⚠️ Yeh tyre filhal out of stock hai.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    try {
      const existingCart = JSON.parse(localStorage.getItem("tyresaathi_cart") || "[]");
      const shopId = product.shopId || "hub_partner";
      const existingIndex = existingCart.findIndex(
        (item) => item.productId === product.id && item.shopId === shopId
      );

      if (existingIndex > -1) {
        const newQty = existingCart[existingIndex].quantity + quantity;
        existingCart[existingIndex].quantity = stockNum > 0 ? Math.min(newQty, stockNum) : newQty;
      } else {
        existingCart.push({
          id: `cart_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          productId: product.id,
          productName: product.productName || product.sizeName || "Tyre",
          brandName: product.brandName || "",
          sizeName: product.sizeName || product.size || "",
          price: unitPrice,
          mrp: mrpPrice,
          quantity: quantity,
          condition: product.condition || "new",
          image: currentImage,
          shopId: shopId,
          shopName: shopName,
          addedAt: new Date().toISOString()
        });
      }

      localStorage.setItem("tyresaathi_cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));

      setToastMessage(`✅ ${quantity}x "${product.productName || 'Tyre'}" cart me add ho gaya!`);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  const handleBookNow = () => {
    if (onClose) onClose();
    const serviceName = `${product.productName || 'Tyre'} (${product.brandName || ''} ${product.sizeName || ''}) Purchase & Fitment`;
    navigate(`/bookings?shopId=${product.shopId || ""}&shopName=${encodeURIComponent(shopName)}&shopPhone=${encodeURIComponent(shopPhone)}&service=${encodeURIComponent(serviceName)}&openModal=true`);
  };

  const cleanPhone = shopPhone.replace(/[^0-9]/g, "");
  const waUrl = cleanPhone 
    ? `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${shopName}, maine TyreSaathi par "${product.productName || 'Tyre'} (Size: ${product.sizeName || 'N/A'}, Brand: ${product.brandName || 'N/A'})" dekha hai. Iska stock aur fitting available hai kya?`)}`
    : null;

  return (
    <>
      <div className="product-details-backdrop" onClick={onClose}>
        <div 
          className="product-details-modal-card" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="pdm-header">
            <div className="pdm-header-left">
              <div className="pdm-icon-badge">
                <Package size={20} color="#c0392b" />
              </div>
              <div className="pdm-header-text">
                <div className="pdm-tag-line">
                  <span className="pdm-category-tag">
                    {product.vehicleTypeName || product.categoryName || "TYRE & ACCESSORIES"}
                  </span>
                  {product.distanceKm && (
                    <span className="pdm-dist-pill">
                      📍 {product.distanceKm} km (Nearest)
                    </span>
                  )}
                </div>
                <h3 className="pdm-title">{product.productName || "Tyre Details"}</h3>
              </div>
            </div>

            <button 
              type="button" 
              className="pdm-close-btn" 
              onClick={onClose}
              title="Close (ESC)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="pdm-toast-banner">
              <CheckCircle2 size={16} /> {toastMessage}
            </div>
          )}

          {/* Body */}
          <div className="pdm-body">
            {/* 📸 IMAGE & GALLERY SECTION */}
            <div className="pdm-image-section">
              <div className="pdm-main-image-wrap">
                <img 
                  src={currentImage} 
                  alt={product.productName} 
                  className="pdm-main-image"
                  onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
                />

                {/* Badges on image */}
                <div className="pdm-img-badges">
                  {product.condition === "old" ? (
                    <span className="pdm-badge-used">♻️ Re-mould / Used</span>
                  ) : (
                    <span className="pdm-badge-new">✨ Brand New</span>
                  )}
                  {discountPercent && (
                    <span className="pdm-badge-discount">{discountPercent}% OFF</span>
                  )}
                </div>

                {/* Zoom Click Trigger */}
                <button 
                  type="button"
                  className="pdm-zoom-trigger-btn"
                  onClick={() => setIsZoomed(true)}
                  title="Click to view full photo / zoom"
                >
                  <Maximize2 size={13} /> बड़ी फोटो देखें (Zoom)
                </button>
              </div>

              {/* Thumbnails list if multi-images exist */}
              {images.length > 1 && (
                <div className="pdm-thumbs-strip">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`pdm-thumb-btn ${idx === activeImgIndex ? "active" : ""}`}
                      onClick={() => setActiveImgIndex(idx)}
                      title={`Photo angle ${idx + 1}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Angle ${idx + 1}`} 
                        onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 🏷️ DETAILS & SPECS SECTION */}
            <div className="pdm-content-section">
              {/* Brand and Size Pills */}
              <div className="pdm-brand-size-row">
                <span className="pdm-brand-pill">
                  <Tag size={12} /> {product.brandName || "Genuine Brand"}
                </span>
                {(product.sizeName || product.size || product.customSize) && (
                  <span className="pdm-size-pill">
                    📏 {product.sizeName || product.size || product.customSize}
                  </span>
                )}
                {product.tyreType && (
                  <span className="pdm-type-pill">
                    ⚡ {product.tyreType}
                  </span>
                )}
              </div>

              {/* Price Block */}
              <div className="pdm-price-block">
                <div className="pdm-price-main-line">
                  <span className="pdm-current-price">₹{unitPrice.toLocaleString("en-IN")}</span>
                  {mrpPrice > unitPrice && (
                    <span className="pdm-mrp-price">₹{mrpPrice.toLocaleString("en-IN")}</span>
                  )}
                  {discountPercent && (
                    <span className="pdm-save-pill">
                      Save ₹{(mrpPrice - unitPrice).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="pdm-price-subtext">
                  ✅ Includes GST & Verified TyreSaathi Fitment Assistance
                </span>
              </div>

              {/* Live Stock Alert Banner */}
              <div className={`pdm-stock-alert-box ${isOutOfStock ? "stock-out" : isLowStock ? "stock-low" : "stock-ok"}`}>
                {isOutOfStock ? (
                  <>
                    <AlertCircle size={18} className="stock-alert-icon" />
                    <div>
                      <strong>Currently Out of Stock (0 Available)</strong>
                      <p>Is shop par ye tyre filhal uplabdh nahi hai.</p>
                    </div>
                  </>
                ) : isLowStock ? (
                  <>
                    <span className="stock-alert-emoji">⚠️</span>
                    <div>
                      <strong>Low Stock Alert: Sirf {stockNum} Tyres Baaki Hain!</strong>
                      <p>Turant book karein taaki stock khatam na ho.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="stock-alert-dot" />
                    <div>
                      <strong>
                        {stockNum !== null ? `Stock: ${stockNum} Tyres Available` : "Ready in Stock (दुकान में उपलब्ध)"}
                      </strong>
                      <p>Instant fitment aur inspection ke liye shop par tayyar hai.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Full Technical Specifications Grid */}
              <div className="pdm-specs-card">
                <div className="pdm-specs-title">
                  <ShieldCheck size={14} color="#c0392b" />
                  <span>Full Technical Specifications (पूरी जानकारी)</span>
                </div>

                <div className="pdm-specs-grid">
                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">🏷️ Brand (ब्रांड)</span>
                    <strong className="pdm-spec-value">{product.brandName || "Apollo / CEAT / MRF"}</strong>
                  </div>

                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">🛞 Tyre Size (साइज)</span>
                    <strong className="pdm-spec-value highlight-size">
                      {product.sizeName || product.size || product.customSize || "Standard"}
                    </strong>
                  </div>

                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">🚗 Vehicle Type (गाड़ी)</span>
                    <span className="pdm-spec-value">
                      {product.vehicleTypeName || product.categoryName || "Commercial / Passenger"}
                    </span>
                  </div>

                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">🔧 Type / Construction</span>
                    <span className="pdm-spec-value">{product.tyreType || "Tubeless"}</span>
                  </div>

                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">🛡️ Condition (हालत)</span>
                    <span className="pdm-spec-value">
                      {product.condition === "old" ? "♻️ Re-mould / Tested Used" : "✨ Brand New (Fresh Batch)"}
                    </span>
                  </div>

                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">📜 Warranty (वारंटी)</span>
                    <span className="pdm-spec-value">{product.warranty || "Standard Manufacturer Warranty"}</span>
                  </div>

                  <div className="pdm-spec-row">
                    <span className="pdm-spec-label">🏪 Partner Shop (दुकान)</span>
                    <strong className="pdm-spec-value">{shopName}</strong>
                  </div>

                  {shopCity && (
                    <div className="pdm-spec-row">
                      <span className="pdm-spec-label">📍 Location (पता)</span>
                      <span className="pdm-spec-value">{shopCity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Stepper & Subtotal (if in stock) */}
              {!isOutOfStock && (
                <div className="pdm-qty-row">
                  <div className="pdm-qty-label-box">
                    <span className="pdm-qty-label">Quantity (टायर संख्या):</span>
                    <small className="pdm-qty-hint">
                      {stockNum ? `Max available: ${stockNum}` : "Kitne tyre chahiye chunein"}
                    </small>
                  </div>

                  <div className="pdm-qty-stepper">
                    <button
                      type="button"
                      className="pdm-qty-btn"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    >
                      -
                    </button>
                    <span className="pdm-qty-val">{quantity}</span>
                    <button
                      type="button"
                      className="pdm-qty-btn"
                      disabled={stockNum ? quantity >= stockNum : quantity >= 10}
                      onClick={() => setQuantity(prev => (stockNum ? Math.min(stockNum, prev + 1) : prev + 1))}
                    >
                      +
                    </button>
                  </div>

                  <div className="pdm-total-calc">
                    <span className="calc-label">Total ({quantity} Tyre):</span>
                    <strong className="calc-amount">₹{(unitPrice * quantity).toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pdm-action-buttons">
                <button
                  type="button"
                  className="pdm-btn-cart"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>

                <button
                  type="button"
                  className="pdm-btn-book"
                  disabled={isOutOfStock}
                  onClick={handleBookNow}
                >
                  <Calendar size={16} /> Book Service / Fitment
                </button>

                {shopPhone && (
                  <a href={`tel:${shopPhone}`} className="pdm-btn-call" title={`Call ${shopName}`}>
                    <Phone size={15} /> Call
                  </a>
                )}

                {waUrl && (
                  <a 
                    href={waUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="pdm-btn-wa" 
                    title="Ask on WhatsApp"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 FULLSCREEN IMAGE ZOOM LIGHTBOX */}
      {isZoomed && (
        <div className="pdm-lightbox-overlay" onClick={() => setIsZoomed(false)}>
          <button 
            type="button" 
            className="pdm-lightbox-close" 
            onClick={() => setIsZoomed(false)}
            title="Close Zoom (ESC)"
          >
            <X size={24} />
          </button>

          <div className="pdm-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={currentImage} 
              alt={product.productName} 
              className="pdm-lightbox-img" 
              onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
            />
            <div className="pdm-lightbox-caption">
              <strong>{product.productName}</strong>
              <span>{product.brandName} • {product.sizeName || product.size} • 🏪 {shopName}</span>
            </div>
          </div>
        </div>
      )}

      {/* 🎨 CSS STYLING */}
      <style>{`
        .product-details-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          overflow-y: auto;
          animation: pdmFadeIn 0.2s ease-out;
        }

        @keyframes pdmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .product-details-modal-card {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 18px;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          animation: pdmSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes pdmSlideUp {
          from { transform: translateY(20px) scale(0.97); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .pdm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 22px;
          border-bottom: 1.5px solid var(--border, #e2e8f0);
          background: var(--surface, #ffffff);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .pdm-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .pdm-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pdm-header-text {
          min-width: 0;
        }

        .pdm-tag-line {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .pdm-category-tag {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #c0392b;
        }

        .pdm-dist-pill {
          background: #dcfce7;
          color: #15803d;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 12px;
        }

        .pdm-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text, #0f172a);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pdm-close-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--surface-2, #f8fafc);
          color: var(--text, #334155);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .pdm-close-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }

        .pdm-toast-banner {
          background: #ecfdf5;
          color: #065f46;
          border-bottom: 1px solid #a7f3d0;
          padding: 10px 20px;
          font-size: 13.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pdm-body {
          padding: 20px;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 24px;
        }

        /* Image section */
        .pdm-image-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pdm-main-image-wrap {
          position: relative;
          width: 100%;
          height: 300px;
          background: #ffffff;
          border: 1.5px solid var(--border, #e2e8f0);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          overflow: hidden;
        }

        .pdm-main-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          transition: transform 0.25s ease;
        }

        .pdm-main-image-wrap:hover .pdm-main-image {
          transform: scale(1.05);
        }

        .pdm-img-badges {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          z-index: 2;
        }

        .pdm-badge-new {
          background: rgba(22, 163, 74, 0.95);
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .pdm-badge-used {
          background: rgba(217, 119, 6, 0.95);
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .pdm-badge-discount {
          background: #dc2626;
          color: white;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
          width: fit-content;
        }

        .pdm-zoom-trigger-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          border: none;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 12px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: background 0.15s ease;
        }

        .pdm-zoom-trigger-btn:hover {
          background: #0f172a;
        }

        .pdm-thumbs-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .pdm-thumb-btn {
          width: 54px;
          height: 54px;
          border-radius: 10px;
          border: 2px solid var(--border, #cbd5e1);
          background: #ffffff;
          padding: 3px;
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s ease;
        }

        .pdm-thumb-btn.active {
          border-color: #c0392b;
          box-shadow: 0 0 0 2px rgba(192, 57, 43, 0.2);
        }

        .pdm-thumb-btn img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        /* Content section */
        .pdm-content-section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pdm-brand-size-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pdm-brand-pill {
          background: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fca5a5;
          font-size: 12.5px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-transform: uppercase;
        }

        .pdm-size-pill {
          background: var(--surface-2, #f1f5f9);
          border: 1px solid var(--border, #cbd5e1);
          color: var(--text, #1e293b);
          font-size: 12.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .pdm-type-pill {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 9px;
          border-radius: 8px;
        }

        /* Price */
        .pdm-price-block {
          background: var(--surface-2, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 12px;
          padding: 12px 16px;
        }

        .pdm-price-main-line {
          display: flex;
          align-items: baseline;
          gap: 12px;
          flex-wrap: wrap;
        }

        .pdm-current-price {
          font-size: 1.85rem;
          font-weight: 900;
          color: #16a34a;
        }

        .pdm-mrp-price {
          font-size: 1.05rem;
          color: var(--text-muted, #64748b);
          text-decoration: line-through;
        }

        .pdm-save-pill {
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #86efac;
          font-size: 12px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .pdm-price-subtext {
          font-size: 11.5px;
          color: var(--text-muted, #64748b);
          display: block;
          margin-top: 4px;
        }

        /* Stock Alert */
        .pdm-stock-alert-box {
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
        }

        .pdm-stock-alert-box strong {
          display: block;
          font-size: 13px;
        }

        .pdm-stock-alert-box p {
          margin: 2px 0 0;
          font-size: 11.5px;
          opacity: 0.85;
        }

        .stock-ok {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
        }

        .stock-alert-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.25);
          flex-shrink: 0;
        }

        .stock-low {
          background: #fffbeb;
          border: 1px solid #fde68a;
          color: #92400e;
        }

        .stock-out {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
        }

        /* Specs table */
        .pdm-specs-card {
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 12px;
          overflow: hidden;
        }

        .pdm-specs-title {
          background: var(--surface-2, #f8fafc);
          padding: 10px 14px;
          font-size: 12.5px;
          font-weight: 800;
          color: var(--text, #1e293b);
          border-bottom: 1px solid var(--border, #e2e8f0);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pdm-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .pdm-spec-row {
          padding: 9px 12px;
          border-bottom: 1px solid var(--border, #f1f5f9);
          border-right: 1px solid var(--border, #f1f5f9);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .pdm-spec-label {
          font-size: 11px;
          color: var(--text-muted, #64748b);
          font-weight: 600;
        }

        .pdm-spec-value {
          font-size: 12.5px;
          color: var(--text, #1e293b);
          font-weight: 700;
          word-break: break-word;
        }

        .highlight-size {
          color: #c0392b;
        }

        /* Qty */
        .pdm-qty-row {
          background: var(--surface-2, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .pdm-qty-label-box {
          display: flex;
          flex-direction: column;
        }

        .pdm-qty-label {
          font-size: 12.5px;
          font-weight: 800;
          color: var(--text, #1e293b);
        }

        .pdm-qty-hint {
          font-size: 11px;
          color: var(--text-muted, #64748b);
        }

        .pdm-qty-stepper {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--border, #cbd5e1);
          border-radius: 8px;
          background: #ffffff;
          overflow: hidden;
        }

        .pdm-qty-btn {
          width: 34px;
          height: 32px;
          border: none;
          background: var(--surface-2, #f1f5f9);
          font-size: 16px;
          font-weight: 800;
          color: var(--text, #0f172a);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .pdm-qty-btn:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .pdm-qty-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pdm-qty-val {
          padding: 0 14px;
          font-size: 14px;
          font-weight: 800;
          color: var(--text, #0f172a);
        }

        .pdm-total-calc {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .calc-label {
          font-size: 11px;
          color: var(--text-muted, #64748b);
        }

        .calc-amount {
          font-size: 15px;
          font-weight: 900;
          color: #16a34a;
        }

        /* Action buttons */
        .pdm-action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .pdm-btn-cart {
          flex: 1;
          min-width: 140px;
          background: #c0392b;
          color: #ffffff;
          border: none;
          border-radius: 9px;
          padding: 10px 16px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .pdm-btn-cart:hover:not(:disabled) {
          background: #a93226;
          transform: translateY(-1px);
        }

        .pdm-btn-cart:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pdm-btn-book {
          flex: 1.2;
          min-width: 160px;
          background: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 9px;
          padding: 10px 16px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.15s ease, transform 0.1s ease;
        }

        .pdm-btn-book:hover:not(:disabled) {
          background: #1e293b;
          transform: translateY(-1px);
        }

        .pdm-btn-call {
          background: #16a34a;
          color: #ffffff;
          border-radius: 9px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: background 0.15s ease;
        }

        .pdm-btn-call:hover {
          background: #15803d;
        }

        .pdm-btn-wa {
          background: #25d366;
          color: #ffffff;
          border-radius: 9px;
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: background 0.15s ease;
        }

        .pdm-btn-wa:hover {
          background: #1ebd5a;
        }

        /* 🔍 Lightbox Overlay */
        .pdm-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 100000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: pdmFadeIn 0.2s ease-out;
        }

        .pdm-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .pdm-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .pdm-lightbox-content {
          max-width: 90vw;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .pdm-lightbox-img {
          max-width: 100%;
          max-height: 75vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          background: #ffffff;
          padding: 16px;
        }

        .pdm-lightbox-caption {
          margin-top: 14px;
          color: #ffffff;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pdm-lightbox-caption strong {
          font-size: 16px;
        }

        .pdm-lightbox-caption span {
          font-size: 13px;
          color: #cbd5e1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .pdm-body {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 14px;
          }
          .pdm-main-image-wrap {
            height: 240px;
          }
          .pdm-specs-grid {
            grid-template-columns: 1fr;
          }
          .pdm-spec-row {
            border-right: none;
          }
          .pdm-action-buttons {
            flex-direction: column;
          }
          .pdm-btn-cart,
          .pdm-btn-book,
          .pdm-btn-call,
          .pdm-btn-wa {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
