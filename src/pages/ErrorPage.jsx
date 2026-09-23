import React from "react";
import { AlertCircle, RefreshCw, Home, ShieldAlert } from "lucide-react";

export default function ErrorPage({ message, onRetry }) {
  return (
    <div className="error-fallback-wrapper">
      <div className="error-fallback-card">
        <div className="error-icon-circle">
          <ShieldAlert size={38} color="#c0392b" />
        </div>

        <h1 className="error-card-title">Something Went Wrong</h1>
        <p className="error-card-subtitle">
          An unexpected error occurred while loading this section.
        </p>

        {message && (
          <div className="error-technical-box">
            <code>{message}</code>
          </div>
        )}

        <div className="error-action-row">
          <button 
            className="btn-retry-action" 
            onClick={onRetry || (() => window.location.reload())}
          >
            <RefreshCw size={15} />
            <span>Reload & Try Again</span>
          </button>

          <a href="/" className="btn-home-action">
            <Home size={15} />
            <span>Back to Home</span>
          </a>
        </div>
      </div>

      <style>{`
        .error-fallback-wrapper {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: var(--bg, #f8fafc);
        }

        .error-fallback-card {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 18px;
          padding: 36px 28px;
          max-width: 480px;
          width: 100%;
          text-align: center;
          box-shadow: 0 12px 35px rgba(0,0,0,0.06);
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .error-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
        }

        .error-card-title {
          font-size: 22px;
          font-weight: 800;
          color: var(--text, #0f172a);
          margin: 0 0 6px;
          letter-spacing: -0.4px;
        }

        .error-card-subtitle {
          font-size: 13.5px;
          color: var(--text-muted, #64748b);
          margin: 0 0 16px;
          line-height: 1.5;
        }

        .error-technical-box {
          background: var(--bg, #f1f5f9);
          border: 1px solid var(--border, #cbd5e1);
          border-radius: 8px;
          padding: 10px 14px;
          margin: 0 0 20px;
          text-align: left;
          overflow-x: auto;
        }

        .error-technical-box code {
          font-family: monospace;
          font-size: 12px;
          color: #c0392b;
          word-break: break-all;
        }

        .error-action-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-retry-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #c0392b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.35);
        }
        .btn-retry-action:hover {
          background: #a93226;
          transform: translateY(-1px);
        }

        .btn-home-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--surface, #fff);
          color: var(--text, #334155);
          border: 1.5px solid var(--border, #cbd5e1);
          padding: 9px 18px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-home-action:hover {
          background: var(--bg, #f8fafc);
          border-color: #94a3b8;
        }
      `}</style>
    </div>
  );
}
