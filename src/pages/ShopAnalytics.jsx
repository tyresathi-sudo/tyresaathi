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

  // 2. Fetch real analytics data dynamically from Firestore & Bookings (Filtered strictly for this shop)
  async function loadAnalytics() {
    setLoading(true);
    try {
      const realData = await getRealAnalyticsData(timeframe, {
        id: profile?.uid || profile?.id,
        shopName: profile?.shopName || profile?.name,
        name: profile?.name,
      });
      setAnalyticsData(realData);
    } catch (err) {
      console.warn("Failed to load real analytics:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, [timeframe, profile]);

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

  const daysCount = timeframe === "7d" ? 7 : 30;
  const today = new Date();
  const dateLabels = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dateLabels.push(d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }));
  }

  const currentMetricData = analyticsData[selectedMetric] || analyticsData.views;
  const chartPoints = currentMetricData.points || [0, 0, 0, 0, 0, 0, 0];
  const maxVal = Math.max(...chartPoints, 1);
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const svgWidth = 600;
  const svgHeight = 180;
  const paddingX = 35;
  const paddingY = 22;

  const points = chartPoints.map((val, idx) => {
    const x = paddingX + (idx / Math.max(chartPoints.length - 1, 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - 18 - ((val - minVal) / range) * (svgHeight - paddingY * 2 - 20);
    return { x, y, val, idx, label: dateLabels[idx] || `Day ${idx + 1}` };
  });

  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x},${svgHeight - 20} L ${points[0].x},${svgHeight - 20} Z`
    : "";

  return (
    <div className="analytics-page-container">
      {/* 🏪 1. Hub Identity Bar */}
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

      {/* 📈 2. Business Insights & Clean White Chart */}
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

        {/* 🌟 4-in-1 Clean White KPI Cards */}
        <div className="kpi-cards-grid">
          {Object.entries(analyticsData).map(([key, data]) => {
            const isSelected = selectedMetric === key;
            return (
              <div
                key={key}
                className={`kpi-card ${isSelected ? "kpi-card-selected" : ""}`}
                style={{
                  borderColor: isSelected ? data.color : "#e2e8f0",
                  borderWidth: isSelected ? "2px" : "1.5px",
                  background: isSelected
                    ? `linear-gradient(145deg, #ffffff 0%, ${data.color}0a 100%)`
                    : "#ffffff",
                  boxShadow: isSelected
                    ? `0 6px 20px ${data.color}25, 0 0 0 1px ${data.color}30`
                    : "0 2px 10px rgba(0, 0, 0, 0.03)"
                }}
                onClick={() => setSelectedMetric(key)}
              >
                <div className="kpi-card-top">
                  <span className="kpi-label" style={{ color: isSelected ? "#0f172a" : "#64748b" }}>
                    {data.label}
                  </span>
                  <span
                    className="kpi-growth-badge"
                    style={{
                      color: "#16a34a",
                      background: "#f0fdf4",
                      border: "1px solid #bbf7d0"
                    }}
                  >
                    <TrendingUp size={12} /> {data.growth}
                  </span>
                </div>
                <div className="kpi-value-row">
                  <h3
                    className="kpi-value"
                    style={{
                      color: isSelected ? data.color : "#0f172a"
                    }}
                  >
                    {data.current}
                  </h3>
                  <span
                    className="kpi-tap-hint"
                    style={{
                      color: isSelected ? data.color : "#94a3b8",
                      fontWeight: isSelected ? "800" : "600"
                    }}
                  >
                    {isSelected ? "● Active View" : "Tap to inspect"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🎨 Clean White SVG Area Chart */}
        <div className="chart-wrapper-card">
          <div className="chart-meta-row">
            <div className="chart-active-legend">
              <span
                className="legend-dot"
                style={{
                  background: currentMetricData.color,
                  boxShadow: `0 0 8px ${currentMetricData.color}`
                }}
              ></span>
              <strong style={{ color: currentMetricData.color, fontSize: "14px", fontWeight: 800 }}>
                {currentMetricData.label}
              </strong>
              <span style={{ color: "#64748b", fontSize: "12px" }}>
                ({timeframe === "7d" ? "Past 7 Days Real Daily Activity" : "Monthly 30-Day Real Trend"})
              </span>
            </div>

            {hoveredPoint && (
              <div
                className="chart-hover-indicator"
                style={{
                  borderLeftColor: currentMetricData.color
                }}
              >
                <span>{hoveredPoint.label || `Day ${hoveredPoint.idx + 1}`}: </span>
                <strong style={{ color: currentMetricData.color, fontSize: "13.5px" }}>
                  {hoveredPoint.val}
                </strong>
              </div>
            )}
          </div>

          <div className="svg-responsive-box">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="analytics-svg"
            >
              <defs>
                <linearGradient id={currentMetricData.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={currentMetricData.color} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={currentMetricData.color} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={svgHeight / 2 - 5} x2={svgWidth - paddingX} y2={svgHeight / 2 - 5} stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" />
              <line x1={paddingX} y1={svgHeight - paddingY - 18} x2={svgWidth - paddingX} y2={svgHeight - paddingY - 18} stroke="rgba(148, 163, 184, 0.25)" />

              {/* Soft Gradient Area */}
              {areaD && <path d={areaD} fill={`url(#${currentMetricData.gradientId})`} />}

              {/* Thin Sleek Curve Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={currentMetricData.color}
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Points, Labels and Dates */}
              {points.map((p) => {
                const isHovered = hoveredPoint?.idx === p.idx;
                // In 7d mode, show all dates. In 30d mode, show evenly spaced milestone dates so they never overlap
                const shouldShowDate =
                  points.length <= 8 ||
                  p.idx % Math.ceil(points.length / 6) === 0 ||
                  p.idx === points.length - 1;

                // In 30d mode, only show values for non-zero points or when hovered to prevent 0s cluttering
                const shouldShowValue =
                  isHovered ||
                  points.length <= 8 ||
                  (p.val > 0 && (p.val >= maxVal * 0.25 || points.length <= 14));

                return (
                  <g key={p.idx} className="chart-point-group">
                    {/* Visual Point Dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? "5" : p.val > 0 ? "3.5" : "2.5"}
                      fill={isHovered ? currentMetricData.color : "#FFFFFF"}
                      stroke={currentMetricData.color}
                      strokeWidth={isHovered ? "2.5" : "1.75"}
                      style={{
                        transition: "all 0.15s ease",
                        cursor: "pointer"
                      }}
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />

                    {/* Value Badge above Point */}
                    {shouldShowValue && (
                      <text
                        x={p.x}
                        y={p.y - (isHovered ? 10 : 7)}
                        textAnchor="middle"
                        fill={isHovered ? currentMetricData.color : "#0f172a"}
                        fontSize={isHovered ? "11" : "9.5"}
                        fontWeight={isHovered ? "900" : "700"}
                      >
                        {p.val}
                      </text>
                    )}

                    {/* X-Axis Clean Spaced-out Date Label */}
                    {shouldShowDate && (
                      <>
                        <line
                          x1={p.x}
                          y1={svgHeight - paddingY - 14}
                          x2={p.x}
                          y2={svgHeight - paddingY - 9}
                          stroke="#cbd5e1"
                          strokeWidth="1"
                        />
                        <text
                          x={p.x}
                          y={svgHeight - 6}
                          textAnchor="middle"
                          fill="#64748b"
                          fontSize="9.5"
                          fontWeight="600"
                        >
                          {p.label}
                        </text>
                      </>
                    )}

                    {/* Generous Invisible Hover Target */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="14"
                      fill="transparent"
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </g>
                );
              })}
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
          color: var(--text, #0f172a);
        }

        .analytics-loading-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          gap: 12px;
          color: #64748b;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 1. Hub Bar (Clean Light Theme) */
        .hub-identity-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-left: 5px solid #c0392b;
          border-radius: 16px;
          padding: 18px 22px;
          margin-bottom: 22px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
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
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          box-shadow: 0 4px 12px rgba(255, 75, 43, 0.35);
        }

        .hub-live-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          background: #16a34a;
          border: 2.5px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(22, 163, 74, 0.6);
        }

        .hub-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hub-shop-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.4px;
        }

        .hub-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          font-size: 11px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .hub-owner-sub {
          font-size: 13px;
          color: #64748b;
          margin: 3px 0 0 0;
        }

        .hub-owner-sub strong { color: #0f172a; }
        .hub-owner-sub code {
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 2px 6px;
          border-radius: 4px;
          color: #c0392b;
          font-size: 11.5px;
          font-weight: 800;
        }

        .btn-refresh-analytics {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #1e293b;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-refresh-analytics:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
          transform: translateY(-1px);
        }

        /* 2. Insights Card (Clean White Theme) */
        .insights-analytics-container {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
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
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
        }

        .insights-title {
          font-size: 19px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .insights-sub {
          font-size: 12.5px;
          color: #64748b;
          margin: 3px 0 0 0;
        }

        .timeframe-toggle-wrap {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          gap: 4px;
        }

        .btn-timeframe {
          background: transparent;
          border: none;
          color: #64748b;
          padding: 6px 14px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-timeframe.active {
          background: #c0392b;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.35);
        }

        /* 🌟 Clean KPI Cards */
        .kpi-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .kpi-card {
          border-radius: 14px;
          padding: 16px 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .kpi-card:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1 !important;
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
          padding: 2px 7px;
          border-radius: 12px;
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

        /* 🎨 Clean White SVG Chart Card */
        .chart-wrapper-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
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
          gap: 8px;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .chart-hover-indicator {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-left: 3.5px solid;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          color: #0f172a;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .svg-responsive-box {
          width: 100%;
          height: 180px;
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
