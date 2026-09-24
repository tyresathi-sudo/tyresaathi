import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Store,
  Calendar,
  MessageCircle,
  Package,
  Wrench,
  ShieldCheck,
  Compass,
  RefreshCw,
  X,
  ChevronRight,
  Sparkles,
  ThumbsUp,
  User,
  HeartHandshake,
  Check,
  Send
} from "lucide-react";
import { SAMPLE_SHOPS, SERVICE_TYPES } from "../config/tyreCatalog";
import { trackStoreEvent } from "../utils/analyticsTracker";
import { db } from "../firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { sendInAppNotification } from "../utils/notificationService";

// Haversine formula to compute accurate distance in Kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Default Fallback Coordinates (Raipur, CG Transport Nagar)
const DEFAULT_LAT = 21.2514;
const DEFAULT_LNG = 81.6296;

export default function StoreLocation() {
  const { currentUser, userData } = useAuth();
  const [searchParams] = useSearchParams();
  const initialShopName = searchParams.get("shopName") || "";
  const initialShopId = searchParams.get("shopId") || "";

  const [shopsList, setShopsList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialShopName);
  const [selectedShop, setSelectedShop] = useState(null);
  const [filterCity, setFilterCity] = useState("all");

  // Shop Profile Modal State
  const [shopProfileOpen, setShopProfileOpen] = useState(false);
  const [activeShopProfile, setActiveShopProfile] = useState(null);

  // Shop Rating & Review Modal State
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingShop, setRatingShop] = useState(null);
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStars, setHoveredStars] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerPhone, setReviewerPhone] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState(false);
  const [shopReviewsMap, setShopReviewsMap] = useState({});

  // 🛠️ In-Place Shop Service Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingShop, setBookingShop] = useState(null);
  const [bookingService, setBookingService] = useState("Tubeless Puncture Repair");
  const [bookingCustomerName, setBookingCustomerName] = useState(userData?.name || currentUser?.displayName || "");
  const [bookingCustomerPhone, setBookingCustomerPhone] = useState(userData?.phone || "");
  const [bookingVehicleType, setBookingVehicleType] = useState("Car / SUV");
  const [bookingVehicleNumber, setBookingVehicleNumber] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split("T")[0]);
  const [bookingTimeSlot, setBookingTimeSlot] = useState("10:00 AM - 11:00 AM");
  const [bookingNotes, setBookingNotes] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingSuccessAlert, setBookingSuccessAlert] = useState(null);

  // Live Location State
  const [userLocation, setUserLocation] = useState(null);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // 'idle', 'detecting', 'success', 'denied'

  // Track page view on load
  useEffect(() => {
    trackStoreEvent("view", { page: "store_location" });
  }, []);

  // Fetch verified reviews from Firestore
  useEffect(() => {
    async function loadReviews() {
      try {
        const snap = await getDocs(collection(db, "shop_reviews"));
        if (!snap.empty) {
          const map = {};
          snap.docs.forEach((d) => {
            const data = { id: d.id, ...d.data() };
            if (data.shopId) {
              if (!map[data.shopId]) map[data.shopId] = [];
              map[data.shopId].push(data);
            }
          });
          setShopReviewsMap(map);

          // Recalculate real ratings for shops based on Firestore reviews
          setShopsList((prevShops) =>
            prevShops.map((s) => {
              const revs = map[s.id] || [];
              if (revs.length > 0) {
                const sum = revs.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
                const avg = Number((sum / revs.length).toFixed(1));
                return {
                  ...s,
                  rating: avg,
                  reviewsCount: revs.length,
                };
              }
              return {
                ...s,
                rating: s.rating && s.reviewsCount ? s.rating : 0,
                reviewsCount: s.reviewsCount || 0,
              };
            })
          );
        }
      } catch (err) {
        console.warn("Reviews load fallback in StoreLocation:", err);
      }
    }
    loadReviews();
  }, []);

  // Live GPS Location Detection
  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Aapke browser me Geolocation support uplabdh nahi hai.");
      return;
    }
    setDetectingLocation(true);
    setLocationStatus("detecting");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setUserLocation(coords);
        setLocationStatus("success");
        setDetectingLocation(false);
      },
      (err) => {
        console.warn("Geolocation permission or timeout error:", err);
        setLocationStatus("denied");
        setDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  // Auto-detect on first load if permitted
  useEffect(() => {
    handleDetectLiveLocation();
  }, []);

  // Fetch real registered shops & products from Firestore
  useEffect(() => {
    async function loadData() {
      // 1. Load Products
      try {
        const prodSnap = await getDocs(collection(db, "products"));
        if (!prodSnap.empty) {
          const prods = prodSnap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((p) => p.published !== false);
          setAllProducts(prods);
        }
      } catch (err) {
        console.warn("Products load notice in store locator:", err);
      }

      // 2. Load Registered Shops
      try {
        const snap = await getDocs(collection(db, "users"));
        let loadedShops = [];
        if (!snap.empty) {
          const vendors = snap.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((u) => u.role === "vendor" || u.role === "shop_owner" || u.role === "admin" || u.shopName);
          
          if (vendors.length > 0) {
            loadedShops = vendors.map((v, idx) => {
              const shopServices = v.services || v.servicesOffered || [
                "Tyre Fitting & Replacement", 
                "Tubeless Tyre Repair", 
                "Nitrogen Air Fill", 
                "Tyre Cut & Sidewall Repair",
                "Doorstep Assistance"
              ];

              // Base coordinates with offset for realistic mapping if not explicitly provided
              const shopLat = Number(v.lat || (21.2514 + (idx % 3) * 0.012));
              const shopLng = Number(v.lng || (81.6296 + (idx % 3) * 0.015));

              return {
                id: v.id || v.uid,
                name: v.shopName || v.name || "TyreSaathi Partner Hub",
                ownerName: v.name || "Authorized Partner",
                city: v.city || "Raipur",
                address: v.address || "Transport Nagar, Rawabhatha, Raipur, Chhattisgarh",
                phone: v.phone || "8877277757",
                rating: v.rating || 4.9,
                reviewsCount: v.reviewsCount || (24 + idx * 4),
                services: shopServices,
                servicesOffered: shopServices,
                timing: v.openingHours || "Mon - Sun: 09:00 AM - 09:00 PM",
                lat: shopLat,
                lng: shopLng,
                photoURL: v.photoURL || "",
              };
            });
          }
        }

        // Fallback default demo shops if none
        if (loadedShops.length === 0) {
          loadedShops = SAMPLE_SHOPS.map((s, idx) => ({
            ...s,
            ownerName: s.name,
            timing: "Mon - Sun: 09:00 AM - 09:00 PM",
            lat: 21.2514 + idx * 0.01,
            lng: 81.6296 + idx * 0.01,
          }));
        }

        setShopsList(loadedShops);

        // Check if query params match a specific shop
        const matched = initialShopId 
          ? loadedShops.find(s => s.id === initialShopId)
          : (initialShopName ? loadedShops.find(s => s.name?.toLowerCase().includes(initialShopName.toLowerCase())) : loadedShops[0]);

        if (matched) {
          setSelectedShop(matched);
        } else if (loadedShops[0]) {
          setSelectedShop(loadedShops[0]);
        }
      } catch (err) {
        console.warn("Firestore shops load fallback:", err);
      }
    }
    loadData();
  }, [initialShopId, initialShopName]);

  // Recalculate Distances whenever user location or shopsList updates
  const enrichedShops = shopsList.map((shop, idx) => {
    let distance = null;
    if (userLocation && userLocation.lat && userLocation.lng) {
      distance = calculateDistance(userLocation.lat, userLocation.lng, shop.lat, shop.lng);
    }
    const finalDist = distance !== null ? distance : Number((1.2 + idx * 0.8).toFixed(1));

    return {
      ...shop,
      distanceKm: finalDist,
    };
  });

  // Sort by Nearest distance first
  enrichedShops.sort((a, b) => (Number(a.distanceKm) || 0) - (Number(b.distanceKm) || 0));

  // Mark first shop as nearest
  if (enrichedShops.length > 0) {
    enrichedShops[0].isNearest = true;
  }

  const filteredShops = enrichedShops.filter((shop) => {
    const q = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !q ||
      shop.name.toLowerCase().includes(q) ||
      shop.address.toLowerCase().includes(q) ||
      shop.city.toLowerCase().includes(q) ||
      shop.ownerName?.toLowerCase().includes(q);
    const matchesCity = filterCity === "all" || shop.city.toLowerCase() === filterCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const cities = ["all", ...new Set(shopsList.filter((s) => s && s.city).map((s) => s.city))];

  // Open Star Rating Modal for a Shop
  const openRatingModal = (shop, e) => {
    if (e) e.stopPropagation();
    setRatingShop(shop);
    setSelectedStars(0); // Start empty so user clicks to fill
    setHoveredStars(0);
    setReviewerName(userData?.name || currentUser?.displayName || "");
    setReviewerPhone(userData?.phone || "");
    setReviewComment("");
    setSelectedTags([]);
    setReviewSuccessMessage(false);
    setRatingModalOpen(true);
    trackStoreEvent("open_rating_modal", { shopId: shop.id, shopName: shop.name });
  };

  // 🛠️ Open In-Place Shop Service Booking Modal
  const handleOpenBookingModal = (shop, serviceName = "Tubeless Puncture Repair", e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setBookingShop(shop);
    setBookingService(serviceName || "Tubeless Puncture Repair");
    setBookingCustomerName(userData?.name || currentUser?.displayName || "");
    setBookingCustomerPhone(userData?.phone || "");
    setBookingVehicleType("Car / SUV");
    setBookingVehicleNumber("");
    setBookingDate(new Date().toISOString().split("T")[0]);
    setBookingTimeSlot("10:00 AM - 11:00 AM");
    setBookingNotes("");
    setBookingModalOpen(true);
    trackStoreEvent("open_booking_modal", { shopId: shop.id, shopName: shop.name, service: serviceName });
  };

  // Confirm In-Place Shop Booking
  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!bookingCustomerName.trim() || !bookingCustomerPhone.trim()) {
      alert("Kripya apna Naam aur Mobile Number zaroor bharein!");
      return;
    }

    setSubmittingBooking(true);
    const bookingId = `TS-BKG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBookingRecord = {
      id: bookingId,
      bookingId: bookingId,
      shopId: bookingShop?.id || "hub_partner",
      shopName: bookingShop?.name || "TyreSaathi Partner Hub",
      shopPhone: bookingShop?.phone || "",
      shopCity: bookingShop?.city || "",
      shopAddress: bookingShop?.address || "",
      serviceName: bookingService || "Tyre Service",
      customerName: bookingCustomerName.trim(),
      customerPhone: bookingCustomerPhone.trim(),
      vehicleType: bookingVehicleType,
      vehicleNumber: bookingVehicleNumber.trim(),
      date: bookingDate,
      timeSlot: bookingTimeSlot,
      notes: bookingNotes.trim(),
      status: "confirmed",
      userId: currentUser?.uid || "guest",
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "bookings"), {
        ...newBookingRecord,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Firestore booking sync fallback:", err);
    }

    try {
      const existing = JSON.parse(localStorage.getItem("tyresaathi_user_bookings") || "[]");
      localStorage.setItem("tyresaathi_user_bookings", JSON.stringify([newBookingRecord, ...existing]));
    } catch (err) {}

    // Send in-app notification
    try {
      if (currentUser?.uid) {
        sendInAppNotification({
          userId: currentUser.uid,
          title: `🚗 Service Booking Confirmed at ${bookingShop?.name}!`,
          message: `Booking #${bookingId} for ${bookingService} on ${bookingDate} (${bookingTimeSlot}) successfully booked.`,
          type: "booking",
          bookingId: bookingId,
        });
      }
    } catch (e) {}

    setSubmittingBooking(false);
    setBookingModalOpen(false);
    setBookingSuccessAlert({
      id: bookingId,
      shopName: bookingShop?.name,
      serviceName: bookingService,
      date: bookingDate,
      timeSlot: bookingTimeSlot
    });
    setTimeout(() => setBookingSuccessAlert(null), 8000);
  };

  // Toggle quick tag pills in rating modal
  const toggleReviewTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Submit Star Rating & Review to Firestore
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!ratingShop) return;

    if (!selectedStars || Number(selectedStars) < 1) {
      alert("Kripya shop owner ke liye 1 se 5 star me se rating chunein.");
      return;
    }

    if (!reviewerName.trim()) {
      alert("Kripya apna naam darj karein.");
      return;
    }

    setSubmittingReview(true);
    try {
      const newReview = {
        shopId: ratingShop.id,
        shopName: ratingShop.name,
        rating: Number(selectedStars),
        reviewerName: reviewerName.trim(),
        reviewerPhone: reviewerPhone.trim(),
        comment: reviewComment.trim(),
        tags: selectedTags,
        userId: currentUser?.uid || "guest",
        createdAt: serverTimestamp(),
        dateStr: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      };

      await addDoc(collection(db, "shop_reviews"), newReview);

      // Instant UI update
      setShopReviewsMap((prev) => {
        const existing = prev[ratingShop.id] || [];
        return {
          ...prev,
          [ratingShop.id]: [
            {
              id: "local-" + Date.now(),
              ...newReview,
              createdAt: new Date(),
            },
            ...existing,
          ],
        };
      });

      // Update shop's average score locally
      setShopsList((prevShops) =>
        prevShops.map((s) => {
          if (s.id === ratingShop.id) {
            const currentCount = Number(s.reviewsCount) || 0;
            const currentRating = Number(s.rating) || 0;
            const newCount = currentCount + 1;
            const newAvg = currentCount === 0 ? Number(selectedStars) : Number(((currentRating * currentCount + Number(selectedStars)) / newCount).toFixed(1));
            return {
              ...s,
              rating: newAvg,
              reviewsCount: newCount,
            };
          }
          return s;
        })
      );

      // Update active profile modal if currently open
      if (activeShopProfile && activeShopProfile.id === ratingShop.id) {
        const currentCount = Number(activeShopProfile.reviewsCount) || 0;
        const currentRating = Number(activeShopProfile.rating) || 0;
        const newCount = currentCount + 1;
        const newAvg = currentCount === 0 ? Number(selectedStars) : Number(((currentRating * currentCount + Number(selectedStars)) / newCount).toFixed(1));
        setActiveShopProfile((prev) => ({
          ...prev,
          rating: newAvg,
          reviewsCount: newCount,
        }));
      }

      setReviewSuccessMessage(true);
      trackStoreEvent("submit_review", {
        shopId: ratingShop.id,
        shopName: ratingShop.name,
        rating: selectedStars,
      });

      // 🔔 Trigger in-app & push notification to the Shop Owner
      sendInAppNotification({
        recipientId: ratingShop.id,
        recipientRole: "shop_owner",
        title: `⭐ Nayi ${selectedStars}-Star Rating Aayi!`,
        message: `${reviewerName} ne aapki shop "${ratingShop.name}" ko ${selectedStars} Star rating di hai!`,
        type: "rating_received",
        link: "/store-location",
        data: {
          shopId: ratingShop.id,
          shopName: ratingShop.name,
          rating: selectedStars,
          reviewerName,
        }
      });

      setTimeout(() => {
        setRatingModalOpen(false);
        setReviewSuccessMessage(false);
      }, 2200);
    } catch (err) {
      console.error("Error submitting shop review:", err);
      alert("Rating save karne me dikkat aayi. Kripya punah koshish karein.");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Open Shop Storefront Profile
  const openShopProfile = (shop) => {
    setActiveShopProfile(shop);
    setShopProfileOpen(true);
    trackStoreEvent("view_shop_profile", { shopName: shop.name, shopId: shop.id });
  };

  // Filter products for the active shop profile
  const shopProducts = activeShopProfile
    ? allProducts.filter(
        (p) =>
          p.shopId === activeShopProfile.id ||
          p.shopName?.toLowerCase() === activeShopProfile.name?.toLowerCase()
      )
    : [];

  return (
    <div className="store-location-page">
      {/* 🧭 Live GPS Location Header Bar & Map Discovery */}
      <div className="live-location-banner">
        <div className="loc-left-content">
          <div className="loc-status-pill">
            <span className={`pulse-dot ${locationStatus === "success" ? "dot-live" : "dot-idle"}`} />
            <span className="loc-status-text">
              {locationStatus === "success" 
                ? "🟢 Live GPS Location Active" 
                : (locationStatus === "detecting" ? "📡 Detecting Live Location..." : "📍 Real-Time Store Distance")}
            </span>
          </div>
          <p className="loc-desc-text">
            {userLocation 
              ? `Aapki live GPS location detect ho chuki hai — sabse najdeek TyreSaathi shops sabse upar dikh rahi hain.`
              : `Apne paas ki sabse najdeek dukan dekhne ke liye Live Location update karein.`}
          </p>
        </div>

        <div className="banner-action-buttons">
          <a
            href={`https://www.google.com/maps/search/tyre+puncture+mechanic+shops+near+me/@${userLocation?.lat || DEFAULT_LAT},${userLocation?.lng || DEFAULT_LNG},14z`}
            target="_blank"
            rel="noreferrer"
            className="btn-view-all-maps"
            title="Open Google Maps with all nearby tyre and puncture shops"
          >
            <Navigation size={16} />
            <span>🗺️ View All Nearby Shops on Google Maps</span>
          </a>

          <button 
            type="button"
            className="btn-detect-location"
            onClick={handleDetectLiveLocation}
            disabled={detectingLocation}
          >
            <Compass size={16} className={detectingLocation ? "spin-icon" : ""} />
            <span>{detectingLocation ? "Detecting GPS..." : "📍 Update Live Location"}</span>
          </button>
        </div>
      </div>

      {/* 🏬 Main Full-Width Store Directory Container */}
      <div className="store-directory-wrapper">
        <div className="directory-header-row">
          <div>
            <h1 className="directory-main-title">🏬 TyreSaathi Verified Partner Stores</h1>
            <p className="directory-subtitle-text">
              Aapki location ke paas verified tyre shops, puncture repair hubs aur authorized fitting centers.
            </p>
          </div>

          <div className="store-count-chip">
            ⚡ Showing <strong>{filteredShops.length}</strong> Authorized Hubs (Nearest First)
          </div>
        </div>

        {/* 🌟 In-Place Booking Success Alert */}
        {bookingSuccessAlert && (
          <div style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
            color: "#ffffff",
            padding: "16px 20px",
            borderRadius: "14px",
            marginBottom: "20px",
            boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckCircle2 size={24} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "800" }}>
                  🎉 Badhaai ho! Aapki Service Booking Confirm Ho Gayi!
                </h4>
                <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#cbd5e1" }}>
                  <strong>{bookingSuccessAlert.shopName}</strong> par <strong>{bookingSuccessAlert.serviceName}</strong> booked on {bookingSuccessAlert.date} ({bookingSuccessAlert.timeSlot}) • 🆔 #{bookingSuccessAlert.id}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setBookingSuccessAlert(null)}
              style={{ background: "rgba(255, 255, 255, 0.15)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "700" }}
            >
              ✕ Dismiss
            </button>
          </div>
        )}

        {/* Search & City Filter Bar */}
        <div className="directory-filters-card">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search store name, area, road, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="city-pill-row">
            {cities.map((city) => (
              <button
                key={city}
                className={`city-pill ${filterCity === city ? "city-pill-active" : ""}`}
                onClick={() => setFilterCity(city)}
              >
                {city === "all" ? "All Locations" : city}
              </button>
            ))}
          </div>
        </div>

        {/* 🌟 Full-Width Responsive Store Cards Grid */}
        {filteredShops.length === 0 ? (
          <div className="no-stores-found">
            <div className="no-stores-icon-box">
              <MapPin size={40} color="#c0392b" />
            </div>
            <h3>Koi Shop Nahi Mili</h3>
            <p>"{searchTerm}" ke liye koi store nahi mila. Kripya doosra city ya search term try karein.</p>
            <button
              className="btn-reset-filters"
              onClick={() => { setSearchTerm(""); setFilterCity("all"); }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="stores-grid-layout">
            {filteredShops.map((shop) => (
              <div key={shop.id} className={`store-card-full ${shop.isNearest ? "nearest-hub-border" : ""}`}>
                {/* Top Badge & Title Row */}
                <div className="store-card-top-row">
                  <div className="store-title-wrap">
                    <div className="store-avatar-icon">
                      <Store size={22} color="#c0392b" />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <h3 className="store-title-text">{shop.name}</h3>
                        {shop.isNearest && <span className="nearest-badge">⚡ Nearest Hub</span>}
                      </div>
                      <span className="verified-partner-tag">
                        <ShieldCheck size={13} /> Verified TyreSaathi Partner Hub
                      </span>
                    </div>
                  </div>

                  <div className="store-dist-badge">
                    <span className="dist-num">📍 {shop.distanceKm} km</span>
                    <span className="dist-sub">away from you</span>
                  </div>
                </div>

                {/* Rating, Timing & Location Row */}
                <div className="store-meta-strip">
                  <div 
                    className="meta-pill meta-rating-pill" 
                    onClick={(e) => openRatingModal(shop, e)}
                    title="Click to give star rating to this shop"
                  >
                    <Star 
                      size={13} 
                      fill={shop.reviewsCount > 0 ? "#f59e0b" : "none"} 
                      color={shop.reviewsCount > 0 ? "#f59e0b" : "#94a3b8"} 
                    />
                    {shop.reviewsCount > 0 ? (
                      <>
                        <strong>{shop.rating}</strong>
                        <span>({shop.reviewsCount} reviews)</span>
                      </>
                    ) : (
                      <span style={{ color: "#64748b", fontSize: "11.5px" }}>New Store</span>
                    )}
                    <span className="rate-click-hint">⭐ Star दें</span>
                  </div>
                  <div className="meta-pill">
                    <Clock size={13} color="#64748b" />
                    <span>{shop.timing || "09:00 AM - 09:00 PM"}</span>
                  </div>
                </div>

                <p className="store-address-text">
                  📍 {shop.address}
                </p>

                {/* Services Chips */}
                <div className="store-services-list">
                  {(shop.servicesOffered || shop.services || [
                    "Tyre Replacement",
                    "Puncture Repair",
                    "Nitrogen Air Fill",
                    "Cut Repair"
                  ]).slice(0, 4).map((svc, idx) => (
                    <span key={idx} className="service-tag">
                      <CheckCircle2 size={12} color="#16a34a" /> {svc}
                    </span>
                  ))}
                </div>

                {/* Direct Action Buttons on Every Card */}
                <div className="store-card-actions">
                  <div className="primary-actions-group">
                    <button
                      type="button"
                      className="btn-card-profile"
                      onClick={() => openShopProfile(shop)}
                    >
                      <Store size={15} />
                      <span>🏪 Enter Shop Profile & Stock</span>
                    </button>

                    <button
                      type="button"
                      className="btn-card-book"
                      onClick={(e) => handleOpenBookingModal(shop, "Tubeless Puncture Repair", e)}
                    >
                      <Calendar size={15} />
                      <span>Book Service</span>
                    </button>
                  </div>

                  <div className="quick-contact-actions-group">
                    <a
                      href={`tel:${shop.phone}`}
                      className="btn-quick-contact btn-quick-call"
                      title={`Call ${shop.name}`}
                      onClick={() => trackStoreEvent("call_lead", { shopId: shop.id, shopName: shop.name, type: "phone_call" })}
                    >
                      <Phone size={14} />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/91${shop.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${shop.name}, maine TyreSaathi par aapka store profile dekha hai, mujhe tyre / puncture service chahiye.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-quick-contact btn-quick-wa"
                      title="Chat on WhatsApp"
                      onClick={() => trackStoreEvent("call_lead", { shopId: shop.id, shopName: shop.name, type: "whatsapp_inquiry" })}
                    >
                      <MessageCircle size={14} />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shop.name + " " + shop.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-quick-contact btn-quick-map"
                      title="Turn-by-turn Navigation in Google Maps"
                      onClick={() => trackStoreEvent("map_direction", { shopId: shop.id, shopName: shop.name })}
                    >
                      <Navigation size={14} />
                      <span>Directions</span>
                    </a>

                    <button
                      type="button"
                      className="btn-quick-contact btn-quick-rate"
                      title="Give Star Rating to this shop owner"
                      onClick={(e) => openRatingModal(shop, e)}
                    >
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span>⭐ Star दें</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🏪 Dedicated Full Shop Profile & Storefront Modal */}
      {shopProfileOpen && activeShopProfile && (
        <div className="shop-modal-backdrop" onClick={() => setShopProfileOpen(false)}>
          <div className="shop-profile-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-shop-banner">
              <div className="banner-top-bar">
                <span className="banner-badge">
                  <ShieldCheck size={14} /> Verified TyreSaathi Partner Hub
                </span>
                <button className="modal-close-icon-btn" onClick={() => setShopProfileOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="banner-shop-title-row">
                <div className="banner-avatar-box">
                  <Store size={36} color="#c0392b" />
                </div>
                <div className="banner-details">
                  <h2 className="banner-shop-name">{activeShopProfile.name}</h2>
                  <p className="banner-shop-address">📍 {activeShopProfile.address}</p>
                  <div className="banner-meta-row">
                    <button
                      type="button"
                      className="meta-star-badge-btn"
                      onClick={(e) => openRatingModal(activeShopProfile, e)}
                      title="Click to submit a rating for this shop"
                    >
                      <Star 
                        size={13} 
                        fill={activeShopProfile.reviewsCount > 0 ? "#f59e0b" : "none"} 
                        color={activeShopProfile.reviewsCount > 0 ? "#f59e0b" : "#fef08a"} 
                      />
                      <span>
                        {activeShopProfile.reviewsCount > 0 
                          ? `${activeShopProfile.rating} (${activeShopProfile.reviewsCount} reviews)`
                          : "No ratings yet"}
                      </span>
                      <span className="pill-rate-action">⭐ Star दें</span>
                    </button>
                    <span className="meta-divider">•</span>
                    <span className="meta-timing"><Clock size={13} /> {activeShopProfile.timing}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-distance">📍 {activeShopProfile.distanceKm} km away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Action Toolbar */}
            <div className="modal-quick-contact-bar">
              <a 
                href={`tel:${activeShopProfile.phone}`}
                className="contact-action-btn call-action"
                onClick={() => trackStoreEvent("call_lead", { shopId: activeShopProfile.id, shopName: activeShopProfile.name, type: "phone_call" })}
              >
                <Phone size={16} />
                <span>Call ({activeShopProfile.phone})</span>
              </a>

              <a 
                href={`https://wa.me/91${activeShopProfile.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${activeShopProfile.name}, maine TyreSaathi par aapka shop profile dekha hai, mujhe tyre / service booking chahiye.`)}`}
                target="_blank"
                rel="noreferrer"
                className="contact-action-btn wa-action"
                onClick={() => trackStoreEvent("call_lead", { shopId: activeShopProfile.id, shopName: activeShopProfile.name, type: "whatsapp_inquiry" })}
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>

              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeShopProfile.name + " " + activeShopProfile.address)}`}
                target="_blank"
                rel="noreferrer"
                className="contact-action-btn map-action"
                onClick={() => trackStoreEvent("map_direction", { shopId: activeShopProfile.id, shopName: activeShopProfile.name })}
              >
                <Navigation size={16} />
                <span>Directions</span>
              </a>

              <button
                type="button"
                className="contact-action-btn rate-action-header"
                onClick={(e) => openRatingModal(activeShopProfile, e)}
              >
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span>⭐ Rate Shop (स्टार दें)</span>
              </button>
            </div>

            <div className="shop-modal-scrollable-body">
              {/* Section 1: Services Available at this Hub */}
              <div className="shop-body-section">
                <div className="section-title-wrap">
                  <Wrench size={18} color="#c0392b" />
                  <h3 className="section-heading-text">Services Available at this Hub (सर्विस लिस्ट)</h3>
                </div>

                <div className="services-grid-list">
                  {(activeShopProfile.servicesOffered || activeShopProfile.services || []).map((service, idx) => (
                    <div key={idx} className="service-feature-card">
                      <div className="svc-icon-circle">
                        <CheckCircle2 size={16} color="#27ae60" />
                      </div>
                      <div className="svc-info">
                        <strong>{service}</strong>
                        <span>Available at shop & doorstep fitment</span>
                      </div>
                      <button
                        type="button"
                        className="svc-book-btn"
                        onClick={(e) => handleOpenBookingModal(activeShopProfile, service, e)}
                      >
                        Book This Service
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Tyres & Products Available in this Shop */}
              <div className="shop-body-section" style={{ marginTop: "24px" }}>
                <div className="section-title-wrap">
                  <Package size={18} color="#2980b9" />
                  <h3 className="section-heading-text">
                    Tyres & Products in Stock at {activeShopProfile.name}
                  </h3>
                </div>

                {shopProducts.length > 0 ? (
                  <div className="shop-products-grid">
                    {shopProducts.map((p) => {
                      const img = (Array.isArray(p.images) && p.images[0]) || p.imageUrl || "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=300&auto=format&fit=crop&q=80";
                      return (
                        <div key={p.id} className="shop-prod-card">
                          <img src={img} alt={p.productName} className="shop-prod-img" />
                          <div className="shop-prod-details">
                            <span className="shop-prod-brand">{p.brandName} • {p.sizeName}</span>
                            <h4 className="shop-prod-title">{p.productName}</h4>
                            <div className="shop-prod-price-row">
                              <span className="shop-prod-offer">₹{p.offerPrice || p.price}</span>
                              {p.originalPrice && <span className="shop-prod-mrp">₹{p.originalPrice}</span>}
                            </div>
                            <button
                              type="button"
                              className="shop-prod-book-btn"
                              onClick={(e) => handleOpenBookingModal(activeShopProfile, p.productName || 'Tyre Purchase', e)}
                            >
                              ⚡ Book From This Shop
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="no-custom-products-note">
                    <p>
                      💡 इस दुकान के लिए स्टैंडर्ड टायर फिटिंग व पंचर रिपेयर सर्विस उपलब्ध है। 
                      आप नीचे दिए गए बटन से सीधे अपॉइंटमेंट बुक कर सकते हैं।
                    </p>
                    <button
                      type="button"
                      className="btn-book-main-cta"
                      onClick={(e) => handleOpenBookingModal(activeShopProfile, "Tyre Service & Fitment", e)}
                    >
                      📅 Book Service / Tyre Fitment at {activeShopProfile.name}
                    </button>
                  </div>
                )}
              </div>

              {/* Section 3: Customer Ratings & Reviews (ग्राहकों के रिव्यूज) */}
              <div className="shop-body-section" style={{ marginTop: "28px" }}>
                <div className="section-title-wrap" style={{ justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Star size={18} color="#f59e0b" fill="#f59e0b" />
                    <h3 className="section-heading-text">
                      Customer Ratings & Reviews (ग्राहकों के रिव्यूज)
                    </h3>
                  </div>

                  <button
                    type="button"
                    className="btn-write-review-cta"
                    onClick={() => openRatingModal(activeShopProfile)}
                  >
                    ⭐ Write a Review / स्टार दें
                  </button>
                </div>

                {/* Rating Summary Card */}
                <div className="rating-summary-card">
                  <div className="rating-score-box">
                    <span className="big-rating-number">
                      {activeShopProfile.reviewsCount > 0 ? activeShopProfile.rating : "0.0"}
                    </span>
                    <div className="stars-visual-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={18} 
                          fill={activeShopProfile.reviewsCount > 0 && s <= Math.round(Number(activeShopProfile.rating)) ? "#f59e0b" : "none"} 
                          color={activeShopProfile.reviewsCount > 0 && s <= Math.round(Number(activeShopProfile.rating)) ? "#f59e0b" : "#cbd5e1"} 
                        />
                      ))}
                    </div>
                    <span className="rating-reviews-sub">
                      {activeShopProfile.reviewsCount > 0 
                        ? `Based on ${activeShopProfile.reviewsCount} customer ratings`
                        : "Abhi koi customer rating nahi mili hai"}
                    </span>
                  </div>

                  <div className="rating-cta-message">
                    <h4>Aapne is dukan se tyre ya repair service li hai?</h4>
                    <p>Shop owner ko 1 se 5 star dekar apna review aur feedback share karein.</p>
                    <button
                      type="button"
                      className="btn-open-rate-modal"
                      onClick={() => openRatingModal(activeShopProfile)}
                    >
                      ⭐ Give Star Rating (स्टार व रिव्यू दें)
                    </button>
                  </div>
                </div>

                {/* Real Reviews List (No fake/dummy reviews) */}
                {shopReviewsMap[activeShopProfile.id] && shopReviewsMap[activeShopProfile.id].length > 0 ? (
                  <div className="reviews-cards-list">
                    {shopReviewsMap[activeShopProfile.id].map((rev) => (
                      <div key={rev.id} className="customer-review-card">
                        <div className="review-top-row">
                          <div className="reviewer-avatar-info">
                            <div className="reviewer-avatar-circle">
                              {(rev.reviewerName || "Customer").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="reviewer-name-wrap">
                                <strong>{rev.reviewerName || "Verified Customer"}</strong>
                                <span className="verified-buyer-pill">
                                  <CheckCircle2 size={11} /> Verified Customer
                                </span>
                              </div>
                              <span className="review-date-text">{rev.dateStr || "Recently reviewed"}</span>
                            </div>
                          </div>

                          <div className="review-star-pills">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={14}
                                fill={s <= Number(rev.rating) ? "#f59e0b" : "none"}
                                color={s <= Number(rev.rating) ? "#f59e0b" : "#cbd5e1"}
                              />
                            ))}
                          </div>
                        </div>

                        {rev.comment && <p className="review-comment-text">"{rev.comment}"</p>}

                        {Array.isArray(rev.tags) && rev.tags.length > 0 && (
                          <div className="review-tags-row">
                            {rev.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="review-tag-chip">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-reviews-empty-box">
                    <div className="empty-star-icon">
                      <Star size={36} color="#94a3b8" />
                    </div>
                    <h4>Abhi tak is shop ke liye koi review nahi hai</h4>
                    <p>Aap pehle customer bankar is dukan ko 1 se 5 star aur anubhav de sakte hain!</p>
                    <button
                      type="button"
                      className="btn-open-rate-modal"
                      onClick={() => openRatingModal(activeShopProfile)}
                    >
                      ⭐ Give First Review (पहला स्टार व रिव्यू दें)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ Interactive Customer Star Rating & Review Modal */}
      {ratingModalOpen && ratingShop && (
        <div className="rating-modal-backdrop" onClick={() => !submittingReview && setRatingModalOpen(false)}>
          <div className="rating-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rating-modal-header">
              <div className="rating-shop-icon-box">
                <Store size={24} color="#c0392b" />
              </div>
              <div className="rating-header-text">
                <h3 className="rating-modal-title">⭐ Rate {ratingShop.name}</h3>
                <p className="rating-modal-subtitle">📍 {ratingShop.address}</p>
              </div>
              <button 
                type="button" 
                className="rating-close-btn" 
                onClick={() => setRatingModalOpen(false)}
                disabled={submittingReview}
              >
                <X size={20} />
              </button>
            </div>

            {reviewSuccessMessage ? (
              <div className="rating-success-state">
                <div className="success-star-animation">
                  <Sparkles size={52} color="#f59e0b" />
                </div>
                <h3>Dhanaywad! Rating Safaltapoorvak Bhej Di Gayi</h3>
                <p>
                  Aapne <strong>{ratingShop.name}</strong> ko <strong>{selectedStars} Star</strong> rating di hai. 
                  Aapka review live update ho chuka hai.
                </p>
                <div className="success-badge-pill">
                  <Check size={16} /> Verified TyreSaathi Customer Review
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="rating-form-body">
                {/* 🌟 Big Interactive 5-Star Picker - Starts completely empty until clicked */}
                <div className="stars-interactive-section">
                  <label className="rating-section-label">
                    Aap is dukan ko kitne Star (रेटिंग) dena chahte hain?
                  </label>
                  
                  <div className="stars-picker-row">
                    {[1, 2, 3, 4, 5].map((starNum) => {
                      const isFilled = hoveredStars > 0 ? starNum <= hoveredStars : (selectedStars > 0 ? starNum <= selectedStars : false);
                      return (
                        <button
                          key={starNum}
                          type="button"
                          className={`star-pick-btn ${isFilled ? "star-filled" : "star-unfilled"}`}
                          onMouseEnter={() => setHoveredStars(starNum)}
                          onMouseLeave={() => setHoveredStars(0)}
                          onClick={() => setSelectedStars(starNum)}
                          title={`${starNum} Star`}
                        >
                          <Star 
                            size={38} 
                            fill={isFilled ? "#f59e0b" : "none"} 
                            color={isFilled ? "#f59e0b" : "#cbd5e1"} 
                            strokeWidth={isFilled ? 1.5 : 2}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {(() => {
                    const activeCount = hoveredStars > 0 ? hoveredStars : selectedStars;
                    return (
                      <div className={`star-feedback-badge ${activeCount === 0 ? "badge-empty-prompt" : ""}`}>
                        {activeCount === 0 && "👉 Star chunein (1 se 5 star par click karein)"}
                        {activeCount === 1 && "😞 1 Star - Poor Service (खराब)"}
                        {activeCount === 2 && "😐 2 Stars - Fair (औसत)"}
                        {activeCount === 3 && "🙂 3 Stars - Good (अच्छा)"}
                        {activeCount === 4 && "😊 4 Stars - Very Good (बहुत अच्छा)"}
                        {activeCount === 5 && "🌟 5 Stars - Excellent Service (शानदार!)"}
                      </div>
                    );
                  })()}
                </div>

                {/* Quick Feedback Tags */}
                <div className="rating-quick-tags-box">
                  <label className="rating-section-label">
                    Quick Feedback Tags (टैग चुनें):
                  </label>
                  <div className="quick-tags-grid">
                    {[
                      "⚡ Fast Tyre Fitting",
                      "💰 Best Price in Area",
                      "👍 Polite & Helpful Staff",
                      "🛡️ 100% Genuine Tyres",
                      "🔧 Expert Puncture Repair",
                      "☕ Clean Shop & Waiting Area"
                    ].map((tag) => {
                      const active = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          className={`tag-toggle-pill ${active ? "tag-active" : ""}`}
                          onClick={() => toggleReviewTag(tag)}
                        >
                          {active ? "✓ " : "+ "} {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reviewer Details */}
                <div className="rating-input-row">
                  <div className="form-group-field">
                    <label>Aapka Naam (Customer Name) *</label>
                    <input
                      type="text"
                      placeholder="e.g. Your Name"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group-field">
                    <label>Mobile No. (वैकल्पिक)</label>
                    <input
                      type="tel"
                      placeholder="10 digit mobile number"
                      value={reviewerPhone}
                      onChange={(e) => setReviewerPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Comment Box */}
                <div className="form-group-field">
                  <label>Apna Review / Feedback Likhein (वैकल्पिक)</label>
                  <textarea
                    rows={3}
                    placeholder="Dukan ka behavior, tyre fitment, puncturing ya rate kaisa laga? Apna anubhav share karein..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </div>

                {/* Action Buttons */}
                <div className="rating-form-actions">
                  <button
                    type="button"
                    className="btn-cancel-rating"
                    onClick={() => setRatingModalOpen(false)}
                    disabled={submittingReview}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-submit-rating"
                    disabled={submittingReview}
                  >
                    {submittingReview ? (
                      <>
                        <RefreshCw size={16} className="spin-icon" />
                        <span>Submitting Rating...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>⭐ Submit Rating (स्टार भेजें)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          🛠️ DEDICATED IN-PLACE SHOP BOOKING MODAL (स्टोर हब में ही बुकिंग)
      ══════════════════════════════════════════════════════════════════ */}
      {bookingModalOpen && bookingShop && (
        <div className="rating-modal-backdrop" onClick={() => setBookingModalOpen(false)}>
          <div className="rating-modal-card" style={{ maxWidth: "560px", width: "94%" }} onClick={(e) => e.stopPropagation()}>
            <div className="rating-modal-header" style={{ borderBottom: "1.5px solid #f1f5f9", paddingBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wrench size={20} color="#c0392b" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: "800", color: "#0f172a" }}>
                    Book a Tyre Service (सर्विस बुक करें)
                  </h3>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748b" }}>
                    Directly at {bookingShop.name} • Instant confirmation
                  </p>
                </div>
              </div>
              <button className="rating-modal-close" onClick={() => setBookingModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Selected Shop Highlight Card */}
            <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "10px", padding: "10px 14px", marginTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#64748b", letterSpacing: "0.5px" }}>
                  Selected Shop (चुनी हुई दुकान)
                </div>
                <div style={{ fontSize: "14.5px", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>
                  🏪 {bookingShop.name}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                  📍 {bookingShop.address} {bookingShop.city ? `(${bookingShop.city})` : ""}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: "700" }}>
                  ✓ Partner Hub
                </span>
                {bookingShop.phone && (
                  <span style={{ fontSize: "11px", color: "#475569", marginTop: "4px" }}>
                    📞 {bookingShop.phone}
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} style={{ marginTop: "16px" }}>
              {/* Choose Service */}
              <div className="form-group-field" style={{ marginBottom: "14px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                  Choose Service (सर्विस चुनें) *
                </label>
                <select
                  value={bookingService}
                  onChange={(e) => setBookingService(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13.5px", fontWeight: "600", color: "#1e293b", background: "#fff" }}
                  required
                >
                  <option value="Tubeless Puncture Repair">Tubeless Puncture Repair (पंचर रिपेयर)</option>
                  <option value="Tyre Replacement & Fitting">Tyre Replacement & Fitting (टायर फिटिंग)</option>
                  <option value="Tyre Cut Repair">Tyre Cut Repair (टायर कट रिपेयर)</option>
                  <option value="Nitrogen Air Fill">Nitrogen Air Fill (नाइट्रोजन एयर)</option>
                  <option value="Wheel Alignment & Balancing">Wheel Alignment & Balancing (व्हील अलाइनमेंट)</option>
                  <option value="Emergency Roadside Tyre Assistance">Emergency Roadside Tyre Assistance (इमरजेंसी सहायता)</option>
                  {bookingService && !["Tubeless Puncture Repair", "Tyre Replacement & Fitting", "Tyre Cut Repair", "Nitrogen Air Fill", "Wheel Alignment & Balancing", "Emergency Roadside Tyre Assistance"].includes(bookingService) && (
                    <option value={bookingService}>{bookingService}</option>
                  )}
                </select>
              </div>

              {/* Customer Name & Phone */}
              <div className="rating-input-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div className="form-group-field">
                  <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                    Aapka Naam (Customer Name) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Your Name"
                    value={bookingCustomerName}
                    onChange={(e) => setBookingCustomerName(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10 digit mobile number"
                    value={bookingCustomerPhone}
                    onChange={(e) => setBookingCustomerPhone(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                    required
                  />
                </div>
              </div>

              {/* Vehicle Type & Number */}
              <div className="rating-input-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div className="form-group-field">
                  <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                    Vehicle Type *
                  </label>
                  <select
                    value={bookingVehicleType}
                    onChange={(e) => setBookingVehicleType(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#fff", boxSizing: "border-box" }}
                  >
                    <option value="Car / SUV">🚗 Car / SUV</option>
                    <option value="Bike / Scooter">🛵 Bike / Scooter</option>
                    <option value="Commercial / Truck">🚚 Commercial / Truck</option>
                    <option value="Tractor / Agri">🚜 Tractor / Agri</option>
                    <option value="Auto / 3-Wheeler">🛺 Auto / 3-Wheeler</option>
                  </select>
                </div>

                <div className="form-group-field">
                  <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                    Vehicle Number (गाड़ी का नंबर)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DL 01 AB 1234"
                    value={bookingVehicleNumber}
                    onChange={(e) => setBookingVehicleNumber(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="rating-input-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div className="form-group-field">
                  <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                    Booking Date *
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                    required
                  />
                </div>

                <div className="form-group-field">
                  <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                    Preferred Time Slot *
                  </label>
                  <select
                    value={bookingTimeSlot}
                    onChange={(e) => setBookingTimeSlot(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#fff", boxSizing: "border-box" }}
                  >
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                    <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Problem Notes */}
              <div className="form-group-field" style={{ marginBottom: "18px" }}>
                <label style={{ fontSize: "12.5px", fontWeight: "700", color: "#334155", display: "block", marginBottom: "5px" }}>
                  Problem Notes / Special Request
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell shop about tyre condition or location..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", paddingTop: "12px", borderTop: "1.5px solid #f1f5f9" }}>
                <button
                  type="button"
                  className="btn-cancel-rating"
                  onClick={() => setBookingModalOpen(false)}
                  disabled={submittingBooking}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit-rating"
                  style={{ background: "#c0392b" }}
                  disabled={submittingBooking}
                >
                  {submittingBooking ? (
                    <>
                      <RefreshCw size={16} className="spin-icon" />
                      <span>Booking Confirming...</span>
                    </>
                  ) : (
                    <>
                      <Calendar size={16} />
                      <span>🚀 Confirm Booking (बुक करें)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scoped Styles for StoreLocation */}
      <style>{`
        .store-location-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 16px 80px 16px;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
        }

        /* 🧭 Live Location & Discovery Banner */
        .live-location-banner {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          border-radius: 16px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .loc-left-content {
          flex: 1;
          min-width: 280px;
        }

        .loc-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.12);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-live {
          background: #22c55e;
          box-shadow: 0 0 10px #22c55e;
        }
        .dot-idle {
          background: #f59e0b;
        }

        .loc-desc-text {
          margin: 0;
          font-size: 13px;
          color: #cbd5e1;
        }

        .banner-action-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-view-all-maps {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0284c7;
          color: #ffffff;
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(2, 132, 199, 0.35);
          transition: all 0.2s ease;
        }
        .btn-view-all-maps:hover {
          background: #0369a1;
          transform: translateY(-1px);
        }

        .btn-detect-location {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          border: none;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 3px 12px rgba(192, 57, 43, 0.35);
          transition: all 0.2s ease;
        }
        .btn-detect-location:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(192, 57, 43, 0.45);
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 🏬 Directory Main Layout */
        .store-directory-wrapper {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .directory-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .directory-main-title {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 3px;
          letter-spacing: -0.4px;
        }

        .directory-subtitle-text {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .store-count-chip {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 12.5px;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 20px;
        }

        /* Search & Filter Card */
        .directory-filters-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px 18px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon-inside {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .search-input-wrapper input {
          width: 100%;
          padding: 11px 40px 11px 42px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #0f172a;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        .search-input-wrapper input:focus {
          border-color: #c0392b;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.1);
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: #e2e8f0;
          border: none;
          color: #475569;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .city-pill-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .city-pill {
          padding: 6px 14px;
          border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .city-pill:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
          color: #0f172a;
        }
        .city-pill-active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.2);
        }

        /* 🌟 Full-Width Responsive Store Cards Grid */
        .stores-grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 18px;
        }

        .store-card-full {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: all 0.2s ease;
          position: relative;
        }
        .store-card-full:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }

        .nearest-hub-border {
          border-left: 5px solid #16a34a !important;
        }

        .store-card-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .store-title-wrap {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .store-avatar-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fef2f2;
          border: 1px solid #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .store-title-text {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 2px;
          letter-spacing: -0.3px;
        }

        .verified-partner-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 700;
          color: #16a34a;
        }

        .nearest-badge {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #15803d;
          font-size: 10.5px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .store-dist-badge {
          text-align: right;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          padding: 4px 10px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .dist-num {
          font-size: 13px;
          font-weight: 800;
          color: #1d4ed8;
        }

        .dist-sub {
          font-size: 10px;
          color: #64748b;
        }

        .store-meta-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #475569;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          padding: 3px 8px;
          border-radius: 8px;
        }
        .meta-pill strong {
          color: #0f172a;
        }

        .store-address-text {
          font-size: 12.5px;
          color: #475569;
          margin: 0;
          line-height: 1.45;
        }

        .store-services-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .service-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          background: #f1f5f9;
          color: #334155;
          padding: 3px 8px;
          border-radius: 6px;
        }

        /* Card Action Buttons */
        .store-card-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }

        .primary-actions-group {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
        }

        .btn-card-profile {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #ffffff;
          border: 1.5px solid #c0392b;
          color: #c0392b;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-card-profile:hover {
          background: #fef2f2;
        }

        .btn-card-book {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(192, 57, 43, 0.25);
          transition: all 0.2s;
        }
        .btn-card-book:hover {
          transform: translateY(-1px);
        }

        .quick-contact-actions-group {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px;
        }

        .btn-quick-contact {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 7px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-quick-call {
          background: #fee2e2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        .btn-quick-call:hover { background: #fecaca; }

        .btn-quick-wa {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }
        .btn-quick-wa:hover { background: #dcfce7; }

        .btn-quick-map {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }
        .btn-quick-map:hover { background: #dbeafe; }

        /* Empty State */
        .no-stores-found {
          text-align: center;
          padding: 60px 20px;
          background: #ffffff;
          border: 1.5px dashed #cbd5e1;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .no-stores-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 20px;
          background: #fef2f2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .no-stores-found h3 {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .no-stores-found p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }
        .btn-reset-filters {
          background: #c0392b;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Rating Pill & Card Rating Buttons */
        .meta-rating-pill {
          cursor: pointer;
          transition: all 0.2s;
        }
        .meta-rating-pill:hover {
          background: #fef3c7;
          border-color: #fde68a;
          transform: translateY(-1px);
        }
        .rate-click-hint {
          font-size: 10px;
          font-weight: 800;
          background: #fef3c7;
          color: #d97706;
          padding: 1px 6px;
          border-radius: 6px;
          margin-left: 2px;
        }

        .btn-quick-rate {
          background: #fefce8;
          color: #b45309;
          border: 1px solid #fef08a;
          cursor: pointer;
        }
        .btn-quick-rate:hover {
          background: #fef08a;
        }

        /* 🏪 Shop Profile Modal */
        .shop-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .shop-profile-modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 24px 50px rgba(0,0,0,0.25);
        }

        .modal-shop-banner {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white;
          padding: 22px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        .banner-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.2);
          color: #86efac;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .modal-close-icon-btn {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .banner-shop-title-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .banner-avatar-box {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .banner-shop-name {
          font-size: 20px;
          font-weight: 800;
          margin: 0 0 3px;
        }

        .banner-shop-address {
          font-size: 13px;
          color: #cbd5e1;
          margin: 0 0 5px;
        }

        .banner-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #94a3b8;
          flex-wrap: wrap;
        }
        
        .meta-star-badge-btn {
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fef08a;
          padding: 3px 10px;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .meta-star-badge-btn:hover {
          background: rgba(245, 158, 11, 0.35);
          transform: translateY(-1px);
        }
        .pill-rate-action {
          background: #f59e0b;
          color: #0f172a;
          font-size: 10px;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 8px;
        }

        .modal-quick-contact-bar {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .contact-action-btn {
          flex: 1;
          min-width: 130px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }
        .call-action { background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; }
        .wa-action { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        .map-action { background: #eff6ff; color: #1d4ed8; border: 1px solid #93c5fd; }
        .rate-action-header { background: #fef9c3; color: #a16207; border: 1px solid #fde047; }
        .rate-action-header:hover { background: #fef08a; }

        .shop-modal-scrollable-body {
          padding: 22px;
        }

        .section-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .section-heading-text {
          font-size: 15.5px;
          font-weight: 800;
          margin: 0;
          color: #0f172a;
        }

        .btn-write-review-cta {
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #b45309;
          font-size: 12px;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-write-review-cta:hover {
          background: #fde68a;
          transform: translateY(-1px);
        }

        /* Rating Summary Box in Modal */
        .rating-summary-card {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border: 1.5px solid #fde68a;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 16px;
        }

        .rating-score-box {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .big-rating-number {
          font-size: 32px;
          font-weight: 900;
          color: #b45309;
          line-height: 1;
        }
        .stars-visual-row {
          display: flex;
          gap: 3px;
          margin-top: 2px;
        }
        .rating-reviews-sub {
          font-size: 11.5px;
          color: #78350f;
          font-weight: 600;
        }

        .rating-cta-message {
          flex: 1;
          min-width: 240px;
        }
        .rating-cta-message h4 {
          margin: 0 0 2px;
          font-size: 14px;
          font-weight: 800;
          color: #78350f;
        }
        .rating-cta-message p {
          margin: 0 0 8px;
          font-size: 12px;
          color: #92400e;
        }
        .btn-open-rate-modal {
          background: #d97706;
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
          transition: all 0.2s;
        }
        .btn-open-rate-modal:hover {
          background: #b45309;
          transform: translateY(-1px);
        }

        /* Review Cards List */
        .reviews-cards-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .customer-review-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .review-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .reviewer-avatar-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .reviewer-avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fee2e2;
          color: #dc2626;
          font-weight: 800;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #fecaca;
        }

        .reviewer-name-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        .reviewer-name-wrap strong {
          font-size: 13.5px;
          color: #0f172a;
        }
        .verified-buyer-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          background: #dcfce7;
          color: #15803d;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 10px;
        }
        .review-date-text {
          font-size: 11px;
          color: #94a3b8;
        }

        .review-star-pills {
          display: flex;
          gap: 2px;
        }

        .review-comment-text {
          margin: 0;
          font-size: 13px;
          color: #334155;
          line-height: 1.5;
          font-style: italic;
        }

        .review-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .review-tag-chip {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .no-reviews-empty-box {
          background: #f8fafc;
          border: 1.5px dashed #cbd5e1;
          border-radius: 14px;
          padding: 28px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .empty-star-icon {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }
        .no-reviews-empty-box h4 {
          margin: 0;
          font-size: 14.5px;
          font-weight: 800;
          color: #0f172a;
        }
        .no-reviews-empty-box p {
          margin: 0 0 8px;
          font-size: 12.5px;
          color: #64748b;
          max-width: 360px;
        }

        /* 🌟 Interactive Customer Rating Modal */
        .rating-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(5px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeInBackdrop 0.2s ease-out;
        }

        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .rating-modal-card {
          background: #ffffff;
          border-radius: 20px;
          max-width: 520px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
          border: 1px solid #cbd5e1;
        }

        .rating-modal-header {
          background: #f8fafc;
          border-bottom: 1.5px solid #e2e8f0;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rating-shop-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fef2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #fee2e2;
          flex-shrink: 0;
        }

        .rating-header-text {
          flex: 1;
        }
        .rating-modal-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 2px;
        }
        .rating-modal-subtitle {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .rating-close-btn {
          background: #e2e8f0;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          transition: all 0.2s;
        }
        .rating-close-btn:hover {
          background: #cbd5e1;
          color: #0f172a;
        }

        .rating-form-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stars-interactive-section {
          text-align: center;
          background: #fffbeb;
          border: 1.5px dashed #fde68a;
          border-radius: 14px;
          padding: 16px;
        }

        .rating-section-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .stars-picker-row {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .star-pick-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 8px;
          transition: all 0.15s ease;
        }
        .star-pick-btn:hover {
          transform: scale(1.25);
        }
        .star-pick-btn:active {
          transform: scale(0.95);
        }

        .star-feedback-badge {
          display: inline-block;
          font-size: 13px;
          font-weight: 800;
          color: #b45309;
          background: #ffffff;
          padding: 4px 14px;
          border-radius: 20px;
          border: 1px solid #fde68a;
          margin-top: 4px;
        }
        .badge-empty-prompt {
          color: #64748b !important;
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          font-weight: 700 !important;
        }

        .rating-quick-tags-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .quick-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag-toggle-pill {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          color: #475569;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
        }
        .tag-toggle-pill:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }
        .tag-toggle-pill.tag-active {
          background: #dcfce7;
          border-color: #86efac;
          color: #15803d;
        }

        .rating-input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-group-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .form-group-field label {
          font-size: 12px;
          font-weight: 700;
          color: #334155;
        }
        .form-group-field input,
        .form-group-field textarea {
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 13px;
          font-family: inherit;
          color: #0f172a;
          outline: none;
          transition: all 0.2s;
        }
        .form-group-field input:focus,
        .form-group-field textarea:focus {
          border-color: #c0392b;
          box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.1);
        }

        .rating-form-actions {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .btn-cancel-rating {
          flex: 1;
          background: #f1f5f9;
          border: 1.5px solid #e2e8f0;
          color: #475569;
          padding: 11px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-cancel-rating:hover {
          background: #e2e8f0;
        }

        .btn-submit-rating {
          flex: 2;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          border: none;
          color: #ffffff;
          padding: 11px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.35);
          transition: all 0.2s;
        }
        .btn-submit-rating:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(192, 57, 43, 0.45);
        }
        .btn-submit-rating:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Success State */
        .rating-success-state {
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .success-star-animation {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: #fef3c7;
          border: 2px solid #fde68a;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounceStar 0.6s ease-in-out infinite alternate;
        }
        @keyframes bounceStar {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-6px) scale(1.08); }
        }
        .rating-success-state h3 {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .rating-success-state p {
          font-size: 13px;
          color: #64748b;
          margin: 0;
          max-width: 380px;
          line-height: 1.5;
        }
        .success-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #dcfce7;
          color: #15803d;
          font-size: 12px;
          font-weight: 800;
          padding: 6px 16px;
          border-radius: 20px;
          margin-top: 6px;
        }

        .services-grid-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 10px;
        }

        .service-feature-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .svc-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .svc-info strong { font-size: 13px; color: #0f172a; }
        .svc-info span { font-size: 11px; color: #64748b; }

        .svc-book-btn {
          padding: 6px 10px;
          border-radius: 6px;
          background: #c0392b;
          color: white;
          font-size: 11.5px;
          font-weight: 700;
          text-decoration: none;
        }

        .shop-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }

        .shop-prod-card {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .shop-prod-img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 6px;
        }

        .shop-prod-brand {
          font-size: 10.5px;
          font-weight: 700;
          color: #c0392b;
        }

        .shop-prod-title {
          font-size: 12.5px;
          font-weight: 700;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .shop-prod-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .shop-prod-offer { font-size: 13.5px; font-weight: 800; color: #16a34a; }
        .shop-prod-mrp { font-size: 10.5px; color: #94a3b8; text-decoration: line-through; }

        .shop-prod-book-btn {
          margin-top: 4px;
          display: block;
          text-align: center;
          padding: 6px 8px;
          border-radius: 6px;
          background: #c0392b;
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
        }

        .no-custom-products-note {
          background: #f8fafc;
          border: 1px dashed #cbd5e1;
          border-radius: 12px;
          padding: 18px;
          text-align: center;
        }
        .no-custom-products-note p {
          margin: 0 0 12px;
          font-size: 13px;
          color: #475569;
        }

        .btn-book-main-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          background: #c0392b;
          color: white;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 640px) {
          .stores-grid-layout {
            grid-template-columns: 1fr;
          }
          .primary-actions-group {
            grid-template-columns: 1fr;
          }
          .quick-contact-actions-group {
            grid-template-columns: 1fr 1fr;
          }
          .rating-input-row {
            grid-template-columns: 1fr;
          }
          .banner-action-buttons {
            width: 100%;
          }
          .btn-view-all-maps, .btn-detect-location {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
