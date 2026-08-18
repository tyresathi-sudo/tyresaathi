import React, { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, 
  Store, 
  FileText, 
  Bell, 
  Lock, 
  Sun, 
  Moon, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  KeyRound, 
  HelpCircle,
  Percent,
  Sparkles,
  Smartphone
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Settings() {
  const { user, profile, updateUserProfile, resetPassword, isVendor, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState("shop"); // 'shop', 'billing', 'notifications', 'security'
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Settings Form State
  const [settings, setSettings] = useState({
    shopName: profile?.shopName || "",
    phone: profile?.phone || "",
    email: profile?.email || user?.email || "",
    address: profile?.address || "",
    city: profile?.city || "",
    gstin: profile?.gstin || "",
    // Billing Settings
    defaultTaxMode: profile?.defaultTaxMode || "none", // none, gst18, gst28
    invoicePrefix: profile?.invoicePrefix || "TS-INV-",
    defaultTerms: profile?.defaultTerms || "Goods once sold cannot be returned without warranty card. Tyre warranty as per company terms.",
    // Notifications
    whatsappAlerts: profile?.whatsappAlerts ?? true,
    smsAlerts: profile?.smsAlerts ?? true,
    dailySummaryEmail: profile?.dailySummaryEmail ?? false,
    // Language
    language: profile?.language || "hi",
  });

  useEffect(() => {
    if (profile) {
      setSettings((prev) => ({
        ...prev,
        shopName: profile.shopName || prev.shopName,
        phone: profile.phone || prev.phone,
        email: profile.email || user?.email || prev.email,
        address: profile.address || prev.address,
        city: profile.city || prev.city,
        gstin: profile.gstin || prev.gstin,
        defaultTaxMode: profile.defaultTaxMode || prev.defaultTaxMode,
        invoicePrefix: profile.invoicePrefix || prev.invoicePrefix,
        defaultTerms: profile.defaultTerms || prev.defaultTerms,
        whatsappAlerts: profile.whatsappAlerts ?? prev.whatsappAlerts,
        smsAlerts: profile.smsAlerts ?? prev.smsAlerts,
        dailySummaryEmail: profile.dailySummaryEmail ?? prev.dailySummaryEmail,
        language: profile.language || prev.language,
      }));
    }
  }, [profile, user]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await updateUserProfile(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.warn("Could not save settings:", err);
      alert("Settings save karne me samasya aayi: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const handleSendPasswordReset = async () => {
    if (!user?.email) return;
    try {
      await resetPassword(user.email);
      setResetEmailSent(true);
      setTimeout(() => setResetEmailSent(false), 6000);
    } catch (err) {
      alert("Password reset error: " + err.message);
    }
  };

  return (
    <div className="settings-page-container">
      {/* Top Header */}
      <div className="settings-header-row">
        <div>
          <h1 className="settings-title">
            <SettingsIcon size={26} color="#c0392b" /> TyreSaathi Settings & Preferences (सेटिंग्स)
          </h1>
          <p className="settings-sub">
            Apni Dukan, Billing preferences, GSTIN, WhatsApp alerts aur Security settings manage karein.
          </p>
        </div>

        <button className="btn-save-all-top" onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>

      {savedSuccess && (
        <div className="settings-success-alert">
          <CheckCircle2 size={18} color="#27ae60" />
          <span>✅ Settings successfully save ho gayi hain!</span>
        </div>
      )}

      {/* Main Settings Layout with Sidebar Tabs */}
      <div className="settings-layout-grid">
        {/* Left: Settings Menu */}
        <aside className="settings-nav-sidebar">
          <button
            className={`nav-tab-btn ${activeTab === "shop" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            <Store size={18} />
            <div>
              <strong>Shop & Profile</strong>
              <small>दुकान विवरण व पता</small>
            </div>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === "billing" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            <FileText size={18} />
            <div>
              <strong>Billing & Invoice</strong>
              <small>बिलिंग व जीएसटी सेटिंग्स</small>
            </div>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === "notifications" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={18} />
            <div>
              <strong>Alerts & WhatsApp</strong>
              <small>नोटिफिकेशन व अलर्ट्स</small>
            </div>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === "security" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Lock size={18} />
            <div>
              <strong>Account & Security</strong>
              <small>पासवर्ड व सुरक्षा</small>
            </div>
          </button>

          <div className="quick-help-link-box">
            <HelpCircle size={18} color="#c0392b" />
            <div>
              <strong>Need Help?</strong>
              <p>Kisi samasya ke liye support ticket raise karein.</p>
              <Link to="/support" className="link-to-support">Open Support Ticket →</Link>
            </div>
          </div>
        </aside>

        {/* Right: Active Settings Form Content */}
        <main className="settings-content-card">
          <form onSubmit={handleSave}>
            {/* ═══ TAB 1: SHOP & PROFILE SETTINGS ═══ */}
            {activeTab === "shop" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🏪 Shop & Business Details (दुकान की जानकारी)</h3>
                  <p>Ye details aapke invoices aur customer booking cards par dikhayi dengi.</p>
                </div>

                <div className="settings-form-grid">
                  <div className="set-field-group">
                    <label>Shop / Business Name (दुकान का नाम) *</label>
                    <input
                      type="text"
                      value={settings.shopName}
                      onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                      placeholder="उदा: Shree Ram Tyre & Service Center"
                    />
                  </div>

                  <div className="set-field-group">
                    <label>GSTIN / Tax Number (जीएसटी नंबर - वैकल्पिक)</label>
                    <input
                      type="text"
                      value={settings.gstin}
                      onChange={(e) => setSettings({ ...settings, gstin: e.target.value.toUpperCase() })}
                      placeholder="e.g. 29AAAAA0000A1Z5"
                      style={{ textTransform: "uppercase" }}
                    />
                  </div>

                  <div className="set-field-group">
                    <label>Contact Mobile Number (दुकान का फोन नंबर)</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                    />
                  </div>

                  <div className="set-field-group">
                    <label>Business Email Address (ईमेल)</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      placeholder="shop@email.com"
                    />
                  </div>
                </div>

                <div className="set-field-group" style={{ marginTop: "16px" }}>
                  <label>City & State (शहर / राज्य)</label>
                  <input
                    type="text"
                    value={settings.city}
                    onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                    placeholder="उदा: Bengaluru, Karnataka / New Delhi, Delhi NCR"
                  />
                </div>

                <div className="set-field-group" style={{ marginTop: "16px" }}>
                  <label>Complete Shop Address (दुकान का पूरा पता)</label>
                  <textarea
                    rows={3}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="Shop No., Main Market Road, Landmark, Pincode..."
                  />
                </div>
              </div>
            )}

            {/* ═══ TAB 2: BILLING & INVOICE SETTINGS ═══ */}
            {activeTab === "billing" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🧾 Billing & Invoice Preferences (बिलिंग सेटिंग्स)</h3>
                  <p>Invoices me automatic aane wale default tax aur terms set karein.</p>
                </div>

                <div className="settings-form-grid">
                  <div className="set-field-group">
                    <label>Default Tax Mode (डिफ़ॉल्ट टैक्स प्रकार)</label>
                    <select
                      value={settings.defaultTaxMode}
                      onChange={(e) => setSettings({ ...settings, defaultTaxMode: e.target.value })}
                    >
                      <option value="none">Non-GST / Kacha Bill (0% Tax)</option>
                      <option value="gst18">GST 18% (Standard Tyres & Services)</option>
                      <option value="gst28">GST 28% (Commercial / Heavy Vehicles)</option>
                    </select>
                  </div>

                  <div className="set-field-group">
                    <label>Invoice Number Prefix (बिल नंबर का प्रीफिक्स)</label>
                    <input
                      type="text"
                      value={settings.invoicePrefix}
                      onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                      placeholder="e.g. TS-INV- / SR-2026-"
                    />
                  </div>
                </div>

                <div className="set-field-group" style={{ marginTop: "16px" }}>
                  <label>Default Invoice Terms & Warranty Note (बिल की डिफ़ॉल्ट शर्तें)</label>
                  <textarea
                    rows={4}
                    value={settings.defaultTerms}
                    onChange={(e) => setSettings({ ...settings, defaultTerms: e.target.value })}
                    placeholder="उदा: Goods once sold cannot be returned without warranty card..."
                  />
                </div>
              </div>
            )}

            {/* ═══ TAB 3: NOTIFICATIONS & ALERTS ═══ */}
            {activeTab === "notifications" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🔔 Alerts & Notifications (अलर्ट्स व सूचनाएं)</h3>
                  <p>Customer bookings aur billing ke liye notification channels configure karein.</p>
                </div>

                <div className="toggle-setting-list">
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <strong>📱 WhatsApp Booking Alerts</strong>
                      <p>Jab bhi koi naya customer tyre repair ya booking karega, aapko WhatsApp par alert milega.</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.whatsappAlerts}
                        onChange={(e) => setSettings({ ...settings, whatsappAlerts: e.target.checked })}
                      />
                      <span className="slider round" />
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <strong>💬 SMS Alerts</strong>
                      <p>Booking confirmation aur payment receipts ke liye SMS notifications.</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.smsAlerts}
                        onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                      />
                      <span className="slider round" />
                    </label>
                  </div>

                  <div className="toggle-row">
                    <div className="toggle-info">
                      <strong>📊 Daily Sales Summary Email</strong>
                      <p>Roz shaam ko dukan ki total bikri aur khata summary ka email report.</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={settings.dailySummaryEmail}
                        onChange={(e) => setSettings({ ...settings, dailySummaryEmail: e.target.checked })}
                      />
                      <span className="slider round" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ TAB 4: ACCOUNT & SECURITY ═══ */}
            {activeTab === "security" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🔒 Account & Security (पासवर्ड व सुरक्षा)</h3>
                  <p>Apne login credentials aur theme preferences manage karein.</p>
                </div>

                <div className="security-box-card">
                  <div className="sec-item-row">
                    <div>
                      <strong>Password Reset (पासवर्ड बदलें)</strong>
                      <p>Apne registered email ({user?.email}) par secure password reset link bhejein.</p>
                    </div>
                    <button
                      type="button"
                      className="btn-sec-action"
                      onClick={handleSendPasswordReset}
                    >
                      <KeyRound size={15} /> Send Reset Link
                    </button>
                  </div>

                  {resetEmailSent && (
                    <div className="reset-alert-success">
                      ✅ Password reset link '{user?.email}' par bhej diya gaya hai! Inbox check karein.
                    </div>
                  )}

                  <div className="sec-item-row" style={{ marginTop: "16px" }}>
                    <div>
                      <strong>Appearance Theme (डार्क / लाइट मोड)</strong>
                      <p>Current theme: <strong>{theme === "dark" ? "Dark Mode 🌙" : "Light Mode ☀️"}</strong></p>
                    </div>
                    <button
                      type="button"
                      className="btn-sec-action"
                      onClick={toggleTheme}
                    >
                      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />} Switch Theme
                    </button>
                  </div>

                  <div className="sec-item-row" style={{ marginTop: "16px" }}>
                    <div>
                      <strong>Account Role & Permissions</strong>
                      <p>Role: <strong style={{ color: "#c0392b" }}>{profile?.role ? profile.role.toUpperCase() : "CUSTOMER"}</strong> {isAdmin && "🛡️ Master Admin"}</p>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" className="btn-sec-admin-link">
                        🛡️ Open Master Admin Panel
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Button */}
            <div className="settings-bottom-actions">
              <button type="submit" className="btn-save-settings" disabled={saving}>
                <Save size={16} /> {saving ? "Saving Changes..." : "Save Settings (सेटिंग्स सेव करें)"}
              </button>
            </div>
          </form>
        </main>
      </div>

      <style>{`
        .settings-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .settings-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .settings-header-row { flex-direction: column; }
        }
        .settings-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .settings-sub {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .btn-save-all-top {
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .settings-success-alert {
          background: #eafaf1;
          border: 1.5px solid #2ecc71;
          color: #27ae60;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13.5px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        /* Layout Grid */
        .settings-layout-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .settings-layout-grid { grid-template-columns: 1fr; }
        }

        /* Nav Sidebar */
        .settings-nav-sidebar {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .nav-tab-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .nav-tab-btn:hover {
          background: var(--surface-2);
        }
        .tab-btn-active {
          background: #c0392b !important;
          color: white !important;
          border-color: #c0392b;
        }
        .tab-btn-active small {
          color: rgba(255,255,255,0.8) !important;
        }
        .nav-tab-btn strong {
          display: block;
          font-size: 13.5px;
        }
        .nav-tab-btn small {
          font-size: 11px;
          color: var(--text-muted);
        }

        .quick-help-link-box {
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 10px;
          padding: 14px;
          margin-top: 16px;
          display: flex;
          gap: 10px;
          font-size: 12px;
        }
        .quick-help-link-box strong {
          display: block;
          margin-bottom: 2px;
        }
        .quick-help-link-box p {
          margin: 0 0 6px;
          color: var(--text-muted);
        }
        .link-to-support {
          color: #c0392b;
          font-weight: 700;
          text-decoration: none;
        }

        /* Content Card */
        .settings-content-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .sec-header {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }
        .sec-header h3 {
          font-size: 17px;
          font-weight: 800;
          margin: 0 0 4px;
          color: var(--text);
        }
        .sec-header p {
          font-size: 12.5px;
          color: var(--text-muted);
          margin: 0;
        }

        .settings-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 650px) {
          .settings-form-grid { grid-template-columns: 1fr; }
        }

        .set-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .set-field-group label {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .set-field-group input,
        .set-field-group select,
        .set-field-group textarea {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
          font-family: inherit;
        }
        .set-field-group input:focus,
        .set-field-group select:focus,
        .set-field-group textarea:focus {
          border-color: #c0392b;
        }

        /* Toggle Rows */
        .toggle-setting-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          background: var(--bg);
          border-radius: 10px;
          border: 1px solid var(--border);
        }
        .toggle-info strong {
          display: block;
          font-size: 14px;
          margin-bottom: 2px;
        }
        .toggle-info p {
          margin: 0;
          font-size: 12px;
          color: var(--text-muted);
        }

        /* Switch Toggle */
        .switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 24px;
          flex-shrink: 0;
        }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: #ccc;
          transition: .3s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
        }
        input:checked + .slider { background-color: #27ae60; }
        input:checked + .slider:before { transform: translateX(22px); }
        .slider.round { border-radius: 24px; }
        .slider.round:before { border-radius: 50%; }

        /* Security Card */
        .security-box-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sec-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          background: var(--bg);
          border-radius: 10px;
          border: 1px solid var(--border);
          gap: 12px;
        }
        .sec-item-row strong {
          display: block;
          font-size: 14px;
        }
        .sec-item-row p {
          margin: 2px 0 0;
          font-size: 12px;
          color: var(--text-muted);
        }
        .btn-sec-action {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12.5px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .btn-sec-admin-link {
          background: #c0392b;
          color: white;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 12.5px;
          white-space: nowrap;
        }
        .reset-alert-success {
          background: #eafaf1;
          color: #27ae60;
          padding: 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .settings-bottom-actions {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .btn-save-settings {
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 14.5px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
