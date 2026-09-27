// src/utils/geoService.js - Robust Geolocation & Indian City Coordinate Resolver

// Comprehensive coordinates dictionary for Indian cities/towns
export const INDIAN_CITIES_COORDS = {
  // Chhattisgarh
  "raipur": { lat: 21.2514, lng: 81.6296, state: "Chhattisgarh" },
  "bhilai": { lat: 21.1938, lng: 81.3509, state: "Chhattisgarh" },
  "durg": { lat: 21.1904, lng: 81.2849, state: "Chhattisgarh" },
  "bilaspur": { lat: 22.0797, lng: 82.1409, state: "Chhattisgarh" },
  "korba": { lat: 22.3595, lng: 82.7501, state: "Chhattisgarh" },
  "rajnandgaon": { lat: 21.0971, lng: 81.0378, state: "Chhattisgarh" },
  "jagdalpur": { lat: 19.0743, lng: 82.0088, state: "Chhattisgarh" },
  "ambikapur": { lat: 23.1189, lng: 83.1979, state: "Chhattisgarh" },
  "dhamtari": { lat: 20.7071, lng: 81.5498, state: "Chhattisgarh" },
  "mahasamund": { lat: 21.1084, lng: 82.0963, state: "Chhattisgarh" },
  "balod": { lat: 20.7303, lng: 81.2052, state: "Chhattisgarh" },
  "bemetara": { lat: 21.7019, lng: 81.5369, state: "Chhattisgarh" },
  "kanker": { lat: 20.2719, lng: 81.4925, state: "Chhattisgarh" },
  "champa": { lat: 22.0435, lng: 82.6568, state: "Chhattisgarh" },
  "raigarh": { lat: 21.8974, lng: 83.3950, state: "Chhattisgarh" },
  
  // Telangana & Andhra Pradesh
  "hyderabad": { lat: 17.3850, lng: 78.4867, state: "Telangana" },
  "secunderabad": { lat: 17.4399, lng: 78.4983, state: "Telangana" },
  "warangal": { lat: 17.9689, lng: 79.5941, state: "Telangana" },
  "nidigonda": { lat: 17.7200, lng: 79.2500, state: "Telangana" },
  "jangaon": { lat: 17.7219, lng: 79.1622, state: "Telangana" },
  "karimnagar": { lat: 18.4386, lng: 79.1288, state: "Telangana" },
  "nizamabad": { lat: 18.6725, lng: 78.0941, state: "Telangana" },
  "khammam": { lat: 17.2473, lng: 80.1514, state: "Telangana" },
  "visakhapatnam": { lat: 17.6868, lng: 83.2185, state: "Andhra Pradesh" },
  "vijayawada": { lat: 16.5062, lng: 80.6480, state: "Andhra Pradesh" },
  "guntur": { lat: 16.3067, lng: 80.4365, state: "Andhra Pradesh" },
  "tirupati": { lat: 13.6288, lng: 79.4192, state: "Andhra Pradesh" },
  
  // Bihar (All Major Districts & Hubs)
  "patna": { lat: 25.5941, lng: 85.1376, state: "Bihar" },
  "gaya": { lat: 24.7914, lng: 85.0002, state: "Bihar" },
  "muzaffarpur": { lat: 26.1209, lng: 85.3647, state: "Bihar" },
  "bhagalpur": { lat: 25.2425, lng: 86.9842, state: "Bihar" },
  "darbhanga": { lat: 26.1542, lng: 85.8918, state: "Bihar" },
  "purnia": { lat: 25.7771, lng: 87.4753, state: "Bihar" },
  "purnea": { lat: 25.7771, lng: 87.4753, state: "Bihar" },
  "begusarai": { lat: 25.4182, lng: 86.1272, state: "Bihar" },
  "arrah": { lat: 25.5541, lng: 84.6667, state: "Bihar" },
  "ara": { lat: 25.5541, lng: 84.6667, state: "Bihar" },
  "chhapra": { lat: 25.7796, lng: 84.7499, state: "Bihar" },
  "chapra": { lat: 25.7796, lng: 84.7499, state: "Bihar" },
  "katihar": { lat: 25.5538, lng: 87.5684, state: "Bihar" },
  "munger": { lat: 25.3757, lng: 86.4744, state: "Bihar" },
  "saharsa": { lat: 25.8835, lng: 86.6006, state: "Bihar" },
  "sasaram": { lat: 24.9528, lng: 84.0315, state: "Bihar" },
  "hajipur": { lat: 25.6858, lng: 85.2090, state: "Bihar" },
  "dehri": { lat: 24.9080, lng: 84.1843, state: "Bihar" },
  "bettiah": { lat: 26.8024, lng: 84.5020, state: "Bihar" },
  "motihari": { lat: 26.6469, lng: 84.9089, state: "Bihar" },
  "siwan": { lat: 26.2196, lng: 84.3567, state: "Bihar" },
  "gopalganj": { lat: 26.4687, lng: 84.4441, state: "Bihar" },
  "samastipur": { lat: 25.8629, lng: 85.7811, state: "Bihar" },
  "madhubani": { lat: 26.3547, lng: 86.0718, state: "Bihar" },
  "sitamarhi": { lat: 26.5944, lng: 85.4893, state: "Bihar" },
  "buxar": { lat: 25.5647, lng: 83.9777, state: "Bihar" },
  "kishanganj": { lat: 26.0968, lng: 87.9435, state: "Bihar" },
  "jehanabad": { lat: 25.2140, lng: 84.9862, state: "Bihar" },
  "aurangabad": { lat: 24.7539, lng: 84.3742, state: "Bihar" },
  "nawada": { lat: 24.8872, lng: 85.5414, state: "Bihar" },
  "bihar sharif": { lat: 25.1982, lng: 85.5149, state: "Bihar" },
  "nalanda": { lat: 25.1982, lng: 85.5149, state: "Bihar" },
  "supaul": { lat: 26.1260, lng: 86.5976, state: "Bihar" },
  "araria": { lat: 26.1509, lng: 87.5152, state: "Bihar" },
  "khagaria": { lat: 25.5028, lng: 86.4830, state: "Bihar" },
  "madhepura": { lat: 25.9263, lng: 86.7937, state: "Bihar" },
  "jamui": { lat: 24.9260, lng: 86.2238, state: "Bihar" },
  "lakhisarai": { lat: 25.1764, lng: 86.0945, state: "Bihar" },
  "sheikhpura": { lat: 25.1408, lng: 85.8624, state: "Bihar" },
  "banka": { lat: 24.8824, lng: 86.9242, state: "Bihar" },
  "bhabua": { lat: 25.0450, lng: 83.6139, state: "Bihar" },
  "kaimur": { lat: 25.0450, lng: 83.6139, state: "Bihar" },
  "vaishali": { lat: 25.9868, lng: 85.1278, state: "Bihar" },
  "rohtas": { lat: 24.9528, lng: 84.0315, state: "Bihar" },

  // Metro & Major Cities across India
  "delhi": { lat: 28.6139, lng: 77.2090, state: "Delhi" },
  "new delhi": { lat: 28.6139, lng: 77.2090, state: "Delhi" },
  "noida": { lat: 28.5355, lng: 77.3910, state: "Uttar Pradesh" },
  "gurgaon": { lat: 28.4595, lng: 77.0266, state: "Haryana" },
  "gurugram": { lat: 28.4595, lng: 77.0266, state: "Haryana" },
  "mumbai": { lat: 19.0760, lng: 72.8777, state: "Maharashtra" },
  "pune": { lat: 18.5204, lng: 73.8567, state: "Maharashtra" },
  "nagpur": { lat: 21.1458, lng: 79.0882, state: "Maharashtra" },
  "kolkata": { lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  "bengaluru": { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  "bangalore": { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  "chennai": { lat: 13.0827, lng: 80.2707, state: "Tamil Nadu" },
  "ahmedabad": { lat: 23.0225, lng: 72.5714, state: "Gujarat" },
  "surat": { lat: 21.1702, lng: 72.8311, state: "Gujarat" },
  "jaipur": { lat: 26.9124, lng: 75.7873, state: "Rajasthan" },
  "lucknow": { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" },
  "kanpur": { lat: 26.4499, lng: 80.3319, state: "Uttar Pradesh" },
  "indore": { lat: 22.7196, lng: 75.8577, state: "Madhya Pradesh" },
  "bhopal": { lat: 23.2599, lng: 77.4126, state: "Madhya Pradesh" },
  "jabalpur": { lat: 23.1815, lng: 79.9864, state: "Madhya Pradesh" },
  "ranchi": { lat: 23.3441, lng: 85.3096, state: "Jharkhand" },
  "jamshedpur": { lat: 22.8046, lng: 86.2029, state: "Jharkhand" },
  "bhubaneswar": { lat: 20.2961, lng: 85.8245, state: "Odisha" },
  "cuttack": { lat: 20.4625, lng: 85.8828, state: "Odisha" },
  "varanasi": { lat: 25.3176, lng: 82.9739, state: "Uttar Pradesh" },
  "prayagraj": { lat: 25.4358, lng: 81.8463, state: "Uttar Pradesh" },
  "allahabad": { lat: 25.4358, lng: 81.8463, state: "Uttar Pradesh" },
  "chandigarh": { lat: 30.7333, lng: 76.7794, state: "Punjab" },
  "ludhiana": { lat: 30.9010, lng: 75.8573, state: "Punjab" },
  "amritsar": { lat: 31.6340, lng: 74.8723, state: "Punjab" }
};

// Fallback Default Coordinate (Raipur, CG)
export const DEFAULT_COORDS = {
  lat: 21.2514,
  lng: 81.6296,
  city: "Raipur",
  region: "Chhattisgarh",
  country: "India",
  source: "default"
};

/**
 * Haversine formula to compute exact distance between two coordinates in Kilometers
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === null || lat1 === undefined || lon1 === null || lon1 === undefined) return null;
  if (lat2 === null || lat2 === undefined || lon2 === null || lon2 === undefined) return null;

  const nLat1 = Number(lat1);
  const nLon1 = Number(lon1);
  const nLat2 = Number(lat2);
  const nLon2 = Number(lon2);

  if (isNaN(nLat1) || isNaN(nLon1) || isNaN(nLat2) || isNaN(nLon2)) return null;

  const R = 6371; // Earth's radius in KM
  const dLat = (nLat2 - nLat1) * (Math.PI / 180);
  const dLon = (nLon2 - nLon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(nLat1 * (Math.PI / 180)) *
      Math.cos(nLat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Number(distance.toFixed(1));
}

/**
 * Format distance in a user-friendly string (e.g., "450 m" or "2.4 km")
 */
export function formatDistanceString(distanceKm) {
  if (distanceKm === null || distanceKm === undefined || isNaN(distanceKm)) {
    return "Distance N/A";
  }
  const num = Number(distanceKm);
  if (num < 1) {
    const meters = Math.round(num * 1000);
    return `${meters} m`;
  }
  return `${num.toFixed(1)} km`;
}

/**
 * Resolve coordinates for a shop based on explicit GPS or its city/address name
 */
export function resolveShopCoordinates(shop) {
  if (!shop) return { lat: null, lng: null, hasExactGps: false };

  // 1. Explicit GPS Lat/Lng if valid
  if (
    shop.lat !== undefined &&
    shop.lat !== null &&
    shop.lng !== undefined &&
    shop.lng !== null &&
    !isNaN(Number(shop.lat)) &&
    !isNaN(Number(shop.lng)) &&
    Number(shop.lat) !== 0 &&
    Number(shop.lng) !== 0
  ) {
    return {
      lat: Number(shop.lat),
      lng: Number(shop.lng),
      hasExactGps: true,
      city: shop.city || ""
    };
  }

  // 2. Lookup city name in Indian cities coordinate database
  const cityName = (shop.city || "").toLowerCase().trim();
  if (cityName && INDIAN_CITIES_COORDS[cityName]) {
    const matched = INDIAN_CITIES_COORDS[cityName];
    return {
      lat: matched.lat,
      lng: matched.lng,
      hasExactGps: false,
      city: shop.city,
      isCityMatch: true
    };
  }

  // 3. Search address for city names
  const addressText = (shop.address || "").toLowerCase();
  for (const [key, val] of Object.entries(INDIAN_CITIES_COORDS)) {
    if (addressText.includes(key)) {
      return {
        lat: val.lat,
        lng: val.lng,
        hasExactGps: false,
        city: `${key.charAt(0).toUpperCase() + key.slice(1)}, ${val.state}`,
        isCityMatch: true
      };
    }
  }

  // 4. Search shop name for known town/city names (e.g. "Nidigonda puncture shop")
  const nameText = `${shop.name || ""} ${shop.shopName || ""}`.toLowerCase();
  for (const [key, val] of Object.entries(INDIAN_CITIES_COORDS)) {
    if (nameText.includes(key)) {
      return {
        lat: val.lat,
        lng: val.lng,
        hasExactGps: false,
        city: `${key.charAt(0).toUpperCase() + key.slice(1)}, ${val.state}`,
        isCityMatch: true
      };
    }
  }

  // Fallback
  return {
    lat: null,
    lng: null,
    hasExactGps: false,
    city: shop.city || ""
  };
}

/**
 * Multi-layer Live Location Detection:
 * 1. HTML5 Geolocation (High accuracy GPS / Wi-Fi)
 * 2. ipwho.is IP Geolocation
 * 3. ipapi.co IP Geolocation
 * 4. freeipapi.com fallback
 * 5. Cached location from localStorage
 */
export async function getLiveUserLocation() {
  // Step A: Try HTML5 Browser Geolocation first
  const gpsLocation = await new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: Number(pos.coords.latitude.toFixed(6)),
          lng: Number(pos.coords.longitude.toFixed(6)),
          accuracy: Math.round(pos.coords.accuracy || 0),
          source: "gps",
          timestamp: Date.now()
        });
      },
      (err) => {
        console.warn("HTML5 Geolocation timed out or denied:", err.message);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 60000
      }
    );
  });

  if (gpsLocation) {
    // Attempt reverse geocode to get city name
    try {
      const revRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${gpsLocation.lat}&longitude=${gpsLocation.lng}&localityLanguage=en`
      );
      if (revRes.ok) {
        const revData = await revRes.json();
        gpsLocation.city = revData.city || revData.locality || revData.principalSubdivision || "";
        gpsLocation.region = revData.principalSubdivision || "";
        gpsLocation.country = revData.countryName || "India";
      }
    } catch (e) {
      // ignore
    }

    try {
      localStorage.setItem("tyresaathi_last_known_location", JSON.stringify(gpsLocation));
    } catch (e) {}

    return gpsLocation;
  }

  // Step B: Try ipwho.is (Reliable HTTPS API with generous free tier)
  try {
    const ipRes = await fetch("https://ipwho.is/");
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      if (ipData && ipData.success && ipData.latitude && ipData.longitude) {
        const ipLocation = {
          lat: Number(ipData.latitude),
          lng: Number(ipData.longitude),
          city: ipData.city || "",
          region: ipData.region || "",
          country: ipData.country || "India",
          source: "ip_ipwhois",
          timestamp: Date.now()
        };
        try {
          localStorage.setItem("tyresaathi_last_known_location", JSON.stringify(ipLocation));
        } catch (e) {}
        return ipLocation;
      }
    }
  } catch (e) {
    console.warn("ipwho.is notice:", e.message);
  }

  // Step C: Try ipapi.co
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        const loc = {
          lat: Number(data.latitude),
          lng: Number(data.longitude),
          city: data.city || "",
          region: data.region || "",
          country: data.country_name || "India",
          source: "ip_ipapi",
          timestamp: Date.now()
        };
        try {
          localStorage.setItem("tyresaathi_last_known_location", JSON.stringify(loc));
        } catch (e) {}
        return loc;
      }
    }
  } catch (e) {
    console.warn("ipapi.co notice:", e.message);
  }

  // Step D: Try freeipapi.com
  try {
    const res = await fetch("https://freeipapi.com/api/json");
    if (res.ok) {
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        const loc = {
          lat: Number(data.latitude),
          lng: Number(data.longitude),
          city: data.cityName || "",
          region: data.regionName || "",
          country: data.countryName || "India",
          source: "ip_freeipapi",
          timestamp: Date.now()
        };
        try {
          localStorage.setItem("tyresaathi_last_known_location", JSON.stringify(loc));
        } catch (e) {}
        return loc;
      }
    }
  } catch (e) {
    console.warn("freeipapi notice:", e.message);
  }

  // Step E: Check cached localStorage
  try {
    const cached = localStorage.getItem("tyresaathi_last_known_location");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.lat && parsed.lng) {
        return parsed;
      }
    }
  } catch (e) {}

  // Step F: Default fallback
  return DEFAULT_COORDS;
}
