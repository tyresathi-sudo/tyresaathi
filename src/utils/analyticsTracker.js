import { db } from "../firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

// Local storage key for fallback & offline tracking
const ANALYTICS_STORAGE_KEY = "tyresaathi_analytics_events";

/**
 * Log real analytics events (view, map_direction, call_lead, booking, search)
 */
export async function trackStoreEvent(eventType, metadata = {}) {
  const event = {
    type: eventType, // 'view', 'map_direction', 'call_lead', 'booking', 'search'
    timestamp: new Date().toISOString(),
    dateStr: new Date().toISOString().split("T")[0],
    metadata,
  };

  // 1. Save to LocalStorage immediately
  try {
    const local = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const events = local ? JSON.parse(local) : [];
    events.push(event);
    // Keep last 1000 events locally
    if (events.length > 1000) events.shift();
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.warn("Local analytics storage notice:", e);
  }

  // 2. Save to Firestore in background
  try {
    await addDoc(collection(db, "shop_analytics_events"), {
      ...event,
      createdAtServer: serverTimestamp(),
    });
  } catch (err) {
    // Silent fail if offline
  }
}

/**
 * Calculate real percentage growth between first half and second half of time window
 */
function calculateGrowth(points) {
  if (!points || points.length === 0) return "0.0%";
  const half = Math.floor(points.length / 2);
  const firstHalf = points.slice(0, half).reduce((a, b) => a + b, 0);
  const secondHalf = points.slice(half).reduce((a, b) => a + b, 0);

  if (firstHalf === 0 && secondHalf === 0) return "0.0%";
  if (firstHalf === 0) return `+${(secondHalf * 100).toFixed(0)}%`;
  const diff = ((secondHalf - firstHalf) / firstHalf) * 100;
  return `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`;
}

/**
 * Fetch all real analytics events and calculate actual metrics & graph curves (100% Real Data)
 */
export async function getRealAnalyticsData(timeframe = "7d") {
  const daysCount = timeframe === "7d" ? 7 : 30;
  const today = new Date();

  // Generate array of YYYY-MM-DD date strings for the period
  const dateKeys = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dateKeys.push(d.toISOString().split("T")[0]);
  }

  // 1. Fetch real events from Firestore and local cache
  let allEvents = [];
  try {
    const snap = await getDocs(collection(db, "shop_analytics_events"));
    if (!snap.empty) {
      allEvents = snap.docs.map((doc) => doc.data());
    } else {
      const local = localStorage.getItem(ANALYTICS_STORAGE_KEY);
      allEvents = local ? JSON.parse(local) : [];
    }
  } catch (e) {
    const local = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    allEvents = local ? JSON.parse(local) : [];
  }

  // 2. Fetch real bookings
  let realBookings = [];
  try {
    const bSnap = await getDocs(collection(db, "bookings"));
    if (!bSnap.empty) {
      realBookings = bSnap.docs.map((doc) => doc.data());
    } else {
      const localB = localStorage.getItem("tyresaathi_user_bookings");
      realBookings = localB ? JSON.parse(localB) : [];
    }
  } catch (e) {
    const localB = localStorage.getItem("tyresaathi_user_bookings");
    realBookings = localB ? JSON.parse(localB) : [];
  }

  // 3. Initialize daily counters with 0
  const dailyViews = {};
  const dailyMaps = {};
  const dailyCalls = {};
  const dailyBookings = {};

  dateKeys.forEach((k) => {
    dailyViews[k] = 0;
    dailyMaps[k] = 0;
    dailyCalls[k] = 0;
    dailyBookings[k] = 0;
  });

  // Populate from real events
  allEvents.forEach((ev) => {
    const date = ev.dateStr || (ev.timestamp ? ev.timestamp.split("T")[0] : null);
    if (date && dailyViews[date] !== undefined) {
      if (ev.type === "view") dailyViews[date]++;
      if (ev.type === "map_direction") dailyMaps[date]++;
      if (ev.type === "call_lead") dailyCalls[date]++;
    }
  });

  // Populate from real bookings
  realBookings.forEach((b) => {
    const date = b.date || (b.createdAt ? b.createdAt.split("T")[0] : null);
    if (date && dailyBookings[date] !== undefined) {
      dailyBookings[date]++;
    }
  });

  // Real point arrays without any simulated or dummy values
  const viewsPoints = dateKeys.map((k) => dailyViews[k]);
  const mapPoints = dateKeys.map((k) => dailyMaps[k]);
  const callPoints = dateKeys.map((k) => dailyCalls[k]);
  const bookingPoints = dateKeys.map((k) => dailyBookings[k]);

  const totalViews = viewsPoints.reduce((a, b) => a + b, 0);
  const totalMaps = mapPoints.reduce((a, b) => a + b, 0);
  const totalCalls = callPoints.reduce((a, b) => a + b, 0);
  const totalBookings = bookingPoints.reduce((a, b) => a + b, 0) || realBookings.length;

  // Real conversion calculation
  const convRate = totalViews > 0 ? ((totalBookings / totalViews) * 100).toFixed(1) : "0.0";
  const convPoints = viewsPoints.map((v, i) => {
    const b = bookingPoints[i] || 0;
    return v > 0 ? Number(((b / v) * 100).toFixed(1)) : 0;
  });

  return {
    views: {
      label: "Store Profile Views",
      current: totalViews.toLocaleString(),
      growth: calculateGrowth(viewsPoints),
      color: "#FF3B30",
      secondaryColor: "#FF8C00",
      gradientId: "viewsGradVivid",
      glowColor: "rgba(255, 59, 48, 0.4)",
      points: viewsPoints,
    },
    mapClicks: {
      label: "Map Route Directions",
      current: totalMaps.toLocaleString(),
      growth: calculateGrowth(mapPoints),
      color: "#00E676",
      secondaryColor: "#00B0FF",
      gradientId: "mapGradVivid",
      glowColor: "rgba(0, 230, 118, 0.4)",
      points: mapPoints,
    },
    callLeads: {
      label: "Direct Call Leads",
      current: totalCalls.toLocaleString(),
      growth: calculateGrowth(callPoints),
      color: "#FFB300",
      secondaryColor: "#FF5722",
      gradientId: "callGradVivid",
      glowColor: "rgba(255, 179, 0, 0.4)",
      points: callPoints,
    },
    conversion: {
      label: "Booking Conversion",
      current: `${convRate}%`,
      growth: calculateGrowth(convPoints),
      color: "#B388FF",
      secondaryColor: "#FF4081",
      gradientId: "convGradVivid",
      glowColor: "rgba(179, 136, 255, 0.4)",
      points: convPoints,
    },
  };
}
