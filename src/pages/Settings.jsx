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
  Smartphone,
  FileSpreadsheet,
  Copy,
  ExternalLink,
  Check,
  AlertCircle,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Scale,
  Globe
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  getGoogleSheetUrl, 
  setGoogleSheetUrl, 
  testGoogleSheetConnection, 
  APPS_SCRIPT_TEMPLATE 
} from "../utils/googleSheets";

export default function Settings() {
  const { user, profile, updateUserProfile, resetPassword, isVendor, isAdmin, deleteAccount } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("shop"); // 'shop', 'billing', 'notifications', 'security', 'sheets', 'legal'
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedPrivacyUrl, setCopiedPrivacyUrl] = useState(false);

  // Google Sheets state
  const [sheetUrl, setSheetUrl] = useState(() => getGoogleSheetUrl());
  const [testingSheet, setTestingSheet] = useState(false);
  const [sheetTestResult, setSheetTestResult] = useState(null);
  const [copiedScript, setCopiedScript] = useState(false);

  // Official Public Privacy Policy URL for Google Play Console
  const playStorePrivacyPolicyUrl = "https://tyresathi-93306.firebaseapp.com/privacy-policy";

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
    defaultTerms: profile?.defaultTerms || "Goods once sold cannot be returned without warranty card. Tyre warranty as per manufacturer company terms.",
    // Notifications
    whatsappAlerts: profile?.whatsappAlerts ?? true,
    smsAlerts: profile?.smsAlerts ?? true,
    dailySummaryEmail: profile?.dailySummaryEmail ?? false,
    // Language
    language: profile?.language || "en",
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
      setGoogleSheetUrl(sheetUrl);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.warn("Could not save settings:", err);
      alert("Error saving settings: " + (err.message || err));
    } finally {
      setSaving(false);
    }
  };

  const handleCopyPrivacyUrl = () => {
    navigator.clipboard.writeText(playStorePrivacyPolicyUrl);
    setCopiedPrivacyUrl(true);
    setTimeout(() => setCopiedPrivacyUrl(false), 3000);
  };

  const handleCopyAppsScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      alert("Your account and associated data have been permanently deleted.");
      navigate("/login", { replace: true });
    } catch (err) {
      alert("Account deletion error: " + err.message + "\nPlease re-login and try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleTestSheet = async () => {
    if (!sheetUrl || !sheetUrl.trim()) {
      setSheetTestResult({
        type: "error",
        message: "Please enter your Google Apps Script Web App URL first!"
      });
      return;
    }
    setTestingSheet(true);
    setSheetTestResult(null);
    try {
      setGoogleSheetUrl(sheetUrl);
      const res = await testGoogleSheetConnection(sheetUrl);
      setSheetTestResult({
        type: "success",
        message: res.message || "✅ Signal sent successfully! Check your Google Sheet."
      });
    } catch (err) {
      setSheetTestResult({
        type: "error",
        message: err.message || "Connection error. Please check the URL."
      });
    } finally {
      setTestingSheet(false);
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
            <SettingsIcon size={24} color="#c0392b" /> TyreSaathi Settings & Preferences
          </h1>
          <p className="settings-sub">
            Manage your Shop profile, Billing setup, WhatsApp notifications, and Legal data privacy.
          </p>
        </div>

        <button className="btn-save-all-top" onClick={handleSave} disabled={saving}>
          <Save size={15} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {savedSuccess && (
        <div className="settings-success-alert">
          <CheckCircle2 size={16} color="#27ae60" />
          <span>✅ Settings have been saved successfully!</span>
        </div>
      )}

      {/* Main Settings Layout with Sidebar Tabs */}
      <div className="settings-layout-grid">
        {/* Left: Settings Menu */}
        <aside className="settings-nav-sidebar">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === "shop" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            <Store size={17} />
            <div className="tab-btn-text">
              <strong>Shop & Profile</strong>
              <small>Business details & address</small>
            </div>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === "billing" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            <FileText size={17} />
            <div className="tab-btn-text">
              <strong>Billing & Invoice</strong>
              <small>GST & invoice numbering</small>
            </div>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === "notifications" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={17} />
            <div className="tab-btn-text">
              <strong>Alerts & WhatsApp</strong>
              <small>Booking & customer alerts</small>
            </div>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === "security" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Lock size={17} />
            <div className="tab-btn-text">
              <strong>Account & Security</strong>
              <small>Password & data controls</small>
            </div>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === "sheets" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("sheets")}
          >
            <FileSpreadsheet size={17} color="#16a34a" />
            <div className="tab-btn-text">
              <strong>Google Sheets Sync</strong>
              <small>Live spreadsheet logs</small>
            </div>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === "legal" ? "tab-btn-active" : ""}`}
            onClick={() => setActiveTab("legal")}
          >
            <Scale size={17} color="#8e44ad" />
            <div className="tab-btn-text">
              <strong>Legal, IP & Privacy</strong>
              <small>Play Store compliance links</small>
            </div>
          </button>

          <div className="quick-help-link-box">
            <HelpCircle size={16} color="#c0392b" />
            <div>
              <strong>Need Assistance?</strong>
              <p>Contact support for setup help.</p>
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
                  <h3>🏪 Shop & Business Profile</h3>
                  <p>These details appear on your customer invoices, online store profile, and bookings.</p>
                </div>

                <div className="settings-form-grid">
                  <div className="set-field-group">
                    <label>Shop / Business Name *</label>
                    <input
                      type="text"
                      value={settings.shopName}
                      onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                      placeholder="e.g. National Tyre & Service Center"
                      required
                    />
                  </div>

                  <div className="set-field-group">
                    <label>Contact Phone Number *</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      placeholder="10 digit mobile number"
                      required
                    />
                  </div>

                  <div className="set-field-group">
                    <label>Business Email Address</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      placeholder="yourshop@gmail.com"
                    />
                  </div>

                  <div className="set-field-group">
                    <label>City / Town *</label>
                    <input
                      type="text"
                      value={settings.city}
                      onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                      placeholder="e.g. Raipur / Delhi / Mumbai"
                      required
                    />
                  </div>

                  <div className="set-field-group full-width">
                    <label>Shop Address & Area</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      placeholder="e.g. Shop 12, Main Market Road, Near Transport Stand"
                    />
                  </div>

                  <div className="set-field-group">
                    <label>GSTIN / Tax Number (Optional)</label>
                    <input
                      type="text"
                      value={settings.gstin}
                      onChange={(e) => setSettings({ ...settings, gstin: e.target.value.toUpperCase() })}
                      placeholder="e.g. 22AAAAA0000A1Z5"
                      maxLength={15}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ═══ TAB 2: BILLING & INVOICE SETTINGS ═══ */}
            {activeTab === "billing" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🧾 Billing & Invoice Preferences</h3>
                  <p>Configure tax calculations, invoice prefixes, and default terms & conditions.</p>
                </div>

                <div className="settings-form-grid">
                  <div className="set-field-group">
                    <label>Default Tax Calculation Mode</label>
                    <select
                      value={settings.defaultTaxMode}
                      onChange={(e) => setSettings({ ...settings, defaultTaxMode: e.target.value })}
                    >
                      <option value="none">None (No GST on Bills)</option>
                      <option value="gst18">GST 18% (Standard Auto Tax)</option>
                      <option value="gst28">GST 28% (Commercial / Heavy Vehicles)</option>
                    </select>
                  </div>

                  <div className="set-field-group">
                    <label>Invoice Number Prefix</label>
                    <input
                      type="text"
                      value={settings.invoicePrefix}
                      onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                      placeholder="e.g. TS-INV- or SHOP-"
                    />
                  </div>

                  <div className="set-field-group full-width">
                    <label>Invoice Terms & Warranty Conditions</label>
                    <textarea
                      rows={3}
                      value={settings.defaultTerms}
                      onChange={(e) => setSettings({ ...settings, defaultTerms: e.target.value })}
                      placeholder="Terms and conditions printed at the bottom of customer bills..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ═══ TAB 3: NOTIFICATIONS & ALERTS ═══ */}
            {activeTab === "notifications" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🔔 Notification & Alert Preferences</h3>
                  <p>Choose how you receive booking alerts, reviews, and update notifications.</p>
                </div>

                <div className="toggles-list">
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <strong>💬 Instant WhatsApp Alerts</strong>
                      <p>Receive immediate alerts on WhatsApp when a customer places a booking or submits an inquiry.</p>
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
                      <strong>📱 SMS Notifications</strong>
                      <p>Receive SMS alerts for emergency puncture and doorstep fitment requests.</p>
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
                </div>
              </div>
            )}

            {/* ═══ TAB 4: ACCOUNT & SECURITY ═══ */}
            {activeTab === "security" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>🔒 Account & Security</h3>
                  <p>Manage your login credentials, theme preferences, and account controls.</p>
                </div>

                <div className="security-box-card">
                  <div className="sec-item-row">
                    <div>
                      <strong>Password Reset</strong>
                      <p>Send a secure password reset link to your registered email ({user?.email}).</p>
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
                      ✅ Password reset link has been dispatched to '{user?.email}'. Please check your inbox and spam folder.
                    </div>
                  )}

                  <div className="sec-item-row" style={{ marginTop: "14px" }}>
                    <div>
                      <strong>Theme Appearance</strong>
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

                  {/* Danger Zone: Account Deletion */}
                  <div className="sec-item-row danger-zone-row" style={{ marginTop: "20px", borderColor: "rgba(231,76,60,0.3)", background: "rgba(231,76,60,0.03)" }}>
                    <div>
                      <strong style={{ color: "#e74c3c", display: "flex", alignItems: "center", gap: "6px" }}>
                        <AlertTriangle size={15} /> Delete Account & Associated Data
                      </strong>
                      <p style={{ color: "#64748b", margin: "2px 0 0" }}>
                        In accordance with Google Play Store Data Safety guidelines, you can permanently delete your account and personal records.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-danger-del"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <Trash2 size={14} /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ TAB 5: GOOGLE SHEETS SYNC ═══ */}
            {activeTab === "sheets" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>📊 Google Sheets Sync & Live Records</h3>
                  <p>Automatically synchronize customer logins, registrations, and tyre bookings to your Google Sheet.</p>
                </div>

                <div className="set-field-group">
                  <label>Google Apps Script Web App URL</label>
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    style={{ fontFamily: "monospace", fontSize: "12px" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setGoogleSheetUrl(sheetUrl);
                      alert("✅ Google Sheet URL saved successfully!");
                    }}
                    className="btn-sec-action"
                    style={{ background: "#c0392b", color: "white", border: "none" }}
                  >
                    <Save size={14} /> Save Sheet URL
                  </button>

                  <button
                    type="button"
                    onClick={handleTestSheet}
                    disabled={testingSheet}
                    className="btn-sec-action"
                  >
                    {testingSheet ? <RefreshCw size={14} className="spin" /> : "🧪 Test Connection"}
                  </button>
                </div>

                {sheetTestResult && (
                  <div style={{ marginTop: "12px", padding: "10px 12px", borderRadius: "8px", fontSize: "12.5px", background: sheetTestResult.type === "success" ? "#f0fdf4" : "#fef2f2", border: `1px solid ${sheetTestResult.type === "success" ? "#bbf7d0" : "#fecaca"}`, color: sheetTestResult.type === "success" ? "#166534" : "#991b1b" }}>
                    {sheetTestResult.message}
                  </div>
                )}
              </div>
            )}

            {/* ═══ TAB 6: LEGAL, TRADEMARK & PRIVACY COMPLIANCE ═══ */}
            {activeTab === "legal" && (
              <div className="settings-section">
                <div className="sec-header">
                  <h3>⚖️ Legal, Trademark & Data Privacy Compliance</h3>
                  <p>Statutory compliances, Google Play Store policy links, and user data protections.</p>
                </div>

                {/* 🌟 1. Prominent Google Play Store Privacy Policy URL Card */}
                <div className="playstore-privacy-card">
                  <div className="playstore-privacy-header">
                    <Globe size={20} color="#15803d" />
                    <div>
                      <strong style={{ fontSize: "14px", color: "#166534" }}>
                        Google Play Console Privacy Policy URL
                      </strong>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#374151" }}>
                        Use this official live URL in your Google Play Console & developer listings:
                      </p>
                    </div>
                  </div>

                  <div className="privacy-url-input-row">
                    <input
                      type="text"
                      readOnly
                      value={playStorePrivacyPolicyUrl}
                      className="privacy-url-input"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPrivacyUrl}
                      className="btn-copy-privacy-url"
                    >
                      {copiedPrivacyUrl ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedPrivacyUrl ? "Copied!" : "Copy URL"}</span>
                    </button>
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <Link
                      to="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-open-privacy-link"
                    >
                      <ExternalLink size={13} /> View Live Privacy Policy Page
                    </Link>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "16px" }}>
                  {/* Trademark Fair Use */}
                  <div className="legal-info-card">
                    <div className="legal-card-header">
                      <Scale size={17} color="#8e44ad" />
                      <strong style={{ color: "#8e44ad" }}>
                        Trade Marks Act, 1999 — Section 30 (Nominative Fair Use Protection)
                      </strong>
                    </div>
                    <p className="legal-card-desc">
                      All brand names, trademarks, and logos (such as MRF, Apollo, CEAT, Bridgestone, Michelin, Goodyear, JK Tyre, Continental, etc.) displayed on TyreSaathi are property of their respective trademark holders. Mention is strictly for descriptive compatibility and genuine identification under Section 30 of the Indian Trade Marks Act 1999.
                    </p>
                    <Link to="/disclaimer" className="legal-card-link">
                      Full Trademark & IP Policy Document ↗
                    </Link>
                  </div>

                  {/* Terms of Service */}
                  <div className="legal-info-card" style={{ borderColor: "#bae6fd", background: "#f0f9ff" }}>
                    <div className="legal-card-header">
                      <ShieldCheck size={17} color="#0284c7" />
                      <strong style={{ color: "#0284c7" }}>
                        Terms of Service & Genuine Manufacturer Warranty
                      </strong>
                    </div>
                    <p className="legal-card-desc">
                      All tyre products purchased through TyreSaathi partner retail shops come with official brand warranty cards issued directly by the respective manufacturers.
                    </p>
                    <Link to="/terms" className="legal-card-link" style={{ color: "#0284c7" }}>
                      Read Terms of Service & User Agreement ↗
                    </Link>
                  </div>

                  {/* Grievance Redressal */}
                  <div className="legal-info-card" style={{ borderColor: "#e2e8f0", background: "#f8fafc" }}>
                    <strong style={{ fontSize: "13px", display: "block", marginBottom: "4px" }}>
                      📞 Grievance Redressal (IT Act 2000 Section 79)
                    </strong>
                    <p className="legal-card-desc" style={{ marginBottom: "6px" }}>
                      Grievance Officer: <strong>TyreSaathi Compliance Team</strong> | Email: <code>tyresathi@gmail.com</code> | Phone: <code>+91 8877277757</code>
                    </p>
                    <Link to="/support" className="legal-card-link" style={{ color: "#c0392b" }}>
                      Raise a Support Ticket / Grievance →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Save Button */}
            <div className="settings-bottom-actions">
              <button type="submit" className="btn-save-settings" disabled={saving}>
                <Save size={15} /> {saving ? "Saving Changes..." : "Save Settings"}
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop-st">
          <div className="delete-modal-box-st">
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <AlertTriangle size={32} color="#e74c3c" />
            </div>
            <h3 style={{ margin: "0 0 6px", color: "#1e293b", textAlign: "center", fontSize: "16px" }}>Delete Account Permanently?</h3>
            <p style={{ fontSize: "12.5px", color: "#64748b", lineHeight: "1.5", textAlign: "center", margin: "0 0 14px" }}>
              Are you sure you want to permanently delete your account and associated records? This action cannot be undone.
            </p>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "11.5px", fontWeight: "700", color: "#e74c3c", display: "block", marginBottom: "4px" }}>
                Type "DELETE" below to confirm:
              </label>
              <input 
                type="text"
                placeholder="Type DELETE here"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "1.5px solid #e74c3c",
                  fontSize: "13px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: "#e74c3c",
                  outline: "none"
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button 
                type="button"
                className="btn-cancel-modal-st"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button 
                type="button"
                className="btn-confirm-delete-st"
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmText.trim().toUpperCase() !== "DELETE"}
                style={{
                  opacity: deleteConfirmText.trim().toUpperCase() === "DELETE" ? 1 : 0.5,
                  cursor: deleteConfirmText.trim().toUpperCase() === "DELETE" ? "pointer" : "not-allowed"
                }}
              >
                {isDeleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .settings-page-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 16px 12px 60px 12px;
          color: #0f172a;
        }
        .settings-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
        }
        @media (max-width: 640px) {
          .settings-header-row { 
            flex-direction: column; 
            gap: 10px; 
          }
        }
        .settings-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 1.25;
        }
        .settings-sub {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }
        .btn-save-all-top {
          background: #c0392b;
          color: white;
          border: none;
          padding: 7px 14px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .btn-save-all-top:hover {
          background: #a93226;
        }
        .settings-success-alert {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 8px 12px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }

        /* Layout Grid */
        .settings-layout-grid {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 14px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .settings-layout-grid { 
            grid-template-columns: 1fr; 
            gap: 12px; 
          }
        }

        /* Nav Sidebar */
        .settings-nav-sidebar {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        @media (max-width: 860px) {
          .settings-nav-sidebar {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 6px;
          }
          .settings-nav-sidebar::-webkit-scrollbar {
            display: none;
          }
          .nav-tab-btn {
            flex-shrink: 0;
            padding: 7px 12px !important;
            border-radius: 20px !important;
          }
          .tab-btn-text small {
            display: none !important;
          }
          .quick-help-link-box {
            display: none !important;
          }
        }
        .nav-tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .nav-tab-btn:hover {
          background: #f8fafc;
        }
        .tab-btn-active {
          background: #c0392b !important;
          color: white !important;
          border-color: #c0392b;
        }
        .tab-btn-active small {
          color: rgba(255,255,255,0.8) !important;
        }
        .tab-btn-text strong {
          display: block;
          font-size: 0.8125rem;
        }
        .tab-btn-text small {
          font-size: 0.6875rem;
          color: #64748b;
        }

        .quick-help-link-box {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
          padding: 10px 12px;
          margin-top: 10px;
          display: flex;
          gap: 8px;
          font-size: 0.75rem;
        }
        .quick-help-link-box strong {
          display: block;
          margin-bottom: 1px;
        }
        .quick-help-link-box p {
          margin: 0 0 3px;
          color: #64748b;
        }
        .link-to-support {
          color: #c0392b;
          font-weight: 700;
          text-decoration: none;
        }

        /* Content Card */
        .settings-content-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 14px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
        }
        .sec-header {
          margin-bottom: 14px;
        }
        .sec-header h3 {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 3px;
        }
        .sec-header p {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
        }

        /* Forms */
        .settings-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .settings-form-grid { grid-template-columns: 1fr; }
        }
        .set-field-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .full-width {
          grid-column: 1 / -1;
        }
        .set-field-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #334155;
        }
        .set-field-group input,
        .set-field-group select,
        .set-field-group textarea {
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.8125rem;
          outline: none;
          background: #ffffff;
        }
        .set-field-group input:focus,
        .set-field-group select:focus,
        .set-field-group textarea:focus {
          border-color: #c0392b;
        }

        /* Toggles */
        .toggles-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          gap: 10px;
        }
        .toggle-info strong {
          display: block;
          font-size: 0.8125rem;
          margin-bottom: 2px;
        }
        .toggle-info p {
          margin: 0;
          font-size: 0.71875rem;
          color: #64748b;
          line-height: 1.35;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 22px;
          flex-shrink: 0;
        }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #cbd5e1;
          transition: .3s;
          border-radius: 22px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px; width: 16px;
          left: 3px; bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .slider { background-color: #27ae60; }
        input:checked + .slider:before { transform: translateX(18px); }

        /* Security */
        .security-box-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sec-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sec-item-row strong {
          display: block;
          font-size: 0.8125rem;
        }
        .sec-item-row p {
          margin: 2px 0 0;
          font-size: 0.71875rem;
          color: #64748b;
        }
        .btn-sec-action {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #334155;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .btn-danger-del {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #fecaca;
          background: #fee2e2;
          color: #dc2626;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Play Store Privacy Card */
        .playstore-privacy-card {
          background: #f0fdf4;
          border: 1.5px solid #86efac;
          border-radius: 12px;
          padding: 14px;
        }
        .playstore-privacy-header {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }
        .privacy-url-input-row {
          display: flex;
          gap: 8px;
        }
        .privacy-url-input {
          flex: 1;
          padding: 7px 10px;
          border-radius: 6px;
          border: 1px solid #86efac;
          background: white;
          font-family: monospace;
          font-size: 0.75rem;
          color: #166534;
        }
        .btn-copy-privacy-url {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 7px 12px;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
        }
        .btn-open-privacy-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #15803d;
          text-decoration: none;
        }

        .legal-info-card {
          background: #faf5ff;
          border: 1px solid #e9d5ff;
          border-radius: 10px;
          padding: 12px;
        }
        .legal-card-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
          font-size: 0.8125rem;
        }
        .legal-card-desc {
          font-size: 0.71875rem;
          color: #475569;
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .legal-card-link {
          font-size: 0.71875rem;
          font-weight: 700;
          color: #7c3aed;
          text-decoration: none;
        }

        .settings-bottom-actions {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: flex-end;
        }
        .btn-save-settings {
          background: #c0392b;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Delete Modal */
        .modal-backdrop-st {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 16px;
        }
        .delete-modal-box-st {
          background: white;
          border-radius: 14px;
          max-width: 380px;
          width: 100%;
          padding: 18px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .btn-cancel-modal-st {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #475569;
          font-weight: 700;
          font-size: 0.78rem;
          cursor: pointer;
        }
        .btn-confirm-delete-st {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          border: none;
          background: #dc2626;
          color: white;
          font-weight: 700;
          font-size: 0.78rem;
        }
      `}</style>
    </div>
  );
}
