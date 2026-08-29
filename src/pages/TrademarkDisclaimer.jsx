import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, AlertCircle, Scale, Mail, Phone } from "lucide-react";

export default function TrademarkDisclaimer() {
  const navigate = useNavigate();

  return (
    <div className="legal-page-container">
      <div className="legal-header-card">
        <button onClick={() => navigate(-1)} className="btn-back-legal">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="legal-badge">
          <Scale size={14} /> Intellectual Property & Non-Affiliation
        </div>
        <h1 className="legal-title">Trademark & Non-Affiliation Disclaimer</h1>
        <p className="legal-sub">
          Official Trademark Notice under Trade Marks Act, 1999 (Section 30) & IT Act, 2000
        </p>
        <span className="last-updated">Effective Date: August 2026</span>
      </div>

      <div className="legal-body-content">
        <section className="legal-section highlight-box">
          <h2>1. General Trademark & Brand Notice</h2>
          <p>
            All brand logos, product names, trade names, vehicle model names, manufacturer emblems, and registered trademarks 
            displayed on the TyreSaathi platform (including web application, Android app, and customer communications) 
            are the <strong>exclusive property of their respective trademark owners and manufacturers</strong>.
          </p>
          <p>
            These include, but are not limited to: 
            <strong> MRF Tyres, Apollo Tyres, CEAT Ltd, Bridgestone Corporation, Michelin Group, The Goodyear Tire & Rubber Company, 
            JK Tyre & Industries, Continental AG, Pirelli, Yokohama Rubber Co., TVS Eurogrip (TVS Srichakra), Ralco, 
            Maruti Suzuki India, Hyundai Motor, Tata Motors, Mahindra & Mahindra, Honda, Toyota, Bajaj Auto, Hero MotoCorp</strong>, 
            and other automotive manufacturers.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Legal Basis: Nominative Fair Use (Section 30, Trade Marks Act 1999)</h2>
          <p>
            Under Section 30(2)(d) of the Indian Trade Marks Act, 1999 and internationally accepted doctrine of <strong>Nominative Fair Use</strong>:
          </p>
          <ul>
            <li>
              The use of third-party trademarks and trade names on TyreSaathi is strictly for <strong>descriptive, compatibility, and fitment identification purposes</strong> (e.g., specifying that a 185/65 R15 tyre fits a Maruti Swift / Hyundai i20).
            </li>
            <li>
              TyreSaathi does NOT claim any trademark ownership, proprietary design rights, or patent claims over any third-party brands.
            </li>
            <li>
              The reference to any brand does NOT constitute or imply sponsorship, endorsement, direct partnership, or special affiliation by the brand owners, unless explicitly stated in writing.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Marketplace & Independent Retailer Model</h2>
          <p>
            TyreSaathi is a software-as-a-service (SaaS) and digital aggregator platform that enables independent retail tyre shops, 
            mechanics, and garages to manage inventory and offer genuine tyre fitment and repair services to local motorists. 
            All physical products are sold directly by independent, licensed retail dealers.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Notice & Takedown Policy (Safe Harbor under Section 79, IT Act 2000)</h2>
          <p>
            TyreSaathi respects the intellectual property rights of all entities and operates with strict compliance under the Information 
            Technology Act, 2000 (Intermediary Guidelines).
          </p>
          <p>
            If you are a trademark or copyright holder (or an authorized representative) and believe that any listing, content, or imagery on our platform inadvertently infringes your rights, please submit an official inquiry or takedown request to our Grievance & IP Redressal Officer:
          </p>
          <div className="contact-card" style={{ marginTop: "14px" }}>
            <p><strong>Designated IP & Grievance Officer:</strong> TyreSaathi Legal & Compliance Desk</p>
            <p><Mail size={14} /> <strong>Email for IP Notices:</strong> tyresathi@gmail.com</p>
            <p><Phone size={14} /> <strong>Support Helpline:</strong> +91 8877277757</p>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>
              *Upon receiving a valid notice with supporting ownership documents, our compliance team reviews and acts within 36 business hours.
            </p>
          </div>
        </section>
      </div>

      <div className="legal-footer-nav">
        <Link to="/terms" className="legal-nav-link">Terms of Service →</Link>
        <Link to="/privacy-policy" className="legal-nav-link">Privacy Policy →</Link>
      </div>

      <style>{`
        .legal-page-container {
          max-width: 860px;
          margin: 0 auto;
          padding: 24px 16px 60px;
          font-family: 'Inter', sans-serif;
          color: var(--text, #2c3e50);
        }
        .legal-header-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          padding: 32px 24px;
          border-radius: 16px;
          margin-bottom: 28px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
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
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 16px;
          transition: all 0.2s;
        }
        .btn-back-legal:hover {
          background: rgba(255,255,255,0.25);
        }
        .legal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(46, 204, 113, 0.2);
          border: 1px solid #2ecc71;
          color: #2ed573;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }
        .legal-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 8px;
          color: #ffffff;
        }
        .legal-sub {
          font-size: 14.5px;
          color: #cbd5e1;
          margin: 0 0 10px;
        }
        .last-updated {
          font-size: 12px;
          color: #94a3b8;
        }
        .legal-body-content {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 16px;
          padding: 30px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .legal-section {
          margin-bottom: 28px;
        }
        .legal-section h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--heading, #1e293b);
          margin: 0 0 10px;
          border-left: 4px solid #2ed573;
          padding-left: 10px;
        }
        .legal-section p, .legal-section li {
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--text-muted, #475569);
        }
        .legal-section ul {
          padding-left: 20px;
          margin: 8px 0;
        }
        .legal-section li {
          margin-bottom: 6px;
        }
        .highlight-box {
          background: rgba(46, 204, 113, 0.05);
          border: 1px solid rgba(46, 204, 113, 0.25);
          border-radius: 12px;
          padding: 16px 20px;
        }
        .contact-card {
          background: var(--surface-2, #f8fafc);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid var(--border, #e2e8f0);
        }
        .contact-card p {
          margin: 4px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legal-footer-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .legal-nav-link {
          color: #c0392b;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
        }
        .legal-nav-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
