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
 * Real-time listener for current user's notifications
 */
export function listenUserNotifications(userId, userRole, onUpdate) {
  try {
    const notifRef = collection(db, "notifications");
    
    // Listen to recent notifications (limit 30)
    const q = query(notifRef, limit(40));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs
            .map((d) => ({ id: d.id, ...d.data() }))
            .filter((n) => {
              // Match user id, 'all', or matching role
              if (n.recipientId === "all") return true;
              if (userId && (n.recipientId === userId || n.data?.shopId === userId || n.data?.customerId === userId)) return true;
              if (userRole && n.recipientRole === userRole) return true;
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
