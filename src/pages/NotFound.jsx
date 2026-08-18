import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="status-page">
      <AlertTriangle size={48} color="var(--orange)" />
      <h1 className="brand-font">404</h1>
      <p>Ye page nahi mila.</p>
      <Link to="/" className="status-btn">Home par jaayein</Link>

      <style>{`
        .status-page {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }
        .status-page h1 { font-size: 42px; margin: 6px 0 0; }
        .status-page p { color: var(--text-muted); margin: 0 0 10px; }
        .status-btn {
          background: var(--orange);
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 20px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
