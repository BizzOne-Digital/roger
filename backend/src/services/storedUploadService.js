import crypto from 'crypto';
import StoredUpload from '../models/StoredUpload.js';
import AppError from '../utils/AppError.js';

export const UPLOAD_FOLDERS = ['products', 'gallery', 'pages', 'misc'];

const MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const MAX_SIZE = 8 * 1024 * 1024;

export const isValidFolder = (folder) => UPLOAD_FOLDERS.includes(folder);

export const sanitizeFilename = (filename) => {
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return null;
  }
  return filename;
};

export const parseStoredUploadUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(/\/api\/uploads\/([^/]+)\/([^/?#]+)/);
  if (!match) return null;
  const folder = match[1];
  const filename = sanitizeFilename(match[2]);
  if (!folder || !filename || !isValidFolder(folder)) return null;
  return { folder, filename };
};

export const isStoredUploadUrl = (url) => parseStoredUploadUrl(url) !== null;

export const generateFilename = (mimeType) => {
  const ext = MIME_TO_EXT[mimeType];
  if (!ext) throw new AppError('Unsupported image type', 400);
  const randomHex = crypto.randomBytes(8).toString('hex');
  return `${Date.now()}-${randomHex}.${ext}`;
};

export const storeUpload = async ({ folder, buffer, mimeType, size }) => {
  if (!isValidFolder(folder)) {
    throw new AppError('Invalid upload folder', 400);
  }
  if (!MIME_TO_EXT[mimeType]) {
    throw new AppError('Only JPEG, PNG, WebP, and GIF images are allowed', 400);
  }
  if (size > MAX_SIZE) {
    throw new AppError('Image must be 8MB or smaller', 400);
  }

  const filename = generateFilename(mimeType);

  await StoredUpload.create({
    folder,
    filename,
    mimeType,
    size,
    data: buffer,
  });

  return {
    url: `/api/uploads/${folder}/${filename}`,
    filename,
    size,
    folder,
  };
};

export const getStoredUpload = async (folder, filename) => {
  const safeFolder = isValidFolder(folder) ? folder : null;
  const safeFilename = sanitizeFilename(filename);
  if (!safeFolder || !safeFilename) return null;

  return StoredUpload.findOne({ folder: safeFolder, filename: safeFilename });
};

export const deleteStoredUploadByUrl = async (url) => {
  const parsed = parseStoredUploadUrl(url);
  if (!parsed) return false;

  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });

  return result.deletedCount > 0;
};

export const deleteStoredUploadsByUrls = async (urls = []) => {
  for (const url of urls) {
    await deleteStoredUploadByUrl(url);
  }
};
