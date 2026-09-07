// Master TyreSaathi Catalog & Mega Menu Database

export const MEGA_MENU_BRANDS = [
  { name: "Apollo", popular: true, count: "120+ Products" },
  { name: "Bridgestone", popular: true, count: "95+ Products" },
  { name: "Ceat", popular: true, count: "140+ Products" },
  { name: "Continental", popular: true, count: "60+ Products" },
  { name: "Clearance", tag: "Sale", count: "Special Deals" },
  { name: "Firestone", count: "35+ Products" },
  { name: "Goodyear", popular: true, count: "80+ Products" },
  { name: "JK Tyre", popular: true, count: "110+ Products" },
  { name: "Kelly", count: "25+ Products" },
  { name: "Michelin", popular: true, count: "75+ Products" },
  { name: "Pirelli", popular: true, count: "45+ Products" },
  { name: "Vredestein", count: "30+ Products" },
  { name: "Ralco", popular: true, count: "55+ Products" },
  { name: "reise", count: "20+ Products" },
  { name: "TVS Eurogrip", popular: true, count: "90+ Products" },
  { name: "Vee Rubber", count: "15+ Products" },
  { name: "Metzeler", count: "25+ Products" },
  { name: "Metro", count: "40+ Products" },
  { name: "ARF", count: "18+ Products" },
  { name: "ARL", count: "12+ Products" },
  { name: "Auto Boss", count: "30+ Products" },
  { name: "Classic", count: "22+ Products" },
  { name: "Galaxy", count: "15+ Products" },
  { name: "Maruti", count: "28+ Products" },
  { name: "META GOLD", count: "16+ Products" },
  { name: "Moly Lube", count: "14+ Products" },
  { name: "NEO Wheels", tag: "Alloy", count: "40+ Designs" },
  { name: "Onyx", count: "20+ Products" },
  { name: "PLATI Alloy Wheels", tag: "Alloy", count: "50+ Designs" },
  { name: "MY TVS", count: "35+ Products" },
  { name: "MRF", popular: true, count: "180+ Products" },
  { name: "Yokohama", popular: true, count: "65+ Products" },
];

export const TYRE_CATEGORIES = [
  { id: "two_wheeler", name: "Two-Wheeler (Bike / Scooter / EV)", icon: "🏍️" },
  { id: "passenger_car", name: "Passenger Car & Hatchback", icon: "🚗" },
  { id: "suv_muv", name: "SUV & Compact MUV", icon: "🚙" },
  { id: "commercial", name: "Commercial (Truck / Bus / LCV)", icon: "🚚" },
  { id: "tractor_agri", name: "Tractor & Agriculture Farm", icon: "🚜" },
  { id: "auto_rickshaw", name: "Auto Rickshaw (3-Wheeler)", icon: "🛺" },
  { id: "otr_industrial", name: "OTR & Industrial Crane", icon: "🏗️" },
  { id: "alloy_wheels", name: "Alloy Wheels & Designer Rims", icon: "✨" },
];

export const VEHICLE_TYPES = {
  two_wheeler: ["Scooter (Activa, Jupiter, Access)", "Motorcycle (100cc-150cc)", "Sports Bike (150cc-400cc)", "Electric Scooter (Ola, Ather, Chetak)", "Bullet / Royal Enfield Classic"],
  passenger_car: ["Hatchback (Swift, WagonR, i10, Tiago)", "Sedan (City, Verna, Dzire, Amaze)", "Premium Sedan (Octavia, Camry)"],
  suv_muv: ["Compact SUV (Brezza, Nexon, Creta, Seltos)", "Full-Size SUV (Scorpio, Thar, Safari, Fortuner)", "MUV / MPV (Innova, Ertiga, Carens)"],
  commercial: ["Small LCV (Tata Ace, Bolero Maxi Truck)", "Medium LCV (Eicher, 407)", "Heavy Commercial (10-Wheeler, 12-Wheeler Truck)", "Intercity Bus / Volvo"],
  tractor_agri: ["Tractor Front Steering", "Tractor Rear Traction (12.4/13.6/14.9)", "Harvester & Trailer"],
  auto_rickshaw: ["Passenger 3-Wheeler (Bajaj, Piaggio)", "Cargo Load Carrier 3-Wheeler", "Electric Auto (E-Rickshaw)"],
  otr_industrial: ["JCB Backhoe Loader", "Forklift & Warehouse Crane", "Mining Tipper Dumper"],
  alloy_wheels: ["13 Inch Alloys", "14 Inch Alloys", "15 Inch Alloys", "16 Inch Alloys", "17+ Inch Diamond Cut Alloys"]
};

export const POPULAR_SIZES = {
  two_wheeler: ["90/90-12", "100/90-17", "80/100-18", "2.75-17", "3.00-18", "140/70-17", "110/80-17", "120/80-18", "90/100-10"],
  passenger_car: ["145/80 R12", "155/80 R13", "165/80 R14", "175/65 R14", "185/65 R15", "185/70 R14", "195/65 R15", "205/55 R16", "205/60 R16"],
  suv_muv: ["215/60 R16", "215/65 R16", "235/65 R17", "265/65 R17", "215/60 R17", "225/65 R17", "255/60 R18", "265/60 R18"],
  commercial: ["10.00-20", "295/80 R22.5", "7.50-16", "8.25-16", "11.00-20", "155 R13 LT", "7.00 R15 LT"],
  tractor_agri: ["6.00-16", "12.4-28", "13.6-28", "14.9-28", "7.50-16", "16.9-28"],
  auto_rickshaw: ["4.00-8", "4.50-10", "145/70 R12", "3.75-12"],
  otr_industrial: ["12.5/80-18", "14.00-24", "16.9-28", "23.5-25"],
  alloy_wheels: ["PCD 100 4-Hole (14 Inch)", "PCD 100 4-Hole (15 Inch)", "PCD 114.3 5-Hole (16 Inch)", "PCD 114.3 5-Hole (17 Inch)"]
};

export const POPULAR_PATTERNS = [
  "MRF Zapper FX (Tubeless)",
  "MRF Nylogrip Ezeeride",
  "MRF ZVTV Premium",
  "MRF Wanderer Street AT",
  "MRF Super Lug 50",
  "Apollo Amazer 4G Life",
  "Apollo Alnac 4G",
  "Apollo Apterra AT2",
  "Apollo ActiGrip R1",
  "CEAT Secura Zoom",
  "CEAT Milaze X3",
  "CEAT CrossDrive AT",
  "CEAT Gripp X3",
  "Bridgestone Turanza T005",
  "Bridgestone Ecopia EP150",
  "Bridgestone B290",
  "Bridgestone Dueler D684",
  "Michelin Primacy 4 ST",
  "Michelin Energy XM2+",
  "Michelin LTX Trail",
  "Goodyear Assurance TripleMax 2",
  "Goodyear Wrangler AT SilentTrac",
  "JK Tyre UX Royale",
  "JK Tyre Elanzo Touring",
  "TVS Eurogrip Dragon Tube/Tubeless",
  "Ralco Speed Blaster",
  "Yokohama Earth-1 E400",
  "Yokohama Geolandar A/T G015"
];

export const SERVICE_TYPES = [
  { id: "fitting", name: "New Tyre Fitting & Nitrogen Fill (फिटिंग)", duration: "20 Mins" },
  { id: "puncture", name: "Tubeless Puncture Repair (पंचर रिपेयर)", duration: "15 Mins" },
  { id: "cut_repair", name: "Tyre Cut & Sidewall Repair (टायर कट रिपेयर)", duration: "45 Mins" },
  { id: "doorstep", name: "Doorstep Emergency Assistance (घर/रास्ते पर सर्विस)", duration: "45 Mins" },
  { id: "rotation", name: "Tyre Rotation & Inspection (रोटेशन)", duration: "25 Mins" },
  { id: "nitrogen", name: "Nitrogen Air Fill - All 4 Tyres (नाइट्रोजन)", duration: "10 Mins" },
  { id: "tube_valve", name: "Tube Replacement & Valve Pin Fitting (ट्यूब/वॉल्व)", duration: "15 Mins" }
];

export const SAMPLE_SHOPS = [];

export const INITIAL_FEATURED_PRODUCTS = [];

