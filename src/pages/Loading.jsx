import React from "react";

// Reusable loading state. Use full-screen for route-level loads,
// or drop <Loading inline /> inside a section while data fetches.
export default function Loading({ inline = false, label = "Load ho raha hai..." }) {
  return (
    <div className={inline ? "loading-inline" : "loading-full"}>
      <span className="spinner" />
      <p>{label}</p>

      <style>{`
        .loading-full {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: var(--text-muted);
        }
        .loading-inline {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 30px 0;
          color: var(--text-muted);
        }
        .spinner {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 3px solid var(--surface-2);
          border-top-color: var(--orange);
          animation: spin 0.7s linear infinite;
        }
        .loading-inline .spinner { width: 24px; height: 24px; border-width: 2.5px; }
        p { font-size: 13.5px; font-weight: 600; margin: 0; }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
