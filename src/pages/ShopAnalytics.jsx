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
import { getLiveUserLocation } from "../utils/geoService";

export default function ShopAnalytics() {
  const { profile } = useAuth();
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [timeframe, setTimeframe] = useState("7d");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveLocation, setLiveLocation] = useState(() => {
    return profile?.address || profile?.city || "Raipur, Chhattisgarh";
  });

  // 1. Fetch real device GPS location
  useEffect(() => {
    if (profile?.address || profile?.city) {
      setLiveLocation(profile?.address || profile?.city);
      return;
    }

    async function loadLocation() {
      try {
        const loc = await getLiveUserLocation();
        if (loc && (loc.city || loc.region)) {
          setLiveLocation(`${loc.city || ""}${loc.city && loc.region ? ", " : ""}${loc.region || "India"}`);
        }
      } catch (e) {
        setLiveLocation(profile?.city || "Raipur, Chhattisgarh");
      }
    }
    loadLocation();
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
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dateLabels.push(`${d.getDate()} ${monthNames[d.getMonth()]}`);
  }

  const currentMetricData = analyticsData[selectedMetric] || analyticsData.views;
  const chartPoints = currentMetricData.points || [0, 0, 0, 0, 0, 0, 0];
  const maxVal = Math.max(...chartPoints, 1);
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const svgWidth = 750;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;
  const bottomAxisY = svgHeight - 40;

  const points = chartPoints.map((val, idx) => {
    const x = paddingX + (idx / Math.max(chartPoints.length - 1, 1)) * (svgWidth - paddingX * 2);
    const y = bottomAxisY - ((val - minVal) / range) * (bottomAxisY - paddingY - 15);
    return { x, y, val, idx, label: dateLabels[idx] || `Day ${idx + 1}` };
  });

  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x},${bottomAxisY} L ${points[0].x},${bottomAxisY} Z`
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
          <div className="insights-header-left">
            <div className="sparkle-icon-box">
              <Sparkles size={20} color="#FFFFFF" />
            </div>
            <div>
              <h2 className="insights-title">Business Insights & Views Analytics</h2>
              <p className="insights-sub">
                100% genuine real-time analytics for your shop profile views, customer inquiries, and bookings.
              </p>
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
            const themeColor = data.color || "#c0392b";
            return (
              <div
                key={key}
                className={`kpi-card ${isSelected ? "kpi-card-selected" : ""}`}
                style={{
                  borderColor: isSelected ? themeColor : "#e2e8f0",
                  borderWidth: isSelected ? "1.5px" : "1px",
                  background: isSelected
                    ? `linear-gradient(145deg, #ffffff 0%, ${themeColor}08 100%)`
                    : "#ffffff",
                  boxShadow: isSelected
                    ? `0 4px 16px ${themeColor}20, 0 0 0 1px ${themeColor}25`
                    : "0 1px 4px rgba(0, 0, 0, 0.02)"
                }}
                onClick={() => setSelectedMetric(key)}
              >
                <div className="kpi-card-top">
                  <span className="kpi-label" style={{ color: isSelected ? "#0f172a" : "#475569" }}>
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
                      color: isSelected ? themeColor : "#0f172a"
                    }}
                  >
                    {data.current}
                  </h3>
                  <span
                    className="kpi-tap-hint"
                    style={{
                      color: isSelected ? themeColor : "#94a3b8",
                      fontWeight: isSelected ? "700" : "500"
                    }}
                  >
                    {isSelected ? "- Active View" : "Tap to inspect"}
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
                  background: currentMetricData.color || "#c0392b",
                  boxShadow: `0 0 8px ${currentMetricData.color || "#c0392b"}`
                }}
              ></span>
              <strong style={{ color: currentMetricData.color || "#c0392b", fontSize: "15px", fontWeight: 800 }}>
                {currentMetricData.label}
              </strong>
              <span style={{ color: "#64748b", fontSize: "13px", fontWeight: 500 }}>
                ({timeframe === "7d" ? "Past 7 Days Real Daily Activity" : "Monthly 30-Day Real Trend"})
              </span>
            </div>

            {hoveredPoint && (
              <div
                className="chart-hover-indicator"
                style={{
                  borderLeftColor: currentMetricData.color || "#c0392b"
                }}
              >
                <span>{hoveredPoint.label}: </span>
                <strong style={{ color: currentMetricData.color || "#c0392b", fontSize: "14px" }}>
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
                <linearGradient id="chartGradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={currentMetricData.color || "#c0392b"} stopOpacity="0.22" />
                  <stop offset="50%" stopColor={currentMetricData.color || "#c0392b"} stopOpacity="0.08" />
                  <stop offset="100%" stopColor={currentMetricData.color || "#c0392b"} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Subtle Grid lines */}
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
              <line x1={paddingX} y1={(paddingY + bottomAxisY) / 2} x2={svgWidth - paddingX} y2={(paddingY + bottomAxisY) / 2} stroke="#f1f5f9" strokeDasharray="4 4" strokeWidth="1" />
              <line x1={paddingX} y1={bottomAxisY} x2={svgWidth - paddingX} y2={bottomAxisY} stroke="#e2e8f0" strokeWidth="1.2" />

              {/* Soft Gradient Area */}
              {areaD && <path d={areaD} fill="url(#chartGradientFill)" />}

              {/* Sleek Smooth Curve Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke={currentMetricData.color || "#c0392b"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Points, Labels and Dates */}
              {points.map((p) => {
                const isHovered = hoveredPoint?.idx === p.idx;
                const shouldShowDate =
                  points.length <= 8 ||
                  p.idx % Math.ceil(points.length / 6) === 0 ||
                  p.idx === points.length - 1;

                const shouldShowValue =
                  isHovered ||
                  points.length <= 8 ||
                  (p.val > 0 && (p.val >= maxVal * 0.25 || points.length <= 14));

                const themeColor = currentMetricData.color || "#c0392b";

                return (
                  <g key={p.idx} className="chart-point-group">
                    {/* Visual Point Dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? "5.5" : "3.5"}
                      fill={isHovered ? themeColor : "#FFFFFF"}
                      stroke={themeColor}
                      strokeWidth={isHovered ? "2.5" : "2"}
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
                        y={p.y - (isHovered ? 12 : 9)}
                        textAnchor="middle"
                        fill={isHovered ? themeColor : "#0f172a"}
                        fontSize={isHovered ? "12" : "10.5"}
                        fontWeight={isHovered ? "900" : "700"}
                      >
                        {p.val}
                      </text>
                    )}

                    {/* X-Axis Date Label */}
                    {shouldShowDate && (
                      <text
                        x={p.x}
                        y={bottomAxisY + 22}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="11"
                        fontWeight="600"
                      >
                        {p.label}
                      </text>
                    )}

                    {/* Generous Invisible Hover Target */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="16"
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
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 20px 80px 20px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
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

        /* 1. Hub Bar */
        .hub-identity-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-left: 6px solid #c0392b;
          border-radius: 16px;
          padding: 16px 22px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
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
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 4px 12px rgba(255, 75, 43, 0.3);
          flex-shrink: 0;
        }

        .hub-live-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 13px;
          height: 13px;
          background: #16a34a;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(22, 163, 74, 0.6);
        }

        .hub-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .hub-shop-title {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .hub-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #16a34a;
          font-size: 11.5px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .hub-owner-sub {
          font-size: 13.5px;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .hub-owner-sub strong { color: #0f172a; }
        .hub-owner-sub code {
          background: #fef2f2;
          border: 1px solid #fecaca;
          padding: 2px 7px;
          border-radius: 4px;
          color: #c0392b;
          font-size: 12.5px;
          font-weight: 800;
        }

        .btn-refresh-analytics {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #1e293b;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-refresh-analytics:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        /* 2. Insights Card */
        .insights-analytics-container {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 22px 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .insights-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .insights-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sparkle-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
          flex-shrink: 0;
        }

        .insights-title {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .insights-sub {
          font-size: 13px;
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
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-timeframe.active {
          background: #c0392b;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.3);
        }

        /* 🌟 KPI Cards Grid */
        .kpi-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 22px;
        }

        @media (max-width: 1024px) {
          .kpi-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .kpi-cards-grid {
            grid-template-columns: 1fr;
          }
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
          font-size: 13.5px;
          font-weight: 700;
        }

        .kpi-growth-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 11.5px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 12px;
        }

        .kpi-value-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }

        .kpi-value {
          font-size: 28px;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .kpi-tap-hint {
          font-size: 12px;
          font-weight: 600;
        }

        /* 🎨 Clean White SVG Chart Card */
        .chart-wrapper-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 18px 20px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
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
          border: 1.5px solid #e2e8f0;
          border-left: 4px solid;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .svg-responsive-box {
          width: 100%;
          height: 220px;
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
