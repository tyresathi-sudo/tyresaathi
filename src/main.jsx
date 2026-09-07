import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles/global.css";

// Automatically purge any cached legacy demo ads from browser storage
try {
  const cachedAds = localStorage.getItem("tyresaathi_shop_ads");
  if (cachedAds) {
    const list = JSON.parse(cachedAds);
    const cleaned = list.filter(
      (a) => a.id !== "ad-01" && a.id !== "ad-02" && a.id !== "ad-03" && !a.shopName?.toLowerCase().includes("alignment") && !a.shopName?.toLowerCase().includes("star tyre")
    );
    if (cleaned.length === 0) {
      localStorage.removeItem("tyresaathi_shop_ads");
    } else {
      localStorage.setItem("tyresaathi_shop_ads", JSON.stringify(cleaned));
    }
  }
} catch {
  // Ignore
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
