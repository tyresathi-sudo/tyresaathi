// Configuration for TyreSaathi Shopkeeper Subscriptions & Revenue Model

export const DEFAULT_SUBSCRIPTION_PLANS = [
  {
    id: "free_lifetime",
    name: "Lifetime Free Plan",
    hindiName: "Starter Dealer (Free Forever)",
    tagline: "Essential toolkit for small garage & local tyre shop owners",
    badge: "🌱 100% FREE FOREVER",
    badgeColor: "#2F9E44",
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    color: "#2F9E44",
    features: [
      "🏪 Basic Shop Profile & Google Maps Location",
      "📅 Up to 50 Service Bookings / Month",
      "📞 Direct Customer Call & WhatsApp Contact",
      "📄 Basic In-Store Billing Generator",
      "📱 Customer Ratings & Review Support",
      "⚡ Verified on TyreSaathi Network"
    ],
    limitations: [
      "Standard Search Listing",
      "No Priority Search Boost",
      "Home Banner Ad Not Included"
    ]
  },
  {
    id: "pro_partner",
    name: "Pro Partner Plan",
    hindiName: "Growth Partner (Most Popular)",
    tagline: "Accelerate your local customer footfall & monthly sales volume",
    badge: "🔥 MOST POPULAR (BEST VALUE)",
    badgeColor: "#FF6B35",
    priceMonthly: 299,
    priceYearly: 2499, // Save ~30%
    popular: true,
    color: "#C0392B",
    gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
    features: [
      "🚀 Unlimited Bookings & Customer Leads",
      "🌟 Verified Gold Partner Hub Badge",
      "🔝 Priority Placement in Local Area Search",
      "🧾 Unlimited Invoices with WhatsApp PDF",
      "📦 Tyre Inventory & Low Stock Alert System",
      "📊 Shop Footfall, Views & Call Analytics",
      "💬 Priority WhatsApp Customer Support"
    ],
    limitations: [
      "Home Page Slider Ad not included"
    ]
  },
  {
    id: "elite_vip",
    name: "Elite VIP Dealer",
    hindiName: "Premium Fleet (Full Access)",
    tagline: "Become the #1 preferred tyre center in your city for bulk inquiries",
    badge: "💎 VIP ELITE (FULL ACCESS)",
    badgeColor: "#8B5CF6",
    priceMonthly: 699,
    priceYearly: 5999, // Save ~30%
    popular: false,
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)",
    features: [
      "Everything in Pro Partner Plan +",
      "📢 Featured Home Page Sliding Banner Ad",
      "👑 Top #1 Guaranteed City Search Ranking",
      "🚚 Bulk Fleet & Commercial Tyre Inquiries",
      "🎨 Custom Shop Watermark on Invoices",
      "👨‍💼 Dedicated 24/7 Account Support Manager",
      "⚡ Instant VIP Customer Booking Notifications"
    ],
    limitations: []
  }
];

export const SUBSCRIPTION_PLANS = DEFAULT_SUBSCRIPTION_PLANS;

export const DEFAULT_PLAN_SETTINGS = {
  launchFreeMode: true, // Initially 100% Free during launch
  launchBannerNote: "🎉 LAUNCH OFFER: All Partner Plans & Features are 100% FREE during launch! Activate any plan for ₹0.",
  currencySymbol: "₹",
  plans: DEFAULT_SUBSCRIPTION_PLANS
};

// Helper to get active plans config (checking localStorage / admin overrides)
export function getActiveSubscriptionConfig() {
  try {
    const saved = localStorage.getItem("tyresaathi_subscription_settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_PLAN_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.warn("Could not read subscription settings:", e);
  }
  return DEFAULT_PLAN_SETTINGS;
}

// Helper to save plans config
export function saveActiveSubscriptionConfig(config) {
  try {
    localStorage.setItem("tyresaathi_subscription_settings", JSON.stringify(config));
    window.dispatchEvent(new Event("tyresaathi_subscription_updated"));
    return true;
  } catch (e) {
    console.warn("Could not save subscription settings:", e);
    return false;
  }
}

export const SUBSCRIPTION_FAQS = [
  {
    q: "Is TyreSaathi always free for small garages & tyre shops?",
    a: "Yes, absolutely! The 'Lifetime Free Plan' is 100% free forever for small shop owners and puncture repair centers with no hidden charges."
  },
  {
    q: "What are the benefits of upgrading to Pro or Elite plans?",
    a: "Pro and Elite plans give your shop top ranking in search results, a verified gold badge, featured homepage banner ads, and priority commercial fleet leads."
  },
  {
    q: "What payment methods are supported?",
    a: "You can pay securely using UPI (Google Pay, PhonePe, Paytm), Net Banking, or Debit/Credit Cards. Your plan activates immediately upon confirmation."
  },
  {
    q: "Can I cancel or switch my plan at any time?",
    a: "Yes, you can easily switch or cancel your plan at any time with no lock-in contracts or cancellation penalties."
  }
];
