import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  CheckCircle2, 
  Store, 
  Calendar, 
  Clock, 
  Car, 
  RefreshCw 
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function CartDrawer() {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Checkout modal inside Cart Drawer
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState(profile?.name || user?.displayName || "");
  const [customerPhone, setCustomerPhone] = useState(profile?.phone || "");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().split("T")[0]);
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 11:00 AM");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const items = JSON.parse(localStorage.getItem("tyresaathi_cart") || "[]");
      setCartItems(Array.isArray(items) ? items : []);
    } catch (e) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();

    const handleOpen = () => {
      loadCart();
      setIsOpen(true);
      setOrderSuccess(null);
    };

    const handleUpdate = () => {
      loadCart();
    };

    window.addEventListener("open_cart_drawer", handleOpen);
    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("open_cart_drawer", handleOpen);
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Update item quantity
  const updateQty = (id, delta) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("tyresaathi_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove item
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("tyresaathi_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("tyresaathi_cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
    0
  );
  const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Submit Order / Fitting Booking
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Kripya apna Naam aur Mobile Number zaroor bharein!");
      return;
    }

    setSubmitting(true);
    const bookingId = `TS-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const cleanPhone = customerPhone.trim().replace(/\D/g, "").slice(-10);

    const firstShopId = cartItems[0]?.shopId || "hub_partner";
    const firstShopName = cartItems[0]?.shopName || "TyreSaathi Partner Hub";

    const itemsSummary = cartItems
      .map((it) => `${it.quantity}x ${it.productName} (${it.sizeName || ''}) - ₹${it.price * it.quantity}`)
      .join(", ");

    const orderRecord = {
      id: bookingId,
      bookingId: bookingId,
      shopId: firstShopId,
      shopName: firstShopName,
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      vehicleType: "Car / Commercial",
      vehicleNumber: vehicleNumber.trim() || "Not Provided",
      serviceName: `Tyre Purchase & Fitment: ${itemsSummary}`,
      items: cartItems,
      totalAmount: subtotal,
      bookingDate: bookingDate,
      timeSlot: timeSlot,
      status: "pending",
      paymentStatus: "Pay at Shop / Fitting",
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
      source: "cart_checkout",
    };

    try {
      await addDoc(collection(db, "bookings"), orderRecord);
      clearCart();
      setCheckoutOpen(false);
      setOrderSuccess(orderRecord);
    } catch (err) {
      console.warn("Firestore order submission fallback:", err);
      // Offline fallback
      try {
        const localBookings = JSON.parse(localStorage.getItem("tyresaathi_offline_bookings") || "[]");
        localBookings.unshift(orderRecord);
        localStorage.setItem("tyresaathi_offline_bookings", JSON.stringify(localBookings));
      } catch (e) {}
      clearCart();
      setCheckoutOpen(false);
      setOrderSuccess(orderRecord);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="header-title-box">
            <div className="cart-icon-bubble">
              <ShoppingCart size={18} color="#c0392b" />
            </div>
            <div>
              <h3 className="cart-title">My Cart (टायर कार्ट)</h3>
              <span className="cart-subtitle">{totalQty} {totalQty === 1 ? "Item" : "Items"} in your order</span>
            </div>
          </div>
          <button 
            type="button" 
            className="cart-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Close Cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="cart-drawer-body">
          {orderSuccess ? (
            <div className="cart-success-view">
              <div className="success-icon-wrap">
                <CheckCircle2 size={42} color="#16a34a" />
              </div>
              <h4>Order & Fitting Booked! 🎉</h4>
              <p className="success-bkg-id">Booking ID: <strong>{orderSuccess.bookingId}</strong></p>
              <p className="success-desc">
                Aapka order <strong>{orderSuccess.shopName}</strong> par book ho gaya hai.
                Aap slot par jakar tyre fitment karwa sakte hain.
              </p>
              <div className="success-details-card">
                <div><span>Total Tyres:</span> <strong>{orderSuccess.items?.reduce((s, i) => s + i.quantity, 0)}</strong></div>
                <div><span>Total Amount:</span> <strong className="green-txt">₹{orderSuccess.totalAmount?.toLocaleString('en-IN')}</strong></div>
                <div><span>Date & Time:</span> <strong>{orderSuccess.bookingDate} • {orderSuccess.timeSlot}</strong></div>
              </div>
              <button 
                type="button" 
                className="btn-continue-shopping"
                onClick={() => {
                  setOrderSuccess(null);
                  setIsOpen(false);
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : checkoutOpen ? (
            /* Checkout View */
            <form onSubmit={handleCheckoutSubmit} className="cart-checkout-form">
              <div className="checkout-header-strip">
                <button 
                  type="button" 
                  className="btn-back-to-cart"
                  onClick={() => setCheckoutOpen(false)}
                >
                  ← Back to Cart
                </button>
                <span className="checkout-step-title">Confirm Fitment Details</span>
              </div>

              <div className="checkout-summary-mini">
                <span>Total Payable at Shop:</span>
                <strong className="green-txt">₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>

              <div className="form-field-group">
                <label>Aapka Naam (Customer Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>

              <div className="form-field-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit Mobile Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>

              <div className="form-field-group">
                <label>Gaadi ka Number (Vehicle Number)</label>
                <input
                  type="text"
                  placeholder="e.g. RJ 20 CA 1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>

              <div className="form-row-2">
                <div className="form-field-group">
                  <label>Fitting Date *</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>
                <div className="form-field-group">
                  <label>Preferred Time *</label>
                  <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                    <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-confirm-order"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <RefreshCw size={16} className="spin-icon" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <span>🚀 Confirm Fitting & Book (Pay at Shop)</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="cart-empty-state">
              <div className="empty-cart-icon">🛒</div>
              <h4>Aapka Cart Khali Hai</h4>
              <p>Shop profile se apne pasandeeda tyres chuniye aur "Add to Cart" kijiye.</p>
              <button 
                type="button" 
                className="btn-browse-tyres"
                onClick={() => setIsOpen(false)}
              >
                Browse Tyres & Shops
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=150&auto=format&fit=crop&q=80"} 
                    alt={item.productName} 
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <div>
                        <span className="cart-item-brand">{item.brandName} • {item.sizeName}</span>
                        <h4 className="cart-item-title">{item.productName}</h4>
                      </div>
                      <button 
                        type="button" 
                        className="btn-remove-item"
                        onClick={() => removeItem(item.id)}
                        title="Remove from Cart"
                      >
                        <Trash2 size={15} color="#ef4444" />
                      </button>
                    </div>

                    <div className="cart-item-shop">
                      <Store size={12} color="#64748b" />
                      <span>{item.shopName}</span>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-item-stepper">
                        <button 
                          type="button" 
                          onClick={() => updateQty(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={12} />
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          type="button" 
                          onClick={() => updateQty(item.id, 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="cart-item-pricing">
                        <span className="cart-item-total-price">
                          ₹{(Number(item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="cart-item-unit-rate">₹{Number(item.price).toLocaleString('en-IN')}/tyre</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart-clear-bar">
                <button type="button" onClick={clearCart} className="btn-clear-all">
                  <Trash2 size={13} /> Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer (Only when items exist and not on checkout) */}
        {!checkoutOpen && !orderSuccess && cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-bill-breakdown">
              <div className="bill-row">
                <span>Subtotal ({totalQty} Tyres)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="bill-row">
                <span>Standard Fitting & Valve Check</span>
                <span className="free-badge">FREE with Shop Fitting</span>
              </div>
              <div className="bill-row bill-row-total">
                <span>Grand Total (Pay at Shop):</span>
                <strong className="green-txt">₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-proceed-checkout"
              onClick={() => setCheckoutOpen(true)}
            >
              <span>Proceed to Book Fitting ⚡</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Scoped CSS for Slide-over Cart Drawer */}
      <style>{`
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(2px);
          z-index: 99999;
          display: flex;
          justify-content: flex-end;
          animation: fadeInOverlay 0.2s ease;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cart-drawer-panel {
          width: 100%;
          max-width: 440px;
          height: 100%;
          height: 100dvh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);
          animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .cart-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1.5px solid #f1f5f9;
          background: #f8fafc;
        }
        .header-title-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cart-icon-bubble {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-title {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
        }
        .cart-subtitle {
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }
        .cart-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #e2e8f0;
          color: #475569;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .cart-close-btn:hover {
          background: #cbd5e1;
          color: #0f172a;
        }

        .cart-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
        }

        /* Cart Empty State */
        .cart-empty-state {
          text-align: center;
          padding: 40px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .empty-cart-icon {
          font-size: 48px;
          margin-bottom: 12px;
          opacity: 0.6;
        }
        .cart-empty-state h4 {
          margin: 0 0 6px;
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
        }
        .cart-empty-state p {
          margin: 0 0 18px;
          font-size: 12.5px;
          color: #64748b;
          max-width: 260px;
        }
        .btn-browse-tyres {
          background: #c0392b;
          color: #ffffff;
          border: none;
          padding: 9px 18px;
          border-radius: 10px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
        }

        /* Cart Items */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cart-item-card {
          display: flex;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        }
        .cart-item-img {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #f1f5f9;
          flex-shrink: 0;
        }
        .cart-item-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cart-item-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 6px;
        }
        .cart-item-brand {
          font-size: 10px;
          font-weight: 700;
          color: #c0392b;
          text-transform: uppercase;
        }
        .cart-item-title {
          margin: 1px 0 0;
          font-size: 12.5px;
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .btn-remove-item {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }
        .btn-remove-item:hover {
          background: #fee2e2;
        }
        .cart-item-shop {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10.5px;
          color: #64748b;
          margin-top: 2px;
        }
        .cart-item-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }
        .cart-item-stepper {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #f1f5f9;
          padding: 2px 4px;
          border-radius: 6px;
        }
        .cart-item-stepper button {
          width: 22px;
          height: 22px;
          border-radius: 4px;
          border: none;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #334155;
        }
        .cart-item-stepper button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .cart-item-stepper span {
          width: 20px;
          text-align: center;
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
        }
        .cart-item-pricing {
          text-align: right;
        }
        .cart-item-total-price {
          font-size: 13.5px;
          font-weight: 800;
          color: #16a34a;
          display: block;
        }
        .cart-item-unit-rate {
          font-size: 9.5px;
          color: #94a3b8;
        }
        .cart-clear-bar {
          display: flex;
          justify-content: flex-end;
          padding-top: 6px;
        }
        .btn-clear-all {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .btn-clear-all:hover {
          color: #ef4444;
        }

        /* Footer */
        .cart-drawer-footer {
          padding: 16px 20px;
          border-top: 1.5px solid #f1f5f9;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cart-bill-breakdown {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
          color: #64748b;
        }
        .bill-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .free-badge {
          color: #16a34a;
          font-weight: 700;
          font-size: 10.5px;
          background: #dcfce7;
          padding: 1px 6px;
          border-radius: 4px;
        }
        .bill-row-total {
          font-size: 13.5px;
          font-weight: 800;
          color: #0f172a;
          padding-top: 6px;
          border-top: 1px dashed #cbd5e1;
        }
        .green-txt {
          color: #16a34a !important;
          font-weight: 900;
        }
        .btn-proceed-checkout {
          width: 100%;
          background: linear-gradient(135deg, #c0392b 0%, #e74c3c 100%);
          color: #ffffff;
          border: none;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(192, 57, 43, 0.25);
          transition: transform 0.15s ease;
        }
        .btn-proceed-checkout:active {
          transform: scale(0.98);
        }

        /* Checkout Form */
        .cart-checkout-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .checkout-header-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid #f1f5f9;
        }
        .btn-back-to-cart {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .checkout-step-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
        }
        .checkout-summary-mini {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12px;
        }
        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .form-field-group label {
          font-size: 11.5px;
          font-weight: 700;
          color: #334155;
        }
        .form-field-group input,
        .form-field-group select {
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 12.5px;
          color: #0f172a;
          background: #ffffff;
          box-sizing: border-box;
          outline: none;
        }
        .form-field-group input:focus,
        .form-field-group select:focus {
          border-color: #c0392b;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .btn-confirm-order {
          margin-top: 6px;
          background: #16a34a;
          color: #ffffff;
          border: none;
          padding: 12px;
          border-radius: 12px;
          font-size: 12.5px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Order Success */
        .cart-success-view {
          text-align: center;
          padding: 24px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .success-icon-wrap {
          margin-bottom: 12px;
        }
        .cart-success-view h4 {
          margin: 0 0 6px;
          font-size: 18px;
          font-weight: 900;
          color: #0f172a;
        }
        .success-bkg-id {
          font-size: 12px;
          color: #64748b;
          margin: 0 0 8px;
        }
        .success-desc {
          font-size: 12px;
          color: #334155;
          margin: 0 0 16px;
          max-width: 300px;
        }
        .success-details-card {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 18px;
          text-align: left;
        }
        .success-details-card div {
          display: flex;
          justify-content: space-between;
        }
        .btn-continue-shopping {
          background: #0f172a;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
