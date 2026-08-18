import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loading from "../pages/Loading.jsx";

// Wrap any route that needs login: <Route element={<ProtectedRoute />}>...
// Pass allowRoles={["admin"]} to also restrict by role (Phase 4/7 will use this).
export default function ProtectedRoute({ children, allowRoles }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading label="Check kar rahe hain..." />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowRoles && !allowRoles.includes(role)) {
    return (
      <div className="auth-wrap">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <h1 className="brand-font auth-title" style={{ fontSize: 20 }}>Access Nahi Hai</h1>
          <p className="auth-sub">Ye page sirf {allowRoles.join(" / ")} role ke liye hai.</p>
        </div>
      </div>
    );
  }

  return children;
}
