import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Store,
  ChevronLeft,
  Crown
} from "lucide-react";
import { friendlyError } from "./Login.jsx";

export default function AdminLogin() {
  const { user, login, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Login Mode: "credentials" | "pin"
  const [mode, setMode] = useState("credentials");

  // Form State
  const [email, setEmail] = useState("tyresathi@gmail.com");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // If already logged in as Admin, redirect immediately
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, navigate]);

  // Handle Admin Credentials Login
  const handleAdminCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      await login(cleanEmail, password);
      setSuccessMsg("Admin Authentication Successful! Redirecting to Dashboard...");
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 800);
    } catch (err) {
      console.warn("Admin Login Notice:", err);
      // Fallback for Master Admin
      if (cleanEmail === "tyresathi@gmail.com" && (password === "Admin@123" || password === "tyresathi123" || password === "admin123")) {
        try {
          localStorage.setItem("tyresaathi_admin_master_session", "active");
        } catch (e) {}
        setSuccessMsg("Master Admin Session Granted! Redirecting...");
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 800);
      } else {
        setError(friendlyError(err.code || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Master PIN Login
  const handlePinLogin = (e) => {
    e.preventDefault();
    setError("");
    
    // Master Admin PINs
    if (pin === "887727" || pin === "123456" || pin === "77757" || pin === "999999") {
      setLoading(true);
      try {
        localStorage.setItem("tyresaathi_admin_master_session", "active");
      } catch (e) {}
      setSuccessMsg("Master PIN Verified! Entering Admin Portal...");
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 600);
    } else {
      setError("Galat Admin Master PIN! Kripya sahi 6-digit passcode darj karein.");
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* Background Ambience */}
      <div className="admin-ambient-glow" />

      <div className="admin-login-card">
        {/* Top Header Badge */}
        <div className="admin-top-badge">
          <Crown size={15} color="#eab308" />
          <span>Super Admin Control Portal</span>
        </div>

        {/* Brand Header */}
        <div className="admin-brand-header">
          <div className="admin-shield-icon-wrap">
            <ShieldCheck size={36} color="#ffffff" />
          </div>
          <h1 className="admin-portal-title">TyreSaathi Admin</h1>
          <p className="admin-portal-sub">
            Secure administrative dashboard for managing shops, bookings, invoices & platform analytics.
          </p>
        </div>

        {/* Tab Switcher: Credentials vs Quick PIN */}
        <div className="admin-mode-tabs">
          <button
            type="button"
            className={`admin-mode-tab ${mode === "credentials" ? "tab-active" : ""}`}
            onClick={() => { setMode("credentials"); setError(""); }}
          >
            <Mail size={15} />
            <span>Admin Email & Pass</span>
          </button>
          <button
            type="button"
            className={`admin-mode-tab ${mode === "pin" ? "tab-active" : ""}`}
            onClick={() => { setMode("pin"); setError(""); }}
          >
            <KeyRound size={15} />
            <span>Master PIN</span>
          </button>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="admin-alert-banner alert-error">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="admin-alert-banner alert-success">
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode 1: Email & Password Form */}
        {mode === "credentials" ? (
          <form onSubmit={handleAdminCredentialsLogin} className="admin-form">
            <div className="admin-input-group">
              <label>Admin Email</label>
              <div className="input-icon-box">
                <Mail size={17} className="field-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tyresathi@gmail.com"
                  required
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label>Admin Password</label>
              <div className="input-icon-box">
                <Lock size={17} className="field-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  className="btn-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-admin-submit"
              disabled={loading}
            >
              {loading ? (
                <span>Authenticating Admin...</span>
              ) : (
                <>
                  <span>Login to Admin Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Mode 2: Quick Master PIN Form */
          <form onSubmit={handlePinLogin} className="admin-form">
            <div className="admin-input-group">
              <label>6-Digit Master Security PIN</label>
              <div className="input-icon-box">
                <KeyRound size={17} className="field-icon" />
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="• • • • • •"
                  style={{ letterSpacing: "8px", fontSize: "18px", fontWeight: "800" }}
                  required
                  autoFocus
                />
              </div>
              <small style={{ color: "#94a3b8", fontSize: "11px", marginTop: "4px", display: "block" }}>
                Enter your authorized 6-digit Master PIN for instant bypass.
              </small>
            </div>

            <button
              type="submit"
              className="btn-admin-submit"
              disabled={loading || pin.length < 4}
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="admin-login-footer">
          <Link to="/login" className="btn-back-user-login">
            <ChevronLeft size={15} />
            <span>Regular User / Shop Login</span>
          </Link>
          <Link to="/" className="btn-back-home">
            <span>Home Page</span>
          </Link>
        </div>
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%);
          padding: 24px 16px;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .admin-ambient-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192, 57, 43, 0.25) 0%, rgba(30, 58, 138, 0.15) 70%, transparent 100%);
          filter: blur(80px);
          pointer-events: none;
        }
        .admin-login-card {
          width: 100%;
          max-width: 440px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 32px 28px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 2;
        }
        .admin-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(234, 179, 8, 0.12);
          border: 1px solid rgba(234, 179, 8, 0.35);
          color: #fde047;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 18px;
          letter-spacing: 0.3px;
        }
        .admin-brand-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .admin-shield-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: linear-gradient(135deg, #c0392b 0%, #991b1b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
          box-shadow: 0 10px 25px -5px rgba(192, 57, 43, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .admin-portal-title {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 6px;
          letter-spacing: 0.4px;
        }
        .admin-portal-sub {
          color: #94a3b8;
          font-size: 0.8125rem;
          line-height: 1.45;
          margin: 0;
        }
        .admin-mode-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.35);
          padding: 4px;
          border-radius: 12px;
          gap: 4px;
          margin-bottom: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .admin-mode-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 9px 12px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .admin-mode-tab.tab-active {
          background: #c0392b;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.4);
        }
        .admin-alert-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 12.5px;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .alert-error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }
        .alert-success {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.35);
          color: #86efac;
        }
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .admin-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .admin-input-group label {
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 700;
        }
        .input-icon-box {
          position: relative;
          display: flex;
          align-items: center;
        }
        .field-icon {
          position: absolute;
          left: 12px;
          color: #64748b;
          pointer-events: none;
        }
        .input-icon-box input {
          width: 100%;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 11px 40px 11px 38px;
          border-radius: 10px;
          font-size: 13.5px;
          outline: none;
          transition: all 0.2s ease;
        }
        .input-icon-box input:focus {
          border-color: #c0392b;
          background: rgba(15, 23, 42, 0.9);
          box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.2);
        }
        .btn-password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
        }
        .btn-password-toggle:hover {
          color: #cbd5e1;
        }
        .btn-admin-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: linear-gradient(135deg, #c0392b 0%, #991b1b 100%);
          color: white;
          padding: 12px 18px;
          border-radius: 11px;
          border: none;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 6px;
          box-shadow: 0 6px 20px rgba(192, 57, 43, 0.45);
          transition: all 0.2s ease;
        }
        .btn-admin-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(192, 57, 43, 0.55);
        }
        .btn-admin-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .admin-login-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
        }
        .btn-back-user-login {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .btn-back-user-login:hover {
          color: #f8fafc;
        }
        .btn-back-home {
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .btn-back-home:hover {
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
