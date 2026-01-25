import { ERROR_MESSAGES, MAX_UPLOAD_FILE_SIZE_IN_BYTES } from '@/constants';

/**
 * Validates the file size against the maximum allowed limit.
 *
 * @param file - The file to validate.
 * @returns An error message if the file is too large, otherwise null.
 */
export function validateFileSize(file: File): string | null {
  if (file.size > MAX_UPLOAD_FILE_SIZE_IN_BYTES) {
    return ERROR_MESSAGES.fileTooLarge;
  }
  return null;
}
