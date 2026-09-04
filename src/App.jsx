import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Bookings from "./pages/Bookings.jsx";
import StoreLocation from "./pages/StoreLocation.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import TrademarkDisclaimer from "./pages/TrademarkDisclaimer.jsx";
import Billing from "./pages/Billing.jsx";
import Settings from "./pages/Settings.jsx";
import SupportTickets from "./pages/SupportTickets.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import ShopAnalytics from "./pages/ShopAnalytics.jsx";
import Subscription from "./pages/Subscription.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
        <Route path="/shop/add-product" element={<AddProduct />} />
        <Route path="/shop/edit-product/:id" element={<AddProduct />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
