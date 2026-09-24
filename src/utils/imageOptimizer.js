/**
 * TyreSaathi Image Optimizer & Fast Upload Utility
 * Automatically compresses large mobile/camera photos to web-friendly JPEG (~100KB-200KB)
 * and provides instant preview fallback so uploads never get stuck on 'Uploading...'
 */

export function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file provided"));
    }

    // If not an image, resolve directly with standard file reader
    if (!file.type || !file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ blob: file, dataUrl: e.target.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => {
        // Fallback to raw dataUrl if image decode fails
        resolve({ blob: file, dataUrl: event.target.result });
      };
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", quality);

          canvas.toBlob(
            (blob) => {
              resolve({ blob: blob || file, dataUrl });
            },
            "image/jpeg",
            quality
          );
        } catch (e) {
          console.warn("Canvas compression fallback:", e);
          resolve({ blob: file, dataUrl: event.target.result });
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
}
