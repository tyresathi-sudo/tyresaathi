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
      alert("Aapka 'Lifetime Free Plan' pehle se active hai! 🎉");
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
      alert(`🎉 Badhaai ho! Aapka "${selectedPlan.name}" plan successfully activate ho gaya hai!`);
    } catch (err) {
      console.warn("Subscription activation fallback:", err);
      setProcessing(false);
      setPaymentModalOpen(false);
      alert(`🎉 Aapka "${selectedPlan.name}" plan activate ho gaya hai!`);
    }
  };

  return (
    <div className="subscription-page-container">
      {/* 🌟 Top Hero Header */}
      <div className="pricing-hero-header">
        <div className="pricing-badge-pill">
          <Crown size={15} color="#FFD200" />
          <span>TYRESAATHI PARTNER MEMBERSHIP & REVENUE PLANS</span>
        </div>
        <h1 className="pricing-main-title">
          Apni Dukan Ko Banayein Shahar Ka <span className="highlight-text">#1 Tyre Hub</span>
        </h1>
        <p className="pricing-sub-desc">
          Chhote dukandaron ke liye <strong>100% Lifetime Free</strong>. Apne business ko grow karne aur hazaron naye grahak pane ke liye Pro & VIP plans chunein.
        </p>

        {/* Launch Free Mode Notification Banner */}
        {launchFreeMode && (
          <div className="launch-free-banner">
            <Gift size={20} color="#FFD200" />
            <div>
              <strong>🚀 Special Launch Offer Active:</strong>
              <span> {config.launchBannerNote || "Filhaal sabhi premium plans 100% FREE hain! Bina kisi shulk ke ₹0 me activate karein."}</span>
            </div>
          </div>
        )}

        {/* Monthly / Yearly Billing Toggle */}
        <div className="billing-cycle-toggle-box">
          <button
            className={`cycle-btn ${billingCycle === "monthly" ? "cycle-btn-active" : ""}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly Billing (महीनेवार)
          </button>
          <button
            className={`cycle-btn ${billingCycle === "yearly" ? "cycle-btn-active" : ""}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly Billing (सालाना)
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
                  <Flame size={13} /> {plan.badge}
                </div>
              )}

              <div className="plan-card-top">
                <span className="plan-badge-tag" style={{ color: plan.color, background: `${plan.color}15`, border: `1px solid ${plan.color}35` }}>
                  {plan.hindiName}
                </span>
                <h3 className="plan-title">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              {/* Price Row */}
              <div className="plan-price-wrap">
                {plan.id === "free_lifetime" || (rawPrice === 0 && !launchFreeMode) ? (
                  <div className="free-price-box">
                    <span className="price-big">₹0</span>
                    <span className="price-period">/ Lifetime Free (हमेशा फ्री)</span>
                  </div>
                ) : launchFreeMode ? (
                  <div className="launch-pricing-box">
                    <div className="striked-row">
                      <span className="price-strikethrough">₹{rawPrice.toLocaleString()}</span>
                      <span className="free-offer-badge">100% FREE NOW</span>
                    </div>
                    <div className="launch-zero-row">
                      <span className="price-big text-green">₹0</span>
                      <span className="price-period">/ Launch Period Access</span>
                    </div>
                  </div>
                ) : (
                  <div className="paid-price-box">
                    <span className="price-currency">₹</span>
                    <span className="price-big">{price.toLocaleString()}</span>
                    <span className="price-period">
                      /{billingCycle === "monthly" ? "month (प्रति माह)" : "year (प्रति वर्ष)"}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="plan-cta-box">
                {isCurrent ? (
                  <button className="btn-plan-active" disabled>
                    <CheckCircle2 size={16} /> Current Active Plan
                  </button>
                ) : (
                  <button
                    className={`btn-plan-upgrade ${plan.popular ? "btn-popular-upgrade" : ""}`}
                    onClick={() => handleOpenUpgrade(plan)}
                  >
                    <Zap size={16} /> {launchFreeMode ? `Claim Free ${plan.name} →` : `Upgrade to ${plan.name} →`}
                  </button>
                )}
              </div>

              {/* Feature List */}
              <div className="plan-features-list">
                <span className="features-header">Is Plan Mein Kya Milega:</span>
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="feature-item-row">
                    <CheckCircle2 size={16} className="feature-check-icon" color="#00E676" />
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
        <h2 className="faq-main-title">Aamtaur Par Pooche Jaane Wale Sawaal (FAQs)</h2>
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
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </div>
                {isOpen && <p className="faq-answer">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🌟 Simulated Payment & UPI QR Modal */}
      {paymentModalOpen && selectedPlan && (
        <div className="modal-backdrop" onClick={() => setPaymentModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Crown size={20} color="#FFD200" />
                <h3 className="modal-title">Upgrade to {selectedPlan.name}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setPaymentModalOpen(false)}>
                <X size={20} />
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
                  <strong className="summary-total-price" style={{ color: launchFreeMode ? "#00E676" : "#C0392B" }}>
                    {launchFreeMode ? "₹0 (100% Free Launch Offer)" : `₹${(billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly).toLocaleString()}`}
                  </strong>
                </div>
              </div>

              {launchFreeMode ? (
                <div style={{ background: "rgba(0, 230, 118, 0.08)", border: "1px dashed #00E676", borderRadius: "12px", padding: "16px", textAlign: "center", margin: "14px 0" }}>
                  <Gift size={24} color="#00E676" style={{ margin: "0 auto 8px" }} />
                  <h4 style={{ margin: "0 0 4px", fontSize: "14.5px", color: "#00E676" }}>🎉 100% Free Launch Offer Applied</h4>
                  <p style={{ margin: 0, fontSize: "12.5px", color: "var(--text-muted)" }}>
                    TyreSaathi launch period ke doran yeh plan bilkul muft (₹0) me activate hoga. Koi UPI ya Card payment nahi karni padegi.
                  </p>
                </div>
              ) : (
                <>
                  {/* Payment Methods */}
                  <div className="payment-method-tabs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === "upi" ? "method-tab-active" : ""}`}
                      onClick={() => setPaymentMethod("upi")}
                    >
                      <QrCode size={15} /> Instant UPI
                    </button>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === "bank" ? "method-tab-active" : ""}`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <Building2 size={15} /> Bank Transfer
                    </button>
                    <button
                      type="button"
                      className={`method-tab ${paymentMethod === "card" ? "method-tab-active" : ""}`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard size={15} /> Card / NetBanking
                    </button>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="upi-payment-box">
                      {bankConfig.upiId && bankConfig.upiId.trim() ? (
                        <>
                          <div className="upi-qr-placeholder">
                            <img
                              src={getUpiQrCodeUrl(bankConfig.upiId, bankConfig.payeeName, (billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceYearly))}
                              alt="Admin UPI QR Code"
                              className="qr-img"
                            />
                            <span className="qr-scan-hint">Scan with any UPI App (GPay / PhonePe / Paytm)</span>
                          </div>

                          <div className="upi-id-badge" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "340px", margin: "10px auto 0 auto" }}>
                            <div>
                              <small style={{ display: "block", fontSize: "10.5px", color: "var(--text-muted)" }}>Admin Official UPI ID:</small>
                              <strong style={{ fontSize: "13.5px", color: "#c0392b" }}>{bankConfig.upiId}</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyText(bankConfig.upiId, "upi")}
                              style={{ background: "#c0392b", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            >
                              {copiedKey === "upi" ? <Check size={13} /> : <Copy size={13} />}
                              {copiedKey === "upi" ? "Copied!" : "Copy"}
                            </button>
                          </div>

                          <div style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
                            {bankConfig.payeeName && <span>Payee: <strong>{bankConfig.payeeName}</strong></span>}
                            {bankConfig.phone && <span> • 📞 {bankConfig.phone}</span>}
                          </div>
                        </>
                      ) : (
                        <div style={{ padding: "24px 16px", textAlign: "center", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1.5px dashed var(--border)" }}>
                          <QrCode size={40} color="#94a3b8" style={{ margin: "0 auto 8px" }} />
                          <h4 style={{ margin: "0 0 4px", fontSize: "14px" }}>Admin UPI ID Setup Pending</h4>
                          <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>
                            Admin ne filhaal UPI ID darj nahi kiya hai. Aap Bank Transfer tab se payment kar sakte hain.
                          </p>
                        </div>
                      )}

                      {bankConfig.paymentNotes && (
                        <div style={{ background: "rgba(243, 156, 18, 0.1)", border: "1px dashed #f39c12", padding: "8px 12px", borderRadius: "8px", fontSize: "11.5px", color: "var(--text)", marginTop: "10px", textAlign: "left" }}>
                          ℹ️ {bankConfig.paymentNotes}
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div style={{ background: "var(--surface-2, #f8fafc)", border: "1.5px solid var(--border)", borderRadius: "12px", padding: "16px", margin: "12px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                        <Building2 size={18} color="#c0392b" />
                        <strong style={{ fontSize: "14px" }}>Admin Official Bank Details (IMPS / NEFT / RTGS)</strong>
                      </div>

                      {bankConfig.accountNumber && bankConfig.accountNumber.trim() ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                          {bankConfig.bankName && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ color: "var(--text-muted)" }}>Bank Name:</span>
                              <strong>{bankConfig.bankName}</strong>
                            </div>
                          )}

                          {bankConfig.accountHolderName && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ color: "var(--text-muted)" }}>Account Holder:</span>
                              <strong>{bankConfig.accountHolderName}</strong>
                            </div>
                          )}

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface)", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                            <div>
                              <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)" }}>Account Number:</span>
                              <strong style={{ fontSize: "15px", letterSpacing: "0.5px" }}>{bankConfig.accountNumber}</strong>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyText(bankConfig.accountNumber, "acc")}
                              style={{ background: "#c0392b", color: "#fff", border: "none", padding: "4px 9px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            >
                              {copiedKey === "acc" ? <Check size={12} /> : <Copy size={12} />}
                              {copiedKey === "acc" ? "Copied" : "Copy"}
                            </button>
                          </div>

                          {bankConfig.ifscCode && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface)", padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                              <div>
                                <span style={{ display: "block", fontSize: "11px", color: "var(--text-muted)" }}>IFSC Code:</span>
                                <strong style={{ fontSize: "14px", letterSpacing: "0.5px" }}>{bankConfig.ifscCode}</strong>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopyText(bankConfig.ifscCode, "ifsc")}
                                style={{ background: "#c0392b", color: "#fff", border: "none", padding: "4px 9px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                              >
                                {copiedKey === "ifsc" ? <Check size={12} /> : <Copy size={12} />}
                                {copiedKey === "ifsc" ? "Copied" : "Copy"}
                              </button>
                            </div>
                          )}

                          {bankConfig.branchName && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ color: "var(--text-muted)" }}>Branch / City:</span>
                              <span>{bankConfig.branchName}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ padding: "16px", textAlign: "center", color: "var(--text-muted)", fontSize: "12.5px" }}>
                          Admin ne filhaal direct bank account details add nahi kiya hai.
                        </div>
                      )}

                      {bankConfig.paymentNotes && (
                        <div style={{ background: "rgba(243, 156, 18, 0.1)", border: "1px dashed #f39c12", padding: "8px 12px", borderRadius: "8px", fontSize: "11.5px", color: "var(--text)", marginTop: "12px" }}>
                          ℹ️ {bankConfig.paymentNotes}
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="card-payment-form">
                      <div className="modal-field">
                        <label>Card Number</label>
                        <input type="text" placeholder="4532 •••• •••• 8901" defaultValue="4532 8901 2345 6789" />
                      </div>
                      <div className="modal-grid-2">
                        <div className="modal-field">
                          <label>Expiry (MM/YY)</label>
                          <input type="text" placeholder="12/28" defaultValue="12/28" />
                        </div>
                        <div className="modal-field">
                          <label>CVV</label>
                          <input type="password" placeholder="•••" defaultValue="890" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px 80px 16px;
          font-family: 'Inter', sans-serif;
          color: var(--text, #1c1c1e);
        }

        .pricing-hero-header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 36px auto;
        }

        .pricing-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(192, 57, 43, 0.12);
          border: 1px solid rgba(192, 57, 43, 0.3);
          color: #c0392b;
          font-size: 11px;
          font-weight: 800;
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.6px;
          margin-bottom: 12px;
        }

        .pricing-main-title {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -0.8px;
          margin: 0 0 10px 0;
          line-height: 1.25;
        }

        .highlight-text {
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pricing-sub-desc {
          font-size: 15px;
          color: var(--text-muted, #4A5057);
          margin: 0 0 24px 0;
          line-height: 1.5;
        }

        .launch-free-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, rgba(47, 158, 68, 0.15) 0%, rgba(243, 156, 18, 0.15) 100%);
          border: 1.5px dashed #27ae60;
          padding: 12px 18px;
          border-radius: 14px;
          text-align: left;
          margin: 0 auto 24px auto;
          max-width: 650px;
          font-size: 13.5px;
          color: var(--text, #1c1c1e);
          box-shadow: 0 4px 15px rgba(39, 174, 96, 0.1);
        }

        .launch-pricing-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .striked-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .price-strikethrough {
          font-size: 18px;
          text-decoration: line-through;
          color: var(--text-muted, #888);
          font-weight: 700;
        }

        .free-offer-badge {
          background: #FF6B35;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }

        .launch-zero-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .text-green {
          color: #27ae60 !important;
        }

        /* Toggle */
        .billing-cycle-toggle-box {
          display: inline-flex;
          align-items: center;
          background: var(--surface-2, #E3DFD4);
          padding: 5px;
          border-radius: 30px;
          border: 1px solid var(--border, #DCD6C9);
          gap: 4px;
        }

        .cycle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          padding: 9px 18px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted, #4A5057);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cycle-btn-active {
          background: #c0392b !important;
          color: #ffffff !important;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.4);
        }

        .save-pill {
          background: #FFD200;
          color: #1c1c1e;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 10px;
        }

        /* Cards Grid */
        .plans-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 22px;
          margin-bottom: 48px;
          align-items: stretch;
        }

        .plan-card {
          background: var(--surface, #FFFFFF);
          border: 1.5px solid var(--border, #DCD6C9);
          border-radius: 20px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
        }

        .plan-card-popular {
          border-color: #c0392b;
          box-shadow: 0 12px 35px rgba(192, 57, 43, 0.18);
        }

        .popular-ribbon {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #c0392b 0%, #d9381e 100%);
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 14px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.4);
          letter-spacing: 0.5px;
        }

        .plan-card-top {
          margin-bottom: 16px;
        }

        .plan-badge-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 12px;
          margin-bottom: 8px;
        }

        .plan-title {
          font-size: 22px;
          font-weight: 900;
          margin: 0 0 6px 0;
          letter-spacing: -0.4px;
        }

        .plan-tagline {
          font-size: 13px;
          color: var(--text-muted, #4A5057);
          margin: 0;
          min-height: 38px;
          line-height: 1.4;
        }

        .plan-price-wrap {
          margin-bottom: 20px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border, #DCD6C9);
        }

        .price-big {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .price-currency {
          font-size: 24px;
          font-weight: 800;
          vertical-align: top;
          margin-right: 2px;
        }

        .price-period {
          font-size: 13px;
          color: var(--text-muted, #4A5057);
          font-weight: 600;
        }

        .plan-cta-box {
          margin-bottom: 22px;
        }

        .btn-plan-active {
          width: 100%;
          background: rgba(47, 158, 68, 0.15);
          border: 1px solid rgba(47, 158, 68, 0.4);
          color: #2f9e44;
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: default;
        }

        .btn-plan-upgrade {
          width: 100%;
          background: var(--surface-2, #E3DFD4);
          border: 1px solid var(--border, #DCD6C9);
          color: var(--text, #1c1c1e);
          padding: 12px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-popular-upgrade {
          background: linear-gradient(135deg, #c0392b 0%, #d9381e 100%) !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: 0 4px 16px rgba(192, 57, 43, 0.4);
        }
        .btn-popular-upgrade:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.55);
        }

        .plan-features-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
          flex: 1;
        }

        .features-header {
          font-size: 12px;
          font-weight: 800;
          color: var(--text-muted, #4A5057);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 2px;
        }

        .feature-item-row {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.4;
        }

        .feature-check-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .limitations-wrap {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed var(--border, #DCD6C9);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .limitation-item-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted, #4A5057);
        }

        /* FAQ Section */
        .pricing-faq-section {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-main-title {
          font-size: 22px;
          font-weight: 900;
          text-align: center;
          margin-bottom: 22px;
        }

        .faq-list-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item-card {
          background: var(--surface, #FFFFFF);
          border: 1px solid var(--border, #DCD6C9);
          border-radius: 14px;
          padding: 16px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .faq-item-card:hover {
          border-color: #c0392b;
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .faq-question {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
        }

        .faq-answer {
          margin: 10px 0 0 0;
          font-size: 13.5px;
          color: var(--text-muted, #4A5057);
          line-height: 1.5;
        }

        /* Modal Styles */
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
          border-radius: 20px;
          max-width: 480px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
          color: #f2f1ed;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .modal-title {
          font-size: 18px;
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

        .order-summary-card {
          background: #121214;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #a8acb3;
        }

        .summary-row strong { color: #ffffff; }

        .total-row {
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .summary-total-price {
          font-size: 18px;
          color: #00E676 !important;
          font-weight: 900;
        }

        .payment-method-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }

        .method-tab {
          background: #121214;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a8acb3;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 11.5px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
        }

        .method-tab-active {
          border-color: #c0392b !important;
          background: rgba(192, 57, 43, 0.15) !important;
          color: #ffffff !important;
        }

        .upi-payment-box {
          text-align: center;
          padding: 14px;
          background: #121214;
          border-radius: 12px;
          margin-bottom: 18px;
        }

        .qr-img {
          width: 150px;
          height: 150px;
          border-radius: 10px;
          margin-bottom: 8px;
          border: 4px solid #ffffff;
        }

        .qr-scan-hint {
          display: block;
          font-size: 11px;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .upi-id-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.08);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
          color: #cbd5e1;
        }

        .card-payment-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 18px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-field label {
          font-size: 11px;
          font-weight: 700;
          color: #cbd5e1;
        }

        .modal-field input {
          background: #121214;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px 12px;
          color: #ffffff;
          font-size: 13px;
        }

        .modal-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .checkout-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.08);
          border: none;
          color: #cbd5e1;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .btn-confirm-payment {
          background: linear-gradient(135deg, #c0392b 0%, #d9381e 100%);
          border: none;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.4);
        }
      `}</style>
    </div>
  );
}
