import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Lock, Mail, Store, User, Sparkles, Eye, EyeOff, AlertTriangle, KeyRound, UserPlus } from "lucide-react";
import { logUserActivityToSheet } from "../utils/googleSheets";

export function friendlyError(code) {
  if (typeof code === "string" && (code.includes("offline") || code.includes("unavailable"))) {
    return "Network connection issue. Please check your internet.";
  }
  switch (code) {
    case "auth/invalid-email":
      return "Email format galat hai. Kripya sahi email dalein.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
      return "Incorrect Email ya Password! (ईमेल या पासवर्ड गलत है)";
    case "auth/wrong-password":
      return "Galat password! (Incorrect password)";
    case "auth/email-already-in-use":
      return "Ye email pehle se registered hai. Kripya login karein.";
    case "auth/weak-password":
      return "Password kam se kam 6 characters ka hona chahiye.";
    case "auth/too-many-requests":
      return "Bahut zyada attempts ho gaye hain. Thodi der baad try karein ya password reset karein.";
    default:
      return code ? `Error: ${code}` : "Login fail ho gaya. Kripya email aur password check karein.";
  }
}

export default function Login() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResetSuccess("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const userCred = await login(cleanEmail, password);
      // Log login event to Google Sheet in background
      logUserActivityToSheet({
        email: cleanEmail,
        name: userCred?.user?.displayName || cleanEmail.split("@")[0],
        action: "login",
      });
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
      setError("Pehle apna email ID dalein.");
      return;
    }
    setResetting(true);
    try {
      await resetPassword(cleanEmail);
      setResetSuccess(`Password reset link '${cleanEmail}' par bhej diya gaya hai! Apna Gmail inbox aur spam folder check karein.`);
      setError("");
    } catch (err) {
      setError("Reset link bhejne me dikkat aayi: " + (err.message || err.code));
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
              Firebase me ye email ya password match nahi hua. Aap niche diye gaye options use kar sakte hain:
            </p>

            <div className="error-action-btns">
              <button
                type="button"
                className="btn-quick-reset"
                disabled={resetting}
                onClick={handleQuickReset}
              >
                <KeyRound size={13} /> {resetting ? "Bhej rahe hain..." : "📩 Password Reset Link Bhejein"}
              </button>

              <Link
                to={`/register?email=${encodeURIComponent(email)}`}
                className="btn-quick-register"
              >
                <UserPlus size={13} /> 🏪 Naya Shop Owner Account Banayein
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
            <label>Email Address (ईमेल आईडी)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. tyresathi@gmail.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password (पासवर्ड)</label>
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
            {loading ? "कृपया प्रतीक्षा करें..." : "Login (लॉग इन करें)"}
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
