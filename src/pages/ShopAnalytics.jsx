import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  TrendingUp,
  Activity,
  Flame,
  Navigation,
  Phone,
  Wrench,
  Eye,
  AlertCircle,
  Package,
  Calendar,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { getRealAnalyticsData } from "../utils/analyticsTracker";

export default function ShopAnalytics() {
  const { profile } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [timeframe, setTimeframe] = useState("7d");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveLocation, setLiveLocation] = useState(() => {
    return profile?.address || profile?.city || "New Delhi, India";
  });

  // 1. Fetch real device GPS location
  useEffect(() => {
    if (profile?.address || profile?.city) {
      setLiveLocation(profile?.address || profile?.city);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await res.json();
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.state_district ||
              data.address?.state ||
              "India";
            setLiveLocation(`${city}, ${data.address?.state || ""}`.replace(/^,\s*|,\s*$/g, ""));
          } catch (e) {
            setLiveLocation(profile?.city || "New Delhi, India");
          }
        },
        () => {
          setLiveLocation(profile?.city || "New Delhi, India");
        },
        { timeout: 5000 }
      );
    } else {
      setLiveLocation(profile?.city || "New Delhi, India");
    }
  }, [profile]);

  // 2. Fetch real analytics data dynamically from Firestore & Bookings
  async function loadAnalytics() {
    setLoading(true);
    try {
      const realData = await getRealAnalyticsData(timeframe);
      setAnalyticsData(realData);
    } catch (err) {
      console.warn("Failed to load real analytics:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  const shopDisplayName = profile?.shopName || profile?.name || "Tyre Saathi Partner Hub";
  const ownerDisplayName = profile?.name || "Partner Owner";
  const partnerId = profile?.uid ? `#TS-${profile.uid.slice(0, 6).toUpperCase()}` : "#TS-PARTNER";

  if (!analyticsData) {
    return (
      <div className="analytics-loading-box">
        <RefreshCw size={24} className="spin-icon" />
        <p>Loading real-time shop analytics...</p>
      </div>
    );
  }

  const currentMetricData = analyticsData[selectedMetric] || analyticsData.views;
  const chartPoints = currentMetricData.points || [0, 0, 0, 0, 0, 0, 0];
  const maxVal = Math.max(...chartPoints, 1);
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const svgWidth = 600;
  const svgHeight = 190;
  const paddingX = 35;
  const paddingY = 25;

  const points = chartPoints.map((val, idx) => {
    const x = paddingX + (idx / Math.max(chartPoints.length - 1, 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((val - minVal) / range) * (svgHeight - paddingY * 2);
    return { x, y, val, idx };
  });

  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x},${svgHeight - 10} L ${points[0].x},${svgHeight - 10} Z`
    : "";

  return (
    <div className="analytics-page-container">
      {/* 🏪 1. Luminous Hub Identity Bar */}
      <div className="hub-identity-bar">
        <div className="hub-left-info">
          <div className="hub-avatar-wrap">
            <span className="hub-avatar-icon">🏪</span>
            <span className="hub-live-dot" title="Live on TyreSaathi Network"></span>
          </div>
          <div>
            <div className="hub-title-row">
              <h1 className="hub-shop-title">{shopDisplayName}</h1>
              <span className="hub-live-badge">
                <span className="hub-pulse-ring"></span>
                🟢 LIVE ON TYRESAATHI HUB
              </span>
            </div>
            <p className="hub-owner-sub">
              Owner: <strong>{ownerDisplayName}</strong> • Partner ID: <code>{partnerId}</code> • 📍 {liveLocation}
            </p>
          </div>
        </div>

        <button
          className="btn-refresh-analytics"
          onClick={loadAnalytics}
          title="Refresh Real-time Data"
        >
          <RefreshCw size={14} className={loading ? "spin-icon" : ""} /> Live Sync
        </button>
      </div>

      {/* 📈 2. Vibrant Business Insights & Neon Glowing Graph */}
      <div className="insights-analytics-container">
        <div className="insights-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="sparkle-icon-box">
                <Sparkles size={20} color="#FFFFFF" />
              </div>
              <div>
                <h2 className="insights-title">Business Insights & Views Analytics</h2>
                <p className="insights-sub">
                  Aapki shop profile, search views aur live customer inquiries ka 100% original real-time data
                </p>
              </div>
            </div>
          </div>

          <div className="timeframe-toggle-wrap">
            <button
              className={`btn-timeframe ${timeframe === "7d" ? "active" : ""}`}
              onClick={() => setTimeframe("7d")}
            >
              Last 7 Days (Daily)
            </button>
            <button
              className={`btn-timeframe ${timeframe === "30d" ? "active" : ""}`}
              onClick={() => setTimeframe("30d")}
            >
              30 Days Trends
            </button>
          </div>
        </div>

        {/* 🌟 4-in-1 Radiant KPI Cards */}
        <div className="kpi-cards-grid">
          {Object.entries(analyticsData).map(([key, data]) => {
            const isSelected = selectedMetric === key;
            return (
              <div
                key={key}
                className={`kpi-card ${isSelected ? "kpi-card-selected" : ""}`}
                style={{
                  borderColor: isSelected ? data.color : "rgba(255, 255, 255, 0.12)",
                  boxShadow: isSelected
                    ? `0 10px 30px ${data.glowColor}, inset 0 0 15px ${data.color}20`
                    : "0 4px 16px rgba(0, 0, 0, 0.3)",
                  background: isSelected
                    ? `linear-gradient(145deg, #222530 0%, ${data.color}25 100%)`
                    : "linear-gradient(145deg, #1b1c23 0%, #15161b 100%)"
                }}
                onClick={() => setSelectedMetric(key)}
              >
                <div className="kpi-card-top">
                  <span className="kpi-label" style={{ color: isSelected ? "#FFFFFF" : "#a8acb3" }}>
                    {data.label}
                  </span>
                  <span
                    className="kpi-growth-badge"
                    style={{
                      color: "#00E676",
                      background: "rgba(0, 230, 118, 0.18)",
                      border: "1px solid rgba(0, 230, 118, 0.35)"
                    }}
                  >
                    <TrendingUp size={12} /> {data.growth}
                  </span>
                </div>
                <div className="kpi-value-row">
                  <h3
                    className="kpi-value"
                    style={{
                      color: isSelected ? data.color : "#FFFFFF",
                      textShadow: isSelected ? `0 0 18px ${data.color}80` : "none"
                    }}
                  >
                    {data.current}
                  </h3>
                  <span
                    className="kpi-tap-hint"
                    style={{
                      color: isSelected ? data.color : "#64748b",
                      fontWeight: isSelected ? "700" : "500"
                    }}
                  >
                    {isSelected ? "● Active View" : "Tap to inspect"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🎨 Luminous Glowing SVG Area Chart */}
        <div className="chart-wrapper-card">
          <div className="chart-meta-row">
            <div className="chart-active-legend">
              <span
                className="legend-dot"
                style={{
                  background: currentMetricData.color,
                  boxShadow: `0 0 10px ${currentMetricData.color}`
                }}
              ></span>
              <strong style={{ color: currentMetricData.color, fontSize: "14px" }}>
                {currentMetricData.label}
              </strong>
              <span style={{ color: "#cbd5e1", fontSize: "12px" }}>
                ({timeframe === "7d" ? "Past 7 Days Real Daily Activity" : "Monthly 30-Day Real Trend"})
              </span>
            </div>

            {hoveredPoint && (
              <div
                className="chart-hover-indicator"
                style={{
                  borderLeftColor: currentMetricData.color,
                  boxShadow: `0 4px 15px ${currentMetricData.glowColor}`
                }}
              >
                <span>Day {hoveredPoint.idx + 1}: </span>
                <strong style={{ color: currentMetricData.color, fontSize: "14px" }}>
                  {hoveredPoint.val}
                </strong>
              </div>
            )}
          </div>

          <div className="svg-responsive-box">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="analytics-svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={currentMetricData.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={currentMetricData.color} stopOpacity="0.7" />
                  <stop offset="50%" stopColor={currentMetricData.secondaryColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={currentMetricData.color} stopOpacity="0.0" />
                </linearGradient>

                <linearGradient id="neonLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={currentMetricData.secondaryColor} />
                  <stop offset="100%" stopColor={currentMetricData.color} />
                </linearGradient>

                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
              <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
              <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="rgba(255,255,255,0.15)" />

              {areaD && <path d={areaD} fill={`url(#${currentMetricData.gradientId})`} />}

              {pathD && (
                <>
                  <path
                    d={pathD}
                    fill="none"
                    stroke={currentMetricData.color}
                    strokeWidth="7"
                    strokeOpacity="0.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#neonLineGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neon-glow)"
                  />
                </>
              )}

              {points.map((p) => (
                <g key={p.idx} className="chart-point-group">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint?.idx === p.idx ? "7" : "5"}
                    fill="#FFFFFF"
                    stroke={currentMetricData.color}
                    strokeWidth={hoveredPoint?.idx === p.idx ? "4" : "3"}
                    style={{
                      filter: `drop-shadow(0 0 8px ${currentMetricData.color})`,
                      transition: "all 0.2s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="18"
                    fill="transparent"
                    onMouseEnter={() => setHoveredPoint(p)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: "pointer" }}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 16px 80px 16px;
          font-family: 'Inter', sans-serif;
          color: #f3f4f6;
        }

        .analytics-loading-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          gap: 12px;
          color: #94a3b8;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 1. Hub Bar */
        .hub-identity-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #181920 0%, #20222c 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-left: 6px solid #FF3B30;
          border-radius: 18px;
          padding: 18px 24px;
          margin-bottom: 22px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 59, 48, 0.15);
          flex-wrap: wrap;
          gap: 14px;
        }

        .hub-left-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hub-avatar-wrap {
          position: relative;
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 6px 18px rgba(255, 75, 43, 0.5);
        }

        .hub-live-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 15px;
          height: 15px;
          background: #00E676;
          border: 2.5px solid #181920;
          border-radius: 50%;
          box-shadow: 0 0 10px #00E676;
        }

        .hub-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hub-shop-title {
          font-size: 22px;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .hub-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 230, 118, 0.18);
          border: 1px solid rgba(0, 230, 118, 0.5);
          color: #00E676;
          font-size: 11px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          box-shadow: 0 0 12px rgba(0, 230, 118, 0.25);
        }

        .hub-owner-sub {
          font-size: 13px;
          color: #cbd5e1;
          margin: 4px 0 0 0;
        }

        .hub-owner-sub strong { color: #ffffff; }
        .hub-owner-sub code {
          background: rgba(255, 59, 48, 0.2);
          border: 1px solid rgba(255, 59, 48, 0.4);
          padding: 2px 7px;
          border-radius: 5px;
          color: #FF8C00;
          font-size: 12px;
          font-weight: 800;
        }

        .btn-refresh-analytics {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-refresh-analytics:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
        }

        /* 2. Insights Card */
        .insights-analytics-container {
          background: radial-gradient(circle at 10% 10%, rgba(255, 75, 43, 0.08) 0%, transparent 45%),
                      linear-gradient(145deg, #181920 0%, #20222c 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
        }

        .insights-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .sparkle-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(255, 75, 43, 0.5);
        }

        .insights-title {
          font-size: 20px;
          font-weight: 900;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.4px;
        }

        .insights-sub {
          font-size: 13px;
          color: #94a3b8;
          margin: 3px 0 0 0;
        }

        .timeframe-toggle-wrap {
          display: flex;
          background: rgba(15, 16, 20, 0.85);
          padding: 5px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          gap: 5px;
        }

        .btn-timeframe {
          background: transparent;
          border: none;
          color: #94a3b8;
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-timeframe.active {
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(255, 75, 43, 0.5);
        }

        /* 🌟 Radiant KPI Cards */
        .kpi-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .kpi-card {
          border-radius: 16px;
          padding: 16px 18px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
          position: relative;
        }
        .kpi-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        .kpi-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .kpi-label {
          font-size: 13px;
          font-weight: 700;
        }

        .kpi-growth-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 14px;
        }

        .kpi-value-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .kpi-value {
          font-size: 26px;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .kpi-tap-hint {
          font-size: 11px;
        }

        /* 🎨 SVG Chart Card */
        .chart-wrapper-card {
          background: #111217;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px 22px;
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .chart-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .chart-active-legend {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .legend-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }

        .chart-hover-indicator {
          background: rgba(30, 32, 40, 0.95);
          border-left: 3.5px solid;
          padding: 5px 12px;
          border-radius: 8px;
          font-size: 12px;
        }

        .svg-responsive-box {
          width: 100%;
          height: 190px;
        }

        .analytics-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
      `}</style>
    </div>
  );
}
