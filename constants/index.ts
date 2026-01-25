export const DARK_COLORS = ['accent', 'primary-dark', 'secondary-dark'];

export const DOCS_SEARCH_INDEX = 'docs-search-index.json';

export const LOCALES = ['en', 'de'];
export const MAX_UPLOAD_FILE_SIZE = 1;
export const MAX_UPLOAD_FILE_SIZE_IN_BYTES = MAX_UPLOAD_FILE_SIZE * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const ERROR_MESSAGES = {
  fileTooLarge: `File size must be less than ${MAX_UPLOAD_FILE_SIZE}MB`,
  fileTypeNotAllowed:
    'File type not allowed. Supported formats: JPEG, PNG, WebP.',
};
