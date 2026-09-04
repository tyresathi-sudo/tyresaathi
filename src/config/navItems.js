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
  Crown
} from "lucide-react";

export const MAIN_NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search Tyres", icon: Search },
  { to: "/store-location", label: "Stores & Hubs", icon: MapPin },
  { to: "/bookings", label: "My Bookings", icon: Calendar },
];

export const SHOP_NAV_ITEMS = [
  { to: "/subscription", label: "Plans & Pricing", icon: Crown },
  { to: "/analytics", label: "Shop Analytics", icon: BarChart3 },
  { to: "/billing", label: "Shop Billing", icon: Receipt },
  { to: "/shop/add-product", label: "Add Product", icon: PlusCircle },
];

export const ACCOUNT_NAV_ITEMS = [
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
  { to: "/support", label: "Help & Support", icon: LifeBuoy },
];

export const BOTTOM_NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/store-location", label: "Stores", icon: MapPin },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User },
];

export const NAV_ITEMS = [
  ...MAIN_NAV_ITEMS,
  ...SHOP_NAV_ITEMS,
  ...ACCOUNT_NAV_ITEMS
];
