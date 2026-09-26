import { 
  Home, 
  Search, 
  MapPin, 
  Calendar, 
  Receipt, 
  PlusCircle, 
  User, 
  Settings as SettingsIcon, 
  LifeBuoy,
  BarChart3,
  Crown,
  Package,
  MessageCircle,
  ShieldCheck
} from "lucide-react";

// 1. Manage Business (Shop Owner Tools)
export const BUSINESS_NAV_ITEMS = [
  { to: "/shop/add-product", label: "Add New Product", icon: PlusCircle, color: "#10b981", bg: "#ecfdf5" },
  { to: "/shop/products", label: "Manage Stock & Inventory", icon: Package, color: "#f59e0b", bg: "#fffbeb" },
  { to: "/billing", label: "Create Invoice / Billing", icon: Receipt, color: "#3b82f6", bg: "#eff6ff" },
];

// 2. Growth & Insights
export const GROWTH_NAV_ITEMS = [
  { to: "/analytics", label: "Shop Analytics & Footfall", icon: BarChart3, color: "#8b5cf6", bg: "#f5f3ff" },
  { to: "/subscription", label: "VIP Dealer Plans", icon: Crown, color: "#f59e0b", bg: "#fef3c7" },
];

// 3. Customer Services & Search
export const SERVICE_NAV_ITEMS = [
  { to: "/search", label: "Search Tyre Catalog", icon: Search, color: "#6366f1", bg: "#eef2ff" },
  { to: "/store-location", label: "Stores & Verified Hubs", icon: MapPin, color: "#059669", bg: "#ecfdf5" },
  { to: "/bookings", label: "My Bookings", icon: Calendar, color: "#7c3aed", bg: "#f5f3ff" },
];

// 4. Account & Support
export const ACCOUNT_NAV_ITEMS = [
  { to: "/profile", label: "Shop Profile", icon: User, color: "#0284c7", bg: "#f0f9ff" },
  { to: "/settings", label: "Settings", icon: SettingsIcon, color: "#64748b", bg: "#f8fafc" },
];

// 5. Mobile Bottom Navigation Bar (5 Core Tabs)
export const BOTTOM_NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/billing", label: "Invoices", icon: Receipt },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/profile", label: "Menu", icon: User },
];

// Legacy exports for compatibility
export const MAIN_NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  ...SERVICE_NAV_ITEMS
];
export const SHOP_NAV_ITEMS = [
  ...BUSINESS_NAV_ITEMS,
  ...GROWTH_NAV_ITEMS
];
export const NAV_ITEMS = [
  ...MAIN_NAV_ITEMS,
  ...SHOP_NAV_ITEMS,
  ...ACCOUNT_NAV_ITEMS
];
