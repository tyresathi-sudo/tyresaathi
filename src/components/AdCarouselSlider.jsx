import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  ShieldCheck,
  Flame,
  Plus,
  Sparkles,
  Calendar,
  X,
  Megaphone,
  Upload,
  Camera,
  Loader2,
  Trash2
} from "lucide-react";
import { AD_THEMES, INITIAL_SHOP_ADS } from "../config/shopAdsData";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../context/AuthContext";

export default function AdCarouselSlider({ initialAds, onAdAdded }) {
  const { user, profile } = useAuth();
  const [ads, setAds] = useState(Array.isArray(initialAds) ? initialAds : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Swipe support for touch screens
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // New Ad form state
  const [newAd, setNewAd] = useState({
    shopName: profile?.shopName || "",
    tagline: "",
    offerBadge: "🔥 SPECIAL DISCOUNT",
    description: "",
    phone: profile?.phone || "8877277757",
    whatsapp: profile?.phone || "8877277757",
    city: profile?.city || "New Delhi",
    address: profile?.address || "",
    imageUrl: "",
    themeId: "crimson"
  });

  // Handle Photo Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Kripya 5MB se chhota photo chunein!");
      return;
    }

    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `shop_ads/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setNewAd((prev) => ({ ...prev, imageUrl: downloadUrl }));
    } catch (err) {
      console.warn("Storage upload fallback to Data URL:", err);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewAd((prev) => ({ ...prev, imageUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  // Sync ads if parent passes updated list
  useEffect(() => {
    setAds(Array.isArray(initialAds) ? initialAds : []);
  }, [initialAds]);

  // Auto slide every 4.5 seconds
  useEffect(() => {
    if (ads.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [ads.length, isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Create new Ad and update state / storage
  const handleCreateAd = async (e) => {
    e.preventDefault();
    if (!newAd.shopName || !newAd.tagline || !newAd.description) {
      alert("Kripya Shop Name, Tagline aur Offer details zaroor bharein!");
      return;
    }

    setSubmitting(true);
    const selectedTheme = AD_THEMES.find((t) => t.id === newAd.themeId) || AD_THEMES[2];

    const adData = {
      shopName: newAd.shopName,
      tagline: newAd.tagline,
      offerBadge: newAd.offerBadge,
      description: newAd.description,
      phone: newAd.phone,
      whatsapp: newAd.whatsapp,
      city: newAd.city,
      address: newAd.address,
      imageUrl: newAd.imageUrl || "",
      gradient: selectedTheme.gradient,
      badgeColor: selectedTheme.badgeColor,
      isActive: true,
      featured: true,
      views: 1,
      clicks: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };

    try {
      const docRef = await addDoc(collection(db, "shop_ads"), {
        ...adData,
        createdAtServer: serverTimestamp(),
      });
      const finalAd = { id: docRef.id, ...adData };
      const updatedList = [finalAd, ...ads];
      setAds(updatedList);
      localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updatedList));
      window.dispatchEvent(new CustomEvent("tyresaathi_ads_updated", { detail: updatedList }));
      if (onAdAdded) onAdAdded(finalAd);
    } catch (err) {
      console.warn("Firestore ad fallback:", err);
      const fallbackAd = { id: "ad-" + Date.now(), ...adData };
      const updatedList = [fallbackAd, ...ads];
      setAds(updatedList);
      localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(updatedList));
      window.dispatchEvent(new CustomEvent("tyresaathi_ads_updated", { detail: updatedList }));
      if (onAdAdded) onAdAdded(fallbackAd);
    } finally {
      setSubmitting(false);
      setModalOpen(false);
      setCurrentIndex(0); // Jump to new ad
      alert("🎉 Naya Offer Ad successfully Home Slider par laga diya gaya hai!");
    }
  };

  if (ads.length === 0) return null;

  return (
    <section className="ad-carousel-section">
      <div className="ad-carousel-header">
        <div className="header-left-title">
          <div className="ad-badge-tag">
            <Flame size={14} color="#ff6b35" />
            <span>EXCLUSIVE SPONSORED DEALS</span>
          </div>
          <h2 className="ad-section-title">
            Featured Shop Offers & Partner Deals (दुकानदार ऑफर्स)
          </h2>
        </div>

        <div className="header-right-actions">
          <button
            type="button"
            className="btn-add-ad-top"
            onClick={() => setModalOpen(true)}
          >
            <Plus size={15} /> + Add Your Shop Offer (ऐड लगाएं)
          </button>
        </div>
      </div>

      {/* Main Sliding Banner Frame */}
      <div
        className="ad-slider-viewport"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="ad-slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ads.map((ad, idx) => (
            <div key={ad.id || idx} className="ad-slide-item">
              <div
                className="ad-banner-card"
                style={{ background: ad.gradient || "linear-gradient(135deg, #870000 0%, #190a05 100%)" }}
              >
                {/* Top Row: Partner Badge & Offer Pill */}
                <div className="banner-top-row">
                  <div className="banner-partner-info">
                    <span className="partner-verified-badge">
                      <ShieldCheck size={14} color="#2ed573" /> Verified TyreSaathi Hub
                    </span>
                    <span className="banner-city-tag">📍 {ad.city}</span>
                  </div>

                  <span
                    className="banner-offer-pill"
                    style={{ background: ad.badgeColor || "#ff4757" }}
                  >
                    {ad.offerBadge}
                  </span>
                </div>

                {/* Body Content with optional Shop / Offer Image */}
                <div className="banner-main-layout">
                  <div className="banner-body-content">
                    <h3 className="banner-shop-title">{ad.shopName}</h3>
                    <h4 className="banner-tagline">{ad.tagline}</h4>
                    <p className="banner-desc">{ad.description}</p>
                    {ad.address && (
                      <div className="banner-address">
                        🏠 {ad.address}
                      </div>
                    )}
                  </div>
                  {ad.imageUrl && (
                    <div className="banner-image-container">
                      <img
                        src={ad.imageUrl}
                        alt={ad.shopName}
                        className="banner-ad-photo"
                        loading="lazy"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Actions Row */}
                <div className="banner-bottom-actions">
                  <div className="banner-contact-group">
                    {ad.phone && (
                      <a href={`tel:${ad.phone}`} className="btn-banner-call">
                        <Phone size={14} /> Call Shop ({ad.phone})
                      </a>
                    )}
                    {ad.whatsapp && (
                      <a
                        href={`https://wa.me/91${ad.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${ad.shopName}, maine TyreSaathi Home Banner par aapka offer (${ad.offerBadge}) dekha.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-banner-whatsapp"
                      >
                        <MessageSquare size={14} /> WhatsApp Inquiry
                      </a>
                    )}
                  </div>

                  <Link to="/bookings" className="btn-banner-book">
                    <Calendar size={14} /> 📅 Book Fitment Slot
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrow Controls */}
        {ads.length > 1 && (
          <>
            <button
              className="slider-arrow arrow-left"
              onClick={handlePrev}
              aria-label="Previous Offer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="slider-arrow arrow-right"
              onClick={handleNext}
              aria-label="Next Offer"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Indicator Dots */}
        {ads.length > 1 && (
          <div className="slider-dots-container">
            {ads.map((_, dotIdx) => (
              <button
                key={dotIdx}
                className={`slider-dot ${currentIndex === dotIdx ? "dot-active" : ""}`}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🌟 Add New Offer Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Megaphone size={20} color="#c0392b" />
                <h3 className="modal-title">Apni Shop Ka Naya Offer Ad Lagayein</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateAd} className="modal-form">
              <div className="modal-field">
                <label>Shop / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Madina Tyre Care & Services"
                  value={newAd.shopName}
                  onChange={(e) => setNewAd({ ...newAd, shopName: e.target.value })}
                />
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Offer Badge (बैज) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🔥 25% OFF + FREE FITMENT"
                    value={newAd.offerBadge}
                    onChange={(e) => setNewAd({ ...newAd, offerBadge: e.target.value })}
                  />
                </div>

                <div className="modal-field">
                  <label>City / Area *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. New Delhi / Patna"
                    value={newAd.city}
                    onChange={(e) => setNewAd({ ...newAd, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-field">
                <label>Offer Main Tagline (आकर्षक हेडलाइन) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Buy 4 MRF Tyres & Get Free Tube + Nitrogen Fill!"
                  value={newAd.tagline}
                  onChange={(e) => setNewAd({ ...newAd, tagline: e.target.value })}
                />
              </div>

              <div className="modal-field">
                <label>Offer Description / Details *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 5 Years unconditional warranty, instant 15-min fitting and doorstep service available."
                  value={newAd.description}
                  onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                />
              </div>

              <div className="modal-grid-2">
                <div className="modal-field">
                  <label>Phone Number (Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="8877277757"
                    value={newAd.phone}
                    onChange={(e) => setNewAd({ ...newAd, phone: e.target.value })}
                  />
                </div>

                <div className="modal-field">
                  <label>WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="8877277757"
                    value={newAd.whatsapp}
                    onChange={(e) => setNewAd({ ...newAd, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-field">
                <label>Shop Full Address</label>
                <input
                  type="text"
                  placeholder="e.g. Main Market, Near Metro Gate No. 2, Jamia Nagar"
                  value={newAd.address}
                  onChange={(e) => setNewAd({ ...newAd, address: e.target.value })}
                />
              </div>

              {/* 📸 Shop Photo / Offer Poster Image Upload */}
              <div className="modal-field" style={{ background: "rgba(0,0,0,0.02)", padding: "12px", borderRadius: "10px", border: "1.5px dashed var(--border, #cbd5e1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", margin: 0, fontSize: "13px" }}>
                    <Camera size={15} color="#c0392b" /> Shop Photo / Offer Image (दुकान या ऑफर का फोटो)
                  </label>
                  {newAd.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setNewAd((prev) => ({ ...prev, imageUrl: "" }))}
                      style={{ background: "none", border: "none", color: "#e74c3c", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>

                {newAd.imageUrl ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--surface, #fff)", padding: "8px", borderRadius: "8px", border: "1px solid var(--border, #e2e8f0)" }}>
                    <img
                      src={newAd.imageUrl}
                      alt="Offer Preview"
                      style={{ width: "70px", height: "52px", objectFit: "cover", borderRadius: "6px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#27ae60", display: "block" }}>
                        ✅ Photo Uploaded
                      </span>
                      <small style={{ color: "var(--text-muted, #64748b)", fontSize: "11px" }}>
                        Slider banner par offer details ke sath dikhegi.
                      </small>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      id="carousel-ad-photo-file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="carousel-ad-photo-file"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "11px",
                        borderRadius: "8px",
                        background: "var(--surface, #fff)",
                        border: "1.5px dashed #c0392b",
                        color: "#c0392b",
                        fontWeight: "700",
                        fontSize: "12.5px",
                        cursor: uploadingImage ? "not-allowed" : "pointer",
                        textAlign: "center"
                      }}
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> Uploading image to Cloud...
                        </>
                      ) : (
                        <>
                          <Upload size={14} /> 📁 Click to Upload Photo (Gallery se chunein)
                        </>
                      )}
                    </label>
                    <small style={{ color: "var(--text-muted, #64748b)", fontSize: "10.5px", display: "block", marginTop: "3px" }}>
                      * Optional (Max 5MB). Photo lagane se ad zyada aakarshak dikhta hai.
                    </small>
                  </div>
                )}
              </div>

              {/* Theme Color Picker */}
              <div className="modal-field">
                <label>Select Banner Style / Color</label>
                <div className="theme-options-grid">
                  {AD_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      className={`theme-chip ${newAd.themeId === theme.id ? "theme-chip-active" : ""}`}
                      style={{ background: theme.gradient }}
                      onClick={() => setNewAd({ ...newAd, themeId: theme.id })}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-ad" disabled={submitting}>
                  {submitting ? "Publishing..." : "🚀 Live Home Slider Par Lagayein"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .ad-carousel-section {
          margin: 28px 0;
          font-family: 'Inter', sans-serif;
        }

        .ad-carousel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .ad-badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          color: #ff6b35;
          letter-spacing: 0.8px;
          margin-bottom: 4px;
        }

        .ad-section-title {
          font-size: 19px;
          font-weight: 800;
          color: var(--text, #1c1c1e);
          margin: 0;
          letter-spacing: -0.4px;
        }

        .btn-add-ad-top {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #c0392b;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }
        .btn-add-ad-top:hover {
          background: #a93226;
          transform: translateY(-1px);
        }

        /* Viewport & Track */
        .ad-slider-viewport {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
        }

        .ad-slider-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          width: 100%;
        }

        .ad-slide-item {
          flex: 0 0 100%;
          min-width: 100%;
        }

        .ad-banner-card {
          padding: 24px 28px;
          border-radius: 20px;
          color: #ffffff;
          position: relative;
        }

        .banner-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .banner-partner-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .partner-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #2ed573;
        }

        .banner-city-tag {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
        }

        .banner-offer-pill {
          font-size: 12px;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 20px;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.5px;
        }

        .banner-main-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .banner-body-content {
          flex: 1;
          min-width: 0;
        }

        .banner-image-container {
          flex-shrink: 0;
          width: 140px;
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(0, 0, 0, 0.2);
        }

        .banner-ad-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 640px) {
          .banner-main-layout {
            flex-direction: column-reverse;
            align-items: flex-start;
          }
          .banner-image-container {
            width: 100%;
            height: 130px;
          }
        }

        .banner-shop-title {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .banner-tagline {
          font-size: 16px;
          font-weight: 700;
          color: #ffc145;
          margin: 0 0 6px 0;
          text-shadow: 0 1px 4px rgba(0,0,0,0.3);
        }

        .banner-desc {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          max-width: 780px;
          line-height: 1.45;
        }

        .banner-address {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 6px;
        }

        .banner-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .banner-contact-group {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-banner-call {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(6px);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-banner-call:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .btn-banner-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #25d366;
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);
          transition: all 0.2s;
        }
        .btn-banner-whatsapp:hover {
          background: #20ba59;
          transform: translateY(-1px);
        }

        .btn-banner-book {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #ffc145 0%, #ff6b35 100%);
          color: #1c1c1e;
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(255, 107, 53, 0.4);
          transition: all 0.2s;
        }
        .btn-banner-book:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.55);
        }

        /* Arrows */
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(6px);
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          transition: all 0.2s;
        }
        .slider-arrow:hover {
          background: rgba(0, 0, 0, 0.85);
          transform: translateY(-50%) scale(1.1);
        }
        .arrow-left { left: 12px; }
        .arrow-right { right: 12px; }

        /* Dots */
        .slider-dots-container {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 5;
        }

        .slider-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }
        .dot-active {
          width: 22px;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 16px;
        }

        .modal-card {
          background: #1c1c1e;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          max-width: 540px;
          width: 100%;
          padding: 22px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5);
          max-height: 90vh;
          overflow-y: auto;
          color: #f2f1ed;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .modal-title {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #a8acb3;
          cursor: pointer;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-field label {
          font-size: 12px;
          font-weight: 600;
          color: #cbd5e1;
        }

        .modal-field input, .modal-field textarea {
          background: #121214;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 9px 12px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
        }

        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .theme-options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
          gap: 8px;
        }

        .theme-chip {
          border: 2px solid transparent;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 8px 6px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .theme-chip-active {
          border-color: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
          transform: scale(1.03);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #cbd5e1;
          padding: 9px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-submit-ad {
          background: linear-gradient(135deg, #c0392b 0%, #d9381e 100%);
          color: #ffffff;
          border: none;
          padding: 9px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .ad-banner-card {
            padding: 18px;
          }
          .banner-shop-title {
            font-size: 20px;
          }
          .banner-tagline {
            font-size: 14px;
          }
          .modal-grid-2 {
            grid-template-columns: 1fr;
          }
          .slider-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
