import React, { useState, useEffect } from "react";
import { Download, Sparkles, X } from "lucide-react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { scheduleLocalNotification, triggerHaptic } from "../utils/nativeBridge";

// Current hardcoded app package build version
export const CURRENT_APP_VERSION = "1.1.0";
export const CURRENT_BUILD_NUMBER = 2;

export default function AppUpdateChecker() {
  const [updateInfo, setUpdateInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Listen for live version control updates from Firestore
    try {
      const unsub = onSnapshot(doc(db, "app_settings", "version_control"), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const remoteVersion = data.latestVersion || "1.1.0";
          const isNewer = compareVersions(remoteVersion, CURRENT_APP_VERSION) > 0;

          if (isNewer && !dismissed) {
            setUpdateInfo(data);
            setModalOpen(true);

            // Trigger native local notification alert on Android phone
            scheduleLocalNotification(
              "🚀 TyreSaathi Naya Version Uplabdh Hai!",
              `Version ${remoteVersion} live hai. Naye features aur fast speed ke liye abhi update karein.`
            );
            triggerHaptic("medium");
          }
        }
      }, (err) => {
        console.warn("Version control notice:", err);
      });

      return () => unsub();
    } catch (e) {
      console.warn("Version check error:", e);
    }
  }, [dismissed]);

  function compareVersions(v1, v2) {
    const p1 = v1.split(".").map(Number);
    const p2 = v2.split(".").map(Number);
    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
      const n1 = p1[i] || 0;
      const n2 = p2[i] || 0;
      if (n1 > n2) return 1;
      if (n1 < n2) return -1;
    }
    return 0;
  }

  const handleDownload = () => {
    triggerHaptic("success");
    const targetUrl = updateInfo?.downloadUrl || "https://tyresaathi.en.uptodown.com/android";
    window.open(targetUrl, "_blank");
  };

  const handleClose = () => {
    setDismissed(true);
    setModalOpen(false);
  };

  if (!modalOpen || !updateInfo) return null;

  return (
    <div className="update-modal-backdrop" onClick={updateInfo.forceUpdate ? undefined : handleClose}>
      <div className="update-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Icon */}
        <div className="update-header-strip">
          <div className="update-icon-glow">
            <Sparkles size={24} color="#ffffff" />
          </div>
          {!updateInfo.forceUpdate && (
            <button className="btn-close-update" onClick={handleClose} aria-label="Close">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="update-body">
          <span className="update-badge">⚡ NEW UPDATE AVAILABLE</span>
          <h3 className="update-title">TyreSaathi Ka Naya Version Aaya Hai!</h3>
          <p className="update-version-row">
            Current: <code>v{CURRENT_APP_VERSION}</code> → <strong>New: v{updateInfo.latestVersion}</strong>
          </p>

          <p className="update-desc">
            {updateInfo.releaseMessage || "Behtar speed, real-time analytics aur naye tyre features ke sath naya update taiyar hai. Kripya naya version download karein."}
          </p>

          {updateInfo.highlights && Array.isArray(updateInfo.highlights) && updateInfo.highlights.length > 0 && (
            <div className="update-highlights-box">
              <strong>✨ Naye Badlav (What's New):</strong>
              <ul>
                {updateInfo.highlights.map((h, i) => (
                  <li key={i}>✓ {h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="update-actions">
          <button type="button" className="btn-update-now" onClick={handleDownload}>
            <Download size={16} /> 🚀 Update Now (नया APK डाउनलोड करें)
          </button>
          {!updateInfo.forceUpdate && (
            <button type="button" className="btn-update-later" onClick={handleClose}>
              Baad Me Karein (Later)
            </button>
          )}
        </div>
      </div>

      <style>{`
        .update-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          padding: 16px;
          animation: fadeIn 0.25s ease;
        }

        .update-modal-card {
          background: linear-gradient(145deg, #181920 0%, #222530 100%);
          border: 1.5px solid rgba(255, 75, 43, 0.4);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 75, 43, 0.2);
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          padding: 24px;
          color: #ffffff;
          position: relative;
        }

        .update-header-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .update-icon-glow {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(255, 75, 43, 0.5);
        }

        .btn-close-update {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #94a3b8;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-close-update:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        .update-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 900;
          color: #FF8C00;
          letter-spacing: 0.8px;
          margin-bottom: 6px;
        }

        .update-title {
          font-size: 20px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 8px 0;
          letter-spacing: -0.3px;
        }

        .update-version-row {
          font-size: 13px;
          color: #cbd5e1;
          margin: 0 0 12px 0;
        }

        .update-version-row code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          color: #94a3b8;
        }

        .update-version-row strong {
          color: #00E676;
        }

        .update-desc {
          font-size: 13px;
          line-height: 1.5;
          color: #94a3b8;
          margin: 0 0 14px 0;
        }

        .update-highlights-box {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 14px;
          margin-bottom: 20px;
          font-size: 12px;
        }

        .update-highlights-box strong {
          color: #ffc145;
          display: block;
          margin-bottom: 6px;
        }

        .update-highlights-box ul {
          margin: 0;
          padding-left: 18px;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .update-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btn-update-now {
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          border: none;
          color: #ffffff;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(255, 75, 43, 0.4);
          transition: all 0.2s;
        }
        .btn-update-now:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(255, 75, 43, 0.6);
        }

        .btn-update-later {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          padding: 6px;
          cursor: pointer;
          text-align: center;
        }
        .btn-update-later:hover {
          color: #ffffff;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
