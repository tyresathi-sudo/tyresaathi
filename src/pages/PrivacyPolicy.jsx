import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Trash2, Mail, Phone, CheckCircle2, X } from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="legal-page-container">
      <div className="legal-header-card">
        {/* ❌ Clean Top-Right Close Button */}
        <button
          type="button"
          className="btn-close-legal-page"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              window.location.href = "/";
            }
          }}
          title="Close (वापस जाएं)"
          aria-label="Close"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <button onClick={() => navigate(-1)} className="btn-back-legal">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="legal-badge">
          <Shield size={14} /> Data Privacy & Security
        </div>
        <h1 className="legal-title">Privacy Policy for TyreSaathi</h1>
        <p className="legal-sub">
          Compliant with Google Play Data Safety Standards & Information Technology Act (India), 2000
        </p>
        <span className="last-updated">Last Updated: August 2026</span>
      </div>

      <div className="legal-body-content">
        <section className="legal-section">
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>TyreSaathi</strong>. Your privacy and trust are of utmost importance to us. 
            This Privacy Policy describes in transparent detail how we collect, process, store, and protect your personal 
            and business information when you use the TyreSaathi mobile application and web platform.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information We Collect</h2>
          <ul>
            <li>
              <strong>Account & Profile Information:</strong> When you register as a Customer or Shop Owner, we collect your Name, Email address, Phone number, and Business/Garage name.
            </li>
            <li>
              <strong>Workshop & Inventory Data:</strong> For shopkeepers, we process tyre product listings, tyre sizes, stock quantities, invoice bills, and pricing data entered by you.
            </li>
            <li>
              <strong>Transaction & Booking Records:</strong> Details of tyre replacement appointments, puncture & cut repair requests, and invoices generated.
            </li>
          </ul>
        </section>

        <section className="legal-section highlight-box">
          <h2>3. Device Permissions & How They Are Used</h2>
          <p>TyreSaathi requests only necessary device permissions strictly for app functionality:</p>
          <ul>
            <li>
              📍 <strong>Location (ACCESS_FINE_LOCATION / ACCESS_COARSE_LOCATION):</strong> 
              Used solely to calculate real-time distance and display the nearest authorized tyre shops, fitment hubs, and doorstep mechanics to you. Location data is never sold or tracked in the background when the app is closed.
            </li>
            <li>
              📷 <strong>Camera (CAMERA):</strong> 
              Used when you choose to take a photo of a tyre cut, invoice receipt, or shop storefront to upload directly to your profile or invoice.
            </li>
            <li>
              📁 <strong>Storage & Photos (READ_MEDIA_IMAGES / STORAGE):</strong> 
              Used to let you select tyre photos, shop banners, or download PDF invoice receipts.
            </li>
            <li>
              🌐 <strong>Internet & Network State:</strong> 
              Required to synchronize real-time tyre stock, Google Sheets sync, and database access.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Data Storage & Security (Google Firebase Cloud)</h2>
          <p>
            TyreSaathi uses industry-standard cloud infrastructure provided by <strong>Google Firebase</strong> 
            (Firebase Authentication, Cloud Firestore, and Firebase Storage) with TLS 1.3 encryption in transit and AES-256 encryption at rest.
          </p>
          <ul>
            <li>Passswords are salted and securely hashed by Google Firebase Auth.</li>
            <li>We do NOT sell, rent, or trade your personal or business data to third-party data brokers or marketing agencies.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Third-Party Integrations</h2>
          <ul>
            <li><strong>Google Maps:</strong> Used to display store locations and directions.</li>
            <li><strong>WhatsApp (wa.me):</strong> Used for instant communication between customer and shopkeeper upon user initiation.</li>
            <li><strong>Google Sheets API:</strong> Allows shopkeepers to optionally export their invoices to their own personal Google Sheets.</li>
          </ul>
        </section>

        <section className="legal-section delete-section">
          <h2>6. Account & Data Deletion Rights (Google Play Policy)</h2>
          <p>
            In full compliance with Google Play Store User Data Policies, you have the absolute right to delete your account and all associated data at any time:
          </p>
          <div className="delete-instructions">
            <p><strong>How to delete your account within the app:</strong></p>
            <ol>
              <li>Open TyreSaathi and go to <strong>Profile (👤)</strong> or <strong>Settings (⚙️)</strong>.</li>
              <li>Scroll down to the <strong>"Danger Zone: Delete Account"</strong> section.</li>
              <li>Click on <strong>"Delete My Account & Data"</strong> and confirm.</li>
            </ol>
            <p style={{ marginTop: "10px" }}>
              Alternatively, you can email our Grievance Officer at <strong>tyresathi@gmail.com</strong> with your registered email/phone number, and our team will permanently purge your user profile and records within 48 hours.
            </p>
          </div>
        </section>

        <section className="legal-section contact-card">
          <h2>7. Grievance Redressal Officer Contact</h2>
          <p>
            Under Rule 3(2) of the Information Technology (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021, the contact details of our Grievance Officer are:
          </p>
          <div className="contact-details">
            <p><strong>Grievance Officer:</strong> TyreSaathi Data & Grievance Cell</p>
            <p><Mail size={14} /> <strong>Official Email:</strong> tyresathi@gmail.com</p>
            <p><Phone size={14} /> <strong>Helpline Number:</strong> +91 8877277757</p>
            <p><strong>Operating Region:</strong> India</p>
          </div>
        </section>
      </div>

      <div className="legal-footer-nav">
        <Link to="/terms" className="legal-nav-link">Terms of Service →</Link>
        <Link to="/disclaimer" className="legal-nav-link">Trademark & IP Disclaimer →</Link>
      </div>

      <style>{`
        .legal-page-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          padding: 8px 0 60px;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          color: var(--text, #2c3e50);
        }
        .legal-header-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-radius: 14px;
          padding: 24px 28px;
          color: white;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .btn-close-legal-page {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.28);
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 10;
        }
        .btn-close-legal-page:hover {
          background: #e74c3c;
          border-color: #e74c3c;
          color: #ffffff;
          transform: scale(1.08) rotate(90deg);
          box-shadow: 0 6px 20px rgba(231, 76, 60, 0.45);
        }
        .btn-close-legal-page:active {
          transform: scale(0.95);
        }
        .btn-back-legal {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          color: white;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 14px;
          transition: all 0.2s;
        }
        .btn-back-legal:hover {
          background: rgba(255,255,255,0.25);
        }
        .legal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(52, 152, 219, 0.2);
          border: 1px solid #3498db;
          color: #70a1ff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .legal-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(1.4rem, 2.4vw, 2.1rem);
          font-weight: 800;
          margin: 0 0 6px;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: 0.5px;
        }
        .legal-sub {
          font-size: 0.95rem;
          color: #cbd5e1;
          margin: 0 0 10px;
          line-height: 1.5;
          max-width: 900px;
        }
        .last-updated {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }
        .legal-body-content {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 14px;
          padding: 30px 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .legal-section {
          margin-bottom: 24px;
        }
        .legal-section h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--heading, #1e293b);
          margin: 0 0 10px;
          border-left: 4px solid #3498db;
          padding-left: 10px;
        }
        .legal-section p, .legal-section li {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-muted, #475569);
        }
        .legal-section ul, .legal-section ol {
          padding-left: 22px;
          margin: 8px 0;
        }
        .legal-section li {
          margin-bottom: 8px;
        }
        .highlight-box {
          background: rgba(52, 152, 219, 0.05);
          border: 1px solid rgba(52, 152, 219, 0.25);
          border-radius: 12px;
          padding: 16px 20px;
        }
        .delete-section {
          border-left-color: #e74c3c;
        }
        .delete-instructions {
          background: rgba(231, 76, 60, 0.06);
          border: 1px dashed rgba(231, 76, 60, 0.4);
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 10px;
        }
        .contact-card {
          background: var(--surface-2, #f8fafc);
          border-radius: 12px;
          padding: 18px 20px;
          border: 1px solid var(--border, #e2e8f0);
        }
        .contact-details p {
          margin: 6px 0;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
        }
        .legal-footer-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          gap: 14px;
          flex-wrap: wrap;
        }
        .legal-nav-link {
          color: #c0392b;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
        }
        .legal-nav-link:hover {
          text-decoration: underline;
        }

        /* 📱 Mobile Optimized Rules */
        @media (max-width: 640px) {
          .legal-page-container {
            padding: 4px 0 50px;
          }
          .legal-header-card {
            padding: 16px 14px;
            border-radius: 12px;
            margin-bottom: 14px;
          }
          .btn-close-legal-page {
            top: 14px;
            right: 14px;
            width: 38px;
            height: 38px;
          }
          .legal-body-content {
            padding: 18px 14px;
            border-radius: 12px;
          }
          .legal-title {
            font-size: 1.4rem;
          }
          .legal-sub {
            font-size: 0.82rem;
          }
          .legal-section h2 {
            font-size: 1rem;
          }
          .legal-section p, .legal-section li {
            font-size: 0.88rem;
            line-height: 1.55;
          }
          .highlight-box, .delete-instructions, .contact-card {
            padding: 12px 12px;
          }
          .contact-details p {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </div>
  );
}
