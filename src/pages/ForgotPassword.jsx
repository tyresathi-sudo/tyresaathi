import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { friendlyError } from "./Login.jsx";
import { Mail, KeyRound, CheckCircle2, AlertTriangle, MessageCircle, ExternalLink, ArrowLeft, RefreshCw, Eye, EyeOff } from "lucide-react";

export default function ForgotPassword() {
  const { user, resetPassword, confirmReset, verifyResetCode, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if opened with reset action code from email
  const oobCode = searchParams.get("oobCode") || "";
  const mode = searchParams.get("mode") || "";
  const isResetAction = Boolean(oobCode && (mode === "resetPassword" || !mode));

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // Handle countdown for resend button
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // 1. Send Password Reset Email
  async function handleSendReset(e) {
    if (e) e.preventDefault();
    setError("");
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(cleanEmail);
      setSent(true);
      setResendCooldown(45); // 45 seconds cooldown before next attempt
    } catch (err) {
      console.warn("Reset Password Request Error:", err);
      setError(friendlyError(err.code || err.message));
    } finally {
      setLoading(false);
    }
  }

  // 2. Set New Password using Action Code (In-App Reset)
  async function handleSetNewPassword(e) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.");
      return;
    }

    setLoading(true);
    try {
      await confirmReset(oobCode, newPassword);
      setResetCompleted(true);
    } catch (err) {
      console.warn("Confirm Reset Error:", err);
      setError(friendlyError(err.code || err.message));
    } finally {
      setLoading(false);
    }
  }

  const supportWhatsappUrl = "https://wa.me/918877277757?text=" + encodeURIComponent("Hello TyreSaathi Support, I need help resetting my password.");

  return (
    <div className="auth-wrap">
      <div className="auth-card" style={{ maxWidth: "440px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <img
            src="/logo.png"
            alt="TyreSaathi Logo"
            style={{ height: "48px", objectFit: "contain", borderRadius: "6px" }}
            onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
          />
        </div>

        {/* CASE A: IN-APP DIRECT PASSWORD RESET (When reset code is present in URL) */}
        {isResetAction && !resetCompleted && (
          <div>
            <h1 className="brand-font auth-title" style={{ textAlign: "center" }}>Create New Password</h1>
            <p className="auth-sub" style={{ textAlign: "center" }}>Enter your new secure password below</p>

            {error && (
              <div className="auth-error-banner">
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSetNewPassword}>
              <div className="auth-field">
                <label>New Password (min 6 characters)</label>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    style={{ paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      padding: "4px"
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label>Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                />
              </div>

              <button className="auth-btn" disabled={loading} type="submit">
                {loading ? "Updating Password..." : "Save & Update Password"}
              </button>
            </form>
          </div>
        )}

        {/* CASE B: PASSWORD UPDATE SUCCESSFUL */}
        {resetCompleted && (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <CheckCircle2 size={54} color="#27ae60" style={{ margin: "0 auto 12px" }} />
            <h2 className="brand-font auth-title" style={{ color: "#27ae60", fontSize: "20px" }}>Password Updated!</h2>
            <p className="auth-sub" style={{ marginBottom: "20px" }}>
              Your password has been successfully reset. You can now log in with your new credentials.
            </p>
            <Link to="/login" className="auth-btn" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>
              Go to Login Page
            </Link>
          </div>
        )}

        {/* CASE C: REQUEST RESET LINK (Default View) */}
        {!isResetAction && (
          <div>
            <h1 className="brand-font auth-title" style={{ textAlign: "center" }}>Forgot Password?</h1>
            <p className="auth-sub" style={{ textAlign: "center" }}>
              {sent ? "Check your email for the reset instructions" : "Enter your registered email address to receive a reset link"}
            </p>

            {error && (
              <div className="auth-error-banner">
                <AlertTriangle size={16} />
                <span>{error}</span>
              </div>
            )}

            {sent ? (
              <div className="reset-sent-box">
                <div className="sent-badge">
                  <CheckCircle2 size={24} color="#27ae60" />
                  <div>
                    <strong>Reset link has been dispatched!</strong>
                    <p style={{ margin: "3px 0 0", fontSize: "12px", color: "#444" }}>
                      We sent a reset link to: <br />
                      <strong style={{ color: "var(--primary-color, #e67e22)" }}>{email.trim().toLowerCase()}</strong>
                    </p>
                  </div>
                </div>

                {/* Important Spam Folder Warning */}
                <div className="spam-warning-card">
                  <span className="warning-icon">⚠️</span>
                  <div>
                    <strong>Important (Spam Folder Check):</strong>
                    <p style={{ margin: "3px 0 0", fontSize: "12px", lineHeight: "1.4" }}>
                      If you do not see the email in your Primary Inbox within 1-2 minutes, please check your <strong>Spam / Junk</strong> folder or <strong>Promotions</strong> tab.
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-open-email"
                  >
                    <Mail size={16} /> Open Gmail / Email App <ExternalLink size={14} />
                  </a>

                  <button
                    type="button"
                    onClick={handleSendReset}
                    disabled={loading || resendCooldown > 0}
                    className="btn-resend-link"
                  >
                    <RefreshCw size={14} className={loading ? "spin" : ""} />
                    {resendCooldown > 0 ? `Resend link in ${resendCooldown}s` : "Resend Reset Link"}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendReset}>
                <div className="auth-field">
                  <label>Registered Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. your@gmail.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <button className="auth-btn" disabled={loading} type="submit">
                  {loading ? "Sending Reset Link..." : "Send Reset Link"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* WhatsApp Instant Support Assistance Box */}
        <div className="instant-support-card">
          <div className="support-header">
            <MessageCircle size={18} color="#25D366" />
            <span>Need Instant Help?</span>
          </div>
          <p className="support-desc">
            Having trouble with email or password? Get instant assistance from our customer support team.
          </p>
          <a
            href={supportWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-help"
          >
            <MessageCircle size={15} /> Chat on WhatsApp Support
          </a>
        </div>

        {/* Back to Login Link */}
        <div className="auth-links" style={{ justifyContent: "center", marginTop: "16px" }}>
          <Link to="/login" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ArrowLeft size={15} /> Back to Login
          </Link>
        </div>
      </div>

      <style>{`
        .auth-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fdedec;
          border: 1px solid #e74c3c;
          color: #c0392b;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 14px;
        }
        .reset-sent-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
        }
        .sent-badge {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
        }
        .spam-warning-card {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #fff8e1;
          border: 1px solid #ffe082;
          color: #795548;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 12px;
        }
        .warning-icon {
          font-size: 16px;
          line-height: 1;
        }
        .btn-open-email {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #1a73e8;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .btn-open-email:hover {
          background: #1557b0;
        }
        .btn-resend-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: white;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-resend-link:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .instant-support-card {
          margin-top: 18px;
          padding: 12px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
        }
        .support-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 13px;
          color: #166534;
          margin-bottom: 4px;
        }
        .support-desc {
          font-size: 11.5px;
          color: #374151;
          margin: 0 0 8px;
          line-height: 1.35;
        }
        .btn-whatsapp-help {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #25D366;
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .btn-whatsapp-help:hover {
          background: #1da851;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
