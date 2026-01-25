import imageCompression from 'browser-image-compression';

import {
  MAX_UPLOAD_FILE_SIZE,
  MAX_UPLOAD_FILE_SIZE_IN_BYTES,
} from '@/constants';

/**
 * Compresses an image file on the client side to meet size requirements.
 * Skips compression if the file is already smaller than the maximum allowed size.
 *
 * @param file - The original file to be compressed.
 * @returns A Promise that resolves to the compressed (and renamed to .jpg) File object, or the original file if no compression was needed or an error occurred.
 */
export async function compressImage(file: File): Promise<File> {
  if (file.size < MAX_UPLOAD_FILE_SIZE_IN_BYTES) {
    return file;
  }

  const safeTargetSize = MAX_UPLOAD_FILE_SIZE * 0.9;

  const options = {
    maxSizeMB: safeTargetSize,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: 0.8,
  };

  try {
    const compressedBlob = await imageCompression(file, options);

    const finalName = file.name.replace(/\.[^/.]+$/, '') + '.jpg';

    return new File([compressedBlob], finalName, { type: 'image/jpeg' });
  } catch (error) {
    console.error('Compression failed:', error);
    return file;
  }
}
