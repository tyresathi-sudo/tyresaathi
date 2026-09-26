import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Lock, Mail, Store, User, Sparkles, Eye, EyeOff, AlertTriangle, KeyRound, UserPlus } from "lucide-react";
import { logUserActivityToSheet } from "../utils/googleSheets";

export function friendlyError(code) {
  if (typeof code === "string" && (code.includes("offline") || code.includes("unavailable"))) {
    return "Network connection issue. Please check your internet connection.";
  }
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email address format. Please enter a valid email.";
    case "auth/user-not-found":
      return "No account found with this email address.";
    case "auth/invalid-credential":
      return "Incorrect email or password. Please verify and try again.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again or reset your password.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please log in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters long.";
    case "auth/too-many-requests":
      return "Too many unsuccessful attempts. Please wait a few moments or reset your password.";
    case "auth/unauthorized-domain":
      return "Domain is not authorized in Firebase Auth. Please contact support.";
    case "auth/expired-action-code":
      return "This password reset link has expired. Please request a new one.";
    case "auth/invalid-action-code":
      return "Invalid or already used password reset link.";
    default:
      return code ? `Error: ${code}` : "Authentication failed. Please check your email and password.";
  }
}

export default function Login() {
  const { user, login, resetPassword, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  // Auto-redirect if session is active
  useEffect(() => {
    if (user && !authLoading) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, authLoading, navigate, location]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResetSuccess("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const userCred = await login(cleanEmail, password);
      // Log login event in background without blocking navigation
      try {
        logUserActivityToSheet({
          email: cleanEmail,
          name: userCred?.user?.displayName || cleanEmail.split("@")[0],
          action: "login",
        });
      } catch (sheetErr) {
        console.warn("Non-blocking sheet logging notice:", sheetErr);
      }
      navigate("/", { replace: true });
    } catch (err) {
      console.warn("Firebase Login Error:", err);
      setError(friendlyError(err.code || err.message));
    } finally {
      setLoading(false);
    }
  }

  // Quick Password Reset from error box
  async function handleQuickReset() {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setError("Please enter your email address first.");
      return;
    }
    setResetting(true);
    try {
      await resetPassword(cleanEmail);
      setResetSuccess(`Password reset link sent to '${cleanEmail}'! Please check your Inbox and Spam/Junk folder.`);
      setError("");
    } catch (err) {
      setError("Could not send password reset link: " + (err.message || err.code));
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        {/* Logo in Login */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <img
            src="/logo.png"
            alt="TyreSaathi Logo"
            style={{ height: "50px", objectFit: "contain", borderRadius: "6px" }}
            onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
          />
        </div>

        <h1 className="brand-font auth-title" style={{ textAlign: "center" }}>Login to TyreSaathi</h1>
        <p className="auth-sub" style={{ textAlign: "center" }}>Shop Owner & Customer Portal</p>

        {/* Error Notification with Direct Actions */}
        {error && (
          <div className="auth-error-box">
            <div className="error-title-row">
              <AlertTriangle size={18} color="#c0392b" />
              <strong>{error}</strong>
            </div>
            <p className="error-desc-text">
              Unable to authenticate with this email and password. You can choose an action below:
            </p>

            <div className="error-action-btns">
              <button
                type="button"
                className="btn-quick-reset"
                disabled={resetting}
                onClick={handleQuickReset}
              >
                <KeyRound size={13} /> {resetting ? "Sending link..." : "📩 Send Password Reset Link"}
              </button>

              <Link
                to={`/register?email=${encodeURIComponent(email)}`}
                className="btn-quick-register"
              >
                <UserPlus size={13} /> 🏪 Create a New Account
              </Link>
            </div>
          </div>
        )}

        {/* Success Message for Reset */}
        {resetSuccess && (
          <div className="auth-success" style={{ marginBottom: "16px", fontSize: "13px", lineHeight: 1.4 }}>
            ✅ {resetSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. your@gmail.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
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
                  display: "flex",
                  alignItems: "center",
                  padding: "4px"
                }}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="auth-btn" disabled={loading} type="submit">
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className="auth-links" style={{ marginTop: "16px", display: "flex", justifyContent: "space-between" }}>
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Create a new account</Link>
        </div>
      </div>

      <style>{`
        .auth-error-box {
          background: #fdedec;
          border: 1.5px solid #e74c3c;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 16px;
          color: #2c3e50;
        }
        .error-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #c0392b;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .error-desc-text {
          font-size: 12px;
          color: #555;
          margin: 0 0 10px;
          line-height: 1.3;
        }
        .error-action-btns {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .btn-quick-reset {
          background: white;
          border: 1px solid #c0392b;
          color: #c0392b;
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .btn-quick-reset:hover {
          background: #fdedec;
        }
        .btn-quick-register {
          background: #c0392b;
          color: white;
          text-decoration: none;
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-align: center;
        }
        .btn-quick-register:hover {
          background: #a93226;
        }
      `}</style>
    </div>
  );
}
