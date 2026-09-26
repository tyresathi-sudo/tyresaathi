import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, ROLES } from "../context/AuthContext.jsx";
import { friendlyError } from "./Login.jsx";
import { logUserActivityToSheet } from "../utils/googleSheets";
import { MapPin, Navigation, CheckCircle2, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const { user, register, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [role, setRole] = useState(ROLES.SHOP_OWNER);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState("");

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate]);

  // GPS Auto-detect location handler
  async function handleAutoDetectLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your device/browser.");
      return;
    }

    setError("");
    setDetectingLocation(true);
    setLocationSuccess("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setLat(latitude);
        setLng(longitude);

        try {
          // Reverse geocode to get city and area address
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (res.ok) {
            const data = await res.json();
            const detectedCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              data.address?.state_district ||
              "";
            const detectedAddress = data.display_name || "";

            if (detectedCity && !city) {
              setCity(detectedCity);
            }
            if (detectedAddress && !address) {
              setAddress(detectedAddress);
            }
            setLocationSuccess(`Location detected: ${detectedCity || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}`);
          } else {
            setLocationSuccess(`GPS coordinates captured (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          }
        } catch (err) {
          console.warn("Reverse geocode notice:", err);
          setLocationSuccess(`GPS coordinates captured (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        } finally {
          setDetectingLocation(false);
        }
      },
      (err) => {
        console.warn("GPS detection error:", err);
        setDetectingLocation(false);
        setError("Could not retrieve GPS location. Please enter your City & Address manually.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (role === ROLES.SHOP_OWNER && !shopName.trim()) {
      setError("Please enter your Shop or Center Name.");
      return;
    }

    if (!city.trim()) {
      setError("Please enter your City / Town name.");
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      await register({
        name: name.trim(),
        phone: phone.trim(),
        email: cleanEmail,
        password,
        role,
        shopName: shopName.trim(),
        city: city.trim(),
        address: address.trim(),
        lat: lat || null,
        lng: lng || null,
      });

      // Log new registration to Google Sheet
      try {
        logUserActivityToSheet({
          email: cleanEmail,
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          address: address.trim(),
          role: role === ROLES.SHOP_OWNER ? `Shop Owner (${shopName.trim()})` : "Customer",
          action: "register",
        });
      } catch (sheetErr) {
        console.warn("Sheet logging notice:", sheetErr);
      }

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
      <div className="auth-card" style={{ maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          <img
            src="/logo.png"
            alt="TyreSaathi Logo"
            style={{ height: "46px", objectFit: "contain", borderRadius: "6px" }}
            onError={(e) => { e.target.src = "/tyresaathi-logo.png"; }}
          />
        </div>

        <h1 className="brand-font auth-title" style={{ textAlign: "center" }}>Create an Account</h1>
        <p className="auth-sub" style={{ textAlign: "center" }}>Join TyreSaathi as a Shop Owner or Customer</p>

        {error && (
          <div className="auth-error-banner">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="role-pick">
          <button
            type="button"
            className={"role-btn" + (role === ROLES.SHOP_OWNER ? " role-btn-active" : "")}
            onClick={() => setRole(ROLES.SHOP_OWNER)}
          >
            🏪 Shop Owner / Dealer
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
            <label>Full Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. John Doe"
              autoComplete="name"
            />
          </div>

          <div className="auth-field">
            <label>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="10 digit mobile number"
              autoComplete="tel"
            />
          </div>

          {role === ROLES.SHOP_OWNER && (
            <div className="auth-field">
              <label>Shop / Service Center Name *</label>
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="e.g. Metro Tyre & Service Hub"
                required
              />
            </div>
          )}

          {/* Location & City Fields */}
          <div className="auth-field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
              <label style={{ margin: 0 }}>City / Town *</label>
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={detectingLocation}
                className="btn-gps-detect"
              >
                <Navigation size={12} className={detectingLocation ? "spin" : ""} />
                {detectingLocation ? "Detecting..." : "Auto-detect Location"}
              </button>
            </div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="e.g. Raipur / Delhi / Mumbai / Bilaspur"
            />
          </div>

          {locationSuccess && (
            <div className="location-success-badge">
              <CheckCircle2 size={14} color="#166534" />
              <span>{locationSuccess}</span>
            </div>
          )}

          <div className="auth-field">
            <label>{role === ROLES.SHOP_OWNER ? "Shop Address / Area *" : "Address / Area (Optional)"}</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required={role === ROLES.SHOP_OWNER}
              placeholder={role === ROLES.SHOP_OWNER ? "e.g. Shop 4, Main Road, Near Bus Stand" : "e.g. Street, Colony, Landmark"}
            />
          </div>

          <div className="auth-field">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. your@gmail.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password (min 6 characters) *</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
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
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="auth-btn" disabled={loading} type="submit" style={{ marginTop: "10px" }}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-links" style={{ justifyContent: "center", marginTop: "16px" }}>
          <Link to="/login">Already have an account? Log In</Link>
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
        .btn-gps-detect {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          color: #0369a1;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-gps-detect:hover {
          background: #bae6fd;
        }
        .btn-gps-detect:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .location-success-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11.5px;
          margin-top: -8px;
          margin-bottom: 12px;
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
