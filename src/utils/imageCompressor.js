/**
 * Client-side Image Compressor using HTML5 Canvas
 * Resizes image to a max width/height (default 1200px) and compresses to JPEG Base64
 * to optimize localStorage usage.
 */
export async function compressImageFile(file, maxDimension = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target.result);
          return;
        }

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };

      img.onerror = (err) => reject(err);
      img.src = readerEvent.target.result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
