/**
 * TyreSaathi Sound & Audio Feedback Engine
 * High-performance Web Audio API synthesizer for instant in-app alerts,
 * bells, chimes, and haptic feedback. Works on mobile & desktop without downloading files.
 */

import { triggerHaptic } from "./nativeBridge";

export function playNotificationSound(tone = "chime") {
  // Check user preference in localStorage
  try {
    const saved = localStorage.getItem("tyresaathi_settings_cache");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.soundEnabled === false) return; // User disabled sound
    }
  } catch {}

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (tone === "pop") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.09);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.09);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
      return;
    }

    if (tone === "modern") {
      [0, 0.11].forEach((delay, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(idx === 0 ? 587.33 : 880, now + delay);
        gain.gain.setValueAtTime(0.28, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.18);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.18);
      });
      return;
    }

    // Default "chime" (Pleasing 3-tone chime bell)
    const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
    [0, 0.08, 0.16].forEach((delay, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freqs[idx], now + delay);
      gain.gain.setValueAtTime(0.3, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.38);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + 0.38);
    });
  } catch (e) {
    console.warn("Audio notification notice:", e);
  }
}

export function triggerNotificationVibration(style = "medium") {
  try {
    const saved = localStorage.getItem("tyresaathi_settings_cache");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.vibrationEnabled === false) return; // User disabled vibration
    }
  } catch {}

  triggerHaptic(style);
}
