import React, { useState, useEffect } from "react";
import { subscribeNetworkStatus, getNetworkStatus, triggerHaptic } from "../utils/nativeBridge.js";
import { WifiOff, Wifi } from "lucide-react";

export default function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showRestored, setShowRestored] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initial check
    getNetworkStatus().then((status) => {
      setIsOnline(status.connected);
      setInitialized(true);
    });

    // Subscribe to status changes
    const unsubscribe = subscribeNetworkStatus((status) => {
      if (!status.connected) {
        setIsOnline(false);
        setShowRestored(false);
        triggerHaptic("warning");
      } else {
        if (!isOnline && initialized) {
          setShowRestored(true);
          triggerHaptic("success");
          setTimeout(() => setShowRestored(false), 3500);
        }
        setIsOnline(true);
      }
    });

    return () => unsubscribe();
  }, [isOnline, initialized]);

  if (isOnline && !showRestored) return null;

  return (
    <div
      className={`network-status-banner ${
        !isOnline ? "banner-offline" : "banner-restored"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="banner-content">
        {!isOnline ? (
          <>
            <WifiOff size={16} className="banner-icon pulse" />
            <span className="banner-text">
              <strong>Offline Mode:</strong> No internet connection. Viewing local/cached data.
            </span>
          </>
        ) : (
          <>
            <Wifi size={16} className="banner-icon" />
            <span className="banner-text">
              <strong>Back Online!</strong> All features & live sync active.
            </span>
          </>
        )}
      </div>

      <style>{`
        .network-status-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          animation: slideDownBanner 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
        }
        .banner-offline {
          background: rgba(220, 38, 38, 0.95);
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .banner-restored {
          background: rgba(16, 185, 129, 0.95);
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .banner-content {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 900px;
          text-align: center;
        }
        .banner-icon {
          flex-shrink: 0;
        }
        .pulse {
          animation: iconPulse 1.5s infinite;
        }
        @keyframes slideDownBanner {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes iconPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
