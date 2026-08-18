import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, ROLES } from "../context/AuthContext.jsx";
import { friendlyError } from "./Login.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [role, setRole] = useState(ROLES.SHOP_OWNER);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (role === ROLES.SHOP_OWNER && !shopName.trim()) {
      setError("Dukan ka naam daalna zaroori hai.");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        shopName: shopName.trim(),
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.warn("Registration Error:", err);
      setError(friendlyError(err.code || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <img
            src="/logo.png"
            alt="TyreSaathi Logo"
            style={{ height: "46px", objectFit: "contain", borderRadius: "6px" }}
            onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
          />
        </div>

        <h1 className="brand-font auth-title" style={{ textAlign: "center" }}>Account Banayein</h1>
        <p className="auth-sub" style={{ textAlign: "center" }}>Customer ho ya Shop Owner, dono jud sakte hain</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="role-pick">
          <button
            type="button"
            className={"role-btn" + (role === ROLES.SHOP_OWNER ? " role-btn-active" : "")}
            onClick={() => setRole(ROLES.SHOP_OWNER)}
          >
            🏪 Shop Owner (दुकानदार)
          </button>
          <button
            type="button"
            className={"role-btn" + (role === ROLES.CUSTOMER ? " role-btn-active" : "")}
            onClick={() => setRole(ROLES.CUSTOMER)}
          >
            👤 Customer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Aapka Naam (Full Name) *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Ramesh Kumar" />
          </div>

          <div className="auth-field">
            <label>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="98765 43210"
            />
          </div>

          {role === ROLES.SHOP_OWNER && (
            <div className="auth-field">
              <label>Dukan ka Naam (Shop / Center Name) *</label>
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Jaise: Cherry Tyre Park / Raja Tyre Center"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="aapka@email.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password (Kam se kam 6 akshar) *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <button className="auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register Account"}
          </button>
        </form>

        <div className="auth-links" style={{ justifyContent: "center", marginTop: "16px" }}>
          <Link to="/login">Pehle se account hai? Login karein</Link>
        </div>
      </div>
    </div>
  );
}
