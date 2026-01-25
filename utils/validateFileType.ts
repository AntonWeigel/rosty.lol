import { ALLOWED_FILE_TYPES, ERROR_MESSAGES } from '@/constants';

/**
 * Validates the file type against the list of allowed MIME types.
 *
 * @param file - The file to validate.
 * @returns An error message if the file type is not allowed, otherwise null.
 */
export function validateFileType(file: File): string | null {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return ERROR_MESSAGES.fileTypeNotAllowed;
  }
  return null;
}
