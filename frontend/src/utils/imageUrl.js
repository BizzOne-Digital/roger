/**
 * Resolves image URLs for display. Legacy disk `/uploads/...` paths fall back to placeholder.
 * Stored uploads at `/api/uploads/...` are resolved against the API origin when needed.
 */

export const PLACEHOLDER_IMAGE = '/logo.png';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const getApiOrigin = () => {
  if (API_BASE.startsWith('http')) {
    return API_BASE.replace(/\/api\/?$/, '');
  }
  return '';
};

export const isLegacyDiskUploadUrl = (url) =>
  typeof url === 'string' && url.startsWith('/uploads/');

export const isStoredUploadUrl = (url) =>
  typeof url === 'string' && url.includes('/api/uploads/');

export const resolveImageUrl = (url) => {
  if (!url) return PLACEHOLDER_IMAGE;
  if (isLegacyDiskUploadUrl(url)) return PLACEHOLDER_IMAGE;

  if (url.startsWith('/api/')) {
    const origin = getApiOrigin();
    return origin ? `${origin}${url}` : url;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return url;
};

export const getImageUrlFromObject = (image) => {
  if (!image) return PLACEHOLDER_IMAGE;
  if (typeof image === 'string') return resolveImageUrl(image);
  return resolveImageUrl(image.url);
};
