import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import NetworkStatusBanner from "./components/NetworkStatusBanner.jsx";
import AppUpdateChecker from "./components/AppUpdateChecker.jsx";
import { initNativeFeatures, registerHardwareBackButton } from "./utils/nativeBridge.js";

// Lazy-loaded routes for instant initial page loading & smaller memory footprint
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Bookings = lazy(() => import("./pages/Bookings.jsx"));
const StoreLocation = lazy(() => import("./pages/StoreLocation.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const AddProduct = lazy(() => import("./pages/AddProduct.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const TrademarkDisclaimer = lazy(() => import("./pages/TrademarkDisclaimer.jsx"));
const Billing = lazy(() => import("./pages/Billing.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const SupportTickets = lazy(() => import("./pages/SupportTickets.jsx"));
const AdminPanel = lazy(() => import("./pages/AdminPanel.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const ShopAnalytics = lazy(() => import("./pages/ShopAnalytics.jsx"));
const Subscription = lazy(() => import("./pages/Subscription.jsx"));
const ManageProducts = lazy(() => import("./pages/ManageProducts.jsx"));

// Lightweight fallback loader
function PageLoader() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      flexDirection: "column",
      gap: "12px",
      color: "var(--text-muted)",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        border: "3px solid var(--border)",
        borderTop: "3px solid var(--orange, #c0392b)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Loading TyreSaathi...</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    // 1. Initialize native splash, status bar, and local notification channels
    initNativeFeatures();

    // 2. Register Android hardware back button handler
    const unregisterBack = registerHardwareBackButton(navigate, locationRef);
    return () => unregisterBack();
  }, [navigate]);

  return (
    <>
      <NetworkStatusBanner />
      <AppUpdateChecker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<TrademarkDisclaimer />} />
          <Route path="/ip-policy" element={<TrademarkDisclaimer />} />
          <Route path="/trademark-disclaimer" element={<TrademarkDisclaimer />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/pricing" element={<Subscription />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/analytics" element={<ShopAnalytics />} />
            <Route path="/insights" element={<ShopAnalytics />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/pricing" element={<Subscription />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<SupportTickets />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/store-location" element={<StoreLocation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop/products" element={<ManageProducts />} />
            <Route path="/shop/inventory" element={<ManageProducts />} />
            <Route path="/shop/add-product" element={<AddProduct />} />
            <Route path="/shop/edit-product/:id" element={<AddProduct />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

