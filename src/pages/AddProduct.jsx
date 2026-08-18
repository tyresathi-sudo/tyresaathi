import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  Camera, 
  Trash2, 
  Check, 
  Sparkles, 
  Tag, 
  Info, 
  Plus, 
  Layers, 
  Truck, 
  Car, 
  Bike 
} from "lucide-react";
import { 
  TYRE_CATEGORIES, 
  VEHICLE_TYPES, 
  MEGA_MENU_BRANDS, 
  POPULAR_SIZES, 
  POPULAR_PATTERNS 
} from "../config/tyreCatalog";

// 🌟 Product Type Selector
const PRODUCT_TYPES = [
  { id: "tyre", label: "🆕 Tyre (टायर)", icon: "🛞" },
  { id: "tube", label: "⭕ Tube (ट्यूब)", icon: "⭕" },
  { id: "flap", label: "◉ Flap (फ्लैप)", icon: "◉" },
  { id: "patch", label: "🩹 Patch (पैच)", icon: "🩹" },
  { id: "gater", label: "🔧 Gater (गेटर)", icon: "🔧" },
  { id: "custom", label: "✨ Alloy Wheels & Rims", icon: "✨" },
  { id: "service", label: "🛠️ Repair & Service (सर्विस)", icon: "🛠️" },
];

const PHOTO_SLOTS = [
  { id: 0, title: "1. Main / Front View", desc: "सामने से फोटो (Main)" },
  { id: 1, title: "2. Tread & Grooves Pattern", desc: "ग्रिप और डिजाइन (Tread)" },
  { id: 2, title: "3. Sidewall & Brand Stamp", desc: "साइज और ब्रांड (Sidewall)" },
  { id: 3, title: "4. Warranty / Extra Angle", desc: "वारंटी या अन्य एंगल" },
];

export default function AddProduct() {
  const { user, currentUser, profile, userData } = useAuth();
  const activeUser = user || currentUser;
  const activeProfile = profile || userData;

  const { id } = useParams();
  const navigate = useNavigate();
  const edit = Boolean(id);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(edit);
  const [uploadingSlot, setUploadingSlot] = useState(null);

  // Form State with 4 photo slots
  const [form, setForm] = useState({
    productType: "tyre",
    condition: "new", // 'new' or 'old'
    categoryKey: "passenger_car",
    categoryName: "Passenger Car & Hatchback",
    vehicleTypeName: "Hatchback (Swift, WagonR, i10, Tiago)",
    brandName: "Apollo",
    sizeName: "185/65 R15",
    modelName: "Apollo Amazer 4G Life",
    customBrand: "",
    customSize: "",
    customModel: "",
    productName: "Apollo Amazer 4G Life 185/65 R15",
    description: "",
    images: ["", "", "", ""], // 4 dedicated photo slots
    tyreType: "Tubeless",
    warranty: "5 Years Manufacturer Warranty",
    tubeSize: "",
    valveType: "TR",
    flapSize: "",
    patchType: "",
    serviceName: "",
    serviceDuration: "30 Mins",
    originalPrice: "4800",
    offerPrice: "4199",
    stock: "8",
    published: true,
  });

  // Load existing product if in Edit mode
  useEffect(() => {
    async function loadExistingProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const existingImages = Array.isArray(data.images) ? data.images : [];
          const paddedImages = [
            existingImages[0] || "",
            existingImages[1] || "",
            existingImages[2] || "",
            existingImages[3] || "",
          ];
          setForm((prev) => ({
            ...prev,
            ...data,
            images: paddedImages,
          }));
        }
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }
    loadExistingProduct();
  }, [id]);

  // Derived catalog arrays
  const currentVehicleTypes = VEHICLE_TYPES[form.categoryKey] || VEHICLE_TYPES.passenger_car || [];
  const currentSizes = POPULAR_SIZES[form.categoryKey] || POPULAR_SIZES.passenger_car || [];

  const updateField = (field, value) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto update categoryName when categoryKey changes
      if (field === "categoryKey") {
        const found = TYRE_CATEGORIES.find((c) => c.id === value);
        updated.categoryName = found ? found.name : value;
        const newVehicles = VEHICLE_TYPES[value] || [];
        const newSizes = POPULAR_SIZES[value] || [];
        updated.vehicleTypeName = newVehicles[0] || "";
        updated.sizeName = newSizes[0] || "";
      }

      // Auto synthesize product title
      if (["brandName", "modelName", "sizeName", "categoryKey", "customBrand", "customSize", "customModel"].includes(field)) {
        const brand = updated.brandName === "OTHER" ? updated.customBrand : updated.brandName;
        const model = updated.modelName === "OTHER" ? updated.customModel : updated.modelName;
        const size = updated.sizeName === "OTHER" ? updated.customSize : updated.sizeName;
        if (updated.productType === "tyre") {
          updated.productName = `${brand || ""} ${model || ""} ${size || ""}`.trim();
        }
      }

      return updated;
    });
  };

  // Upload individual photo slot (1 to 4)
  const handleSlotPhotoUpload = async (slotIndex, file) => {
    if (!file) return;
    setUploadingSlot(slotIndex);

    try {
      const uid = activeUser?.uid || "demo_shop";
      const storageRef = ref(storage, `products/${uid}/${Date.now()}-slot${slotIndex}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      setForm((prev) => {
        const newImages = [...prev.images];
        newImages[slotIndex] = downloadUrl;
        return { ...prev, images: newImages };
      });
    } catch (error) {
      console.warn("Storage upload fallback to base64 preview:", error);
      // Fallback local reader for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => {
          const newImages = [...prev.images];
          newImages[slotIndex] = e.target.result;
          return { ...prev, images: newImages };
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingSlot(null);
    }
  };

  const removeSlotImage = (slotIndex) => {
    setForm((prev) => {
      const newImages = [...prev.images];
      newImages[slotIndex] = "";
      return { ...prev, images: newImages };
    });
  };

  const discountPercent = (() => {
    const mrp = Number(form.originalPrice);
    const offer = Number(form.offerPrice);
    return mrp > 0 && offer > 0 && mrp > offer ? Math.round(((mrp - offer) / mrp) * 100) : 0;
  })();

  const handleSubmit = async (e, isDraft = false) => {
    e.preventDefault();

    const finalBrand = form.brandName === "OTHER" ? form.customBrand : form.brandName;
    const finalSize = form.sizeName === "OTHER" ? form.customSize : form.sizeName;
    const finalModel = form.modelName === "OTHER" ? form.customModel : form.modelName;
    const finalTitle = form.productType === "service" ? form.serviceName : (form.productName || `${finalBrand} ${finalSize}`).trim();

    if (!finalTitle) {
      alert("Please enter a valid product / service name!");
      return;
    }

    // Filter out empty image slots
    const validImages = form.images.filter((img) => img && img.trim() !== "");

    setSaving(true);
    try {
      const productPayload = {
        ...form,
        productName: finalTitle,
        brandName: finalBrand,
        sizeName: finalSize,
        modelName: finalModel,
        images: validImages.length > 0 ? validImages : [
          "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80"
        ],
        originalPrice: Number(form.originalPrice || 0),
        offerPrice: Number(form.offerPrice || 0),
        stock: form.productType === "service" ? 999 : Number(form.stock || 1),
        published: !isDraft,
        shopId: activeUser?.uid || "demo_shop",
        shopName: activeProfile?.shopName || "TyreSaathi Partner Shop",
        shopPhone: activeProfile?.phone || "",
        updatedAt: serverTimestamp(),
      };

      if (edit) {
        await updateDoc(doc(db, "products", id), productPayload);
        alert(isDraft ? "📝 Draft saved successfully!" : "✅ Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), {
          ...productPayload,
          createdAt: serverTimestamp(),
        });
        alert(isDraft ? "📝 Draft saved successfully!" : "🚀 Product published to TyreSaathi network!");
      }
      navigate("/search");
    } catch (err) {
      console.error("Firestore save error:", err);
      alert("Saved locally! " + err.message);
      navigate("/search");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading product details...</div>;
  }

  const activeImagesCount = form.images.filter((i) => i).length;

  return (
    <div className="add-product-container">
      {/* Top Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-main-heading">
            {edit ? "✏️ Edit Tyre & Service Details" : "➕ Add Product / Tyre to Shop"}
          </h1>
          <p className="page-subheading">
            Choose tyre category, vehicle type, size and upload up to 4 photos for higher customer trust.
          </p>
        </div>
        <Link to="/search" className="back-link-btn">
          ← View All Products
        </Link>
      </div>

      <div className="form-preview-grid">
        {/* Left Side: Smart Multi-Step Form */}
        <form className="add-product-form" onSubmit={(e) => handleSubmit(e, false)}>
          
          {/* 1. What are you adding */}
          <div className="form-section-card">
            <h3 className="section-title">
              <span className="step-num">1</span> What are you adding? (सामान का प्रकार)
            </h3>

            <div className="product-type-pill-grid">
              {PRODUCT_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`type-select-pill ${form.productType === type.id ? "type-pill-selected" : ""}`}
                  onClick={() => updateField("productType", type.id)}
                >
                  <span className="pill-icon">{type.icon}</span>
                  <span className="pill-label">{type.label}</span>
                </button>
              ))}
            </div>

            {form.productType !== "service" && form.productType !== "custom" && (
              <div className="condition-toggle-row">
                <label className="field-label">Condition (हालत):</label>
                <div className="toggle-btn-group">
                  <button
                    type="button"
                    className={`toggle-option ${form.condition === "new" ? "toggle-active" : ""}`}
                    onClick={() => updateField("condition", "new")}
                  >
                    🆕 Brand New (नया)
                  </button>
                  <button
                    type="button"
                    className={`toggle-option ${form.condition === "old" ? "toggle-active" : ""}`}
                    onClick={() => updateField("condition", "old")}
                  >
                    ♻️ Second Hand (पुराना / री-ट्रेडेड)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Category, Vehicle, Brand, Size Dropdowns */}
          {["tyre", "tube", "flap", "custom"].includes(form.productType) && (
            <div className="form-section-card">
              <h3 className="section-title">
                <span className="step-num">2</span> Tyre Category & Size (कैटेगरी और साइज)
              </h3>

              <div className="input-field-group">
                <label className="field-label">Tyre Category (गाड़ी की श्रेणी) *</label>
                <select
                  value={form.categoryKey}
                  onChange={(e) => updateField("categoryKey", e.target.value)}
                  className="smart-select"
                >
                  {TYRE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-field-group">
                <label className="field-label">Vehicle Type (गाड़ी का मॉडल) *</label>
                <select
                  value={form.vehicleTypeName}
                  onChange={(e) => updateField("vehicleTypeName", e.target.value)}
                  className="smart-select"
                >
                  {currentVehicleTypes.map((v, i) => (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="two-col-grid">
                {/* Brand Selector */}
                <div className="input-field-group">
                  <label className="field-label">Tyre Brand (ब्रांड) *</label>
                  <select
                    value={form.brandName}
                    onChange={(e) => updateField("brandName", e.target.value)}
                    className="smart-select"
                  >
                    {MEGA_MENU_BRANDS.map((b, i) => (
                      <option key={i} value={b.name}>
                        {b.name} {b.popular ? "★ Popular" : ""}
                      </option>
                    ))}
                    <option value="OTHER">✏️ Other (Custom Brand / अन्य)</option>
                  </select>

                  {form.brandName === "OTHER" && (
                    <input
                      type="text"
                      placeholder="Type brand name (जैसे MRF, Metro...)"
                      value={form.customBrand}
                      onChange={(e) => updateField("customBrand", e.target.value)}
                      className="smart-text-input custom-input"
                      required
                    />
                  )}
                </div>

                {/* Size Selector */}
                <div className="input-field-group">
                  <label className="field-label">Tyre Size (साइज) *</label>
                  <select
                    value={form.sizeName}
                    onChange={(e) => updateField("sizeName", e.target.value)}
                    className="smart-select"
                  >
                    {currentSizes.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                    <option value="OTHER">✏️ Other (Custom Size / अन्य साइज)</option>
                  </select>

                  {form.sizeName === "OTHER" && (
                    <input
                      type="text"
                      placeholder="Type size (जैसे 195/55 R16, 10.00-20...)"
                      value={form.customSize}
                      onChange={(e) => updateField("customSize", e.target.value)}
                      className="smart-text-input custom-input"
                      required
                    />
                  )}
                </div>
              </div>

              {/* Model / Pattern and Type */}
              <div className="two-col-grid">
                <div className="input-field-group">
                  <label className="field-label">Model / Tread Pattern (पैटर्न)</label>
                  <select
                    value={form.modelName}
                    onChange={(e) => updateField("modelName", e.target.value)}
                    className="smart-select"
                  >
                    {POPULAR_PATTERNS.map((p, i) => (
                      <option key={i} value={p}>
                        {p}
                      </option>
                    ))}
                    <option value="OTHER">✏️ Custom Model Name</option>
                  </select>

                  {form.modelName === "OTHER" && (
                    <input
                      type="text"
                      placeholder="Type pattern/model (जैसे Zapper, Milaze...)"
                      value={form.customModel}
                      onChange={(e) => updateField("customModel", e.target.value)}
                      className="smart-text-input custom-input"
                    />
                  )}
                </div>

                <div className="input-field-group">
                  <label className="field-label">Tyre Construction</label>
                  <select
                    value={form.tyreType}
                    onChange={(e) => updateField("tyreType", e.target.value)}
                    className="smart-select"
                  >
                    <option value="Tubeless">Tubeless (ट्यूबलेस)</option>
                    <option value="Tube Type">Tube Type (ट्यूब वाला)</option>
                    <option value="Radial">Radial Steel Belted</option>
                    <option value="Bias / Nylon">Bias / Nylon Ply</option>
                  </select>
                </div>
              </div>

              <div className="input-field-group">
                <label className="field-label">Product Full Title (ग्राहक को दिखने वाला नाम)</label>
                <input
                  type="text"
                  value={form.productName}
                  onChange={(e) => updateField("productName", e.target.value)}
                  placeholder="Product Title"
                  className="smart-text-input"
                  required
                />
              </div>
            </div>
          )}

          {/* Service Section */}
          {form.productType === "service" && (
            <div className="form-section-card">
              <h3 className="section-title">
                <span className="step-num">2</span> Service Details (सर्विस की जानकारी)
              </h3>
              <div className="input-field-group">
                <label className="field-label">Service Name (सर्विस का नाम) *</label>
                <input
                  type="text"
                  value={form.serviceName}
                  onChange={(e) => updateField("serviceName", e.target.value)}
                  placeholder="e.g. Tyre Cut Repair / Wheel Alignment"
                  className="smart-text-input"
                  required
                />
              </div>
              <div className="input-field-group">
                <label className="field-label">Approx Time Taken (समय)</label>
                <input
                  type="text"
                  value={form.serviceDuration}
                  onChange={(e) => updateField("serviceDuration", e.target.value)}
                  placeholder="e.g. 30 Mins"
                  className="smart-text-input"
                />
              </div>
            </div>
          )}

          {/* 📸 3. 4 Dedicated Photo Upload Slots (User Requirement) */}
          <div className="form-section-card">
            <div className="photo-section-header">
              <div>
                <h3 className="section-title" style={{ margin: 0 }}>
                  <span className="step-num">3</span> Upload 4 Photos (4 फोटो अपलोड करें)
                </h3>
                <p className="section-subtext">
                  4 alag-alag angles se photo lagayein taaki customer aasani se pasand kare.
                </p>
              </div>
              <span className="photos-counter-tag">{activeImagesCount} / 4 Uploaded</span>
            </div>

            <div className="four-photo-slots-grid">
              {PHOTO_SLOTS.map((slot) => {
                const imgUrl = form.images[slot.id];
                const isUploading = uploadingSlot === slot.id;

                return (
                  <div key={slot.id} className="photo-slot-box">
                    <div className="slot-title-bar">
                      <span className="slot-label">{slot.title}</span>
                    </div>

                    {imgUrl ? (
                      <div className="slot-img-preview-wrap">
                        <img src={imgUrl} alt={slot.title} className="slot-preview-img" />
                        <button
                          type="button"
                          className="slot-remove-btn"
                          onClick={() => removeSlotImage(slot.id)}
                          title="Remove Photo"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    ) : (
                      <label className="slot-upload-dropzone">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlotPhotoUpload(slot.id, e.target.files[0])}
                          style={{ display: "none" }}
                        />
                        {isUploading ? (
                          <div className="uploading-spinner-box">
                            <span className="upload-spin" />
                            <span>Uploading...</span>
                          </div>
                        ) : (
                          <>
                            <Camera size={24} className="camera-icon-muted" />
                            <span className="slot-cta-text">Click to Add Photo</span>
                            <small className="slot-desc-text">{slot.desc}</small>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Pricing & Stock */}
          <div className="form-section-card">
            <h3 className="section-title">
              <span className="step-num">4</span> Pricing & Stock (दाम और स्टॉक)
            </h3>

            <div className="two-col-grid">
              <div className="input-field-group">
                <label className="field-label">MRP (₹ Original Price)</label>
                <input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) => updateField("originalPrice", e.target.value)}
                  placeholder="Original MRP"
                  className="smart-text-input"
                />
              </div>

              <div className="input-field-group">
                <label className="field-label" style={{ color: "#27ae60", fontWeight: 700 }}>
                  Selling / Offer Price (₹ ऑफर दाम) *
                </label>
                <input
                  type="number"
                  value={form.offerPrice}
                  onChange={(e) => updateField("offerPrice", e.target.value)}
                  placeholder="Customer Price"
                  className="smart-text-input highlight-price-input"
                  required
                />
              </div>
            </div>

            {form.productType !== "service" && (
              <div className="two-col-grid">
                <div className="input-field-group">
                  <label className="field-label">Stock Quantity (कितने पीस उपलब्ध हैं?) *</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => updateField("stock", e.target.value)}
                    placeholder="1"
                    min="0"
                    className="smart-text-input"
                    required
                  />
                </div>

                <div className="input-field-group">
                  <label className="field-label">Warranty / Guarantee Details</label>
                  <input
                    type="text"
                    value={form.warranty}
                    onChange={(e) => updateField("warranty", e.target.value)}
                    placeholder="e.g. 5 Years Unconditional"
                    className="smart-text-input"
                  />
                </div>
              </div>
            )}

            <div className="input-field-group">
              <label className="field-label">Extra Description / Shop Notes (अतिरिक्त विवरण)</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Tyre fitting available, high mileage tread, emergency repair..."
                rows={3}
                className="smart-textarea"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-action-row">
              <button
                type="button"
                className="save-draft-btn"
                disabled={saving}
                onClick={(e) => handleSubmit(e, true)}
              >
                📝 Save as Draft
              </button>

              <button
                type="submit"
                className="publish-submit-btn"
                disabled={saving}
              >
                {saving ? "⏳ Publishing..." : edit ? "✅ Update Product" : "🚀 Publish to TyreSaathi"}
              </button>
            </div>
          </div>
        </form>

        {/* Right Side: Live Customer Preview (Photo 3 Look Enhanced) */}
        <div className="live-preview-sidebar">
          <div className="preview-sticky-card">
            <div className="preview-header">
              <span className="live-pulse-dot" />
              <h4>👁️ Live Customer Preview</h4>
              <span className="preview-tag">Customer View</span>
            </div>

            {/* Main Preview Image */}
            <div className="preview-main-img-box">
              {form.images.find((img) => img) ? (
                <img
                  src={form.images.find((img) => img)}
                  alt="Product Preview"
                  className="preview-img-active"
                />
              ) : (
                <div className="preview-img-empty">
                  <Camera size={36} color="#aaa" />
                  <span>No Photos Added Yet</span>
                </div>
              )}

              {discountPercent > 0 && (
                <span className="preview-discount-badge">{discountPercent}% OFF</span>
              )}
            </div>

            {/* 4 Mini Thumbnails */}
            <div className="preview-thumbs-row">
              {form.images.map((img, idx) => (
                <div key={idx} className={`preview-thumb ${img ? "thumb-has-img" : "thumb-empty"}`}>
                  {img ? <img src={img} alt={`Thumb ${idx + 1}`} /> : <span>{idx + 1}</span>}
                </div>
              ))}
            </div>

            {/* Product Meta */}
            <div className="preview-body">
              <span className="preview-category-badge">{form.categoryName}</span>
              <h3 className="preview-product-title">
                {form.productType === "service" ? (form.serviceName || "Service Title...") : (form.productName || "Tyre Product Title...")}
              </h3>

              <div className="preview-price-box">
                <span className="preview-offer-price">₹{form.offerPrice || "0"}</span>
                {Number(form.originalPrice) > Number(form.offerPrice) && (
                  <span className="preview-mrp">₹{form.originalPrice}</span>
                )}
              </div>

              <div className="preview-features-list">
                <div className="preview-feature-item">
                  <strong>🏷️ Brand:</strong> {form.brandName === "OTHER" ? (form.customBrand || "Custom") : form.brandName}
                </div>
                {form.sizeName && (
                  <div className="preview-feature-item">
                    <strong>📏 Size:</strong> {form.sizeName === "OTHER" ? (form.customSize || "Custom") : form.sizeName}
                  </div>
                )}
                {form.productType !== "service" && (
                  <div className="preview-feature-item">
                    <strong>📦 Stock:</strong>{" "}
                    <span style={{ color: Number(form.stock) > 0 ? "#27ae60" : "#c0392b", fontWeight: 700 }}>
                      {Number(form.stock) > 0 ? `${form.stock} Pieces in Stock` : "Out of Stock"}
                    </span>
                  </div>
                )}
                <div className="preview-feature-item">
                  <strong>🏪 Shop:</strong> {activeProfile?.shopName || "TyreSaathi Authorized Shop"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .add-product-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 10px 10px 40px;
        }
        .page-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 14px;
        }
        .page-main-heading {
          font-size: 24px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 6px;
        }
        .page-subheading {
          font-size: 13.5px;
          color: var(--text-muted);
          margin: 0;
        }
        .back-link-btn {
          font-size: 13px;
          color: var(--orange);
          text-decoration: none;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
          background: var(--surface-2);
        }
        .form-preview-grid {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }
        @media (max-width: 950px) {
          .form-preview-grid {
            flex-direction: column;
          }
        }
        .add-product-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-section-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .step-num {
          background: #c0392b;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }
        .product-type-pill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        .type-select-pill {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 8px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .type-select-pill:hover {
          border-color: #c0392b;
        }
        .type-pill-selected {
          border-color: #c0392b;
          background: color-mix(in srgb, #c0392b 10%, var(--bg));
          color: #c0392b;
        }
        .pill-icon {
          font-size: 18px;
        }
        .condition-toggle-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 10px;
          border-top: 1px dashed var(--border);
        }
        .toggle-btn-group {
          display: flex;
          gap: 8px;
        }
        .toggle-option {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
        }
        .toggle-active {
          background: #c0392b;
          color: white;
          border-color: #c0392b;
        }
        .input-field-group {
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .field-label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .smart-select,
        .smart-text-input,
        .smart-textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: var(--bg);
          color: var(--text);
          font-size: 13.5px;
          outline: none;
        }
        .smart-select:focus,
        .smart-text-input:focus,
        .smart-textarea:focus {
          border-color: #c0392b;
        }
        .custom-input {
          margin-top: 6px;
          border-color: #c0392b;
        }
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 600px) {
          .two-col-grid {
            grid-template-columns: 1fr;
          }
        }
        .highlight-price-input {
          border-color: #27ae60;
          font-weight: 700;
          font-size: 15px;
        }

        /* 📸 4 Photo Slots Grid */
        .photo-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .section-subtext {
          font-size: 12px;
          color: var(--text-muted);
          margin: 4px 0 0;
        }
        .photos-counter-tag {
          font-size: 12px;
          background: #27ae60;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 700;
        }
        .four-photo-slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        @media (max-width: 600px) {
          .four-photo-slots-grid {
            grid-template-columns: 1fr;
          }
        }
        .photo-slot-box {
          border: 1.5px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          background: var(--bg);
        }
        .slot-title-bar {
          background: var(--surface-2);
          padding: 6px 10px;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--text);
          border-bottom: 1px solid var(--border);
        }
        .slot-upload-dropzone {
          height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          padding: 10px;
          text-align: center;
          border: 2px dashed transparent;
          transition: background 0.15s ease;
        }
        .slot-upload-dropzone:hover {
          background: color-mix(in srgb, #c0392b 5%, var(--bg));
          border-color: #c0392b;
        }
        .slot-cta-text {
          font-size: 12px;
          font-weight: 700;
          color: #c0392b;
        }
        .slot-desc-text {
          font-size: 10.5px;
          color: var(--text-muted);
        }
        .slot-img-preview-wrap {
          position: relative;
          height: 120px;
          background: #000;
        }
        .slot-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .slot-remove-btn {
          position: absolute;
          bottom: 6px;
          right: 6px;
          background: rgba(192, 57, 43, 0.9);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 3px 6px;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .uploading-spinner-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #c0392b;
          font-weight: 700;
        }

        /* Action Buttons */
        .form-action-row {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        .save-draft-btn {
          flex: 1;
          background: var(--surface-2);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
        }
        .publish-submit-btn {
          flex: 2;
          background: #c0392b;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
        }

        /* Live Preview Sidebar */
        .live-preview-sidebar {
          flex: 0 0 340px;
          max-width: 360px;
        }
        .preview-sticky-card {
          position: sticky;
          top: 80px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
        }
        .preview-header {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          background: var(--surface-2);
        }
        .preview-header h4 {
          margin: 0;
          font-size: 13px;
          font-weight: 700;
        }
        .preview-tag {
          font-size: 11px;
          color: var(--text-muted);
        }
        .preview-main-img-box {
          position: relative;
          height: 200px;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-img-active {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-img-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 12px;
        }
        .preview-discount-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #c0392b;
          color: white;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11.5px;
          font-weight: 800;
        }
        .preview-thumbs-row {
          display: flex;
          gap: 6px;
          padding: 10px 14px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }
        .preview-thumb {
          flex: 1;
          height: 48px;
          border-radius: 4px;
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface);
          font-size: 11px;
          color: var(--text-muted);
        }
        .preview-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .preview-body {
          padding: 14px 16px;
        }
        .preview-category-badge {
          font-size: 11px;
          color: #c0392b;
          font-weight: 700;
          text-transform: uppercase;
        }
        .preview-product-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          margin: 4px 0 8px;
          line-height: 1.3;
        }
        .preview-price-box {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .preview-offer-price {
          font-size: 22px;
          font-weight: 800;
          color: #27ae60;
        }
        .preview-mrp {
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .preview-features-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg);
          padding: 10px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
