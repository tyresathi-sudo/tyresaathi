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
  Calendar 
} from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { useTheme } from "../context/ThemeContext.jsx";
import { useAuth, ROLES } from "../context/AuthContext.jsx";

const ROLE_LABEL = {
  [ROLES.CUSTOMER]: "👤 Customer",
  [ROLES.SHOP_OWNER]: "🏪 Shop Owner (दुकानदार)",
  [ROLES.ADMIN]: "🛡️ Admin",
};

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, updateUserProfile, logout } = useAuth();
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
    address: "",
    city: "",
    openingHours: "09:00 AM - 09:00 PM",
    photoURL: "",
  });

  // Sync profile data to form
  useEffect(() => {
    if (profile || user) {
      setFormData({
        name: profile?.name || user?.displayName || "",
        phone: profile?.phone || "",
        email: profile?.email || user?.email || "",
        role: profile?.role || ROLES.CUSTOMER,
        shopName: profile?.shopName || "",
        address: profile?.address || "",
        city: profile?.city || "",
        openingHours: profile?.openingHours || "09:00 AM - 09:00 PM",
        photoURL: profile?.photoURL || user?.photoURL || "",
      });
    }
  }, [profile, user]);

  // Handle Photo Upload
  const handlePhotoUpload = async (file) => {
    if (!file || !user) return;
    setUploadingPhoto(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData((prev) => ({ ...prev, photoURL: downloadURL }));
      await updateUserProfile({ photoURL: downloadURL });
    } catch (err) {
      console.warn("Storage upload fallback to local reader:", err);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const localData = e.target.result;
        setFormData((prev) => ({ ...prev, photoURL: localData }));
        await updateUserProfile({ photoURL: localData });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Handle Save Profile
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      await updateUserProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        role: formData.role,
        shopName: formData.role === ROLES.SHOP_OWNER ? formData.shopName.trim() : "",
        address: formData.address.trim(),
        city: formData.city.trim(),
        openingHours: formData.openingHours.trim(),
        photoURL: formData.photoURL,
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

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const avatarDisplay = formData.photoURL || profile?.photoURL || user?.photoURL;
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
                  placeholder="e.g. Heena Kausar / Rajesh Kumar"
                />
              </div>

              <div className="form-input-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9910281345"
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

                <div className="form-two-col">
                  <div className="form-input-group">
                    <label>City (शहर)</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bengaluru / Delhi / Mumbai"
                    />
                  </div>

                  <div className="form-input-group">
                    <label>Opening Hours (दुकान का समय)</label>
                    <input
                      type="text"
                      value={formData.openingHours}
                      onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                      placeholder="09:00 AM - 09:00 PM"
                    />
                  </div>
                </div>

                <div className="form-input-group">
                  <label>Dukan ka Pata (Shop Address)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Shop No., Market Road, Near Landmark..."
                  />
                </div>
              </>
            )}

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

      {/* Settings Row */}
      <div className="settings-row">
        <span>Theme & Dark Mode</span>
        <button className="theme-switch" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <button className="logout-btn-full" onClick={handleLogout}>
        <LogOut size={16} /> Logout from Account
      </button>

      <style>{`
        .profile-page-wrap {
          max-width: 740px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .profile-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
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
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
        }

        .profile-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          text-align: left;
          background: var(--bg);
          padding: 18px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .profile-info-grid {
            grid-template-columns: 1fr;
          }
        }
        .info-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .info-item.full-width {
          grid-column: 1 / -1;
        }
        .info-label {
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .info-value {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
        }
        .verified-text {
          color: #27ae60;
        }

        .shop-quick-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .btn-shop-action {
          flex: 1;
          background: #c0392b;
          color: white;
          text-decoration: none;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-shop-action.secondary {
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
        }

        /* ✏️ Edit Form */
        .profile-edit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }
        .field-label-bold {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 6px;
          display: block;
        }
        .role-toggle-row {
          display: flex;
          gap: 10px;
        }
        .role-choice-btn {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13px;
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
          gap: 12px;
        }
        @media (max-width: 600px) {
          .form-two-col {
            grid-template-columns: 1fr;
          }
        }
        .form-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-input-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .form-input-group input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .form-input-group input:focus {
          border-color: #c0392b;
        }

        .edit-action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .btn-form-cancel {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }
        .btn-form-save {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
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
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 14px;
          font-weight: 600;
          font-size: 14px;
        }
        .theme-switch {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--surface-2);
          border: none;
          border-radius: 100px;
          padding: 7px 14px;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
          color: var(--text);
        }
        .logout-btn-full {
          width: 100%;
          background: var(--surface-2);
          color: var(--danger);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 12px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
      `}</style>
    </div>
  );
}
