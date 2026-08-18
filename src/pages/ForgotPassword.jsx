import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { friendlyError } from "./Login.jsx";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="brand-font auth-title">Password Reset</h1>
        <p className="auth-sub">Apna email daalein, reset link bhej denge</p>

        {error && <div className="auth-error">{error}</div>}
        {sent && (
          <div className="auth-success">
            Reset link bhej diya gaya hai. Apna email inbox (aur spam folder) check karein.
          </div>
        )}

        {!sent && (
          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aapka@email.com"
                required
                autoComplete="email"
              />
            </div>
            <button className="auth-btn" disabled={loading}>
              {loading ? "Ruko..." : "Reset Link Bhejein"}
            </button>
          </form>
        )}

        <div className="auth-links" style={{ justifyContent: "center" }}>
          <Link to="/login">Login page par wapas jaayein</Link>
        </div>
      </div>
    </div>
  );
}
