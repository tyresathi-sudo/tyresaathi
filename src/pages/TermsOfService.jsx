import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Shield, FileText, CheckCircle2, AlertTriangle, Phone, Mail } from "lucide-react";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="legal-page-container">
      <div className="legal-header-card">
        <button onClick={() => navigate(-1)} className="btn-back-legal">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="legal-badge">
          <FileText size={14} /> Legal Documentation
        </div>
        <h1 className="legal-title">Terms of Service & User Agreement</h1>
        <p className="legal-sub">
          <strong>TyreSaathi</strong> — Empowering Tyre Businesses & Motorists Across India
        </p>
        <span className="last-updated">Last Updated: August 2026</span>
      </div>

      <div className="legal-body-content">
        <section className="legal-section">
          <h2>1. Introduction & Acceptance of Terms</h2>
          <p>
            Welcome to <strong>TyreSaathi</strong> ("we", "our", "us", or "Platform"). By accessing or using our mobile application,
            website, or associated services, you agree to be bound by these Terms of Service. If you do not agree to these terms, 
            please do not use our services.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Nature of Platform & Role of TyreSaathi</h2>
          <p>
            TyreSaathi operates as an independent multi-brand tyre marketplace, garage discovery portal, and workshop billing management software.
          </p>
          <ul>
            <li>
              <strong>Intermediary Platform:</strong> TyreSaathi acts as a technology intermediary connecting motorists (customers) with independent, verified tyre retail shops, alignment hubs, and doorstep mechanics.
            </li>
            <li>
              <strong>Independent Dealerships:</strong> All product listings, tyre sales, fitments, cut repairs, and physical services are performed by independent local tyre retailers and service hubs.
            </li>
          </ul>
        </section>

        <section className="legal-section highlight-box">
          <h2>3. Intellectual Property & Brand Names (Nominative Fair Use)</h2>
          <p>
            All brand names, trademarks, logos, model designations, and tyre patterns (including but not limited to 
            <strong> MRF, Apollo, CEAT, Bridgestone, Michelin, Goodyear, JK Tyre, Continental, Yokohama, TVS Eurogrip, Maruti Suzuki, Hyundai, Tata, etc.</strong>) 
            are the registered property of their respective trademark holders.
          </p>
          <p>
            Their display on TyreSaathi is strictly for <strong>nominative fair-use purposes</strong> to identify genuine products, specify 
            vehicle compatibility/fitment size, and provide accurate catalogue specifications for consumers. TyreSaathi does not claim 
            exclusive ownership, direct sponsorship, or official affiliation unless explicitly certified in writing.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Manufacturer Warranty & Product Guarantee</h2>
          <ul>
            <li>
              <strong>Manufacturer Direct Warranty:</strong> Tyres sold by participating shopkeepers come with standard company warranty as provided by the respective tyre manufacturer (e.g., standard 3 to 5 years manufacturer or unconditional warranty depending on brand policy).
            </li>
            <li>
              <strong>Warranty Registration:</strong> Warranty claim inspection, replacement approval, and pro-rata settlements are determined solely by authorized company warranty inspectors of the respective tyre brands.
            </li>
            <li>
              <strong>Bill Requirement:</strong> Customers are advised to preserve their digital invoice (generated via TyreSaathi or shopkeeper) and warranty documentation for claiming manufacturer warranty.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Service Bookings, Pricing & Cancellations</h2>
          <ul>
            <li>
              <strong>Slot Bookings:</strong> Customers can book doorstep assistance, tyre fitting, wheel alignment, or puncture repair slots. Estimated arrival time may vary based on traffic, distance, and technician availability.
            </li>
            <li>
              <strong>Cancellations:</strong> Users can cancel a service request without cancellation penalty prior to technician dispatch.
            </li>
            <li>
              <strong>Pricing & Taxes:</strong> Prices displayed on quotes or product listings include applicable Goods and Services Tax (GST) as billed by the respective vendor.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Shop Owner / Vendor Conduct & Responsibilities</h2>
          <p>Vendors registered on TyreSaathi agree to:</p>
          <ul>
            <li>Sell only 100% genuine, authentic, and company-verified tyres and automotive parts.</li>
            <li>Honor booking commitments, provide transparent pricing, and issue valid tax invoices.</li>
            <li>Not engage in fraudulent billing, duplicate parts supply, or misleading stock availability.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Account Termination & Data Deletion</h2>
          <p>
            Users and shopkeepers can delete their account and associated profile data at any time directly through the app (Profile ➡️ Danger Zone: Delete Account) or by emailing our Grievance Officer. TyreSaathi reserves the right to suspend accounts engaging in spam, abusive behavior, or counterfeit trade.
          </p>
        </section>

        <section className="legal-section contact-card">
          <h2>8. Grievance Redressal & Legal Inquiries</h2>
          <p>
            In compliance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, for any legal notices, intellectual property queries, or consumer support, please contact:
          </p>
          <div className="contact-details">
            <p><strong>Grievance Officer:</strong> TyreSaathi Compliance Team</p>
            <p><Mail size={14} /> <strong>Email:</strong> tyresathi@gmail.com</p>
            <p><Phone size={14} /> <strong>Support Helpline:</strong> +91 8877277757</p>
            <p><strong>Address:</strong> TyreSaathi Operations Hub, Auto Cluster, India</p>
          </div>
        </section>
      </div>

      <div className="legal-footer-nav">
        <Link to="/privacy-policy" className="legal-nav-link">Privacy Policy →</Link>
        <Link to="/disclaimer" className="legal-nav-link">Trademark & IP Disclaimer →</Link>
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
          border-radius: 12px;
          padding: 18px 14px;
          color: white;
          margin-bottom: 14px;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .legal-header-card { padding: 24px 20px; border-radius: 14px; margin-bottom: 18px; }
        }
        .btn-back-legal {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          color: white;
          border: 1px solid rgba(255,255,255,0.25);
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.2s;
        }
        .btn-back-legal:hover {
          background: rgba(255,255,255,0.25);
        }
        .legal-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(192, 57, 43, 0.2);
          border: 1px solid #c0392b;
          color: #ff6b6b;
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .legal-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 1.35rem; /* text-xl on mobile */
          font-weight: 800;
          margin: 0 0 4px;
          color: #ffffff;
          line-height: 1.2;
        }
        @media (min-width: 640px) {
          .legal-title { font-size: 1.85rem; }
        }
        .legal-sub {
          font-size: 0.75rem; /* text-xs */
          color: #cbd5e1;
          margin: 0 0 8px;
          line-height: 1.35;
        }
        .last-updated {
          font-size: 0.6875rem;
          color: #94a3b8;
        }
        .legal-body-content {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 12px;
          padding: 18px 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        @media (min-width: 640px) {
          .legal-body-content { padding: 24px 20px; border-radius: 14px; }
        }
        .legal-section {
          margin-bottom: 18px;
        }
        .legal-section h2 {
          font-size: 0.95rem; /* text-base */
          font-weight: 700;
          color: var(--heading, #1e293b);
          margin: 0 0 8px;
          border-left: 3px solid #c0392b;
          padding-left: 8px;
        }
        .legal-section p, .legal-section li {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--text-muted, #475569);
        }
        .legal-section ul {
          padding-left: 18px;
          margin: 6px 0;
        }
        .legal-section li {
          margin-bottom: 6px;
        }
        .highlight-box {
          background: rgba(192, 57, 43, 0.04);
          border: 1px solid rgba(192, 57, 43, 0.2);
          border-radius: 10px;
          padding: 12px 14px;
        }
        .contact-card {
          background: var(--surface-2, #f8fafc);
          border-radius: 10px;
          padding: 14px 12px;
          border: 1px solid var(--border, #e2e8f0);
        }
        .contact-details p {
          margin: 3px 0;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
        }
        .legal-footer-nav {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .legal-nav-link {
          color: #c0392b;
          font-weight: 700;
          font-size: 0.75rem;
          text-decoration: none;
        }
        .legal-nav-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
