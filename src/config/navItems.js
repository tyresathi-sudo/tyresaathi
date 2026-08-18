import { Home, Search, Calendar, MapPin, User, Receipt, Settings as SettingsIcon, LifeBuoy } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/store-location", label: "Stores", icon: MapPin },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
  { to: "/support", label: "Help & Support", icon: LifeBuoy },
  { to: "/profile", label: "Profile", icon: User },
];
