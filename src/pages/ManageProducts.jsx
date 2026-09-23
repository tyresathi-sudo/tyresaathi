import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  collection, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  RefreshCw,
  X
} from "lucide-react";

export default function ManageProducts() {
  const { user, currentUser } = useAuth();
  const activeUser = user || currentUser;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'published', 'draft', 'out_of_stock', 'low_stock'
  const [typeFilter, setTypeFilter] = useState("all"); // 'all', 'tyre', 'tube', 'flap', 'service', etc.
  const [actionLoading, setActionLoading] = useState(null);

  // Quick Price / Stock Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [quickForm, setQuickForm] = useState({ offerPrice: "", originalPrice: "", stock: "" });
  const [quickSaving, setQuickSaving] = useState(false);

  // Delete confirmation modal state
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "products"));
      if (!snap.empty) {
        const list = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        // Sort by newest first
        list.sort((a, b) => {
          const tA = a.updatedAt?.seconds || a.createdAt?.seconds || 0;
          const tB = b.updatedAt?.seconds || b.createdAt?.seconds || 0;
          return tB - tA;
        });
        setProducts(list);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.warn("Firestore fetch notice:", err);
      // Fallback local memory if offline
      const local = localStorage.getItem("tyresaathi_products_cache");
      if (local) {
        try {
          setProducts(JSON.parse(local));
        } catch {
          setProducts([]);
        }
      } else {
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1-Click Toggle Publish / Draft
  const handleTogglePublish = async (item) => {
    const newStatus = !(item.published !== false);
    setActionLoading(item.id);
    try {
      const docRef = doc(db, "products", item.id);
      await updateDoc(docRef, {
        published: newStatus,
        updatedAt: serverTimestamp(),
      });

      setProducts((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, published: newStatus } : p))
      );
      showToast(
        newStatus 
          ? `🟢 "${item.productName || 'Product'}" is now LIVE on TyreSaathi!` 
          : `📝 "${item.productName || 'Product'}" moved to DRAFT (Hidden from website).`,
        newStatus ? "success" : "info"
      );
    } catch (err) {
      console.error("Toggle error:", err);
      // Fallback local state update
      setProducts((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, published: newStatus } : p))
      );
      showToast(`Updated status locally: ${newStatus ? "Live" : "Draft"}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Open Quick Edit Modal
  const openQuickEdit = (item) => {
    setEditingItem(item);
    setQuickForm({
      offerPrice: item.offerPrice ?? "",
      originalPrice: item.originalPrice ?? "",
      stock: item.stock ?? "",
    });
  };

  // Save Quick Edit (Stock & Price)
  const handleSaveQuickEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setQuickSaving(true);
    try {
      const updatedData = {
        offerPrice: Number(quickForm.offerPrice || 0),
        originalPrice: Number(quickForm.originalPrice || 0),
        stock: editingItem.productType === "service" ? 999 : Number(quickForm.stock || 0),
        updatedAt: serverTimestamp(),
      };

      const docRef = doc(db, "products", editingItem.id);
      await updateDoc(docRef, updatedData);

      setProducts((prev) =>
        prev.map((p) => (p.id === editingItem.id ? { ...p, ...updatedData } : p))
      );
      showToast("✅ Price & Stock updated successfully!");
      setEditingItem(null);
    } catch (err) {
      console.error("Quick edit save error:", err);
      // Fallback local update
      setProducts((prev) =>
        prev.map((p) => (p.id === editingItem.id ? { ...p, ...quickForm } : p))
      );
      showToast("✅ Price & Stock updated locally!");
      setEditingItem(null);
    } finally {
      setQuickSaving(false);
    }
  };

  // Delete Product
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      const docRef = doc(db, "products", deleteItem.id);
      await deleteDoc(docRef);

      setProducts((prev) => prev.filter((p) => p.id !== deleteItem.id));
      showToast(`🗑️ "${deleteItem.productName || 'Product'}" deleted successfully!`, "danger");
      setDeleteItem(null);
    } catch (err) {
      console.error("Delete error:", err);
      setProducts((prev) => prev.filter((p) => p.id !== deleteItem.id));
      showToast(`🗑️ Removed locally: ${deleteItem.productName}`, "danger");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  };

  // Calculate Statistics
  const totalCount = products.length;
  const publishedCount = products.filter((p) => p.published !== false).length;
  const draftCount = products.filter((p) => p.published === false).length;
  const lowStockCount = products.filter((p) => p.productType !== "service" && Number(p.stock || 0) <= 2).length;

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.productName?.toLowerCase().includes(q) ||
      p.brandName?.toLowerCase().includes(q) ||
      p.sizeName?.toLowerCase().includes(q) ||
      p.categoryName?.toLowerCase().includes(q) ||
      p.productType?.toLowerCase().includes(q);

    // Status Filter
    let matchesStatus = true;
    if (statusFilter === "published") matchesStatus = p.published !== false;
    else if (statusFilter === "draft") matchesStatus = p.published === false;
    else if (statusFilter === "out_of_stock") matchesStatus = p.productType !== "service" && Number(p.stock || 0) <= 0;
    else if (statusFilter === "low_stock") matchesStatus = p.productType !== "service" && Number(p.stock || 0) > 0 && Number(p.stock || 0) <= 2;

    // Type Filter
    let matchesType = true;
    if (typeFilter !== "all") matchesType = p.productType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="manage-products-page">
      {/* Toast Notification */}
      {toast && (
        <div className={`global-toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Banner & Header */}
      <div className="manage-header-card">
        <div className="header-left-col">
          <div className="badge-pill">
            <Package size={14} /> Tyre & Stock Manager
          </div>
          <h1 className="header-title">📦 Product & Inventory Management</h1>
          <p className="header-desc">
            यहाँ आप अपनी दुकान के सभी टायर्स, ट्यूब्स व सर्विसेज़ देख सकते हैं, उनकी कीमत/स्टॉक बदल सकते हैं, 
            एडिट/डिलीट कर सकते हैं और ड्राफ्ट या लाइव कर सकते हैं।
          </p>
        </div>

        <div className="header-actions">
          <button 
            className="refresh-btn" 
            onClick={fetchProducts} 
            title="Refresh Inventory"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "spin-icon" : ""} />
            <span>Refresh</span>
          </button>
          <Link to="/shop/add-product" className="add-new-btn">
            <PlusCircle size={18} />
            <span>Add New Tyre / Product</span>
          </Link>
        </div>
      </div>

      {/* 📊 Key Stats Summary Bar */}
      <div className="stats-overview-grid">
        <div 
          className={`stat-card ${statusFilter === "all" ? "stat-card-active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          <div className="stat-icon-wrap" style={{ background: "rgba(52, 152, 219, 0.12)", color: "#2980b9" }}>
            <Package size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total Inventory Items</span>
          </div>
        </div>

        <div 
          className={`stat-card ${statusFilter === "published" ? "stat-card-active" : ""}`}
          onClick={() => setStatusFilter("published")}
        >
          <div className="stat-icon-wrap" style={{ background: "rgba(39, 174, 96, 0.12)", color: "#27ae60" }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-number" style={{ color: "#27ae60" }}>{publishedCount}</span>
            <span className="stat-label">🟢 Live on TyreSaathi</span>
          </div>
        </div>

        <div 
          className={`stat-card ${statusFilter === "draft" ? "stat-card-active" : ""}`}
          onClick={() => setStatusFilter("draft")}
        >
          <div className="stat-icon-wrap" style={{ background: "rgba(243, 156, 18, 0.12)", color: "#d35400" }}>
            <EyeOff size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-number" style={{ color: "#d35400" }}>{draftCount}</span>
            <span className="stat-label">📝 In Draft (Hidden)</span>
          </div>
        </div>

        <div 
          className={`stat-card ${statusFilter === "low_stock" ? "stat-card-active" : ""}`}
          onClick={() => setStatusFilter("low_stock")}
        >
          <div className="stat-icon-wrap" style={{ background: "rgba(231, 76, 60, 0.12)", color: "#c0392b" }}>
            <AlertTriangle size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-number" style={{ color: "#c0392b" }}>{lowStockCount}</span>
            <span className="stat-label">⚠️ Low / Out of Stock</span>
          </div>
        </div>
      </div>

      {/* 🔍 Search & Filters Bar */}
      <div className="filter-controls-card">
        <div className="search-input-box">
          <Search size={18} className="search-icon-muted" />
          <input
            type="text"
            placeholder="Search by Tyre Size, Brand (MRF, CEAT, Apollo), Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-search-field"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
              <X size={15} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="filter-tabs-row">
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status ({totalCount})</option>
              <option value="published">🟢 Live / Published ({publishedCount})</option>
              <option value="draft">📝 Draft / Hidden ({draftCount})</option>
              <option value="low_stock">⚠️ Low Stock (≤ 2)</option>
              <option value="out_of_stock">🔴 Out of Stock (0)</option>
            </select>
          </div>

          <div className="filter-group">
            <span className="filter-label">Type:</span>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="tyre">🛞 Tyres (टायर)</option>
              <option value="tube">⭕ Tubes (ट्यूब)</option>
              <option value="flap">◉ Flaps (फ्लैप)</option>
              <option value="patch">🩹 Patches (पैच)</option>
              <option value="gater">🔧 Gater (गेटर)</option>
              <option value="custom">✨ Alloy Wheels</option>
              <option value="service">🛠️ Services (सर्विस)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📋 Products List / Grid */}
      {loading ? (
        <div className="loading-state-card">
          <div className="loading-spinner" />
          <p>Loading your shop inventory...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-inventory-card">
          <div className="empty-icon-circle">
            <Package size={48} color="#94a3b8" />
          </div>
          <h3>No Products Found</h3>
          <p>
            {searchQuery || statusFilter !== "all" || typeFilter !== "all"
              ? "Aapke chune huye filters ke mutabik koi product nahi mila. Filter reset karein."
              : "Abhi aapki shop me koi product ya tyre add nahi kiya gaya hai."}
          </p>
          <div className="empty-btn-group">
            {(searchQuery || statusFilter !== "all" || typeFilter !== "all") && (
              <button 
                className="reset-filter-btn"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                Reset All Filters
              </button>
            )}
            <Link to="/shop/add-product" className="add-new-btn">
              <PlusCircle size={17} />
              <span>Add Your First Product</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="products-table-container">
          <div className="table-top-meta">
            <span>Showing <strong>{filteredProducts.length}</strong> of {totalCount} items</span>
          </div>

          <div className="inventory-cards-grid">
            {filteredProducts.map((item) => {
              const isLive = item.published !== false;
              const isService = item.productType === "service";
              const stockNum = Number(item.stock || 0);
              const isOutOfStock = !isService && stockNum <= 0;
              const isLowStock = !isService && stockNum > 0 && stockNum <= 2;
              const isToggling = actionLoading === item.id;

              const mrp = Number(item.originalPrice || 0);
              const offer = Number(item.offerPrice || 0);
              const discount = mrp > 0 && offer > 0 && mrp > offer 
                ? Math.round(((mrp - offer) / mrp) * 100) 
                : 0;

              const displayImg = (Array.isArray(item.images) && item.images.find((img) => img)) 
                || item.imageUrl 
                || "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=400&auto=format&fit=crop&q=80";

              return (
                <div 
                  key={item.id} 
                  className={`inventory-product-card ${!isLive ? "card-draft-mode" : ""} ${isOutOfStock ? "card-out-of-stock" : ""}`}
                >
                  {/* Card Header & Badges */}
                  <div className="card-top-badges">
                    <span className={`status-pill ${isLive ? "status-pill-live" : "status-pill-draft"}`}>
                      {isLive ? "🟢 Live on Network" : "📝 Draft (Hidden)"}
                    </span>

                    <span className="type-badge-pill">
                      {item.productType === "tube" ? "⭕ Tube" : item.productType === "service" ? "🛠️ Service" : "🛞 Tyre"}
                    </span>
                  </div>

                  {/* Product Visual & Basic Info */}
                  <div className="card-main-info">
                    <div className="product-thumb-wrap">
                      <img src={displayImg} alt={item.productName} className="product-thumb-img" />
                      {discount > 0 && (
                        <span className="card-discount-tag">{discount}% OFF</span>
                      )}
                    </div>

                    <div className="product-details-col">
                      <span className="product-category-name">{item.categoryName || "Automotive Tyre"}</span>
                      <h3 className="product-name-heading" title={item.productName}>
                        {item.productName || `${item.brandName || ""} ${item.sizeName || ""}`}
                      </h3>

                      <div className="spec-chips-row">
                        {item.brandName && (
                          <span className="spec-chip">🏷️ {item.brandName}</span>
                        )}
                        {item.sizeName && (
                          <span className="spec-chip">📏 {item.sizeName}</span>
                        )}
                        {item.condition && (
                          <span className="spec-chip">{item.condition === "old" ? "♻️ Used" : "✨ Brand New"}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Stock Section */}
                  <div className="card-price-stock-row">
                    <div className="price-stack">
                      <span className="price-label">Selling Price:</span>
                      <div className="price-numbers">
                        <span className="offer-price-val">₹{offer.toLocaleString("en-IN")}</span>
                        {mrp > offer && (
                          <span className="mrp-price-val">₹{mrp.toLocaleString("en-IN")}</span>
                        )}
                      </div>
                    </div>

                    <div className="stock-stack">
                      <span className="price-label">Available Stock:</span>
                      {isService ? (
                        <span className="stock-badge stock-service">Always Available</span>
                      ) : isOutOfStock ? (
                        <span className="stock-badge stock-zero">🔴 Out of Stock</span>
                      ) : isLowStock ? (
                        <span className="stock-badge stock-low">⚠️ Only {stockNum} left</span>
                      ) : (
                        <span className="stock-badge stock-good">🟢 {stockNum} in Stock</span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Toolbar */}
                  <div className="card-actions-bar">
                    {/* 1-Click Publish / Unpublish Toggle */}
                    <button
                      type="button"
                      className={`action-btn-toggle ${isLive ? "btn-toggle-unpublish" : "btn-toggle-publish"}`}
                      onClick={() => handleTogglePublish(item)}
                      disabled={isToggling}
                      title={isLive ? "Click to Move to Draft (Hide from website)" : "Click to Publish Live on website"}
                    >
                      {isToggling ? (
                        <span className="upload-spin-mini" />
                      ) : isLive ? (
                        <>
                          <EyeOff size={15} />
                          <span>Move to Draft</span>
                        </>
                      ) : (
                        <>
                          <Eye size={15} />
                          <span>Publish Live</span>
                        </>
                      )}
                    </button>

                    {/* Quick Price/Stock Edit */}
                    <button
                      type="button"
                      className="action-btn-quick"
                      onClick={() => openQuickEdit(item)}
                      title="Quick Edit Price & Stock"
                    >
                      <Tag size={15} />
                      <span>Quick Edit</span>
                    </button>

                    {/* Full Edit Form */}
                    <button
                      type="button"
                      className="action-btn-edit"
                      onClick={() => navigate(`/shop/edit-product/${item.id}`)}
                      title="Full Edit Details & Photos"
                    >
                      <Edit3 size={15} />
                      <span>Edit</span>
                    </button>

                    {/* Delete Product */}
                    <button
                      type="button"
                      className="action-btn-delete"
                      onClick={() => setDeleteItem(item)}
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ⚡ Quick Edit Modal (Price & Stock) */}
      {editingItem && (
        <div className="modal-backdrop" onClick={() => !quickSaving && setEditingItem(null)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <Tag size={18} color="#e67e22" />
                <h3>Quick Edit Price & Stock</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setEditingItem(null)} 
                disabled={quickSaving}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveQuickEdit} className="modal-body-form">
              <div className="modal-product-summary">
                <strong>{editingItem.productName || "Product"}</strong>
                <span>{editingItem.brandName} • {editingItem.sizeName}</span>
              </div>

              <div className="modal-two-fields">
                <div className="modal-field">
                  <label>MRP (₹ Original Price)</label>
                  <input
                    type="number"
                    value={quickForm.originalPrice}
                    onChange={(e) => setQuickForm({ ...quickForm, originalPrice: e.target.value })}
                    placeholder="e.g. 5000"
                    min="0"
                  />
                </div>

                <div className="modal-field">
                  <label style={{ color: "#27ae60", fontWeight: 700 }}>
                    Offer Price (₹ सेलिंग प्राइस) *
                  </label>
                  <input
                    type="number"
                    value={quickForm.offerPrice}
                    onChange={(e) => setQuickForm({ ...quickForm, offerPrice: e.target.value })}
                    placeholder="e.g. 4200"
                    min="0"
                    required
                  />
                </div>
              </div>

              {editingItem.productType !== "service" && (
                <div className="modal-field">
                  <label>Available Stock (उपलब्ध पीस) *</label>
                  <input
                    type="number"
                    value={quickForm.stock}
                    onChange={(e) => setQuickForm({ ...quickForm, stock: e.target.value })}
                    placeholder="e.g. 10"
                    min="0"
                    required
                  />
                </div>
              )}

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setEditingItem(null)}
                  disabled={quickSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="modal-btn-save"
                  disabled={quickSaving}
                >
                  {quickSaving ? "Saving..." : "Save Updates"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🗑️ Delete Confirmation Modal */}
      {deleteItem && (
        <div className="modal-backdrop" onClick={() => !deleting && setDeleteItem(null)}>
          <div className="modal-dialog-box modal-delete-box" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon-circle">
              <Trash2 size={28} color="#e74c3c" />
            </div>

            <h3 className="delete-modal-title">Delete Product? (उत्पाद हटाएं?)</h3>
            <p className="delete-modal-text">
              Kya aap <strong>"{deleteItem.productName || deleteItem.brandName || 'this item'}"</strong> ko 
              inventory se hamesha ke liye delete karna chahte hain? Yeh action revert nahi kiya jaa sakta.
            </p>

            <div className="modal-actions-row">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={() => setDeleteItem(null)}
                disabled={deleting}
              >
                Nahi, Cancel Karein
              </button>
              <button
                type="button"
                className="modal-btn-delete-confirm"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Haan, Delete Karein"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scoped Styles for ManageProducts */}
      <style>{`
        .manage-products-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px 80px;
          font-family: inherit;
        }

        .global-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          padding: 14px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
          z-index: 9999;
          animation: slideInDown 0.3s ease;
          color: white;
        }
        .toast-success { background: #27ae60; }
        .toast-info { background: #2980b9; }
        .toast-danger { background: #e74c3c; }

        @keyframes slideInDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .manage-header-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          border-radius: 18px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
          margin-bottom: 24px;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.12);
          color: #93c5fd;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .header-title {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }

        .header-desc {
          margin: 0;
          font-size: 13.5px;
          color: #cbd5e1;
          max-width: 650px;
          line-height: 1.5;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .refresh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .refresh-btn:hover { background: rgba(255,255,255,0.2); }

        .add-new-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #c0392b;
          color: #fff;
          padding: 11px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(192, 57, 43, 0.4);
          transition: all 0.2s ease;
        }
        .add-new-btn:hover {
          background: #a93226;
          transform: translateY(-1px);
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Stats Grid */
        .stats-overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: var(--surface, #ffffff);
          border: 1.5px solid var(--border, #e2e8f0);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .stat-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }
        .stat-card-active {
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.04);
        }

        .stat-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-number {
          display: block;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.1;
          color: var(--text, #0f172a);
        }

        .stat-label {
          display: block;
          font-size: 12.5px;
          color: var(--text-muted, #64748b);
          margin-top: 4px;
          font-weight: 600;
        }

        /* Filter Controls */
        .filter-controls-card {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-input-box {
          position: relative;
          flex: 1;
          min-width: 260px;
        }

        .search-icon-muted {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .filter-search-field {
          width: 100%;
          padding: 10px 38px 10px 42px;
          border-radius: 10px;
          border: 1.5px solid var(--border, #cbd5e1);
          background: var(--bg, #f8fafc);
          color: var(--text, #0f172a);
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.2s;
        }
        .filter-search-field:focus {
          border-color: #c0392b;
          background: var(--surface, #fff);
        }

        .clear-search-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }

        .filter-tabs-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted, #64748b);
        }

        .filter-select {
          padding: 9px 14px;
          border-radius: 8px;
          border: 1.5px solid var(--border, #cbd5e1);
          background: var(--surface, #fff);
          color: var(--text, #0f172a);
          font-size: 13px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        /* Products Grid */
        .table-top-meta {
          font-size: 13px;
          color: var(--text-muted, #64748b);
          margin-bottom: 14px;
        }

        .inventory-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .inventory-product-card {
          background: var(--surface, #ffffff);
          border: 1.5px solid var(--border, #e2e8f0);
          border-radius: 16px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          transition: all 0.22s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .inventory-product-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .card-draft-mode {
          background: rgba(241, 245, 249, 0.6);
          border-style: dashed;
        }

        .card-top-badges {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .status-pill {
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .status-pill-live {
          background: #dcfce7;
          color: #15803d;
        }
        .status-pill-draft {
          background: #fef3c7;
          color: #b45309;
        }

        .type-badge-pill {
          font-size: 11.5px;
          font-weight: 600;
          background: var(--bg, #f1f5f9);
          color: var(--text-muted, #475569);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .card-main-info {
          display: flex;
          gap: 14px;
        }

        .product-thumb-wrap {
          position: relative;
          width: 84px;
          height: 84px;
          border-radius: 12px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid var(--border, #e2e8f0);
          flex-shrink: 0;
        }

        .product-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-discount-tag {
          position: absolute;
          bottom: 4px;
          left: 4px;
          background: #e74c3c;
          color: white;
          font-size: 9.5px;
          font-weight: 800;
          padding: 2px 5px;
          border-radius: 4px;
        }

        .product-details-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .product-category-name {
          font-size: 11px;
          font-weight: 700;
          color: #c0392b;
          text-transform: uppercase;
        }

        .product-name-heading {
          font-size: 15px;
          font-weight: 700;
          color: var(--text, #0f172a);
          margin: 3px 0 6px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .spec-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .spec-chip {
          font-size: 11px;
          font-weight: 600;
          background: var(--bg, #f1f5f9);
          color: var(--text, #334155);
          padding: 2px 7px;
          border-radius: 5px;
        }

        .card-price-stock-row {
          background: var(--bg, #f8fafc);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .price-label {
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text-muted, #64748b);
          display: block;
          margin-bottom: 2px;
        }

        .price-numbers {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .offer-price-val {
          font-size: 16px;
          font-weight: 800;
          color: #27ae60;
        }

        .mrp-price-val {
          font-size: 12px;
          color: #94a3b8;
          text-decoration: line-through;
        }

        .stock-badge {
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          display: inline-block;
        }
        .stock-good { background: #dcfce7; color: #166534; }
        .stock-low { background: #fef3c7; color: #92400e; }
        .stock-zero { background: #fee2e2; color: #991b1b; }
        .stock-service { background: #e0f2fe; color: #0369a1; }

        /* Action Toolbar */
        .card-actions-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 6px;
          border-top: 1px solid var(--border, #f1f5f9);
        }

        .action-btn-toggle {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }
        .btn-toggle-unpublish {
          background: #fef3c7;
          color: #b45309;
        }
        .btn-toggle-unpublish:hover { background: #fde68a; }

        .btn-toggle-publish {
          background: #dcfce7;
          color: #15803d;
        }
        .btn-toggle-publish:hover { background: #bbf7d0; }

        .action-btn-quick, .action-btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--surface, #fff);
          color: var(--text, #334155);
          transition: all 0.2s;
        }
        .action-btn-quick:hover {
          background: #fff7ed;
          border-color: #fdba74;
          color: #c2410c;
        }
        .action-btn-edit:hover {
          background: #eff6ff;
          border-color: #93c5fd;
          color: #1d4ed8;
        }

        .action-btn-delete {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--border, #fee2e2);
          background: #fef2f2;
          color: #dc2626;
          cursor: pointer;
          transition: all 0.2s;
        }
        .action-btn-delete:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        .upload-spin-mini {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Empty / Loading States */
        .loading-state-card, .empty-inventory-card {
          background: var(--surface, #ffffff);
          border: 1px solid var(--border, #e2e8f0);
          border-radius: 16px;
          padding: 60px 24px;
          text-align: center;
        }

        .empty-icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--bg, #f1f5f9);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .empty-btn-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }

        .reset-filter-btn {
          padding: 10px 18px;
          border-radius: 10px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--surface, #fff);
          color: var(--text, #334155);
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
        }

        /* Modals */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-dialog-box {
          background: var(--surface, #ffffff);
          border-radius: 18px;
          max-width: 480px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          animation: scaleUp 0.22s ease;
        }

        @keyframes scaleUp {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border, #e2e8f0);
          padding-bottom: 14px;
          margin-bottom: 18px;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .modal-title-group h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }

        .modal-product-summary {
          background: var(--bg, #f8fafc);
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .modal-product-summary strong { font-size: 14px; color: var(--text, #0f172a); }
        .modal-product-summary span { font-size: 12px; color: var(--text-muted, #64748b); }

        .modal-two-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }
        .modal-field label {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text, #334155);
        }
        .modal-field input {
          padding: 10px 12px;
          border-radius: 8px;
          border: 1.5px solid var(--border, #cbd5e1);
          background: var(--bg, #fff);
          color: var(--text, #0f172a);
          font-size: 14px;
          font-weight: 600;
          outline: none;
        }
        .modal-field input:focus { border-color: #c0392b; }

        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .modal-btn-cancel {
          padding: 10px 18px;
          border-radius: 8px;
          border: 1px solid var(--border, #cbd5e1);
          background: var(--surface, #fff);
          color: var(--text, #475569);
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
        }

        .modal-btn-save {
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          background: #c0392b;
          color: #fff;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
        }

        .modal-delete-box {
          text-align: center;
        }

        .delete-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px;
        }

        .delete-modal-title {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 8px;
          color: #991b1b;
        }

        .delete-modal-text {
          font-size: 13.5px;
          color: var(--text-muted, #475569);
          line-height: 1.5;
          margin: 0 0 16px;
        }

        .modal-btn-delete-confirm {
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          background: #dc2626;
          color: white;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .manage-header-card {
            padding: 20px;
          }
          .header-title { font-size: 20px; }
          .header-actions { width: 100%; justify-content: space-between; }
          .inventory-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
