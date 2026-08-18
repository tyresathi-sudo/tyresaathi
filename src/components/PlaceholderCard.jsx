import React from "react";
import { Construction } from "lucide-react";

export default function PlaceholderCard({ title, note }) {
  return (
    <div className="placeholder-card">
      <Construction size={26} color="var(--orange)" />
      <div>
        <div className="placeholder-title">{title}</div>
        <div className="placeholder-note">{note}</div>
      </div>

      <style>{`
        .placeholder-card {
          background: var(--surface);
          border: 2px dashed var(--border);
          border-radius: 14px;
          padding: 18px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .placeholder-title { font-weight: 700; font-size: 15px; margin-bottom: 4px; }
        .placeholder-note { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
      `}</style>
    </div>
  );
}
