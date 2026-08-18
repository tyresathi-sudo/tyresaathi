import React from "react";
import { OctagonAlert, RefreshCw } from "lucide-react";

export default function ErrorPage({ message, onRetry }) {
  return (
    <div className="status-page">
      <OctagonAlert size={48} color="var(--danger)" />
      <h1 className="brand-font" style={{ fontSize: 26 }}>Kuch Gadbad Ho Gayi</h1>
      <p>{message || "Ek unexpected error aa gaya. Please dobara try karein."}</p>
      <button className="status-btn" onClick={onRetry || (() => window.location.reload())}>
        <RefreshCw size={15} style={{ verticalAlign: "middle", marginRight: 6 }} />
        Dobara Try Karein
      </button>

      <style>{`
        .status-page {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
          padding: 20px;
        }
        .status-page p { color: var(--text-muted); margin: 0 0 10px; max-width: 320px; }
        .status-btn {
          background: var(--orange);
          color: white;
          border: none;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
