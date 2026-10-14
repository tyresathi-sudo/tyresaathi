import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp,
  writeBatch
} from "firebase/firestore";
import { scheduleLocalNotification, triggerHaptic } from "./nativeBridge";

/**
 * Send an In-App & Push Notification to a user or shop owner
 */
export async function sendInAppNotification({
  recipientId = "all",
  recipientRole = "all", // 'shop_owner', 'customer', 'admin', 'all'
  title,
  message,
  type = "general", // 'booking_created', 'rating_received', 'booking_status', 'app_update', 'general'
  link = "",
  data = {}
}) {
  if (!title || !message) return null;

  try {
    const notifPayload = {
      recipientId,
      recipientRole,
      title,
      message,
      type,
      link,
      data,
      read: false,
      createdAt: serverTimestamp(),
      createdAtClient: new Date().toISOString(),
      dateStr: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const docRef = await addDoc(collection(db, "notifications"), notifPayload);

    // Trigger local push notification on device
    try {
      await scheduleLocalNotification(title, message);
      triggerHaptic("medium");
    } catch (pushErr) {
      console.warn("Local push notice:", pushErr);
    }

    return docRef.id;
  } catch (err) {
    console.warn("Error sending notification:", err);
    return null;
  }
}

/**
 * Real-time listener for current user's notifications (Strict Privacy: Mobile, Email & Shop Filter)
 */
export function listenUserNotifications(userId, userRole, onUpdate, profile = null, userObj = null) {
  try {
    const notifRef = collection(db, "notifications");
    
    // Listen to recent notifications (limit 50)
    const q = query(notifRef, limit(50));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const userShopName = (profile?.shopName || "").toLowerCase().trim();
          const userPhone = (profile?.phone || userObj?.phoneNumber || "").replace(/[^0-9]/g, "").slice(-10);
          const userEmail = (profile?.email || userObj?.email || "").toLowerCase().trim();
          const isAdmin = userRole === "admin" || userEmail === "tyresathi@gmail.com";

          const list = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((n) => {
              // 1. Master Admin sees all activity
              if (isAdmin) return true;

              // Check if notification is a personal booking event
              const isBookingNotif = 
                n.type === "booking_created" || 
                n.type === "booking_status" || 
                n.type === "booking" ||
                (n.title && n.title.toLowerCase().includes("booking")) ||
                (n.message && n.message.toLowerCase().includes("booking"));

              // 🛑 CRITICAL PRIVACY: Personal Booking notifications can NEVER be broadcasted to 'all'!
              // Must strictly match customer's mobile/email or shop's details.
              if (isBookingNotif) {
                const notifShopId = n.data?.shopId || "";
                const notifShopName = (n.data?.shopName || "").toLowerCase().trim();
                const notifShopPhone = (n.data?.shopPhone || "").replace(/[^0-9]/g, "").slice(-10);
                const notifShopEmail = (n.data?.shopEmail || "").toLowerCase().trim();

                const notifCustId = n.data?.customerId || n.recipientId || "";
                const notifCustPhone = (n.data?.customerPhone || "").replace(/[^0-9]/g, "").slice(-10);
                const notifCustEmail = (n.data?.customerEmail || "").toLowerCase().trim();

                // Check if this notification belongs to this Shop Owner
                const isForMyShop = 
                  (userId && notifShopId && notifShopId === userId) ||
                  (userPhone && notifShopPhone && userPhone === notifShopPhone) ||
                  (userEmail && notifShopEmail && userEmail === notifShopEmail) ||
                  (userShopName && notifShopName && notifShopName === userShopName);

                if (isForMyShop && (userRole === "vendor" || userRole === "shop_owner" || profile?.shopName)) {
                  return true;
                }

                // Check if this notification belongs to this Customer (STRICTLY by Mobile, Email, or UID)
                const isForMeAsCustomer = 
                  (userPhone && notifCustPhone && userPhone === notifCustPhone) ||
                  (userEmail && notifCustEmail && userEmail === notifCustEmail) ||
                  (userPhone && n.recipientId && n.recipientId === `phone_${userPhone}`) ||
                  (userEmail && n.recipientId && n.recipientId === userEmail) ||
                  (userId && notifCustId && notifCustId === userId && notifCustId !== "all" && notifCustId !== "guest_cust");

                if (isForMeAsCustomer) {
                  return true;
                }

                // If it is a booking event and does NOT match this customer or shop, NEVER show it!
                return false;
              }

              // 2. Broadcast alerts for all (ONLY for app updates, announcements or general news)
              if (n.recipientId === "all" && (n.recipientRole === "all" || n.recipientRole === userRole)) {
                return n.type === "app_update" || n.type === "general" || n.type === "announcement";
              }

              // 3. Shop Ratings / Reviews
              if (n.type === "rating_received") {
                const notifShopId = n.data?.shopId || n.recipientId;
                const notifShopName = (n.data?.shopName || "").toLowerCase().trim();
                const isForMyShop = 
                  (userId && notifShopId === userId) ||
                  (userShopName && notifShopName && userShopName === notifShopName);
                return isForMyShop;
              }

              // 4. Targeted alerts strictly matching customer's Mobile, Email, or UID
              if (userPhone && n.recipientId === `phone_${userPhone}`) return true;
              if (userEmail && n.recipientId === userEmail) return true;
              if (userId && n.recipientId === userId && n.recipientId !== "all" && n.recipientId !== "guest_cust") return true;

              return false;
            });

          // Sort newest first
          list.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : new Date(a.createdAtClient || 0).getTime();
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : new Date(b.createdAtClient || 0).getTime();
            return timeB - timeA;
          });

          onUpdate(list);
        } else {
          onUpdate([]);
        }
      },
      (err) => {
        console.warn("Notifications listener fallback:", err);
      }
    );

    return unsubscribe;
  } catch (e) {
    console.warn("Notification listener init error:", e);
    return () => {};
  }
}

/**
 * Mark a single notification as read
 */
export async function markNotificationAsRead(notifId) {
  if (!notifId) return;
  try {
    await updateDoc(doc(db, "notifications", notifId), {
      read: true,
      readAt: serverTimestamp(),
    });
  } catch (e) {
    console.warn("Mark read error:", e);
  }
}

/**
 * Mark all visible notifications as read for the user
 */
export async function markAllNotificationsAsRead(notifications) {
  if (!Array.isArray(notifications) || notifications.length === 0) return;
  try {
    const unread = notifications.filter((n) => !n.read && n.id);
    if (unread.length === 0) return;

    const batch = writeBatch(db);
    unread.slice(0, 20).forEach((n) => {
      const ref = doc(db, "notifications", n.id);
      batch.update(ref, { read: true, readAt: serverTimestamp() });
    });
    await batch.commit();
  } catch (e) {
    console.warn("Batch mark read error:", e);
  }
}
