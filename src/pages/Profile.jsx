import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Moon,
  Sun,
  LogOut,
  Phone,
  Mail,
  Store,
  ShieldCheck,
  Edit3,
  Camera,
  Save,
  X,
  MapPin,
  User,
  PlusCircle,
  CheckCircle2,
  Calendar,
  Settings as SettingsIcon
} from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth, ROLES } from "../context/AuthContext.jsx";
import { compressImage } from "../utils/imageOptimizer";
import { SHOP_PRIMARY_CATEGORIES, ALL_AVAILABLE_SERVICES, getCategoryByCode } from "../config/tyreCatalog";
import { getLiveUserLocation, INDIAN_CITIES_COORDS } from "../utils/geoService";

const ROLE_LABEL = {
  [ROLES.CUSTOMER]: "👤 Customer (ग्राहक)",
  [ROLES.SHOP_OWNER]: "🏪 Shop Owner (दुकानदार)",
  [ROLES.ADMIN]: "🛡️ Admin",
};

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, updateUserProfile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: ROLES.CUSTOMER,
    shopName: "",
    shopCategory: "CAT_PUNCTURE_REPAIR",
    shopType: "Puncture & Service",
    services: ["Puncher", "Air / Nitrogen Fill", "Tube & Valve Pin", "Roadside Help"],
    address: "",
    city: "",
    openingHours: "09:00 AM - 09:00 PM",
    photoURL: "",
    lat: null,
    lng: null,
  });

  const [capturingGps, setCapturingGps] = useState(false);
  const [gpsStatus, setGpsStatus] = useState("");

  // Sync profile data to form
  useEffect(() => {
    if (profile || user) {
      const catCode = profile?.shopCategory || profile?.categoryCode || "CAT_PUNCTURE_REPAIR";
      const catObj = getCategoryByCode(catCode);
      const defaultServices = profile?.services || profile?.servicesOffered || catObj.services;

      setFormData({
        name: profile?.name || user?.displayName || "",
        phone: profile?.phone || "",
        email: profile?.email || user?.email || "",
        role: profile?.role || ROLES.CUSTOMER,
        shopName: profile?.shopName || "",
        shopCategory: catCode,
        shopType: profile?.shopType || catObj.name,
        services: Array.isArray(defaultServices) ? defaultServices : catObj.services,
        address: profile?.address || "",
        city: profile?.city || "",
        openingHours: profile?.openingHours || "09:00 AM - 09:00 PM",
        photoURL: profile?.photoURL || user?.photoURL || "",
        lat: profile?.lat !== undefined ? profile.lat : null,
        lng: profile?.lng !== undefined ? profile.lng : null,
      });
    }
  }, [profile, user]);

  // Handle City Name Change with Auto Geolocation Resolution
  const handleCityChange = (cityName) => {
    const cleanCity = cityName.trim();
    const key = cleanCity.toLowerCase();
    let detectedLat = formData.lat;
    let detectedLng = formData.lng;

    if (INDIAN_CITIES_COORDS[key]) {
      const match = INDIAN_CITIES_COORDS[key];
      detectedLat = match.lat;
      detectedLng = match.lng;
      setGpsStatus(`✅ ${cleanCity} (${match.state}) coordinates mapped!`);
    }

    setFormData((prev) => ({
      ...prev,
      city: cityName,
      lat: detectedLat,
      lng: detectedLng,
    }));
  };

  // Capture Live GPS location of shop
  const handleCaptureGps = async () => {
    setCapturingGps(true);
    setGpsStatus("detecting");

    try {
      const loc = await getLiveUserLocation();
      if (loc && loc.lat && loc.lng) {
        const latitude = Number(loc.lat.toFixed(6));
        const longitude = Number(loc.lng.toFixed(6));
        setFormData((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude,
          city: prev.city || loc.city || "",
          address: prev.address || (loc.city ? `${loc.city}, ${loc.region || "India"}` : prev.address),
        }));
        setGpsStatus(`success: (${latitude}, ${longitude})`);
      } else {
        setGpsStatus("denied");
        alert("Mobile GPS detect nahi hua. Kripya phone ki Location On karein aur Browser me Location Permission Allow karein.");
      }
    } catch (err) {
      console.warn("GPS error:", err);
      setGpsStatus("denied");
      alert("Mobile GPS detect nahi hua. Kripya phone ki Location On karein.");
    } finally {
      setCapturingGps(false);
    }
  };

  // Handle Save Profile
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const selectedCat = getCategoryByCode(formData.shopCategory);
      
      // Auto-resolve coordinates from city if not explicitly provided
      let finalLat = formData.lat !== null && formData.lat !== undefined ? Number(formData.lat) : null;
      let finalLng = formData.lng !== null && formData.lng !== undefined ? Number(formData.lng) : null;
      const cityKey = (formData.city || "").toLowerCase().trim();
      
      if ((!finalLat || !finalLng || isNaN(finalLat) || isNaN(finalLng)) && cityKey && INDIAN_CITIES_COORDS[cityKey]) {
        finalLat = INDIAN_CITIES_COORDS[cityKey].lat;
        finalLng = INDIAN_CITIES_COORDS[cityKey].lng;
      }

      await updateUserProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        role: formData.role,
        shopName: formData.role === ROLES.SHOP_OWNER ? formData.shopName.trim() : "",
        shopCategory: formData.role === ROLES.SHOP_OWNER ? formData.shopCategory : "",
        shopType: formData.role === ROLES.SHOP_OWNER ? (selectedCat.name || formData.shopType) : "",
        services: formData.role === ROLES.SHOP_OWNER ? formData.services : [],
        servicesOffered: formData.role === ROLES.SHOP_OWNER ? formData.services : [],
        address: formData.address.trim(),
        city: formData.city.trim(),
        openingHours: formData.openingHours.trim(),
        photoURL: formData.photoURL,
        lat: finalLat,
        lng: finalLng,
        shopApproved: formData.role === ROLES.SHOP_OWNER ? true : false,
      });

      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      alert("Profile save error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCategorySelect = (catCode) => {
    const catObj = getCategoryByCode(catCode);
    setFormData((prev) => ({
      ...prev,
      shopCategory: catCode,
      shopType: catObj.name,
      services: catObj.services || [],
    }));
  };

  const toggleService = (svc) => {
    setFormData((prev) => {
      const exists = prev.services.includes(svc);
      const updated = exists 
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc];
      return { ...prev, services: updated };
    });
  };

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const avatarDisplay = formData.photoURL || profile?.photoURL || user?.photoURL;
  const activeCategory = getCategoryByCode(profile?.shopCategory || profile?.categoryCode || "CAT_PUNCTURE_REPAIR");
  const shopServicesList = profile?.services || profile?.servicesOffered || activeCategory.services;
  const initialLetter = formData.name ? formData.name[0].toUpperCase() : (profile?.name ? profile.name[0].toUpperCase() : "U");

  return (
    <div className="profile-page-wrap">
      <div className="profile-header-bar">
        <h1 className="brand-font page-title">My Profile & Account</h1>
        {!isEditing ? (
          <button className="btn-edit-toggle" onClick={() => setIsEditing(true)}>
            <Edit3 size={15} /> Edit Profile (एडिट करें)
          </button>
        ) : (
          <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
            <X size={15} /> Cancel (रद्द करें)
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="save-success-banner">
          <CheckCircle2 size={18} /> Profile details saved successfully! (प्रोफाइल सफलतापूर्वक अपडेट हो गई)
        </div>
      )}

      {/* Main Profile Card */}
      <div className="profile-card">
        {/* Profile Avatar / Photo with Upload Icon */}
        <div className="avatar-section-wrapper">
          <div className="profile-avatar-container">
            {avatarDisplay ? (
              <img src={avatarDisplay} alt="Profile" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-initial">{initialLetter}</div>
            )}

            {/* Photo Upload Trigger Button */}
            <label className="avatar-upload-overlay" title="Change Profile Photo / Shop Logo">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e.target.files[0])}
                style={{ display: "none" }}
              />
              <Camera size={18} color="white" />
            </label>
          </div>

          {uploadingPhoto && <span className="upload-photo-text">Uploading photo...</span>}
          {!isEditing && (
            <label className="btn-change-photo-text">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e.target.files[0])}
                style={{ display: "none" }}
              />
              📸 Change Photo / Logo
            </label>
          )}
        </div>

        {/* View Mode */}
        {!isEditing ? (
          <div className="profile-view-details">
            <h2 className="profile-name-text">{profile?.name || user?.displayName || "TyreSaathi User"}</h2>

            <div className="profile-role-badge">
              {profile?.role === ROLES.SHOP_OWNER ? (
                <span className="role-pill-shop">
                  <Store size={14} /> Shop Owner · {profile?.shopName || "My Tyre Shop"}
                </span>
              ) : (
                <span className="role-pill-customer">
                  <User size={14} /> Customer (ग्राहक)
                </span>
              )}
            </div>

            <div className="profile-info-grid">
              <div className="info-item">
                <span className="info-label"><Phone size={13} /> Mobile Number</span>
                <span className="info-value">{profile?.phone || "Not added yet"}</span>
              </div>

              <div className="info-item">
                <span className="info-label"><Mail size={13} /> Email Address</span>
                <span className="info-value">{profile?.email || user?.email || "Not added"}</span>
              </div>

              {profile?.role === ROLES.SHOP_OWNER && (
                <>
                  <div className="info-item">
                    <span className="info-label"><Store size={13} /> Shop Name</span>
                    <span className="info-value">{profile?.shopName || "UCAN Tyre Shop"}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label"><MapPin size={13} /> Shop Location</span>
                    <span className="info-value">
                      {profile?.city ? `${profile.city}, ${profile.address || ""}` : "Not added"}
                    </span>
                  </div>

                  {/* 🏷️ Primary Category Badge */}
                  <div className="info-item full-width">
                    <span className="info-label">🏷️ Shop Category (दुकान का प्रकार)</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span style={{
                        background: activeCategory.badgeBg || "#e0f2fe",
                        color: activeCategory.badgeColor || "#0284c7",
                        border: `1px solid ${activeCategory.badgeColor || "#0284c7"}`,
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12.5px",
                        fontWeight: "800",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}>
                        <span>{activeCategory.icon}</span>
                        <span>{profile?.shopType || activeCategory.name} ({activeCategory.hindiName})</span>
                      </span>
                      <small style={{ color: "#64748b", fontSize: "11.5px" }}>Target: {activeCategory.target}</small>
                    </div>
                  </div>

                  {/* 🛠️ Offered Services Chips */}
                  <div className="info-item full-width">
                    <span className="info-label">🛠️ Services Offered (उपलब्ध सेवाएं)</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                      {(shopServicesList || []).map((svc, idx) => (
                        <span key={idx} style={{
                          background: "#ecfdf5",
                          color: "#166534",
                          border: "1px solid #bbf7d0",
                          padding: "3px 10px",
                          borderRadius: "14px",
                          fontSize: "11.5px",
                          fontWeight: "700",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <CheckCircle2 size={12} color="#16a34a" /> {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="info-item full-width">
                    <span className="info-label"><ShieldCheck size={13} /> Shop Verification</span>
                    <span className="info-value verified-text">
                      ✅ Shop is fully active & approved on TyreSaathi
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Quick Actions for Shop Owner */}
            {profile?.role === ROLES.SHOP_OWNER && (
              <div className="shop-quick-actions">
                <Link to="/shop/add-product" className="btn-shop-action">
                  <PlusCircle size={15} /> Add Tyre / Product to Shop
                </Link>
                <Link to="/bookings" className="btn-shop-action secondary">
                  <Calendar size={15} /> View Customer Bookings
                </Link>
              </div>
            )}

            {/* Quick Access for Admin & Authorized Staff Members */}
            {isAdmin && (
              <div style={{
                marginTop: "16px",
                background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
                padding: "14px 18px",
                borderRadius: "12px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                boxShadow: "0 4px 14px rgba(79, 70, 229, 0.25)"
              }}>
                <div>
                  <strong style={{ fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <ShieldCheck size={18} color="#facc15" /> 🛡️ Staff & Operations Dashboard
                  </strong>
                  <small style={{ color: "#c7d2fe", fontSize: "12px", display: "block", marginTop: "2px" }}>
                    Customer tickets, bookings aur operations manage karein.
                  </small>
                </div>
                <Link to="/admin" style={{
                  background: "#4f46e5",
                  color: "#ffffff",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "700",
                  fontSize: "13px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  Open Dashboard ➔
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* ✏️ EDIT PROFILE FORM */
          <form className="profile-edit-form" onSubmit={handleSave}>
            <div className="edit-role-section">
              <label className="field-label-bold">Account Role (अपना रोल चुनें):</label>
              <div className="role-toggle-row">
                <button
                  type="button"
                  className={`role-choice-btn ${formData.role === ROLES.SHOP_OWNER ? "role-choice-active" : ""}`}
                  onClick={() => setFormData({ ...formData, role: ROLES.SHOP_OWNER })}
                >
                  🏪 Shop Owner (दुकानदार)
                </button>

                <button
                  type="button"
                  className={`role-choice-btn ${formData.role === ROLES.CUSTOMER ? "role-choice-active" : ""}`}
                  onClick={() => setFormData({ ...formData, role: ROLES.CUSTOMER })}
                >
                  👤 Customer (ग्राहक)
                </button>
              </div>
            </div>

            <div className="form-two-col">
              <div className="form-input-group">
                <label>Aapka Naam (Full Name) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Your Name"
                />
              </div>

              <div className="form-input-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10 digit mobile number"
                />
              </div>
            </div>

            {/* Shop specific fields if Shop Owner */}
            {formData.role === ROLES.SHOP_OWNER && (
              <>
                <div className="form-input-group">
                  <label>Dukan ka Naam (Shop Name) *</label>
                  <input
                    type="text"
                    required
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                    placeholder="e.g. UCAN Tyre Shop / Cherry Tyre Park"
                  />
                </div>

                {/* 🏷️ Primary Shop Category Selection */}
                <div className="form-input-group" style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "800", color: "var(--text)" }}>
                    🏷️ Primary Shop Category (दुकान का मुख्य प्रकार चुनें) *
                  </label>
                  <small style={{ display: "block", color: "#64748b", marginBottom: "8px", fontSize: "12px" }}>
                    Aapki dukan kis category me aati hai? Chunne par services automatically select ho jayengi.
                  </small>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "8px"
                  }}>
                    {SHOP_PRIMARY_CATEGORIES.map((cat) => {
                      const isSelected = formData.shopCategory === cat.code;
                      return (
                        <div
                          key={cat.code}
                          onClick={() => handleCategorySelect(cat.code)}
                          style={{
                            border: isSelected ? `2px solid ${cat.badgeColor}` : "1px solid var(--border)",
                            background: isSelected ? cat.badgeBg : "var(--surface)",
                            borderRadius: "10px",
                            padding: "10px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            textAlign: "center"
                          }}
                        >
                          <div style={{ fontSize: "20px", marginBottom: "2px" }}>{cat.icon}</div>
                          <div style={{ fontWeight: "800", fontSize: "12px", color: isSelected ? cat.badgeColor : "var(--text)" }}>
                            {cat.name}
                          </div>
                          <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: "2px" }}>
                            {cat.hindiName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 🛠️ Services Offered Checkboxes */}
                <div className="form-input-group" style={{ marginTop: "14px" }}>
                  <label style={{ fontWeight: "800", color: "var(--text)" }}>
                    🛠️ Dukan Par Uplabdh Services (अपनी सेवाएं चुनें):
                  </label>
                  <small style={{ display: "block", color: "#64748b", marginBottom: "8px", fontSize: "12px" }}>
                    Jo jo kaam aapki dukan par hota hai, unhe tick karein:
                  </small>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px"
                  }}>
                    {ALL_AVAILABLE_SERVICES.map((svc) => {
                      const isChecked = formData.services?.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: isChecked ? "1.5px solid #16a34a" : "1px solid var(--border)",
                            background: isChecked ? "#dcfce7" : "var(--surface)",
                            color: isChecked ? "#15803d" : "var(--text)",
                            fontSize: "12px",
                            fontWeight: isChecked ? "800" : "600",
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {isChecked ? <CheckCircle2 size={14} color="#16a34a" /> : <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid #94a3b8", display: "inline-block" }} />}
                          <span>{svc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-two-col" style={{ marginTop: "10px" }}>
                  <div className="form-input-group">
                    <label>City / Town (शहर का नाम)</label>
                    <input
                      type="text"
                      list="indian-cities-autocomplete"
                      value={formData.city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      placeholder="e.g. Hyderabad / Raipur / Bilaspur / Delhi"
                    />
                    {formData.city && formData.lat && (
                      <small style={{ color: "#16a34a", fontSize: "11px", fontWeight: "700", marginTop: "3px", display: "block" }}>
                        ✅ Coordinates Auto-Mapped ({formData.lat?.toFixed(2)}, {formData.lng?.toFixed(2)})
                      </small>
                    )}
                  </div>

                  <div className="form-input-group">
                    <label>Opening Hours</label>
                    <input
                      type="text"
                      value={formData.openingHours}
                      onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                      placeholder="09:00 AM - 09:00 PM"
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>Shop / Business Address (दुकान का पूरा पता)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Shop No., Landmark, Area, Road..."
                  />
                </div>

                {/* 📍 Live GPS Coordinates Capture */}
                <div className="form-input-group" style={{ background: "var(--surface-2, #f8fafc)", padding: "12px", borderRadius: "10px", border: "1px dashed var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                    <label style={{ fontWeight: "800", margin: 0 }}>
                      📍 Real-Time Location (लाइव लोकेशन)
                    </label>
                    <button
                      type="button"
                      onClick={handleCaptureGps}
                      disabled={capturingGps}
                      style={{
                        background: "#c0392b",
                        color: "white",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <MapPin size={14} />
                      {capturingGps ? "Connecting GPS..." : "📍 Connect Mobile GPS"}
                    </button>
                  </div>
                  <small style={{ color: "#64748b", fontSize: "11.5px", display: "block" }}>
                    {formData.lat && formData.lng
                      ? `✅ Live Coordinates: ${formData.lat}, ${formData.lng} (Aapke shahar aur aas-paas ke customers ko exact distance dikhegi!)`
                      : "Shahar ka naam likhein ya button dabakar mobile GPS connect karein."}
                  </small>
                </div>
              </>
            )}

            {/* If Customer, allow setting City as well */}
            {formData.role === ROLES.CUSTOMER && (
              <div className="form-input-group">
                <label>Your City / Town (आपका शहर)</label>
                <input
                  type="text"
                  list="indian-cities-autocomplete"
                  value={formData.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  placeholder="e.g. Hyderabad / Raipur / Bilaspur / Delhi"
                />
                {formData.city && formData.lat && (
                  <small style={{ color: "#16a34a", fontSize: "11px", fontWeight: "700", marginTop: "3px", display: "block" }}>
                    ✅ Nearest shops will be sorted for your city ({formData.city})!
                  </small>
                )}
              </div>
            )}

            <datalist id="indian-cities-autocomplete">
              {Object.keys(INDIAN_CITIES_COORDS).map((c) => (
                <option key={c} value={c.charAt(0).toUpperCase() + c.slice(1)}>
                  {INDIAN_CITIES_COORDS[c].state}
                </option>
              ))}
            </datalist>

            <div className="form-input-group">
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div className="edit-action-buttons">
              <button
                type="button"
                className="btn-form-cancel"
                onClick={() => setIsEditing(false)}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-form-save"
                disabled={saving}
              >
                {saving ? "Saving Changes..." : "💾 Save Changes (बदलाव सेव करें)"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Profile Actions: Settings & Logout */}
      <div className="profile-actions-row">
        <Link to="/settings" className="profile-settings-btn">
          <SettingsIcon size={16} /> App & Account Settings (सेटिंग्स)
        </Link>
        <button className="logout-btn-clean" onClick={handleLogout}>
          <LogOut size={16} /> Logout from Account (लॉगआउट)
        </button>
      </div>

      <style>{`
        .profile-page-wrap {
          max-width: 740px;
          margin: 0 auto;
          padding: 0 0 40px;
        }
        .profile-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 10px;
        }
        .page-title {
          font-size: 24px;
          margin: 0;
          color: var(--text);
        }
        .btn-edit-toggle {
          background: #c0392b;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .btn-cancel-edit {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .save-success-banner {
          background: #eafaf1;
          border: 1.5px solid #27ae60;
          color: #27ae60;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .profile-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }

        /* Avatar */
        .avatar-section-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        .profile-avatar-container {
          position: relative;
          width: 84px;
          height: 84px;
          border-radius: 50%;
          border: 3px solid #c0392b;
          overflow: hidden;
          background: #ff6b35;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .profile-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-avatar-initial {
          color: white;
          font-size: 36px;
          font-weight: 800;
        }
        .avatar-upload-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          cursor: pointer;
        }
        .profile-avatar-container:hover .avatar-upload-overlay {
          opacity: 1;
        }
        .btn-change-photo-text {
          font-size: 12px;
          color: #c0392b;
          font-weight: 700;
          cursor: pointer;
        }
        .upload-photo-text {
          font-size: 11.5px;
          color: #f39c12;
          font-weight: 700;
        }

        /* View Mode Details */
        .profile-view-details {
          text-align: center;
        }
        .profile-name-text {
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .profile-role-badge {
          margin-bottom: 20px;
        }
        .role-pill-shop {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fdedec;
          color: #c0392b;
          border: 1px solid #c0392b;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }
        .role-pill-customer {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--surface-2);
          color: var(--text);
          padding: 3px 10px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .profile-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          text-align: left;
          background: var(--bg);
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 14px;
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .info-item.full-width {
          grid-column: 1 / -1;
        }
        .info-label {
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .info-value {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text);
          word-break: break-word;
        }
        .verified-text {
          color: #27ae60;
        }

        .shop-quick-actions {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .btn-shop-action {
          flex: 1;
          background: #c0392b;
          color: white;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .btn-shop-action.secondary {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .profile-header-bar {
            margin-bottom: 10px;
          }
          .page-title {
            font-size: 1.25rem; /* text-xl */
          }
          .profile-card {
            padding: 14px 12px;
            border-radius: 10px;
          }
          .profile-name-text {
            font-size: 1.1rem;
          }
          .profile-info-grid {
            grid-template-columns: 1fr;
            padding: 10px 8px;
            gap: 8px;
            border-radius: 8px;
          }
          .shop-quick-actions {
            flex-direction: column;
            gap: 6px;
          }
        }

        /* ✏️ Edit Form */
        .profile-edit-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }
        .field-label-bold {
          font-size: 0.75rem; /* text-xs */
          font-weight: 700;
          color: var(--text);
          margin-bottom: 4px;
          display: block;
        }
        .role-toggle-row {
          display: flex;
          gap: 6px;
        }
        .role-choice-btn {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .role-choice-active {
          border-color: #c0392b;
          background: #fdedec;
          color: #c0392b;
        }
        .form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (max-width: 600px) {
          .form-two-col {
            grid-template-columns: 1fr;
          }
        }
        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .form-input-group label {
          font-size: 0.75rem; /* text-xs */
          font-weight: 700;
          color: var(--text-muted);
        }
        .form-input-group input {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 0.8125rem;
          outline: none;
        }
        .form-input-group input:focus {
          border-color: #c0392b;
        }

        .edit-action-buttons {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        .btn-form-cancel {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 9px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
        }
        .btn-form-save {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 9px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }

        /* Settings */
        .settings-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 0.8125rem;
        }
        .theme-switch {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--surface-2);
          border: none;
          border-radius: 100px;
          padding: 5px 10px;
          font-weight: 700;
          font-size: 0.72rem;
          cursor: pointer;
          color: var(--text);
        }
        .logout-btn-full {
          width: 100%;
          background: var(--surface-2);
          color: var(--danger);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .profile-actions-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
        }
        .profile-settings-btn {
          background: var(--surface);
          border: 1.5px solid var(--border);
          color: var(--text);
          border-radius: 10px;
          padding: 10px 14px;
          font-weight: 700;
          font-size: 0.8125rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .profile-settings-btn:hover {
          background: var(--surface-2);
          border-color: #c0392b;
          color: #c0392b;
        }
        .logout-btn-clean {
          width: 100%;
          background: var(--surface-2);
          color: #e74c3c;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        .logout-btn-clean:hover {
          background: #fdedec;
          border-color: #e74c3c;
        }
      `}</style>
    </div>
  );
}
