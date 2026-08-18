import { Home, Search, Calendar, MapPin, User } from "lucide-react";

export const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/store-location", label: "Stores", icon: MapPin },
  { to: "/bookings", label: "Bookings", icon: Calendar },
  { to: "/profile", label: "Profile", icon: User },
];
