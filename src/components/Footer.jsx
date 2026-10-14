import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Share2 } from "lucide-react";
import { shareApp } from "../utils/nativeBridge.js";

export default function Footer() {
  return (
    <footer className="ts-compact-footer">
      <div className="footer-inner-wrap">
        {/* Brand & Copyright */}
        <div className="footer-left-sec">
          <div className="footer-brand-title">
            <img 
              src="/logo.png" 
              alt="TyreSaathi Logo" 
              className="footer-logo-small" 
              onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
            />
            <span>TyreSaathi</span>
          </div>
          <p className="footer-cr-text">
            © {new Date().getFullYear()} TyreSaathi. All rights reserved.
          </p>
        </div>

        {/* Essential Navigation & Legal Links */}
        <div className="footer-center-links">
          <Link to="/search">Tyre Search</Link>
          <span className="dot-sep">•</span>
          <Link to="/store-location">Partner Stores</Link>
          <span className="dot-sep">•</span>
          <Link to="/terms">Terms</Link>
          <span className="dot-sep">•</span>
          <Link to="/privacy-policy">Privacy</Link>
          <span className="dot-sep">•</span>
          <Link to="/disclaimer">Trademark Notice</Link>
          <span className="dot-sep">•</span>
          <Link to="/support">Support</Link>
        </div>

        {/* Safe Harbor Pill & Share App Action */}
        <div className="footer-right-sec">
          <button
            type="button"
            onClick={shareApp}
            className="footer-badge-link"
            title="Share TyreSaathi App (Indus Appstore)"
            style={{ cursor: "pointer", border: "1px solid rgba(59, 130, 246, 0.3)", background: "rgba(59, 130, 246, 0.08)", color: "var(--text)" }}
          >
            <Share2 size={13} color="#3b82f6" />
            <span>Share App</span>
          </button>
          <Link to="/settings" className="footer-badge-link" title="Open Legal & Settings">
            <ShieldCheck size={14} color="#27ae60" />
            <span>Verified Legal & IP Compliance</span>
          </Link>
        </div>
      </div>

      <style>{`
        .ts-compact-footer {
          background: var(--surface);
          border-top: 1px solid var(--border);
          padding: 20px 24px;
          margin-top: 40px;
          color: var(--text-muted);
          font-size: 13px;
        }
        .footer-inner-wrap {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .footer-left-sec {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .footer-brand-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 800;
          color: var(--text);
          font-size: 15px;
        }
        .footer-logo-small {
          width: 22px;
          height: 22px;
          object-fit: contain;
          border-radius: 4px;
        }
        .footer-cr-text {
          margin: 0;
          font-size: 12px;
          color: var(--text-muted);
        }
        .footer-center-links {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .footer-center-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .footer-center-links a:hover {
          color: #c0392b;
        }
        .dot-sep {
          color: var(--border);
        }
        .footer-right-sec {
          display: flex;
          align-items: center;
        }
        .footer-badge-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 5px 12px;
          border-radius: 20px;
          color: var(--text);
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.15s ease;
        }
        .footer-badge-link:hover {
          border-color: #27ae60;
          color: #27ae60;
        }

        /* Hide footer on mobile screens to give native app feel */
        @media (max-width: 899px) {
          .ts-compact-footer {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
