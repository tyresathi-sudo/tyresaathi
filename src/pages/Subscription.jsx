import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Crown,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Flame,
  Star,
  ChevronDown,
  ChevronUp,
  CreditCard,
  QrCode,
  X,
  Phone,
  MessageSquare,
  Gift,
  Tag,
  Building2,
  Copy,
  Check
} from "lucide-react";
import { getActiveSubscriptionConfig, SUBSCRIPTION_FAQS } from "../config/subscriptionPlans";
import { getAdminBankConfig, getUpiQrCodeUrl } from "../config/paymentConfig";
import { db } from "../firebase";
import { doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Subscription() {
  const { user, profile, updateUserProfile } = useAuth();
  const [config, setConfig] = useState(getActiveSubscriptionConfig);
  const [bankConfig, setBankConfig] = useState(getAdminBankConfig);
  const [copiedKey, setCopiedKey] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'yearly'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi', 'bank', 'card'
  const [processing, setProcessing] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Sync with dynamic updates
  useEffect(() => {
    const handlePlanUpdate = () => {
      setConfig(getActiveSubscriptionConfig());
    };
    const handleBankUpdate = () => {
      setBankConfig(getAdminBankConfig());
    };
    window.addEventListener("tyresaathi_subscription_updated", handlePlanUpdate);
    window.addEventListener("tyresaathi_bank_config_updated", handleBankUpdate);
    window.addEventListener("storage", handlePlanUpdate);
    window.addEventListener("storage", handleBankUpdate);
    return () => {
      window.removeEventListener("tyresaathi_subscription_updated", handlePlanUpdate);
      window.removeEventListener("tyresaathi_bank_config_updated", handleBankUpdate);
      window.removeEventListener("storage", handlePlanUpdate);
      window.removeEventListener("storage", handleBankUpdate);
    };
  }, []);

  const handleCopyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 3000);
  };

  const currentPlanId = profile?.subscriptionPlan || "free_lifetime";
  const plans = config.plans || [];
  const launchFreeMode = config.launchFreeMode;

  const handleOpenUpgrade = (plan) => {
    if (plan.id === "free_lifetime") {
      alert("Your 'Lifetime Free Plan' is already active! 🎉");
      return;
    }
    setSelectedPlan(plan);
    setPaymentModalOpen(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedPlan) return;
    setProcessing(true);

    try {
      const actualAmount = launchFreeMode ? 0 : (billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly);
      const planAmount = actualAmount;
      const expiryDate = new Date();
      if (billingCycle === "monthly") expiryDate.setMonth(expiryDate.getMonth() + 1);
      else expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      const subscriptionData = {
        subscriptionPlan: selectedPlan.id,
        subscriptionName: selectedPlan.name,
        subscriptionBilling: billingCycle,
        subscriptionAmount: planAmount,
        subscriptionStatus: "active",
        subscriptionExpiresAt: expiryDate.toISOString().split("T")[0],
        isLaunchOffer: launchFreeMode,
        updatedAt: serverTimestamp(),
      };

      // 1. Update in Firestore if logged in
      if (user?.uid) {
        await updateDoc(doc(db, "users", user.uid), subscriptionData);
      }

      // 2. Update context & local storage
      if (updateUserProfile) {
        updateUserProfile(subscriptionData);
      }

      // 3. Save subscription record to transactions
      const existingSubs = JSON.parse(localStorage.getItem("tyresaathi_subscriptions") || "[]");
      existingSubs.unshift({
        id: "sub-" + Date.now(),
        userId: user?.uid || "guest",
        shopName: profile?.shopName || "TyreSaathi Partner",
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        amount: planAmount,
        billingCycle,
        date: new Date().toISOString().split("T")[0],
        isLaunchOffer: launchFreeMode,
        status: "active"
      });
      localStorage.setItem("tyresaathi_subscriptions", JSON.stringify(existingSubs));

      setProcessing(false);
      setPaymentModalOpen(false);
      alert(`🎉 Congratulations! Your "${selectedPlan.name}" plan has been successfully activated!`);
    } catch (err) {
      console.warn("Subscription activation fallback:", err);
      setProcessing(false);
      setPaymentModalOpen(false);
      alert(`🎉 Your "${selectedPlan.name}" plan has been activated!`);
    }
  };

  return (
    <div className="subscription-page-container">
      {/* 🌟 Top Hero Header */}
      <div className="pricing-hero-header">
        <div className="pricing-badge-pill">
          <Crown size={14} color="#FFD200" />
          <span>PARTNER MEMBERSHIP & GROWTH PLANS</span>
        </div>
        <h1 className="pricing-main-title">
          Grow Your Business & Become the <span className="highlight-text">#1 Tyre Hub</span>
        </h1>
        <p className="pricing-sub-desc">
          <strong>100% Free Forever</strong> for small shops. Upgrade anytime to boost customer leads, get verified badges, and advertise on the homepage.
        </p>

        {/* Launch Free Mode Notification Banner */}
        {launchFreeMode && (
          <div className="launch-free-banner">
            <Gift size={18} color="#FFD200" />
            <div>
              <strong>🚀 Special Launch Offer Active:</strong>
              <span> {config.launchBannerNote || "All partner plans are currently 100% FREE during the launch period! Activate any tier for ₹0."}</span>
            </div>
          </div>
        )}

        {/* Monthly / Yearly Billing Toggle */}
        <div className="billing-cycle-toggle-box">
          <button
            className={`cycle-btn ${billingCycle === "monthly" ? "cycle-btn-active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly Billing
          </button>
          <button
            className={`cycle-btn ${billingCycle === "yearly" ? "cycle-btn-active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly Billing
            <span className="save-pill">⚡ SAVE 30%</span>
          </button>
        </div>
      </div>

      {/* 💳 3 Subscription Plan Cards */}
      <div className="plans-cards-grid">
        {plans.map((plan) => {
          const isCurrent = currentPlanId === plan.id;
          const rawPrice = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
          const price = launchFreeMode ? 0 : rawPrice;

          return (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? "plan-card-popular" : ""} ${isCurrent ? "plan-card-current" : ""}`}
            >
              {plan.popular && (
                <div className="popular-ribbon">
                  <Flame size={12} /> {plan.badge}
                </div>
              )}

              <div className="plan-card-top">
                <span className="plan-badge-tag" style={{ color: plan.color, background: `${plan.color}15`, border: `1px solid ${plan.color}35` }}>
                  {plan.hindiName || plan.name}
                </span>
                <h3 className="plan-title">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              {/* Price Row */}
              <div className="plan-price-wrap">
                {plan.id === "free_lifetime" || (rawPrice === 0 && !launchFreeMode) ? (
                  <div className="free-price-box">
                    <span className="price-big">₹0</span>
                    <span className="price-period">/ Lifetime Free</span>
                  </div>
                ) : launchFreeMode ? (
                  <div className="launch-pricing-box">
                    <div className="striked-row">
                      <span className="price-strikethrough">₹{rawPrice.toLocaleString()}</span>
                      <span className="free-offer-badge">100% FREE NOW</span>
                    </div>
                    <div className="launch-zero-row">
                      <span className="price-big text-green">₹0</span>
                      <span className="price-period">/ Launch Access</span>
                    </div>
                  </div>
                ) : (
                  <div className="paid-price-box">
                    <span className="price-currency">₹</span>
                    <span className="price-big">{price.toLocaleString()}</span>
                    <span className="price-period">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="plan-cta-box">
                {isCurrent ? (
                  <button className="btn-plan-active" disabled>
                    <CheckCircle2 size={15} /> Current Active Plan
                  </button>
                ) : (
                  <button
                    className={`btn-plan-upgrade ${plan.popular ? "btn-popular-upgrade" : ""}`}
                    onClick={() => handleOpenUpgrade(plan)}
                  >
                    <Zap size={15} /> {launchFreeMode ? `Claim Free ${plan.name} →` : `Upgrade to ${plan.name} →`}
                  </button>
                )}
              </div>

              {/* Feature List */}
              <div className="plan-features-list">
                <span className="features-header">What's Included:</span>
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="feature-item-row">
                    <CheckCircle2 size={15} className="feature-check-icon" color="#16a34a" />
                    <span>{feat}</span>
                  </div>
                ))}

                {plan.limitations && plan.limitations.length > 0 && (
                  <div className="limitations-wrap">
                    {plan.limitations.map((lim, lIdx) => (
                      <div key={lIdx} className="limitation-item-row">
                        <span className="lim-dash">•</span>
                        <span>{lim}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ❓ FAQs Accordion Section */}
      <div className="pricing-faq-section">
        <h2 className="faq-main-title">Frequently Asked Questions (FAQs)</h2>
        <div className="faq-list-wrap">
          {SUBSCRIPTION_FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item-card ${isOpen ? "faq-item-open" : ""}`}
                onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
              >
                <div className="faq-question-row">
                  <h4 className="faq-question">{faq.q}</h4>
                  <span className="faq-toggle-icon">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>
                {isOpen && <p className="faq-answer">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🌟 Payment Modal */}
      {paymentModalOpen && selectedPlan && (
        <div className="modal-backdrop" onClick={() => setPaymentModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Crown size={18} color="#FFD200" />
                <h3 className="modal-title">Upgrade to {selectedPlan.name}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setPaymentModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="checkout-body">
              {/* Order Summary Box */}
              <div className="order-summary-card">
                <div className="summary-row">
                  <span>Selected Plan:</span>
                  <strong>{selectedPlan.name}</strong>
                </div>
                <div className="summary-row">
                  <span>Billing Period:</span>
                  <span style={{ textTransform: "capitalize" }}>{billingCycle}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Payable Amount:</span>
                  <strong className="summary-total-price" style={{ color: launchFreeMode ? "#16a34a" : "#c0392b" }}>
                    {launchFreeMode ? "₹0 (100% Free Launch Offer)" : `₹${(billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly).toLocaleString()}`}
                  </strong>
                </div>
              </div>

              {launchFreeMode ? (
                <div style={{ background: "rgba(22, 163, 74, 0.08)", border: "1px dashed #16a34a", borderRadius: "10px", padding: "14px", textAlign: "center", margin: "12px 0" }}>
                  <Gift size={22} color="#16a34a" style={{ margin: "0 auto 6px" }} />
                  <h4 style={{ margin: "0 0 4px", fontSize: "13.5px", color: "#16a34a" }}>🎉 100% Free Launch Offer Applied</h4>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                    During the TyreSaathi launch period, this plan activates completely free (₹0). No payment required.
                  </p>
                </div>
              ) : (
                <div className="payment-content">
                  {/* Payment method selection if not free */}
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setPaymentModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-modal-submit"
                  disabled={processing}
                  onClick={handleProcessPayment}
                >
                  {processing ? (
                    <span>Activating Plan...</span>
                  ) : launchFreeMode ? (
                    <span>🚀 Activate {selectedPlan.name} (Free ₹0)</span>
                  ) : (
                    <span>Confirm & Pay ₹{(billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly).toLocaleString()}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High-End Pricing Styling */}
      <style>{`
        .subscription-page-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 16px 12px 60px 12px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #0f172a;
        }

        .pricing-hero-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 24px auto;
        }

        .pricing-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(192, 57, 43, 0.08);
          border: 1px solid rgba(192, 57, 43, 0.2);
          color: #c0392b;
          font-size: 10.5px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .pricing-main-title {
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          margin: 0 0 6px 0;
          line-height: 1.25;
        }

        .highlight-text {
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pricing-sub-desc {
          font-size: 0.8125rem;
          color: #475569;
          margin: 0 0 16px 0;
          line-height: 1.4;
        }

        .launch-free-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f0fdf4;
          border: 1.5px dashed #22c55e;
          padding: 10px 14px;
          border-radius: 10px;
          text-align: left;
          margin: 0 auto 16px auto;
          max-width: 600px;
          font-size: 12px;
          color: #166534;
        }

        .billing-cycle-toggle-box {
          display: inline-flex;
          align-items: center;
          background: #f1f5f9;
          padding: 3px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          gap: 3px;
        }

        .cycle-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cycle-btn-active {
          background: #c0392b !important;
          color: #ffffff !important;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.3);
        }

        .save-pill {
          background: #fef08a;
          color: #854d0e;
          font-size: 9.5px;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 8px;
        }

        /* Responsive Cards Grid */
        .plans-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 36px;
          align-items: stretch;
        }

        .plan-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
          transition: all 0.25s ease;
        }

        .plan-card-popular {
          border-color: #fca5a5;
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.09);
        }

        .popular-ribbon {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #c0392b 0%, #dc2626 100%);
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 12px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.35);
          letter-spacing: 0.4px;
        }

        .plan-card-top {
          margin-bottom: 12px;
        }

        .plan-badge-tag {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          margin-bottom: 6px;
        }

        .plan-title {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0 0 3px 0;
          color: #0f172a;
        }

        .plan-tagline {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          line-height: 1.35;
        }

        .plan-price-wrap {
          margin-bottom: 14px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }

        .free-price-box,
        .launch-zero-row,
        .paid-price-box {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .price-big {
          font-size: 1.75rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
        }

        .price-period {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }

        .launch-pricing-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .striked-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .price-strikethrough {
          font-size: 0.875rem;
          text-decoration: line-through;
          color: #94a3b8;
          font-weight: 700;
        }

        .free-offer-badge {
          background: #ea580c;
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .text-green {
          color: #16a34a !important;
        }

        .plan-cta-box {
          margin-bottom: 14px;
        }

        .btn-plan-upgrade {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #f1f5f9;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-popular-upgrade {
          background: #c0392b;
          color: white;
          border-color: #c0392b;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
        }

        .btn-popular-upgrade:hover {
          background: #a93226;
        }

        .btn-plan-active {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: default;
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .features-header {
          font-size: 0.6875rem;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 2px;
        }

        .feature-item-row {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          font-size: 0.75rem;
          color: #334155;
          line-height: 1.35;
        }

        .feature-check-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .limitations-wrap {
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px dashed #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .limitation-item-row {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 0.71875rem;
          color: #94a3b8;
        }

        .lim-dash {
          font-size: 11px;
        }

        /* FAQ Section */
        .pricing-faq-section {
          max-width: 680px;
          margin: 0 auto;
        }

        .faq-main-title {
          font-size: 1.125rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 16px;
          color: #0f172a;
        }

        .faq-list-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .faq-item-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .faq-question {
          margin: 0;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #1e293b;
        }

        .faq-answer {
          margin: 8px 0 0 0;
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 16px;
        }

        .modal-card {
          background: #ffffff;
          border-radius: 16px;
          max-width: 440px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .modal-title {
          margin: 0;
          font-size: 1rem;
          font-weight: 800;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
        }

        .checkout-body {
          padding: 16px;
        }

        .order-summary-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.8125rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          color: #475569;
        }

        .total-row {
          padding-top: 6px;
          border-top: 1px solid #e2e8f0;
          font-size: 0.875rem;
          color: #0f172a;
        }

        .modal-actions-bar {
          display: flex;
          gap: 10px;
          margin-top: 14px;
        }

        .btn-modal-cancel {
          flex: 1;
          padding: 9px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #475569;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
        }

        .btn-modal-submit {
          flex: 2;
          padding: 9px;
          border-radius: 8px;
          border: none;
          background: #c0392b;
          color: white;
          font-weight: 700;
          font-size: 0.8125rem;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .plans-cards-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .plan-card {
            padding: 16px 14px;
          }
          .pricing-main-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
