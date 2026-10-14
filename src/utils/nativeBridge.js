import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { Network } from "@capacitor/network";
import { Share } from "@capacitor/share";
import { Toast } from "@capacitor/toast";
import { LocalNotifications } from "@capacitor/local-notifications";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

/**
 * TyreSaathi Native Bridge
 * Provides seamless bridge between React and Native Android/iOS capabilities
 * with automatic, rock-solid web fallbacks for local browser development.
 */

export const isNative = Capacitor.isNativePlatform();

// -------------------------------------------------------------
// 1. Initialization (Splash, Status Bar, Notification Channels)
// -------------------------------------------------------------
export async function initNativeFeatures() {
  if (!isNative) return;

  try {
    // 1. Hide Splash Screen smoothly once React mounts
    await SplashScreen.hide({ fadeOutDuration: 300 }).catch(() => {});

    // 2. Set Status Bar style
    await StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
    await StatusBar.setBackgroundColor({ color: "#0f172a" }).catch(() => {});

    // 3. Create Local Notification Channels for Android
    await LocalNotifications.createChannel({
      id: "tyresaathi_alerts",
      name: "TyreSaathi Alerts & Reminders",
      description: "Service alerts, booking updates and stock notifications",
      importance: 4,
      visibility: 1,
      vibration: true,
    }).catch(() => {});

    console.log("[NativeBridge] Native features initialized successfully.");
  } catch (err) {
    console.warn("[NativeBridge] Error during native feature init:", err);
  }
}

// -------------------------------------------------------------
// 2. Haptic Feedback (Touch / Vibration)
// -------------------------------------------------------------
export async function triggerHaptic(type = "light") {
  try {
    if (isNative) {
      switch (type) {
        case "light":
          await Haptics.impact({ style: ImpactStyle.Light });
          break;
        case "medium":
          await Haptics.impact({ style: ImpactStyle.Medium });
          break;
        case "heavy":
          await Haptics.impact({ style: ImpactStyle.Heavy });
          break;
        case "success":
          await Haptics.notification({ type: NotificationType.Success });
          break;
        case "warning":
          await Haptics.notification({ type: NotificationType.Warning });
          break;
        case "error":
          await Haptics.notification({ type: NotificationType.Error });
          break;
        default:
          await Haptics.impact({ style: ImpactStyle.Light });
      }
    } else if (typeof navigator !== "undefined" && navigator.vibrate) {
      // Web fallback
      if (type === "light") navigator.vibrate(10);
      else if (type === "medium") navigator.vibrate(25);
      else if (type === "success") navigator.vibrate([15, 30, 20]);
      else if (type === "warning" || type === "error") navigator.vibrate([40, 40, 40]);
    }
  } catch {
    // Ignore haptic errors gracefully
  }
}

// -------------------------------------------------------------
// 3. Native Toast Messages
// -------------------------------------------------------------
export async function showNativeToast(text, duration = "short") {
  try {
    if (isNative) {
      await Toast.show({
        text,
        duration: duration === "long" ? "long" : "short",
        position: "bottom",
      });
    } else {
      console.log(`[Toast] ${text}`);
      if (typeof document !== "undefined") {
        let toastEl = document.getElementById("tyresaathi-web-toast");
        if (!toastEl) {
          toastEl = document.createElement("div");
          toastEl.id = "tyresaathi-web-toast";
          toastEl.style.cssText = `
            position: fixed;
            bottom: 85px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #0f172a;
            color: #ffffff;
            padding: 10px 22px;
            border-radius: 9999px;
            font-size: 13.5px;
            font-weight: 600;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35);
            z-index: 99999;
            opacity: 0;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: inherit;
            border: 1px solid rgba(255,255,255,0.15);
          `;
          document.body.appendChild(toastEl);
        }
        toastEl.innerText = text;
        requestAnimationFrame(() => {
          toastEl.style.opacity = "1";
          toastEl.style.transform = "translateX(-50%) translateY(0)";
        });
        clearTimeout(window.__tyreToastTimer);
        window.__tyreToastTimer = setTimeout(() => {
          if (toastEl) {
            toastEl.style.opacity = "0";
            toastEl.style.transform = "translateX(-50%) translateY(15px)";
          }
        }, duration === "long" ? 3500 : 2200);
      }
    }
  } catch (err) {
    console.warn("[NativeBridge] Toast error:", err);
  }
}

// -------------------------------------------------------------
// 4. Native Share Sheet (Invoices, Tyre Quotes, Shop Profile, App Share)
// -------------------------------------------------------------
export const INDUS_APPSTORE_URL = "https://indusapp.store/t5arj7n8";

export async function shareNativeContent({ title, text, url, dialogTitle }) {
  triggerHaptic("medium");

  const finalUrl = url || INDUS_APPSTORE_URL;
  const shareText = text 
    ? (text.includes("http") ? text : `${text} ${finalUrl}`)
    : finalUrl;

  try {
    if (isNative) {
      const canShare = await Share.canShare().catch(() => ({ value: true }));
      if (canShare.value) {
        await Share.share({
          title: title || "TyreSaathi",
          text: shareText,
          url: finalUrl,
          dialogTitle: dialogTitle || "Share via",
        });
        return { success: true };
      }
    }

    // Web Share API fallback
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        title: title || "TyreSaathi",
        text: shareText,
        url: finalUrl,
      });
      return { success: true };
    }

    // Clipboard fallback
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      showNativeToast("Link copied to clipboard! Share it with friends.");
      return { success: true, copied: true };
    }
  } catch (err) {
    if (err.name !== "AbortError") {
      console.warn("[NativeBridge] Share error:", err);
    }
    return { success: false, error: err };
  }
  return { success: false };
}

/**
 * Global helper to share the TyreSaathi Indus Appstore link
 */
export async function shareApp() {
  return await shareNativeContent({
    title: "TyreSaathi - India's Trusted Tyre & Service App",
    text: "Check out this amazing app on Indus Appstore! Download it now and explore best tyre deals, services & verified shops: " + INDUS_APPSTORE_URL,
    url: INDUS_APPSTORE_URL,
    dialogTitle: "Share TyreSaathi App",
  });
}

// -------------------------------------------------------------
// 5. Hardware Back Button Listener (Android Back Navigation)
// -------------------------------------------------------------
let lastBackPressTime = 0;

export function registerHardwareBackButton(navigate, locationRef) {
  if (!isNative) return () => {};

  const backListener = App.addListener("backButton", ({ canGoBack }) => {
    const currentPath = locationRef.current?.pathname || "/";
    const isRoot = currentPath === "/" || currentPath === "/login";

    if (isRoot) {
      const now = Date.now();
      if (now - lastBackPressTime < 2000) {
        // Exit app on double tap back
        App.exitApp();
      } else {
        lastBackPressTime = now;
        showNativeToast("Press back again to exit TyreSaathi");
      }
    } else {
      triggerHaptic("light");
      navigate(-1);
    }
  });

  return () => {
    backListener.then((listener) => listener.remove?.()).catch(() => {});
  };
}

// -------------------------------------------------------------
// 6. Network & Offline Status Monitor
// -------------------------------------------------------------
export async function getNetworkStatus() {
  try {
    if (isNative) {
      const status = await Network.getStatus();
      return { connected: status.connected, connectionType: status.connectionType };
    }
    return {
      connected: typeof navigator !== "undefined" ? navigator.onLine : true,
      connectionType: "web",
    };
  } catch {
    return { connected: true, connectionType: "unknown" };
  }
}

export function subscribeNetworkStatus(callback) {
  let removeListener = () => {};

  if (isNative) {
    const listenerPromise = Network.addListener("networkStatusChange", (status) => {
      callback({ connected: status.connected, connectionType: status.connectionType });
    });
    removeListener = () => {
      listenerPromise.then((l) => l.remove?.()).catch(() => {});
    };
  } else if (typeof window !== "undefined") {
    const handleOnline = () => callback({ connected: true, connectionType: "wifi" });
    const handleOffline = () => callback({ connected: false, connectionType: "none" });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    removeListener = () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }

  return removeListener;
}

// -------------------------------------------------------------
// 7. Local Push Notifications & Service Reminders
// -------------------------------------------------------------
export async function scheduleServiceReminder({ id = 1, title, body, scheduleInSeconds = 5 }) {
  try {
    if (isNative) {
      // Check permissions
      const perm = await LocalNotifications.checkPermissions();
      if (perm.display !== "granted") {
        const req = await LocalNotifications.requestPermissions();
        if (req.display !== "granted") return false;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            title: title || "TyreSaathi Service Alert",
            body: body || "Upcoming tyre service or reminder is due.",
            id: Number(id) || Math.floor(Math.random() * 100000),
            schedule: { at: new Date(Date.now() + scheduleInSeconds * 1000) },
            channelId: "tyresaathi_alerts",
            smallIcon: "ic_stat_name",
            actionTypeId: "",
            extra: null,
          },
        ],
      });
      return true;
    } else {
      console.log(`[LocalNotification Scheduled]: ${title} - ${body} in ${scheduleInSeconds}s`);
      return true;
    }
  } catch (err) {
    console.warn("[NativeBridge] Schedule notification error:", err);
    return false;
  }
}

export async function scheduleLocalNotification(title, body) {
  return scheduleServiceReminder({ title, body, scheduleInSeconds: 1 });
}
