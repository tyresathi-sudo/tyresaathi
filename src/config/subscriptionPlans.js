// Configuration for TyreSaathi Shopkeeper Subscriptions & Revenue Model

export const DEFAULT_SUBSCRIPTION_PLANS = [
  {
    id: "free_lifetime",
    name: "Lifetime Free Plan",
    hindiName: "छोटा दुकानदार (लाइफटाइम फ्री)",
    tagline: "Shuruat karne wale chhote dukandaron ke liye hamesha 100% Free",
    badge: "🌱 100% FREE FOREVER",
    badgeColor: "#2F9E44",
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    color: "#2F9E44",
    features: [
      "🏪 Basic Shop Profile & Google Maps Location",
      "📅 Up to 50 Service Bookings / Month",
      "📞 Direct Customer Phone Call & WhatsApp Button",
      "📄 Basic In-Store Bill Generator",
      "📱 Customer Ratings & Feedback Support",
      "⚡ Verified on TyreSaathi Network"
    ],
    limitations: [
      "No Priority Search Ranking",
      "No Home Page Slider Ad",
      "Standard Search Listing"
    ]
  },
  {
    id: "pro_partner",
    name: "Pro Partner Plan",
    hindiName: "दुकानदार प्रो (ग्रोथ प्लान)",
    tagline: "Dukan ki bikri aur grahak tezi se badhane ke liye",
    badge: "🔥 MOST POPULAR (बेस्ट वैल्यू)",
    badgeColor: "#FF6B35",
    priceMonthly: 299,
    priceYearly: 2499, // Save ~30%
    popular: true,
    color: "#C0392B",
    gradient: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
    features: [
      "🚀 Unlimited Service Bookings & Customer Leads",
      "🌟 Verified Gold Partner Hub Badge (गोल्ड बैज)",
      "🔝 Priority Ranking in Local Area Search (ऊपर दिखेगा)",
      "🧾 Unlimited GST / Non-GST Bills with WhatsApp PDF",
      "📦 Tyre Inventory & Low Stock Alert System",
      "📊 Shop Analytics, Views & Customer Call Insights",
      "💬 Priority WhatsApp Customer Support"
    ],
    limitations: [
      "Home Page Slider Ad not included"
    ]
  },
  {
    id: "elite_vip",
    name: "Elite VIP Dealer",
    hindiName: "प्रीमियम डीलर (सुपर फ्लीट)",
    tagline: "Poore shahar mein #1 banna aur bulk tyre inquiries pana",
    badge: "💎 VIP ELITE (फुल एक्सेस)",
    badgeColor: "#B388FF",
    priceMonthly: 699,
    priceYearly: 5999, // Save ~30%
    popular: false,
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)",
    features: [
      "Everything in Pro Partner Plan +",
      "📢 Featured Home Page Sliding Banner Ad (फ्री ऐड शामिल)",
      "👑 Top #1 Guaranteed Position in City/Pincode Search",
      "🚚 Commercial Fleet, Truck & Bulk Tyre Inquiries",
      "🎨 Custom Shop Logo & Watermark on all Bills",
      "👨‍💼 Dedicated 24/7 Priority Account Manager",
      "⚡ Instant VIP Customer Booking Alerts"
    ],
    limitations: []
  }
];

export const SUBSCRIPTION_PLANS = DEFAULT_SUBSCRIPTION_PLANS;

export const DEFAULT_PLAN_SETTINGS = {
  launchFreeMode: true, // Initially 100% Free during launch
  launchBannerNote: "🎉 LAUNCH OFFER: Sabhi Plans & Features Filhaal 100% FREE Hain! Kisi bhi plan ko ₹0 me activate karein.",
  currencySymbol: "₹",
  plans: DEFAULT_SUBSCRIPTION_PLANS
};

// Helper to get active plans config (checking localStorage / admin overrides)
export function getActiveSubscriptionConfig() {
  try {
    const saved = localStorage.getItem("tyresaathi_subscription_settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.plans) {
        parsed.plans = parsed.plans.map((p) => {
          if (p.id === "free_lifetime" && Array.isArray(p.features)) {
            p.features = p.features.map((f) => f.replace("20 Service Bookings", "50 Service Bookings"));
          }
          return p;
        });
      }
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
    q: "Kya chhote dukandar ke liye TyreSaathi hamesha free rahega?",
    a: "Haan, bilkul! Chhote dukandar aur garage owners ke liye hamara 'Lifetime Free Plan' hamesha 100% free rahega. Usme koi chhipa hua charge nahi hai."
  },
  {
    q: "Pro ya Elite plan lene se kya faayda hoga?",
    a: "Pro aur Elite plans se aapki dukan TyreSaathi app aur search results mein sabse upar dikhegi, Verified Gold/VIP badge milega, aur Home Page Slider par aapka advertisement aayega jisse aapko zyada customers aur tyre sales milengi."
  },
  {
    q: "Payment kaise kar sakte hain?",
    a: "Aap UPI (Google Pay, PhonePe, Paytm), Net Banking, ya Debit/Credit card se direct payment kar sakte hain. Payment hote hi plan turant active ho jata hai."
  },
  {
    q: "Kya main kabhi bhi plan cancel ya downgrade kar sakta hoon?",
    a: "Haan, aap jab chahein bina kisi penalty ke plan cancel karke wapas Lifetime Free Plan par switch kar sakte hain."
  }
];
